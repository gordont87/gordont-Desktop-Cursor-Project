import { formatCurrency } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warn";
}) {
  const valueClass =
    tone === "success" ? "text-success" : tone === "warn" ? "text-amber-700" : "text-navy";
  return (
    <div className="card-surface p-5">
      <p className="text-xs uppercase tracking-wider text-slate">{label}</p>
      <p className={`mt-2 font-heading text-2xl font-semibold ${valueClass}`}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate">{hint}</p> : null}
    </div>
  );
}

export function Money({ amount }: { amount: number }) {
  return (
    <span className={amount < 0 ? "text-red-700" : undefined}>{formatCurrency(amount, 2)}</span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    /new|open|vacant|progress|contacted/i.test(status)
      ? "bg-amber-50 text-amber-800 border-amber-200"
      :     /closed|occupied|active|excellent|good|scheduled|completed|qualified/i.test(status)
        ? "bg-success-soft text-success border-success/20"
        : /cancelled|archived/i.test(status)
          ? "bg-red-50 text-red-800 border-red-200"
          : "bg-surface-muted text-slate border-border";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${tone}`}>
      {status}
    </span>
  );
}
