import { updateAnalysisLeadStatus } from "@/app/actions/analysis-leads";
import { StatusPill } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Analysis leads" };

const statuses = ["New", "Contacted", "Qualified", "Closed", "Archived"] as const;

export default async function AnalysisLeadsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const leads = await prisma.analysisLead.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Analysis leads</h1>
        <p className="mt-2 text-sm text-slate">
          Requests from the free rental / investment analysis forms across the site.
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="card-surface p-5 text-sm text-slate">
          No analysis leads yet. They appear when someone completes the form on the homepage,
          Investors analysis, or Owners rental analysis pages.
        </p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li key={lead.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading font-semibold text-navy">{lead.address}</h2>
                  <p className="text-sm text-slate mt-1">
                    {lead.propertyType} · {lead.beds} bed · {lead.baths} bath
                    {lead.sqft ? ` · ${lead.sqft.toLocaleString()} sqft` : ""}
                    {lead.currentRent != null
                      ? ` · current ${formatCurrency(lead.currentRent)}/mo`
                      : ""}
                  </p>
                  <p className="text-sm text-slate mt-1">
                    {lead.name} ·{" "}
                    <a href={`mailto:${lead.email}`} className="hover:underline">
                      {lead.email}
                    </a>{" "}
                    ·{" "}
                    <a href={`tel:${lead.phone}`} className="hover:underline">
                      {lead.phone}
                    </a>
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <StatusPill status={lead.status} />
                  <p className="text-xs text-slate capitalize">Source: {lead.source}</p>
                </div>
              </div>
              {lead.estimateLow != null && lead.estimateHigh != null ? (
                <p className="mt-3 text-sm text-charcoal">
                  Shown estimate: {formatCurrency(lead.estimateLow)} –{" "}
                  {formatCurrency(lead.estimateHigh)}/mo
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <form action={updateAnalysisLeadStatus} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <label className="text-xs text-slate" htmlFor={`status-${lead.id}`}>
                    Status
                  </label>
                  <select
                    id={`status-${lead.id}`}
                    name="status"
                    defaultValue={lead.status}
                    className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="text-sm font-medium text-champagne hover:underline">
                    Update
                  </button>
                </form>
                <p className="text-xs text-slate ml-auto">
                  Submitted {lead.createdAt.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
