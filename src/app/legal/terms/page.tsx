import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Placeholder terms of use — attorney review required before launch.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" description="Last updated: PLACEHOLDER — requires attorney review." />
      <ContentPage>
        <Section>
          <Container className="max-w-3xl">
            <Card className="space-y-4 text-sm text-slate leading-relaxed">
              <p>
                <span className="placeholder-chip">Draft placeholder</span> By accessing {siteConfig.brand.name}
                &apos;s website, you agree to these demo terms. Replace with enforceable terms reviewed by
                qualified counsel.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Use of website</h2>
              <p>
                Content is for general information only. Rental estimates, calculators, and metrics are
                placeholders and not guarantees of performance.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">No professional advice</h2>
              <p>
                Nothing on this site constitutes legal, tax, or investment advice. Consult licensed
                professionals for decisions affecting your property.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Third-party links</h2>
              <p>
                Portal logins, payment processors, and screening partners operate under their own terms and
                privacy policies.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Limitation of liability</h2>
              <p>Placeholder limitation language — must be drafted by an attorney for your entity and state.</p>
            </Card>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
