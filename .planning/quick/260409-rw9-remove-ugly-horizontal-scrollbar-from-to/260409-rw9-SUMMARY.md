---
quick_id: 260409-rw9
description: Remove horizontal scrollbar from Today's Spending section on home screen
date: 2026-04-09
status: complete
commit: e4f5292
files_changed: 1
---

# Summary: Remove horizontal scrollbar from Today's Spending

## What Changed

Removed the ugly horizontal scrollbar from the "Today's Spending" category cards section on the Home screen. Changed from a horizontally scrollable layout (`overflowX: auto`, `minWidth: 120`, `flexShrink: 0`) to equal-width flex cards (`flex: 1`, `minWidth: 0`) that fill the row cleanly.

### Files Modified

- `src/flows/home/screens/HomeScreen.tsx` — Updated 3 category card containers and their parent flex wrapper

## Commit

- `e4f5292` — fix: remove horizontal scrollbar from Today's Spending section
