import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenant Placement",
  description: "Lease-only tenant placement services with marketing, screening, and move-in coordination.",
};

export default function TenantPlacementPage() {
  return (
    <ServicePageLayout
      title="Tenant placement"
      description="Need a qualified resident without full ongoing management? Our placement-only service handles marketing through move-in."
      cards={[
        {
          title: "Listing & marketing",
          body: "Syndication across major rental platforms with professional photography and compelling listing copy.",
        },
        {
          title: "Showings & applications",
          body: "Coordinated showings and online applications with third-party screening — no SSN collection on this site.",
        },
        {
          title: "Lease execution",
          body: "Attorney-reviewed lease templates, deposits, and move-in documentation.",
        },
        {
          title: "Handoff options",
          body: "Transition to full-service management or return keys to self-managing owners after placement.",
        },
      ]}
    />
  );
}
