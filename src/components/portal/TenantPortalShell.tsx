"use client";

import { logoutTenant } from "@/app/actions/tenant-auth";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/tenants/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/tenants/portal/lease", label: "My Lease", icon: Home },
  { href: "/tenants/portal/pay-rent", label: "Pay Rent", icon: Wallet },
  { href: "/tenants/portal/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/tenants/portal/documents", label: "Documents", icon: FileText },
  { href: "/tenants/portal/resources", label: "Resources", icon: ClipboardList },
  { href: "/tenants/portal/settings", label: "Settings", icon: Settings },
];

export function TenantPortalShell({
  tenantName,
  children,
}: {
  tenantName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string, exact?: boolean) => {
    const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
    return cn(
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
      active ? "bg-champagne-muted text-navy" : "text-white/75 hover:bg-white/10 hover:text-white",
    );
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/tenants/portal" className="block" onClick={() => setOpen(false)}>
          <p className="font-heading text-lg font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-champagne">Tenant Portal</p>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1" aria-label="Tenant portal">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href, item.exact)}
              onClick={() => setOpen(false)}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-3">
        <p className="text-xs text-white/55 truncate">{tenantName}</p>
        <form action={logoutTenant}>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </form>
        <Link href="/" className="block text-center text-xs text-champagne hover:underline">
          Back to website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-surface-muted flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-navy-deep">{sidebar}</aside>

      {open ? (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[85%] bg-navy-deep shadow-xl">{sidebar}</div>
          <button
            type="button"
            className="flex-1 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-border px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            className="size-10 rounded-xl border border-border inline-flex items-center justify-center"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <p className="font-heading font-semibold text-navy text-sm">Tenant Portal</p>
          <span className="w-10" />
        </header>
        <main id="main" className="flex-1 p-4 md:p-8">
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-950">
            Functional demo portal — rent payments are recorded in-app; connect Stripe (or similar)
            before taking real payments.
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
