import { StatusPill, StatCard } from "@/components/portal/PortalUi";
import { requireTenant } from "@/lib/tenant-auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Tenant Dashboard" };

export default async function TenantDashboardPage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  const { tenant } = auth;
  const property = tenant.lease.property;

  const duePayment = await prisma.rentPayment.findFirst({
    where: { tenantId: tenant.id, status: "Due" },
    orderBy: { dueDate: "asc" },
  });

  const openMaint = await prisma.maintenanceRequest.count({
    where: { tenantId: tenant.id, status: { not: "Closed" } },
  });

  const daysLeft = Math.ceil(
    (tenant.lease.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">
          Welcome, {tenant.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sm text-slate">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Monthly rent"
          value={formatCurrency(tenant.lease.monthlyRent)}
          hint="Per active lease"
        />
        <StatCard
          label="Rent status"
          value={duePayment ? "Due" : "Current"}
          hint={
            duePayment
              ? `Due ${duePayment.dueDate.toLocaleDateString()}`
              : "No open balance"
          }
          tone={duePayment ? "warn" : "success"}
        />
        <StatCard
          label="Lease ends"
          value={tenant.lease.endDate.toLocaleDateString()}
          hint={`${daysLeft} days remaining`}
        />
        <StatCard
          label="Open maintenance"
          value={String(openMaint)}
          tone={openMaint > 0 ? "warn" : "default"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <section className="card-surface p-5">
          <h2 className="font-heading text-lg font-semibold text-navy">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/tenants/portal/pay-rent"
              className="rounded-xl bg-champagne px-4 py-2.5 text-sm font-semibold text-navy"
            >
              Pay rent
            </Link>
            <Link
              href="/tenants/portal/maintenance"
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-navy hover:border-champagne"
            >
              Submit maintenance
            </Link>
            <Link
              href="/tenants/portal/lease"
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-navy hover:border-champagne"
            >
              View lease
            </Link>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="font-heading text-lg font-semibold text-navy">Lease snapshot</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Status</dt>
              <dd>
                <StatusPill status={tenant.lease.status} />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Property</dt>
              <dd className="font-medium text-navy text-right">{property.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate">Term</dt>
              <dd className="text-right">
                {tenant.lease.startDate.toLocaleDateString()} –{" "}
                {tenant.lease.endDate.toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
