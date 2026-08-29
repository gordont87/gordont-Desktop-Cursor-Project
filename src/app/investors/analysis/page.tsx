import { RentalAnalysisTool } from "@/components/forms/RentalAnalysisTool";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Property Analysis",
  description: "Request a rental analysis for investment properties. Submissions are saved for follow-up.",
};

export default function InvestorAnalysisPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Investment property analysis"
        description="Estimate rent range and contact our team for acquisition support. Submissions are saved for follow-up."
      />
      <ContentPage>
        <Section muted>
          <Container>
            <RentalAnalysisTool embedded source="investors" />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
