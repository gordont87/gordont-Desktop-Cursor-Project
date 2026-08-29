import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "General property management frequently asked questions.",
};

const faqs = [
  {
    q: "What areas do you manage?",
    a: "We serve Alabama and Georgia. Confirm coverage for your specific city before launch.",
  },
  {
    q: "How much does management cost?",
    a: "See our demo pricing pages for Essential, Full-Service, and Premium placeholders. Final fees depend on services and portfolio size.",
  },
  {
    q: "Do you handle evictions?",
    a: "We coordinate with qualified attorneys when residents breach lease terms. Legal process varies by jurisdiction.",
  },
  {
    q: "How do tenants apply?",
    a: "Applications run through third-party screening. We never collect Social Security numbers on this website.",
  },
  {
    q: "Can I meet my property manager?",
    a: "Yes — schedule a consultation to discuss your goals and our communication standards.",
  },
];

export default function ResourcesFaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="FAQs"
        description="General questions about property management with T & T Gordon — demo answers."
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
            <div className="mt-10">
              <Button href="/contact">Contact Us</Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
