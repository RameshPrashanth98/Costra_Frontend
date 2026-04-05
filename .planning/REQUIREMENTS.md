# Requirements: Costra (Frontend v1)

**Defined:** 2026-04-05
**Core Value:** A Sri Lankan user can open Costra on their phone and move through every designed flow (onboarding → tracking expenses → viewing insights → managing wallet/profile) in a working, polished, production-quality frontend faithful to the Costra design system and hi-fi screens.

## v1 Requirements

Requirements for initial frontend release. Frontend-only, hardcoded data, mobile-web. Each maps to exactly one roadmap phase.

### Foundation

- [ ] **FND-01**: Project scaffolded with Vite + React + TypeScript (strict) + Tailwind CSS + React Router v6
- [ ] **FND-02**: Mobile-web viewport configured (`viewport-fit=cover`, `100dvh` shell, safe-area insets)
- [ ] **FND-03**: Route-level code splitting via `React.lazy` + `<Suspense>` in place from day one
- [ ] **FND-04**: `AuthLayout` and `AppLayout` layout routes with `<Outlet />` wired and smoke-tested

### Design Tokens

- [ ] **TOK-01**: Costra design tokens extracted from Storybook foundation pages (Color, Typography, Spacing, Elevation, Grid, Iconography, Border & Radius)
- [ ] **TOK-02**: Tokens wired into Tailwind v4 `@theme` with correct namespaces (`--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--font-*`)
- [ ] **TOK-03**: Token reference page / smoke-test component renders every token swatch for visual verification

### UI Primitives

- [ ] **PRM-01**: Button primitive (variants matching DS) using static class-lookup pattern (no dynamic class interpolation)
- [ ] **PRM-02**: Input / form-field primitives (text, number, select, OTP) matching DS
- [ ] **PRM-03**: Card primitive(s) matching DS (base card, hero card variants)
- [ ] **PRM-04**: Typography primitives wired to DS font tokens (Nunito Sans)
- [ ] **PRM-05**: Icon system using Lucide React, sized per DS iconography tokens
- [ ] **PRM-06**: BottomNav primitive with active-state styling for the 5 main app routes
- [ ] **PRM-07**: LKR currency utility (`formatLKR`) using `Intl.NumberFormat('en-LK', { currency: 'LKR' })` with fallback

### Mock Data Layer

- [ ] **DAT-01**: TypeScript types for core entities (`User`, `Wallet`, `Transaction`, `Category`, `Budget`)
- [ ] **DAT-02**: Hardcoded dataset: 15+ realistic LKR transactions across Sri Lankan spending categories (Food, Transport, Utilities, Groceries, etc.)
- [ ] **DAT-03**: Hardcoded dataset: 2-3 wallets with Sri Lankan bank/cash labels
- [ ] **DAT-04**: Hardcoded dataset: user profile, budget, recurring expenses
- [ ] **DAT-05**: Data exposed via typed module exports, structured to be swappable for a real API later

### Splash Flow

- [ ] **SPL-01**: Splash screen(s) render matching hi-fi designs with DS tokens and animations
- [ ] **SPL-02**: Splash auto-advances to Welcome (or next route per hi-fi)

### Welcome Flow

- [ ] **WEL-01**: Welcome screen renders matching hi-fi designs with routing to Onboarding / Login

### Onboarding Flow

- [ ] **ONB-01**: Onboarding screens render matching hi-fi designs (all onboarding stories from DS)
- [ ] **ONB-02**: User can navigate forward/back through onboarding steps
- [ ] **ONB-03**: Onboarding completion routes to Register or Home per hi-fi intent

### Register Flow

- [ ] **REG-01**: Register screens render matching hi-fi designs (all register stories from DS)
- [ ] **REG-02**: Registration form uses React Hook Form + Zod validation
- [ ] **REG-03**: OTP entry UI renders and accepts input (no real verification — hardcoded success path)
- [ ] **REG-04**: Register completion routes to Home

### Login Flow

- [ ] **LOG-01**: Login screens render matching hi-fi designs (all login stories from DS)
- [ ] **LOG-02**: Login form uses React Hook Form + Zod validation
- [ ] **LOG-03**: Login submit routes to Home (no real auth — hardcoded success path)

### Home Flow

- [ ] **HOM-01**: Home screens render matching hi-fi designs (all home flow stories from DS — Hero Budget Card, transactions list, alerts, search, place rows)
- [ ] **HOM-02**: Home consumes mock data layer (transactions, wallet, budget)
- [ ] **HOM-03**: BottomNav visible and navigates to Track / Wallet / Insights / Profile

### Track Flow

- [ ] **TRK-01**: Track screens render matching hi-fi designs (all track flow stories from DS)
- [ ] **TRK-02**: Expense entry form uses React Hook Form + Zod (amount in LKR, category, date, wallet, note)
- [ ] **TRK-03**: Form submit adds transaction to mock data store (Zustand) and navigates back to Home
- [ ] **TRK-04**: Category grid matches Sri Lankan taxonomy defined in mock data

### Wallet Flow

- [ ] **WAL-01**: Wallet screens render matching hi-fi designs (all wallet flow stories from DS)
- [ ] **WAL-02**: Wallet list shows hardcoded wallets with Sri Lankan bank/cash labels and LKR balances
- [ ] **WAL-03**: Wallet detail shows transactions filtered to that wallet

### Insights Flow

- [ ] **INS-01**: Insights screens render matching hi-fi designs (all insights flow stories from DS)
- [ ] **INS-02**: Insights consumes mock data layer for charts (category breakdown, period comparison)
- [ ] **INS-03**: Charts rendered with Recharts inside `ResponsiveContainer`, themed with DS tokens

### Profile Flow

- [ ] **PRO-01**: Profile screens render matching hi-fi designs (all profile flow stories from DS)
- [ ] **PRO-02**: Profile shows hardcoded user info, budget, categories, recurring expenses
- [ ] **PRO-03**: Logout button routes back to Welcome/Login (no real session clearing)

### Navigation & Polish

- [ ] **NAV-01**: All 9 flows wired end-to-end via React Router v6 — user can walk the full app
- [ ] **NAV-02**: BottomNav active states correct on every app route
- [ ] **NAV-03**: Page transitions / animations (Framer Motion) applied per hi-fi intent
- [ ] **NAV-04**: Production build succeeds, no dynamic-class purging issues, Lighthouse mobile score ≥ 85

## v2 Requirements

Deferred. Tracked but not in current roadmap.

### Differentiators (from research)

- **DIF-01**: Voice entry on Home mic shortcut (pre-fills Track form)
- **DIF-02**: Cost-of-living benchmarks in Insights (compare user spend vs Sri Lankan averages)
- **DIF-03**: Recurring expense automation beyond reminders
- **DIF-04**: Dark mode

### Localization

- **LOC-01**: Sinhala language support
- **LOC-02**: Tamil language support

### Platform

- **PLT-01**: PWA installability / offline mode
- **PLT-02**: Native mobile apps (iOS/Android)

## Out of Scope

Explicitly excluded for v1. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real backend / API integration | Frontend-only milestone; hardcoded data layer structured for future swap |
| Real authentication (signup, login, sessions, tokens) | No backend in this milestone; auth screens render but submit to hardcoded success |
| Persistent storage (localStorage, IndexedDB, SQLite) | Hardcoded data only; Zustand state lives in-memory per session |
| Bank SMS auto-import | Requires native app permissions + backend parsing — anti-feature for mobile-web frontend |
| Receipt OCR / photo capture | Requires ML service + backend — anti-feature for this scope |
| Multi-currency support | LKR-only for v1 |
| Desktop-first responsive design | Mobile-web only; phone-width layout contained on tablets via `max-w-md mx-auto` |
| Analytics / telemetry / crash reporting | Out of scope for v1 |
| Automated test suite (unit, integration, E2E) | Type safety + visual verification only for v1 |
| Real speech-to-text for voice entry | If included, UI only; no actual STT |

## Traceability

Populated during roadmap creation (2026-04-05).

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1: Scaffold | Pending |
| FND-02 | Phase 1: Scaffold | Pending |
| FND-03 | Phase 1: Scaffold | Pending |
| FND-04 | Phase 1: Scaffold | Pending |
| TOK-01 | Phase 2: Design Tokens | Pending |
| TOK-02 | Phase 2: Design Tokens | Pending |
| TOK-03 | Phase 2: Design Tokens | Pending |
| PRM-01 | Phase 3: Primitives + Mock Data | Pending |
| PRM-02 | Phase 3: Primitives + Mock Data | Pending |
| PRM-03 | Phase 3: Primitives + Mock Data | Pending |
| PRM-04 | Phase 3: Primitives + Mock Data | Pending |
| PRM-05 | Phase 3: Primitives + Mock Data | Pending |
| PRM-06 | Phase 3: Primitives + Mock Data | Pending |
| PRM-07 | Phase 3: Primitives + Mock Data | Pending |
| DAT-01 | Phase 3: Primitives + Mock Data | Pending |
| DAT-02 | Phase 3: Primitives + Mock Data | Pending |
| DAT-03 | Phase 3: Primitives + Mock Data | Pending |
| DAT-04 | Phase 3: Primitives + Mock Data | Pending |
| DAT-05 | Phase 3: Primitives + Mock Data | Pending |
| SPL-01 | Phase 4: Auth Flows | Pending |
| SPL-02 | Phase 4: Auth Flows | Pending |
| WEL-01 | Phase 4: Auth Flows | Pending |
| ONB-01 | Phase 4: Auth Flows | Pending |
| ONB-02 | Phase 4: Auth Flows | Pending |
| ONB-03 | Phase 4: Auth Flows | Pending |
| REG-01 | Phase 4: Auth Flows | Pending |
| REG-02 | Phase 4: Auth Flows | Pending |
| REG-03 | Phase 4: Auth Flows | Pending |
| REG-04 | Phase 4: Auth Flows | Pending |
| LOG-01 | Phase 4: Auth Flows | Pending |
| LOG-02 | Phase 4: Auth Flows | Pending |
| LOG-03 | Phase 4: Auth Flows | Pending |
| HOM-01 | Phase 5: Home + Track Flows | Pending |
| HOM-02 | Phase 5: Home + Track Flows | Pending |
| HOM-03 | Phase 5: Home + Track Flows | Pending |
| TRK-01 | Phase 5: Home + Track Flows | Pending |
| TRK-02 | Phase 5: Home + Track Flows | Pending |
| TRK-03 | Phase 5: Home + Track Flows | Pending |
| TRK-04 | Phase 5: Home + Track Flows | Pending |
| WAL-01 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| WAL-02 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| WAL-03 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| INS-01 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| INS-02 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| INS-03 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| PRO-01 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| PRO-02 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| PRO-03 | Phase 6: Wallet + Insights + Profile Flows | Pending |
| NAV-01 | Phase 7: Navigation + Polish | Pending |
| NAV-02 | Phase 7: Navigation + Polish | Pending |
| NAV-03 | Phase 7: Navigation + Polish | Pending |
| NAV-04 | Phase 7: Navigation + Polish | Pending |

**Coverage:**
- v1 requirements: 52 mapped (file header stated 54; 52 distinct IDs found in file body — 2-count discrepancy noted)
- Mapped to phases: 52
- Unmapped: 0

---
*Requirements defined: 2026-04-05*
*Last updated: 2026-04-05 — traceability populated by roadmapper*
