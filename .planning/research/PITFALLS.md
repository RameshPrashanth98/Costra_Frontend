# Pitfalls Research

**Domain:** React + TypeScript + Tailwind mobile-web frontend built from a design system and hi-fi screens (Costra)
**Researched:** 2026-04-05
**Confidence:** HIGH (verified against official Tailwind docs, React Router v6 docs, MDN, and domain patterns)

---

## Critical Pitfalls

### Pitfall 1: Tailwind Token Namespace Mismatch — Tokens Defined But No Utilities Generated

**What goes wrong:**
Design tokens extracted from the Costra design system (colors, spacing, radius, shadows) are placed under incorrect CSS variable namespaces in the Tailwind `@theme` block. The result is CSS variables that exist in `:root` but generate zero utility classes. Developers then write raw `style={{}}` overrides or hardcode hex values directly in JSX, abandoning the token system entirely.

**Why it happens:**
Tailwind v4 generates utilities only from documented namespaces. If a color is registered as `--brand-primary` instead of `--color-brand-primary`, no `bg-brand-primary`, `text-brand-primary`, or `border-brand-primary` classes are generated. The browser inspector shows the variable exists but `class="bg-brand-primary"` has no CSS backing it.

**How to avoid:**
Map every Costra token to the correct Tailwind namespace at the start of the tokens phase:
- Colors → `--color-[name]`
- Spacing → `--spacing-[name]`
- Border radius → `--radius-[name]`
- Shadows → `--shadow-[name]`
- Typography size → `--text-[name]`
- Font family → `--font-[name]`

Create a token audit table during the tokens phase listing: DS token name → CSS variable name → Tailwind class that should exist → verified with a test component.

**Warning signs:**
- `class="bg-primary"` appears in JSX but the element is unstyled
- Inline `style={{ color: '#...' }}` appears more than once per screen
- Computed styles in browser DevTools show `--color-primary` at `:root` but `background-color: transparent` on the element

**Phase to address:** Tokens phase (Phase 2) — must be caught and verified before any screen implementation begins.

---

### Pitfall 2: `--*: initial` Wipes All Default Tailwind Utilities

**What goes wrong:**
When resetting only the color namespace (to replace Tailwind's default palette with Costra's palette), using `--*: initial` instead of `--color-*: initial` silently removes every default utility — spacing, sizing, typography, flex, grid, everything. The app still runs but 90% of classes produce no output. This surfaces slowly as layout and spacing utilities mysteriously stop working.

**Why it happens:**
The syntax looks safe ("I'm just resetting things") but `--*: initial` is a global reset of all theme variables. Documented behavior in Tailwind v4, but the consequences are non-obvious.

**How to avoid:**
Only reset the namespace being replaced:
```css
@theme {
  --color-*: initial;   /* Reset only Tailwind's default colors */
  --color-primary: #...;
  --color-surface: #...;
}
```
Never use `--*: initial` unless you intend to rebuild the entire design system from scratch.

**Warning signs:**
- `p-4`, `flex`, `w-full` classes stop applying after the token config is touched
- All margins and padding collapse simultaneously
- The component library looks unstyled despite classes being present

**Phase to address:** Tokens phase (Phase 2) — add a post-config smoke test: render a div with `p-4 flex text-sm` and verify it has padding, display:flex, and font-size.

---

### Pitfall 3: Dynamic Tailwind Class Names — Purged at Build Time

**What goes wrong:**
Screen or component code builds class names via string interpolation: `` `bg-${color}-500` ``, `` `text-${variant}` ``, or `` `rounded-${size}` ``. In development (with hot reload) this works because all CSS is present. In the Vite production build, Tailwind's content scanner finds no complete class name tokens, so none of those classes are included in the output CSS. The production build renders unstyled components.

**Why it happens:**
Tailwind scans source files as plain text looking for complete tokens. `bg-${color}-500` is never a complete token — it's a template fragment. The scanner discards it.

**How to avoid:**
Use a static lookup map for any variant-driven class selection:
```tsx
const bgVariants = {
  primary: 'bg-color-primary',
  danger: 'bg-color-error',
  success: 'bg-color-success',
} as const;
```
Never concatenate class name fragments. This is especially important for the Button, Badge, and Category chip components in Costra which will likely have color/variant props.

**Warning signs:**
- Component looks correct in `npm run dev` but breaks after `npm run build && npm run preview`
- CSS output file is unexpectedly small (< 20 KB for a full app)
- Specific color variants work for one instance but not another

**Phase to address:** Primitives phase (Phase 3) — establish the static lookup map pattern in the first Button/Badge component so all subsequent components follow it.

---

### Pitfall 4: The 100vh Bug on iOS Safari — Full-Screen Layouts Broken

**What goes wrong:**
`height: 100vh` on a full-screen container equals the viewport height when the iOS Safari address bar is hidden (maximum viewport). When the user taps an input field and the address bar reappears, the visual viewport shrinks but the layout viewport does not — the bottom of the container is clipped behind the address bar. For an app-like mobile UI like Costra (full-height screens, bottom nav), this manifests as content or the bottom nav bar being obscured.

**Why it happens:**
Mobile browsers maintain two viewports: the layout viewport (stable, used for `vh`) and the visual viewport (shrinks when the address bar appears or keyboard opens). `100vh` is relative to the layout viewport — which is the maximum possible height — not the current visible area.

**How to avoid:**
Replace `100vh` with `100dvh` (dynamic viewport height) for any full-screen containers:
```css
.screen-container {
  height: 100dvh;    /* shrinks when address bar appears */
  /* fallback for older browsers: */
  height: 100vh;
  height: 100dvh;
}
```
In Tailwind, add `h-dvh` as a custom utility or use `min-h-dvh`. Tailwind v3.4+ includes `dvh`, `svh`, `lvh` support natively.

Also add the viewport meta tag to ensure the browser uses the full screen width:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
`viewport-fit=cover` is required to extend the layout into the notch/home indicator area (prerequisite for safe area insets to work).

**Warning signs:**
- Bottom navigation bar is partially hidden behind the browser chrome on iOS
- Login / onboarding screens have a visible white gap at the bottom
- Forms look correct on Android but broken on iPhone

**Phase to address:** Scaffold phase (Phase 1) — set the viewport meta tag and a global `min-h-dvh` base class before any screen is built.

---

### Pitfall 5: Missing Safe Area Insets — Content Behind Notch and Home Indicator

**What goes wrong:**
With `viewport-fit=cover`, the app extends into the notch and home indicator areas. Without `env(safe-area-inset-*)` padding, interactive elements (bottom navigation buttons, form submit buttons, close icons) are physically unreachable behind the home indicator bar on iPhone X and later. The hi-fi designs in Costra likely account for this — the implementation will look wrong if safe area is not applied.

**Why it happens:**
Developers set `viewport-fit=cover` to remove the white bars, then forget that the safe area insets are now their responsibility. Safe area values are zero on desktop and in Android until the keyboard or bottom bar clips content.

**How to avoid:**
For the bottom navigation bar (which Costra has across all main flows):
```css
.bottom-nav {
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
}
```
For any content that must not go behind the notch:
```css
.top-bar {
  padding-top: env(safe-area-inset-top, 0px);
}
```
Add Tailwind utilities for safe area padding in the token config:
```css
@theme {
  --spacing-safe-bottom: env(safe-area-inset-bottom, 0px);
}
```

**Warning signs:**
- Bottom nav buttons are unresponsive on physical iPhone (the home indicator is covering them)
- Status bar text is hidden behind content on iPhone
- Android Chrome looks fine but iOS Safari breaks

**Phase to address:** Scaffold phase (Phase 1) and Bottom Nav primitive (Phase 3) — the scaffold sets `viewport-fit=cover` and the bottom nav component bakes in safe-area padding from day one.

---

### Pitfall 6: Touch Target Too Small — Tappable Elements Below 44x44px

**What goes wrong:**
Costra's UI likely has icon buttons (close, back, menu), tab bar items, and small action links. If these render below 44x44 CSS pixels, a significant proportion of taps miss the target — especially on low-cost phones with less precise touch digitizers common in the Sri Lankan market. Users report "the button doesn't work" when in fact they are missing it.

**Why it happens:**
Hi-fi screens are designed at high resolution and look correct in Figma. When implemented at actual device pixel ratios, visual sizes translate but tap targets are not explicitly sized — a 20px icon has a 20px tap area unless the developer explicitly adds padding.

**How to avoid:**
Establish a `min-touch` class in the token config:
```css
.min-touch {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```
Apply it to every icon button wrapper. For tab bar items, ensure the whole tab area (icon + label) is the tappable target, not just the icon.

Google Material Design recommends 48x48dp minimum; Apple HIG recommends 44x44pt minimum. Use the larger value (48px) given the device diversity in the Sri Lankan market.

**Warning signs:**
- Tapping close/back buttons requires multiple attempts on a real phone
- The DevTools "Tap Targets" audit (Lighthouse) flags warnings
- Users tap near a button and nothing happens

**Phase to address:** Primitives phase (Phase 3) — create the `min-touch` wrapper component used consistently across all interactive icon elements before screens are built.

---

### Pitfall 7: Rebuilding Design System Components Instead of Extracting and Reusing Them

**What goes wrong:**
When implementing screens, developers write new Buttons, Cards, Input fields, and nav elements from scratch (reading the hi-fi screen pixel-by-pixel) rather than first building the design system primitives library and then composing screens from it. The result is three slightly different Button implementations, four Card layouts with inconsistent border radius, and a screen-level maintenance nightmare. Changes to the design system require updating every screen instead of one primitive.

**Why it happens:**
Screen-by-screen delivery creates pressure to "just build this screen now." Without a primitives-first rule, it feels faster to inline styles per screen. The Storybook design system has explicit component sections (Splash 9 components, Register 7 components, etc.) that map directly to reusable primitives — but only if the team recognises them as primitives, not screen-specific elements.

**How to avoid:**
Before any screen implementation begins, build the complete primitives library from the design system's component sections:
- Buttons (primary, secondary, ghost, icon)
- Inputs (text, password, with label, with error)
- Cards (expense card, wallet card, insight card)
- Bottom navigation bar
- Top app bar / header
- Category chips / badges
- Amount display (LKR formatted)

Each primitive maps to the Storybook component entry. Screens then compose these primitives — no inline one-off styling.

**Warning signs:**
- The same button style appears in two different JSX files as a `<button className="...">` instead of `<Button variant="primary">`
- Changing the border radius requires touching 8 files
- Two screens use different fonts for the same "expense amount" element

**Phase to address:** Primitives phase (Phase 3) — this phase must be completed before any screen phase begins. Make the primitives library the acceptance gate for Phase 3.

---

### Pitfall 8: Over-Engineering the Mock Data Layer

**What goes wrong:**
The hardcoded data layer grows into a mini-backend: custom hook factories, derived state computations, pagination logic, filter functions, reducer patterns, and fake API delay simulation. The resulting system takes longer to build than the screens themselves and adds complexity that must be maintained. Since v1 explicitly swaps this for a real API later, every hour spent on mock infrastructure is waste.

**Why it happens:**
Engineers apply production data patterns to mock data ("we'll need this structure anyway"). The instinct is correct in spirit but wrong in timing — the shape of the real API is unknown, and the mock will be deleted when the real API arrives.

**How to avoid:**
The mock data layer should be:
1. Plain TypeScript objects in `/src/data/` — no classes, no hooks, no factories
2. Static arrays for: expenses, wallets, categories, insights
3. One file per domain: `expenses.ts`, `wallets.ts`, `insights.ts`, `categories.ts`
4. Named exports consumed directly: `import { mockExpenses } from '@/data/expenses'`
5. TypeScript interfaces that match what the real API will return (this is the only investment worth making)

No simulated delays, no fake loading states, no mock service workers, no localStorage sync. Those are real API concerns.

**Warning signs:**
- The `/src/data/` directory has more than 5 files
- Any file in `/src/data/` contains a function more complex than a simple sort or filter
- Mock data hooks use `useReducer` or `useContext`

**Phase to address:** Scaffold phase (Phase 1) — establish the data layer structure and the "no mock infrastructure" rule before any screen is built.

---

### Pitfall 9: LKR Currency Formatting Inconsistency Across Screens

**What goes wrong:**
Expense amounts appear in multiple formats across Costra's screens: `Rs. 1500`, `LKR 1,500.00`, `1500.00`, `Rs.1,500`, `1,500`. Every developer building a different screen makes a formatting assumption. The resulting UI looks unprofessional and locally incorrect for Sri Lankan users who have specific expectations around how rupees display.

**Why it happens:**
There is no centralised formatting utility established early. JavaScript's `Intl.NumberFormat` supports LKR but requires configuration, and developers writing screen components inline their own formatting logic rather than calling a shared utility. The hi-fi screens show the correct format in a static design but do not enforce it in code.

**How to avoid:**
Create a single utility function in the primitives or scaffold phase:
```typescript
// src/utils/currency.ts
export const formatLKR = (amount: number): string => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  // Output: "LKR 1,500.00" — verify this matches hi-fi design exactly
};
```
Verify the output string format matches the Costra design system's typography specs (the hi-fi screens show the exact symbol and decimal treatment). If the design uses `Rs.` rather than `LKR`, wrap `Intl.NumberFormat` and post-process. All Amount display components call this function — never format inline.

**Warning signs:**
- `toFixed(2)` appears directly in JSX
- `Rs.` and `LKR` appear on the same screen
- Amounts are missing thousands separators

**Phase to address:** Primitives phase (Phase 3) — the `Amount` / `CurrencyDisplay` primitive component encapsulates `formatLKR` and is the only place currency formatting occurs.

---

### Pitfall 10: React Router v6 Blank Screens from Missing `<Outlet />`

**What goes wrong:**
Nested routes render nothing. The URL changes correctly, the route definition matches, but the screen is blank. This is the single most common React Router v6 bug and it is invisible in the route config.

**Why it happens:**
In React Router v6, parent route components must explicitly render `<Outlet />` for child routes to appear. A layout component that wraps the app (bottom nav + top bar + content area) must place `<Outlet />` exactly where the active screen should render. If it is omitted, every route inside the layout silently renders nothing.

The same applies to pathless layout routes used to share the nav chrome without adding URL segments.

**How to avoid:**
Every parent route component in the Costra route tree must have `<Outlet />`. The main layout (shared across Home, Track, Wallet, Insights, Profile flows) looks like:
```tsx
function AppLayout() {
  return (
    <div className="flex flex-col h-dvh">
      <TopBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />  {/* required */}
      </main>
      <BottomNav />
    </div>
  );
}
```

Index routes are needed for each parent to avoid blank content when navigating to the parent URL:
```tsx
<Route path="/home" element={<AppLayout />}>
  <Route index element={<HomeDashboard />} />
  <Route path="expense/:id" element={<ExpenseDetail />} />
</Route>
```

**Warning signs:**
- Navigating to a route changes the URL but the screen is blank
- The correct component appears in React DevTools but renders nothing visually
- Removing the nested route structure makes the component render

**Phase to address:** Scaffold phase (Phase 1) — establish the route tree skeleton with `<Outlet />` in every layout before any screens are built, and smoke-test each route renders a placeholder.

---

### Pitfall 11: NavLink Active State Breaks with v5 API

**What goes wrong:**
Bottom navigation active state (the highlighted tab) does not work. `NavLink` with `activeClassName="active"` is a v5 API that silently does nothing in v6 — the prop is ignored, no error is thrown, and all tabs appear inactive.

**Why it happens:**
React Router v6 changed `NavLink`'s active styling API. The `activeClassName` and `activeStyle` props were removed. Documentation examples from v5 tutorials (still widely referenced) use the old API.

**How to avoid:**
Use the v6 function signature:
```tsx
<NavLink
  to="/home"
  className={({ isActive }) =>
    isActive ? 'text-primary' : 'text-muted'
  }
>
  <HomeIcon />
</NavLink>
```

**Warning signs:**
- All bottom nav tabs look identical (none highlighted)
- `activeClassName` or `activeStyle` appears in the NavLink JSX
- The active tab changes URL correctly but the icon/label color does not change

**Phase to address:** Scaffold phase (Phase 1) and Bottom Nav primitive (Phase 3).

---

### Pitfall 12: Hi-Fi to Implementation Mismatch from Incremental Screen Delivery

**What goes wrong:**
Because hi-fi screens arrive one-by-one rather than all at once, later screens reveal design decisions that contradict earlier implementations. The Home screen is built with `spacing-4` gaps, then the Wallet screen arrives with `spacing-3` gaps, and the discrepancy reveals that the original token mapping was wrong — or that the developer eyeballed the gap instead of using the correct token. Fixing this requires touching every built screen.

**Why it happens:**
Early screens are built without verified tokens. The developer estimates that a gap looks like 16px in the design, uses `p-4`, and moves on. When a new screen with a clear spacing reference arrives later, the error becomes apparent across all previous work.

**How to avoid:**
- Extract all foundation tokens before building any screen (not in parallel with screen building)
- Use the Costra Storybook foundation pages (Color, Typography, Spacing, Elevation, Grid, Border and Radius) to get ground-truth values before implementation
- Build a visual token reference component (a simple dev-only page showing all token values rendered) in the tokens phase — verify it matches the Storybook before proceeding
- When a hi-fi screen arrives and a value looks off, check the token reference first before overriding

**Warning signs:**
- Spacing values like `p-[14px]` or `gap-[18px]` appear (arbitrary values instead of tokens)
- Multiple screens use different gap sizes for what the design calls the same "card gap"
- The token reference component shows a spacing value that does not match the hi-fi design

**Phase to address:** Tokens phase (Phase 2) must be fully complete before any screen phase (Phase 4+).

---

### Pitfall 13: Performance Degradation on Low-End Android Devices (Sri Lanka Device Profile)

**What goes wrong:**
The app performs well on a developer's MacBook in DevTools mobile emulation but is slow, janky, or crashes tabs on the low-to-mid range Android phones (Redmi, Samsung A-series, Realme) that constitute a large share of Sri Lanka's smartphone market. Specific symptoms: scroll jank on the expense list, slow transitions between flows, chart rendering freezing.

**Why it happens:**
Low-end Android phones (1.5–3 GB RAM, Snapdragon 400–600 series, 4G with variable latency) expose problems that are invisible on development hardware:
- Unoptimized chart libraries (recharts with large SVG payloads)
- Google Fonts loaded over the network on every cold start (300–800ms on 4G)
- JavaScript bundles not code-split (entire app parsed before first render)
- `box-shadow` and `filter: blur()` triggering GPU-expensive repaints on scroll
- Re-renders from uncontrolled `useEffect` dependencies on list components

**How to avoid:**
1. **Fonts:** Self-host or use `font-display: swap` with preload link tags. Do not load from Google Fonts on first render without preloading.
2. **Code splitting:** Each flow (Home, Track, Wallet, Insights, Profile) should be a lazy-loaded chunk via `React.lazy` + `Suspense`. The initial bundle should contain only the scaffold, routing, and splash/onboarding.
3. **Charts:** Use lightweight chart libraries (e.g., recharts with minimal data points). Avoid animating charts on mount — animation hits CPU hard on low-end chips.
4. **Shadows and blur:** Prefer `box-shadow` with a single layer over multi-layer shadows. Avoid `backdrop-filter: blur()` entirely on scroll containers — this is one of the most expensive CSS operations on low-end GPU.
5. **Lists:** Virtualize expense lists that exceed ~30 items using `@tanstack/react-virtual` if performance testing shows jank.
6. **Test on real hardware or CPU throttling:** Use Chrome DevTools CPU 4x–6x throttle and Network "Fast 3G" for all UI reviews.

**Warning signs:**
- `npm run build` produces a single JS chunk > 300KB (uncompressed)
- The fonts section of the Network tab shows Google Fonts requests without preload
- Scrolling the expense list shows dropped frames in the Performance panel
- `backdrop-filter` is used in any scroll container

**Phase to address:** Scaffold phase (Phase 1) for font strategy and route-level code splitting setup. Insights flow phase for chart performance. All screen phases — test with CPU throttling enabled.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline `style={{}}` for one-off overrides | Faster screen build | Token system bypassed; design changes require touching JSX files individually | Never — use a token or add a new token |
| Hardcoding hex values instead of token variables | Quicker | Not updatable; colors drift from design system on update | Never |
| Screen-level component definitions (Button defined inside HomeScreen.tsx) | Faster per screen | Cannot reuse across flows; inconsistent appearances | Never after primitives phase is complete |
| `any` TypeScript for mock data shape | Skips type design | Real API integration is harder; no autocomplete | Never — the interface IS the contract |
| `useEffect` with empty `[]` to load mock data | Familiar pattern | Masks the simplicity — mock data is synchronous | Prefer direct import; `useEffect` is unnecessary for static mock data |
| Skipping `dvh` in favour of `vh` | Less typing | Broken full-screen on iOS | Never — `dvh` costs nothing |
| Dynamic class names via template literals | Flexible component API | Classes purged in production build | Never — use static lookup map |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Tailwind v4 `@theme` block | Forget namespace prefix (e.g., `--primary` instead of `--color-primary`) | Always use the documented namespace; verify a utility class generates for each token |
| React Router v6 `<Link>` and `<NavLink>` | Import from `react-router-dom` v5 mental model; use removed props | Import from `react-router-dom` v6; use `className={({ isActive }) => ...}` for NavLink |
| `env(safe-area-inset-bottom)` | Forget `viewport-fit=cover` in the meta tag — env values are always 0 without it | Set `viewport-fit=cover` in scaffold; env values then reflect device hardware |
| `Intl.NumberFormat` for LKR | Use `'en-US'` locale producing `LKR 1,500.00` with a space; verify expected format | Use `'en-LK'` locale; verify output against hi-fi design; wrap in a utility function |
| Vite code splitting with `React.lazy` | Lazy import paths are wrong after refactoring; silent runtime error | Use barrel exports carefully; test lazy routes in production build before shipping each flow |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unsplit JavaScript bundle | Slow first paint on cold start; all 9 flows parsed before splash screen renders | `React.lazy` per flow + `Suspense` with a loading fallback at route level | From the first build with 3+ flows implemented |
| `backdrop-filter: blur()` on scroll containers | Scroll jank on Snapdragon 400/600 devices; dropped frames in Performance panel | Avoid entirely in scroll containers; use solid backgrounds instead | Any device below ~Snapdragon 730 |
| Google Fonts without preload | 300–800ms font flash on 4G networks common in Sri Lanka | Self-host fonts or preload with `<link rel="preload">` | Every cold start on mobile networks |
| Multi-layer `box-shadow` tokens | Subtle on desktop; obvious repaint on scroll on low-end Android | Single-layer shadows; test scroll performance with CPU 4x throttle | Scroll containers with many cards |
| `useEffect` re-renders from unstable dependency arrays | Expense list re-renders on every parent render; visible flicker | Stable refs, `useMemo` for computed lists, or eliminate `useEffect` for static data | When expense list exceeds ~20 items |
| SVG-based charts re-rendering on parent state change | Chart animates from scratch on every currency toggle or filter change | `React.memo` on chart components; stable data prop references | Any chart with animation enabled |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Touch targets below 44px | Users repeatedly tap a button and nothing happens — especially common on low-cost devices with less accurate digitizers | Minimum 44x44px (preferably 48x48px) for all interactive elements; use padding to expand hit area without changing visual size |
| No keyboard-aware layout on input screens | Register/Login forms have submit buttons hidden behind the software keyboard on iOS; users cannot submit | Use `100dvh` + `overflow-y-auto` on the form container; test all forms with keyboard open on iOS and Android |
| Scroll position not reset on route navigation | Navigating from an expense detail back to the list lands mid-list, not at top | Use `ScrollRestoration` from React Router or reset scroll in `useEffect` on route mount |
| Missing active feedback on tap (no press state) | Buttons feel broken on mobile — users re-tap multiple times | Add `active:` Tailwind variants (scale, opacity) to all interactive elements; on mobile, 100ms visual feedback is expected |
| Amount input accepting text on LKR fields | Users enter "1,500" with a comma on Android; JS `parseFloat('1,500')` returns `1` | Use `type="number"` or strip non-numeric characters before parsing; display formatted, store raw number |

---

## "Looks Done But Isn't" Checklist

- [ ] **Tokens:** Every Costra color/spacing/radius token generates a Tailwind utility class — verify with a token reference test component, not just the CSS variable existing
- [ ] **Bottom nav:** Safe-area bottom padding applied; test on physical iPhone or iOS Simulator with home indicator visible
- [ ] **Full-screen layouts:** `h-dvh` used, not `h-screen` (which maps to `100vh`) — verify iOS Safari address bar does not clip content
- [ ] **LKR formatting:** All currency displays use `formatLKR()` utility; no raw `.toFixed(2)` or `Rs.` strings outside the utility
- [ ] **NavLink active state:** Bottom navigation active tab highlights correctly on every route; using v6 `className={({ isActive }) => ...}` API
- [ ] **Nested routes:** Every parent layout component has `<Outlet />`; navigating to each route renders the expected component, not a blank screen
- [ ] **Tailwind class purging:** Run `npm run build && npm run preview` and verify all component variants render correctly (color variants, size variants)
- [ ] **Touch targets:** Lighthouse "Tap Targets" audit passes; no target below 44px flagged
- [ ] **Code splitting:** Network tab in production build shows per-flow chunks, not a single large bundle
- [ ] **Font loading:** Fonts do not flash on first render; preload link tags present in `index.html`
- [ ] **Mock data type interfaces:** Every mock data object has a TypeScript interface defined — not typed as `any`

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Token namespace mismatch discovered after 3+ screens built | HIGH | Audit all class names in use; correct the `@theme` config; grep for inline `style={{}}` overrides; replace with token utilities screen by screen |
| `--*: initial` wipes default utilities | MEDIUM | Revert to specific namespace reset (`--color-*: initial`); re-test all screens for broken spacing/layout |
| Dynamic class names purged in production | MEDIUM | Replace all template literal class names with static lookup maps; re-run build and verify |
| 100vh bug found late | LOW | Replace `h-screen` / `h-[100vh]` with `h-dvh` globally via search/replace; add `dvh` to Tailwind config if not present |
| Missing safe area insets on bottom nav | LOW | Add `pb-[env(safe-area-inset-bottom)]` or equivalent to BottomNav component; re-test on iOS |
| Components duplicated across screens instead of primitives | HIGH | Extract into shared primitives retroactively; update all call sites; high risk of visual regressions |
| Over-engineered mock data layer | MEDIUM | Delete infrastructure code; replace with plain static exports; re-wire screen components to direct imports |
| RR v6 blank screen from missing Outlet | LOW | Add `<Outlet />` to the parent layout component; route renders immediately |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Tailwind token namespace mismatch | Phase 2 — Tokens | Token reference component renders all colors, spacing, radius with correct values |
| `--*: initial` global reset | Phase 2 — Tokens | Smoke test: `p-4 flex text-sm` still applies after token config |
| Dynamic class names purged | Phase 3 — Primitives | Run `npm run build && npm run preview`; all Button/Badge variants render |
| 100vh iOS bug | Phase 1 — Scaffold | Test full-screen container on iOS Safari with address bar visible |
| Missing safe area insets | Phase 1 — Scaffold + Phase 3 BottomNav | Test BottomNav on iOS Simulator; home indicator does not overlap buttons |
| Touch targets too small | Phase 3 — Primitives | Lighthouse Tap Targets audit; all icon buttons >= 44px |
| Rebuilding instead of reusing primitives | Phase 3 — Primitives | Code review gate: no screen phase PR contains a Button or Input defined locally |
| Over-engineered mock data layer | Phase 1 — Scaffold | Data directory contains only `.ts` files with static arrays; no custom hooks |
| LKR formatting inconsistency | Phase 3 — Primitives | Grep for `.toFixed`, `Rs.`, `LKR` strings outside `currency.ts` |
| RR v6 blank screen (missing Outlet) | Phase 1 — Scaffold | Navigate to every defined route; none returns a blank screen |
| NavLink active state broken | Phase 1 — Scaffold + Phase 3 BottomNav | Tap each bottom nav tab; active tab visually highlights |
| Hi-fi vs implementation mismatch | Phase 2 — Tokens (complete before screens) | Side-by-side screenshot comparison for first screen of each flow |
| Performance on low-end Android | Phase 1 (code splitting) + all screen phases | Lighthouse mobile audit on production build; LCP < 2.5s on Fast 3G |

---

## Sources

- Tailwind CSS v4 Theme documentation — https://tailwindcss.com/docs/theme (verified 2026-04-05, HIGH confidence)
- Tailwind CSS v4 Content/Class Detection documentation — https://tailwindcss.com/docs/detecting-classes-in-source-files (verified 2026-04-05, HIGH confidence)
- React Router v6 Upgrade Guide — https://reactrouter.com/6.28.0/upgrading/v5 (verified 2026-04-05, HIGH confidence)
- React Router v6 Concepts — https://reactrouter.com/6.28.0/start/concepts (verified 2026-04-05, HIGH confidence)
- MDN — Viewport concepts (layout viewport vs. visual viewport, dvh/svh/lvh units) — https://developer.mozilla.org/en-US/docs/Web/CSS/viewport_concepts (HIGH confidence)
- MDN — `env()` CSS function and safe-area-inset-* values — https://developer.mozilla.org/en-US/docs/Web/CSS/env (verified 2026-04-05, HIGH confidence)
- Apple Human Interface Guidelines — minimum touch target 44x44pt (MEDIUM confidence, JS-required page; value is well-established)
- Google Material Design — minimum touch target 48x48dp (HIGH confidence, established specification)
- Intl.NumberFormat MDN — LKR currency formatting with `en-LK` locale (HIGH confidence, standard web API)

---
*Pitfalls research for: Costra (React + TS + Tailwind mobile-web frontend, design system implementation)*
*Researched: 2026-04-05*
