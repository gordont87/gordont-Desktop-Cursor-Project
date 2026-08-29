import { PayRentClient } from "@/components/portal/PayRentClient";
import { requireTenant } from "@/lib/tenant-auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Pay Rent" };

export default async function TenantPayRentPage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  const payments = await prisma.rentPayment.findMany({
    where: { tenantId: auth.tenant.id },
    orderBy: { dueDate: "desc" },
  });

  const due = payments.find((p) => p.status === "Due") ?? null;
  const serialize = (p: (typeof payments)[number]) => ({
    id: p.id,
    amount: p.amount,
    dueDate: p.dueDate.toISOString(),
    status: p.status,
    method: p.method,
    paidAt: p.paidAt?.toISOString() ?? null,
    note: p.note,
  });

  return (
    <PayRentClient
      due={due ? serialize(due) : null}
      history={payments.map(serialize)}
    />
  );
}
