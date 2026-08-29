import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Blog, guides, market reports, and FAQs for owners and investors.",
};

const leads = [
  { title: "Landlord starter kit", href: "/resources/guides", type: "Guide" },
  { title: "2026 market outlook (demo)", href: "/resources/market-reports", type: "Report" },
  { title: "Vacancy reduction checklist", href: "/resources/guides", type: "Guide" },
  { title: "Property management FAQs", href: "/resources/faqs", type: "FAQ" },
];

const sections = [
  { href: "/resources/blog", title: "Blog", description: "Placeholder articles on leasing and maintenance." },
  { href: "/resources/guides", title: "Landlord Guides", description: "Downloadable PDFs with demo email gate." },
  { href: "/resources/market-reports", title: "Market Reports", description: "Data connection placeholders." },
  { href: "/resources/faqs", title: "FAQs", description: "General property management questions." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Knowledge for smarter ownership"
        description="Lead magnets, guides, and insights — all demo content until verified."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Lead magnets" description="Placeholder downloads — connect email automation before launch." />
            <div className="grid gap-4 md:grid-cols-2">
              {leads.map((l) => (
                <Card key={l.title} className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-champagne">{l.type}</span>
                    <h2 className="font-heading text-lg font-semibold text-navy mt-1">{l.title}</h2>
                  </div>
                  <Button href={l.href} size="sm" variant="outline">
                    Get It
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
        <Section muted>
          <Container>
            <SectionHeading title="Browse resources" />
            <div className="grid gap-6 sm:grid-cols-2">
              {sections.map((s) => (
                <Card key={s.href}>
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    <Link href={s.href}>{s.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate">{s.description}</p>
                  <Button href={s.href} variant="outline" size="sm" className="mt-4">
                    View
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
