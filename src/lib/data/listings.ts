export type PropertyListing = {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  rent: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  pets: string;
  garage: boolean;
  pool: boolean;
  available: string;
  amenities: string[];
  image: string;
  virtualTourUrl?: string | null;
  status?: string;
  description?: string | null;
  lat?: number | null;
  lng?: number | null;
};

/** Seed / fallback sample inventory (coords are approximate for demo map pins) */
export const seedListings: Omit<PropertyListing, "id">[] = [
  {
    slug: "vestavia-craftsman",
    title: "Vestavia Craftsman",
    address: "2148 Willow Creek Dr",
    city: "Birmingham",
    state: "AL",
    zip: "35216",
    rent: 2150,
    beds: 3,
    baths: 2,
    sqft: 1680,
    type: "Single Family",
    pets: "Cats & dogs considered",
    garage: true,
    pool: false,
    available: "2026-09-01",
    amenities: ["Updated kitchen", "Fenced yard", "Washer/dryer", "Smart thermostat"],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    lat: 33.4484,
    lng: -86.7877,
  },
  {
    slug: "huntsville-townhome",
    title: "Jones Valley Townhome",
    address: "88 Harbor Lane",
    city: "Huntsville",
    state: "AL",
    zip: "35802",
    rent: 1895,
    beds: 2,
    baths: 2.5,
    sqft: 1320,
    type: "Townhome",
    pets: "Cats allowed",
    garage: true,
    pool: true,
    available: "2026-08-15",
    amenities: ["Community pool", "Attached garage", "Patio", "Walk-in closet"],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    lat: 34.7304,
    lng: -86.5861,
  },
  {
    slug: "mobile-condo",
    title: "Midtown Mobile Condo",
    address: "401 Vista Ridge #12",
    city: "Mobile",
    state: "AL",
    zip: "36604",
    rent: 1450,
    beds: 1,
    baths: 1,
    sqft: 820,
    type: "Condo",
    pets: "No pets",
    garage: false,
    pool: true,
    available: "Now",
    amenities: ["Fitness center", "Balcony", "In-unit laundry", "Covered parking"],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    lat: 30.6954,
    lng: -88.0399,
  },
  {
    slug: "alpharetta-family-home",
    title: "Alpharetta Family Home",
    address: "955 Redbud Court",
    city: "Alpharetta",
    state: "GA",
    zip: "30009",
    rent: 2750,
    beds: 4,
    baths: 2.5,
    sqft: 2100,
    type: "Single Family",
    pets: "Pets considered with deposit",
    garage: true,
    pool: false,
    available: "2026-10-01",
    amenities: ["Open floor plan", "Home office", "Large backyard", "Two-car garage"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    lat: 34.0754,
    lng: -84.2941,
  },
  {
    slug: "decatur-modern",
    title: "Decatur Modern",
    address: "670 Stonebridge Way",
    city: "Decatur",
    state: "GA",
    zip: "30030",
    rent: 2395,
    beds: 3,
    baths: 2,
    sqft: 1540,
    type: "Single Family",
    pets: "Dogs considered",
    garage: true,
    pool: false,
    available: "2026-08-20",
    amenities: ["Quartz counters", "EV charger ready", "Smart locks", "Irrigation"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    lat: 33.7748,
    lng: -84.2963,
  },
  {
    slug: "savannah-historic-loft",
    title: "Savannah Historic Loft",
    address: "120 Broughton St #805",
    city: "Savannah",
    state: "GA",
    zip: "31401",
    rent: 2100,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    pets: "Cats & small dogs",
    garage: false,
    pool: true,
    available: "2026-09-15",
    amenities: ["Historic district", "Rooftop deck", "In-unit laundry", "Walkable dining"],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    lat: 32.0809,
    lng: -81.0912,
  },
];

/** @deprecated Use DB listings — kept as alias for older imports during migration */
export const demoListings = seedListings.map((l, i) => ({
  ...l,
  id: String(i + 1),
  isDemo: true as const,
}));

export function parseAmenities(amenitiesJson: string): string[] {
  try {
    const parsed = JSON.parse(amenitiesJson) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export type DbListingRow = {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  rent: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  pets: string;
  garage: boolean;
  pool: boolean;
  available: string;
  amenitiesJson: string;
  imageUrl: string;
  virtualTourUrl: string | null;
  lat: number | null;
  lng: number | null;
  status: string;
  description: string | null;
};

export function toPropertyListing(row: DbListingRow): PropertyListing {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    rent: row.rent,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    type: row.type,
    pets: row.pets,
    garage: row.garage,
    pool: row.pool,
    available: row.available,
    amenities: parseAmenities(row.amenitiesJson),
    image: row.imageUrl,
    virtualTourUrl: row.virtualTourUrl,
    status: row.status,
    description: row.description,
    lat: row.lat,
    lng: row.lng,
  };
}
