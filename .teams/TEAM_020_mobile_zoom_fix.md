# TEAM_020: Mobile Input Zoom Fix

## Objectives
- Prevent iOS devices from automatically zooming in when focusing on booking form inputs.

## Key Changes
- **BookingSection.tsx**:
    - Increased font size of all `<input>` fields from `text-sm` (14px) to `text-base` (16px).
    - This is the standard fix for preventing iOS Safari scaling behavior on focus.

## Status
- [x] Input font sizes updated.
- [x] Pushed to remote.
