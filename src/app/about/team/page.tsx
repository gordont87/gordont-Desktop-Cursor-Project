import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Placeholder team profiles for T & T Gordon Property Management.",
};

const team = [
  { name: "Alex Morgan", role: "Managing Broker (PLACEHOLDER)", bio: "Demo bio — replace with real leadership background." },
  { name: "Jordan Lee", role: "Director of Operations (PLACEHOLDER)", bio: "Demo bio — maintenance and resident experience." },
  { name: "Sam Rivera", role: "Leasing Director (PLACEHOLDER)", bio: "Demo bio — marketing and Fair Housing compliant screening." },
  { name: "Taylor Kim", role: "Owner Relations (PLACEHOLDER)", bio: "Demo bio — investor reporting and onboarding." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet the team"
        description="Placeholder team cards — swap photos and bios with verified staff profiles."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Leadership & staff" align="center" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card key={member.name} className="text-center">
                  <div className="mx-auto size-24 rounded-full bg-surface-muted border border-dashed border-border flex items-center justify-center text-xs text-slate">
                    Photo
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-navy">{member.name}</h2>
                  <p className="text-xs text-champagne mt-1">{member.role}</p>
                  <p className="mt-3 text-sm text-slate">{member.bio}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
