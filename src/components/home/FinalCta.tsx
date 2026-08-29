import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(196,165,116,0.35), transparent 50%), radial-gradient(ellipse at 90% 20%, rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      <Container className="relative section-pad text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white leading-tight">
          Ready to Get More From Your Rental Property?
        </h2>
        <p className="mt-4 text-white/75 max-w-xl mx-auto">
          Start with a free rental analysis or schedule a consultation with our team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={siteConfig.ctas.primary.href} variant="champagne" size="lg">
            Get a Free Rental Analysis
          </Button>
          <Button href={siteConfig.ctas.secondary.href} variant="ghost" size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
