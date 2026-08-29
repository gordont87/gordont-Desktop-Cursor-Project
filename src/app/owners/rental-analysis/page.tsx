import { RentalAnalysisTool } from "@/components/forms/RentalAnalysisTool";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Rental Analysis",
  description: "Get a demo rental estimate for your property. Placeholder analysis — not a certified appraisal.",
};

export default function OwnerRentalAnalysisPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Owners"
        title="Free rental analysis"
        description="Enter your property details for an illustrative rent range, then request a personalized follow-up. Submissions are saved for our team."
      />
      <ContentPage>
        <Section muted>
          <Container>
            <RentalAnalysisTool embedded source="owners" />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
