"use client";

import { submitTenantMaintenance, type AuthState } from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Form";
import { StatusPill } from "@/components/portal/PortalUi";
import { useActionState } from "react";

const initial: AuthState = {};

type RequestItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: string;
  status: string;
  updatedAt: string;
};

export function TenantMaintenanceClient({ requests }: { requests: RequestItem[] }) {
  const [state, action, pending] = useActionState(submitTenantMaintenance, initial);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Maintenance</h1>
        <p className="mt-2 text-sm text-slate">
          Submit a request and track status. For fire, gas, flooding, or immediate danger, call 911
          first.
        </p>
      </div>

      <form action={action} className="card-surface p-6 grid gap-4">
        <h2 className="font-heading text-lg font-semibold text-navy">New request</h2>
        <Field label="Title" htmlFor="title" required>
          <Input id="title" name="title" required placeholder="e.g. Kitchen faucet drip" />
        </Field>
        <Field label="Category" htmlFor="category" required>
          <Select id="category" name="category" defaultValue="Plumbing">
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>HVAC</option>
            <option>Appliance</option>
            <option>Pest</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Urgency" htmlFor="urgency" required>
          <Select id="urgency" name="urgency" defaultValue="Normal">
            <option>Normal</option>
            <option>Urgent</option>
            <option>Emergency</option>
          </Select>
        </Field>
        <Field label="Description" htmlFor="description" required>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="What is happening? When did it start?"
          />
        </Field>
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
          {pending ? "Submitting…" : "Submit request"}
        </Button>
      </form>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-navy">Your requests</h2>
        {requests.length === 0 ? (
          <p className="text-sm text-slate">No maintenance requests yet.</p>
        ) : (
          requests.map((r) => (
            <article key={r.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-semibold text-navy">{r.title}</h3>
                  <p className="text-xs text-slate mt-1">
                    {r.category} · {r.urgency}
                  </p>
                </div>
                <StatusPill status={r.status} />
              </div>
              <p className="mt-3 text-sm text-charcoal">{r.description}</p>
              <p className="mt-2 text-xs text-slate">
                Updated {new Date(r.updatedAt).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
