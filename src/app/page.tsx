import { AreasWeServe } from "@/components/home/AreasWeServe";
import { BeforeAfterStory } from "@/components/home/BeforeAfterStory";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TechnologySection } from "@/components/home/TechnologySection";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { RentalAnalysisTool } from "@/components/forms/RentalAnalysisTool";
import { PlaceholderBanner } from "@/components/ui/Section";

export default function HomePage() {
  return (
    <div className="pb-[calc(var(--mobile-cta-h)+0.5rem)] md:pb-0">
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container-wide py-2.5">
          <PlaceholderBanner className="border-0 bg-transparent p-0">
            Brand name, metrics, reviews, and service cities are placeholders for T & T Gordon
            Property Management until real company data is supplied.
          </PlaceholderBanner>
        </div>
      </div>
      <HomeHero />
      <TrustBar />
      <WhyChooseUs />
      <RentalAnalysisTool source="homepage" />
      <HowItWorks />
      <TechnologySection />
      <BeforeAfterStory />
      <Testimonials />
      <AreasWeServe />
      <FinalCta />
    </div>
  );
}
