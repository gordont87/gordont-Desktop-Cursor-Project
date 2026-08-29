"use client";

import { submitAnalysisLead, type AnalysisLeadState } from "@/app/actions/analysis-leads";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { useState, useTransition } from "react";

type Step = "property" | "estimate" | "contact" | "done";

export function RentalAnalysisTool({
  embedded = false,
  source = "website",
}: {
  embedded?: boolean;
  /** Where the form was submitted from (homepage, investors, owners, etc.) */
  source?: string;
}) {
  const [step, setStep] = useState<Step>("property");
  const [form, setForm] = useState({
    address: "",
    propertyType: "Single Family",
    beds: "3",
    baths: "2",
    sqft: "",
    currentRent: "",
    name: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [submitState, setSubmitState] = useState<AnalysisLeadState>({});
  const [pending, startTransition] = useTransition();

  // Illustrative range until comps/API are connected — stored with the lead for context
  const low = 2200;
  const high = 2650;

  function update(key: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setStep("property");
    setSubmitState({});
    setForm({
      address: "",
      propertyType: "Single Family",
      beds: "3",
      baths: "2",
      sqft: "",
      currentRent: "",
      name: "",
      email: "",
      phone: "",
      consent: false,
    });
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState({});
    startTransition(async () => {
      const result = await submitAnalysisLead({
        source,
        address: form.address,
        propertyType: form.propertyType,
        beds: form.beds,
        baths: form.baths,
        sqft: form.sqft,
        currentRent: form.currentRent,
        estimateLow: low,
        estimateHigh: high,
        name: form.name,
        email: form.email,
        phone: form.phone,
        consent: form.consent,
      });
      setSubmitState(result);
      if (result.success) setStep("done");
    });
  }

  const inner = (
    <Card className="max-w-3xl mx-auto p-6 md:p-8">
      {step === "property" && (
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("estimate");
          }}
        >
          <div className="sm:col-span-2">
            <Field label="Property address" htmlFor="address" required>
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Main St, Birmingham, AL"
              />
            </Field>
          </div>
          <Field label="Property type" htmlFor="propertyType" required>
            <Select
              id="propertyType"
              value={form.propertyType}
              onChange={(e) => update("propertyType", e.target.value)}
            >
              <option>Single Family</option>
              <option>Townhome</option>
              <option>Condo</option>
              <option>Multi-Family</option>
            </Select>
          </Field>
          <Field label="Bedrooms" htmlFor="beds" required>
            <Select id="beds" value={form.beds} onChange={(e) => update("beds", e.target.value)}>
              {["1", "2", "3", "4", "5+"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Select>
          </Field>
          <Field label="Bathrooms" htmlFor="baths" required>
            <Select id="baths" value={form.baths} onChange={(e) => update("baths", e.target.value)}>
              {["1", "1.5", "2", "2.5", "3", "3.5+"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Select>
          </Field>
          <Field label="Approx. square footage" htmlFor="sqft">
            <Input
              id="sqft"
              inputMode="numeric"
              value={form.sqft}
              onChange={(e) => update("sqft", e.target.value)}
              placeholder="1600"
            />
          </Field>
          <Field label="Current monthly rent (if any)" htmlFor="currentRent">
            <Input
              id="currentRent"
              inputMode="numeric"
              value={form.currentRent}
              onChange={(e) => update("currentRent", e.target.value)}
              placeholder="2400"
            />
          </Field>
          <div className="sm:col-span-2 pt-2">
            <Button type="submit" variant="champagne" className="w-full sm:w-auto">
              See Estimated Range
            </Button>
          </div>
        </form>
      )}

      {step === "estimate" && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-success-soft border border-success/20 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-success font-semibold">
              Illustrative estimate
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-navy">
              ${low.toLocaleString()} – ${high.toLocaleString()}
              <span className="text-base font-medium text-slate"> / month</span>
            </p>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              This is a sample range for demonstration only — not a formal appraisal or guarantee.
              A personalized analysis will be prepared after you share contact details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="champagne" onClick={() => setStep("contact")}>
              Get My Personalized Analysis
            </Button>
            <Button type="button" variant="outline" onClick={() => setStep("property")}>
              Edit Property Details
            </Button>
          </div>
        </div>
      )}

      {step === "contact" && (
        <form className="grid gap-4" onSubmit={handleContactSubmit}>
          <Field label="Full name" htmlFor="name" required>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <Field label="Email" htmlFor="email" required>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
          <Field label="Phone" htmlFor="phone" required>
            <Input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </Field>
          <label className="flex gap-3 items-start text-sm text-slate">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-navy"
              checked={form.consent}
              required
              onChange={(e) => update("consent", e.target.checked)}
            />
            <span>
              I agree to be contacted about property management services and a rental analysis for
              the property I submitted. Message/data rates may apply. I can unsubscribe anytime. See
              our Privacy Policy.
            </span>
          </label>
          {submitState.error ? (
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {submitState.error}
            </p>
          ) : null}
          <Button type="submit" variant="champagne" disabled={pending}>
            {pending ? "Submitting…" : "Request My Free Analysis"}
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="text-center py-4">
          <p className="font-heading text-2xl font-semibold text-navy">Request received</p>
          <p className="mt-3 text-slate text-sm max-w-md mx-auto">
            Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.{" "}
            {submitState.success ||
              "Your analysis request was saved. Our team will follow up shortly."}
          </p>
          <Button type="button" className="mt-6" variant="outline" onClick={resetForm}>
            Submit Another Property
          </Button>
        </div>
      )}
    </Card>
  );

  if (embedded) return inner;

  return (
    <Section muted id="rental-analysis">
      <Container>
        <SectionHeading
          eyebrow="Free Rental Analysis"
          title="What could your property rent for?"
          description="Share a few details and we’ll prepare a personalized analysis. Estimates shown here are illustrative until real comps are connected."
          align="center"
        />
        {inner}
      </Container>
    </Section>
  );
}
