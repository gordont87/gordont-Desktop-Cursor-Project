import type { DemandSignals, MarketSnapshot } from "@/lib/data/market-reports";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

function pct(n: number | null) {
  if (n == null) return "—";
  return `${Math.round(n * 100)}%`;
}

function money(n: number | null) {
  if (n == null) return "—";
  return formatCurrency(Math.round(n));
}

export function MarketSnapshotPanel({
  snapshot,
  demand,
}: {
  snapshot: MarketSnapshot;
  demand: DemandSignals;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-navy">Live inventory dashboard</h2>
        <p className="mt-2 text-sm text-slate max-w-2xl leading-relaxed">
          {snapshot.sampleSize === 0
            ? "No public listings on this site yet. Not a metro-wide MLS index."
            : `Calculated from ${snapshot.sampleSize} publicly listed ${
                snapshot.sampleSize === 1 ? "home" : "homes"
              } on this site · updated ${snapshot.generatedAt.toLocaleString()}. Not a metro-wide MLS index.`}
        </p>
      </div>

      {snapshot.sampleSize === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface-muted px-5 py-8 text-sm text-slate text-center">
          No public listings yet — add inventory in the owner portal to populate rent analytics.{" "}
          <Link href="/owners/portal/listings" className="text-champagne hover:underline">
            Manage listings
          </Link>
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              label="Available"
              value={String(snapshot.availableCount)}
              hint={`${snapshot.pendingCount} pending`}
            />
            <Metric label="Avg asking rent" value={`${money(snapshot.avgRent)}/mo`} />
            <Metric label="Median asking rent" value={`${money(snapshot.medianRent)}/mo`} />
            <Metric
              label="Rent range"
              value={
                snapshot.minRent != null && snapshot.maxRent != null
                  ? `${money(snapshot.minRent)} – ${money(snapshot.maxRent)}`
                  : "—"
              }
            />
            <Metric label="Avg size" value={snapshot.avgSqft ? `${Math.round(snapshot.avgSqft)} sqft` : "—"} />
            <Metric
              label="Avg $/sqft"
              value={
                snapshot.avgRentPerSqft != null
                  ? `$${snapshot.avgRentPerSqft.toFixed(2)}`
                  : "—"
              }
            />
            <Metric label="With garage" value={pct(snapshot.garageShare)} />
            <Metric label="With pool" value={pct(snapshot.poolShare)} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <DataTable
              title="Asking rent by city"
              headers={["City", "Homes", "Avg", "Range"]}
              rows={snapshot.byCity.map((r) => [
                r.city,
                String(r.count),
                `${money(r.avgRent)}/mo`,
                `${money(r.minRent)} – ${money(r.maxRent)}`,
              ])}
            />
            <div className="space-y-8">
              <DataTable
                title="By property type"
                headers={["Type", "Homes", "Avg rent"]}
                rows={snapshot.byType.map((r) => [
                  r.type,
                  String(r.count),
                  `${money(r.avgRent)}/mo`,
                ])}
              />
              <DataTable
                title="By bedrooms"
                headers={["Beds", "Homes", "Avg rent"]}
                rows={snapshot.byBeds.map((r) => [
                  String(r.beds),
                  String(r.count),
                  `${money(r.avgRent)}/mo`,
                ])}
              />
            </div>
          </div>
        </>
      )}

      <div>
        <h3 className="font-heading text-xl font-semibold text-navy">First-party demand signals</h3>
        <p className="mt-2 text-sm text-slate max-w-2xl leading-relaxed">
          From Schedule a Showing and rental analysis forms on this site — useful operational
          indicators, not government vacancy rates.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Showings (30 days)" value={String(demand.showingsLast30Days)} />
          <Metric label="Showings awaiting follow-up" value={String(demand.showingsNew)} />
          <Metric label="Analysis leads (30 days)" value={String(demand.analysisLeadsLast30Days)} />
          <Metric label="New analysis leads" value={String(demand.analysisLeadsNew)} />
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-slate">{label}</p>
      <p className="mt-2 font-heading text-xl font-semibold text-navy">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate">{hint}</p> : null}
    </div>
  );
}

function DataTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  if (rows.length === 0) {
    return (
      <div>
        <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
        <p className="mt-2 text-sm text-slate">No data yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-navy mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm min-w-[320px]">
          <thead className="bg-surface-muted text-left text-slate">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-border">
                {row.map((cell, i) => (
                  <td
                    key={`${row[0]}-${headers[i]}`}
                    className={`px-4 py-3 ${i === 0 ? "font-medium text-navy" : "text-charcoal"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
