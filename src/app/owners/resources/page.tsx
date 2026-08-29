import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner Resources",
  description: "Guides and resources for rental property owners.",
};

const resources = [
  {
    title: "Owner onboarding checklist",
    body: "Demo checklist covering utilities, keys, insurance, and management agreement setup.",
  },
  {
    title: "Maintenance approval guide",
    body: "How we handle repair thresholds, emergencies, and owner notifications.",
  },
  {
    title: "Tax document timeline",
    body: "Placeholder schedule for 1099s and year-end owner statements.",
  },
  {
    title: "Fair Housing for owners",
    body: "Equal housing basics every landlord should know — link to our Fair Housing page.",
    href: "/legal/fair-housing",
  },
  {
    title: "Vacancy reduction tips",
    body: "Marketing, pricing, and renewal strategies — demo content only.",
  },
  {
    title: "Insurance requirements",
    body: "Minimum coverage expectations for managed properties — verify with your carrier.",
  },
];

export default function OwnerResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Owners"
        title="Owner resources"
        description="Helpful guides for new and experienced landlords. All content is placeholder until verified by your team."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Guides & checklists" />
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((r) => (
                <Card key={r.title}>
                  <h2 className="font-heading text-lg font-semibold text-navy">{r.title}</h2>
                  <p className="mt-2 text-sm text-slate">{r.body}</p>
                  {r.href ? (
                    <Button href={r.href} variant="outline" size="sm" className="mt-4">
                      Read More
                    </Button>
                  ) : null}
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/owners/rental-analysis">Get Free Rental Analysis</Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
