"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Form";
import { Card } from "@/components/ui/Section";
import { useState } from "react";

export function MaintenanceForm() {
  const [done, setDone] = useState(false);
  const [urgency, setUrgency] = useState("Normal");

  if (done) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold text-navy">Request submitted</h2>
        <p className="mt-3 text-slate text-sm max-w-md mx-auto">
          Demo confirmation only. In production this syncs to your maintenance workflow / PMS.
          Confirmation emails require email provider credentials.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {urgency === "Emergency" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-950">
          <p className="font-semibold">Emergency guidance</p>
          <p className="mt-2 leading-relaxed">
            If there is immediate danger — fire, gas smell, flooding that threatens safety, or medical
            emergency — call 911 or the appropriate emergency service first. Then notify property
            management when it is safe to do so.
          </p>
        </div>
      ) : null}

      <Field label="Property / address" htmlFor="property" required>
        <Input id="property" required placeholder="Select or type your address" />
      </Field>
      <Field label="Issue category" htmlFor="category" required>
        <Select id="category" required defaultValue="Plumbing">
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>HVAC</option>
          <option>Appliance</option>
          <option>Pest</option>
          <option>Structural / Exterior</option>
          <option>Other</option>
        </Select>
      </Field>
      <Field label="Urgency" htmlFor="urgency" required>
        <Select
          id="urgency"
          required
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option>Normal</option>
          <option>Urgent</option>
          <option>Emergency</option>
        </Select>
      </Field>
      <Field label="Describe the issue" htmlFor="description" required>
        <Textarea id="description" required placeholder="What is happening? When did it start?" />
      </Field>
      <Field label="Access instructions" htmlFor="access">
        <Textarea id="access" placeholder="Gate codes, pet notes, preferred entry times…" />
      </Field>
      <Field
        label="Upload photos"
        htmlFor="photos"
        hint="Demo UI only — file storage requires cloud/PMS configuration."
      >
        <Input id="photos" type="file" accept="image/*" multiple />
      </Field>
      <Field
        label="Upload short video"
        htmlFor="video"
        hint="Optional. Demo UI only."
      >
        <Input id="video" type="file" accept="video/*" />
      </Field>
      <Button type="submit" variant="champagne">
        Submit Maintenance Request
      </Button>
    </form>
  );
}
