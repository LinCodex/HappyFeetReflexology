# TEAM_018: Booking Confirmation Scroll Fix

## Objectives
- Prevent the page from "falling" to the footer when the booking form is replaced by the (shorter) success message.

## Key Changes
- **BookingSection.tsx**:
    - Added a `useEffect` hook that watches for `status === BookingStatus.SUCCESS`.
    - Automatically triggers `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` on the `#consultation` container.
    - Added a 100ms timeout to ensure DOM rendering fits before scrolling.

## Status
- [x] Auto-scroll to top of section implemented.
- [x] Pushed to remote.
