import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { ownerPlans, PricingComparison } from "@/components/ui/PricingComparison";
import { Container, Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner Management Pricing",
  description: "Compare demo management plans for property owners.",
};

export default function OwnerPricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Owners"
        title="Management pricing"
        description="Compare Essential, Full-Service, and Premium demo plans. Confirm final fees before signing."
      />
      <ContentPage>
        <Section>
          <Container>
            <PricingComparison plans={ownerPlans} />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
