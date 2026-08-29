"use client";

import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { motion } from "framer-motion";

export function BeforeAfterStory() {
  return (
    <Section id="before-after">
      <Container>
        <SectionHeading
          eyebrow="Success Story"
          title="From prolonged vacancy to stronger cash flow"
          description="Illustrative before-and-after figures for demonstration. Replace with verified case studies before publishing."
          align="center"
        />
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-surface-muted p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">Before</p>
            <ul className="mt-5 space-y-4">
              <li className="flex justify-between gap-4 border-b border-border pb-3">
                <span className="text-slate">Monthly Rent</span>
                <span className="font-heading font-semibold text-navy">$1,500</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate">Vacancy</span>
                <span className="font-heading font-semibold text-navy">35 days</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-success/25 bg-success-soft p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-success">After</p>
            <ul className="mt-5 space-y-4">
              <li className="flex justify-between gap-4 border-b border-success/20 pb-3">
                <span className="text-slate">Monthly Rent</span>
                <span className="font-heading font-semibold text-success">$1,850</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate">Vacancy</span>
                <span className="font-heading font-semibold text-success">8 days</span>
              </li>
            </ul>
          </motion.div>
        </div>
        <p className="text-center mt-6">
          <span className="placeholder-chip">Illustrative example</span>
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/success-stories" variant="outline">
            View Case Studies
          </Button>
        </div>
      </Container>
    </Section>
  );
}
