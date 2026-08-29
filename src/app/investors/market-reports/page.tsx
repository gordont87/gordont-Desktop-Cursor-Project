import { MarketSnapshotPanel } from "@/components/investors/MarketSnapshotPanel";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { buildMarketSnapshot, getMarketReports } from "@/lib/data/market-reports";
import { getPublicListings } from "@/lib/listings";
import { getDemandSignals } from "@/lib/market-demand";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Investor Market Reports",
  description:
    "Live rental inventory analytics and published Alabama & Georgia market reports for investors.",
};

export default async function InvestorMarketReportsPage() {
  const [listings, demand] = await Promise.all([getPublicListings(), getDemandSignals()]);
  const snapshot = buildMarketSnapshot(listings);
  const reports = getMarketReports();

  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Market reports"
        description="Live asking-rent analytics from our inventory, first-party inquiry signals, and published investor briefings — no fabricated metro statistics."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/investors/roi-calculator" variant="champagne">
            ROI calculator
          </Button>
          <Button href="/investors/neighborhoods" variant="ghost">
            Neighborhood guides
          </Button>
        </div>
      </PageHero>
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <MarketSnapshotPanel snapshot={snapshot} demand={demand} />
          </Container>
        </Section>

        <Section muted>
          <Container>
            <SectionHeading
              title="Published reports"
              description="Editorial briefings you can share with partners. Reports that include a live snapshot refresh whenever inventory changes."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {reports.map((r) => (
                <article key={r.slug} className="card-surface p-6 flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-champagne">
                    {r.period}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-navy">
                    <Link href={`/investors/market-reports/${r.slug}`} className="hover:text-navy-soft">
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
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="rounded-3xl bg-navy text-white px-8 py-10 text-center">
              <h2 className="font-heading text-2xl font-semibold">Want a property-specific view?</h2>
              <p className="mt-3 text-white/75 text-sm max-w-xl mx-auto">
                Request an analysis lead follow-up or model returns with the ROI calculator.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/investors/analysis" variant="champagne">
                  Investment analysis
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
