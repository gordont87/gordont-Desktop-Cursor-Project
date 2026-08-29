import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement — placeholder pending audit.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility statement"
        description="Our commitment to accessible digital experiences — draft pending audit."
      />
      <ContentPage>
        <Section>
          <Container className="max-w-3xl">
            <Card className="space-y-4 text-sm text-slate leading-relaxed">
              <p>
                <span className="placeholder-chip">Draft placeholder</span> {siteConfig.brand.name} strives
                to ensure its website is accessible to people with disabilities. This demo site has not
                completed a formal WCAG audit — schedule testing before launch.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Measures we support</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Semantic HTML and keyboard-focusable controls where implemented</li>
                <li>Color contrast aligned to brand palette — verify with audit tools</li>
                <li>Alternative text on demo listing imagery</li>
                <li>Form labels associated with inputs</li>
              </ul>
              <h2 className="font-heading text-lg font-semibold text-navy">Feedback</h2>
              <p>
                If you experience accessibility barriers, contact us at {siteConfig.contact.email} or{" "}
                {siteConfig.contact.phone}. We will work with you to provide the information or service
                through an alternative method.
              </p>
            </Card>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
