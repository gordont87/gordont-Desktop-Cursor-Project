import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Management Services",
  description: "Full-service residential property management for owners and investors in Alabama and Georgia.",
};

const services = [
  {
    href: "/property-management/residential",
    title: "Residential Property Management",
    description: "Leasing, rent collection, maintenance, and owner reporting for single-family homes.",
  },
  {
    href: "/property-management/investor-services",
    title: "Investor Services",
    description: "Portfolio support, reporting, and acquisition guidance for rental investors.",
  },
  {
    href: "/property-management/tenant-placement",
    title: "Tenant Placement",
    description: "Marketing, showings, screening, and lease execution without full management.",
  },
  {
    href: "/property-management/maintenance",
    title: "Maintenance Management",
    description: "24/7 triage, vetted vendors, and transparent repair approvals.",
  },
  {
    href: "/property-management/inspections",
    title: "Property Inspections",
    description: "Move-in, move-out, routine, and seasonal inspections with photo documentation.",
  },
  {
    href: "/property-management/pricing",
    title: "Management Pricing",
    description: "Compare demo Essential, Full-Service, and Premium plans.",
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Management"
        title="Professional management that protects your investment"
        description={`${siteConfig.brand.name} delivers leasing, maintenance, and accounting with transparent owner communication.`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={siteConfig.ctas.primary.href}>{siteConfig.ctas.primary.label}</Button>
          <Button href={siteConfig.ctas.secondary.href} variant="ghost">
            {siteConfig.ctas.secondary.label}
          </Button>
        </div>
      </PageHero>
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading
              title="Explore our services"
              description="Select a service area to learn how we support owners, investors, and residents."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Card key={s.href} className="flex flex-col">
                  <h2 className="font-heading text-lg font-semibold text-navy">
                    <Link href={s.href} className="hover:text-navy-soft">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate flex-1">{s.description}</p>
                  <Button href={s.href} variant="outline" size="sm" className="mt-5 w-fit">
                    Learn More
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
