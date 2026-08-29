import { logoutOwner } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { requireOwner } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Account settings</h1>
        <p className="mt-2 text-sm text-slate">Your owner profile on file.</p>
      </div>

      <div className="card-surface p-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate">Name</p>
          <p className="mt-1 font-medium text-navy">{auth.owner.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate">Email</p>
          <p className="mt-1 font-medium text-navy">{auth.owner.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate">Phone</p>
          <p className="mt-1 font-medium text-navy">{auth.owner.phone ?? "—"}</p>
        </div>
        <p className="text-xs text-slate pt-2">
          Profile editing, password reset, and payout banking should be added before production. Do
          not collect raw bank account numbers on this site without a secure payment processor.
        </p>
      </div>

      <form action={logoutOwner}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
