# Stack Research

**Domain:** Mobile-web personal finance / cost-of-living tracker (React SPA)
**Researched:** 2026-04-05
**Confidence:** MEDIUM — WebSearch and WebFetch were unavailable; version data and rationale are drawn from training knowledge (cutoff August 2025). Versions should be verified against npm before installing.

---

## Fixed Stack (User-Specified — Do Not Revisit)

| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | ^5.x | Build tool / dev server |
| React | ^18.x | UI framework |
| TypeScript | ^5.x | Type safety |
| Tailwind CSS | ^3.x | Utility-first styling |
| React Router v6 | ^6.x | Client-side routing / app shell |

These are locked. All recommendations below layer on top.

---

## Recommended Stack

### Charts

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Recharts | ^2.12 | Bar charts, line charts, pie/donut charts, area charts for the Insights flow | Built on D3 but exposes declarative React components. Composable chart primitives (`<BarChart>`, `<PieChart>`, `<LineChart>`, `<AreaChart>`) map cleanly to the category breakdown and trend views expected in a finance insights screen. Responsive container wraps natively, which is critical for mobile viewports. Actively maintained, wide adoption in React finance dashboards, strong TypeScript types. Smaller bundle than Chart.js when tree-shaken. |

**Confidence:** MEDIUM (widely used as of mid-2025; verify `recharts@latest` on npm before pinning).

**Why not Chart.js / react-chartjs-2:** Chart.js is a canvas-based library; react-chartjs-2 is a thin wrapper that requires imperative instance management for dynamic data. Recharts is idiomatic React and integrates with Tailwind color tokens cleanly via props. For a hardcoded-data v1, Recharts is significantly less ceremony.

**Why not Tremor:** Tremor is a full component kit built on top of Recharts + Tailwind. It imposes its own design system, which conflicts with Costra's custom design tokens. Use raw Recharts for full visual control.

**Why not Victory:** Lower adoption in 2024-2025 ecosystem, less community maintenance activity than Recharts.

---

### Forms

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| React Hook Form | ^7.51 | Track flow expense entry forms (amount, category, date, note), onboarding/register/login form screens | Uncontrolled-first approach means zero re-renders per keystroke — critical for low-end Android phones common in Sri Lanka. Ships with first-class TypeScript generics (`useForm<T>`), Zod/Yup resolver support, and `Controller` for custom Tailwind inputs. Zero dependencies. |
| Zod | ^3.23 | Schema validation for form data (LKR amount ranges, required fields, date constraints) | Pairs with React Hook Form via `@hookform/resolvers`. TypeScript-first: infer types from the schema rather than duplicating them. For a hardcoded v1, Zod schemas also double as the mock data shape contracts, making the future API swap straightforward. |
| @hookform/resolvers | ^3.x | Bridges Zod schemas into React Hook Form validation | Required glue package — do not hand-roll validation adapters. |

**Confidence:** HIGH for React Hook Form (dominant standard since 2022, no challenger in 2025). MEDIUM for Zod version (verify latest on npm).

**Why not Formik:** Formik uses controlled components (value + onChange on every field), causing full form re-renders per keystroke. On mid-range phones this is perceptible lag. Formik's development activity slowed significantly after 2022; React Hook Form is the community standard as of 2024-2025.

---

### State Management

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Zustand | ^4.5 | Global app state: current user profile mock, selected wallet, active category filter in Insights, navigation state that spans flows | Minimal API: `create()` returns a hook. No Provider wrapping, no boilerplate. TypeScript inference works without extra configuration. For a hardcoded v1, Zustand stores are the cleanest way to hold mock data that multiple screens need to read (e.g., expense list shared by Home, Track, and Insights flows). Tiny bundle (~1 KB gzipped). |

**Confidence:** MEDIUM-HIGH. Zustand was the clear recommendation for small-medium React apps in 2024-2025 and unlikely to have changed.

**For local screen state:** Use React's built-in `useState` / `useReducer`. Do not reach for Zustand for form field state or animation toggles — that's overengineering.

**Why not Redux Toolkit:** RTK is the right choice for large teams, complex server-cache synchronization (via RTK Query), and apps that need Redux DevTools time-travel debugging. For a frontend-only v1 with hardcoded data, RTK introduces slice/action/reducer boilerplate that adds no value. The codebase would be 2-3x more code for the same result.

**Why not Jotai:** Jotai's atom model is excellent for fine-grained reactivity, but for a v1 with modest state (a mock expense list, a user profile object, a wallet balance), Zustand's single-store model is simpler to reason about and easier to hand off.

**Why not Context API alone:** React Context re-renders all consumers on every state change. It's suitable for truly static global values (theme token, locale) but not for frequently-changing state like an expense list or active filter. Zustand selectors prevent unnecessary re-renders.

---

### Icons

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Lucide React | ^0.400+ | All UI icons across flows (navigation, category icons, action buttons, form icons) | Lucide is the spiritual successor to Feather Icons and the current standard in Tailwind/shadcn ecosystems. Ships as individual named exports — only imported icons hit the bundle. SVG-based, scales perfectly on high-DPI phone screens (no blur). Consistent 24px grid with adjustable `size` and `strokeWidth` props. Costra's design system is described as using iconography foundations; Lucide's clean line style aligns with modern mobile finance UI conventions. |

**Confidence:** MEDIUM (Lucide was dominant as of mid-2025; verify `lucide-react@latest` on npm).

**Why not Heroicons:** Heroicons is excellent but tied to Tailwind Labs' component conventions. Lucide has a larger icon set (1,400+ vs ~300) which matters for 9 different expense category icons.

**Why not React Icons (aggregator):** react-icons bundles multiple icon libraries and is harder to tree-shake consistently in Vite. Lucide's explicit named exports are cleaner for bundle control.

**Why not FontAwesome:** Font-based icon approach (even the SVG version) is heavier and the style does not match modern flat mobile UI conventions in Costra's design system.

---

### Animation

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Framer Motion | ^11.x | Screen transitions between flows (slide-in/out), modal/drawer entry animations, skeleton loading states, micro-interactions on buttons and cards | Framer Motion's `AnimatePresence` handles route transition animations cleanly with React Router v6 via `location.key`. Declarative `initial / animate / exit` API integrates with Tailwind layout without fighting CSS specificity. `motion.div` wraps any Tailwind component. For mobile-web, physics-based spring animations (not CSS easing curves) feel native-app-like, which is the stated UX goal. |

**Confidence:** MEDIUM. Framer Motion was the dominant React animation library as of 2025. Note: Framer Motion was renamed to `motion` package in late 2024 — verify the current package name (`motion` vs `framer-motion`) on npm before installing.

**Package name note:** As of late 2024, the package may be published as `motion` rather than `framer-motion`. Both may be aliases. Verify on npmjs.com before running install.

**Why not React Spring:** React Spring uses a hook-based imperative API that is harder to integrate with CSS-Tailwind layouts. Framer Motion's component model is more natural for Tailwind-heavy projects.

**Why not CSS transitions only:** Pure CSS transitions cannot coordinate between React Router route mounts/unmounts (enter/exit at the same time), which is necessary for the slide-left/right navigation feel expected in a mobile app.

**Scope note:** For v1, keep animations minimal — reserve Framer Motion for route transitions and one or two key micro-interactions. Do not animate every element; mobile devices have limited GPU budget and excessive animation causes jank.

---

### Currency and Date Formatting

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Native `Intl.NumberFormat` | Browser built-in | LKR currency formatting (e.g., "Rs. 12,500.00") | The `Intl` API is the correct tool for locale-aware number formatting. No library dependency needed. For LKR: `new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' })` produces "LKR 12,500.00". Wrap this in a utility function `formatLKR(amount: number): string` in `src/utils/currency.ts`. |
| date-fns | ^3.6 | Date formatting, relative time ("3 days ago"), date arithmetic for Insights period filtering | Tree-shakeable by function import (unlike moment.js which loads the entire library). TypeScript types are bundled. For finance, you need: `format(date, 'dd MMM yyyy')` for display, `startOfMonth` / `endOfMonth` for period filters, `differenceInDays` for relative indicators. date-fns v3 (released late 2023) dropped CommonJS, is ESM-first, and works perfectly with Vite. |

**Confidence:** HIGH for `Intl.NumberFormat` (browser standard, no dependency). MEDIUM for date-fns version (v3.x was current as of mid-2025).

**LKR formatting detail:**
```typescript
// src/utils/currency.ts
const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatLKR(amount: number): string {
  return lkrFormatter.format(amount);
}
```
The `en-LK` locale produces "LKR 12,500.00". If the designs show "Rs." prefix instead of "LKR", adjust with `currencyDisplay: 'narrowSymbol'` or replace via string manipulation.

**Why not moment.js:** Moment is 67 KB gzipped (entire library, non-tree-shakeable), officially in maintenance mode since 2020, and the team recommends migrating away. date-fns imports only what you use.

**Why not day.js:** day.js is 2 KB and a good alternative. Prefer date-fns because it has better TypeScript types and the functional (not chained) API pairs better with Tailwind's utility-class mental model. Either is acceptable.

---

### Mock Data Layer

| Library / Approach | Version | Purpose | Why Recommended |
|--------------------|---------|---------|-----------------|
| Plain TypeScript modules | — | Hardcoded mock expenses, wallets, categories, user profile | For a v1 with hardcoded data, the cleanest approach is typed TypeScript objects/arrays in `src/data/` — no library needed. Define interfaces in `src/types/` and mock objects in `src/data/mock-expenses.ts`, `src/data/mock-wallets.ts`, etc. Zustand stores import from these modules. When a real API arrives, only the Zustand store's data-fetch logic changes — the types and component interfaces stay stable. |
| Faker.js (optional dev tool) | ^8.x | Generate realistic mock expenses, categories, and amounts for fuller Insights charts | Only add if the hardcoded static arrays look too sparse in the Insights flow. `@faker-js/faker` can seed deterministic data (via `faker.seed(42)`) so the UI looks consistent across reloads. Install as a dev dependency and use only in `src/data/` modules — never in components. |

**Confidence:** HIGH for plain TS modules (framework-agnostic best practice). MEDIUM for Faker.js version.

**Data layer pattern:**
```
src/
  types/
    expense.ts       // Expense, Category, Wallet interfaces
    user.ts          // UserProfile interface
  data/
    mock-expenses.ts // const expenses: Expense[] = [...]
    mock-wallets.ts  // const wallets: Wallet[] = [...]
    mock-user.ts     // const user: UserProfile = {...}
  store/
    expenseStore.ts  // Zustand store importing from data/
    walletStore.ts
```
This separation means the mock data is never co-located in components — future API integration replaces `data/` with API calls without touching component code.

---

### Mobile-Web App Shell

| Concern | Approach | Why |
|---------|----------|-----|
| Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` in `index.html` | `viewport-fit=cover` enables safe-area-inset handling for notched phones (iPhone notch, Android punch-hole) — common among Sri Lankan users on mid-range phones |
| Safe area insets | Tailwind `pb-safe` via `tailwindcss-safe-area` plugin OR manual `env(safe-area-inset-bottom)` in CSS | Bottom navigation bar must clear iPhone home indicator and Android nav bars |
| Touch targets | Minimum 44×44px (Apple HIG) / 48×48dp (Material) for all tappable elements | Use Tailwind `min-h-[44px] min-w-[44px]` on interactive elements |
| Scroll behavior | CSS `overflow-y: auto; -webkit-overflow-scrolling: touch` on scroll containers | Smooth momentum scroll on iOS Safari |
| App-like feel | Fixed bottom nav, screen-height panels, `position: fixed` header | Achieved via Tailwind `fixed`, `inset-x-0`, `bottom-0`, `h-screen` |
| Max-width container | `max-w-md mx-auto` (448px) on all screens | Prevents Costra looking broken on tablets; centers the phone-width content on larger viewports |
| Prevent double-tap zoom | `touch-action: manipulation` on interactive elements | Eliminates iOS 300ms tap delay without disabling pinch-zoom on content |

**Confidence:** HIGH (established mobile-web patterns, not library-dependent).

**Safe area plugin:**
```bash
npm install -D tailwindcss-safe-area
```
Then in `tailwind.config.ts`:
```typescript
plugins: [require('tailwindcss-safe-area')]
```
This adds `pb-safe`, `pt-safe`, `pl-safe`, `pr-safe` utilities that map to `env(safe-area-inset-*)`.

---

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + `eslint-plugin-react-hooks` | Catch hooks rule violations, unused deps | Vite scaffold includes this; verify it's wired in `eslint.config.js` |
| Prettier | Consistent formatting; pairs with Tailwind class sorter | Add `prettier-plugin-tailwindcss` to auto-sort Tailwind classes in the correct order |
| `prettier-plugin-tailwindcss` | Auto-sort Tailwind class names | Prevents class-order bugs and keeps diffs clean |
| TypeScript strict mode | `"strict": true` in `tsconfig.json` | Catches null/undefined errors early — critical for LKR amount calculations |
| React DevTools (browser extension) | Component tree inspection | Install in Chrome/Edge for dev |
| Vite `proxy` config | Not needed for v1 (no backend) | Skip — add when API integration begins |

---

## Installation

```bash
# Charts
npm install recharts

# Forms + validation
npm install react-hook-form zod @hookform/resolvers

# State
npm install zustand

# Icons
npm install lucide-react

# Animation
npm install motion
# NOTE: verify — package may be "framer-motion" or "motion" depending on current release

# Date formatting
npm install date-fns

# Optional: mock data generation (dev only)
npm install -D @faker-js/faker

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss tailwindcss-safe-area
```

---

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|-------------------------|
| Charts | Recharts | Tremor | If you want pre-styled finance dashboard components and can accept Tremor's design system overriding Costra's tokens |
| Charts | Recharts | Chart.js / react-chartjs-2 | If you need canvas rendering for very large datasets (10,000+ data points) — overkill for a personal finance tracker |
| Charts | Recharts | Victory | Never — lower maintenance, smaller community |
| Forms | React Hook Form + Zod | Formik | If the team is already expert in Formik and performance is not a concern on target devices |
| State | Zustand | Redux Toolkit | If the project grows to multiple developers with complex async flows and DevTools time-travel is needed |
| State | Zustand | Jotai | If you prefer atom-level reactivity; acceptable alternative, same complexity |
| Icons | Lucide React | Heroicons | If Tailwind Labs components (shadcn/ui etc.) are being used and icon consistency with that ecosystem matters |
| Animation | Framer Motion / motion | CSS transitions | If animation budget is very tight; CSS transitions handle hover states fine but cannot coordinate React Router mount/unmount |
| Dates | date-fns | day.js | Equally valid; day.js is smaller (2 KB vs ~15 KB for the same functions) but has weaker TypeScript ergonomics |
| Currency | `Intl.NumberFormat` | numeral.js / accounting.js | Never — both are abandoned; `Intl` is the browser standard |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Moment.js | 67 KB gzipped, non-tree-shakeable, officially in maintenance mode since 2020 | date-fns |
| Formik | Controlled-component re-render on every keystroke; slower on mid-range Android; development pace slowed 2022+ | React Hook Form |
| Chart.js / react-chartjs-2 | Canvas-based, requires imperative instance management, harder to style with Tailwind tokens, heavier setup for what are simple bar/pie charts | Recharts |
| Tremor | Imposes its own design system that conflicts with Costra's custom tokens; overkill for custom-designed UI | Raw Recharts |
| Redux Toolkit | Slice/action/reducer boilerplate for a frontend-only v1 with hardcoded data is pure overhead | Zustand |
| React Icons (aggregator) | Harder to tree-shake in Vite; mixes icon styles from multiple libraries; inconsistent sizing | Lucide React |
| FontAwesome | Heavy, style doesn't match modern flat mobile UI | Lucide React |
| numeral.js / accounting.js | Both abandoned; no active maintenance | Native `Intl.NumberFormat` |
| React Spring | Imperative hook API fights Tailwind layout patterns; larger API surface for the use case | Framer Motion / motion |
| MUI / Ant Design / Chakra UI | Full component libraries that impose their own design systems — directly conflicts with Costra's custom design system tokens | Build primitives with Tailwind |

---

## Version Compatibility Notes

| Package | Compatible With | Notes |
|---------|----------------|-------|
| Recharts ^2.x | React 18, TypeScript 5 | Requires `@types/react` to be installed (usually present in Vite scaffold) |
| React Hook Form ^7.x | React 18, TypeScript 5, Zod ^3.x | Use `@hookform/resolvers` ^3.x to match |
| Zustand ^4.x | React 18 | Zustand v5 was in development as of mid-2025 — check for stable release before pinning ^4 vs ^5 |
| Framer Motion ^11.x / motion ^11.x | React 18 | The package rename from `framer-motion` to `motion` happened in late 2024; verify the current canonical package name on npmjs.com |
| date-fns ^3.x | TypeScript 5, ESM/Vite | v3 is ESM-first; no CommonJS compat issues with Vite |
| Lucide React ^0.4xx | React 18 | Lucide releases frequently; pin to a minor version and update intentionally |
| tailwindcss-safe-area | Tailwind CSS ^3.x | Verify Tailwind v4 compatibility if upgrading Tailwind later |

---

## Stack Patterns

**For the Insights flow (charts):**
- Use `<ResponsiveContainer width="100%" height={240}>` from Recharts to fill the phone viewport width without fixed pixel dimensions.
- Color the chart segments using Costra design token hex values passed directly as `fill` / `stroke` props.

**For the Track flow (expense entry form):**
- Use React Hook Form with a Zod schema validating amount (positive number, max 10,000,000 for LKR plausibility), category (enum), and date (valid date, not future).
- Use `Controller` wrapper for the custom Tailwind category picker (not a native `<select>`).

**For navigation / animation:**
- Wrap `<Routes>` in `<AnimatePresence mode="wait">` and each route's root element in `<motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}>` for a slide-left navigation feel.
- Use `useLocation()` as the `key` on `AnimatePresence` to trigger on route changes.

**For the mock data layer:**
- All mock data lives in `src/data/`. Components never import from `src/data/` directly — they read from Zustand stores only. This enforces the boundary that will later be replaced by API calls.

**For LKR amounts throughout the app:**
- Never store LKR amounts as formatted strings. Store as `number` (paise/cents or whole LKR — pick one and be consistent). Format at the display layer via `formatLKR()`.

---

## Sources

- Training knowledge (cutoff August 2025) — used for all library recommendations
- Context7, WebSearch, WebFetch: **unavailable** during this research session (permissions denied)
- All version numbers marked MEDIUM confidence — **verify on npmjs.com before pinning** for each package
- Architecture patterns (Intl.NumberFormat, safe-area-inset, viewport meta): HIGH confidence — browser standards documented in MDN

---

*Stack research for: Costra — mobile-web cost-of-living tracker frontend (Sri Lanka)*
*Researched: 2026-04-05*
