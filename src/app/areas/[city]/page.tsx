import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import {
  getAreaListingStats,
  getNeighborhoodGuide,
  neighborhoodGuides,
} from "@/lib/data/neighborhoods";
import { getPublicListings } from "@/lib/listings";
import { formatCurrency } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return neighborhoodGuides.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const area = getNeighborhoodGuide(city);
  if (!area) return { title: "Area Not Found" };
  return {
    title: `${area.name} Market Guide`,
    description: area.summary,
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { city } = await params;
  const area = getNeighborhoodGuide(city);
  if (!area) notFound();

  const allRentals = await getPublicListings();
  const rentals = allRentals.filter(
    (l) => l.state.toUpperCase() === area.state.toUpperCase(),
  );
  const stats = getAreaListingStats(area, allRentals);

  const otherAreas = neighborhoodGuides.filter((g) => g.slug !== area.slug);

  return (
    <>
      <PageHero
        eyebrow="Neighborhood Guide"
        title={`${area.name}`}
        description={area.tagline}
      />
      <ContentPage showPlaceholder={false}>
        <Section className="!pt-0">
          <div className="relative h-56 md:h-80 w-full overflow-hidden">
            <Image
              src={area.imageUrl}
              alt={area.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>
        </Section>

        <Section>
          <Container>
            <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy">
                  Overview
                </h2>
                <p className="mt-4 text-slate leading-relaxed">{area.overview}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {area.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-charcoal border-l-2 border-champagne pl-3 leading-relaxed"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="rounded-3xl border border-border bg-surface-muted p-6 space-y-4">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  Live inventory snapshot
                </h3>
                {stats.count === 0 ? (
                  <p className="text-sm text-slate leading-relaxed">
                    No available listings in {area.name} right now. Browse all rentals or request an
                    analysis for a specific address.
                  </p>
                ) : (
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate">Available homes</dt>
                      <dd className="font-semibold text-navy">{stats.count}</dd>
                    </div>
                    {stats.avgRent != null ? (
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate">Avg. asking rent</dt>
                        <dd className="font-semibold text-navy">
                          {formatCurrency(Math.round(stats.avgRent))}/mo
                        </dd>
                      </div>
                    ) : null}
                    {stats.minRent != null && stats.maxRent != null ? (
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate">Rent range</dt>
                        <dd className="font-semibold text-navy text-right">
                          {formatCurrency(stats.minRent)} – {formatCurrency(stats.maxRent)}
                        </dd>
                      </div>
                    ) : null}
                    {stats.types.length > 0 ? (
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate">Property types</dt>
                        <dd className="font-semibold text-navy text-right">
                          {stats.types.join(", ")}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                )}
                <p className="text-xs text-slate leading-relaxed pt-2 border-t border-border">
                  Figures reflect current public listings on this site only — not a metro-wide market
                  index.
                </p>
                <Button href="/rentals" variant="outline" size="sm" className="w-full">
                  Browse rentals
                </Button>
              </aside>
            </div>
          </Container>
        </Section>

        <Section muted>
          <Container>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="font-heading text-xl font-semibold text-navy">Housing stock</h2>
                <p className="mt-3 text-sm text-slate leading-relaxed">{area.housingStock}</p>
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-navy">
                  Investment considerations
                </h2>
                <p className="mt-3 text-sm text-slate leading-relaxed">{area.investment}</p>
                <p className="mt-4 text-sm text-charcoal">
                  <span className="font-medium text-navy">Best fit for owners: </span>
                  {area.ownerFit}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              title="Lifestyle & access"
              description={`What renters and owners typically weigh when evaluating ${area.name}.`}
            />
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-navy">Attractions & recreation</h3>
                <ul className="mt-3 space-y-2">
                  {area.attractions.map((item) => (
                    <li key={item} className="text-sm text-slate leading-relaxed pl-3 border-l border-champagne/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-navy">Transportation</h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">{area.transportation}</p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-navy">Shopping & services</h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">{area.shopping}</p>
                <p className="mt-4 text-sm text-charcoal">
                  <span className="font-medium text-navy">Best fit for renters: </span>
                  {area.renterFit}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section muted>
          <Container>
            <h2 className="font-heading text-xl font-semibold text-navy">Schools</h2>
            <p className="mt-3 text-sm text-slate leading-relaxed max-w-3xl">{area.schools.body}</p>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {area.schools.districts.map((d) => (
                <li key={d.name} className="rounded-2xl border border-border bg-white px-5 py-4">
                  <p className="font-heading font-semibold text-navy">{d.name}</p>
                  <p className="mt-1 text-xs text-slate">{d.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate">
              School information is provided for general orientation only. We do not steer applicants
              based on protected characteristics. Verify attendance zones with the district.
            </p>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              title={`Available rentals in ${area.name}`}
              description={
                rentals.length > 0
                  ? "Current listings from our available inventory."
                  : "Check back soon or browse the full search."
              }
            />
            {rentals.length === 0 ? (
              <p className="text-sm text-slate">
                No listings in {area.name} at the moment.{" "}
                <Link href="/rentals" className="text-champagne hover:underline">
                  Browse all rentals
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rentals.map((l) => (
                  <article key={l.id} className="card-surface overflow-hidden group">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={l.image}
                        alt={`Photo of ${l.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-navy">
                        <Link href={`/rentals/${l.slug}`} className="hover:text-navy-soft">
                          {l.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate mt-1">
                        {l.beds} bed · {l.baths} bath · {formatCurrency(l.rent)}/mo
                      </p>
                      <Button href={`/rentals/${l.slug}`} size="sm" variant="outline" className="mt-3">
                        View listing
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/rentals">Browse all rentals</Button>
              <Button href="/rentals/schedule-showing" variant="outline">
                Schedule a showing
              </Button>
            </div>
          </Container>
        </Section>

        <Section muted>
          <Container>
            <SectionHeading title="Other areas we serve" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherAreas.map((g) => (
                <Link
                  key={g.slug}
                  href={`/areas/${g.slug}`}
                  className="rounded-2xl border border-border bg-white px-5 py-4 hover:border-champagne transition-colors"
                >
                  <p className="font-heading font-semibold text-navy">
                    {g.name}
                  </p>
                  <p className="mt-1 text-xs text-slate line-clamp-2">{g.tagline}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="rounded-3xl bg-navy text-white px-8 py-10 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold">
                Own property in {area.name}?
              </h2>
              <p className="mt-3 text-white/75 text-sm max-w-xl mx-auto leading-relaxed">
                Request a free rental analysis or talk with our team about management in{" "}
                {area.name}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/owners/rental-analysis" variant="champagne">
                  Free rental analysis
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
