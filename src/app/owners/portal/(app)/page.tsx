import { Money, StatCard, StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Owner Dashboard" };

export default async function OwnerDashboardPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const properties = await prisma.property.findMany({
    where: { ownerId: auth.owner.id },
    include: {
      leases: { where: { status: "Active" }, take: 1 },
      maintenance: { where: { status: { not: "Closed" } } },
      transactions: { orderBy: { date: "desc" }, take: 8 },
    },
    orderBy: { name: "asc" },
  });

  const allTx = await prisma.transaction.findMany({
    where: { property: { ownerId: auth.owner.id } },
  });

  const income = allTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = allTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const occupied = properties.filter((p) => p.status === "Occupied").length;
  const openMaint = properties.reduce((s, p) => s + p.maintenance.length, 0);
  const newShowings = await prisma.showingRequest.count({
    where: { status: "New", listing: { ownerId: auth.owner.id } },
  });
  const newLeads = await prisma.analysisLead.count({
    where: { status: "New" },
  });
  const monthlyRent = properties.reduce(
    (s, p) => s + (p.leases[0]?.monthlyRent ?? 0),
    0,
  );
  const leasesEnding = await prisma.lease.count({
    where: {
      status: "Active",
      property: { ownerId: auth.owner.id },
      endDate: { lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
    },
  });

  const recent = properties
    .flatMap((p) => p.transactions.map((t) => ({ ...t, propertyName: p.name })))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">
          Welcome, {auth.owner.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-slate text-sm">
          Portfolio overview for your managed properties.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          label="Monthly scheduled rent"
          value={formatCurrency(monthlyRent)}
          hint="From active leases"
          tone="success"
        />
        <StatCard
          label="Occupancy"
          value={`${occupied}/${properties.length}`}
          hint="Occupied properties"
        />
        <StatCard
          label="Net cash flow (all recorded)"
          value={formatCurrency(income - expenses)}
          hint={`${formatCurrency(income)} in · ${formatCurrency(expenses)} out`}
          tone="success"
        />
        <StatCard
          label="New showing requests"
          value={String(newShowings)}
          hint="From Schedule a Showing"
          tone={newShowings > 0 ? "warn" : "default"}
        />
        <StatCard
          label="New analysis leads"
          value={String(newLeads)}
          hint="Rental analysis forms"
          tone={newLeads > 0 ? "warn" : "default"}
        />
        <StatCard
          label="Open maintenance"
          value={String(openMaint)}
          hint={`${leasesEnding} lease(s) ending in 90 days`}
          tone={openMaint > 0 ? "warn" : "default"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-navy">Properties</h2>
            <Link href="/owners/portal/properties" className="text-sm text-champagne hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {properties.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/owners/portal/properties/${p.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-champagne"
                >
                  <div>
                    <p className="font-medium text-navy">{p.name}</p>
                    <p className="text-xs text-slate">
                      {p.city}, {p.state}
                    </p>
                  </div>
                  <StatusPill status={p.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-navy">Recent activity</h2>
            <Link href="/owners/portal/financials" className="text-sm text-champagne hover:underline">
              Financials
            </Link>
          </div>
          <ul className="space-y-3">
            {recent.map((t) => (
              <li
                key={t.id}
                className="flex items-start justify-between gap-3 border-b border-border/70 pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-navy">{t.description}</p>
                  <p className="text-xs text-slate">
                    {t.propertyName} · {t.date.toLocaleDateString()}
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    t.type === "income" ? "text-success" : "text-charcoal"
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}
                  <Money amount={t.amount} />
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
