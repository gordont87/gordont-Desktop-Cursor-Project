import { EditTenantForm } from "@/components/portal/EditTenantForm";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { id } });
  return { title: tenant ? `Edit ${tenant.name}` : "Edit tenant" };
}

export default async function EditTenantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const { id } = await params;
  const tenant = await prisma.tenant.findFirst({
    where: {
      id,
      lease: { property: { ownerId: auth.owner.id } },
    },
    include: {
      lease: { include: { property: true } },
    },
  });

  if (!tenant) notFound();

  const { property } = tenant.lease;

  return (
    <EditTenantForm
      tenant={{
        id: tenant.id,
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        propertyName: property.name,
        propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
        monthlyRent: tenant.lease.monthlyRent,
        leaseStatus: tenant.lease.status,
        leaseStart: tenant.lease.startDate.toISOString(),
        leaseEnd: tenant.lease.endDate.toISOString(),
      }}
    />
  );
}
