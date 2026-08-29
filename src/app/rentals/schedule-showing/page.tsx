import { ShowingRequestForm } from "@/components/forms/ShowingRequestForm";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { getPublicListings } from "@/lib/listings";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Schedule a Showing",
  description: "Request a showing for available rental listings. Fair Housing compliant inquiry form.",
};

export default async function ScheduleShowingPage() {
  const listings = await getPublicListings();

  return (
    <>
      <PageHero
        eyebrow="Available Rentals"
        title="Schedule a showing"
        description="Tell us when you'd like to tour a property. Your request is saved for our leasing team to confirm."
      />
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <Suspense fallback={<p className="text-sm text-slate text-center">Loading form…</p>}>
              <ShowingRequestForm listings={listings} />
            </Suspense>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
