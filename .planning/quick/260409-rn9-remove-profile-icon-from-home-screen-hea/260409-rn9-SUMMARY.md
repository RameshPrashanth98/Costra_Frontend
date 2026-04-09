---
quick_id: 260409-rn9
description: Remove profile icon from home screen header
date: 2026-04-09
status: complete
commit: 075d084
files_changed: 1
---

# Summary: Remove profile icon from home screen header

## What Changed

Removed the redundant profile (User) icon button from the Home screen header. The bottom navigation bar already provides a Profile tab, so the header icon was unnecessary duplication.

### Files Modified

- `src/flows/home/screens/HomeScreen.tsx` — Removed `<User>` icon button from header row, removed unused `User` import from lucide-react

## Commit

- `075d084` — fix: remove redundant profile icon from home screen header
