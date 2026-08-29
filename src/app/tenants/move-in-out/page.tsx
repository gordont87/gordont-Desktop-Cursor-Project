import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Move-In / Move-Out",
  description: "Checklists for moving into or out of your rental home.",
};

const moveIn = [
  "Schedule key pickup or lockbox access per your welcome email",
  "Document existing condition with photos within 48 hours of move-in",
  "Set up utilities if required by your lease",
  "Confirm renter's insurance is active and sent to the office",
  "Test smoke detectors and locate water shut-off valves",
  "Register vehicles and review parking assignments",
];

const moveOut = [
  "Provide written notice per your lease terms",
  "Schedule pre-move-out walkthrough if offered",
  "Clean thoroughly including appliances and floors",
  "Repair damage beyond normal wear and tear",
  "Remove all personal belongings and trash",
  "Return keys, fobs, and parking passes on move-out day",
  "Forward mailing address for deposit disposition",
];

export default function MoveInOutPage() {
  return (
    <>
      <PageHero
        eyebrow="Residents"
        title="Move-in & move-out checklists"
        description="Use these demo checklists as a starting point — always follow your signed lease."
      />
      <ContentPage>
        <Section>
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <SectionHeading title="Move-in checklist" />
                <ul className="space-y-2 text-sm text-charcoal">
                  {moveIn.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-champagne">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <SectionHeading title="Move-out checklist" />
                <ul className="space-y-2 text-sm text-charcoal">
                  {moveOut.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-champagne">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
