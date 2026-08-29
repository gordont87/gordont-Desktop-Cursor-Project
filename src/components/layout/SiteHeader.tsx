"use client";

import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-white/95 backdrop-blur-md shadow-[var(--shadow-sm)]"
          : "border-transparent bg-white",
      )}
    >
      <div className="container-wide flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 group" onClick={() => setOpen(false)}>
          <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-navy">
            {siteConfig.brand.shortName}
          </span>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-slate group-hover:text-champagne transition-colors">
            Property Management
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5" aria-label="Primary">
          {mainNav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-charcoal/90 hover:text-navy hover:bg-surface-muted"
              >
                {item.label}
                {item.children ? <ChevronDown className="size-3.5 opacity-60" /> : null}
              </Link>
              {item.children && active === item.label ? (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-64 rounded-2xl border border-border bg-white p-2 shadow-[var(--shadow)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-champagne-muted/50 hover:text-navy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-navy mr-1"
          >
            <Phone className="size-3.5" />
            {siteConfig.contact.phone}
          </a>
          <Button href={siteConfig.portals.ownerLoginUrl} variant="outline" size="sm">
            Owner Login
          </Button>
          <Button href={siteConfig.portals.tenantLoginUrl} variant="secondary" size="sm">
            Tenant Login
          </Button>
          <Button href={siteConfig.ctas.primary.href} variant="champagne" size="sm">
            Free Analysis
          </Button>
        </div>

        <button
          type="button"
          className="xl:hidden inline-flex size-10 items-center justify-center rounded-xl border border-border"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="xl:hidden border-t border-border bg-white max-h-[calc(100dvh-var(--header-h))] overflow-y-auto">
          <div className="container-wide py-4 space-y-1 pb-8">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-border/70 pb-2 mb-2">
                <Link
                  href={item.href}
                  className="block py-2 font-semibold text-navy"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="grid gap-1 pl-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-slate hover:text-navy"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="grid gap-2 pt-2">
              <Button href={siteConfig.portals.ownerLoginUrl} variant="outline">
                Owner Login
              </Button>
              <Button href={siteConfig.portals.tenantLoginUrl} variant="secondary">
                Tenant Login
              </Button>
              <Button href={siteConfig.ctas.primary.href} variant="champagne">
                {siteConfig.ctas.primary.label}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
