"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export function PricingComparison({
  plans,
  ctaHref = "/contact",
  ctaLabel = "Schedule a Consultation",
}: {
  plans: PricingPlan[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [selected, setSelected] = useState(plans.find((p) => p.highlighted)?.id ?? plans[0]?.id);
  const active = plans.find((p) => p.id === selected) ?? plans[0];

  return (
    <div className="space-y-8">
      <p className="text-sm text-amber-950 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <span className="placeholder-chip mr-2">Demo pricing</span>
        Rates shown are placeholders for layout only — confirm final fees with your account manager.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            className={cn(
              "text-left rounded-2xl border p-6 transition-all",
              selected === plan.id
                ? "border-champagne bg-champagne-muted/30 ring-2 ring-champagne shadow-[var(--shadow-md)]"
                : "border-border bg-white hover:border-champagne/60",
            )}
          >
            {plan.highlighted ? (
              <span className="text-xs font-semibold uppercase tracking-wider text-champagne mb-2 block">
                Most Popular
              </span>
            ) : null}
            <h3 className="font-heading text-xl font-semibold text-navy">{plan.name}</h3>
            <p className="mt-2 text-3xl font-semibold text-navy">{plan.price}</p>
            <p className="text-xs text-slate mt-1">{plan.priceNote}</p>
            <p className="mt-3 text-sm text-slate">{plan.description}</p>
          </button>
        ))}
      </div>

      {active ? (
        <div className="card-surface p-6 md:p-8">
          <h3 className="font-heading text-2xl font-semibold text-navy">{active.name} includes</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-charcoal">
                <Check className="size-4 text-champagne shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={ctaHref}>{ctaLabel}</Button>
            <Button href="/owners/rental-analysis" variant="outline">
              Get Free Rental Analysis
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const managementPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "8%",
    priceNote: "PLACEHOLDER — of collected rent",
    description: "Core leasing and rent collection for hands-on owners.",
    features: [
      "Tenant screening coordination",
      "Lease preparation",
      "Online rent collection",
      "Monthly owner statements",
      "Maintenance coordination",
    ],
  },
  {
    id: "full-service",
    name: "Full-Service",
    price: "10%",
    priceNote: "PLACEHOLDER — of collected rent",
    description: "Complete management for most residential portfolios.",
    highlighted: true,
    features: [
      "Everything in Essential",
      "Marketing & showings",
      "Move-in / move-out inspections",
      "24/7 maintenance triage",
      "Renewal management",
      "Eviction coordination support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "12%",
    priceNote: "PLACEHOLDER — of collected rent",
    description: "White-glove service for investors and multi-property owners.",
    features: [
      "Everything in Full-Service",
      "Quarterly property inspections",
      "CapEx planning support",
      "Priority maintenance response",
      "Investor reporting dashboard",
      "Dedicated portfolio manager",
    ],
  },
];

export const ownerPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "8%",
    priceNote: "PLACEHOLDER — monthly management fee",
    description: "Leasing support and rent collection essentials.",
    features: [
      "Listing syndication",
      "Applicant screening via third party",
      "Lease execution",
      "Owner portal access",
      "Maintenance vendor dispatch",
    ],
  },
  {
    id: "full-service",
    name: "Full-Service",
    price: "10%",
    priceNote: "PLACEHOLDER — monthly management fee",
    description: "End-to-end management for stress-free ownership.",
    highlighted: true,
    features: [
      "Everything in Essential",
      "Professional photography",
      "Showing coordination",
      "Routine & move inspections",
      "Accounting & 1099 support",
      "Lease renewal campaigns",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "12%",
    priceNote: "PLACEHOLDER — monthly management fee",
    description: "Maximum support for growing portfolios.",
    features: [
      "Everything in Full-Service",
      "Investor-grade reporting",
      "Vacancy loss mitigation plan",
      "Preferred vendor network",
      "Annual property performance review",
      "Portfolio strategy consults",
    ],
  },
];
