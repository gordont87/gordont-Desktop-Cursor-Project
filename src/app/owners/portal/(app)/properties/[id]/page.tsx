import { Money, StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  return { title: property?.name ?? "Property" };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");
  const { id } = await params;

  const property = await prisma.property.findFirst({
    where: { id, ownerId: auth.owner.id },
    include: {
      leases: { orderBy: { startDate: "desc" } },
      transactions: { orderBy: { date: "desc" }, take: 12 },
      maintenance: { orderBy: { updatedAt: "desc" } },
      inspections: { orderBy: { date: "desc" } },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!property) notFound();

  const income = property.transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = property.transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <Link href="/owners/portal/properties" className="text-sm text-champagne hover:underline">
          ← Properties
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-navy">{property.name}</h1>
            <p className="mt-1 text-slate">
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
          </div>
          <StatusPill status={property.status} />
        </div>
      </div>

      {property.imageUrl ? (
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-border">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-wider text-slate">Details</p>
          <p className="mt-2 text-sm">
            {property.type} · {property.beds} bd · {property.baths} ba ·{" "}
            {property.sqft.toLocaleString()} sqft
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-wider text-slate">Recent income (shown)</p>
          <p className="mt-2 font-heading text-xl font-semibold text-success">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-wider text-slate">Recent expenses (shown)</p>
          <p className="mt-2 font-heading text-xl font-semibold text-navy">
            {formatCurrency(expenses)}
          </p>
        </div>
      </div>

      <section className="card-surface p-5">
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Leases</h2>
        {property.leases.length === 0 ? (
          <p className="text-sm text-slate">No leases on file.</p>
        ) : (
          <ul className="space-y-3">
            {property.leases.map((lease) => (
              <li
                key={lease.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-navy">{lease.tenantLabel}</p>
                  <p className="text-xs text-slate">
                    {lease.startDate.toLocaleDateString()} – {lease.endDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{formatCurrency(lease.monthlyRent)}/mo</p>
                  <StatusPill status={lease.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-slate">
          Tenant labels are anonymized for privacy. Full applicant PII is not stored in this portal demo.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card-surface p-5">
          <h2 className="font-heading text-lg font-semibold text-navy mb-4">Maintenance</h2>
          <ul className="space-y-3">
            {property.maintenance.map((m) => (
              <li key={m.id} className="border-b border-border pb-3 last:border-0">
                <div className="flex justify-between gap-2">
                  <p className="font-medium text-navy text-sm">{m.title}</p>
                  <StatusPill status={m.status} />
                </div>
                <p className="text-xs text-slate mt-1">
                  {m.category} · {m.urgency}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="card-surface p-5">
          <h2 className="font-heading text-lg font-semibold text-navy mb-4">Inspections</h2>
          <ul className="space-y-3">
            {property.inspections.map((i) => (
              <li key={i.id} className="border-b border-border pb-3 last:border-0">
                <div className="flex justify-between gap-2">
                  <p className="font-medium text-navy text-sm">{i.type}</p>
                  {i.score ? <StatusPill status={i.score} /> : null}
                </div>
                <p className="text-xs text-slate mt-1">{i.date.toLocaleDateString()}</p>
                <p className="text-sm text-slate mt-2">{i.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card-surface p-5">
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Recent transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-border">
                <th className="py-2 pr-3 font-medium">Date</th>
                <th className="py-2 pr-3 font-medium">Category</th>
                <th className="py-2 pr-3 font-medium">Description</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {property.transactions.map((t) => (
                <tr key={t.id} className="border-b border-border/60">
                  <td className="py-2.5 pr-3 whitespace-nowrap">{t.date.toLocaleDateString()}</td>
                  <td className="py-2.5 pr-3">{t.category}</td>
                  <td className="py-2.5 pr-3">{t.description}</td>
                  <td
                    className={`py-2.5 text-right font-medium ${
                      t.type === "income" ? "text-success" : ""
                    }`}
                  >
                    {t.type === "income" ? "+" : "−"}
                    <Money amount={t.amount} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
