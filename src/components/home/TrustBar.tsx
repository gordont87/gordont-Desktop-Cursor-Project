"use client";

import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";

export function TrustBar() {
  return (
    <section className="bg-navy text-white border-b border-white/10">
      <Container wide className="py-8 md:py-10">
        <p className="text-center text-[11px] uppercase tracking-[0.18em] text-champagne mb-6">
          Performance snapshot · editable placeholders
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {siteConfig.stats.map((stat, i) => (
            <motion.li
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="text-center"
            >
              <p className="font-heading text-2xl md:text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs md:text-sm text-white/65">{stat.label}</p>
              <p className="mt-2 text-[10px] text-champagne/80 uppercase tracking-wider">
                {stat.note}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
