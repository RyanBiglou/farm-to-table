# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Farm To Table is a React/Vite single-page application (marketplace connecting consumers with local farmers). It uses Supabase for data/auth and Stripe for payments, both as hosted services — no local databases or Docker required.

### Running the dev server

```
npm run dev
```

Starts Vite on `http://localhost:5173`. Use `--host 0.0.0.0` to expose on all interfaces.

### Build

```
npm run build
```

Output goes to `dist/`. There is a chunk size warning for the main JS bundle (>500 KB) — this is expected and not a build failure.

### Lint / Tests

No ESLint config or test framework is currently set up in this project. The `package.json` only defines `dev`, `build`, and `preview` scripts.

### Supabase credentials

The app gracefully degrades without Supabase credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Without them, the Supabase client is set to `null` and data hooks return empty arrays — the UI still loads and renders, but shows no farm/product data from the database. The Supabase-hosted instance does provide seed data, so if credentials are set the app will display farms and products.

### Stripe (optional)

Stripe keys (`VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`) are only needed for the checkout flow. The `/api` proxy in `vite.config.js` forwards to the production Vercel deployment, so the serverless function does not need to run locally.

### Gotchas

- The Vite dev server proxy for `/api` points to `https://farm-to-tablevercel.vercel.app`. If that deployment is down, checkout API calls will fail locally.
- The zip code modal on first visit only accepts Orange County, California zip codes as "in delivery zone," but can be dismissed to continue browsing.
