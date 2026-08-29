"use client";

import { submitShowingRequest, type ShowingActionState } from "@/app/actions/showing-requests";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Form";
import { Card } from "@/components/ui/Section";
import type { PropertyListing } from "@/lib/data/listings";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const initial: ShowingActionState = {};

export function ShowingRequestForm({ listings }: { listings: PropertyListing[] }) {
  const searchParams = useSearchParams();
  const defaultProperty = searchParams.get("property") ?? "";
  const [state, formAction, pending] = useActionState(submitShowingRequest, initial);

  if (state.success) {
    return (
      <Card className="p-8 text-center max-w-xl mx-auto">
        <h2 className="font-heading text-2xl font-semibold text-navy">Showing request received</h2>
        <p className="mt-3 text-slate text-sm">{state.success}</p>
        <p className="mt-2 text-xs text-slate">We do not collect Social Security numbers on this site.</p>
        <Button className="mt-6" href="/rentals" variant="outline">
          Back to rentals
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 max-w-xl mx-auto">
      <form action={formAction} className="grid gap-4">
        <Field label="Full name" htmlFor="name" required>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <Field label="Property of interest" htmlFor="property" required>
          <Select id="property" name="property" defaultValue={defaultProperty} required>
            <option value="">Select a property</option>
            {listings.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.title} — {l.address}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Preferred showing times"
          htmlFor="times"
          hint="Share a few windows that work for you."
        >
          <Textarea
            id="times"
            name="times"
            placeholder="e.g. Weekday evenings after 5 PM, Saturday morning"
          />
        </Field>
        <p className="text-xs text-slate">
          Equal housing opportunity. We welcome applications from all qualified applicants regardless
          of race, color, religion, sex, national origin, disability, familial status, or other
          protected characteristics.
        </p>
        {state.error ? (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting…" : "Request Showing"}
        </Button>
      </form>
    </Card>
  );
}
