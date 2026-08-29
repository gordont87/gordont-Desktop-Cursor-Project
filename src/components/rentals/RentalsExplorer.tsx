"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import type { PropertyListing } from "@/lib/data/listings";
import { formatCurrency } from "@/lib/utils";
import { RentalsMap } from "@/components/rentals/RentalsMap";
import { Bath, BedDouble, Maximize, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

function availableByDate(available: string, filterDate: string) {
  if (!filterDate) return true;
  if (/^now$/i.test(available.trim())) return true;
  const avail = Date.parse(available);
  const filter = Date.parse(filterDate);
  if (Number.isNaN(avail) || Number.isNaN(filter)) return true;
  return avail <= filter;
}

function matches(listing: PropertyListing, filters: Filters) {
  if (
    filters.location &&
    !`${listing.city} ${listing.address} ${listing.zip}`.toLowerCase().includes(filters.location.toLowerCase())
  ) {
    return false;
  }
  if (filters.minRent && listing.rent < Number(filters.minRent)) return false;
  if (filters.maxRent && listing.rent > Number(filters.maxRent)) return false;
  if (filters.beds && listing.beds < Number(filters.beds)) return false;
  if (filters.baths && listing.baths < Number(filters.baths)) return false;
  if (filters.type && listing.type !== filters.type) return false;
  if (filters.pets === "yes" && /no pets/i.test(listing.pets)) return false;
  if (filters.garage === "yes" && !listing.garage) return false;
  if (filters.pool === "yes" && !listing.pool) return false;
  if (!availableByDate(listing.available, filters.available)) return false;
  return true;
}

type Filters = {
  location: string;
  minRent: string;
  maxRent: string;
  beds: string;
  baths: string;
  type: string;
  pets: string;
  garage: string;
  pool: string;
  available: string;
};

const empty: Filters = {
  location: "",
  minRent: "",
  maxRent: "",
  beds: "",
  baths: "",
  type: "",
  pets: "",
  garage: "",
  pool: "",
  available: "",
};

export function RentalsExplorer({
  listings,
  initialView = "list",
}: {
  listings: PropertyListing[];
  initialView?: "list" | "map";
}) {
  const [view, setView] = useState<"list" | "map">(initialView);
  const [filters, setFilters] = useState<Filters>(empty);

  const results = useMemo(
    () => listings.filter((l) => matches(l, filters)),
    [filters, listings],
  );

  return (
    <div className="container-wide py-10 space-y-8">
      <form
        className="card-surface p-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="Location" htmlFor="location">
          <Input
            id="location"
            placeholder="City or street"
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          />
        </Field>
        <Field label="Min rent" htmlFor="minRent">
          <Input
            id="minRent"
            inputMode="numeric"
            placeholder="1500"
            value={filters.minRent}
            onChange={(e) => setFilters((f) => ({ ...f, minRent: e.target.value }))}
          />
        </Field>
        <Field label="Max rent" htmlFor="maxRent">
          <Input
            id="maxRent"
            inputMode="numeric"
            placeholder="3500"
            value={filters.maxRent}
            onChange={(e) => setFilters((f) => ({ ...f, maxRent: e.target.value }))}
          />
        </Field>
        <Field label="Property type" htmlFor="type">
          <Select
            id="type"
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          >
            <option value="">Any</option>
            <option>Single Family</option>
            <option>Townhome</option>
            <option>Condo</option>
            <option>Apartment</option>
          </Select>
        </Field>
        <Field label="Bedrooms" htmlFor="beds">
          <Select
            id="beds"
            value={filters.beds}
            onChange={(e) => setFilters((f) => ({ ...f, beds: e.target.value }))}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </Select>
        </Field>
        <Field label="Bathrooms" htmlFor="baths">
          <Select
            id="baths"
            value={filters.baths}
            onChange={(e) => setFilters((f) => ({ ...f, baths: e.target.value }))}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </Select>
        </Field>
        <Field label="Pets allowed" htmlFor="pets">
          <Select
            id="pets"
            value={filters.pets}
            onChange={(e) => setFilters((f) => ({ ...f, pets: e.target.value }))}
          >
            <option value="">Any</option>
            <option value="yes">Pets considered</option>
          </Select>
        </Field>
        <Field label="Garage" htmlFor="garage">
          <Select
            id="garage"
            value={filters.garage}
            onChange={(e) => setFilters((f) => ({ ...f, garage: e.target.value }))}
          >
            <option value="">Any</option>
            <option value="yes">Required</option>
          </Select>
        </Field>
        <Field label="Pool" htmlFor="pool">
          <Select
            id="pool"
            value={filters.pool}
            onChange={(e) => setFilters((f) => ({ ...f, pool: e.target.value }))}
          >
            <option value="">Any</option>
            <option value="yes">Required</option>
          </Select>
        </Field>
        <Field label="Available by" htmlFor="available">
          <Input
            id="available"
            type="date"
            value={filters.available}
            onChange={(e) => setFilters((f) => ({ ...f, available: e.target.value }))}
          />
        </Field>
        <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-sm text-slate">
            {results.length} listing{results.length === 1 ? "" : "s"} · Fair Housing compliant filters
            only
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={view === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              List View
            </Button>
            <Button
              type="button"
              variant={view === "map" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("map")}
            >
              Map View
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => setFilters(empty)}>
              Reset
            </Button>
          </div>
        </div>
      </form>

      {view === "map" ? (
        <RentalsMap listings={results} />
      ) : results.length === 0 ? (
        <div className="card-surface p-10 text-center text-slate text-sm">
          No listings match your filters. Try adjusting search criteria or check back soon.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((listing) => (
            <article key={listing.id} className="card-surface overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image
                  src={listing.image}
                  alt={`Photo of ${listing.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <span className="absolute top-3 right-3 rounded-full bg-navy/90 text-white text-xs font-semibold px-3 py-1">
                  {formatCurrency(listing.rent)}/mo
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-heading text-lg font-semibold text-navy">
                  <Link href={`/rentals/${listing.slug}`} className="hover:text-navy-soft">
                    {listing.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-slate">
                  {listing.address}, {listing.city}, {listing.state}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3 text-sm text-charcoal">
                  <li className="inline-flex items-center gap-1">
                    <BedDouble className="size-4 text-champagne" /> {listing.beds} bd
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <Bath className="size-4 text-champagne" /> {listing.baths} ba
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <Ruler className="size-4 text-champagne" /> {listing.sqft.toLocaleString()} sqft
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <Maximize className="size-4 text-champagne" /> {listing.type}
                  </li>
                </ul>
                <p className="mt-3 text-xs text-slate">Available: {listing.available}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href={`/rentals/${listing.slug}`} size="sm" variant="champagne">
                    View Details
                  </Button>
                  <Button
                    href={`/rentals/schedule-showing?property=${listing.slug}`}
                    size="sm"
                    variant="outline"
                  >
                    Schedule Showing
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
