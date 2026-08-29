import { prisma } from "@/lib/db";
import { toPropertyListing, type PropertyListing } from "@/lib/data/listings";

const publicStatuses = ["Available", "Pending"] as const;

export async function getPublicListings(): Promise<PropertyListing[]> {
  const rows = await prisma.rentalListing.findMany({
    where: { status: { in: [...publicStatuses] } },
    orderBy: [{ status: "asc" }, { rent: "asc" }],
  });
  return rows.map(toPropertyListing);
}

export async function getListingBySlug(slug: string): Promise<PropertyListing | null> {
  const row = await prisma.rentalListing.findFirst({
    where: {
      slug,
      status: { in: [...publicStatuses] },
    },
  });
  return row ? toPropertyListing(row) : null;
}

export async function getAllListingSlugs(): Promise<string[]> {
  const rows = await prisma.rentalListing.findMany({
    where: { status: { in: [...publicStatuses] } },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getListingsForOwner(ownerId: string) {
  return prisma.rentalListing.findMany({
    where: { ownerId },
    orderBy: { updatedAt: "desc" },
  });
}
