# Caritas Hospital — Next.js

Modern rebuild of the Caritas Hospital website, migrated from Django while preserving the original design language.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + legacy CSS (`style3.css`, `navbar.css`)
- Framer Motion
- Sanity CMS
- Bootstrap 5 / Swiper / AOS (from Django vendor assets)

## Documentation

See [MIGRATION.md](./MIGRATION.md) for the full migration plan, architecture, CMS setup, and remaining work.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `node scripts/generate-department-routes.mjs` | Scaffold placeholder department pages |

## Sanity CMS

1. Create a project at [sanity.io](https://sanity.io)
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
3. Run `npx sanity dev` to open Studio

Without Sanity credentials, the site uses static fallbacks for hero slides and shows empty doctor listings.
