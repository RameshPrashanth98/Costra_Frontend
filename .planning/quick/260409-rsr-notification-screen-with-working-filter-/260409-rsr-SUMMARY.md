---
quick_id: 260409-rsr
description: Notification screen with working filter tabs All Alerts Reminders Income
date: 2026-04-09
status: complete
commit: f8e6d22
files_changed: 1
---

# Summary: Notification screen with working filter tabs

## What Changed

Made the Notifications screen fully functional with working filter tabs:

- **Typed notification data**: Each notification has a `type` (ALERTS, REMINDERS, INCOME) and `section` (TODAY, YESTERDAY, THIS WEEK)
- **Working filters**: Tapping All/Alerts/Reminders/Income filters the notification list in real-time
- **Filter counts**: Each chip shows the number of notifications in that category (e.g., "ALERTS (4)")
- **Grouped by time**: Notifications are grouped into sections (Today, Yesterday, This Week) — empty sections are hidden
- **Empty state**: Shows "No notifications" message when a filter has no matches
- **More data**: Added 3 new notifications in a "This Week" section for better coverage (freelance payment, electricity reminder, weekly summary)

### Files Modified

- `src/flows/notifications/screens/NotificationsScreen.tsx` — Full rewrite with typed notification data, filtering logic, dynamic section grouping, and filter chip counts

## Commit

- `f8e6d22` — feat: add working filter tabs to notifications screen
