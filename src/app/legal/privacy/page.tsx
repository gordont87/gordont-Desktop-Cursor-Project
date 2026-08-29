import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Placeholder privacy policy — attorney review required before launch.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: PLACEHOLDER — requires attorney review." />
      <ContentPage>
        <Section>
          <Container className="max-w-3xl prose prose-sm">
            <Card className="space-y-4 text-sm text-slate leading-relaxed">
              <p>
                <span className="placeholder-chip">Draft placeholder</span> This privacy policy describes how{" "}
                {siteConfig.brand.legalName} may collect, use, and share information when you visit this
                website or submit forms. Replace this entire document with counsel-approved language before
                collecting personal data in production.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Information we may collect</h2>
              <p>
                Demo forms may request name, email, phone, and property details. In production, disclose
                all categories collected, cookies used, and third-party processors (CRM, analytics, payment
                providers).
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">How we use information</h2>
              <p>
                Placeholder purposes: respond to inquiries, provide property management services, improve
                the website, and comply with law.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Your choices</h2>
              <p>
                Describe opt-out, access, and deletion rights applicable in your jurisdictions (CCPA, GDPR,
                etc.) after legal review.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Contact</h2>
              <p>
                Questions: {siteConfig.contact.email} · {siteConfig.contact.phone}
              </p>
            </Card>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
