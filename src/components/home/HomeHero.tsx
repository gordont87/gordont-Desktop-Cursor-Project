"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=2400&q=80"
        alt="Premium residential neighborhood — placeholder hero photography"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative container-wide pb-16 md:pb-24 pt-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-heading text-champagne text-sm md:text-base font-semibold tracking-[0.14em] uppercase mb-4">
            {siteConfig.brand.name}
          </p>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08]">
            {siteConfig.brand.tagline}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            We help property owners maximize rental income, protect their investments, and enjoy
            truly hands-off property ownership.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.ctas.primary.href} variant="champagne" size="lg">
              {siteConfig.ctas.primary.label}
            </Button>
            <Button href={siteConfig.ctas.tenant.href} variant="ghost" size="lg">
              Find a Rental
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            <Link href="/owners/portal" className="underline-offset-4 hover:underline hover:text-white">
              Owner Portal
            </Link>
            <Link href="/tenants/portal" className="underline-offset-4 hover:underline hover:text-white">
              Tenant Portal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
