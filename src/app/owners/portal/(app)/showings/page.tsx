import { updateShowingRequestStatus } from "@/app/actions/showing-requests";
import { StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Showing requests" };

const statuses = ["New", "Contacted", "Scheduled", "Completed", "Cancelled"] as const;

export default async function OwnerShowingsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const requests = await prisma.showingRequest.findMany({
    where: { listing: { ownerId: auth.owner.id } },
    include: { listing: true },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Showing requests</h1>
        <p className="mt-2 text-sm text-slate">
          Inquiries from the public Schedule a Showing form. Update status as you follow up.
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="card-surface p-5 text-sm text-slate">
          No showing requests yet. They appear here when someone submits{" "}
          <a href="/rentals/schedule-showing" className="text-champagne hover:underline">
            /rentals/schedule-showing
          </a>
          .
        </p>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading font-semibold text-navy">{r.listingTitle}</h2>
                  <p className="text-sm text-slate mt-1">
                    {r.name} ·{" "}
                    <a href={`mailto:${r.email}`} className="hover:underline">
                      {r.email}
                    </a>{" "}
                    ·{" "}
                    <a href={`tel:${r.phone}`} className="hover:underline">
                      {r.phone}
                    </a>
                  </p>
                </div>
                <StatusPill status={r.status} />
              </div>
              {r.preferredTimes ? (
                <p className="mt-3 text-sm text-charcoal leading-relaxed">
                  Preferred times: {r.preferredTimes}
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <form action={updateShowingRequestStatus} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="id" value={r.id} />
                  <label className="text-xs text-slate" htmlFor={`status-${r.id}`}>
                    Status
                  </label>
                  <select
                    id={`status-${r.id}`}
                    name="status"
                    defaultValue={r.status}
                    className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="text-sm font-medium text-champagne hover:underline"
                  >
                    Update
                  </button>
                </form>
                <p className="text-xs text-slate ml-auto">
                  Submitted {r.createdAt.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
