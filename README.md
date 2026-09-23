# Brift — Marketing & Lead-Generation Platform

The official public marketing website for **Brift**, a construction-operations software platform designed for owner-run construction companies managing multiple active sites.

Built with **Astro**, **Tailwind CSS**, and **Astro Content Collections** for zero-JS-by-default static performance, lightweight scroll-reveal animations, mega-menu navigation, and verified SEO indexing.

---

## Architecture & Technology Stack

- **Framework**: [Astro](https://astro.build/) (`output: 'static'`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with exact Brift brand tokens
- **Motion & Scroll Animations**: Zero-dependency `IntersectionObserver` scroll-reveal engine (`.reveal`, `.reveal-fade`, staggered delays) with `prefers-reduced-motion` compliance.
- **Data Layer**: Astro Content Collections (`src/content/`) with type-safe Zod schemas for Pricing, Features, FAQ, and Blog.
- **Images**: `astro:assets` (`<Image />`) delivering responsive, optimized WebP graphics with explicit dimensions to prevent layout shifts.
- **SEO & Sitemaps**: Dynamic `<BaseHead />` with per-page OpenGraph / Twitter tags, `@astrojs/sitemap`, and JSON-LD structured data (`Organization`, `ProfessionalService`, `SoftwareApplication` / `Product`, `FAQPage`).

---

## Design System Tokens

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E1116` | Primary text |
| `--ink-2` | `#2A3040` | Secondary body text |
| `--muted` | `#5A6373` | Captions and tertiary copy |
| `--line` | `#E4E7EF` | Borders and dividers |
| `--bg` | `#FAFAFB` | Primary page background |
| `--white` | `#FFFFFF` | Card surfaces |
| `--blue` | `#3A46E1` | Primary CTA, brand accent, active states |
| `--blue-soft` | `#E9EBFD` | Light accent fills & badges |
| `--lavender` | `#ECE8FB` | Hero gradient tone |
| `--pale-blue` | `#E4EEFB` | Hero gradient tone |
| `--yellow` | `#FFE27A` | Category chips & accents |
| `--navy` | `#0B1020` | Dark section background & Partner card |
| `--navy-line` | `#2A3357` | Dark section dividers |
| `--on-dark` | `#F4F5F9` | Text on dark backgrounds |
| `--on-dark-muted` | `#A9B0C3` | Muted text on dark backgrounds |

---

## Navigation & Information Architecture

The website features a professional mega-menu dropdown navigation:

### 1. Product (Dropdown)
- **Money & Budgets** (`/product/money`): Live burn rate, client statements & fund verification.
- **Materials & Stock** (`/product/materials`): Stock ledgers, transfer approvals & low-stock alerts.
- **People & Payments** (`/product/workforce`): Offline attendance, contractor advances & vendor bills.
- **Visibility & Oversight** (`/product/reports`): 7 executive reports, 10-stage checklists & 24h stories.
- **Security & Accountability** (`/product/trust-and-control`): 4 role portals & immutable audit log.

### 2. Solutions (Dropdown)
- **For Construction Owners** (`/solutions/owners`): Complete multi-site financial control without phone-call chasing.
- **For Site Teams** (`/solutions/site-managers`): Offline mobile PWA that records worker attendance, bills, and stock without cell signal.
- **The Cost of Inaction** (`/cost-of-inaction`): Interactive financial loss calculator showing how unrecorded contractor advances, unverified materials, and delayed client billing quietly drain ₹1.5L–₹5L+ per active site annually.

### 3. Direct Links
- **Pricing** (`/pricing`): The ascending staircase pricing layout (Core / Growth / Partner).
- **About** (`/about`): Honest founder framing (*"Bridging the gap between the site and the office"*).
- **Book a Demo** (`/book-a-demo`): High-converting lead-capture form and 30-minute walkthrough overview.

---

## Key Pages & Sections

1. **`/` (Streamlined Home)**:
   - **Hero**: *"A single hub for every site."* with mobile app screenshot, ~₹29.5L monthly transaction volume metric, and "See What You Quietly Lose" button.
   - **The Reality Today**: What it usually looks vs. what it quietly costs your business.
   - **Closed-Loop System**: 4-step traceable money and materials flow with 4 role portals, 7 reports, and 8 approval points.
   - **Core Capabilities Grid**: 4 interactive module cards with real screenshots linking out to their dedicated deep-dive pages.
   - **Financial Leakage Callout**: Callout linking to the Cost of Inaction calculator.
   - **Pricing Preview**: 3-tier condensed summary linking to full pricing.
   - **Final CTA**: High-contrast dark band with single "Book a Demo" CTA.

2. **`/cost-of-inaction` (Interactive Financial Loss Calculator)**:
   - Dynamic site count selector (2, 4, 6, 8, 12+ sites).
   - Live calculations across Contractor Overpayments, Material Slippage, Notebook Attendance Rounding, and Unbilled Client Extras.
   - Dynamic comparison: Total monthly leakage (e.g. ₹2,46,000/mo) vs. one-time Brift investment (₹32,000–₹60,000) proving that Brift pays for itself within the first 14 days.
   - Real-world case studies of forgotten cash advances, phantom cement moves, and uncollected client extras.

3. **`/pricing`**:
   - **Ascending Staircase Layout**: Replicates slide 16 from the proposal deck:
     - Three cards (**Core**, **Growth**, **Partner**) sharing a common bottom baseline.
     - Ascending heights (Core shortest, Growth medium, Partner tallest).
     - Connector nodes (`+`) on the rising edges indicating progressive inheritance.
     - Numbered step chips (`01`, `02`, `03`).
     - Core and Growth in light card styling; Partner in dark card styling (`#0B1020`).
     - Setup fee (₹32,000 / ₹45,000 / ₹60,000) and month-13 fee (+₹300 / +₹300 / +₹800).
   - **Coverage Banner**: Plain-language explanation of what the fee covers.
   - **Pricing FAQ**: Native accessible `<details>` accordion with search-indexable content and JSON-LD `FAQPage` schema.

4. **Product Deep-Dive Pages**:
   - `/product/money`: Spend velocity, burn-rate analytics, site budget vs actual spend, amount to be received, client statements.
   - `/product/materials`: Standardized item master, low-stock alerts, inter-site transfer approvals.
   - `/product/workforce`: Worker attendance without signal, automatic wage costing, contractor advance slips, vendor settlements.
   - `/product/reports`: 7 built-in executive statements (financials, debt, payroll, site reports) and 10-stage residential checklist.
   - `/product/trust-and-control`: 4 role portals (Owner, Site Manager, Architect, Client), immutable audit trail, and reversing entries.

5. **Solutions Pages**:
   - `/solutions/owners`: Executive control, zero phone-call chasing, and margin protection.
   - `/solutions/site-managers`: Offline field PWA, bill snap, and fast worker attendance on remote job sites.

---

## Authentic Imagery & Content Audit

### Extracted Real Screenshots from Proposal
All screenshots used on this site were extracted directly from `Brift - Bridges the gap between the site and the office.pdf`:
1. `src/assets/hero-mobile.png`: Skyline Residency mobile app screen with funds and transaction volume.
2. `src/assets/spend-analytics.png`: Spend Velocity & Burn-Rate donut analytics and expenditure proportions.
3. `src/assets/materials-stock.png`: 20mm Aggregate stock cards and low-stock reorder notice.
4. `src/assets/contractor-report.png`: Contractor commitments, advances, and balances ledger table.
5. `src/assets/reports-overview.png`: Multi-site executive dashboard with 7 built-in reports.
6. `src/assets/audit-log.png`: Daily activity audit trail with author, timestamp, and device.
7. `src/assets/admin-dashboard.png`: Web admin dashboard overview.
8. `src/assets/receivables-table.png`: Amount to be received across sites.
9. `src/assets/purchases-ledger.png`: Verified purchases table with bill status.
10. `src/assets/stories-site-updates.png`: 24h stories tray and mobile photo archive.
11. `src/assets/client-portal.png`: Client portal feedback and payment flow.

---

## Development & Build Commands

```bash
# Install dependencies
npm install

# Start local dev server (port 4321)
npm run dev

# Typecheck and validate content collections
npm run check

# Build static production bundle to dist/
npm run build

# Preview static production build
npm run preview
```
