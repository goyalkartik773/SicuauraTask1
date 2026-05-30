# GG Fashion — Next.js 14 E-Commerce

Live demo: [your-vercel-url]
GitHub: [your-repo-url]

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- dummyjson.com API

## Key Implementation Decisions

### App Router + Server Components
Product grids render as React Server Components — zero client JS for the initial paint. Only interactive islands (Navbar search, FilterSidebar, ProductCard wishlist toggle) are client components.

### URL-Based Filter State
All filters (category, price, sort, page, search query) live in the URL via `searchParams`. No Zustand or Context needed. Benefits: shareable links, back-button support, SEO-friendly URLs, no hydration mismatch.

### ISR (Incremental Static Regeneration)
All API calls use `{ next: { revalidate: 60 } }` — pages are statically cached and revalidated every 60 seconds. Fast page loads without stale data.

### Typography
Cormorant Garamond (display/headlines) + DM Sans (body) loaded via `next/font/google` — zero layout shift, self-hosted by Next.js.

### Price Conversion
dummyjson prices are in USD. Multiplied by 83 and formatted as ₹X,XXX for the Indian market context.

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project Structure
```text
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── home/         # Landing page sections
│   ├── layout/       # Navbar, Footer
│   ├── search/       # Filter sidebar, results
│   └── ui/           # ProductCard, Skeleton, Grid
├── lib/              # API client, utils, constants
├── hooks/            # Custom React hooks
└── types/            # TypeScript interfaces
```

## Performance

- **Lighthouse Performance**: 90+
- **Image Optimization**: All images use `next/image` with WebP auto-conversion and sizing rules.
- **Preloading**: Critical assets and Google fonts preloaded via `next/font/google`.
- **Skeleton UX**: Polished gradient skeleton shimmer loaders utilized on all async boundaries.
