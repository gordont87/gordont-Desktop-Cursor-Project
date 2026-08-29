import { Money } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Statements" };

export default async function StatementsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const statements = await prisma.statement.findMany({
    where: { ownerId: auth.owner.id },
    orderBy: { periodStart: "desc" },
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Owner statements</h1>
        <p className="mt-2 text-sm text-slate">
          Monthly summaries of income, expenses, and owner distributions.
        </p>
      </div>

      <ul className="space-y-4">
        {statements.map((s) => (
          <li key={s.id} className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy">{s.periodLabel}</h2>
                <p className="text-xs text-slate mt-1">
                  {s.periodStart.toLocaleDateString()} – {s.periodEnd.toLocaleDateString()}
                </p>
              </div>
              <p className="font-heading text-xl font-semibold text-success">
                {formatCurrency(s.distribution)}{" "}
                <span className="text-sm font-medium text-slate">distributed</span>
              </p>
            </div>
            <dl className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-surface-muted px-4 py-3">
                <dt className="text-slate text-xs">Income</dt>
                <dd className="font-semibold text-success mt-1">
                  <Money amount={s.totalIncome} />
                </dd>
              </div>
              <div className="rounded-xl bg-surface-muted px-4 py-3">
                <dt className="text-slate text-xs">Expenses</dt>
                <dd className="font-semibold text-navy mt-1">
                  <Money amount={s.totalExpenses} />
                </dd>
              </div>
              <div className="rounded-xl bg-surface-muted px-4 py-3">
                <dt className="text-slate text-xs">Net distribution</dt>
                <dd className="font-semibold text-navy mt-1">
                  <Money amount={s.distribution} />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
