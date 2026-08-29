import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Schedule a consultation with T & T Gordon Property Management.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a consultation"
        description="Tell us about your property and management goals. Demo form — submissions are not sent."
      />
      <ContentPage>
        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <ConsultationForm />
              <aside className="space-y-6">
                <Card>
                  <h2 className="font-heading text-lg font-semibold text-navy">Contact info</h2>
                  <ul className="mt-4 space-y-3 text-sm text-slate">
                    <li>
                      Phone:{" "}
                      <a href={siteConfig.contact.phoneHref} className="text-navy font-medium hover:underline">
                        {siteConfig.contact.phone}
                      </a>
                    </li>
                    <li>
                      Email:{" "}
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-navy hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </li>
                    <li>
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                      {siteConfig.contact.address.zip}
                    </li>
                    <li>{siteConfig.contact.hours}</li>
                  </ul>
                </Card>
                <Card>
                  <p className="text-sm text-slate">
                    Prefer a rental estimate first?{" "}
                    <a href="/owners/rental-analysis" className="text-navy font-medium hover:underline">
                      Get a free rental analysis
                    </a>
                    .
                  </p>
                </Card>
              </aside>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
