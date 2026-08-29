import { PlaceholderBanner } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative bg-navy text-white overflow-hidden", className)}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(196,165,116,0.35), transparent 45%)",
        }}
      />
      <div className="container-site py-14 md:py-20 relative">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-champagne mb-3">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-3xl md:text-5xl font-semibold !text-white max-w-3xl leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 !text-white/75 max-w-2xl text-base md:text-lg leading-relaxed">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  );
}

export function ContentPage({
  children,
  showPlaceholder = true,
}: {
  children: ReactNode;
  showPlaceholder?: boolean;
}) {
  return (
    <div className="pb-[calc(var(--mobile-cta-h)+1rem)] md:pb-0">
      {showPlaceholder ? (
        <div className="container-site pt-6">
          <PlaceholderBanner />
        </div>
      ) : null}
      {children}
    </div>
  );
}
