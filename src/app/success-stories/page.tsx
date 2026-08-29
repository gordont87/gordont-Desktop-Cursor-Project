import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Case studies, before & after stories, and client testimonials — placeholder content.",
};

const caseStudies = [
  {
    title: "Vacant single-family turnaround",
    body: "Demo case study: owner inherited a property sitting empty for 4 months. Placeholder timeline for marketing, repairs, and lease-up.",
    result: "PLACEHOLDER — leased in X days at $X/mo",
  },
  {
    title: "Multi-door investor portfolio",
    body: "Demo case study: out-of-state investor consolidated 6 doors under one manager. Placeholder for reporting and maintenance wins.",
    result: "PLACEHOLDER — improved on-time rent collection",
  },
];

const testimonials = [
  {
    quote: "Placeholder testimonial — replace with verified client review before launch.",
    name: "Demo Owner",
    location: "Birmingham, AL",
  },
  {
    quote: "Another placeholder quote about responsive maintenance and clear communication.",
    name: "Demo Investor",
    location: "Alpharetta, GA",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Results that speak for themselves"
        description="Case studies and testimonials below are placeholders — do not publish unverified claims."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Case studies" />
            <div className="grid gap-6 md:grid-cols-2">
              {caseStudies.map((c) => (
                <Card key={c.title}>
                  <span className="placeholder-chip">Demo</span>
                  <h2 className="mt-3 font-heading text-xl font-semibold text-navy">{c.title}</h2>
                  <p className="mt-2 text-sm text-slate">{c.body}</p>
                  <p className="mt-4 text-sm font-medium text-champagne">{c.result}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="before-after" muted>
          <Container>
            <SectionHeading title="Before & after" description="Placeholder transformation stories." />
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-surface-muted border border-dashed border-border p-8 text-center text-sm text-slate">
                  Before photo placeholder
                </div>
                <div className="rounded-xl bg-surface-muted border border-dashed border-border p-8 text-center text-sm text-slate">
                  After photo placeholder
                </div>
              </div>
              <p className="mt-4 text-sm text-slate">
                Demo narrative: deferred maintenance, prolonged vacancy, and owner stress — replaced with
                professional management and a qualified resident. Replace with verified story and photos.
              </p>
            </Card>
          </Container>
        </Section>

        <Section id="testimonials">
          <Container>
            <SectionHeading title="Client testimonials" align="center" />
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <Card key={t.name} className="text-center">
                  <p className="text-charcoal italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-medium text-navy">{t.name}</p>
                  <p className="text-xs text-slate">{t.location} · PLACEHOLDER review</p>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/contact">Become a Success Story</Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
