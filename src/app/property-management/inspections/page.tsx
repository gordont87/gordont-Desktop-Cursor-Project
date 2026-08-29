import { ServicePageLayout } from "@/components/property-management/ServicePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Inspections",
  description: "Move-in, move-out, routine, and seasonal property inspections with photo documentation.",
};

export default function InspectionsPage() {
  return (
    <ServicePageLayout
      title="Property inspections"
      description="Documented inspections reduce disputes, catch maintenance early, and support insurance claims."
      cards={[
        {
          title: "Move-in / move-out",
          body: "Detailed condition reports with timestamped photos for security deposit compliance.",
        },
        {
          title: "Routine inspections",
          body: "Scheduled interior and exterior checks per your management agreement.",
        },
        {
          title: "Drive-by & seasonal",
          body: "Exterior reviews for landscaping, roof visibility, and seasonal prep (demo workflow).",
        },
        {
          title: "Owner reporting",
          body: "Inspection summaries delivered to your portal with recommended follow-up items.",
        },
      ]}
    />
  );
}
