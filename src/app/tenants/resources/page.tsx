import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenant Resources",
  description: "Helpful resources for residents.",
};

const resources = [
  {
    title: "Rent payment guide",
    body: "How to set up autopay and read your payment confirmation — demo content.",
  },
  {
    title: "Maintenance expectations",
    body: "What qualifies as emergency vs. routine, and typical response windows (placeholder).",
  },
  {
    title: "Community policies",
    body: "Noise, parking, and shared amenity guidelines vary by property — see your lease.",
  },
  {
    title: "Renter's insurance",
    body: "Most leases require liability coverage — confirm minimums with your agent.",
  },
  {
    title: "Fair Housing rights",
    body: "Learn about equal housing opportunity and how to report concerns.",
    href: "/legal/fair-housing",
  },
  {
    title: "Move-in / move-out",
    body: "Checklists for a smooth transition.",
    href: "/tenants/move-in-out",
  },
];

export default function TenantResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="Tenant resources"
        description="Guides and policies to help you during your lease. Placeholder content for demo."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Helpful guides" />
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((r) => (
                <Card key={r.title}>
                  <h2 className="font-heading text-lg font-semibold text-navy">{r.title}</h2>
                  <p className="mt-2 text-sm text-slate">{r.body}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
