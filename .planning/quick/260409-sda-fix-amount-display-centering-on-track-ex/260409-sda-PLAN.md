---
quick_id: 260409-sda
description: Fix amount display centering on Track expense and income screens
date: 2026-04-09
tasks: 1
---

# Quick Task: Fix amount display centering

## Task 1: Center the Rs. + amount input row

**Files:** `src/flows/track/screens/TrackScreen.tsx`
**Action:** Add `justify-center` and `width: '100%'` to the flex row containing the Rs. prefix and amount input.
**Verify:** Amount displays centered on both Expense and Income tabs.
**Done:** Amount is visually centered on screen.
