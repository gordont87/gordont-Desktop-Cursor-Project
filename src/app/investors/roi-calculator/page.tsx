import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { RoiCalculator } from "@/components/investors/RoiCalculator";
import { Container, Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Model rental property returns with demo inputs.",
};

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="ROI calculator"
        description="Interactive demo calculator — not financial advice. Verify assumptions with your CPA and lender."
      />
      <ContentPage>
        <Section>
          <Container className="max-w-3xl">
            <RoiCalculator />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
