"use client";

import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    title: "Property Analysis",
    detail: "We evaluate condition, comps, and pricing strategy to position your rental competitively.",
  },
  {
    title: "Marketing & Tenant Placement",
    detail: "Professional photography, listing syndication, and showing coordination attract qualified applicants.",
  },
  {
    title: "Tenant Screening",
    detail: "Credit, income, rental history, and background checks via secure third-party screening partners.",
  },
  {
    title: "Rent Collection",
    detail: "Online payments, reminders, and consistent follow-up to keep cash flow predictable.",
  },
  {
    title: "Maintenance & Inspections",
    detail: "Resident requests, vendor coordination, and scheduled inspections protect the asset.",
  },
  {
    title: "Financial Reporting",
    detail: "Owner statements, expense tracking, and portal visibility so you always know where you stand.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="A clear path from inquiry to hands-off ownership"
          description="Six steps designed to reduce friction for owners while delivering a polished resident experience."
        />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <ol className="grid gap-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full text-left rounded-2xl border px-4 py-4 transition-all",
                    active === i
                      ? "border-champagne bg-champagne-muted/40 shadow-[var(--shadow-sm)]"
                      : "border-border bg-white hover:border-champagne/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "size-9 rounded-full font-heading text-sm font-semibold flex items-center justify-center",
                        active === i ? "bg-navy text-white" : "bg-surface-muted text-navy",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="font-heading font-semibold text-navy">{step.title}</span>
                  </div>
                </button>
              </li>
            ))}
          </ol>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="card-surface p-7 md:p-8 min-h-56"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-champagne font-semibold">
              Step {active + 1}
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold">{steps[active].title}</h3>
            <p className="mt-4 text-slate leading-relaxed">{steps[active].detail}</p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
