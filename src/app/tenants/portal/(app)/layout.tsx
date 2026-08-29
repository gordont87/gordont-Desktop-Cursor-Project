import { requireTenant } from "@/lib/tenant-auth";
import { redirect } from "next/navigation";
import { TenantPortalShell } from "@/components/portal/TenantPortalShell";

export const dynamic = "force-dynamic";

export default async function TenantPortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireTenant();
  if (!auth) {
    redirect("/tenants/portal/login");
  }

  return <TenantPortalShell tenantName={auth.tenant.name}>{children}</TenantPortalShell>;
}
