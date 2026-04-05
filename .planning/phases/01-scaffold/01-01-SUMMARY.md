---
phase: 01-scaffold
plan: 01
subsystem: scaffold
tags: [vite, react, typescript, tailwind-v4, react-router-v6, mobile-web, code-splitting]
dependency_graph:
  requires: []
  provides: [src/router.tsx, src/layouts/AuthLayout.tsx, src/layouts/AppLayout.tsx, src/index.css, src/tokens/index.css, vite.config.ts, tsconfig.json]
  affects: [phase-02-tokens, phase-03-primitives, phase-04-auth-flows, phase-05-app-flows]
tech_stack:
  added: [react@18.3.1, react-dom@18.3.1, react-router-dom@6.30.3, typescript@5.x, vite@5.4.x, @vitejs/plugin-react@4.3.x, tailwindcss@4.x, @tailwindcss/vite@4.x, eslint@8.57.x, prettier@3.x, prettier-plugin-tailwindcss@0.5.x, @typescript-eslint/parser@7.x, eslint-plugin-react@7.34.x, eslint-plugin-react-hooks@4.6.x, eslint-plugin-jsx-a11y@6.8.x]
  patterns: [react-lazy-suspense-code-splitting, layout-routes-with-outlet, dvh-mobile-shell, safe-area-insets, path-alias-at-src]
key_files:
  created:
    - package.json
    - tsconfig.json
    - tsconfig.node.json
    - vite.config.ts
    - index.html
    - src/main.tsx
    - src/App.tsx
    - src/router.tsx
    - src/index.css
    - src/tokens/index.css
    - src/layouts/AuthLayout.tsx
    - src/layouts/AppLayout.tsx
    - src/components/NotFound.tsx
    - src/flows/splash/screens/SplashScreen.tsx
    - src/flows/welcome/screens/WelcomeScreen.tsx
    - src/flows/onboarding/screens/OnboardingScreen.tsx
    - src/flows/register/screens/RegisterScreen.tsx
    - src/flows/login/screens/LoginScreen.tsx
    - src/flows/home/screens/HomeScreen.tsx
    - src/flows/track/screens/TrackScreen.tsx
    - src/flows/wallet/screens/WalletScreen.tsx
    - src/flows/insights/screens/InsightsScreen.tsx
    - src/flows/profile/screens/ProfileScreen.tsx
    - .eslintrc.cjs
    - .prettierrc.json
    - .prettierignore
    - .gitignore
  modified: []
decisions:
  - "Tailwind v4 via @tailwindcss/vite plugin (no tailwind.config.js, tokens in @theme)"
  - "React Router v6 createBrowserRouter + layout routes with Outlet"
  - "Route-level React.lazy + Suspense from day one to prevent retrofit cost (PITFALLS #7)"
  - "min-h-[100dvh] throughout (not 100vh) for iOS Safari address bar fix (PITFALLS #2)"
  - "safe-area-inset-top/bottom via CSS calc() in layout headers/footers (PITFALLS #2)"
  - "ESLint 8 (not 9) to avoid flat-config migration burden in Phase 1"
metrics:
  duration_minutes: 9
  completed_date: "2026-04-05"
  tasks_completed: 7
  tasks_total: 7
  files_created: 30
  files_modified: 0
---

# Phase 1 Plan 1: Scaffold Summary

**One-liner:** Vite + React 18 + TypeScript 5 strict + Tailwind v4 + React Router v6 skeleton with 100dvh shell, safe-area insets, 13-chunk route-level code splitting, and ESLint/Prettier configured.

## What Was Built

A complete frontend scaffold for the Costra cost-of-living tracker app. Phase 1 is infrastructure only — no design tokens, no real UI, just the correctly wired skeleton that permanently prevents four foundational pitfalls before any screen is written.

### Key deliverables

- **Vite project** at repo root with React 18, TypeScript 5 strict mode, `@/* -> src/*` path alias
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js`; tokens will live in `src/tokens/index.css` `@theme` block)
- **React Router v6** with `createBrowserRouter`, layout routes (`AuthLayout` / `AppLayout`), both rendering `<Outlet />`
- **Mobile-web shell**: `min-h-[100dvh]`, `safe-area-inset-top/bottom` via `calc(env(...))`, `viewport-fit=cover` in meta, `touch-action: manipulation` globally
- **Route-level code splitting**: 13 `React.lazy()` imports + `withSuspense()` wrapper → Vite emitted 14 separate JS chunks
- **10 placeholder screens** (splash, welcome, onboarding, register, login, home, track, wallet, insights, profile) + `NotFound`
- **ESLint 8** (typescript-eslint, react, react-hooks, jsx-a11y, react-refresh) + **Prettier** with `prettier-plugin-tailwindcss`
- **Folder structure** established: `src/flows/`, `src/layouts/`, `src/components/primitives/`, `src/tokens/`, `src/data/`, `src/types/`, `src/utils/`, `src/hooks/`

## Verification Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS (exit 0) |
| `npx eslint src --ext .ts,.tsx` | PASS (exit 0) |
| `npm run build` | PASS — 14 JS chunks in dist/assets/ |
| JS chunk count >= 10 | PASS — 14 chunks (each lazy route has own chunk) |
| `npm run preview` at localhost:4173 | PASS — HTML with `<div id="root">` served |
| `npm run dev` at localhost:5173 | PASS — dev server starts in 589ms |
| No `100vh` in src/ | PASS |
| No `min-h-screen` in src/ | PASS |
| `viewport-fit=cover` in index.html | PASS |
| `<Outlet` in AuthLayout | PASS |
| `<Outlet` in AppLayout | PASS |
| `env(safe-area-inset-bottom)` in AppLayout | PASS |

## Pitfalls Permanently Prevented

1. **PITFALLS #2 — viewport/dvh**: `min-h-[100dvh]` used in both layouts and NotFound; `100vh` and `min-h-screen` absent from entire `src/`
2. **PITFALLS #2 — safe-area**: `env(safe-area-inset-top/bottom)` wired into layout headers/footers via `calc()`; `viewport-fit=cover` in HTML meta
3. **PITFALLS #5 — missing Outlet**: Both `AuthLayout` and `AppLayout` render `<Outlet />` with `export default`
4. **PITFALLS #7 — code splitting**: 13 `React.lazy()` calls from day one → Vite emits 14 separate chunks; no monolithic bundle

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | 34961c5 | chore(01-01): init Vite + React + TS project with core dependencies |
| Task 2 | 8c96423 | feat(01-01): add CSS entry, tokens stub, and folder structure |
| Task 3 | 11ed0ea | feat(01-01): add AuthLayout and AppLayout with Outlet and mobile shell |
| Task 4 | ac4abd1 | feat(01-01): add 10 placeholder flow screens and NotFound component |
| Task 5 | 9521a3a | feat(01-01): wire router with React.lazy + Suspense and update App.tsx |
| Task 6 | 3eb59cd | chore(01-01): configure ESLint + Prettier + prettier-plugin-tailwindcss |
| Task 7 | — | Verification only (no file changes) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed unescaped apostrophes in NotFound.tsx**
- **Found during:** Task 6 (ESLint run)
- **Issue:** `react/no-unescaped-entities` errors on `you're` and `doesn't` in JSX text content
- **Fix:** Replaced apostrophes with `&apos;` HTML entity
- **Files modified:** `src/components/NotFound.tsx`
- **Commit:** included in Task 6 commit (3eb59cd)

No other deviations — plan executed as written.

## Integration Points for Downstream Phases

- **Phase 2 (Tokens)**: Fill `src/tokens/index.css` `@theme {}` block with Costra design tokens
- **Phase 3 (Primitives)**: Add UI components to `src/components/primitives/`; mock data to `src/data/`; TypeScript types to `src/types/`
- **Phase 4+ (Screens)**: Replace placeholder components in `src/flows/<flow>/screens/` with real implementations

## Self-Check: PASSED

All key files verified:
- `src/router.tsx` — exists, 13 lazy() calls confirmed
- `src/layouts/AuthLayout.tsx` — exists, Outlet + min-h-[100dvh] confirmed
- `src/layouts/AppLayout.tsx` — exists, Outlet + safe-area + min-h-[100dvh] confirmed
- `dist/assets/` — 14 JS chunks confirmed
- All 6 task commits present in git log
