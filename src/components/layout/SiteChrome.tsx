"use client";

import { AiAssistant } from "@/components/assist/AiAssistant";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPortal =
    pathname.startsWith("/owners/portal") || pathname.startsWith("/tenants/portal");

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <AiAssistant />
    </>
  );
}
