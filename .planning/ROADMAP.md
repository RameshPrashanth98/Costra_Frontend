# Roadmap: Costra — Cost of Living Tracker (Frontend)

## Overview

Costra's frontend is built in strict dependency order: scaffold first, then design tokens, then primitives and mock data, then screens (auth-side before app-side), and finally a polish pass that wires everything end-to-end. No screen work begins before the token and primitives library exist. Each phase delivers a coherent, independently verifiable capability — the progression moves from invisible infrastructure to visible, navigable flows.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Scaffold** - Vite + React + TS + Tailwind + React Router v6 base with mobile-web shell wired correctly
- [ ] **Phase 2: Design Tokens** - All Costra DS tokens extracted and wired into Tailwind v4 `@theme`; visual reference page verifies every token
- [ ] **Phase 3: Primitives + Mock Data** - Complete primitive library and centralized typed mock data layer; acceptance gate for all screen work
- [ ] **Phase 4: Auth Flows** - Splash, Welcome, Onboarding, Register, and Login screens rendered under AuthLayout with navigation wired
- [ ] **Phase 5: Home + Track Flows** - Dashboard and expense-entry screens rendered under AppLayout consuming mock data
- [ ] **Phase 6: Wallet + Insights + Profile Flows** - Remaining three app flows rendered with mock data and Recharts charts
- [ ] **Phase 7: Navigation + Polish** - All 9 flows navigable end-to-end; Framer Motion transitions; production build clean; Lighthouse ≥ 85

## Phase Details

### Phase 1: Scaffold
**Goal**: A working Vite dev server that serves a mobile-web React + TypeScript + Tailwind app with the correct route tree, layout routes, and viewport configuration — free of every foundational pitfall (dvh, safe-area, code splitting, Outlet) before any UI is written.
**Depends on**: Nothing (first phase)
**Requirements**: FND-01, FND-02, FND-03, FND-04
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and serves the app at localhost
  2. `index.html` includes `viewport-fit=cover` and the app shell uses `min-h-[100dvh]` (not `100vh`)
  3. React Router v6 route tree is wired with `AuthLayout` and `AppLayout` each rendering `<Outlet />` — visiting `/` and `/app` renders a placeholder without a blank screen
  4. Route-level code splitting with `React.lazy` + `<Suspense>` is in place and confirmed in the network tab (separate chunks per layout)
**Plans**: TBD

Plans:
- [ ] 01-01: Scaffold Vite + React + TS + Tailwind + React Router v6; configure viewport and mobile shell; wire layout routes with Outlet and code splitting

### Phase 2: Design Tokens
**Goal**: Every Costra design system token (Color, Typography, Spacing, Elevation, Border & Radius, Grid, Iconography) is extracted from the Storybook foundation pages, defined in `src/tokens/index.css` via Tailwind v4 `@theme`, and verified against a live token reference page before any component is written.
**Depends on**: Phase 1
**Requirements**: TOK-01, TOK-02, TOK-03
**Success Criteria** (what must be TRUE):
  1. `src/tokens/index.css` contains `@theme` blocks for all Costra DS foundations (colors, typography, spacing, radius, shadows, elevation)
  2. A developer visiting `/tokens` (dev-only route) can see every token rendered as a color swatch, type specimen, or spacing ruler — and every swatch matches the Storybook Foundations pages visually
  3. Tailwind utility classes derived from tokens (e.g., `bg-color-primary`, `text-font-display`) apply correctly in JSX — no class generates an unstyled element
**Plans**: TBD

Plans:
- [ ] 02-01: Extract all Costra DS tokens from Storybook foundation pages; define in `src/tokens/index.css` with Tailwind v4 `@theme`; build token reference page at `/tokens`

### Phase 3: Primitives + Mock Data
**Goal**: A complete, reusable primitive library (`Button`, `Input`, `Card`, `Typography`, `Icon`, `BottomNav`, and shell wrappers) built on top of token utilities, plus a centralized typed mock data layer — both complete before any screen is touched. This phase is the acceptance gate for all screen work.
**Depends on**: Phase 2
**Requirements**: PRM-01, PRM-02, PRM-03, PRM-04, PRM-05, PRM-06, PRM-07, DAT-01, DAT-02, DAT-03, DAT-04, DAT-05
**Success Criteria** (what must be TRUE):
  1. A developer visiting `/storybook` (dev-only component gallery) can see every primitive variant rendered with correct token-based styling — no inline `style={{}}` props, no hardcoded hex values
  2. `Button`, `Input` (text, OTP, select), `Card`, `Typography`, and `Icon` all use static class-lookup variant maps (no template literal class names) — confirmed by `npm run build && npm run preview` showing correct styles
  3. `BottomNav` renders with 5 tabs, correct Lucide icons, and active-state highlighting via React Router `NavLink` — confirmed on a test `/app` route
  4. `src/data/` exports typed arrays of 15+ transactions, 3 wallets, Sri Lankan category taxonomy, user profile, and budget — all importable and TypeScript-error-free
  5. `formatLKR(12500)` returns `"LKR 12,500.00"` (or equivalent `Intl.NumberFormat` output) — verified in the component gallery
**Plans**: TBD

Plans:
- [ ] 03-01: Build all UI primitives (Button, Input, Card, Typography, Icon, BottomNav) with static variant maps and token utilities; build AppShell and PageContainer shell wrappers; build formatLKR utility
- [ ] 03-02: Build mock data layer: TypeScript types, 15+ transactions, 3 wallets, Sri Lankan categories, user profile, budget — all as plain typed module exports in `src/data/`

### Phase 4: Auth Flows
**Goal**: All auth-side screens (Splash, Welcome, Onboarding, Register, Login) render under `AuthLayout`, match the hi-fi designs, and are navigable as a complete first-run user path — Splash auto-advances, Onboarding steps forward and back, Register and Login forms validate and route to Home.
**Depends on**: Phase 3
**Requirements**: SPL-01, SPL-02, WEL-01, ONB-01, ONB-02, ONB-03, REG-01, REG-02, REG-03, REG-04, LOG-01, LOG-02, LOG-03
**Success Criteria** (what must be TRUE):
  1. Opening the app, the Splash screen renders the Costra brand with animation, then auto-navigates to Welcome after ~2.5 seconds — without any user tap
  2. From Welcome, tapping "Get Started" enters Onboarding — the user can tap Next through all 4 slides, tap Back to return, and reach the Register entry point
  3. The Register flow renders all screens (phone entry, OTP input, profile choice groups, ready card); entering any phone number and a hardcoded OTP completes registration and routes to Home
  4. From Welcome, tapping "Log In" enters the Login flow; submitting the login form routes to Home regardless of credentials (hardcoded success)
  5. All auth screens render with no layout overflow on a 390px-wide viewport (iPhone 14 width) — no content clipped, no horizontal scroll
**Plans**: TBD

Plans:
- [ ] 04-01: Build Splash and Welcome screens with animations and routing
- [ ] 04-02: Build Onboarding flow (4 slides, progress dots, forward/back navigation, completion routing)
- [ ] 04-03: Build Register flow (phone entry, OTP screen, choice groups, ready card) with React Hook Form + Zod
- [ ] 04-04: Build Login flow (phone entry, OTP screen) with React Hook Form + Zod

### Phase 5: Home + Track Flows
**Goal**: The two core app screens — the Home dashboard and the Track expense-entry form — render under `AppLayout` with BottomNav visible, consume mock data, and form a complete usage loop: user lands on Home, sees their budget and transactions, taps to Track, logs an expense, and returns to Home with the new transaction reflected.
**Depends on**: Phase 3, Phase 4
**Requirements**: HOM-01, HOM-02, HOM-03, TRK-01, TRK-02, TRK-03, TRK-04
**Success Criteria** (what must be TRUE):
  1. The Home screen shows the Hero Budget Card (LKR budget vs spent), a recent transactions list with category icons and LKR amounts, and the greeting with the mock user's name — all sourced from `src/data/`
  2. BottomNav is visible on Home with the Home tab active; tapping any other tab navigates to a rendered screen (even if placeholder at this stage)
  3. Tapping the FAB on Home navigates to Track; the Track screen shows a large LKR amount field, the Sri Lankan category picker grid, date selector, wallet picker, and note field
  4. Selecting a category, entering an amount, and submitting the Track form adds the transaction to the Zustand store and navigates back to Home, where the new transaction appears in the list
  5. The category picker grid shows Sri Lankan taxonomy labels (e.g., Food, Transport, CEB Electricity, Dialog Top-up, Groceries) matching `src/data/categories.ts`
**Plans**: TBD

Plans:
- [ ] 05-01: Build Home screen with Hero Budget Card, transactions list, alerts, search, and FAB consuming mock data via Zustand
- [ ] 05-02: Build Track screen with amount numpad, category picker grid, form fields (React Hook Form + Zod), and Zustand write-back to transaction store

### Phase 6: Wallet + Insights + Profile Flows
**Goal**: The three remaining app flows — Wallet, Insights, and Profile — render under `AppLayout`, consume the same mock data layer, and complete the full app surface: users can inspect wallet balances, view spending charts, and manage profile settings including logout.
**Depends on**: Phase 5
**Requirements**: WAL-01, WAL-02, WAL-03, INS-01, INS-02, INS-03, PRO-01, PRO-02, PRO-03
**Success Criteria** (what must be TRUE):
  1. The Wallet screen lists all mock wallets with their Sri Lankan bank/cash labels (e.g., Commercial Bank, Sampath, Cash) and LKR balances; tapping a wallet shows transactions filtered to that wallet
  2. The Insights screen shows a Recharts donut/pie chart of spending by category, a monthly total in LKR, and a period selector — the chart uses Costra DS color tokens as fill values (not hardcoded hex)
  3. The Insights period selector changes the displayed data (different hardcoded monthly datasets) — chart re-renders without errors on a CPU-throttled browser
  4. The Profile screen shows the mock user's name, phone, avatar, monthly budget, category list, and a Logout button; pressing Logout navigates to Welcome
**Plans**: TBD

Plans:
- [ ] 06-01: Build Wallet screen (wallet list with balances, per-wallet transaction drill-down)
- [ ] 06-02: Build Insights screen (Recharts PieChart + BarChart, period selector, category breakdown, monthly totals)
- [ ] 06-03: Build Profile screen (user identity, budget form, category list, recurring expenses, logout)

### Phase 7: Navigation + Polish
**Goal**: All 9 flows are navigable end-to-end in a single unbroken path; Framer Motion route transitions are wired; BottomNav active states are correct on every app tab; the production build is clean with no purged Tailwind classes; and a Lighthouse mobile audit scores ≥ 85.
**Depends on**: Phase 6
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. A user can walk the full app without hitting a dead route: Splash → Welcome → Onboarding → Register → Home → Track → Home → Wallet → Insights → Profile → Welcome (logout) — every link resolves to a rendered screen
  2. BottomNav active tab highlight is correct on every app route (Home, Track, Wallet, Insights, Profile) — verified by navigating to each tab and inspecting the active class
  3. Page transitions animate between routes (slide or fade per hi-fi intent) using Framer Motion `AnimatePresence` — no flash-of-blank-screen between routes
  4. `npm run build && npm run preview` produces a working app with all component variants styled correctly — no Button/Badge/Card variant is unstyled in the production preview
  5. Lighthouse mobile audit (simulated 4G, Moto G4) returns Performance ≥ 85 and Accessibility ≥ 90
**Plans**: TBD

Plans:
- [ ] 07-01: Wire all React Router routes end-to-end; verify every link resolves; fix any dead routes or missing Outlet wiring
- [ ] 07-02: Implement Framer Motion `AnimatePresence` route transitions; verify BottomNav active states on all tabs; run production build verification and Lighthouse audit

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold | 0/1 | Not started | - |
| 2. Design Tokens | 0/1 | Not started | - |
| 3. Primitives + Mock Data | 0/2 | Not started | - |
| 4. Auth Flows | 0/4 | Not started | - |
| 5. Home + Track Flows | 0/2 | Not started | - |
| 6. Wallet + Insights + Profile Flows | 0/3 | Not started | - |
| 7. Navigation + Polish | 0/2 | Not started | - |
