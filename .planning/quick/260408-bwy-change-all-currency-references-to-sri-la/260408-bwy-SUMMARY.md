# Quick Task 260408-bwy: Change Currency to Sri Lankan Rs.

**Status:** Complete
**Date:** 2026-04-08
**Commit:** 972ef2d

## What Changed

Replaced all Indian Rupee references (₹ symbol) with Sri Lankan Rupees (Rs.) across 7 screen files:

| File | Changes |
|------|---------|
| HomeScreen.tsx | ₹ → Rs. in all amounts (budget card, spending, transactions, wallet) |
| AllTransactionsScreen.tsx | ₹ → Rs. in transaction amounts and daily totals |
| TransactionDetailsScreen.tsx | ₹ → Rs. in detail amount and insight text |
| VoiceEntryScreen.tsx | ₹ → Rs. in voice entry amount |
| NotificationsScreen.tsx | ₹ → Rs. + "HDFC" → "Commercial Bank" (Sri Lankan bank) |
| ProfileScreen.tsx | `IndianRupee` icon → `Coins`, "SLRP (LKR)" → "LKR (Rs.)" |
| SettingsScreen.tsx | `IndianRupee` icon → `Coins` |

## Verification

- Zero ₹ or IndianRupee references remaining in src/
- Production build passes clean
- All Rs. amounts display correctly
