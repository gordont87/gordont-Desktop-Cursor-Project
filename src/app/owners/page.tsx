import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Owners",
  description: "Professional property management for owners — marketing, screening, leasing, and more.",
};

const benefits = [
  {
    title: "Marketing & syndication",
    body: "Professional listings across major rental platforms with demo photography placeholders.",
  },
  {
    title: "Tenant screening",
    body: "Third-party screening for credit, income, and rental history — Fair Housing compliant process.",
  },
  {
    title: "Leasing & renewals",
    body: "Showings, applications, lease execution, and proactive renewal outreach.",
  },
  {
    title: "Rent collection",
    body: "Online payments, late notices per lease, and owner disbursements with statements.",
  },
  {
    title: "Maintenance",
    body: "24/7 request intake, vendor dispatch, and owner approval workflows.",
  },
  {
    title: "Inspections",
    body: "Move-in, move-out, and routine inspections with photo documentation.",
  },
  {
    title: "Accounting",
    body: "Monthly owner statements, year-end summaries, and 1099 coordination (demo workflow).",
  },
  {
    title: "Eviction coordination",
    body: "Attorney-coordinated process when residents breach lease terms — placeholder legal workflow.",
  },
  {
    title: "Lease renewals",
    body: "Market-informed renewal recommendations and resident retention campaigns.",
  },
];

const links = [
  { href: "/owners/portal", label: "Owner Portal" },
  { href: "/owners/rental-analysis", label: "Free Rental Analysis" },
  { href: "/owners/resources", label: "Owner Resources" },
  { href: "/owners/pricing", label: "Management Pricing" },
  { href: "/owners/faqs", label: "Owner FAQs" },
];

export default function OwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Owners"
        title="Better returns. Less stress."
        description="Whether you own one home or a growing portfolio, T & T Gordon helps you maximize income while protecting your asset."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={siteConfig.ctas.primary.href}>{siteConfig.ctas.primary.label}</Button>
          <Button href="/owners/pricing" variant="ghost">
            View Pricing
          </Button>
        </div>
      </PageHero>
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading
              title="What we handle for you"
              description="End-to-end management so you can focus on life — not midnight maintenance calls."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <Card key={b.title}>
                  <h2 className="font-heading text-lg font-semibold text-navy">{b.title}</h2>
                  <p className="mt-2 text-sm text-slate">{b.body}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
        <Section muted>
          <Container>
            <SectionHeading title="Owner resources" align="center" />
            <ul className="flex flex-wrap justify-center gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Button href={l.href} variant="outline" size="sm">
                    {l.label}
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-sm text-slate">
              Questions?{" "}
              <Link href="/contact" className="text-navy font-medium hover:underline">
                Schedule a consultation
              </Link>{" "}
              or call{" "}
              <a href={siteConfig.contact.phoneHref} className="text-navy font-medium hover:underline">
                {siteConfig.contact.phone}
              </a>
              .
            </p>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
