"use client";

import { createTenantForOwner, type OwnerActionState } from "@/app/actions/owner-tenants";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import { StatusPill } from "@/components/portal/PortalUi";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useActionState } from "react";

const initial: OwnerActionState = {};

type PropertyOption = {
  id: string;
  name: string;
  address: string;
  city: string;
  status: string;
  hasPortalTenant: boolean;
};

type TenantRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  propertyName: string;
  monthlyRent: number;
  leaseStatus: string;
  leaseEnd: string;
};

export function OwnerTenantsClient({
  properties,
  tenants,
}: {
  properties: PropertyOption[];
  tenants: TenantRow[];
}) {
  const [state, action, pending] = useActionState(createTenantForOwner, initial);
  const available = properties.filter((p) => !p.hasPortalTenant);
  const today = new Date().toISOString().slice(0, 10);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const nextYearStr = nextYear.toISOString().slice(0, 10);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Tenants</h1>
        <p className="mt-2 text-sm text-slate">
          Create tenant portal accounts, then edit contact info, rent, or lease dates anytime.
        </p>
      </div>

      <form action={action} className="card-surface p-6 grid gap-4 sm:grid-cols-2">
        <h2 className="font-heading text-lg font-semibold text-navy sm:col-span-2">Add tenant</h2>

        <Field label="Property" htmlFor="propertyId" required>
          <Select id="propertyId" name="propertyId" required defaultValue="">
            <option value="" disabled>
              Select a property
            </option>
            {available.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.city} ({p.status})
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Monthly rent ($)" htmlFor="monthlyRent" required>
          <Input
            id="monthlyRent"
            name="monthlyRent"
            type="number"
            min="1"
            step="0.01"
            required
            placeholder="2850"
          />
        </Field>

        <Field label="Tenant full name" htmlFor="name" required>
          <Input id="name" name="name" required placeholder="Alex Rivera" />
        </Field>

        <Field label="Email (login)" htmlFor="email" required>
          <Input id="email" name="email" type="email" required placeholder="alex@email.com" />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" placeholder="(555) 010-0000" />
        </Field>

        <Field label="Temporary password" htmlFor="password" required hint="Min. 8 characters">
          <Input id="password" name="password" type="text" required minLength={8} autoComplete="off" />
        </Field>

        <Field label="Lease start" htmlFor="startDate" required>
          <Input id="startDate" name="startDate" type="date" required defaultValue={today} />
        </Field>

        <Field label="Lease end" htmlFor="endDate" required>
          <Input id="endDate" name="endDate" type="date" required defaultValue={nextYearStr} />
        </Field>

        <label className="sm:col-span-2 flex items-start gap-3 text-sm text-slate">
          <input type="checkbox" name="createFirstDue" defaultChecked className="mt-1 size-4 accent-navy" />
          <span>Create a rent-due invoice for the lease start month in the tenant portal</span>
        </label>

        {available.length === 0 ? (
          <p className="sm:col-span-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            All of your properties already have a portal tenant. Add another property or end an
            existing tenancy before creating a new account.
          </p>
        ) : null}

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

        <div className="sm:col-span-2">
          <Button type="submit" variant="champagne" disabled={pending || available.length === 0}>
            {pending ? "Creating…" : "Create tenant account"}
          </Button>
        </div>
      </form>

      <section className="card-surface overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-navy">Current tenants</h2>
        </div>
        {tenants.length === 0 ? (
          <p className="p-5 text-sm text-slate">No tenant portal accounts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-surface-muted text-left text-slate">
                <tr>
                  <th className="px-5 py-3 font-medium">Tenant</th>
                  <th className="px-5 py-3 font-medium">Property</th>
                  <th className="px-5 py-3 font-medium">Rent</th>
                  <th className="px-5 py-3 font-medium">Lease end</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"> </th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy">{t.name}</p>
                      <p className="text-xs text-slate">{t.email}</p>
                      {t.phone ? <p className="text-xs text-slate">{t.phone}</p> : null}
                    </td>
                    <td className="px-5 py-3">{t.propertyName}</td>
                    <td className="px-5 py-3">{formatCurrency(t.monthlyRent)}/mo</td>
                    <td className="px-5 py-3">{new Date(t.leaseEnd).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={t.leaseStatus} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/owners/portal/tenants/${t.id}`}
                        className="text-sm font-medium text-champagne hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
