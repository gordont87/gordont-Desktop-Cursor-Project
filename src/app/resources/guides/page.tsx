import { GuidesDownloadGrid } from "@/components/resources/GuidesDownloadGrid";
import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landlord Guides",
  description: "Downloadable landlord guides with demo email gate.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Landlord guides"
        description="Demo email gate — submissions are not stored. Connect marketing automation before launch."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Downloadable guides" />
            <GuidesDownloadGrid />
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
