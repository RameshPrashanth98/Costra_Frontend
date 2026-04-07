---
phase: quick
plan: 260407-ot4
subsystem: splash
tags: [splash, navigation, timeout]
dependency_graph:
  requires: []
  provides: [splash-screen-25s-display]
  affects: [SplashScreen.tsx]
tech_stack:
  added: []
  patterns: [setTimeout for auto-navigation]
key_files:
  created: []
  modified:
    - src/flows/splash/screens/SplashScreen.tsx
decisions:
  - Increased splash screen display duration to 25 seconds to give user more time on the splash screen before auto-navigating to onboarding
metrics:
  duration: 3 min
  completed: 2026-04-07
---

# Quick Task 260407-ot4: Increase Splash Screen Loading Time to 25s Summary

**One-liner:** Splash screen setTimeout changed from 2800ms to 25000ms — screen now stays visible for 25 seconds before navigating to /onboarding.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Update splash screen timeout to 25 seconds | cedb7a7 | src/flows/splash/screens/SplashScreen.tsx |

## What Was Done

Changed the single `setTimeout` delay in `SplashScreen.tsx` (line 92) from `2800` to `25000`. No other code was altered — all animations, layout, and navigation logic remain identical. The splash screen will now remain visible for 25 seconds before auto-navigating to `/onboarding`.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `src/flows/splash/screens/SplashScreen.tsx` exists and contains `25000`
- [x] Commit `cedb7a7` confirmed in git log
- [x] No remaining `2800` timeout value in the file
