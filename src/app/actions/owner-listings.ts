"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { slugifyTitle } from "@/lib/data/listings";
import { prisma } from "@/lib/db";

export type ListingActionState = {
  error?: string;
  success?: string;
};

function parseListingForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const state = String(formData.get("state") || "").trim().toUpperCase();
  const zip = String(formData.get("zip") || "").trim();
  const rent = Number(formData.get("rent") || 0);
  const beds = Number(formData.get("beds") || 0);
  const baths = Number(formData.get("baths") || 0);
  const sqft = Number(formData.get("sqft") || 0);
  const type = String(formData.get("type") || "Single Family");
  const pets = String(formData.get("pets") || "").trim() || "Contact for pet policy";
  const garage = formData.get("garage") === "on" || formData.get("garage") === "true";
  const pool = formData.get("pool") === "on" || formData.get("pool") === "true";
  const available = String(formData.get("available") || "Now").trim() || "Now";
  const amenitiesRaw = String(formData.get("amenities") || "");
  const amenities = amenitiesRaw
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const imageUrl =
    String(formData.get("imageUrl") || "").trim() ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
  const virtualTourUrl = String(formData.get("virtualTourUrl") || "").trim() || null;
  const status = String(formData.get("status") || "Available");
  const description = String(formData.get("description") || "").trim() || null;
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugifyTitle(slugInput || title);
  const latRaw = String(formData.get("lat") || "").trim();
  const lngRaw = String(formData.get("lng") || "").trim();
  const lat = latRaw ? Number(latRaw) : null;
  const lng = lngRaw ? Number(lngRaw) : null;

  return {
    title,
    address,
    city,
    state,
    zip,
    rent,
    beds,
    baths,
    sqft,
    type,
    pets,
    garage,
    pool,
    available,
    amenities,
    imageUrl,
    virtualTourUrl,
    status,
    description,
    slug,
    lat: lat !== null && Number.isFinite(lat) ? lat : null,
    lng: lng !== null && Number.isFinite(lng) ? lng : null,
  };
}

function validateListing(data: ReturnType<typeof parseListingForm>) {
  if (!data.title || !data.address || !data.city || !data.state || !data.zip) {
    return "Title, address, city, state, and ZIP are required.";
  }
  if (!data.slug) return "Could not create a URL slug from the title.";
  if (!Number.isFinite(data.rent) || data.rent <= 0) return "Enter a valid rent amount.";
  if (!Number.isFinite(data.beds) || data.beds < 0) return "Enter a valid bedroom count.";
  if (!Number.isFinite(data.baths) || data.baths < 0) return "Enter a valid bathroom count.";
  if (!Number.isFinite(data.sqft) || data.sqft <= 0) return "Enter a valid square footage.";
  if (!["Available", "Pending", "Leased", "Hidden"].includes(data.status)) {
    return "Invalid listing status.";
  }
  if ((data.lat === null) !== (data.lng === null)) {
    return "Provide both latitude and longitude, or leave both blank.";
  }
  return null;
}

function revalidateListings(slug?: string) {
  revalidatePath("/rentals");
  revalidatePath("/owners/portal/listings");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/rentals/${slug}`);
    revalidatePath(`/owners/portal/listings/${slug}`);
  }
}

export async function createRentalListing(
  _prev: ListingActionState,
  formData: FormData,
): Promise<ListingActionState> {
  const auth = await requireOwner();
  if (!auth) return { error: "Please sign in again." };

  const data = parseListingForm(formData);
  const error = validateListing(data);
  if (error) return { error };

  const existing = await prisma.rentalListing.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return { error: "That URL slug is already used. Change the title or slug." };
  }

  try {
    await prisma.rentalListing.create({
      data: {
        ownerId: auth.owner.id,
        slug: data.slug,
        title: data.title,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        rent: data.rent,
        beds: data.beds,
        baths: data.baths,
        sqft: data.sqft,
        type: data.type,
        pets: data.pets,
        garage: data.garage,
        pool: data.pool,
        available: data.available,
        amenitiesJson: JSON.stringify(data.amenities),
        imageUrl: data.imageUrl,
        virtualTourUrl: data.virtualTourUrl,
        lat: data.lat,
        lng: data.lng,
        status: data.status,
        description: data.description,
      },
    });
  } catch (e) {
    console.error(e);
    return { error: "Could not create listing." };
  }

  revalidateListings(data.slug);
  redirect("/owners/portal/listings");
}

export async function updateRentalListing(
  _prev: ListingActionState,
  formData: FormData,
): Promise<ListingActionState> {
  const auth = await requireOwner();
  if (!auth) return { error: "Please sign in again." };

  const id = String(formData.get("id") || "");
  if (!id) return { error: "Missing listing id." };

  const existing = await prisma.rentalListing.findFirst({
    where: { id, ownerId: auth.owner.id },
  });
  if (!existing) return { error: "Listing not found." };

  const data = parseListingForm(formData);
  const error = validateListing(data);
  if (error) return { error };

  const slugTaken = await prisma.rentalListing.findFirst({
    where: { slug: data.slug, NOT: { id } },
  });
  if (slugTaken) {
    return { error: "That URL slug is already used by another listing." };
  }

  try {
    await prisma.rentalListing.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        rent: data.rent,
        beds: data.beds,
        baths: data.baths,
        sqft: data.sqft,
        type: data.type,
        pets: data.pets,
        garage: data.garage,
        pool: data.pool,
        available: data.available,
        amenitiesJson: JSON.stringify(data.amenities),
        imageUrl: data.imageUrl,
        virtualTourUrl: data.virtualTourUrl,
        lat: data.lat,
        lng: data.lng,
        status: data.status,
        description: data.description,
      },
    });
  } catch (e) {
    console.error(e);
    return { error: "Could not update listing." };
  }

  revalidateListings(data.slug);
  revalidateListings(existing.slug);
  return { success: "Listing updated. Public search will show Available/Pending listings." };
}

export async function deleteRentalListing(formData: FormData) {
  const auth = await requireOwner();
  if (!auth) return;

  const id = String(formData.get("id") || "");
  const listing = await prisma.rentalListing.findFirst({
    where: { id, ownerId: auth.owner.id },
  });
  if (!listing) return;

  await prisma.rentalListing.delete({ where: { id } });
  revalidateListings(listing.slug);
  redirect("/owners/portal/listings");
}

export type GeocodeState = {
  error?: string;
  lat?: number;
  lng?: number;
  success?: string;
};

export async function geocodeListingAddress(
  _prev: GeocodeState,
  formData: FormData,
): Promise<GeocodeState> {
  const auth = await requireOwner();
  if (!auth) return { error: "Please sign in again." };

  const address = String(formData.get("address") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const state = String(formData.get("state") || "").trim();
  const zip = String(formData.get("zip") || "").trim();
  const query = [address, city, state, zip].filter(Boolean).join(", ");

  if (!query) {
    return { error: "Enter an address first." };
  }

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  if (!apiKey) {
    return {
      error:
        "Add GOOGLE_MAPS_API_KEY or NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env (Geocoding API enabled).",
    };
  }

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", query);
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString());
    const data = (await res.json()) as {
      status: string;
      error_message?: string;
      results?: { geometry: { location: { lat: number; lng: number } } }[];
    };

    if (data.status !== "OK" || !data.results?.[0]) {
      return {
        error: data.error_message || `Geocoding failed (${data.status}). Check the address.`,
      };
    }

    const { lat, lng } = data.results[0].geometry.location;
    return {
      lat,
      lng,
      success: "Coordinates found — save the listing to keep them.",
    };
  } catch (e) {
    console.error(e);
    return { error: "Could not reach Google Geocoding API." };
  }
}
