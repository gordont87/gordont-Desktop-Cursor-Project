import { OwnerListingsTable } from "@/components/portal/OwnerListingsManager";
import { requireOwner } from "@/lib/auth";
import { getListingsForOwner } from "@/lib/listings";
import { redirect } from "next/navigation";

export const metadata = { title: "Rental Listings" };

export default async function OwnerListingsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const listings = await getListingsForOwner(auth.owner.id);

  return (
    <OwnerListingsTable
      listings={listings.map((l) => ({
        id: l.id,
        slug: l.slug,
        title: l.title,
        city: l.city,
        rent: l.rent,
        status: l.status,
        available: l.available,
      }))}
    />
  );
}
