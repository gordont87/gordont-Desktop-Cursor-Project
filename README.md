# T & T Gordon Property Management — Demo Site

A **placeholder** property management marketing website built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS v4**. Brand, metrics, listings, and legal copy are demo content until replaced with verified company data.

## Stack

- **Next.js 16.3** — App Router, Server Components (`output: "standalone"` for Railway)
- **React 19**
- **PostgreSQL + Prisma 7** — owner/tenant portals, listings, showings, analysis leads
- **Tailwind CSS 4** — navy (`#0b1f3a`), champagne accents, Montserrat headings
- **Lucide React** — icons
- **Framer Motion** — homepage animations

## Getting started (local)

Ensure Node.js 20+ is available:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

### 1. Start Postgres

```bash
docker compose up -d
```

This matches `.env.example`:

`postgresql://ttgordon:ttgordon@127.0.0.1:5432/ttgordon?schema=public`

### 2. Install, migrate, seed, run

```bash
cp .env.example .env   # if you don't already have .env
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Portal logins

**Owner** — [/owners/portal/login](http://localhost:3000/owners/portal/login)

- Email: `owner@tandtgordon.example`
- Password: `OwnerDemo123!`

**Tenant** — [/tenants/portal/login](http://localhost:3000/tenants/portal/login)

- Email: `tenant@tandtgordon.example`
- Password: `TenantDemo123!`

## Deploy on Railway (demo / staging)

1. Push this repo to GitHub.
2. [Railway](https://railway.app) → **New Project** → **Deploy from GitHub**.
3. **+ New** → **Database** → **PostgreSQL**.
4. On the web service → **Variables**:
   - `DATABASE_URL=${{Postgres.DATABASE_URL}}`
   - `AUTH_SECRET=` (long random string)
   - Optional: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=`
5. **Settings → Deploy → Pre-deploy Command:** `npx prisma migrate deploy`  
   (also set in `railway.toml`)
6. After the first successful deploy, open a Railway shell / one-off and run: `npm run db:seed`
7. **Settings → Networking → Generate Domain**.

Build uses `prisma generate && next build` (standalone). Start command: `npm run start` → `node .next/standalone/server.js`.

Local coding stays on `npm run dev`; push to GitHub to refresh the Railway demo.

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/` | App Router pages (rentals, owners, tenants, investors, legal, etc.) |
| `src/components/` | UI, layout, forms, home sections |
| `src/lib/site-config.ts` | **Placeholder** brand, contact, portals, service areas |
| `src/lib/data/` | Listings seed data, neighborhood guides, market reports |
| `prisma/` | Schema + Postgres migrations |
| `docker-compose.yml` | Local Postgres 16 |
| `railway.toml` | Railway start / pre-deploy hints |

## Placeholder content

Before launch, replace:

- Company name, phone, address, and portal URLs in `src/lib/site-config.ts`
- Demo listings / guides under `src/lib/data/`
- Legal pages under `src/app/legal/` — **attorney review required**
- Trust metrics, testimonials, and case studies — do not publish unverified claims
- Sitemap `baseUrl` in `src/app/sitemap.ts`

Showing requests and analysis leads save to the database and appear in the owner portal.

## Key routes

- `/` — Homepage
- `/rentals` — Listing search (`?view=map` for Google Maps when keyed)
- `/owners/rental-analysis` — Rental analysis tool
- `/investors/*` — Analysis, ROI calculator, market reports, neighborhood guides
- `/areas/[city]` — Alabama / Georgia guides
- `/legal/fair-housing` — Fair Housing statement
