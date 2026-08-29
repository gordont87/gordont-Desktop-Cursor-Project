import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { ReactNode } from "react";

export function ServicePageLayout({
  eyebrow = "Property Management",
  title,
  description,
  cards,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  cards: { title: string; body: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="What's included" />
            <div className="grid gap-6 md:grid-cols-2">
              {cards.map((card) => (
                <Card key={card.title}>
                  <h2 className="font-heading text-lg font-semibold text-navy">{card.title}</h2>
                  <p className="mt-2 text-sm text-slate leading-relaxed">{card.body}</p>
                </Card>
              ))}
            </div>
            {children}
            <div className="mt-12 card-surface p-8 text-center">
              <h2 className="font-heading text-2xl font-semibold text-navy">Ready to talk?</h2>
              <p className="mt-2 text-slate text-sm max-w-xl mx-auto">
                Get a free rental analysis or schedule a consultation. All metrics and pricing on this
                site are placeholders until verified.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/owners/rental-analysis">Free Rental Analysis</Button>
                <Button href="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
              <p className="mt-4 text-xs text-slate">{siteConfig.brand.legalName}</p>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
