# Caritas Hospital — Django → Next.js Migration

## Overview

Premium frontend rebuild of [caritashospital.org](https://www.caritashospital.org) preserving the exact design language while modernizing architecture, CMS, performance, and maintainability.

| | Path |
|---|------|
| **Source (Django)** | `caritas_hospital/` |
| **Target (Next.js)** | `caritas_hospital_next/` |

---

## 1. Migration Plan

### Phase 1 — Foundation ✅
- Next.js 16 App Router + TypeScript + Tailwind
- Legacy CSS/assets ported (`style3.css`, `navbar.css`, Bootstrap, Gilroy fonts)
- Shared layout: TopBar, Header, MobileNav, Footer
- Homepage core sections
- Sanity schema definitions
- SEO: metadata API, sitemap, robots.txt

### Phase 2 — Content pages (in progress)
- Department pages via `DepartmentPage` + per-route content in `constants/departments/`
- Run `node scripts/generate-department-routes.mjs` for placeholder shells
- Migrate HTML from Django templates → typed content or Sanity Portable Text

### Phase 3 — CMS & dynamic data
- Connect Sanity project (`.env.local`)
- **Doctors** (see below): legacy JSON + `/public/media/doctors/` ship with the app; Sanity overrides
- Import posts, sliders from Django DB/media
- Preview mode + draft support

#### Doctors data model
| Layer | Location | Role |
|-------|----------|------|
| Legacy export | `constants/doctors.json` | Default roster (233 doctors from Django) |
| Photos | `public/media/doctors/` | Bundled images (`/media/doctors/...`) |
| Re-export DB | `data/legacy-db.sqlite3` | Optional SQLite copy for `python3 scripts/export-doctors.py` |
| Sanity | Studio → **Doctor** | Edit/add/hide doctors; overrides legacy when `legacyId` matches |

**Merge rules** (`services/doctors.ts`):
- Site loads legacy JSON first.
- Sanity documents with `legacyId` (Django UUID) **override** that doctor’s name, photo, order, etc.
- New Sanity-only doctors (no `legacyId`) are **added**.
- Set `isVisible: false` in Sanity to hide a legacy doctor.
- Upload a photo in Studio to replace `legacyImagePath`; otherwise the legacy file is used.
- On a **Department** document, curated `doctorGroups` override auto-grouping by specialization.

**Sanity import (one-time):**
```bash
# .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN
node scripts/sanity-import-doctors.mjs
```

### Phase 4 — Forms & APIs
- `/api/enquire`, `/api/contact`, job applications
- reCAPTCHA, honeypot, email (Resend/SendGrid)

### Phase 5 — QA & launch
- Visual regression vs Django
- Lighthouse / Core Web Vitals
- URL parity check (118 routes)
- Redirect map if any URL changes

---

## 2. Folder Architecture

```
caritas_hospital_next/
├── app/                    # Routes (App Router)
├── components/
│   ├── layout/             # TopBar, Header, Footer, MobileNav
│   ├── home/               # Homepage sections
│   ├── departments/        # Dept sticky nav, accordions
│   └── shared/             # FadeIn, EnquiryForm, PlaceholderPage
├── features/               # Page-level compositions
│   └── departments/
├── sanity/schemas/         # CMS document types
├── lib/                    # Sanity client, metadata, utilities
├── hooks/                  # useMobileNav, etc.
├── services/               # Data fetching
├── constants/              # Navigation, brand, routes, dept content
├── types/                  # TypeScript CMS types
├── styles/                 # Tailwind + legacy overrides
├── public/                 # Static assets (from Django staticfiles)
└── scripts/                # Route generation helpers
```

---

## 3. Component Structure

| Django | Next.js |
|--------|---------|
| `base.html` topbar | `TopBar.tsx` |
| `base.html` header + slide nav | `Header.tsx` + `MobileNav.tsx` |
| `base.html` footer | `Footer.tsx` |
| `index.html` hero slider | `HeroSlider.tsx` |
| `index.html` services row | `QuickServices.tsx` |
| `index.html` ratings | `RatingsSection.tsx` |
| `index.html` COE section | `CentresOfExcellence.tsx` |
| `enquiry_form_template.html` | `EnquiryForm.tsx` |
| Department templates | `DepartmentPage.tsx` |

---

## 4. Sanity Schema Structure

| Schema | Purpose |
|--------|---------|
| `siteSettings` | Global SEO, phones, footer |
| `navigation` | CMS-driven menus (optional override) |
| `heroSlide` | Homepage banners |
| `department` | Dept pages (overview, treatments, facilities) |
| `doctor` | Doctor profiles |
| `post` | News, articles, CSR |
| `testimonial` | Video testimonials |
| `faq` | FAQs |

Studio: configure `NEXT_PUBLIC_SANITY_PROJECT_ID` then run `npx sanity dev`.

---

## 5. Animation Strategy

- **Framer Motion** `FadeIn` for scroll reveals (opacity + 24px Y, 0.5s ease)
- Legacy **AOS** / **PureCounter** retained via vendor scripts where needed
- **Swiper** for mobile rating carousel
- Rules: minimal, professional — no flashy motion

---

## 6. Performance Optimization

- `next/image` for all new image usage
- Server Components by default; `"use client"` only for interactivity
- Lazy-load vendor JS (`main.js`, Swiper, Slick)
- Static generation for marketing pages where possible
- CDN for Sanity images via `@sanity/image-url`

---

## 7. SEO Strategy

- `buildMetadata()` — title, description, canonical, OpenGraph, Twitter
- `app/sitemap.ts` — all routes from `constants/routes.ts`
- `app/robots.ts`
- JSON-LD: add per-page in `lib/schema.ts` (hospital, physician, breadcrumb)
- Preserve exact URL paths (`trailingSlash: false`)

---

## 8. Responsive Strategy

- Keep Django breakpoints: 767, 991, 1024, 1366px
- Utility classes preserved: `hide_mobile`, `hide_desktop`, `hide_ipad`
- Mobile nav + Swiper carousels for stacked content
- Spacing normalized via existing Bootstrap grid

---

## 9. Reusable Component Plan

- `DepartmentPage` — hero + enquiry + sticky nav + sections
- `AccordionSection` — treatments/procedures
- `EnquiryForm` — magenta sidebar CTA
- `FadeIn` — consistent scroll animation
- `PlaceholderPage` — migration-in-progress routes

---

## 10. CMS Integration Plan

1. Create Sanity project at [sanity.io](https://sanity.io)
2. Copy `.env.example` → `.env.local`
3. Run studio: `npx sanity@latest init` (or use included `sanity.config.ts`)
4. Import content:
   - Hero slides from `SliderImage` / media folder
   - Doctors from Django `Doctor` model (export script TBD)
   - Posts from `Post` model
5. `getHomepageData()` / `getDoctors()` fetch from Sanity with static fallbacks

---

## Development

```bash
cd caritas_hospital_next
cp .env.example .env.local   # add Sanity credentials
npm install
npm run dev                   # http://localhost:3000
node scripts/generate-department-routes.mjs  # scaffold dept pages
npm run build
```

## Design Tokens

| Token | Value |
|-------|-------|
| Primary blue | `#0072bc` |
| Brand magenta | `#c71782` |
| Background | `#F4F6F6` |
| Font | Gilroy (local + fallbacks) |

---

## Notes

- Static assets copied from `caritas_hospital/staticfiles/` (~363MB images)
- Virtual tour: `/public/virtual-tour/` (standalone 3DVista bundle)
- External booking remains: `booking.caritashospital.org`
- Full visual parity for all 114 templates is Phase 2 — homepage + sample dept (`/caritas-neuro`) are reference implementations
