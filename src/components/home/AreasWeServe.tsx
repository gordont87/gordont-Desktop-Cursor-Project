import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { neighborhoodGuides } from "@/lib/data/neighborhoods";
import Image from "next/image";
import Link from "next/link";

export function AreasWeServe() {
  const featured = neighborhoodGuides[0];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Areas We Serve"
          title="Alabama and Georgia"
          description="Dedicated market guides for the states we serve — with live listing snapshots where we have inventory."
        />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          <div className="relative rounded-3xl overflow-hidden min-h-72 border border-border">
            <Image
              src={featured.imageUrl}
              alt={featured.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
            <div className="relative p-8 md:p-10 max-w-md text-white">
              <p className="font-heading text-2xl font-semibold">Southeast coverage</p>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Residential property management across Alabama and Georgia — local context for
                owners, investors, and renters.
              </p>
              <Button href="/investors/neighborhoods" variant="champagne" size="sm" className="mt-6">
                Explore market guides
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 content-start">
            {neighborhoodGuides.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="card-surface flex items-center justify-between gap-4 px-5 py-4 hover:border-champagne transition-colors"
                >
                  <span>
                    <span className="font-heading font-semibold text-navy block">
                      {area.name}
                    </span>
                    <span className="text-xs text-slate line-clamp-1 mt-0.5">{area.tagline}</span>
                  </span>
                  <span className="text-sm text-champagne shrink-0">View →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/about/areas" variant="outline">
            See all service areas
          </Button>
          <Button href="/investors/neighborhoods" variant="outline">
            Investor market guides
          </Button>
        </div>
      </Container>
    </Section>
  );
}
