import { StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Properties" };

export default async function PropertiesPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const properties = await prisma.property.findMany({
    where: { ownerId: auth.owner.id },
    include: { leases: { where: { status: "Active" }, take: 1 } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Properties</h1>
        <p className="mt-2 text-sm text-slate">Your managed portfolio.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => (
          <Link
            key={p.id}
            href={`/owners/portal/properties/${p.id}`}
            className="card-surface overflow-hidden hover:border-champagne transition-colors group"
          >
            <div className="relative aspect-[16/10] bg-surface-muted">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              ) : null}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-heading font-semibold text-navy">{p.name}</h2>
                <StatusPill status={p.status} />
              </div>
              <p className="mt-1 text-sm text-slate">
                {p.address}, {p.city}, {p.state} {p.zip}
              </p>
              <p className="mt-3 text-sm text-charcoal">
                {p.beds} bd · {p.baths} ba · {p.sqft.toLocaleString()} sqft
              </p>
              <p className="mt-2 text-sm font-semibold text-navy">
                {p.leases[0]
                  ? `${formatCurrency(p.leases[0].monthlyRent)}/mo`
                  : "No active lease"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
