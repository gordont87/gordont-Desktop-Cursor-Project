import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Property Management",
  description: "Full-service residential property management for single-family homes and townhomes.",
};

export default function ResidentialPage() {
  return (
    <ServicePageLayout
      title="Residential property management"
      description="Hands-off management for owners who want professional leasing, maintenance, and accounting without sacrificing transparency."
      cards={[
        {
          title: "Marketing & leasing",
          body: "Professional photos, syndicated listings, showings, and Fair Housing compliant screening through third-party providers.",
        },
        {
          title: "Rent collection",
          body: "Online rent payments, late fee enforcement per lease, and owner disbursements with monthly statements.",
        },
        {
          title: "Maintenance coordination",
          body: "24/7 tenant requests, vetted vendors, and owner approval workflows for repairs above your threshold.",
        },
        {
          title: "Inspections & renewals",
          body: "Move-in and move-out documentation, routine inspections, and proactive lease renewal campaigns.",
        },
      ]}
    />
  );
}
