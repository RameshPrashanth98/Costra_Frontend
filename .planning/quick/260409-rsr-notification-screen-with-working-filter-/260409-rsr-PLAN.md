---
quick_id: 260409-rsr
description: Notification screen with working filter tabs All Alerts Reminders Income
date: 2026-04-09
tasks: 1
---

# Quick Task: Notification screen with working filter tabs

## Task 1: Wire up notification filtering by category

**Files:** `src/flows/notifications/screens/NotificationsScreen.tsx`
**Action:** Add typed notification data array with category types (ALERTS, REMINDERS, INCOME). Filter notifications based on active tab. Show counts on filter chips. Add "This Week" section with more notifications. Add empty state when no notifications match.
**Verify:** Clicking each filter tab shows only matching notifications. ALL shows everything. Counts are correct. Empty state appears if a filter has no matches.
**Done:** Filter tabs are fully functional with categorized notifications.
