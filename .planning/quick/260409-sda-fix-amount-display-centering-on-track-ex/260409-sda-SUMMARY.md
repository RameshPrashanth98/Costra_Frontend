---
quick_id: 260409-sda
description: Fix amount display centering on Track expense and income screens
date: 2026-04-09
status: complete
commit: ce260cc
files_changed: 1
---

# Summary: Fix amount display centering

## What Changed

The `Rs.` prefix + amount input row was left-aligned within the centered container. Added `justify-center` and `width: 100%` to the flex row so the entire amount display is properly centered on both Expense and Income tabs.

### Files Modified

- `src/flows/track/screens/TrackScreen.tsx` — Added justify-center and full width to amount input flex row

## Commit

- `ce260cc` — fix: center amount display on Track expense/income screens
