"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type AnalysisLeadState = {
  error?: string;
  success?: string;
};

export type AnalysisLeadInput = {
  source?: string;
  address: string;
  propertyType: string;
  beds: string;
  baths: string;
  sqft: string;
  currentRent: string;
  estimateLow: number;
  estimateHigh: number;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

export async function submitAnalysisLead(
  input: AnalysisLeadInput,
): Promise<AnalysisLeadState> {
  const address = input.address.trim();
  const propertyType = input.propertyType.trim() || "Single Family";
  const beds = input.beds.trim();
  const baths = input.baths.trim();
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const source = (input.source || "website").trim() || "website";

  if (!address || !beds || !baths || !name || !email || !phone) {
    return { error: "Please complete property details and contact fields." };
  }
  if (!email.includes("@")) {
    return { error: "Enter a valid email address." };
  }
  if (!input.consent) {
    return { error: "Consent is required so we can contact you about the analysis." };
  }

  const sqftRaw = input.sqft.replace(/[^0-9]/g, "");
  const rentRaw = input.currentRent.replace(/[^0-9.]/g, "");
  const sqft = sqftRaw ? Number(sqftRaw) : null;
  const currentRent = rentRaw ? Number(rentRaw) : null;

  await prisma.analysisLead.create({
    data: {
      source,
      address,
      propertyType,
      beds,
      baths,
      sqft: sqft !== null && Number.isFinite(sqft) ? sqft : null,
      currentRent: currentRent !== null && Number.isFinite(currentRent) ? currentRent : null,
      estimateLow: Number.isFinite(input.estimateLow) ? input.estimateLow : null,
      estimateHigh: Number.isFinite(input.estimateHigh) ? input.estimateHigh : null,
      name,
      email,
      phone,
      status: "New",
    },
  });

  revalidatePath("/owners/portal/leads");
  revalidatePath("/owners/portal");

  return {
    success:
      "Your request was saved. Our team will follow up with a personalized rental analysis.",
  };
}

export async function updateAnalysisLeadStatus(formData: FormData) {
  const auth = await requireOwner();
  if (!auth) return;

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "").trim();
  const allowed = ["New", "Contacted", "Qualified", "Closed", "Archived"];
  if (!id || !allowed.includes(status)) return;

  await prisma.analysisLead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/owners/portal/leads");
  revalidatePath("/owners/portal");
}
