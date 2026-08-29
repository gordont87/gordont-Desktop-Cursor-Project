import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenant FAQs",
  description: "Frequently asked questions for residents.",
};

const faqs = [
  {
    q: "How do I pay rent?",
    a: "Use the Pay Rent page to access our third-party payment portal. Autopay options are configured there.",
  },
  {
    q: "How do I submit a maintenance request?",
    a: "Use the online maintenance form for non-emergencies. Emergencies should follow the after-hours instructions in your lease.",
  },
  {
    q: "Can I have pets?",
    a: "Pet policies vary by property and are listed on each rental listing. Service and assistance animals are accommodated per Fair Housing law.",
  },
  {
    q: "How do I renew my lease?",
    a: "We will contact you before expiration with renewal terms. Respond by the deadline in your notice.",
  },
  {
    q: "How is my security deposit handled?",
    a: "Deposits are held per state law and applied against move-out charges with an itemized statement.",
  },
];

export default function TenantFaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="Tenant FAQs"
        description="Quick answers for common resident questions. Demo content only."
      />
      <ContentPage>
        <Section>
          <Container className="max-w-3xl">
            <SectionHeading title="Common questions" />
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="card-surface group">
                  <summary className="cursor-pointer list-none p-5 font-medium text-navy flex justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-champagne group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate border-t border-border pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/tenants/maintenance">Submit Maintenance</Button>
              <Button href="/tenants/pay-rent" variant="outline">
                Pay Rent
              </Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
