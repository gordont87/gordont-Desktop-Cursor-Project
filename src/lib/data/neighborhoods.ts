import type { PropertyListing } from "@/lib/data/listings";
import { siteConfig } from "@/lib/site-config";

export type NeighborhoodGuide = {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  summary: string;
  /** Full-bleed-friendly Unsplash (or similar) for area atmosphere */
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
  overview: string;
  housingStock: string;
  schools: {
    body: string;
    districts: { name: string; note: string }[];
  };
  attractions: string[];
  transportation: string;
  shopping: string;
  investment: string;
  renterFit: string;
  ownerFit: string;
};

/**
 * Editorial guides for Alabama and Georgia service areas.
 * Qualitative local knowledge only — no fabricated rent/vacancy statistics.
 * Live rent figures come from inventory via getAreaListingStats().
 */
export const neighborhoodGuides: NeighborhoodGuide[] = [
  {
    slug: "alabama",
    name: "Alabama",
    state: "AL",
    tagline: "Residential management across Alabama’s growing metros and suburban corridors",
    summary:
      "From Birmingham and Huntsville to Mobile and Montgomery, Alabama offers a mix of urban infill, suburban single-family homes, and Gulf-adjacent lifestyle markets for renters and investors.",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Southern single-family home with porch and landscaping",
    highlights: [
      "Major renter pools in Birmingham, Huntsville, Mobile, and Montgomery",
      "Strong single-family suburban inventory statewide",
      "Defense, healthcare, manufacturing, and university-driven demand in key metros",
      "Gulf Coast recreation influences Mobile / Baldwin County lifestyle rentals",
    ],
    overview:
      "Alabama’s rental markets are metro-specific rather than one statewide product. Birmingham anchors central Alabama with urban and suburban neighborhoods; Huntsville continues to draw aerospace, defense, and tech-related households; Mobile and the Eastern Shore blend port-economy jobs with coastal lifestyle; Montgomery supports government and education-driven demand. Owners who succeed here underwrite the specific metro and neighborhood — not a single Alabama average.",
    housingStock:
      "Inventory skews toward single-family homes and townhomes in suburban subdivisions, with condo and multifamily options near urban cores and employment centers. Older housing stock is common in established neighborhoods; newer builds compete on finish level and energy efficiency. HOA rules, flood-zone diligence near the coast, and HVAC capacity for humid summers are practical diligence items.",
    schools: {
      body: "Alabama is served by city and county school systems that vary by address. Always verify attendance zones with the local board of education before answering applicant questions. We do not steer based on protected characteristics.",
      districts: [
        { name: "Birmingham City Schools", note: "Verify zones for Birmingham addresses" },
        { name: "Huntsville City Schools", note: "Verify zones for Huntsville addresses" },
        { name: "Mobile County Public Schools", note: "Covers much of the Mobile metro — confirm campus" },
        { name: "Montgomery Public Schools", note: "Verify zones for Montgomery addresses" },
      ],
    },
    attractions: [
      "Birmingham’s food, arts, and Railroad Park corridor",
      "Huntsville’s museums and outdoor recreation nearby",
      "Gulf beaches and Mobile Bay recreation",
      "University towns and college-sports culture statewide",
    ],
    transportation:
      "I-65, I-20/I-59, I-85, and I-10 shape most intercity travel. Within metros, renters still rely heavily on cars. Listings that clearly describe access to employment corridors (without promising drive times) help relocating applicants orient quickly.",
    shopping:
      "Each metro has grocery-anchored retail, regional malls or lifestyle centers, and downtown dining districts. Daily convenience and parking are typical strengths of suburban Alabama product versus denser urban markets.",
    investment:
      "Alabama can suit investors seeking relatively accessible price points and longer suburban tenancy profiles, depending on metro. Underwrite insurance (including wind/flood near the coast), property taxes, and local landlord-tenant rules with counsel. This page is not financial or legal advice.",
    renterFit:
      "Households relocating for jobs, students near universities, and families seeking suburban space and Southern metro amenities.",
    ownerFit:
      "Owners focused on single-family and townhome product across Alabama’s primary employment markets.",
  },
  {
    slug: "georgia",
    name: "Georgia",
    state: "GA",
    tagline: "From metro Atlanta to Georgia’s coastal and secondary cities",
    summary:
      "Georgia’s rental demand spans Atlanta’s diverse submarkets, surrounding suburbs, and lifestyle markets like Savannah and other regional cities — with housing types from urban apartments to suburban single-family homes.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Tree-lined residential street with classic Southern homes",
    highlights: [
      "Metro Atlanta remains the state’s largest and most varied rental market",
      "Suburban SFH and townhome demand across the perimeter counties",
      "Savannah and coastal Georgia blend tourism, history, and year-round living",
      "Employment drivers include logistics, film/TV, healthcare, and corporate HQs",
    ],
    overview:
      "Georgia is not a single rental market. Inside the Perimeter and intown Atlanta neighborhoods compete on walkability, transit access, and amenities; northern and eastern suburbs often compete on schools messaging (Fair Housing compliant), yards, and commute corridors; Savannah and coastal communities attract lifestyle and hospitality-economy renters. Price and present for the submarket you own — citywide averages hide too much.",
    housingStock:
      "Expect apartments and condos in urban cores, townhomes along growth corridors, and large inventories of single-family homes in master-planned suburbs. HOA and condo association fees vary widely. Investors should underwrite parking, HOA leasing caps, and renovation scope by product type.",
    schools: {
      body: "Georgia school systems are organized by county and city. Attendance zones change; confirm with the local district. Never use school information to steer applicants.",
      districts: [
        { name: "Atlanta Public Schools", note: "City of Atlanta addresses — verify campus" },
        { name: "Fulton / DeKalb / Cobb / Gwinnett", note: "Major metro Atlanta county systems — confirm by address" },
        { name: "Savannah-Chatham County Public Schools", note: "Coastal Georgia — verify zones" },
      ],
    },
    attractions: [
      "Atlanta’s dining, sports, and BeltLine-adjacent neighborhoods",
      "Parks, trails, and lakes across north Georgia",
      "Savannah’s historic district and coastal recreation",
      "Year-round events, universities, and cultural destinations",
    ],
    transportation:
      "I-75, I-85, I-20, and I-95 define regional travel; inside Atlanta, MARTA serves select corridors while many renters still drive. Clear, honest location descriptions matter more than optimistic commute claims.",
    shopping:
      "Lifestyle centers, grocery anchors, and neighborhood retail are dense across metro Atlanta suburbs. Savannah and secondary cities offer walkable cores plus corridor retail — a leasing plus for convenience-focused tenants.",
    investment:
      "Georgia rewards investors who understand submarket supply, HOA constraints, and insurance costs. Metro Atlanta liquidity differs from secondary cities. Use live comps from your inventory and professional advice — do not rely on statewide averages alone.",
    renterFit:
      "Professionals, relocating families, students, and households seeking urban, suburban, or coastal Georgia lifestyles.",
    ownerFit:
      "Owners managing SFH, townhome, or multifamily product across Georgia’s primary and lifestyle markets.",
  },
];

export function getNeighborhoodGuide(slug: string) {
  return neighborhoodGuides.find((g) => g.slug === slug);
}

export function getNeighborhoodGuideByCityName(city: string) {
  const normalized = city.trim().toLowerCase();
  return neighborhoodGuides.find((g) => g.name.toLowerCase() === normalized);
}

export function getNeighborhoodGuideByState(state: string) {
  const normalized = state.trim().toUpperCase();
  return neighborhoodGuides.find((g) => g.state.toUpperCase() === normalized);
}

export type AreaListingStats = {
  count: number;
  avgRent: number | null;
  minRent: number | null;
  maxRent: number | null;
  types: string[];
};

/** Match listings to a service area by state code (Alabama / Georgia guides). */
export function getAreaListingStats(
  area: Pick<NeighborhoodGuide, "name" | "state">,
  listings: PropertyListing[],
): AreaListingStats {
  const rentals = listings.filter(
    (l) => l.state.toUpperCase() === area.state.toUpperCase(),
  );
  if (rentals.length === 0) {
    return { count: 0, avgRent: null, minRent: null, maxRent: null, types: [] };
  }
  const rents = rentals.map((l) => l.rent);
  const avgRent = rents.reduce((s, r) => s + r, 0) / rents.length;
  const types = [...new Set(rentals.map((l) => l.type))];
  return {
    count: rentals.length,
    avgRent,
    minRent: Math.min(...rents),
    maxRent: Math.max(...rents),
    types,
  };
}

/** Keep siteConfig.serviceAreas and guides aligned for routing */
export function assertGuidesCoverServiceAreas() {
  const slugs = new Set(neighborhoodGuides.map((g) => g.slug));
  return siteConfig.serviceAreas.every((a) => slugs.has(a.slug));
}
