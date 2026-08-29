import { StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Maintenance" };

export default async function MaintenancePage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const requests = await prisma.maintenanceRequest.findMany({
    where: { property: { ownerId: auth.owner.id } },
    include: { property: true },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Maintenance</h1>
        <p className="mt-2 text-sm text-slate">
          Work orders across your properties. Residents submit requests separately; you see status here.
        </p>
      </div>

      <ul className="space-y-3">
        {requests.map((r) => (
          <li key={r.id} className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-heading font-semibold text-navy">{r.title}</h2>
                <p className="text-sm text-slate mt-1">
                  {r.property.name} · {r.category} · {r.urgency}
                </p>
              </div>
              <StatusPill status={r.status} />
            </div>
            <p className="mt-3 text-sm text-charcoal leading-relaxed">{r.description}</p>
            <p className="mt-3 text-xs text-slate">
              Updated {r.updatedAt.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
