import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn(wide ? "container-wide" : "container-site", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("section-pad", muted && "bg-surface-muted grain", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-10 md:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-champagne mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl md:text-4xl font-semibold leading-tight">{title}</h2>
      {description ? (
        <p className="mt-4 text-slate text-base md:text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}

export function PlaceholderBanner({
  children = "Placeholder content — replace with verified company data before launch.",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950",
        className,
      )}
      role="note"
    >
      <span className="placeholder-chip mr-2">Placeholder</span>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("card-surface p-6", className)}>{children}</div>;
}
