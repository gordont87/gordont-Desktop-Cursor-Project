import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance Management",
  description: "24/7 maintenance triage, vendor dispatch, and owner approval workflows.",
};

export default function MaintenancePage() {
  return (
    <ServicePageLayout
      title="Maintenance management"
      description="Responsive repairs protect your asset and resident satisfaction. We coordinate vendors and keep owners informed."
      cards={[
        {
          title: "24/7 request intake",
          body: "Tenants submit requests online; emergencies are triaged per your approved protocols.",
        },
        {
          title: "Vetted vendor network",
          body: "Licensed, insured contractors across plumbing, HVAC, electrical, and general repairs.",
        },
        {
          title: "Owner approvals",
          body: "Configurable spend thresholds — we handle routine items and escalate larger projects.",
        },
        {
          title: "Documentation",
          body: "Photo logs, invoices, and warranty tracking stored in your owner portal.",
        },
      ]}
    />
  );
}
