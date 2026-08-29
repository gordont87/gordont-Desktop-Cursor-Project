import { OwnerTenantsClient } from "@/components/portal/OwnerTenantsClient";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Tenants" };

export default async function OwnerTenantsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const properties = await prisma.property.findMany({
    where: { ownerId: auth.owner.id },
    include: {
      leases: {
        where: { status: "Active" },
        include: { tenant: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const tenants = await prisma.tenant.findMany({
    where: { lease: { property: { ownerId: auth.owner.id } } },
    include: {
      lease: { include: { property: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <OwnerTenantsClient
      properties={properties.map((p) => ({
        id: p.id,
        name: p.name,
        address: p.address,
        city: p.city,
        status: p.status,
        hasPortalTenant: p.leases.some((l) => Boolean(l.tenant)),
      }))}
      tenants={tenants.map((t) => ({
        id: t.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        propertyName: t.lease.property.name,
        monthlyRent: t.lease.monthlyRent,
        leaseStatus: t.lease.status,
        leaseEnd: t.lease.endDate.toISOString(),
      }))}
    />
  );
}
