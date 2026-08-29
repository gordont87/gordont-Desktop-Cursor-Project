import { getAllListingSlugs } from "@/lib/listings";
import { getMarketReports } from "@/lib/data/market-reports";
import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

const baseUrl = "https://tandtgordon.example";

const staticRoutes = [
  "",
  "/property-management",
  "/property-management/residential",
  "/property-management/investor-services",
  "/property-management/tenant-placement",
  "/property-management/maintenance",
  "/property-management/inspections",
  "/property-management/pricing",
  "/rentals",
  "/rentals/schedule-showing",
  "/owners",
  "/owners/portal",
  "/owners/rental-analysis",
  "/owners/resources",
  "/owners/pricing",
  "/owners/faqs",
  "/tenants",
  "/tenants/portal",
  "/tenants/pay-rent",
  "/tenants/maintenance",
  "/tenants/resources",
  "/tenants/move-in-out",
  "/tenants/faqs",
  "/investors",
  "/investors/analysis",
  "/investors/roi-calculator",
  "/investors/market-reports",
  "/investors/neighborhoods",
  "/success-stories",
  "/about",
  "/about/team",
  "/about/areas",
  "/about/reviews",
  "/resources",
  "/resources/blog",
  "/resources/guides",
  "/resources/market-reports",
  "/resources/faqs",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/accessibility",
  "/legal/fair-housing",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/rentals") ? 0.9 : 0.7,
  }));

  const slugs = await getAllListingSlugs();
  const listingPages = slugs.map((slug) => ({
    url: `${baseUrl}/rentals/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const areaPages = siteConfig.serviceAreas.map((a) => ({
    url: `${baseUrl}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const reportPages = getMarketReports().map((r) => ({
    url: `${baseUrl}/investors/market-reports/${r.slug}`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...listingPages, ...areaPages, ...reportPages];
}
