import { ListingEditorForm } from "@/components/portal/OwnerListingsManager";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.rentalListing.findUnique({ where: { id } });
  return { title: listing ? `Edit ${listing.title}` : "Edit listing" };
}

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const { id } = await params;
  const listing = await prisma.rentalListing.findFirst({
    where: { id, ownerId: auth.owner.id },
  });
  if (!listing) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/owners/portal/listings" className="text-sm text-champagne hover:underline">
          ← Listings
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-navy">Edit listing</h1>
        <p className="mt-2 text-sm text-slate">
          Changes to Available/Pending status update public Property Search.
        </p>
      </div>
      <ListingEditorForm mode="edit" listing={listing} />
    </div>
  );
}
