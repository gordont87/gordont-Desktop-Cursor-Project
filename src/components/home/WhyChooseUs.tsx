"use client";

import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  HandCoins,
  MapPinned,
  ShieldCheck,
  UserCheck,
  Wrench,
} from "lucide-react";

const features = [
  {
    title: "Maximized Rental Income",
    description: "Data-informed pricing and marketing designed to keep vacancies short and rents competitive.",
    icon: HandCoins,
  },
  {
    title: "Qualified Tenant Placement",
    description: "Thorough screening through secure third-party platforms — never via ordinary web forms.",
    icon: UserCheck,
  },
  {
    title: "24/7 Maintenance Coordination",
    description: "Residents submit requests anytime; we coordinate trusted vendors and keep you informed.",
    icon: Wrench,
  },
  {
    title: "Property Protection",
    description: "Routine inspections, documentation, and proactive care that help protect your asset.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Financial Reporting",
    description: "Clear statements, expense tracking, and owner visibility through a modern portal experience.",
    icon: ClipboardCheck,
  },
  {
    title: "Local Market Expertise",
    description: "Neighborhood-level knowledge that supports smarter leasing and investment decisions.",
    icon: MapPinned,
  },
];

export function WhyChooseUs() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Property management built for trust and results"
          description="A premium operating system for owners who want stronger returns without the daily stress of landlording."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <Card className="h-full hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="size-11 rounded-xl bg-champagne-muted text-navy flex items-center justify-center mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
