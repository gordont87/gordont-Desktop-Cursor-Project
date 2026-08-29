"use client";

import { logoutOwner } from "@/app/actions/auth";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  Settings,
  Users,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/owners/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/owners/portal/properties", label: "Properties", icon: Home },
  { href: "/owners/portal/listings", label: "Listings", icon: Building2 },
  { href: "/owners/portal/showings", label: "Showings", icon: CalendarDays },
  { href: "/owners/portal/leads", label: "Analysis leads", icon: Inbox },
  { href: "/owners/portal/tenants", label: "Tenants", icon: Users },
  { href: "/owners/portal/financials", label: "Financials", icon: Receipt },
  { href: "/owners/portal/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/owners/portal/documents", label: "Documents", icon: FileText },
  { href: "/owners/portal/statements", label: "Statements", icon: ClipboardList },
  { href: "/owners/portal/settings", label: "Settings", icon: Settings },
];

export function PortalShell({
  ownerName,
  children,
}: {
  ownerName: string;
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
        <Link href="/owners/portal" className="block" onClick={() => setOpen(false)}>
          <p className="font-heading text-lg font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-champagne">Owner Portal</p>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1" aria-label="Owner portal">
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
        <p className="text-xs text-white/55 truncate">{ownerName}</p>
        <form action={logoutOwner}>
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
          <p className="font-heading font-semibold text-navy text-sm">Owner Portal</p>
          <span className="w-10" />
        </header>
        <main id="main" className="flex-1 p-4 md:p-8">
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-950">
            Demo owner data — replace with production records as you onboard real owners.
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
