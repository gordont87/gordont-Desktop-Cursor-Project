import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Rent",
  description: "Pay rent securely online through our third-party payment partner.",
};

export default function PayRentPage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="Pay rent online"
        description="Secure payments processed by a third-party provider — we never store full card numbers on this site."
      />
      <ContentPage>
        <Section>
          <Container className="max-w-2xl">
            <Card>
              <h2 className="font-heading text-xl font-semibold text-navy">Secure rent payment</h2>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Rent payments are handled through our property management software partner. You will be
                redirected to a secure portal to pay by bank transfer or card. Processing fees, if any,
                are disclosed by the payment provider.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal">
                <li>• Bank transfer (ACH) and debit/credit options</li>
                <li>• Payment confirmation emailed by the provider</li>
                <li>• Demo URL — replace before launch</li>
              </ul>
              <Button href={siteConfig.portals.payRentUrl} className="mt-6">
                Pay Rent in Tenant Portal
              </Button>
              <p className="mt-4 text-xs text-slate">
                Sign in required. Demo payments update your account balance; connect Stripe before
                accepting real card or bank payments.
              </p>
            </Card>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
