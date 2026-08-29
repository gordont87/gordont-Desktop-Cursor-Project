"use client";

import {
  createRentalListing,
  deleteRentalListing,
  geocodeListingAddress,
  updateRentalListing,
  type GeocodeState,
  type ListingActionState,
} from "@/app/actions/owner-listings";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Form";
import { parseAmenities } from "@/lib/data/listings";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";

const initial: ListingActionState = {};

export type ListingFormValues = {
  id?: string;
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

export function ListingEditorForm({
  mode,
  listing,
}: {
  mode: "create" | "edit";
  listing?: ListingFormValues;
}) {
  const action = mode === "create" ? createRentalListing : updateRentalListing;
  const [state, formAction, pending] = useActionState(action, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const [lat, setLat] = useState(listing?.lat != null ? String(listing.lat) : "");
  const [lng, setLng] = useState(listing?.lng != null ? String(listing.lng) : "");
  const [geocodeState, setGeocodeState] = useState<GeocodeState>({});
  const [geocodePending, startGeocode] = useTransition();
  const amenities = listing ? parseAmenities(listing.amenitiesJson).join(", ") : "";

  useEffect(() => {
    if (geocodeState.lat != null && geocodeState.lng != null) {
      setLat(String(geocodeState.lat));
      setLng(String(geocodeState.lng));
    }
  }, [geocodeState.lat, geocodeState.lng]);

  function handleGeocode() {
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData();
    for (const key of ["address", "city", "state", "zip"] as const) {
      const el = form.elements.namedItem(key) as HTMLInputElement | null;
      fd.set(key, el?.value ?? "");
    }
    startGeocode(async () => {
      const result = await geocodeListingAddress({}, fd);
      setGeocodeState(result);
    });
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="card-surface p-6 grid gap-4 sm:grid-cols-2 max-w-4xl"
    >
      {listing?.id ? <input type="hidden" name="id" value={listing.id} /> : null}

      <Field label="Title" htmlFor="title" required>
        <Input id="title" name="title" required defaultValue={listing?.title ?? ""} />
      </Field>
      <Field label="URL slug" htmlFor="slug" hint="Leave blank on create to auto-generate from title">
        <Input id="slug" name="slug" defaultValue={listing?.slug ?? ""} placeholder="oak-ridge-craftsman" />
      </Field>

      <Field label="Street address" htmlFor="address" required>
        <Input id="address" name="address" required defaultValue={listing?.address ?? ""} />
      </Field>
      <Field label="City" htmlFor="city" required>
        <Input id="city" name="city" required defaultValue={listing?.city ?? ""} />
      </Field>
      <Field label="State" htmlFor="state" required>
        <Input id="state" name="state" required defaultValue={listing?.state ?? "TX"} maxLength={2} />
      </Field>
      <Field label="ZIP" htmlFor="zip" required>
        <Input id="zip" name="zip" required defaultValue={listing?.zip ?? ""} />
      </Field>

      <Field label="Latitude" htmlFor="lat" hint="Needed for Map Search pins">
        <Input
          id="lat"
          name="lat"
          inputMode="decimal"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="30.2672"
        />
      </Field>
      <Field label="Longitude" htmlFor="lng">
        <Input
          id="lng"
          name="lng"
          inputMode="decimal"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="-97.7431"
        />
      </Field>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" size="sm" disabled={geocodePending} onClick={handleGeocode}>
          {geocodePending ? "Geocoding…" : "Geocode address"}
        </Button>
        {geocodeState.error ? (
          <p className="text-sm text-red-700">{geocodeState.error}</p>
        ) : null}
        {geocodeState.success ? (
          <p className="text-sm text-success">{geocodeState.success}</p>
        ) : null}
      </div>

      <Field label="Monthly rent ($)" htmlFor="rent" required>
        <Input
          id="rent"
          name="rent"
          type="number"
          min="1"
          step="0.01"
          required
          defaultValue={listing?.rent ?? ""}
        />
      </Field>
      <Field label="Property type" htmlFor="type" required>
        <Select id="type" name="type" defaultValue={listing?.type ?? "Single Family"}>
          <option>Single Family</option>
          <option>Townhome</option>
          <option>Condo</option>
          <option>Apartment</option>
        </Select>
      </Field>

      <Field label="Bedrooms" htmlFor="beds" required>
        <Input id="beds" name="beds" type="number" min="0" required defaultValue={listing?.beds ?? 3} />
      </Field>
      <Field label="Bathrooms" htmlFor="baths" required>
        <Input
          id="baths"
          name="baths"
          type="number"
          min="0"
          step="0.5"
          required
          defaultValue={listing?.baths ?? 2}
        />
      </Field>
      <Field label="Square footage" htmlFor="sqft" required>
        <Input id="sqft" name="sqft" type="number" min="1" required defaultValue={listing?.sqft ?? ""} />
      </Field>
      <Field label="Available" htmlFor="available" required hint='Use "Now" or a date like 2026-09-01'>
        <Input id="available" name="available" required defaultValue={listing?.available ?? "Now"} />
      </Field>

      <Field label="Pet policy" htmlFor="pets" required>
        <Input
          id="pets"
          name="pets"
          required
          defaultValue={listing?.pets ?? "Pets considered with deposit"}
        />
      </Field>
      <Field label="Status" htmlFor="status" required>
        <Select id="status" name="status" defaultValue={listing?.status ?? "Available"}>
          <option value="Available">Available (public)</option>
          <option value="Pending">Pending (public)</option>
          <option value="Leased">Leased (hidden from search)</option>
          <option value="Hidden">Hidden</option>
        </Select>
      </Field>

      <label className="flex items-center gap-2 text-sm text-navy">
        <input
          type="checkbox"
          name="garage"
          value="true"
          defaultChecked={listing?.garage ?? false}
          className="size-4 accent-navy"
        />
        Garage
      </label>
      <label className="flex items-center gap-2 text-sm text-navy">
        <input
          type="checkbox"
          name="pool"
          value="true"
          defaultChecked={listing?.pool ?? false}
          className="size-4 accent-navy"
        />
        Pool
      </label>

      <div className="sm:col-span-2">
        <Field
          label="Amenities"
          htmlFor="amenities"
          hint="Comma-separated, e.g. Washer/dryer, Fenced yard, Smart thermostat"
        >
          <Input id="amenities" name="amenities" defaultValue={amenities} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Photo URL" htmlFor="imageUrl" required>
          <Input id="imageUrl" name="imageUrl" required defaultValue={listing?.imageUrl ?? ""} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Virtual tour URL" htmlFor="virtualTourUrl">
          <Input
            id="virtualTourUrl"
            name="virtualTourUrl"
            defaultValue={listing?.virtualTourUrl ?? ""}
            placeholder="https://..."
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Description" htmlFor="description">
          <Textarea id="description" name="description" defaultValue={listing?.description ?? ""} />
        </Field>
      </div>

      {state.error ? (
        <p className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="sm:col-span-2 text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
          {state.success}
        </p>
      ) : null}

      <div className="sm:col-span-2 flex flex-wrap gap-3">
        <Button type="submit" variant="champagne" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Publish listing" : "Save changes"}
        </Button>
        <Button href="/owners/portal/listings" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function OwnerListingsTable({
  listings,
}: {
  listings: {
    id: string;
    slug: string;
    title: string;
    city: string;
    rent: number;
    status: string;
    available: string;
  }[];
}) {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-navy">Rental listings</h1>
          <p className="mt-2 text-sm text-slate">
            Manage inventory shown on Available Rentals. Available and Pending appear in public search.
          </p>
        </div>
        <Button href="/owners/portal/listings/new" variant="champagne">
          Add listing
        </Button>
      </div>

      <section className="card-surface overflow-hidden">
        {listings.length === 0 ? (
          <p className="p-5 text-sm text-slate">No listings yet. Add your first available rental.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-surface-muted text-left text-slate">
                <tr>
                  <th className="px-5 py-3 font-medium">Listing</th>
                  <th className="px-5 py-3 font-medium">Rent</th>
                  <th className="px-5 py-3 font-medium">Available</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"> </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy">{l.title}</p>
                      <p className="text-xs text-slate">{l.city}</p>
                    </td>
                    <td className="px-5 py-3">{formatCurrency(l.rent)}/mo</td>
                    <td className="px-5 py-3">{l.available}</td>
                    <td className="px-5 py-3">{l.status}</td>
                    <td className="px-5 py-3 text-right space-x-3">
                      <Link
                        href={`/rentals/${l.slug}`}
                        className="text-sm text-slate hover:underline"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        href={`/owners/portal/listings/${l.id}`}
                        className="text-sm font-medium text-champagne hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteRentalListing} className="inline">
                        <input type="hidden" name="id" value={l.id} />
                        <button
                          type="submit"
                          className="text-sm text-red-700 hover:underline"
                          onClick={(e) => {
                            if (!confirm("Delete this listing from public search?")) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
