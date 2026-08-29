import { StatusPill } from "@/components/portal/PortalUi";
import { requireTenant } from "@/lib/tenant-auth";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "My Lease" };

export default async function TenantLeasePage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  const { lease } = auth.tenant;
  const { property } = lease;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">My lease</h1>
        <p className="mt-2 text-sm text-slate">Your current rental agreement details.</p>
      </div>

      <div className="card-surface p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-semibold text-navy">{property.name}</h2>
          <StatusPill status={lease.status} />
        </div>
        <p className="text-slate">
          {property.address}
          <br />
          {property.city}, {property.state} {property.zip}
        </p>
        <dl className="grid sm:grid-cols-2 gap-4 pt-2 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Monthly rent</dt>
            <dd className="mt-1 font-semibold text-navy">{formatCurrency(lease.monthlyRent)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Property type</dt>
            <dd className="mt-1 font-medium">
              {property.type} · {property.beds} bd · {property.baths} ba
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Lease start</dt>
            <dd className="mt-1 font-medium">{lease.startDate.toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate">Lease end</dt>
            <dd className="mt-1 font-medium">{lease.endDate.toLocaleDateString()}</dd>
          </div>
        </dl>
        <p className="text-xs text-slate pt-2">
          For renewals or questions about your lease terms, contact the office. Sensitive application
          data is never collected in this portal.
        </p>
      </div>
    </div>
  );
}
