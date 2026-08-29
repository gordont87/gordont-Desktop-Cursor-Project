"use client";

import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { motion } from "framer-motion";
import {
  ClipboardList,
  FileText,
  Home,
  LineChart,
  PieChart,
  Wrench,
} from "lucide-react";

const tiles = [
  { label: "Monthly rental income", value: "$8,450", tone: "success", icon: LineChart },
  { label: "Occupancy", value: "100%", tone: "success", icon: Home },
  { label: "Expenses (MTD)", value: "$1,280", tone: "neutral", icon: PieChart },
  { label: "Open maintenance", value: "2", tone: "neutral", icon: Wrench },
  { label: "Lease status", value: "Active · 8 mo left", tone: "neutral", icon: ClipboardList },
  { label: "Documents", value: "12 files", tone: "neutral", icon: FileText },
];

export function TechnologySection() {
  return (
    <Section muted>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeading
              eyebrow="Technology"
              title="Owner visibility without the guesswork"
              description="A modern dashboard experience keeps income, occupancy, maintenance, leases, inspections, and statements in one place."
              className="mb-6"
            />
            <p className="text-sm text-slate leading-relaxed">
              Portal screens below are a product mock using demo data. Live owner portals require
              integration with your property management platform (AppFolio, Buildium, Rent Manager,
              Propertyware, or similar) and authenticated SSO.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-white shadow-[var(--shadow)] overflow-hidden"
          >
            <div className="bg-navy px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-heading font-semibold">Owner Dashboard</p>
                <p className="text-white/60 text-xs">Demo preview · not live data</p>
              </div>
              <span className="placeholder-chip">Demo</span>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-3">
              {tiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <div
                    key={tile.label}
                    className="rounded-2xl border border-border bg-surface-muted/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-slate">{tile.label}</p>
                      <Icon className="size-4 text-champagne" />
                    </div>
                    <p
                      className={`mt-2 font-heading text-xl font-semibold ${
                        tile.tone === "success" ? "text-success" : "text-navy"
                      }`}
                    >
                      {tile.value}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="px-5 pb-5">
              <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-slate">
                Also includes: property inspections, owner statements, lease documents, and
                maintenance history — connected once PMS credentials are configured.
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
