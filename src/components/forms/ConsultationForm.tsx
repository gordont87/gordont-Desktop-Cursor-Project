"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Form";
import { Card } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { useState } from "react";

export function ConsultationForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold text-navy">Thank you</h2>
        <p className="mt-3 text-slate text-sm max-w-md mx-auto">
          Demo submission only — no data was sent. In production, connect this form to your CRM or
          email automation.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <Field label="Full name" htmlFor="name" required>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <Field label="Property address" htmlFor="address" required>
          <Input id="address" name="address" required placeholder="123 Main St, Birmingham, AL" />
        </Field>
        <Field label="Property type" htmlFor="propertyType" required>
          <Select id="propertyType" name="propertyType" required defaultValue="Single Family">
            <option>Single Family</option>
            <option>Townhome</option>
            <option>Condo</option>
            <option>Multi-Family</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Number of units" htmlFor="units">
          <Input id="units" name="units" inputMode="numeric" placeholder="1" />
        </Field>
        <Field label="Current rent (if occupied)" htmlFor="currentRent">
          <Input id="currentRent" name="currentRent" inputMode="numeric" placeholder="2500" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Primary management challenge" htmlFor="challenge" required>
            <Textarea
              id="challenge"
              name="challenge"
              required
              placeholder="Tell us what you need help with…"
            />
          </Field>
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm text-slate">
            Prefer to call?{" "}
            <a href={siteConfig.contact.phoneHref} className="text-navy font-medium hover:underline">
              {siteConfig.contact.phone}
            </a>
          </p>
          <Button type="submit">Request Consultation</Button>
        </div>
      </form>
    </Card>
  );
}
