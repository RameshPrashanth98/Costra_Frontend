---
phase: quick
plan: 260407-pik
subsystem: onboarding
tags: [ui, layout, hifi-fidelity, onboarding, logo, hero-image]
dependency_graph:
  requires: []
  provides: [onboarding-slide1-hifi-fidelity]
  affects: [src/flows/onboarding/screens/OnboardingScreen.tsx]
tech_stack:
  added: []
  patterns: [inline-style-layout, centered-stacked-logo, fixed-height-hero]
key_files:
  modified:
    - src/flows/onboarding/screens/OnboardingScreen.tsx
decisions:
  - Removed CostraBrand component from OnboardingScreen.tsx (unused after inline replacement; other screens have their own local copies)
  - Used marginTop auto on hero outer div to push image to bottom of flex column
  - backgroundSize cover ensures image fills container regardless of aspect ratio
metrics:
  duration: ~8 min
  completed: 2026-04-07T12:57:13Z
---

# Quick Task 260407-pik: Rebuild Onboarding Slide 1 to Match HIFI Summary

**One-liner:** Centered stacked 48px logo + visible eyebrow label on slide 1, fixed 140px hero with cover sizing, and improved vertical spacing throughout onboarding carousel.

## What Was Built

Five targeted fixes applied to `OnboardingScreen.tsx` to bring slide 1 into HIFI fidelity:

1. **Centered stacked logo** — Replaced inline `CostraBrand` (row layout, 32x32 icon) with an inline column layout: 48x48 icon centered above "COSTRA" text.
2. **Logo AND eyebrow both visible** — Changed from either/or conditional (`hasLogo ? brand : eyebrow`) to sequential rendering — logo block first, then eyebrow below (always when `slide.eyebrow` exists). Eyebrow is center-aligned and has `marginTop: 14` when below a logo.
3. **Duplicate card fix** — Root cause was `flex: 1` on the hero container making it grow to fill remaining space, causing visual overlap with the card area. Removed `flex: 1`.
4. **Hero image visible** — Fixed hero container to `height: 140`, `backgroundSize: 'cover'` (was `'100% auto'`), outer div uses `marginTop: 'auto'` to push to bottom of flex column.
5. **Spacing improvements** — Logo+eyebrow block: `marginBottom: 20` (was 16). Title: `marginBottom: 12` (was 10). Body: `marginBottom: 18` (was 16). Card: `marginBottom: 16` (was 14).

Slides 2-4 are unaffected — the eyebrow-only path (`!hasLogo`) renders exactly as before.

## Tasks

| # | Task | Status | Commit |
|---|------|--------|--------|
| 1 | Fix centered logo, eyebrow visibility, duplicate card, and hero image | Done | 28518a3 |
| 2 | checkpoint:human-verify | Awaiting | — |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed unused CostraBrand function**
- **Found during:** Task 1
- **Issue:** After replacing CostraBrand usage with inline centered layout, the `CostraBrand` function declaration remained in the file. `noUnusedLocals: true` in tsconfig caused a hard TS6133 error (exit code 2).
- **Fix:** Removed the `CostraBrand` function from `OnboardingScreen.tsx`. Other screens (LoginScreen, RegisterScreen) each have their own local copy of CostraBrand so no other file is affected.
- **Files modified:** `src/flows/onboarding/screens/OnboardingScreen.tsx`
- **Commit:** 28518a3 (included in Task 1 commit)

## Self-Check: PASSED

- `src/flows/onboarding/screens/OnboardingScreen.tsx` — exists and modified
- Commit `28518a3` — verified in git log
- TypeScript: `npx tsc --noEmit` exits 0 with no errors
