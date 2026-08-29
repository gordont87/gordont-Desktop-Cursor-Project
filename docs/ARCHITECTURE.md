# T & T Gordon Property Management — Website Architecture

> **PLACEHOLDER BRAND:** "T & T Gordon Property Management" and all company-specific stats, addresses, team members, and reviews are placeholder content pending real company data.

## Recommended Technology Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router)** | SEO, SSR/SSG, performance, route-based pages |
| Language | **TypeScript** | Safety for forms, calculators, integrations |
| Styling | **Tailwind CSS 4** | Consistent design tokens, fast iteration |
| Motion | **Framer Motion** | Tasteful micro-animations |
| Icons | **Lucide React** | Clean, accessible icon set |
| Hosting (recommended) | **Railway** (web + Postgres) or **Vercel** + managed Postgres | Railway matches this repo’s standalone Next + Prisma migrate deploy setup |
| Database | **PostgreSQL** (Prisma 7 + `@prisma/adapter-pg`) | Required for portals/listings on Railway; local via `docker compose` |
| Forms (planned) | Resend / HubSpot / CRM webhook | Lead capture — needs API keys |
| CMS (optional later) | Sanity or Contentful | Blog, neighborhood guides, case studies |
| Maps | **Google Maps** (`@react-google-maps/api`) | Rentals Map View — set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Maps JavaScript API). Optional `GOOGLE_MAPS_API_KEY` for owner-portal Geocoding API |
| Analytics (planned) | GA4 + Google Business Profile | Needs measurement IDs |
| PMS integrations (planned) | AppFolio / Buildium / Rent Manager / Propertyware | Listing feeds, portals, payments — needs vendor credentials |

**Do not treat portal logins, payments, or listing sync as live** until third-party credentials are configured. UI shows clearly labeled demo/preview states.

## Site Architecture & Navigation

```
HOME
├── PROPERTY MANAGEMENT
│   ├── Residential Property Management
│   ├── Investor Services
│   ├── Tenant Placement
│   ├── Maintenance Management
│   ├── Property Inspections
│   └── Pricing
├── AVAILABLE RENTALS
│   ├── Property Search (list/map)
│   ├── Listing Detail
│   └── Schedule a Showing
├── OWNERS
│   ├── Owner Portal (preview + external login placeholder)
│   ├── Free Rental Analysis
│   ├── Owner Resources
│   ├── Management Pricing
│   └── Owner FAQs
├── TENANTS
│   ├── Tenant Portal
│   ├── Pay Rent
│   ├── Maintenance Request
│   ├── Tenant Resources
│   ├── Move-In / Move-Out
│   └── Tenant FAQs
├── INVESTORS
│   ├── Investment Property Analysis
│   ├── ROI Calculator
│   ├── Market Reports
│   └── Neighborhood Guides
├── SUCCESS STORIES
│   ├── Case Studies
│   ├── Before & After
│   └── Testimonials
├── ABOUT
│   ├── Our Company
│   ├── Meet the Team
│   ├── Areas We Serve
│   └── Reviews
├── RESOURCES
│   ├── Blog
│   ├── Landlord Guides
│   ├── Market Reports
│   └── FAQs
└── CONTACT
    └── Schedule a Consultation
```

Global actions: **Owner Login** | **Tenant Login** (link to PMS SSO when configured)

## Primary User Journeys

### 1. Property Owner → Lead
1. Lands on homepage / owner SEO page  
2. Sees trust metrics + value props  
3. Completes **Free Rental Analysis** or **Schedule Consultation**  
4. CRM/email notification (integration pending)  
5. Sales follow-up → owner onboarding → portal access  

### 2. Tenant → Rental
1. Find a Rental → filter/list or map  
2. Listing detail → Schedule Showing / Apply Now  
3. Showing confirmation; application via secure third-party screening (not collected on site forms)  

### 3. Tenant → Self-Service
1. Tenant Portal / Pay Rent / Maintenance  
2. Authenticated PMS experience (external) or demo UI with clear disclaimer  

### 4. Investor → Research
1. Investors hub → ROI calculator / market insights / neighborhood guides  
2. CTA to rental analysis or consultation  

## Component Library

- **Layout:** `SiteHeader`, `SiteFooter`, `MobileCtaBar`, `PageHero`, `Section`, `Container`
- **UI:** `Button`, `Card`, `Badge`, `Input`, `Select`, `Textarea`, `PlaceholderBanner`, `Stat`, `Accordion`
- **Marketing:** `TrustBar`, `FeatureGrid`, `ProcessSteps`, `TestimonialCarousel`, `BeforeAfter`, `FinalCta`
- **Tools:** `RentalAnalysisForm`, `RoiCalculator`, `MaintenanceForm`, `PropertyFilters`, `PropertyCard`
- **Assist:** `AiAssistant` (constrained; no invented policies/pricing)

## Homepage Wireframe (top → bottom)

1. Sticky header (logo, nav, Owner/Tenant login)  
2. Full-bleed hero (headline, subcopy, dual CTAs, portal links)  
3. Editable trust/stats bar  
4. Why Choose Us (6 feature cards)  
5. Free Rental Analysis lead tool  
6. How It Works (6 interactive steps)  
7. Technology / owner dashboard mock (demo data)  
8. Before/After success story (illustrative)  
9. Testimonials carousel  
10. Areas We Serve (map placeholder + city links)  
11. Final CTA band  
12. Footer + sticky mobile CTA  

## Conversion Strategy

| Priority | CTA |
| --- | --- |
| Primary | Get My Free Rental Analysis |
| Secondary | Schedule a Consultation |
| Tenant | Find Your Next Home |

Progressive profiling: short forms first; expand fields after intent is shown.

## SEO & Compliance Notes

- Local landing pages per city under `/areas/[city]`
- Semantic HTML, metadata, sitemap, schema hooks
- Fair Housing statement; no protected-characteristic filters
- Privacy, Terms, Accessibility, Cookie controls
- Never collect SSN/bank data on marketing forms
