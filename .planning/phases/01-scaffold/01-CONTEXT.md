# Phase 1: Scaffold - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Stand up a working Vite + React + TypeScript + Tailwind + React Router v6 project skeleton with a correctly configured mobile-web shell (viewport, dvh, safe-area) and route tree with layout routes (`AuthLayout`, `AppLayout`) each rendering `<Outlet />`. No design tokens are defined in this phase (that's Phase 2). No primitives or screens are built (that's Phase 3+). This phase is infrastructure only — the acceptance gate is: `npm run dev` works, routes resolve, no blank screens, production build succeeds, and the four foundational pitfalls (vh, safe-area, Outlet, code-splitting) are permanently prevented.

</domain>

<decisions>
## Implementation Decisions

User delegated all scaffold decisions to Claude ("I have no idea, do it in your best way"). All decisions below are Claude's recommended defaults, grounded in the research in `.planning/research/`.

### Package Manager
- **npm** — zero extra setup, universal tooling, single-developer frontend project has no pnpm/monorepo pressure, lockfile is `package-lock.json`
- Node version: ≥ 20.x (Vite 5/6 requirement; 20 LTS is the safe floor)

### Build Tooling
- **Vite** (latest stable) with `@vitejs/plugin-react`
- **TypeScript 5.x** with `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- Path alias: `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts` via `resolve.alias`)
- Vite config includes `@tailwindcss/vite` plugin (Tailwind v4 plugin, not PostCSS-based)

### CSS / Tailwind
- **Tailwind CSS v4** (latest) via the Vite plugin
- **No `tailwind.config.js`** — tokens will live in `src/tokens/index.css` using `@theme` (Phase 2 work, but the file is created empty in Phase 1 so the import path is valid)
- Root CSS file: `src/index.css` with `@import "tailwindcss"` and `@import "./tokens/index.css"`
- Font: Nunito Sans (from Costra DS) loaded via `@fontsource/nunito-sans` or CDN — exact wiring deferred to Phase 2; Phase 1 uses system-ui as a temporary fallback

### Routing
- **React Router v6** (latest 6.x) using `createBrowserRouter` + `RouterProvider`
- Route tree structured as **layout routes with Outlet**:
  - `/` → `AuthLayout` → Outlet (children: `splash`, `welcome`, `onboarding`, `register`, `login`)
  - `/app` → `AppLayout` → Outlet (children: `home`, `track`, `wallet`, `insights`, `profile`)
- **Route-level code splitting** via `React.lazy(() => import("..."))` wrapped in `<Suspense fallback={...}>` — set up from day one, not retrofitted (PITFALLS.md #7)
- Every layout/screen component imported through lazy — verified in Vite build output as separate chunks

### Mobile-Web Shell
- `index.html` meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (PITFALLS.md #2 prerequisite for safe-area)
- App shell class: `min-h-[100dvh]` (dynamic viewport height, not `100vh` — iOS Safari fix)
- Safe-area handling: `tailwindcss-safe-area` plugin **OR** native Tailwind v4 `safe-*` utilities if available in v4 — planner/researcher confirms which path Tailwind v4 supports
- Touch targets: Tailwind v4 handles via utilities at component level (Phase 3), but `body { touch-action: manipulation }` is set globally in Phase 1 to kill iOS 300ms tap delay
- Container strategy: `max-w-md mx-auto` applied at the layout level — phone-width on tablets/desktop

### Folder Structure
Based on `research/ARCHITECTURE.md`. Create these directories in Phase 1 (empty except for the minimum scaffold files needed):

```
src/
├── main.tsx                  # Vite entry
├── App.tsx                   # Router provider + root suspense
├── index.css                 # Tailwind + tokens import
├── router.tsx                # createBrowserRouter definition
├── tokens/
│   └── index.css             # @theme file (empty in Phase 1, filled in Phase 2)
├── layouts/
│   ├── AuthLayout.tsx        # <Outlet /> + auth-side shell
│   └── AppLayout.tsx         # <Outlet /> + app-side shell + BottomNav slot
├── flows/
│   ├── splash/               # (created empty)
│   ├── welcome/
│   ├── onboarding/
│   ├── register/
│   ├── login/
│   ├── home/
│   ├── track/
│   ├── wallet/
│   ├── insights/
│   └── profile/
├── components/
│   └── primitives/           # (created empty, filled Phase 3)
├── data/                     # (created empty, filled Phase 3)
├── types/                    # (created empty, filled Phase 3)
├── utils/                    # (created empty)
└── hooks/                    # (created empty)
```

Three-tier component layering (primitives → flow-parts → screens) is established in structure now; content comes in later phases.

### Lint / Format
- **ESLint** with `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`
- **Prettier** + `prettier-plugin-tailwindcss` (enforces consistent Tailwind class ordering — important because dynamic class names are a purging pitfall)
- Config committed in Phase 1 so every subsequent phase writes conforming code from the start
- No git hooks (husky/lint-staged) — out of scope, keep setup minimal

### Placeholder UX (what Phase 1 renders)
Since no tokens or primitives exist yet, Phase 1 renders deliberately minimal placeholders — **just enough to prove routing, Outlet, and code-splitting work**. Not design-faithful — those come in Phase 4+.

- `AuthLayout`: centered "Costra" text + `<Outlet />`
- `AppLayout`: "Costra App" header + `<Outlet />` + placeholder bottom bar area (empty div with reserved height)
- Each child route (splash, welcome, home, track, etc.): renders a centered `<h1>` with its route name and a link back to `/` — 9+ placeholder components total
- Root `/` redirects to `/splash`
- Any unknown route renders a simple "Not Found" page

### Verification Built Into Phase 1 Definition
These are checked at end of Phase 1 as success criteria:
1. `npm run dev` starts cleanly
2. `npm run build && npm run preview` succeeds
3. Network tab shows separate chunks per lazy route
4. Visiting every placeholder route resolves without a blank screen
5. `index.html` viewport meta includes `viewport-fit=cover`
6. App shell container uses `min-h-[100dvh]`
7. Both layouts render `<Outlet />`

### Claude's Discretion
The entire phase — user delegated all decisions. Claude picks defaults from STACK.md, ARCHITECTURE.md, and PITFALLS.md. Any further ambiguity (exact dev-dep versions, ESLint rule tuning, placeholder page copy) is Claude's call during planning/execution.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level
- `.planning/PROJECT.md` — Vision, core value, constraints, tech stack lock
- `.planning/REQUIREMENTS.md` — v1 requirements (FND-01, FND-02, FND-03, FND-04 for this phase)
- `.planning/ROADMAP.md` §Phase 1 — Phase goal and success criteria
- `.planning/STATE.md` — Project memory

### Research (mandatory read)
- `.planning/research/SUMMARY.md` — Executive synthesis
- `.planning/research/STACK.md` — Library choices, versions, mobile-web patterns, LKR formatting
- `.planning/research/ARCHITECTURE.md` — Folder structure, token pipeline, layout routes, build order, mock data pattern
- `.planning/research/PITFALLS.md` — 13 critical pitfalls (Phase 1 owns prevention of #2 viewport, #5 Outlet, #7 code splitting)
- `.planning/research/FEATURES.md` — 9 flows and their feature inventory (downstream for Phase 4+)

### External (to be verified by researcher during plan-phase)
- Tailwind CSS v4 `@theme` docs: https://tailwindcss.com/docs/theme
- React Router v6 `createBrowserRouter` + layout routes docs: https://reactrouter.com/
- Vite React plugin docs: https://vitejs.dev/
- Costra Design System Storybook: https://costra-design-system.vercel.app/

No external ADRs or specs exist in-repo. Research files ARE the authoritative specs for this project.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
None — greenfield project. Phase 1 creates the initial file tree.

### Established Patterns
None yet. Phase 1 establishes the patterns (folder structure, naming, lazy imports, layout routes, dvh shell) that all subsequent phases inherit.

### Integration Points
- Phase 2 (Design Tokens) plugs into `src/tokens/index.css` — Phase 1 creates this as an empty `@theme` file so the import path is valid
- Phase 3 (Primitives + Mock Data) fills `src/components/primitives/`, `src/data/`, `src/types/` — Phase 1 creates these directories empty
- Phase 4+ (Flows) fills `src/flows/<flow>/screens/` + `src/flows/<flow>/parts/` — Phase 1 creates flow directories with placeholder route components

</code_context>

<specifics>
## Specific Ideas

User delegated full discretion. No specific references, mockups, or "I want it like X" moments. All decisions grounded in `.planning/research/` findings.

</specifics>

<deferred>
## Deferred Ideas

None — Phase 1 stayed within scaffold scope. The following are explicitly NOT in Phase 1 and belong to later phases:

- Design token extraction and `@theme` population → **Phase 2**
- Font loading (Nunito Sans) wiring → **Phase 2** (temporary system-ui fallback in Phase 1)
- UI primitives (Button, Input, Card, BottomNav, etc.) → **Phase 3**
- Mock data layer (types, transactions, wallets) → **Phase 3**
- `formatLKR` utility → **Phase 3**
- Screen implementations → **Phase 4–6**
- Framer Motion route transitions → **Phase 7**
- Production Lighthouse audit → **Phase 7**
- Git hooks, test infrastructure, CI/CD → Out of scope for v1

</deferred>

---

*Phase: 01-scaffold*
*Context gathered: 2026-04-05*
