import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Placeholder client reviews — verify before publishing.",
};

const reviews = [
  {
    quote: "Placeholder review about responsive communication and clear owner statements.",
    author: "Demo Owner A",
    rating: "PLACEHOLDER ★★★★★",
  },
  {
    quote: "Placeholder review about maintenance turnaround and respectful tenant screening.",
    author: "Demo Owner B",
    rating: "PLACEHOLDER ★★★★★",
  },
  {
    quote: "Placeholder review from a resident about online rent pay and maintenance portal.",
    author: "Demo Resident",
    rating: "PLACEHOLDER ★★★★★",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Client reviews"
        description="Do not publish unverified testimonials. Connect Google or third-party review widgets before launch."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="What clients say" align="center" />
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {reviews.map((r) => (
                <Card key={r.author}>
                  <p className="text-sm text-charcoal italic">&ldquo;{r.quote}&rdquo;</p>
                  <p className="mt-4 font-medium text-navy">{r.author}</p>
                  <p className="text-xs text-slate mt-1">{r.rating}</p>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href={siteConfig.social.googleReviewsUrl} variant="outline">
                View Google Reviews (Placeholder)
              </Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
