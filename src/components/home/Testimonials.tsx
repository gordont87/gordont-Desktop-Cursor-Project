"use client";

import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "I finally feel like my rentals are professionally run. Reporting is clear and vacancies don’t linger.",
    name: "Jordan M.",
    role: "Owner · 4 doors",
    type: "Owner",
  },
  {
    quote:
      "Maintenance requests were easy to submit and follow. Communication made the whole experience smoother.",
    name: "Priya S.",
    role: "Resident",
    type: "Tenant",
  },
  {
    quote:
      "The leasing process was organized and respectful. I’d recommend them to other investors in the area.",
    name: "Alex R.",
    role: "Investor",
    type: "Owner",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  return (
    <Section muted id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What owners and residents are saying"
          description="Sample reviews for layout only. Connect Google Reviews or verified testimonials before launch."
          align="center"
        />
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="card-surface p-8 md:p-10 text-center"
            >
              <Quote className="size-8 text-champagne mx-auto mb-4" />
              <p className="font-heading text-xl md:text-2xl text-navy leading-snug">
                “{item.quote}”
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-navy">{item.name}</p>
                <p className="text-sm text-slate">{item.role}</p>
                <span className="placeholder-chip mt-3">Sample review</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="size-10 rounded-full border border-border bg-white hover:border-champagne inline-flex items-center justify-center"
              onClick={() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "size-2.5 rounded-full transition-colors",
                    i === index ? "bg-navy" : "bg-border",
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              className="size-10 rounded-full border border-border bg-white hover:border-champagne inline-flex items-center justify-center"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
