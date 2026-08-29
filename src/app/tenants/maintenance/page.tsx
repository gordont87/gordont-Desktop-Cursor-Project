import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { MaintenanceForm } from "@/components/tenants/MaintenanceForm";
import { Container, Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance Request",
  description: "Submit a non-emergency maintenance request online.",
};

export default function TenantMaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="Maintenance request"
        description="For non-emergency repairs. For gas leaks, flooding, or no heat/AC, call the emergency line in your lease."
      />
      <ContentPage>
        <Section>
          <Container className="max-w-xl">
            <MaintenanceForm />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
