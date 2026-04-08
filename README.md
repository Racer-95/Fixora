# Fixora

Fixora is a light-themed, multi-page React frontend for a home services marketplace.
It is designed for clean UX, simple navigation, and maintainable code with a practical folder structure.

## Live Scope

- Responsive website with multiple pages
- Service cards powered by real image assets
- Clean routing with React Router
- Vercel-ready SPA deployment config

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Framer Motion
- Lucide React
- Tailwind CSS + PostCSS (configured)
- ESLint + TypeScript ESLint

## Project Structure

The app now uses 3 primary folders under `src`:

```text
src
├── assets/        # service images and future media
├── components/    # shared app logic, UI components, routes, hooks, utilities
│   ├── common/
│   ├── data/
│   ├── features/
│   ├── hooks/
│   ├── layout/
│   └── utils/
└── pages/         # route-level page components
```

## Routes

- `/` - Home
- `/services` - Services catalog
- `/how-it-works` - Booking journey
- `/about` - Product overview
- `*` - Not Found page

## How Data Works

- Service and page data is defined in:
  - `src/components/data/marketplaceData.ts`
- The UI consumes this through:
  - `src/components/hooks/useMarketplaceSnapshot.ts`
- Service cards render image + essential metadata only:
  - category, title, starting price, rating, turnaround

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Run lint checks

```bash
npm run lint
```

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run lint` - run ESLint checks
- `npm run preview` - preview production build locally

## Deployment (Vercel)

This project includes `vercel.json` with SPA rewrite support:

- all routes rewrite to `index.html`
- direct URL visits like `/services` work correctly after deployment

Deploy steps:

1. Push repository to GitHub.
2. Import project in Vercel.
3. Use default settings (`Framework Preset: Vite`).
4. Deploy.

## Notes

- Service images are currently high resolution. If performance is a priority, compress assets before production launch.
- Tailwind is configured, but the current UI styling is primarily in `src/index.css`.

## License

This repository is currently unlicensed. Add a `LICENSE` file before public distribution.
