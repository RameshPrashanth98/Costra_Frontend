---
quick_id: 260409-rz2
description: Fix amount input on Track Expense and Income screens to allow manual entry
date: 2026-04-09
status: complete
commit: 16d5645
files_changed: 1
---

# Summary: Fix amount input on Track screens

## What Changed

The amount field on the Track screen (both Expense and Income tabs) was a static `<p>` element — users could only set amounts via quick-amount buttons. Replaced it with an editable `<input>` field:

- `inputMode="decimal"` for mobile numeric keyboard
- Strips non-numeric characters except decimal point
- Clears "0.00" on focus for easy typing
- Restores "0.00" on blur if empty
- Auto-sizing width based on content length
- Quick amount buttons still work alongside manual entry

### Files Modified

- `src/flows/track/screens/TrackScreen.tsx` — Replaced `<p>` amount display with editable `<input>` field

## Commit

- `16d5645` — fix: make amount field editable on Track expense/income screens
