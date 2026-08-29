/**
 * PLACEHOLDER COMPANY CONFIG
 * Replace all values marked PLACEHOLDER with real company data before launch.
 */

export const siteConfig = {
  brand: {
    name: "T & T Gordon Property Management",
    shortName: "T & T Gordon",
    tagline: "Better Property Management. Better Returns. Less Stress.",
    /** PLACEHOLDER — replace with legal entity name */
    legalName: "T & T Gordon Property Management, LLC (PLACEHOLDER)",
    isPlaceholder: true,
  },
  contact: {
    /** PLACEHOLDER */
    phone: "(555) 010-2400",
    phoneHref: "tel:+15550102400",
    email: "hello@tandtgordon.example",
    /** PLACEHOLDER address */
    address: {
      street: "100 Market Street, Suite 400",
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    hours: "Mon–Fri 9:00 AM – 6:00 PM",
  },
  portals: {
    /** Custom portals */
    ownerLoginUrl: "/owners/portal/login",
    tenantLoginUrl: "/tenants/portal/login",
    payRentUrl: "/tenants/portal/pay-rent",
  },
  /** Editable trust metrics — do not present as verified until confirmed */
  stats: [
    { id: "occupancy", label: "Occupancy Rate", value: "98%", note: "PLACEHOLDER metric" },
    { id: "rent", label: "Rent Collected On Time", value: "97%", note: "PLACEHOLDER metric" },
    { id: "response", label: "Average Response Time", value: "24 hrs", note: "PLACEHOLDER metric" },
    { id: "properties", label: "Properties Managed", value: "1,000+", note: "PLACEHOLDER metric" },
    { id: "rating", label: "Client Rating", value: "4.9★", note: "PLACEHOLDER metric" },
  ],
  serviceAreas: [
    { slug: "alabama", name: "Alabama", state: "AL" },
    { slug: "georgia", name: "Georgia", state: "GA" },
  ],
  social: {
    /** PLACEHOLDER */
    googleReviewsUrl: "#google-reviews-placeholder",
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  ctas: {
    primary: { label: "Get My Free Rental Analysis", href: "/owners/rental-analysis" },
    secondary: { label: "Schedule a Consultation", href: "/contact" },
    tenant: { label: "Find Your Next Home", href: "/rentals" },
  },
} as const;

export type SiteConfig = typeof siteConfig;
