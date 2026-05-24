# TEAM_021: Dropdown Alignment Fix

## Objectives
- Fix the gap between the sticky category headers and the "Change Treatment" modal border.

## Key Changes
- **BookingSection.tsx**:
    - Removed `p-4` from the mobile container (`lg:hidden`).
    - This allows the sticky headers (which were constrained by the parent padding) to touch the edges of the modal, creating a seamless border.

## Status
- [x] Alignment fixed (padding removed).
- [x] Pushed to remote.
