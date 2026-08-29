import { TenantMaintenanceClient } from "@/components/portal/TenantMaintenanceClient";
import { requireTenant } from "@/lib/tenant-auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Maintenance" };

export default async function TenantMaintenancePage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  const requests = await prisma.maintenanceRequest.findMany({
    where: { tenantId: auth.tenant.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <TenantMaintenanceClient
      requests={requests.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        category: r.category,
        urgency: r.urgency,
        status: r.status,
        updatedAt: r.updatedAt.toISOString(),
      }))}
    />
  );
}
