import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getMarketReports } from "@/lib/data/market-reports";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Market Reports",
  description:
    "Alabama and Georgia rental market reports and live inventory analytics from T & T Gordon Property Management.",
};

export default function ResourcesMarketReportsPage() {
  const reports = getMarketReports();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Market reports"
        description="Published investor briefings and a live dashboard of asking rents from our current inventory."
      >
        <Button href="/investors/market-reports" variant="champagne">
          Open live dashboard
        </Button>
      </PageHero>
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <SectionHeading
              title="Available reports"
              description="Full analytics live on the investor market reports page; each briefing below has its own detail view."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {reports.map((r) => (
                <article key={r.slug} className="card-surface p-6 flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-champagne">
                    {r.period}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-navy">
                    <Link
                      href={`/investors/market-reports/${r.slug}`}
                      className="hover:text-navy-soft"
                    >
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate leading-relaxed flex-1">{r.summary}</p>
                  <Button
                    href={`/investors/market-reports/${r.slug}`}
                    variant="outline"
                    size="sm"
                    className="mt-4 self-start"
                  >
                    Read report
                  </Button>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/investors/market-reports">View live inventory dashboard</Button>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
