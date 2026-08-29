import { Money, StatCard } from "@/components/portal/PortalUi";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Financials" };

export default async function FinancialsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const transactions = await prisma.transaction.findMany({
    where: { property: { ownerId: auth.owner.id } },
    include: { property: true },
    orderBy: { date: "desc" },
  });

  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Financials</h1>
        <p className="mt-2 text-sm text-slate">
          Income, expenses, and net cash flow across your portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total income" value={formatCurrency(income)} tone="success" />
        <StatCard label="Total expenses" value={formatCurrency(expenses)} />
        <StatCard
          label="Net cash flow"
          value={formatCurrency(income - expenses)}
          tone="success"
        />
      </div>

      <section className="card-surface p-5 overflow-x-auto">
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Ledger</h2>
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-slate border-b border-border">
              <th className="py-2 pr-3 font-medium">Date</th>
              <th className="py-2 pr-3 font-medium">Property</th>
              <th className="py-2 pr-3 font-medium">Type</th>
              <th className="py-2 pr-3 font-medium">Category</th>
              <th className="py-2 pr-3 font-medium">Description</th>
              <th className="py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border/60">
                <td className="py-2.5 pr-3 whitespace-nowrap">{t.date.toLocaleDateString()}</td>
                <td className="py-2.5 pr-3">{t.property.name}</td>
                <td className="py-2.5 pr-3 capitalize">{t.type}</td>
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
      </section>
    </div>
  );
}
