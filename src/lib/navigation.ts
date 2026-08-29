export type NavChild = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Residential Property Management", href: "/property-management/residential" },
      { label: "Investor Services", href: "/property-management/investor-services" },
      { label: "Tenant Placement", href: "/property-management/tenant-placement" },
      { label: "Maintenance Management", href: "/property-management/maintenance" },
      { label: "Property Inspections", href: "/property-management/inspections" },
      { label: "Pricing", href: "/property-management/pricing" },
    ],
  },
  {
    label: "Available Rentals",
    href: "/rentals",
    children: [
      { label: "Property Search", href: "/rentals" },
      { label: "Map Search", href: "/rentals?view=map" },
      { label: "Schedule a Showing", href: "/rentals/schedule-showing" },
    ],
  },
  {
    label: "Owners",
    href: "/owners",
    children: [
      { label: "Owner Portal", href: "/owners/portal" },
      { label: "Free Rental Analysis", href: "/owners/rental-analysis" },
      { label: "Owner Resources", href: "/owners/resources" },
      { label: "Management Pricing", href: "/owners/pricing" },
      { label: "Owner FAQs", href: "/owners/faqs" },
    ],
  },
  {
    label: "Tenants",
    href: "/tenants",
    children: [
      { label: "Tenant Portal", href: "/tenants/portal" },
      { label: "Pay Rent", href: "/tenants/pay-rent" },
      { label: "Maintenance Request", href: "/tenants/maintenance" },
      { label: "Tenant Resources", href: "/tenants/resources" },
      { label: "Move-In / Move-Out", href: "/tenants/move-in-out" },
      { label: "Tenant FAQs", href: "/tenants/faqs" },
    ],
  },
  {
    label: "Investors",
    href: "/investors",
    children: [
      { label: "Investment Property Analysis", href: "/investors/analysis" },
      { label: "ROI Calculator", href: "/investors/roi-calculator" },
      { label: "Market Reports", href: "/investors/market-reports" },
      { label: "Neighborhood Guides", href: "/investors/neighborhoods" },
    ],
  },
  {
    label: "Success Stories",
    href: "/success-stories",
    children: [
      { label: "Case Studies", href: "/success-stories" },
      { label: "Before & After", href: "/success-stories#before-after" },
      { label: "Client Testimonials", href: "/success-stories#testimonials" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Company", href: "/about" },
      { label: "Meet the Team", href: "/about/team" },
      { label: "Areas We Serve", href: "/about/areas" },
      { label: "Reviews", href: "/about/reviews" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Landlord Guides", href: "/resources/guides" },
      { label: "Market Reports", href: "/resources/market-reports" },
      { label: "FAQs", href: "/resources/faqs" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  owners: [
    { label: "Free Rental Analysis", href: "/owners/rental-analysis" },
    { label: "Management Pricing", href: "/owners/pricing" },
    { label: "Owner Portal", href: "/owners/portal" },
    { label: "Owner FAQs", href: "/owners/faqs" },
  ],
  tenants: [
    { label: "Find a Rental", href: "/rentals" },
    { label: "Pay Rent", href: "/tenants/pay-rent" },
    { label: "Maintenance", href: "/tenants/maintenance" },
    { label: "Tenant Portal", href: "/tenants/portal" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Areas We Serve", href: "/about/areas" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
    { label: "Accessibility", href: "/legal/accessibility" },
    { label: "Fair Housing", href: "/legal/fair-housing" },
  ],
};
