import { ListingEditorForm } from "@/components/portal/OwnerListingsManager";
import { requireOwner } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Add Listing" };

export default async function NewListingPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  return (
    <div className="space-y-6">
      <div>
        <Link href="/owners/portal/listings" className="text-sm text-champagne hover:underline">
          ← Listings
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-navy">Add rental listing</h1>
        <p className="mt-2 text-sm text-slate">
          New Available/Pending listings appear immediately on Property Search.
        </p>
      </div>
      <ListingEditorForm mode="create" />
    </div>
  );
}
