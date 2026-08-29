"use client";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Home, Phone, Wrench, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/rentals", label: "Find Rental", icon: Home },
  { href: "/tenants/portal/pay-rent", label: "Pay Rent", icon: Wallet },
  { href: "/tenants/portal/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function MobileCtaBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur-md"
      style={{ height: "var(--mobile-cta-h)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-full grid-cols-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href === "/contact" ? siteConfig.contact.phoneHref : item.href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                  active ? "text-navy" : "text-slate",
                )}
              >
                <Icon className={cn("size-5", active && "text-champagne")} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
