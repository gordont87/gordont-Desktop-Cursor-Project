import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Services",
  description: "Property management and portfolio support tailored to rental investors.",
};

export default function InvestorServicesPage() {
  return (
    <ServicePageLayout
      title="Investor services"
      description="Scale your portfolio with reporting, acquisition support, and management built for ROI-focused owners."
      cards={[
        {
          title: "Portfolio reporting",
          body: "Owner dashboards and monthly statements designed for investors tracking cash flow across multiple doors.",
        },
        {
          title: "Acquisition support",
          body: "Rental analysis, market context, and due diligence coordination — demo tools available on this site.",
        },
        {
          title: "Vacancy reduction",
          body: "Pricing guidance, marketing velocity, and renewal strategies to minimize downtime between tenants.",
        },
        {
          title: "CapEx planning",
          body: "Inspection-driven recommendations for improvements that support rent growth and asset value.",
        },
      ]}
    />
  );
}
