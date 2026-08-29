import type { PropertyListing } from "@/lib/data/listings";
import { neighborhoodGuides } from "@/lib/data/neighborhoods";

export type CityRentRow = {
  city: string;
  count: number;
  avgRent: number;
  minRent: number;
  maxRent: number;
  avgSqft: number | null;
  avgRentPerSqft: number | null;
};

export type TypeRentRow = {
  type: string;
  count: number;
  avgRent: number;
};

export type BedsRentRow = {
  beds: number;
  count: number;
  avgRent: number;
};

export type MarketSnapshot = {
  generatedAt: Date;
  sampleSize: number;
  availableCount: number;
  pendingCount: number;
  avgRent: number | null;
  medianRent: number | null;
  minRent: number | null;
  maxRent: number | null;
  avgSqft: number | null;
  avgRentPerSqft: number | null;
  garageShare: number | null;
  poolShare: number | null;
  byCity: CityRentRow[];
  byType: TypeRentRow[];
  byBeds: BedsRentRow[];
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function avg(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

/** Portfolio market snapshot from public inventory — not a metro-wide index. */
export function buildMarketSnapshot(listings: PropertyListing[]): MarketSnapshot {
  const availableCount = listings.filter((l) => (l.status ?? "Available") === "Available").length;
  const pendingCount = listings.filter((l) => l.status === "Pending").length;
  const rents = listings.map((l) => l.rent);
  const sqfts = listings.map((l) => l.sqft).filter((s) => s > 0);
  const rentPerSqft = listings
    .filter((l) => l.sqft > 0)
    .map((l) => l.rent / l.sqft);

  const cityMap = new Map<string, PropertyListing[]>();
  for (const l of listings) {
    const key = l.city;
    const bucket = cityMap.get(key) ?? [];
    bucket.push(l);
    cityMap.set(key, bucket);
  }

  const serviceOrder = neighborhoodGuides.map((g) => g.name);
  const byCity: CityRentRow[] = [...cityMap.entries()]
    .map(([city, rows]) => {
      const cityRents = rows.map((r) => r.rent);
      const citySqft = rows.map((r) => r.sqft).filter((s) => s > 0);
      const cityRpsf = rows.filter((r) => r.sqft > 0).map((r) => r.rent / r.sqft);
      return {
        city,
        count: rows.length,
        avgRent: avg(cityRents) ?? 0,
        minRent: Math.min(...cityRents),
        maxRent: Math.max(...cityRents),
        avgSqft: avg(citySqft),
        avgRentPerSqft: avg(cityRpsf),
      };
    })
    .sort((a, b) => {
      const ai = serviceOrder.indexOf(a.city);
      const bi = serviceOrder.indexOf(b.city);
      if (ai === -1 && bi === -1) return a.city.localeCompare(b.city);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  const typeMap = new Map<string, number[]>();
  for (const l of listings) {
    const bucket = typeMap.get(l.type) ?? [];
    bucket.push(l.rent);
    typeMap.set(l.type, bucket);
  }
  const byType: TypeRentRow[] = [...typeMap.entries()]
    .map(([type, values]) => ({
      type,
      count: values.length,
      avgRent: avg(values) ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const bedsMap = new Map<number, number[]>();
  for (const l of listings) {
    const bucket = bedsMap.get(l.beds) ?? [];
    bucket.push(l.rent);
    bedsMap.set(l.beds, bucket);
  }
  const byBeds: BedsRentRow[] = [...bedsMap.entries()]
    .map(([beds, values]) => ({
      beds,
      count: values.length,
      avgRent: avg(values) ?? 0,
    }))
    .sort((a, b) => a.beds - b.beds);

  return {
    generatedAt: new Date(),
    sampleSize: listings.length,
    availableCount,
    pendingCount,
    avgRent: avg(rents),
    medianRent: median(rents),
    minRent: rents.length ? Math.min(...rents) : null,
    maxRent: rents.length ? Math.max(...rents) : null,
    avgSqft: avg(sqfts),
    avgRentPerSqft: avg(rentPerSqft),
    garageShare: listings.length
      ? listings.filter((l) => l.garage).length / listings.length
      : null,
    poolShare: listings.length ? listings.filter((l) => l.pool).length / listings.length : null,
    byCity,
    byType,
    byBeds,
  };
}

export type DemandSignals = {
  showingsLast30Days: number;
  showingsNew: number;
  analysisLeadsLast30Days: number;
  analysisLeadsNew: number;
};

export type MarketReportSection = {
  title: string;
  body: string;
};

export type MarketReport = {
  slug: string;
  title: string;
  period: string;
  publishedAt: string;
  summary: string;
  takeaways: string[];
  sections: MarketReportSection[];
  /** When true, detail page embeds the live inventory snapshot */
  includeLiveSnapshot: boolean;
};

/**
 * Published editorial reports. Qualitative commentary only for metro themes;
 * live numbers come from inventory + first-party lead/showing activity.
 */
export const marketReports: MarketReport[] = [
  {
    slug: "southeast-rental-snapshot-2026-q3",
    title: "Alabama & Georgia rental snapshot",
    period: "Q3 2026",
    publishedAt: "2026-08-01",
    summary:
      "A portfolio-based view of asking rents across our Alabama and Georgia inventory, plus first-party inquiry activity from showings and analysis requests.",
    takeaways: [
      "Use city-level averages from live inventory — not a single statewide rent figure — when underwriting.",
      "Showing and analysis-lead volume is a practical near-term demand signal for managed product.",
      "Condition, photos, and pricing relative to local comps still drive lease-up more than state headlines.",
    ],
    includeLiveSnapshot: true,
    sections: [
      {
        title: "How to read this report",
        body: "Unless noted otherwise, rent figures on this page are calculated from publicly listed available and pending homes in our system. That is a managed-portfolio sample, not MLS coverage of every Alabama or Georgia rental. Sample size matters — treat thin city buckets as directional.",
      },
      {
        title: "Regional context",
        body: "Alabama and Georgia draw households for employment, education, and lifestyle — but metros behave differently. Urban product competes on location and amenities; suburbs often compete on space and monthly cost. Investors should underwrite the specific city and product type, then stress-test vacancy and maintenance assumptions with their CPA and lender.",
      },
      {
        title: "Demand indicators (first-party)",
        body: "We track Schedule a Showing submissions and rental analysis leads as internal demand signals. Rising new inquiries can indicate stronger interest in currently marketed homes; quiet periods may reflect seasonality, pricing, or thinner available inventory. These are operational metrics for our platform — not government vacancy statistics.",
      },
      {
        title: "What we do not publish here",
        body: "We intentionally omit fabricated metro vacancy rates, unverified cap-rate averages, and sale-price indices. When you connect MLS, census, or vendor feeds later, those series can sit alongside this inventory dashboard without rewriting the page structure.",
      },
      {
        title: "Owner & investor next steps",
        body: "Compare your asset to the city and bedroom averages below, run scenarios in the ROI calculator, and request a personalized analysis if you want a property-specific follow-up from our team.",
      },
    ],
  },
  {
    slug: "alabama-georgia-market-notes-2026-q3",
    title: "Alabama & Georgia market notes",
    period: "Q3 2026",
    publishedAt: "2026-08-01",
    summary:
      "Qualitative notes on Alabama and Georgia metros — paired with live asking-rent tables from current listings.",
    takeaways: [
      "Alabama demand concentrates in Birmingham, Huntsville, Mobile, and Montgomery corridors.",
      "Georgia spans metro Atlanta diversity plus coastal and secondary-city lifestyle markets.",
      "Cross-check state guides for lifestyle and housing-stock context.",
    ],
    includeLiveSnapshot: true,
    sections: [
      {
        title: "Alabama",
        body: "Underwrite by metro. Birmingham and Huntsville often differ in employment drivers and housing age; Mobile and coastal communities add insurance and lifestyle considerations. Segment by beds, type, and city before comparing to a statewide average.",
      },
      {
        title: "Georgia",
        body: "Metro Atlanta alone contains many submarkets — intown, perimeter suburbs, and outer counties are not interchangeable. Savannah and other regional cities behave more like lifestyle markets. Price and present for the neighborhood you own.",
      },
      {
        title: "Fair Housing reminder",
        body: "School references are for general orientation only. We do not steer applicants. Verify attendance zones with the district and keep marketing focused on the property and objective amenities.",
      },
    ],
  },
  {
    slug: "investor-underwriting-checklist-2026",
    title: "Investor underwriting checklist",
    period: "2026 guide",
    publishedAt: "2026-07-15",
    summary:
      "A practical checklist for evaluating Alabama and Georgia rentals using our live comps, ROI calculator, and analysis workflow — not a promise of returns.",
    takeaways: [
      "Start with realistic rent from local comps, then layer vacancy, repairs, and management.",
      "Stress-test interest rates and insurance before relying on optimistic cash-flow screens.",
      "Document HOA, parking, and lease-restriction risk before you close.",
    ],
    includeLiveSnapshot: false,
    sections: [
      {
        title: "1. Rent & revenue",
        body: "Anchor expected rent to recent local comps (including our live inventory snapshot and professional sources). Adjust for condition, upgrades, and concessions. Do not assume the highest listing in a city is achievable for every home.",
      },
      {
        title: "2. Operating expenses",
        body: "Include taxes, insurance, HOA, utilities you will cover, landscaping, and a maintenance reserve. Management fees should match the service level you expect — our pricing pages outline typical structures.",
      },
      {
        title: "3. Vacancy & turnover",
        body: "Model vacancy as both days vacant and make-ready cost. Turnover frequency varies by product and tenant profile; suburban SFH often differs from urban short-stay-prone product (subject to local STR rules).",
      },
      {
        title: "4. Financing & reserves",
        body: "Use current lender quotes rather than outdated rate assumptions. Keep reserves for HVAC, roof, and unexpected repairs — especially on older housing stock.",
      },
      {
        title: "5. Management & compliance",
        body: "Confirm who handles showings, screening (via compliant third parties), maintenance triage, and accounting. Fair Housing, habitability, and local ordinances are non-negotiable operating constraints — not optional line items.",
      },
      {
        title: "Disclaimer",
        body: "This checklist is educational and not financial, legal, or tax advice. Verify assumptions with your CPA, lender, and attorney before purchasing or refinancing.",
      },
    ],
  },
];

export function getMarketReport(slug: string) {
  return marketReports.find((r) => r.slug === slug);
}

export function getMarketReports() {
  return [...marketReports].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
