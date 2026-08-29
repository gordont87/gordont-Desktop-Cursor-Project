import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { RentalsExplorer } from "@/components/rentals/RentalsExplorer";
import { getPublicListings } from "@/lib/listings";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Rentals",
  description:
    "Browse rental listings from T & T Gordon Property Management. Fair Housing compliant search with list and map views.",
};

type PageProps = {
  searchParams: Promise<{ view?: string }>;
};

export default async function RentalsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialView = params.view === "map" ? "map" : "list";
  const listings = await getPublicListings();

  return (
    <>
      <PageHero
        eyebrow="Available Rentals"
        title="Find your next home"
        description="Search our current inventory. Listings are managed in the owner portal and update here automatically."
      />
      <ContentPage showPlaceholder={false}>
        <RentalsExplorer listings={listings} initialView={initialView} />
      </ContentPage>
    </>
  );
}
