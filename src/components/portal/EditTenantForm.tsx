"use client";

import { updateTenantForOwner, type OwnerActionState } from "@/app/actions/owner-tenants";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import Link from "next/link";
import { useActionState } from "react";

const initial: OwnerActionState = {};

export type EditableTenant = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  propertyName: string;
  propertyAddress: string;
  monthlyRent: number;
  leaseStatus: string;
  leaseStart: string;
  leaseEnd: string;
};

function toDateInput(iso: string) {
  return iso.slice(0, 10);
}

export function EditTenantForm({ tenant }: { tenant: EditableTenant }) {
  const [state, action, pending] = useActionState(updateTenantForOwner, initial);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/owners/portal/tenants" className="text-sm text-champagne hover:underline">
          ← Tenants
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-navy">Edit tenant</h1>
        <p className="mt-2 text-sm text-slate">
          Update contact info, rent, or extend the lease for {tenant.propertyName}.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-slate">
        <p className="font-medium text-navy">{tenant.propertyName}</p>
        <p>{tenant.propertyAddress}</p>
      </div>

      <form action={action} className="card-surface p-6 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="tenantId" value={tenant.id} />

        <Field label="Full name" htmlFor="name" required>
          <Input id="name" name="name" required defaultValue={tenant.name} />
        </Field>

        <Field label="Email (login)" htmlFor="email" required>
          <Input id="email" name="email" type="email" required defaultValue={tenant.email} />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" defaultValue={tenant.phone ?? ""} />
        </Field>

        <Field label="Monthly rent ($)" htmlFor="monthlyRent" required>
          <Input
            id="monthlyRent"
            name="monthlyRent"
            type="number"
            min="1"
            step="0.01"
            required
            defaultValue={tenant.monthlyRent}
          />
        </Field>

        <Field label="Lease start" htmlFor="startDate" required>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={toDateInput(tenant.leaseStart)}
          />
        </Field>

        <Field label="Lease end" htmlFor="endDate" required hint="Extend the lease by moving this date forward">
          <Input
            id="endDate"
            name="endDate"
            type="date"
            required
            defaultValue={toDateInput(tenant.leaseEnd)}
          />
        </Field>

        <Field label="Lease status" htmlFor="leaseStatus" required>
          <Select id="leaseStatus" name="leaseStatus" defaultValue={tenant.leaseStatus}>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Ended">Ended</option>
          </Select>
        </Field>

        <Field
          label="Reset password (optional)"
          htmlFor="newPassword"
          hint="Leave blank to keep the current password"
        >
          <Input
            id="newPassword"
            name="newPassword"
            type="text"
            minLength={8}
            autoComplete="off"
            placeholder="New temporary password"
          />
        </Field>

        {state.error ? (
          <p className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="sm:col-span-2 text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
            {state.success}
          </p>
        ) : null}

        <div className="sm:col-span-2 flex flex-wrap gap-3">
          <Button type="submit" variant="champagne" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </Button>
          <Button href="/owners/portal/tenants" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
