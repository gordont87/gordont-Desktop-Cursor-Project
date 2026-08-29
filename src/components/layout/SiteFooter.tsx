import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white mt-auto">
      <div className="container-wide section-pad pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-bold">{siteConfig.brand.shortName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-champagne">
              Property Management
            </p>
            <p className="mt-4 max-w-sm text-white/70 leading-relaxed text-sm">
              {siteConfig.brand.tagline} Professional management for owners, investors, and
              residents.
            </p>
            <div className="mt-5 space-y-1 text-sm text-white/75">
              <p>
                <a href={siteConfig.contact.phoneHref} className="hover:text-champagne">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-champagne">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="pt-2 text-white/55 text-xs">
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                {siteConfig.contact.address.zip}
                <br />
                <span className="placeholder-chip mt-2">Placeholder address</span>
              </p>
            </div>
          </div>

          {(
            [
              ["Owners", footerNav.owners],
              ["Tenants", footerNav.tenants],
              ["Company", footerNav.company],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="font-heading font-semibold text-champagne-soft mb-3">{title}</p>
              <ul className="space-y-2 text-sm text-white/70">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-[11px] text-white/40 max-w-3xl leading-relaxed">
          We are committed to Fair Housing. We do not discriminate based on race, color, religion,
          sex, disability, familial status, national origin, or any other protected characteristic.
        </p>
      </div>
    </footer>
  );
}
