"use server";

import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  clearTenantSessionCookie,
  createTenantSessionToken,
  requireTenant,
  setTenantSessionCookie,
} from "@/lib/tenant-auth";

export type AuthState = {
  error?: string;
  success?: string;
  /** Demo-only: reset link shown when email delivery is not configured */
  resetUrl?: string;
};

export async function loginTenant(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const tenant = await prisma.tenant.findUnique({ where: { email } });
  if (!tenant) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, tenant.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createTenantSessionToken({
    tenantId: tenant.id,
    email: tenant.email,
    name: tenant.name,
  });
  await setTenantSessionCookie(token);
  redirect("/tenants/portal");
}

export async function logoutTenant() {
  await clearTenantSessionCookie();
  redirect("/tenants/portal/login");
}

export async function payRentDue(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const auth = await requireTenant();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const paymentId = String(formData.get("paymentId") || "");
  if (!paymentId) {
    return { error: "Missing payment." };
  }

  const payment = await prisma.rentPayment.findFirst({
    where: { id: paymentId, tenantId: auth.tenant.id, status: "Due" },
  });

  if (!payment) {
    return { error: "No due payment found." };
  }

  await prisma.rentPayment.update({
    where: { id: payment.id },
    data: {
      status: "Paid",
      method: "Demo checkout (not a live processor)",
      paidAt: new Date(),
      note: "Marked paid in demo mode. Connect Stripe or a rent-pay provider for real charges.",
    },
  });

  // Mirror income on the property ledger for owner portal consistency
  await prisma.transaction.create({
    data: {
      propertyId: auth.tenant.lease.propertyId,
      date: new Date(),
      type: "income",
      category: "Rent",
      amount: payment.amount,
      description: `Tenant portal rent payment — ${auth.tenant.name}`,
    },
  });

  revalidatePath("/tenants/portal");
  revalidatePath("/tenants/portal/pay-rent");
  revalidatePath("/owners/portal");
  revalidatePath("/owners/portal/financials");

  return { success: "Payment recorded. In production this would charge via a payment processor." };
}

export async function submitTenantMaintenance(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const auth = await requireTenant();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "Other");
  const urgency = String(formData.get("urgency") || "Normal");

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  await prisma.maintenanceRequest.create({
    data: {
      propertyId: auth.tenant.lease.propertyId,
      tenantId: auth.tenant.id,
      title,
      description,
      category,
      urgency,
      status: "Open",
    },
  });

  revalidatePath("/tenants/portal/maintenance");
  revalidatePath("/tenants/portal");
  revalidatePath("/owners/portal/maintenance");

  return { success: "Maintenance request submitted." };
}

export async function updateTenantProfile(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const auth = await requireTenant();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  const emailTaken = await prisma.tenant.findFirst({
    where: { email, NOT: { id: auth.tenant.id } },
  });
  if (emailTaken) {
    return { error: "That email is already in use." };
  }

  await prisma.tenant.update({
    where: { id: auth.tenant.id },
    data: { name, phone, email },
  });

  await prisma.lease.update({
    where: { id: auth.tenant.leaseId },
    data: { tenantLabel: name },
  });

  // Refresh session cookie so header/nav shows updated name/email
  const token = await createTenantSessionToken({
    tenantId: auth.tenant.id,
    email,
    name,
  });
  await setTenantSessionCookie(token);

  revalidatePath("/tenants/portal/settings");
  revalidatePath("/tenants/portal");
  revalidatePath("/owners/portal/tenants");

  return { success: "Profile updated." };
}

export async function changeTenantPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const auth = await requireTenant();
  if (!auth) {
    return { error: "Please sign in again." };
  }

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  const valid = await bcrypt.compare(currentPassword, auth.tenant.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  await prisma.tenant.update({
    where: { id: auth.tenant.id },
    data: { passwordHash: await bcrypt.hash(newPassword, 10) },
  });

  return { success: "Password updated. Use your new password next time you sign in." };
}

export async function requestTenantPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  if (!email) {
    return { error: "Email is required." };
  }

  const tenant = await prisma.tenant.findUnique({ where: { email } });

  // Always return a generic message to avoid email enumeration
  const genericSuccess =
    "If an account exists for that email, a password reset link has been created. The link expires in 1 hour.";

  if (!tenant) {
    return { success: genericSuccess };
  }

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.updateMany({
    where: { tenantId: tenant.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordResetToken.create({
    data: {
      tenantId: tenant.id,
      tokenHash,
      expiresAt,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";
  const resetUrl = `${baseUrl}/tenants/portal/reset-password?token=${rawToken}`;

  // Production: send email via Resend/SendGrid when configured.
  // Demo: return the link so the flow is usable without an email provider.
  console.info(`[password-reset] ${tenant.email}: ${resetUrl}`);

  return {
    success: genericSuccess,
    resetUrl,
  };
}

export async function resetTenantPasswordWithToken(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const token = String(formData.get("token") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!token) {
    return { error: "Reset link is missing or invalid." };
  }

  if (!newPassword || !confirmPassword) {
    return { error: "Please enter and confirm your new password." };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { tenant: true },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.tenant.update({
      where: { id: record.tenantId },
      data: { passwordHash: await bcrypt.hash(newPassword, 10) },
    });
    await tx.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });
  });

  redirect("/tenants/portal/login?reset=1");
}
