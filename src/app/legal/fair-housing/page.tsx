import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fair Housing",
  description: "Equal housing opportunity commitment — Fair Housing compliant language.",
};

export default function FairHousingPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Fair Housing commitment"
        description="Equal housing opportunity for all qualified applicants."
      />
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container className="max-w-3xl">
            <Card className="space-y-4 text-sm text-slate leading-relaxed">
              <p>
                {siteConfig.brand.name} is committed to compliance with the Federal Fair Housing Act and
                applicable state and local fair housing laws. We do not discriminate based on race, color,
                religion, sex, national origin, familial status, disability, or any other protected class.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Equal housing opportunity</h2>
              <p>
                We welcome applications from all qualified applicants. Advertising, screening, and leasing
                decisions are made without regard to protected characteristics. Service and assistance
                animals are not pets under Fair Housing guidelines.
              </p>
              <h2 className="font-heading text-lg font-semibold text-navy">Reporting concerns</h2>
              <p>
                If you believe you have experienced discrimination, contact us at {siteConfig.contact.email}{" "}
                or {siteConfig.contact.phone}. You may also file a complaint with the U.S. Department of
                Housing and Urban Development (HUD).
              </p>
              <p className="text-xs border-t border-border pt-4">
                <span className="placeholder-chip">Attorney review</span> Replace and expand this statement
                with counsel-approved language specific to your operating states.
              </p>
            </Card>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
