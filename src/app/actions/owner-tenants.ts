"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type OwnerActionState = {
  error?: string;
  success?: string;
};

export async function createTenantForOwner(
  _prev: OwnerActionState,
  formData: FormData,
): Promise<OwnerActionState> {
  const auth = await requireOwner();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const propertyId = String(formData.get("propertyId") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") || "").trim() || null;
  const password = String(formData.get("password") || "");
  const monthlyRent = Number(formData.get("monthlyRent") || 0);
  const startDateRaw = String(formData.get("startDate") || "");
  const endDateRaw = String(formData.get("endDate") || "");
  const createFirstDue = formData.get("createFirstDue") === "on";

  if (!propertyId || !name || !email || !password) {
    return { error: "Property, name, email, and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (!Number.isFinite(monthlyRent) || monthlyRent <= 0) {
    return { error: "Enter a valid monthly rent amount." };
  }

  const startDate = startDateRaw ? new Date(startDateRaw) : new Date();
  const endDate = endDateRaw
    ? new Date(endDateRaw)
    : new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return { error: "Invalid lease dates." };
  }

  if (endDate <= startDate) {
    return { error: "Lease end date must be after the start date." };
  }

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId: auth.owner.id },
    include: {
      leases: {
        where: { status: "Active" },
        include: { tenant: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!property) {
    return { error: "Property not found." };
  }

  const existingEmail = await prisma.tenant.findUnique({ where: { email } });
  if (existingEmail) {
    return { error: "A tenant account with that email already exists." };
  }

  const activeWithPortal = property.leases.find((l) => l.tenant);
  if (activeWithPortal) {
    return {
      error: "This property already has an active tenant portal account. End that lease first.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.$transaction(async (tx) => {
      let leaseId: string;
      const openLease = property.leases[0];

      if (openLease && !openLease.tenant) {
        await tx.lease.update({
          where: { id: openLease.id },
          data: {
            tenantLabel: name,
            monthlyRent,
            startDate,
            endDate,
            status: "Active",
          },
        });
        leaseId = openLease.id;
      } else {
        // End any leftover active leases without portal users
        if (property.leases.length) {
          await tx.lease.updateMany({
            where: { propertyId: property.id, status: "Active" },
            data: { status: "Ended" },
          });
        }

        const lease = await tx.lease.create({
          data: {
            propertyId: property.id,
            tenantLabel: name,
            monthlyRent,
            startDate,
            endDate,
            status: "Active",
          },
        });
        leaseId = lease.id;
      }

      const tenant = await tx.tenant.create({
        data: {
          email,
          passwordHash,
          name,
          phone,
          leaseId,
        },
      });

      await tx.property.update({
        where: { id: property.id },
        data: { status: "Occupied" },
      });

      if (createFirstDue) {
        const dueDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        await tx.rentPayment.create({
          data: {
            tenantId: tenant.id,
            leaseId,
            amount: monthlyRent,
            dueDate,
            status: "Due",
            note: "Initial rent due — created with tenant account",
          },
        });
      }

      await tx.tenantDocument.create({
        data: {
          tenantId: tenant.id,
          name: "Signed Lease Agreement",
          category: "Lease",
          note: "Placeholder document created with tenant account.",
        },
      });
    });
  } catch (e) {
    console.error(e);
    return { error: "Could not create tenant. Please try again." };
  }

  revalidatePath("/owners/portal/tenants");
  revalidatePath("/owners/portal/properties");
  revalidatePath("/owners/portal");
  revalidatePath("/tenants/portal");

  return {
    success: `Tenant ${name} created. They can sign in at /tenants/portal/login with ${email}.`,
  };
}

async function getOwnedTenant(ownerId: string, tenantId: string) {
  return prisma.tenant.findFirst({
    where: {
      id: tenantId,
      lease: { property: { ownerId } },
    },
    include: {
      lease: { include: { property: true } },
    },
  });
}

function revalidateTenantPaths(tenantId: string) {
  revalidatePath("/owners/portal/tenants");
  revalidatePath(`/owners/portal/tenants/${tenantId}`);
  revalidatePath("/owners/portal/properties");
  revalidatePath("/owners/portal");
  revalidatePath("/tenants/portal");
  revalidatePath("/tenants/portal/lease");
  revalidatePath("/tenants/portal/settings");
}

export async function updateTenantForOwner(
  _prev: OwnerActionState,
  formData: FormData,
): Promise<OwnerActionState> {
  const auth = await requireOwner();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const tenantId = String(formData.get("tenantId") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") || "").trim() || null;
  const monthlyRent = Number(formData.get("monthlyRent") || 0);
  const startDateRaw = String(formData.get("startDate") || "");
  const endDateRaw = String(formData.get("endDate") || "");
  const leaseStatus = String(formData.get("leaseStatus") || "Active");
  const newPassword = String(formData.get("newPassword") || "");

  if (!tenantId || !name || !email) {
    return { error: "Name and email are required." };
  }

  if (!Number.isFinite(monthlyRent) || monthlyRent <= 0) {
    return { error: "Enter a valid monthly rent amount." };
  }

  if (!["Active", "Ended", "Pending"].includes(leaseStatus)) {
    return { error: "Invalid lease status." };
  }

  const startDate = new Date(startDateRaw);
  const endDate = new Date(endDateRaw);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return { error: "Invalid lease dates." };
  }
  if (endDate <= startDate) {
    return { error: "Lease end date must be after the start date." };
  }

  if (newPassword && newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  const tenant = await getOwnedTenant(auth.owner.id, tenantId);
  if (!tenant) {
    return { error: "Tenant not found." };
  }

  const emailTaken = await prisma.tenant.findFirst({
    where: { email, NOT: { id: tenantId } },
  });
  if (emailTaken) {
    return { error: "Another tenant already uses that email." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.tenant.update({
        where: { id: tenantId },
        data: {
          name,
          email,
          phone,
          ...(newPassword ? { passwordHash: await bcrypt.hash(newPassword, 10) } : {}),
        },
      });

      await tx.lease.update({
        where: { id: tenant.leaseId },
        data: {
          tenantLabel: name,
          monthlyRent,
          startDate,
          endDate,
          status: leaseStatus,
        },
      });

      const propertyId = tenant.lease.propertyId;
      if (leaseStatus === "Ended") {
        const otherActive = await tx.lease.count({
          where: {
            propertyId,
            status: "Active",
            NOT: { id: tenant.leaseId },
          },
        });
        if (otherActive === 0) {
          await tx.property.update({
            where: { id: propertyId },
            data: { status: "Vacant" },
          });
        }
      } else if (leaseStatus === "Active") {
        await tx.property.update({
          where: { id: propertyId },
          data: { status: "Occupied" },
        });
      }
    });
  } catch (e) {
    console.error(e);
    return { error: "Could not update tenant. Please try again." };
  }

  revalidateTenantPaths(tenantId);

  return {
    success: newPassword
      ? "Tenant updated. New password is set — share it securely with the resident."
      : "Tenant and lease details updated.",
  };
}
