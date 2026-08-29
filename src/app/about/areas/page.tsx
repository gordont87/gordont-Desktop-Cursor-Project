import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { neighborhoodGuides } from "@/lib/data/neighborhoods";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: "T & T Gordon Property Management serves Alabama and Georgia.",
};

export default function AboutAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Areas we serve"
        description="Residential property management across Alabama and Georgia — with dedicated guides for each state."
      />
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <SectionHeading
              title="Service areas"
              description="Explore local housing context, lifestyle notes, and available rentals by city."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoodGuides.map((area) => (
                <article key={area.slug} className="card-surface overflow-hidden group">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={area.imageUrl}
                      alt={area.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading text-lg font-semibold text-navy">
                      <Link href={`/areas/${area.slug}`} className="hover:text-navy-soft">
                        {area.name}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-slate leading-relaxed">{area.tagline}</p>
                    <Button
                      href={`/areas/${area.slug}`}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      View guide
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
