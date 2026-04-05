# Project Research Summary

**Project:** Costra — Cost of Living Tracker (Frontend)
**Domain:** Mobile-web personal finance SPA — React + TypeScript + Tailwind + Vite + React Router v6
**Researched:** 2026-04-05
**Confidence:** MEDIUM-HIGH

## Executive Summary

Costra is a mobile-web SPA that renders all 9 designed flows of a Sri Lankan cost-of-living tracker with hardcoded data and pixel-faithful fidelity to its Storybook design system. The expert approach for this type of project is strictly layered: design tokens first, then primitives library, then screens — never in reverse. Skipping the token extraction phase or building screens before primitives produces a codebase where every design change ripples through dozens of files, which is particularly damaging when hi-fi screens arrive incrementally and reveal token mismatches late.

The recommended stack layers Recharts (insights charts), React Hook Form + Zod (track/register forms), Zustand (cross-flow state), Lucide React (icons), Framer Motion (route transitions), and date-fns (date formatting) on top of the fixed React 18 + TypeScript 5 + Tailwind v4 + Vite + React Router v6 base. The mock data layer should be plain typed TypeScript modules in `src/data/` — no custom hooks, no factories, no simulated delays. The architecture splits into two layout route groups (AuthLayout for splash/onboarding/auth flows, AppLayout for main app flows with BottomNav), with screens composing flow-parts composing primitives, all styled exclusively through token-derived Tailwind utilities.

The primary risks are: (1) token namespace mistakes in Tailwind v4's `@theme` block that silently break utility generation, (2) dynamic Tailwind class names via template literals that are purged in production builds, and (3) performance degradation on low-end Android devices (Redmi, Samsung A-series) that dominate the Sri Lankan market. All three are preventable with up-front structure established in the scaffold and tokens phases before any screen work begins.

---

## Key Findings

### Recommended Stack

The fixed stack (React 18, TypeScript 5, Tailwind CSS 3/4, Vite, React Router v6) is non-negotiable per project constraints. The additive library choices are strongly opinionated: Recharts over Chart.js for declarative React chart primitives with `<ResponsiveContainer>` for mobile viewports; React Hook Form + Zod over Formik for uncontrolled-first performance on low-end Android; Zustand over Redux Toolkit for minimal-boilerplate global state on a frontend-only v1.

Tailwind v4's `@theme` directive is the canonical token pipeline — tokens defined in `src/tokens/index.css` generate utility classes automatically. Currency formatting uses the native `Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' })` with no library dependency. Safe-area insets and `100dvh` (not `100vh`) are mandatory from day one for correct behavior on iPhone notch and iOS Safari.

**Core technologies:**
- **Vite + React 18 + TypeScript 5:** Build tool, UI framework, type safety — user-specified, locked
- **Tailwind CSS v4 + `@theme` tokens:** Utility-first styling with design system token pipeline
- **React Router v6:** Client-side routing; two layout route groups (auth + app)
- **Recharts ^2.12:** SVG-based declarative charts for Insights flow — integrates cleanly with Tailwind color tokens
- **React Hook Form ^7 + Zod ^3:** Uncontrolled form handling + TypeScript-first schema validation for Track and auth forms
- **Zustand ^4:** Minimal global state for cross-flow data (expense list, wallet list, user profile)
- **Lucide React:** 1,400+ SVG icons, individual named exports, tree-shakeable — covers all 9 flow icon needs
- **Framer Motion / motion ^11:** Route transition animations via `AnimatePresence` + React Router `location.key`
- **date-fns ^3:** ESM-first, tree-shakeable date formatting and arithmetic for Insights period filters
- **Native `Intl.NumberFormat`:** LKR currency formatting — no library dependency needed
- **tailwindcss-safe-area plugin:** `pb-safe`, `pt-safe` utilities for iPhone home indicator clearance

See `.planning/research/STACK.md` for full library rationale, version compatibility notes, and installation commands.

---

### Expected Features

All 9 flows are required for v1. The full feature inventory is mapped to the Costra design system Storybook taxonomy (122 entries). Features are already hardcoded-data feasible — no flow requires a backend to render correctly.

**Must have (table stakes — all flows):**
- Splash: animated brand reveal, progress indicator, auto-navigate after ~2.5s
- Welcome: product headline, "Get Started" + "Log In" CTAs, hero illustration
- Onboarding: 4 slides with illustrations, progress dots, Skip + Next navigation
- Register: phone entry, OTP screen, choice groups for profile setup, ready/success card
- Login: phone entry, OTP screen, auto-advance on complete digit entry
- Home: Hero Budget Card (LKR budget vs spent), recent transactions list, spending alerts, FAB to Track, BottomNav, greeting with mock user name
- Track: amount numpad, category picker grid, date field, note field, income variant, success state
- Wallet: multi-wallet list with balances, total balance, per-wallet transaction drill-down, balance input
- Insights: monthly spending total, category breakdown donut chart, period selector, vs-previous-period comparison
- Profile: user identity display, monthly budget setting form, category list, notification toggles, logout

**Should have (differentiators — low cost, high impact):**
- Sri Lankan category taxonomy (tuk-tuk, kottu, CEB, Dialog top-up, Keells, etc.) — signals market fit immediately
- Home search (client-side filter over mock transaction array)
- Insights cost-of-living benchmark cards (hardcoded Sri Lankan average comparisons)
- Wallet with Sri Lankan bank names (Commercial Bank, Sampath, People's Bank, HNB, BOC)
- Voice entry shortcut (Home mic → pre-filled Track form, no real STT needed)
- Profile recurring expenses list with add UI

**Defer (v2+ — requires backend):**
- Real phone/OTP authentication
- Data persistence across sessions
- Bank SMS import / Open Banking (no LK banking API exists)
- Receipt OCR, AI spending predictions
- Multi-currency, family/shared accounts, PDF/CSV export

See `.planning/research/FEATURES.md` for per-flow feature tables, prioritization matrix, and Sri Lanka / LKR context notes (realistic mock data amounts, bank and category taxonomy).

---

### Architecture Approach

The architecture is strictly layered: Tokens → Primitives → Flow-parts → Screens, with a one-way data flow from `src/data/` typed modules through screens to flow-parts to primitives. Two React Router v6 layout routes divide the app — `AuthLayout` (Splash, Welcome, Onboarding, Register, Login; no BottomNav; full-bleed) and `AppLayout` (Home, Track, Wallet, Insights, Profile; with fixed BottomNav and safe-area padding). The mobile shell uses `min-h-[100dvh]`, `max-w-[430px] mx-auto`, and `env(safe-area-inset-bottom)` on the BottomNav to produce an app-like feel on any phone.

**Major components:**
1. **`src/tokens/index.css`** — Single source of truth for all design tokens; `@theme` directives generate Tailwind utility classes; extracted from Costra DS Storybook foundations before any component work begins
2. **`src/components/primitives/`** — Design-system atoms (Button, Input, Card, Badge, Avatar, Icon, Typography); stateless, flow-agnostic, accept `className` overrides; built before any screen
3. **`src/components/shell/`** — Mobile shell wrappers (AppShell, BottomNav, PageContainer); `BottomNav` uses React Router `useLocation` for active tab highlighting with `NavLink` v6 API
4. **`src/flows/[flow]/parts/` and `screens/`** — Feature-based folder per flow; parts map 1:1 to Storybook "Components > [Flow]" entries; screens compose parts
5. **`src/data/`** — Typed TypeScript modules (`expenses.ts`, `wallets.ts`, `categories.ts`, `insights.ts`, `user.ts`) with interfaces in `types.ts`; plain static arrays only; future API swap touches only this directory
6. **`src/layouts/`** — `AuthLayout` and `AppLayout` as React Router v6 layout routes with `<Outlet />`
7. **`src/router.tsx`** — Route tree; auth group under `/`, app group under `/app`

Build order is strictly: Scaffold → Tokens → Primitives → Shell/Layouts → Mock Data → Auth screens → App screens → Navigation wiring. Token extraction must be complete before the first screen is touched.

See `.planning/research/ARCHITECTURE.md` for full folder structure, code examples for all major patterns, and the build-order dependency table.

---

### Critical Pitfalls

1. **Tailwind v4 `@theme` namespace mismatch** — Tokens defined with wrong CSS variable prefix (e.g., `--primary` instead of `--color-primary`) silently generate no utility classes; developers fall back to inline `style={{}}` and the token system collapses. Prevent by creating a token audit table and a visual token reference component in Phase 2 before any screen work. Warning sign: `bg-primary` class in JSX but element is unstyled.

2. **Dynamic Tailwind class names via template literals** — `` `bg-${variant}-500` `` works in dev (all CSS present) but the production build purges these fragments. All color/size/state variants in Button, Badge, and Category chips must use static lookup maps (`const bgVariants = { primary: 'bg-color-primary', ... }`). Warning sign: component looks correct in `npm run dev`, broken after `npm run build && npm run preview`.

3. **`100vh` on iOS Safari** — Full-screen containers using `100vh` are clipped behind the browser chrome when the address bar appears or keyboard opens. Replace every instance with `100dvh` (`min-h-[100dvh]`) from the scaffold phase. Warning sign: bottom nav partially hidden on physical iPhone.

4. **Missing safe-area insets on BottomNav** — `viewport-fit=cover` in the viewport meta tag extends layout into the notch area, but without `env(safe-area-inset-bottom)` padding on BottomNav, bottom tab buttons are physically unreachable behind the iPhone home indicator. Bake safe-area padding into BottomNav from day one.

5. **Rebuilding primitives inside screen components** — Screen-by-screen delivery pressure leads to inline one-off Button/Card/Input definitions inside screen files. When the design changes, every file must be touched. The fix is a hard rule: the primitives library is the acceptance gate for Phase 3, and no screen PR may contain a locally defined primitive.

6. **Performance on low-end Android (Sri Lanka device profile)** — Redmi, Samsung A-series, and Realme phones (Snapdragon 400–600, 1.5–3 GB RAM) are the primary target devices. Pitfalls include unsplit JS bundles (use `React.lazy` per flow), Google Fonts without preload, `backdrop-filter: blur()` in scroll containers, and chart animations on mount. Test with Chrome DevTools CPU 4x throttle throughout.

See `.planning/research/PITFALLS.md` for the full list of 13 pitfalls, recovery strategies, and per-phase prevention mapping.

---

## Implications for Roadmap

The architecture research defines a strict build-order dependency chain that directly maps to phases. Tokens must precede primitives; primitives must precede screens. The feature research confirms that all 9 flows share common primitives (Button, Card, Input, BottomNav) and a shared data layer — so the investment in Phase 2 and 3 pays dividends across all subsequent phases.

### Phase 1: Project Scaffold
**Rationale:** Nothing else can start without the Vite + React + TS + Tailwind + React Router v6 base configured correctly. This phase also establishes the rules that prevent the highest-recovery-cost pitfalls (dvh, viewport meta, route tree with `<Outlet />`, code splitting setup, mock data structure).
**Delivers:** Working Vite dev server; Tailwind CSS wired; React Router v6 route tree skeleton with `<Outlet />` in layouts; `index.html` with correct viewport meta (`viewport-fit=cover`); `src/data/` structure established with `types.ts` and empty static files; ESLint + Prettier + `prettier-plugin-tailwindcss` configured.
**Addresses:** All 9 flows (infrastructure prerequisite)
**Avoids:** 100vh iOS bug (dvh from day one), missing Outlet blank-screen bug, NavLink v5 API mistake, over-engineered mock data layer, route-level code splitting omission

### Phase 2: Design Token Extraction
**Rationale:** This is the highest-leverage phase and must be completed before any UI component is built. Tokens are the single source of truth for every visual decision across all 9 flows. Extracting them late causes mismatched spacing and colors across all built screens — a retroactive fix with high cost.
**Delivers:** `src/tokens/index.css` with all `@theme` directives for the Costra design system (colors, typography, spacing, radius, shadows, elevation); a visual token reference dev-only page that verifies every token generates a Tailwind utility class and matches the Storybook foundations.
**Uses:** Tailwind v4 `@theme` directive; Costra DS Storybook foundation pages (Color, Typography, Spacing, Elevation, Grid, Border and Radius); hi-fi design images as supplementary reference
**Avoids:** Token namespace mismatch pitfall, `--*: initial` global reset pitfall, hi-fi vs implementation mismatch pitfall

### Phase 3: Primitives Library
**Rationale:** The 9 flows share ~8–10 core primitives. Building these once before screens eliminates duplication and ensures design consistency. This phase is the acceptance gate: no screen phase begins until the primitives library exists.
**Delivers:** `src/components/primitives/` — Button (primary, secondary, ghost, icon variants), Input (text, OTP, with label/error), Card, Badge, Avatar (initials-based), Icon (Lucide wrapper), Typography (display/body/caption variants); `src/components/shell/` — AppShell, BottomNav (with v6 NavLink active state), PageContainer; `src/utils/currency.ts` (`formatLKR` utility); `min-touch` 44px wrapper utility.
**Uses:** Lucide React, Tailwind token utilities, `Intl.NumberFormat` for LKR
**Avoids:** Primitives-rebuilt-in-screens pitfall, LKR formatting inconsistency pitfall, touch target pitfall, dynamic class name purging pitfall (static variant maps established here)

### Phase 4: Mock Data Layer
**Rationale:** All app-flow screens (Home, Track, Wallet, Insights, Profile) depend on the same mock data. Establishing it as a typed, centralized layer before screens ensures consistent data across flows and prevents the pattern of mock data as component state.
**Delivers:** `src/data/types.ts` (Expense, Wallet, Category, UserProfile interfaces); `src/data/expenses.ts` (15–20 realistic LKR transactions across 5+ Sri Lankan categories); `src/data/wallets.ts` (3–4 wallets: Cash, Commercial Bank, Sampath, credit card); `src/data/categories.ts` (Sri Lankan taxonomy: Food/tuk-tuk/CEB/Dialog/Keells etc.); `src/data/insights.ts` (precomputed monthly summaries for charts); `src/data/user.ts` (mock user profile with monthly budget).
**Avoids:** Mock data as component state, over-engineered mock data layer, data inconsistency across Home/Track/Insights

### Phase 5: Auth Flow Screens
**Rationale:** Splash → Welcome → Onboarding → Register → Login is the user's first path through the app. These screens use `AuthLayout` (no BottomNav), are simpler than app flows, and provide a first real test of the token and primitives system before the more complex app flows.
**Delivers:** All auth flow screens wired under `AuthLayout`: SplashScreen (brand reveal + auto-navigate), WelcomeScreen (CTAs), OnboardingScreen (4-slide with progress dots), RegisterScreen multi-step (phone, OTP, choice groups, ready card), LoginScreen (phone, OTP, auto-advance).
**Uses:** React Hook Form + Zod (register/login forms), Framer Motion (slide transitions), primitives library, mock data layer
**Avoids:** Framer Motion / AnimatePresence mis-wired with React Router, form re-renders on low-end devices

### Phase 6: Home Flow Screen
**Rationale:** Home is the most compositionally complex screen (8 component groups in the DS) and the central hub linking to all other app flows. It is the primary test of the AppLayout + BottomNav setup and the mock data layer in action.
**Delivers:** HomeScreen under `AppLayout`: Hero Budget Card (hardcoded LKR budget vs spent), recent transactions list, spending category summary, budget alert/warning, FAB navigating to Track, greeting with mock user name, period label, BottomNav active state on Home tab.
**Uses:** Zustand store reading from `src/data/`, Recharts (mini category bar or spending progress), mock expenses and user data
**Avoids:** One giant screen component pitfall (decompose into named flow-parts matching DS), token hardcoding

### Phase 7: Track Flow Screen
**Rationale:** Track is the core user action — logging expenses. It depends on the wallet list (from data layer) and its form patterns (React Hook Form + Zod + Controller for custom inputs) set the template for any other form screens.
**Delivers:** TrackScreen: amount numpad (large, thumb-friendly), Sri Lankan category picker grid with icons, date field defaulting to today, note field, wallet assignment dropdown, income toggle variant, success/confirmation state.
**Uses:** React Hook Form + Zod (amount validation: positive, ≤ 10,000,000 LKR; date not future), Controller for custom category picker, mock categories and wallets data
**Avoids:** Form re-renders on low-end Android (uncontrolled RHF), amount stored as formatted string (store raw number, format at display only)

### Phase 8: Wallet Flow Screen
**Rationale:** Wallet is a read-mostly flow that displays the mock wallet data. Lower implementation complexity than Home or Track, but required before Insights (which can show per-wallet breakdowns).
**Delivers:** WalletScreen: multi-wallet list with LKR balances and wallet-type icons, total balance aggregate, per-wallet transaction drill-down (filtered mock expense array), credit utilization indicator, balance input form UI.
**Uses:** Mock wallets and expenses data, Lucide icons for wallet types, primitives (Card, Badge)
**Avoids:** Wallet-level data inconsistency with Track flow (same data source)

### Phase 9: Insights Flow Screen
**Rationale:** Insights is the analytically richest screen and the primary use of Recharts. It depends on the expense mock data being rich enough (15+ transactions across 5+ categories) to make charts meaningful.
**Delivers:** InsightsScreen: monthly spending total, category donut chart (Recharts PieChart with Costra color tokens as `fill` props), top categories ranked list, period selector (hardcoded months with different mock values), vs-previous-period delta, cost-of-living benchmark cards (hardcoded Sri Lankan average comparisons).
**Uses:** Recharts `<ResponsiveContainer>`, `<PieChart>`, `<BarChart>`; mock insights data; date-fns for period labels
**Avoids:** Chart animation on mount (CPU-heavy on low-end Android), chart re-renders from unstable prop references (React.memo on chart components)

### Phase 10: Profile Flow Screen
**Rationale:** Profile is the final screen and the lowest risk — it is primarily forms and lists that read from and update the mock user data.
**Delivers:** ProfileScreen: identity display (name, phone, avatar), monthly budget setting form, category list with edit UI, recurring expenses list, notification preference toggles, app lock PIN UI (renders without real lock), logout (navigates to Welcome).
**Uses:** React Hook Form for budget and category forms, mock user data, Zustand for budget value shared with Home Hero Card
**Avoids:** Budget value inconsistency with Home flow (same Zustand store)

### Phase 11: Navigation Wiring and Polish
**Rationale:** With all screens built, the final phase verifies all routes are connected, transitions are smooth, active tab states are correct, and the "looks done but isn't" checklist is cleared.
**Delivers:** All React Router routes confirmed navigable end-to-end; Framer Motion route transitions wired on all flows; BottomNav active state verified on each tab; scroll reset on navigation; production build verified (no purged classes, per-flow code splitting confirmed); Lighthouse mobile audit run; CPU throttle smoke test on each flow.
**Avoids:** Tailwind class purging in production, missing active states, scroll position not reset, performance regressions on low-end device simulation

---

### Phase Ordering Rationale

- **Token extraction before primitives before screens** is enforced by the architecture research's build-order dependency table. Any deviation creates the highest-recovery-cost pitfalls in the entire project.
- **Auth flows before app flows** because auth flows are simpler (no BottomNav, no charts, no data aggregation) and serve as an integration test of the token + primitives system on real screens before the more complex app flows begin.
- **Home before Track before Wallet before Insights** follows data dependency order: Home needs expense data, Track produces it conceptually (though both use the same mock array), Wallet provides context for Track's wallet selector, Insights depends on the richness of the expense data established in the data phase.
- **Profile last among app flows** because it has the fewest cross-flow dependencies; budget setting links back to Home via Zustand but this is a simple wire-up.
- **Polish phase last** because the "looks done but isn't" checklist (production build, iOS Safari, touch targets, Lighthouse) can only be run against a complete app.

---

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 2 (Token Extraction):** The Storybook `costra-design-system.vercel.app` returns the app shell via WebFetch; individual foundation pages (Color, Typography, Spacing, etc.) must be fetched separately or inferred from hi-fi design images. This phase will require iterative extraction against each Storybook foundation page before values can be confirmed. Budget extra time.
- **Phase 9 (Insights Charts):** Recharts API details (specific props for custom tooltips, label formatting in LKR, responsive donut chart configuration) may need spot-check against current Recharts docs to avoid API drift from training knowledge.

**Phases with standard, well-documented patterns (can skip research-phase):**
- **Phase 1 (Scaffold):** Vite + React + TS + Tailwind + React Router v6 scaffold is a fully documented standard setup with no ambiguity.
- **Phase 3 (Primitives):** Tailwind utility component patterns are stable and well-established.
- **Phase 5–10 (Flow screens):** Each flow maps 1:1 to the Storybook component inventory; hi-fi designs arriving per screen provide ground truth. No external API research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Core stack is locked and HIGH confidence. Additive libraries (Recharts, React Hook Form, Zustand, Lucide, Framer Motion) rated MEDIUM — drawn from training knowledge (cutoff August 2025); verify all versions on npmjs.com before pinning. The `framer-motion` → `motion` package rename needs confirmation. |
| Features | HIGH | Feature inventory derived from verified Storybook index (122 entries confirmed); all features cross-checked against PROJECT.md scope constraints. Sri Lankan market context (prices, bank names, categories) is MEDIUM — reflects 2025 knowledge; validate 2026 price levels when constructing mock data. |
| Architecture | HIGH | Tailwind v4 `@theme` pipeline and React Router v6 layout route patterns verified via live WebFetch against official docs (2026-04-05). Folder structure and layering patterns are stable, established conventions. |
| Pitfalls | HIGH | All critical pitfalls verified against official docs (Tailwind, React Router v6, MDN viewport, safe-area-inset). Browser behavior pitfalls (dvh, safe area, touch targets) are well-documented standards. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Exact Costra design token values:** Colors, font sizes, spacing scale, border radii, and shadows are not yet extracted. The token reference component in Phase 2 is the mechanism to resolve this. Until hi-fi screens are uploaded, token values are placeholders — do not hardcode any values in Phase 3 components until Phase 2 is complete.
- **Framer Motion package name:** Verify whether the current canonical package is `motion` or `framer-motion` on npmjs.com before Phase 1 installation. Both may co-exist as aliases.
- **Zustand v5 stability:** Zustand v5 was in development as of mid-2025. Check for stable release vs v4 before pinning.
- **Recharts v2 vs v3:** Verify current major version on npm; API surface may have changed from training knowledge.
- **Voice entry screen design:** The voice shortcut (Home → Track pre-fill) depends on whether the hi-fi designs include a distinct voice entry screen or simply navigate directly to Track with params. Resolve when that screen's hi-fi arrives.
- **2026 Sri Lankan price levels:** Mock data amounts (bus fares, food costs, rent) should be validated against current LKR prices when mock data is constructed; training knowledge reflects 2025 approximate values.

---

## Sources

### Primary (HIGH confidence)
- Costra Design System Storybook index (`costra-design-system.vercel.app/index.json`) — flow component inventory, 122 entries
- Tailwind CSS v4 Theme documentation (`tailwindcss.com/docs/theme`) — `@theme` directive, namespace rules, utility generation — verified 2026-04-05
- Tailwind CSS v4 Class Detection docs (`tailwindcss.com/docs/detecting-classes-in-source-files`) — dynamic class purging behavior — verified 2026-04-05
- React Router v6 Upgrade Guide and Concepts (`reactrouter.com/6.28.0`) — layout routes, `<Outlet />`, NavLink v6 API — verified 2026-04-05
- MDN — Viewport concepts, `dvh`/`svh`/`lvh` units, `env()` safe-area-inset — verified 2026-04-05
- Costra `PROJECT.md` — scope, constraints, out-of-scope boundaries, key decisions

### Secondary (MEDIUM confidence)
- Training knowledge (cutoff August 2025) — library version recommendations (Recharts, React Hook Form, Zustand, Lucide React, Framer Motion, date-fns, Zod)
- Personal finance app domain conventions (Spendee, Wallet by BudgetBakers, Money Manager, YNAB) — feature expectations and UX patterns
- Sri Lankan market context — device profile (low-end Android prevalence), payment methods, banking names, spending categories, LKR price levels

### Tertiary (LOW confidence — validate before use)
- Specific version numbers for all additive libraries — verify each on npmjs.com before installing
- `motion` vs `framer-motion` current canonical package name — confirm on npmjs.com
- Zustand v5 release status — check before pinning v4 vs v5
- 2026 Sri Lankan price levels for mock data — validate against current data when constructing mock arrays

---

*Research completed: 2026-04-05*
*Ready for roadmap: yes*
