import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate Investors",
  description: "Investment property analysis, ROI tools, and market insights for rental investors.",
};

const tools = [
  {
    href: "/investors/analysis",
    title: "Investment Property Analysis",
    description: "Request a rental analysis — submissions save to our lead inbox for follow-up.",
  },
  {
    href: "/investors/roi-calculator",
    title: "ROI Calculator",
    description: "Model cash flow, cap rate, and cash-on-cash return with your inputs.",
  },
  {
    href: "/investors/market-reports",
    title: "Market Reports",
    description: "Live inventory analytics, demand signals, and published investor briefings.",
  },
  {
    href: "/investors/neighborhoods",
    title: "Neighborhood Guides",
    description: "Alabama and Georgia guides with live inventory snapshots.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Data-driven decisions for rental investors"
        description="Tools and insights to evaluate acquisitions and optimize portfolio performance across Alabama and Georgia."
      >
        <Button href="/owners/rental-analysis">Free Rental Analysis</Button>
      </PageHero>
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Investor tools" />
            <div className="grid gap-6 sm:grid-cols-2">
              {tools.map((t) => (
                <Card key={t.href}>
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    <Link href={t.href}>{t.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate">{t.description}</p>
                  <Button href={t.href} variant="outline" size="sm" className="mt-4">
                    Explore
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
