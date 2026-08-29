import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section } from "@/components/ui/Section";
import { getAllListingSlugs, getListingBySlug } from "@/lib/listings";
import { formatCurrency } from "@/lib/utils";
import { Bath, BedDouble, Calendar, MapPin, Ruler, Video } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.title} — Available Rental`,
    description: `Rental at ${listing.address}, ${listing.city}. ${listing.beds} bed, ${listing.baths} bath. Fair Housing compliant listing.`,
  };
}

export default async function RentalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  return (
    <>
      <PageHero
        eyebrow="Available Rental"
        title={listing.title}
        description={`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}
      >
        <p className="text-2xl font-heading font-semibold text-champagne">
          {formatCurrency(listing.rent)}/mo
        </p>
      </PageHero>
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container wide>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={`Photo of ${listing.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 60vw"
                    priority
                  />
                </div>

                {listing.description ? (
                  <Card>
                    <h2 className="font-heading text-xl font-semibold text-navy">About this home</h2>
                    <p className="mt-3 text-sm text-slate leading-relaxed">{listing.description}</p>
                  </Card>
                ) : null}

                <Card>
                  <h2 className="font-heading text-xl font-semibold text-navy">Property details</h2>
                  <ul className="mt-4 flex flex-wrap gap-4 text-sm text-charcoal">
                    <li className="inline-flex items-center gap-2">
                      <BedDouble className="size-4 text-champagne" /> {listing.beds} bedrooms
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <Bath className="size-4 text-champagne" /> {listing.baths} bathrooms
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <Ruler className="size-4 text-champagne" /> {listing.sqft.toLocaleString()} sq ft
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <Calendar className="size-4 text-champagne" /> Available: {listing.available}
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-slate">Type: {listing.type}</p>
                </Card>

                <Card>
                  <h2 className="font-heading text-xl font-semibold text-navy">Amenities</h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-charcoal">
                    {listing.amenities.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h2 className="font-heading text-xl font-semibold text-navy">Pet policy</h2>
                  <p className="mt-3 text-sm text-slate">{listing.pets}</p>
                  <p className="mt-2 text-xs text-slate">
                    Pet policies vary by property. Service and assistance animals are not considered
                    pets under Fair Housing guidelines.
                  </p>
                </Card>

                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="size-5 text-champagne" />
                    <h2 className="font-heading text-xl font-semibold text-navy">Virtual tour</h2>
                  </div>
                  {listing.virtualTourUrl ? (
                    <a
                      href={listing.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-champagne hover:underline"
                    >
                      Open virtual tour →
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border bg-surface-muted p-8 text-center text-sm text-slate">
                      Virtual tour not added yet.
                    </div>
                  )}
                </Card>

                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="size-5 text-champagne" />
                    <h2 className="font-heading text-xl font-semibold text-navy">Location</h2>
                  </div>
                  <div className="rounded-xl border border-dashed border-border bg-surface-muted min-h-48 flex items-center justify-center p-6 text-center text-sm text-slate">
                    Map placeholder — connect Google Maps or Mapbox for neighborhood context.
                  </div>
                </Card>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
                <Card>
                  <h2 className="font-heading text-xl font-semibold text-navy">Schedule a showing</h2>
                  <p className="mt-2 text-sm text-slate">
                    Tour this property or ask about availability. Equal housing opportunity.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button href={`/rentals/schedule-showing?property=${listing.slug}`}>
                      Schedule Showing
                    </Button>
                    <Button
                      href={`/rentals/schedule-showing?property=${listing.slug}`}
                      variant="champagne"
                    >
                      Apply Now
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-slate border-t border-border pt-4">
                    <strong className="text-navy">Apply Now:</strong> Applications are processed
                    through a third-party screening provider. We never collect Social Security
                    numbers on this website.
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
