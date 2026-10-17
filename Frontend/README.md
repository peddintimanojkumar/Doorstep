# Doorstep — Frontend

Frontend-only React + Vite app for the Doorstep home and personal assistance
marketplace. JavaScript/JSX only (no TypeScript). No backend is included —
`src/services/api` is structured so a real Node.js API can be dropped in
later with minimal changes.

## Stack

React 18 · Vite · Tailwind CSS · React Router v6 · TanStack Query · Axios ·
React Hook Form + Zod · Lucide React

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:5173).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## What's in Phase 1

- Vite + React + Tailwind fully configured, including the design tokens
  (colors, type scale, shadows, radii) in `tailwind.config.js`.
- Centralized brand config at `src/config/brand.js` — change the company
  name/tagline/contact/social links in exactly one place.
- Centralized route path constants at `src/constants/routes.js`.
- The full route tree wired in `src/routes/AppRoutes.jsx`, lazy-loaded and
  code-split per page, with placeholder pages for every route so the app
  runs end-to-end today.
- Four layout shells (`PublicLayout`, `DashboardLayout`,
  `ProfessionalLayout`, `AdminLayout`) and three frontend-only route guards
  (`CustomerRoute`, `ProfessionalRoute`, `AdminRoute`) backed by a mock
  `useAuth` hook (localStorage — no real authentication).
- `PageContainer` and `Spinner` common components.

Every other page currently renders a labeled placeholder ("Scaffolded
route") noting which phase fills it in — see the development plan.

## Verifying Phase 1 works

1. `npm install && npm run dev`
2. Visit `/` — you should see the minimal header/footer shell and a
   "Scaffolded route — Home" placeholder.
3. Visit `/services`, `/services/anything`, `/booking`, `/login`,
   `/register`, `/about`, `/contact`, `/faq`, `/how-it-works`,
   `/become-a-professional`, `/privacy-policy`, `/terms` — each should
   render its own placeholder inside the same header/footer shell.
4. Visit a nonsense path like `/nope` — you should get the real 404 page
   with a "Back to home" link.
5. Visit `/dashboard`, `/professional`, or `/admin` directly — you should be
   redirected to `/login`, since there's no mock session yet (this proves
   the route guards are wired; real login-setting-session comes in Phase 9).
6. Open dev tools' Network tab, navigate between pages, and confirm new JS
   chunks load per route (code splitting via `React.lazy`).

## Assumptions made in Phase 1

- Fonts: Fraunces (display/serif) + Public Sans (body/UI), loaded via
  Google Fonts `<link>` tags in `index.html`.
- Color tokens (`ink`, `fern`, `marigold`, `stone`) are provisional — see
  `tailwind.config.js`; easy to retune once real brand colors exist.
- The mock `useAuth` hook has no login UI wired to it yet (that's Phase 9),
  so protected routes will always redirect to `/login` until then.
