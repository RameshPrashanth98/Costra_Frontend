# Architecture Research

**Domain:** Mobile-web SPA — React + TypeScript + Tailwind + Vite + React Router v6
**Researched:** 2026-04-05
**Confidence:** HIGH (official docs for Tailwind v4 token pipeline and React Router v7 layout routes verified via WebFetch; React/Vite/TS patterns are stable and well-established)

---

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         SCREEN LAYER                             │
│   Splash  Welcome  Onboarding  Register  Login  Home  Track      │
│   Wallet  Insights  Profile                                      │
│   (screens compose flow-parts + primitives; receive mock data)   │
├──────────────────────────────────────────────────────────────────┤
│                       FLOW-PARTS LAYER                           │
│   Flow-specific compound components (ExpenseCard, WalletRow,     │
│   InsightChart, NavBar, BottomNav, OnboardingSlide, etc.)        │
│   Each maps to a Storybook "Components > [Flow]" entry           │
├──────────────────────────────────────────────────────────────────┤
│                       PRIMITIVES LAYER                           │
│   Button  Input  Card  Badge  Avatar  Icon  Typography           │
│   (design-system atoms; no flow-specific logic)                  │
├──────────────────────────────────────────────────────────────────┤
│                       TOKENS LAYER                               │
│   src/tokens/index.css  (@theme — colors, type, spacing,         │
│   radius, shadows, elevation; feeds Tailwind utility classes)    │
├──────────────────────────────────────────────────────────────────┤
│                       MOCK DATA LAYER                            │
│   src/data/  (typed TS modules — expenses, wallets, insights,    │
│   categories, user — structured for future API swap)             │
├──────────────────────────────────────────────────────────────────┤
│                       ROUTING LAYER                              │
│   React Router v6 — AppShell layout route wraps all flows        │
│   Auth-group layout (Splash/Welcome/Onboard/Register/Login)      │
│   App-group layout (Home/Track/Wallet/Insights/Profile + BottomNav)│
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Layer | Component | Responsibility |
|-------|-----------|----------------|
| Tokens | `src/tokens/index.css` | Single source of truth; `@theme` directives that generate Tailwind utility classes |
| Primitives | `Button`, `Input`, `Card`, `Badge`, `Icon`, `Typography` | Stateless atoms matching DS foundations; accept className overrides |
| Flow-parts | `ExpenseCard`, `BottomNav`, `InsightChart`, `WalletRow`, etc. | Compound components for specific flows; import primitives + consume mock data via props |
| Screens | `HomeScreen`, `TrackScreen`, etc. | Full-page compositions; own layout grid, import flow-parts, pull from mock data layer |
| Layouts | `AppShell`, `AuthLayout`, `AppLayout` | Mobile shell (viewport, safe-area, scroll containment); render `<Outlet />` |
| Mock Data | `src/data/*.ts` | Typed module exports (no functions needed for v1); mirror future API shapes |
| Router | `src/router.tsx` | Route tree; layout routes + screen routes mapped to 9 flows |

---

## Recommended Project Structure

```
src/
├── tokens/
│   └── index.css              # All @theme directives (colors, type, spacing, radius, shadows)
│                              # Imported by main.css; generates all Tailwind custom utilities
│
├── components/
│   ├── primitives/            # Design system atoms (shared, flow-agnostic)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Icon/
│   │   └── Typography/
│   │
│   └── shell/                 # Mobile-web layout wrappers
│       ├── AppShell.tsx       # Root: max-w, min-h, safe-area, bg
│       ├── BottomNav.tsx      # Fixed bottom nav for app flows
│       └── PageContainer.tsx  # Per-screen scroll container + padding
│
├── flows/                     # One folder per flow; self-contained
│   ├── splash/
│   │   ├── parts/             # Flow-parts (Storybook "Components > Splash")
│   │   │   └── SplashLogo.tsx
│   │   └── screens/
│   │       └── SplashScreen.tsx
│   │
│   ├── welcome/
│   │   └── screens/
│   │       └── WelcomeScreen.tsx
│   │
│   ├── onboarding/
│   │   ├── parts/
│   │   │   ├── OnboardingSlide.tsx
│   │   │   ├── OnboardingDots.tsx
│   │   │   └── OnboardingCTA.tsx
│   │   └── screens/
│   │       ├── Onboarding1Screen.tsx
│   │       ├── Onboarding2Screen.tsx
│   │       ├── Onboarding3Screen.tsx
│   │       └── Onboarding4Screen.tsx
│   │
│   ├── register/
│   │   ├── parts/
│   │   └── screens/
│   │       ├── RegisterScreen.tsx
│   │       ├── RegisterVerifyScreen.tsx
│   │       └── ...
│   │
│   ├── login/
│   │   ├── parts/
│   │   └── screens/
│   │
│   ├── home/
│   │   ├── parts/
│   │   │   ├── BalanceSummary.tsx
│   │   │   ├── RecentExpenses.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── ...
│   │   └── screens/
│   │       └── HomeScreen.tsx
│   │
│   ├── track/
│   │   ├── parts/
│   │   │   ├── CategoryPicker.tsx
│   │   │   ├── AmountInput.tsx
│   │   │   └── ExpenseForm.tsx
│   │   └── screens/
│   │       ├── TrackScreen.tsx
│   │       └── ...
│   │
│   ├── wallet/
│   │   ├── parts/
│   │   └── screens/
│   │
│   ├── insights/
│   │   ├── parts/
│   │   │   ├── SpendingChart.tsx
│   │   │   └── CategoryBreakdown.tsx
│   │   └── screens/
│   │
│   └── profile/
│       ├── parts/
│       └── screens/
│
├── layouts/
│   ├── AuthLayout.tsx         # Wraps: Splash, Welcome, Onboarding, Register, Login
│   │                          # No BottomNav; full-bleed mobile screens
│   └── AppLayout.tsx          # Wraps: Home, Track, Wallet, Insights, Profile
│                              # Renders BottomNav; handles safe-area bottom inset
│
├── data/                      # Mock data layer — typed, swappable
│   ├── types.ts               # All shared TS interfaces (Expense, Wallet, Category, etc.)
│   ├── expenses.ts            # Hardcoded expense records
│   ├── wallets.ts             # Hardcoded wallet/account records
│   ├── categories.ts          # Sri Lankan expense category taxonomy
│   ├── insights.ts            # Precomputed spending summaries for charts
│   └── user.ts                # Mock user profile
│
├── hooks/                     # Custom hooks (minimal for v1)
│   └── useMockData.ts         # Optional: typed accessors over data/ modules
│
├── router.tsx                 # Route tree definition
├── main.tsx                   # Vite entry — mounts <RouterProvider>
└── main.css                   # @import "tailwindcss"; @import "./tokens/index.css";
```

### Structure Rationale

- **`tokens/`:** A single CSS file with `@theme` directives is the official Tailwind v4 pattern. It generates both CSS custom properties and utility classes from one source. Extracted from the Costra design system Storybook foundations.
- **`components/primitives/`:** Flow-agnostic atoms only. If a component appears in more than one flow, it belongs here. If it only ever appears in one flow, it lives in `flows/[flow]/parts/`.
- **`flows/`:** Feature-based grouping — each flow owns its parts and screens. This matches the Storybook taxonomy exactly (Components > [Flow] and Screens > [Flow]). Engineers building a flow only need to touch one folder.
- **`layouts/`:** Separates mobile-shell concerns (safe area, scroll containers, bottom nav) from screen content. Two layout routes handle the visual split between auth and app flows.
- **`data/`:** All mock data is plain TypeScript modules. Typed with shared interfaces from `types.ts`. Future API swap: replace the module export with an API call returning the same type — screens need zero changes.

---

## Architectural Patterns

### Pattern 1: Token-to-Tailwind Pipeline (`@theme` in CSS)

**What:** Design tokens from the Costra design system are written as `@theme` directives in `src/tokens/index.css`. Tailwind v4 reads `@theme` and generates utility classes (e.g., `--color-primary-500` becomes `bg-primary-500`, `text-primary-500`).

**When to use:** All design token values — colors, font families, font sizes, spacing scale, border radii, shadows, elevation levels.

**Trade-offs:** Tailwind v4's `@theme` is the canonical approach (replaces the old `tailwind.config.js` `theme.extend` pattern). Requires Tailwind v4. If locked to Tailwind v3, use `tailwind.config.js` instead.

**Example:**
```css
/* src/tokens/index.css */
@theme {
  /* Colors — extracted from Costra DS Foundations > Color */
  --color-primary-50:  #f0f9ff;
  --color-primary-500: #0ea5e9;
  --color-primary-900: #0c4a6e;

  --color-neutral-50:  #f8fafc;
  --color-neutral-900: #0f172a;

  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --text-display: 2rem;
  --text-body:    1rem;
  --text-caption: 0.75rem;

  /* Spacing */
  --spacing-4:  1rem;
  --spacing-6:  1.5rem;

  /* Radius */
  --radius-card:   0.75rem;
  --radius-button: 0.5rem;

  /* Shadows / Elevation */
  --shadow-card: 0 2px 8px 0 rgb(0 0 0 / 0.08);
}
```

```tsx
/* src/components/primitives/Card/Card.tsx */
export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-card shadow-card p-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}
```

### Pattern 2: Layout Routes for Mobile Shell

**What:** React Router v6 layout routes (routes with `<Outlet />` and no path, or a path with child routes) provide the persistent mobile shell (max-width container, safe-area insets, background color) while child screen routes swap in content.

**When to use:** Any persistent UI that wraps multiple screens — bottom nav, safe-area containers, background gradients.

**Trade-offs:** Keeps mobile-shell logic in one place; screens stay lean. Slightly more route configuration upfront but eliminates repetitive wrapper code in every screen.

**Example:**
```tsx
/* src/layouts/AppLayout.tsx */
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/shell/BottomNav";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-[100dvh] max-w-[430px] mx-auto bg-neutral-50 relative">
      <main className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
```

```tsx
/* src/router.tsx */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout  } from "./layouts/AppLayout";
import { SplashScreen }    from "./flows/splash/screens/SplashScreen";
import { HomeScreen }      from "./flows/home/screens/HomeScreen";
// ... other imports

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <SplashScreen /> },
      { path: "welcome",      element: <WelcomeScreen /> },
      { path: "onboarding",   element: <OnboardingScreen /> },
      { path: "register",     element: <RegisterScreen /> },
      { path: "login",        element: <LoginScreen /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true,          element: <HomeScreen /> },
      { path: "track",        element: <TrackScreen /> },
      { path: "wallet",       element: <WalletScreen /> },
      { path: "insights",     element: <InsightsScreen /> },
      { path: "profile",      element: <ProfileScreen /> },
    ],
  },
]);
```

### Pattern 3: Typed Mock Data Layer (Swappable)

**What:** All mock data lives in `src/data/` as typed TypeScript module exports. Types are defined in `types.ts` once and imported everywhere. No fake fetch calls needed for v1 — components import data directly. Future API swap replaces module exports with actual API calls, not component code.

**When to use:** Any data that will come from a real API in v2 — expenses, wallets, categories, user profile, insights.

**Trade-offs:** Direct imports are simpler than a fake fetch layer for v1. The cost is that screens can't demonstrate async loading states. If loading states are needed, wrap in a minimal `useMockData` hook that returns `{ data, isLoading: false }` — the shape matches future React Query / SWR usage.

**Example:**
```typescript
/* src/data/types.ts */
export interface Expense {
  id:          string;
  amount:      number;          // in LKR, always
  category:    CategoryId;
  description: string;
  date:        string;          // ISO 8601
  walletId:    string;
}

export interface Wallet {
  id:      string;
  name:    string;
  balance: number;              // LKR
  type:    "cash" | "bank" | "card";
}

export type CategoryId =
  | "food" | "transport" | "utilities" | "health"
  | "entertainment" | "education" | "shopping" | "other";
```

```typescript
/* src/data/expenses.ts */
import type { Expense } from "./types";

export const expenses: Expense[] = [
  {
    id:          "exp-001",
    amount:      850,
    category:    "food",
    description: "Lunch at Colombo 3",
    date:        "2026-04-04",
    walletId:    "wallet-001",
  },
  // ... more records
];
```

```typescript
/* src/hooks/useMockData.ts — optional adapter for future API parity */
import { expenses }  from "../data/expenses";
import { wallets }   from "../data/wallets";
import { insights }  from "../data/insights";
import type { Expense, Wallet } from "../data/types";

export function useExpenses(): { data: Expense[]; isLoading: boolean } {
  return { data: expenses, isLoading: false };
}

export function useWallets(): { data: Wallet[]; isLoading: boolean } {
  return { data: wallets, isLoading: false };
}
```

### Pattern 4: Component Layering (Primitives → Parts → Screens)

**What:** Three tiers with explicit import rules: screens import from parts and primitives; parts import from primitives; primitives import from tokens only (via Tailwind classes). No tier imports from a higher tier.

**When to use:** Always. Enforced by file structure — if you need something from a higher tier, extract it down.

**Trade-offs:** Slightly more files than flat components. Pays off immediately when a second screen needs the same compound component.

**Example:**
```
HomeScreen
  ├── BalanceSummary (flow-part)    ← imports Card, Typography (primitives)
  ├── RecentExpenses (flow-part)    ← imports ExpenseItem, Card (primitives)
  │     └── ExpenseItem (flow-part) ← imports Icon, Typography, Badge (primitives)
  └── QuickActions (flow-part)      ← imports Button (primitive)
```

---

## Data Flow

### User Interaction Flow

```
User taps BottomNav item
    ↓
React Router navigates to /app/[flow]
    ↓
AppLayout renders (persists) → Outlet swaps to target Screen
    ↓
Screen component renders
    ↓
Screen imports flow-parts; passes mock data as props
    ↓
Flow-parts render using primitives + Tailwind token classes
    ↓
UI displayed to user
```

### Token Pipeline Flow

```
Costra Design System (Storybook Foundations)
    ↓ (token extraction — manual or via inspection)
src/tokens/index.css (@theme directives)
    ↓ (Tailwind v4 processes @theme)
CSS custom properties in :root + generated utility classes
    ↓
Primitive components use utility classes (bg-primary-500, rounded-card, etc.)
    ↓
Flow-parts compose primitives
    ↓
Screens compose flow-parts
```

### Mock Data Flow

```
src/data/*.ts (typed exports)
    ↓
Screen component imports (or via useMockData hook)
    ↓
Passed as props to flow-parts
    ↓
Flow-parts render the data
```

**Data direction is strictly top-down (screens → parts → primitives).** No component reaches up to import from a parent. No global state store needed for v1 — all state is ephemeral UI state (form inputs, tab selection) managed with local `useState`.

---

## Route Structure for All 9 Flows

```
/ (AuthLayout — full-bleed, no BottomNav)
├── [index]          → SplashScreen
├── welcome          → WelcomeScreen
├── onboarding       → OnboardingScreen (internal step state via useState)
├── register         → RegisterScreen (multi-step via useState or sub-routes)
│   └── verify       → RegisterVerifyScreen (if separate screen)
└── login            → LoginScreen

/app (AppLayout — BottomNav visible)
├── [index]          → HomeScreen
├── track            → TrackScreen
│   └── confirm      → TrackConfirmScreen (if design calls for it)
├── wallet           → WalletScreen
│   └── :walletId    → WalletDetailScreen (if design calls for it)
├── insights         → InsightsScreen
└── profile          → ProfileScreen
```

Sub-routes within a flow (e.g., multi-step register, track confirm) are added only when a separate URL makes sense. Multi-step flows with no need for deep-linking use `useState` for step management within a single screen.

---

## Mobile-Web Shell

### Viewport and Safe Area

```css
/* src/main.css */
@import "tailwindcss";
@import "./tokens/index.css";

/* Mobile-web baseline */
html, body {
  height: 100%;
  overscroll-behavior: none;      /* prevent pull-to-refresh */
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

```tsx
/* src/layouts/AppLayout.tsx — key measurements */
// min-h-[100dvh]             → uses dynamic viewport height (handles mobile browser chrome)
// max-w-[430px] mx-auto      → phone-width container, centered on larger screens
// pb-[calc(4rem+env(safe-area-inset-bottom))]   → clears bottom nav + iPhone notch
// env(safe-area-inset-top)   → status bar clearance on notched phones
```

### Bottom Nav Structure

```
AppLayout
└── <div class="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
    └── BottomNav
        ├── NavItem (Home)
        ├── NavItem (Track)
        ├── NavItem (Wallet)
        ├── NavItem (Insights)
        └── NavItem (Profile)
```

BottomNav is a primitive-level shell component (not a flow-part) because it spans all app flows. It lives in `src/components/shell/BottomNav.tsx` and uses React Router's `useLocation` to highlight the active tab.

---

## Build Order Implications

The layer dependencies create a strict build order. Lower layers must exist before higher layers can be built.

| Phase | What to Build | Depends On |
|-------|---------------|------------|
| 1 | Scaffold: Vite + React + TS + Tailwind + React Router | Nothing |
| 2 | Token extraction → `src/tokens/index.css` | Design system Storybook / hi-fi images |
| 3 | Primitives: Button, Input, Card, Badge, Icon, Typography | Tokens |
| 4 | Mobile shell: AppShell, AuthLayout, AppLayout, BottomNav, PageContainer | Primitives + Router |
| 5 | Mock data layer: `src/data/types.ts` + all data modules | Domain knowledge (LKR categories, etc.) |
| 6 | Auth-flow screens: Splash, Welcome, Onboarding, Register, Login | Primitives + AuthLayout + data |
| 7 | App-flow screens: Home, Track, Wallet, Insights, Profile | Primitives + AppLayout + data |
| 8 | Navigation wiring: all routes connected, BottomNav active states | All screens + Router |

**Critical constraint:** Tokens must be extracted and wired (Phase 2) before any UI component can accurately match the design system. Building primitives on approximate colors/spacing creates a rework cycle. Token extraction is the highest-leverage early investment.

---

## Anti-Patterns

### Anti-Pattern 1: Flat `components/` Folder

**What people do:** Put every component in `src/components/` regardless of flow ownership.

**Why it's wrong:** As the codebase grows to 9 flows with 3-8 parts each (~50 components), a flat folder becomes unsearchable. It also obscures which components are design-system atoms vs flow-specific compositions.

**Do this instead:** `primitives/` for atoms, `flows/[flow]/parts/` for flow-specific compounds.

### Anti-Pattern 2: Hardcoding Token Values in Components

**What people do:** Write `className="bg-[#0ea5e9]"` or inline style `color: "#0c4a6e"` instead of using token-derived utility classes.

**Why it's wrong:** When the design system changes a token value, every hardcoded instance must be found and updated. Token changes propagate automatically through `@theme`.

**Do this instead:** Always define the value in `src/tokens/index.css` as a named token, then use the generated utility class (`bg-primary-500`).

### Anti-Pattern 3: Mock Data as Component State

**What people do:** Initialize mock data as `useState` constants inside screen components.

**Why it's wrong:** Data is coupled to the component; multiple screens that need the same data duplicate it; future API swap requires touching every component.

**Do this instead:** All mock data lives in `src/data/`. Screens import from there. The swap surface area is `src/data/` only.

### Anti-Pattern 4: One Giant Screen Component

**What people do:** Build an entire screen (Home: balance card + expense list + quick actions + charts) in a single 300-line component.

**Why it's wrong:** Violates the parts layer. Makes incremental screen delivery harder (can't build one part before another arrives from design).

**Do this instead:** Decompose the screen into named parts matching the Storybook "Components > [Flow]" entries. Each part is its own file.

### Anti-Pattern 5: Using `100vh` for Full-Screen Mobile

**What people do:** `min-height: 100vh` for the app container.

**Why it's wrong:** On mobile browsers (Safari iOS, Chrome Android), `100vh` includes the browser chrome (address bar), causing content to be hidden behind it.

**Do this instead:** `min-h-[100dvh]` — dynamic viewport height units (`dvh`) account for the browser chrome correctly.

---

## Integration Points

### Internal Boundaries

| Boundary | Communication | Rule |
|----------|---------------|------|
| Tokens → Primitives | Tailwind utility classes | Primitives never use hardcoded values |
| Primitives → Flow-parts | Props + className passthrough | No flow-specific logic in primitives |
| Flow-parts → Screens | Props (data passed down) | Parts are dumb; screens own data sourcing |
| Data layer → Screens | Direct import (or useMockData hook) | One import direction only |
| Router → Layouts | `<Outlet />` | Layouts never import specific screens |
| Layouts → Shell | AppShell wraps both AuthLayout and AppLayout | Shell is the outermost container |

### External Services (v1)

| Service | Status | Notes |
|---------|--------|-------|
| Backend API | Out of scope for v1 | Data layer designed for future swap |
| Authentication | Screens only, no real auth | Login/Register flows are UI-only |
| Chart library | To be selected | Needed for Insights flow; candidate: Recharts or Chart.js |

---

## Scaling Considerations

This is a frontend-only static SPA for v1. Scaling concerns are primarily about codebase complexity, not user load.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| v1 (9 flows, mock data) | Current structure is sufficient; no state manager needed |
| v2 (real API) | Replace `src/data/*.ts` exports with React Query hooks; types in `types.ts` remain unchanged |
| v2+ (auth) | Add auth context provider at router root; redirect logic in layout routes |
| v3+ (real-time) | WebSocket layer added to data hooks; screen components unchanged |

---

## Sources

- Tailwind CSS v4 `@theme` directive and token pipeline: https://tailwindcss.com/docs/theme (verified via WebFetch, 2026-04-05)
- React Router v7 layout routes and `<Outlet />` pattern: https://reactrouter.com/start/framework/routing (verified via WebFetch, 2026-04-05)
- Costra project requirements: `.planning/PROJECT.md`
- Storybook taxonomy (122 entries, Foundations + Components + Screens by flow): `.planning/PROJECT.md` context section
- `100dvh` vs `100vh` mobile viewport: established browser compatibility pattern (Safari 15.4+, Chrome 108+)

---

*Architecture research for: Costra — React + TS + Tailwind + Vite + React Router v6 mobile-web SPA*
*Researched: 2026-04-05*
