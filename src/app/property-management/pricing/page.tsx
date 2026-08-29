import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import { managementPlans, PricingComparison } from "@/components/ui/PricingComparison";
import { Container } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management Pricing",
  description: "Compare demo Essential, Full-Service, and Premium property management plans.",
};

export default function PropertyManagementPricingPage() {
  return (
    <ServicePageLayout
      title="Management pricing"
      description="Interactive comparison of demo management plans. Final fees depend on portfolio size, property type, and services selected."
      cards={[
        {
          title: "Transparent fees",
          body: "No hidden charges in our demo structure — real agreements require attorney review before launch.",
        },
        {
          title: "Leasing fees",
          body: "Placement and renewal fees may apply separately; placeholders only on this demo site.",
        },
        {
          title: "Custom portfolios",
          body: "Multi-door and commercial-adjacent assets may qualify for custom pricing.",
        },
        {
          title: "Cancel anytime",
          body: "Terms outlined in your management agreement — demo copy only until legal review.",
        },
      ]}
    >
      <Container className="mt-10">
        <PricingComparison plans={managementPlans} />
      </Container>
    </ServicePageLayout>
  );
}
