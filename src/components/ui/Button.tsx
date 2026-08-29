import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "champagne" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-soft shadow-[var(--shadow-sm)] border border-transparent",
  secondary:
    "bg-white text-navy border border-border hover:border-champagne hover:text-navy-soft",
  ghost: "bg-transparent text-white/95 hover:bg-white/10 border border-white/30",
  champagne:
    "bg-champagne text-navy hover:bg-champagne-soft border border-transparent font-semibold",
  outline:
    "bg-transparent text-navy border border-navy/20 hover:border-champagne hover:bg-champagne-muted/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; target?: string; rel?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
