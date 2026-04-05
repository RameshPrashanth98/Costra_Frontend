# Costra — Cost of Living Tracker (Frontend)

## What This Is

Costra is a mobile-web cost of living tracker for Sri Lankan users. This project is the **frontend implementation** — a React + TypeScript + Tailwind application built from an already-designed system and hi-fi screens, rendering a working app with hardcoded data that mirrors the real user flows.

## Core Value

A Sri Lankan user can open Costra on their phone and move through every designed flow (onboarding → tracking expenses → viewing insights → managing wallet/profile) in a working, polished, production-quality frontend that faithfully reflects the hi-fi designs and the Costra design system.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. Derived from the design system's 9 flows. -->

- [ ] Project scaffold: Vite + React + TypeScript + Tailwind CSS + React Router v6
- [ ] Design tokens extracted from Costra design system (colors, typography, spacing, radius, shadows, elevation, grid, iconography) and wired into Tailwind config
- [ ] Core UI primitives matching design system components (Buttons, Inputs, Cards, Nav, etc.)
- [ ] Splash flow screens
- [ ] Welcome screen
- [ ] Onboarding flow screens
- [ ] Register flow screens
- [ ] Login flow screens
- [ ] Home flow screens (dashboard / main landing)
- [ ] Track flow screens (log expenses, categories, amounts in LKR)
- [ ] Wallet flow screens
- [ ] Insights flow screens (spending analytics / charts)
- [ ] Profile flow screens
- [ ] Mobile-web responsive layout (phone-first, app-like feel)
- [ ] Navigation wired between flows (React Router v6)
- [ ] Hardcoded data layer (mock expenses, wallets, insights — structured to be swappable later)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Backend / real API integration — v1 uses hardcoded data only; the data layer will be structured for future swap
- Authentication logic (real signup/login, sessions, tokens) — screens will be built but not wired to a real auth backend
- Native mobile apps (iOS/Android via React Native or Flutter) — this is a mobile-web app
- Desktop-first responsive design — mobile-first only; desktop is not a target surface
- Multi-currency support — LKR only for v1
- Localization (Sinhala/Tamil) — English only for v1 unless designs specify otherwise
- Offline mode / PWA installability — not targeted for v1
- Analytics / telemetry / crash reporting — out of scope
- Testing infrastructure beyond basic type safety — no test suite required for v1

## Context

**Design system (source of truth):**
- Storybook: https://costra-design-system.vercel.app/
- 122 total entries across Foundations, Components, and Screens
- **Foundations:** Color, Typography, Spacing, Elevation, Grid, Iconography, Border and Radius
- **Flow Parts (components):** Splash (9), Onboarding (9), Register (7), Login (3), Home (8), Track (3), Wallet (4), Insights (3), Profile (3)
- **Screens (compositions):** Welcome (1), Splash flows, Onboarding (4), Register Flow (5), Login Flow (2), Home Flow (7), Track Flow (4), Wallet Flow (3), Insights Flow (2), Profile Flow (2)

**Hi-fi designs:** User will upload hi-fi screen images **screen-by-screen** as each phase is built. No upfront batch upload — planning and implementation happen incrementally against each uploaded screen.

**User / market:** Sri Lankan users tracking personal cost of living. Currency is LKR. Category taxonomy and financial framing should fit Sri Lankan daily spending patterns (to be reflected in what the hi-fi designs specify).

**Design system fetch limitation:** Storybook docs page returns the app shell via WebFetch; full token values must be extracted by reading individual foundation pages (Color, Typography, etc.) or inferred from the uploaded hi-fi designs as they arrive. Token extraction will be a dedicated early phase.

## Constraints

- **Tech stack**: React + TypeScript + Tailwind CSS + Vite + React Router v6 — user-specified
- **Platform**: Mobile-web (responsive, phone-first) — user-specified
- **Data**: Hardcoded values only for this milestone — no backend, no persistence beyond the mock data layer
- **Design fidelity**: Must match the Costra design system and uploaded hi-fi screens — pixel-faithful implementation is the primary quality bar
- **Workflow**: Screens arrive incrementally — planning must accommodate screen-by-screen delivery, not a single upfront design dump
- **Scope**: Frontend only — no backend work in this repo

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vite + React + TS scaffold | Fast dev loop, modern defaults, matches user's stated stack preference | — Pending |
| Tailwind CSS for styling | User-specified; tokens map cleanly to Tailwind config | — Pending |
| React Router v6 for navigation | Standard SPA routing, sufficient for mobile-web flows | — Pending |
| Hardcoded mock data layer (not real API) | Frontend-only milestone; avoids backend coupling; structured for future swap | — Pending |
| Screen-by-screen design delivery | User prefers incremental uploads; plans adapt per screen as uploads arrive | — Pending |
| Extract tokens from Storybook + infer from hi-fi | WebFetch on Storybook shell is limited; combine DS Storybook pages with visual extraction from hi-fi images | — Pending |
| LKR-only, English-only for v1 | Narrower scope = faster ship; localization/multi-currency deferred | — Pending |

---
*Last updated: 2026-04-05 after initialization*
