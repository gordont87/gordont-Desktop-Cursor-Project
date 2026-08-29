"use client";

import { payRentDue, type AuthState } from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useActionState } from "react";

const initial: AuthState = {};

type Payment = {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  method: string | null;
  paidAt: string | null;
  note: string | null;
};

export function PayRentClient({
  due,
  history,
}: {
  due: Payment | null;
  history: Payment[];
}) {
  const [state, action, pending] = useActionState(payRentDue, initial);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Pay rent</h1>
        <p className="mt-2 text-sm text-slate">
          Review your balance and payment history. Card/bank data is never collected on this form.
        </p>
      </div>

      {due ? (
        <div className="card-surface p-6 border-champagne/40">
          <p className="text-xs uppercase tracking-wider text-slate">Amount due</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-navy">
            {formatCurrency(due.amount)}
          </p>
          <p className="mt-1 text-sm text-slate">Due {new Date(due.dueDate).toLocaleDateString()}</p>

          <form action={action} className="mt-5 space-y-3">
            <input type="hidden" name="paymentId" value={due.id} />
            <p className="text-xs text-slate leading-relaxed">
              Demo checkout marks this invoice paid in the database and posts income to the owner
              ledger. Replace with Stripe (or a rent-pay vendor) before accepting real payments.
            </p>
            {state.error ? (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {state.error}
              </p>
            ) : null}
            {state.success ? (
              <p className="text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
                {state.success}
              </p>
            ) : null}
            <Button type="submit" variant="champagne" disabled={pending}>
              {pending ? "Processing…" : "Pay now (demo)"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="card-surface p-6">
          <p className="font-heading text-xl font-semibold text-success">You&apos;re all caught up</p>
          <p className="mt-2 text-sm text-slate">No rent is currently due on your account.</p>
        </div>
      )}

      <section className="card-surface p-5">
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">Payment history</h2>
        <ul className="space-y-3">
          {history.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 last:border-0"
            >
              <div>
                <p className="font-medium text-navy">{formatCurrency(p.amount)}</p>
                <p className="text-xs text-slate">
                  Due {new Date(p.dueDate).toLocaleDateString()}
                  {p.paidAt ? ` · Paid ${new Date(p.paidAt).toLocaleDateString()}` : ""}
                </p>
                {p.method ? <p className="text-xs text-slate mt-0.5">{p.method}</p> : null}
              </div>
              <span
                className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border ${
                  p.status === "Paid"
                    ? "bg-success-soft text-success border-success/20"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
