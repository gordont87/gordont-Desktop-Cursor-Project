"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type ShowingActionState = {
  error?: string;
  success?: string;
};

export async function submitShowingRequest(
  _prev: ShowingActionState,
  formData: FormData,
): Promise<ShowingActionState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const propertySlug = String(formData.get("property") || "").trim();
  const preferredTimes = String(formData.get("times") || "").trim() || null;

  if (!name || !email || !phone || !propertySlug) {
    return { error: "Please fill in name, email, phone, and property." };
  }
  if (!email.includes("@")) {
    return { error: "Enter a valid email address." };
  }

  const listing = await prisma.rentalListing.findFirst({
    where: {
      slug: propertySlug,
      status: { in: ["Available", "Pending"] },
    },
  });

  if (!listing) {
    return { error: "That property is no longer available. Pick another listing." };
  }

  await prisma.showingRequest.create({
    data: {
      listingId: listing.id,
      listingSlug: listing.slug,
      listingTitle: listing.title,
      name,
      email,
      phone,
      preferredTimes,
      status: "New",
    },
  });

  revalidatePath("/owners/portal/showings");
  revalidatePath("/owners/portal");

  return {
    success:
      "Your showing request was submitted. A team member will confirm appointment details by email or phone.",
  };
}

export async function updateShowingRequestStatus(formData: FormData) {
  const auth = await requireOwner();
  if (!auth) return;

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "").trim();
  const allowed = ["New", "Contacted", "Scheduled", "Completed", "Cancelled"];
  if (!id || !allowed.includes(status)) return;

  const request = await prisma.showingRequest.findFirst({
    where: { id, listing: { ownerId: auth.owner.id } },
  });
  if (!request) return;

  await prisma.showingRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/owners/portal/showings");
  revalidatePath("/owners/portal");
}
