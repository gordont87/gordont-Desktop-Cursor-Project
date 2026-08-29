import { TenantSettingsForms } from "@/components/portal/TenantSettingsForms";
import { requireTenant } from "@/lib/tenant-auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Settings" };

export default async function TenantSettingsPage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  return (
    <TenantSettingsForms
      name={auth.tenant.name}
      email={auth.tenant.email}
      phone={auth.tenant.phone}
    />
  );
}
