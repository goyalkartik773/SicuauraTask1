# GG Fashion

A modern e-commerce platform built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## 🎯 Overview

Full-featured fashion e-commerce application demonstrating modern React patterns, performance optimization, and scalable architecture. Users can browse products, search with filters, view details, and manage a shopping cart.

## 🛠️ Tech Stack & Decision Rationale

| Technology | Why |
|---|---|
| **Next.js 14 (App Router)** | Server-side rendering + static generation for SEO; built-in optimizations and routing |
| **React 18** | Latest concurrent rendering and hooks for optimal performance |
| **TypeScript** | Type safety and maintainability at scale |
| **Tailwind CSS** | Utility-first styling for rapid, consistent UI development |
| **Context API** | Lightweight cart state (no external dependencies) |

## ✨ Key Features & Decisions

✅ **Server Components First** – Product grids render server-side with zero client JS overhead  
✅ **URL-Based State Management** – Filters (search, category, price, sort) live in URLs for SEO-friendly, shareable links  
✅ **Incremental Static Regeneration (ISR)** – 60-second cache revalidation for fast loads + fresh data  
✅ **Responsive Design** – Mobile-first approach with Tailwind CSS  
✅ **Type Safety** – Full TypeScript coverage prevents runtime errors  
✅ **Modular Components** – Clean separation for scalability and reusability

## 📂 Project Structure

```
src/
├── app/              # Next.js pages (server components)
├── components/       # Reusable React components
├── context/          # Cart state management
├── lib/              # API, utilities, constants
├── types/            # TypeScript definitions
└── hooks/            # Custom React hooks
```

## 🚀 Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

**Build & Deploy**
```bash
npm run build
npm start
```

Lint code:
```bash
npm run lint
```

## 🔑 Code Quality Highlights

- ✅ Server components reduce JavaScript bundle size
- ✅ URL-based state avoids hydration mismatches
- ✅ ISR strategy balances performance with data freshness
- ✅ Component modularity enables easy testing and maintenance
- ✅ TypeScript ensures reliability as codebase grows

---

**Production-ready e-commerce app built with modern best practices.**

## Performance

- **Lighthouse Performance**: 90+
- **Image Optimization**: All images use `next/image` with WebP auto-conversion and sizing rules.
- **Preloading**: Critical assets and Google fonts preloaded via `next/font/google`.
- **Skeleton UX**: Polished gradient skeleton shimmer loaders utilized on all async boundaries.
