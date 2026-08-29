import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner FAQs",
  description: "Frequently asked questions for rental property owners.",
};

const faqs = [
  {
    q: "How quickly can you lease my property?",
    a: "Timelines vary by market, price point, and condition. Demo site — connect real performance data before publishing averages.",
  },
  {
    q: "How do you screen applicants?",
    a: "We use third-party screening for credit, income verification, and rental history. We follow Fair Housing guidelines and never collect SSNs on this website.",
  },
  {
    q: "What maintenance costs require my approval?",
    a: "Your management agreement sets a spend threshold. Emergencies are handled per your approved policy with follow-up documentation.",
  },
  {
    q: "How do I receive rent payments?",
    a: "Owners receive disbursements via ACH with monthly statements in the owner portal. Demo portal only until PMS is connected.",
  },
  {
    q: "Can I use my own vendors?",
    a: "Often yes for preferred vendors who meet insurance and licensing requirements. Confirm in your agreement.",
  },
  {
    q: "What fees should I expect?",
    a: "See our demo pricing page for placeholder management, leasing, and renewal fee structures.",
  },
];

export default function OwnerFaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Owners"
        title="Owner FAQs"
        description="Answers to common questions about our management process. Placeholder content for demo purposes."
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
              <Button href="/contact">Contact Us</Button>
              <Button href="/owners/rental-analysis" variant="outline">
                Free Rental Analysis
              </Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
