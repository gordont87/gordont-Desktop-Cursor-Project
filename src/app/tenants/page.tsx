import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tenants",
  description: "Resources for residents — pay rent, maintenance requests, move-in/out, and FAQs.",
};

const links = [
  {
    href: "/tenants/pay-rent",
    title: "Pay Rent",
    description: "Secure online rent payments through our third-party payment partner.",
  },
  {
    href: "/tenants/portal",
    title: "Tenant Portal",
    description: "Access lease documents, payment history, and maintenance updates.",
  },
  {
    href: "/tenants/maintenance",
    title: "Maintenance Request",
    description: "Submit non-emergency repairs online. Call for emergencies per your lease.",
  },
  {
    href: "/tenants/resources",
    title: "Tenant Resources",
    description: "Move-in guides, community policies, and helpful links.",
  },
  {
    href: "/tenants/move-in-out",
    title: "Move-In / Move-Out",
    description: "Checklists to prepare for your transition.",
  },
  {
    href: "/tenants/faqs",
    title: "Tenant FAQs",
    description: "Answers about rent, maintenance, and lease terms.",
  },
];

export default function TenantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="We're here to help you feel at home"
        description="Pay rent, submit maintenance requests, and find answers — all in one place."
      >
        <Button href="/rentals" variant="ghost">
          Find a Rental
        </Button>
      </PageHero>
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Resident services" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l) => (
                <Card key={l.href}>
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    <Link href={l.href} className="hover:text-navy-soft">
                      {l.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate">{l.description}</p>
                  <Button href={l.href} variant="outline" size="sm" className="mt-4">
                    Go
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
