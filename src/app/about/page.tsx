import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about T & T Gordon Property Management — placeholder company story.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${siteConfig.brand.name}`}
        description="A demo property management brand built to showcase modern owner and resident experiences."
      />
      <ContentPage>
        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div>
                <SectionHeading title="Our mission" description="Placeholder mission statement — replace with your authentic company story." />
                <p className="text-slate text-sm leading-relaxed">
                  We believe professional management should be transparent, responsive, and Fair Housing
                  compliant at every step. This demo site illustrates workflows for leasing, maintenance,
                  owner reporting, and resident services.
                </p>
              </div>
              <Card>
                <h2 className="font-heading text-lg font-semibold text-navy">Quick links</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/about/team" className="text-navy hover:underline">
                      Meet the Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/areas" className="text-navy hover:underline">
                      Areas We Serve
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/reviews" className="text-navy hover:underline">
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/fair-housing" className="text-navy hover:underline">
                      Fair Housing Commitment
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact">{siteConfig.ctas.secondary.label}</Button>
              <Button href="/owners/rental-analysis" variant="outline">
                {siteConfig.ctas.primary.label}
              </Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
