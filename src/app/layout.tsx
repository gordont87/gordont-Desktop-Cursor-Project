import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} | Property Management`,
    template: `%s | ${siteConfig.brand.shortName}`,
  },
  description:
    "Premium property management for owners and residents. Maximize rental income, simplify ownership, and find your next home.",
  metadataBase: new URL("https://tandtgordon.example"),
  openGraph: {
    title: siteConfig.brand.name,
    description: siteConfig.brand.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-charcoal bg-surface">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-3 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
