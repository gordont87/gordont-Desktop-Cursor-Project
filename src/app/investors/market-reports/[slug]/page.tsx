import { MarketSnapshotPanel } from "@/components/investors/MarketSnapshotPanel";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import {
  buildMarketSnapshot,
  getMarketReport,
  getMarketReports,
} from "@/lib/data/market-reports";
import { getPublicListings } from "@/lib/listings";
import { getDemandSignals } from "@/lib/market-demand";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getMarketReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getMarketReport(slug);
  if (!report) return { title: "Report not found" };
  return {
    title: `${report.title} · ${report.period}`,
    description: report.summary,
  };
}

export default async function MarketReportDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getMarketReport(slug);
  if (!report) notFound();

  const [listings, demand] = report.includeLiveSnapshot
    ? await Promise.all([getPublicListings(), getDemandSignals()])
    : [null, null];
  const snapshot = listings ? buildMarketSnapshot(listings) : null;

  const others = getMarketReports().filter((r) => r.slug !== report.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Market report · ${report.period}`}
        title={report.title}
        description={report.summary}
      >
        <p className="text-sm text-white/60">
          Published {new Date(report.publishedAt).toLocaleDateString()}
        </p>
      </PageHero>
      <ContentPage showPlaceholder={false}>
        <Section>
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-heading text-xl font-semibold text-navy">Key takeaways</h2>
              <ul className="mt-4 space-y-3">
                {report.takeaways.map((t) => (
                  <li
                    key={t}
                    className="text-sm text-charcoal leading-relaxed border-l-2 border-champagne pl-4"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 space-y-10 max-w-3xl">
              {report.sections.map((s) => (
                <div key={s.title}>
                  <h2 className="font-heading text-xl font-semibold text-navy">{s.title}</h2>
                  <p className="mt-3 text-sm text-slate leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {snapshot && demand ? (
          <Section muted>
            <Container>
              <MarketSnapshotPanel snapshot={snapshot} demand={demand} />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/investors/neighborhoods" variant="outline">
                  Neighborhood guides
                </Button>
                <Button href="/investors/roi-calculator" variant="outline">
                  ROI calculator
                </Button>
              </div>
            </Container>
          </Section>
        ) : (
          <Section muted>
            <Container>
              <div className="flex flex-wrap gap-3">
                <Button href="/investors/market-reports">Live market dashboard</Button>
                <Button href="/investors/roi-calculator" variant="outline">
                  ROI calculator
                </Button>
                <Button href="/investors/analysis" variant="outline">
                  Request analysis
                </Button>
              </div>
            </Container>
          </Section>
        )}

        {others.length > 0 ? (
          <Section>
            <Container>
              <h2 className="font-heading text-xl font-semibold text-navy mb-4">More reports</h2>
              <ul className="grid sm:grid-cols-3 gap-4">
                {others.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/investors/market-reports/${r.slug}`}
                      className="block rounded-2xl border border-border px-5 py-4 hover:border-champagne transition-colors"
                    >
                      <p className="text-xs text-champagne font-semibold uppercase tracking-wider">
                        {r.period}
                      </p>
                      <p className="mt-1 font-heading font-semibold text-navy">{r.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        ) : null}
      </ContentPage>
    </>
  );
}
