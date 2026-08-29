import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import {
  getAreaListingStats,
  neighborhoodGuides,
} from "@/lib/data/neighborhoods";
import { getPublicListings } from "@/lib/listings";
import { formatCurrency } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neighborhood Guides",
  description:
    "Alabama and Georgia market guides for investors and renters — with live inventory snapshots.",
};

export default async function InvestorNeighborhoodsPage() {
  const listings = await getPublicListings();

  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Neighborhood guides"
        description="Local context for Alabama and Georgia — paired with live asking rents from our current inventory."
      />
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <SectionHeading
              title="Areas we serve"
              description="Each guide covers housing mix, lifestyle, schools orientation, and investment considerations."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoodGuides.map((area) => {
                const stats = getAreaListingStats(area, listings);
                return (
                  <article key={area.slug} className="card-surface overflow-hidden group flex flex-col">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={area.imageUrl}
                        alt={area.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-heading text-lg font-semibold text-navy">
                        <Link href={`/areas/${area.slug}`} className="hover:text-navy-soft">
                          {area.name}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm text-slate leading-relaxed flex-1">
                        {area.summary}
                      </p>
                      <p className="mt-3 text-xs text-slate">
                        {stats.count > 0 && stats.avgRent != null
                          ? `${stats.count} listing${stats.count === 1 ? "" : "s"} · avg ${formatCurrency(Math.round(stats.avgRent))}/mo`
                          : "No current listings — guide still available"}
                      </p>
                      <Button
                        href={`/areas/${area.slug}`}
                        variant="outline"
                        size="sm"
                        className="mt-4 self-start"
                      >
                        View guide
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
