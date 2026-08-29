"use client";

import type { PropertyListing } from "@/lib/data/listings";
import { formatCurrency } from "@/lib/utils";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import { useMemo, useState } from "react";

const mapContainerStyle = { width: "100%", height: "100%", minHeight: "24rem" };

const defaultCenter = { lat: 33.5, lng: -85.0 };

export function RentalsMap({ listings }: { listings: PropertyListing[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mappable = useMemo(
    () =>
      listings.filter(
        (l) =>
          typeof l.lat === "number" &&
          typeof l.lng === "number" &&
          Number.isFinite(l.lat) &&
          Number.isFinite(l.lng),
      ),
    [listings],
  );

  const { isLoaded, loadError } = useJsApiLoader({
    id: "ttg-rentals-map",
    googleMapsApiKey: apiKey,
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = mappable.find((l) => l.id === activeId) ?? null;

  const center = useMemo(() => {
    if (mappable.length === 0) return defaultCenter;
    const lat = mappable.reduce((s, l) => s + (l.lat as number), 0) / mappable.length;
    const lng = mappable.reduce((s, l) => s + (l.lng as number), 0) / mappable.length;
    return { lat, lng };
  }, [mappable]);

  if (!apiKey) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-surface-muted min-h-96 flex items-center justify-center p-8 text-center">
        <div className="max-w-lg">
          <p className="font-heading text-xl font-semibold text-navy">Google Maps not configured</p>
          <p className="mt-3 text-sm text-slate leading-relaxed">
            Add <code className="text-navy">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your{" "}
            <code className="text-navy">.env</code> file, enable the Maps JavaScript API in Google
            Cloud, then restart the dev server.
          </p>
          <ul className="mt-5 text-left space-y-2 text-sm">
            {listings.map((l) => (
              <li key={l.id} className="flex justify-between gap-3 border-b border-border/70 pb-2">
                <Link href={`/rentals/${l.slug}`} className="text-navy hover:underline">
                  {l.address}
                </Link>
                <span className="text-slate">{formatCurrency(l.rent)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 min-h-96 flex items-center justify-center p-8 text-center text-sm text-red-900">
        Google Maps failed to load. Check that the Maps JavaScript API is enabled and the key allows
        this domain (localhost for local demos).
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="rounded-3xl border border-border bg-surface-muted min-h-96 flex items-center justify-center text-sm text-slate">
        Loading map…
      </div>
    );
  }

  if (mappable.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-surface-muted min-h-96 flex items-center justify-center p-8 text-center text-sm text-slate">
        No filtered listings have map coordinates yet. Add latitude/longitude when editing a listing
        (or use Geocode address).
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border overflow-hidden shadow-[var(--shadow-sm)] min-h-96 h-[28rem] md:h-[32rem]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={mappable.length === 1 ? 13 : 10}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {mappable.map((listing) => (
          <MarkerF
            key={listing.id}
            position={{ lat: listing.lat as number, lng: listing.lng as number }}
            title={listing.title}
            onClick={() => setActiveId(listing.id)}
          />
        ))}
        {active ? (
          <InfoWindowF
            position={{ lat: active.lat as number, lng: active.lng as number }}
            onCloseClick={() => setActiveId(null)}
          >
            <div className="max-w-[220px] p-1">
              <p className="font-semibold text-sm text-navy">{active.title}</p>
              <p className="text-xs text-slate mt-1">
                {active.address}, {active.city}
              </p>
              <p className="text-sm font-medium mt-1">{formatCurrency(active.rent)}/mo</p>
              <Link
                href={`/rentals/${active.slug}`}
                className="inline-block mt-2 text-xs font-semibold text-champagne hover:underline"
              >
                View details →
              </Link>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </div>
  );
}
