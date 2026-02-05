# TEAM_017: Scroll Propagation Fixes

## Objectives
- Fix issue where mobile menu scroll lock wasn't robust enough.
- Fix issue where booking dropdown scroll propagated to the main page.

## Key Changes
- **Navbar.tsx**:
    - Expanded scroll lock to `document.documentElement` in addition to `document.body`.
    - Added `touch-action: none` to preventing touch scrolling on the database layer.
- **BookingSection.tsx**:
    - Added `overscroll-contain` to both desktop and mobile dropdown containers.
    - Added `touch-none` to the backdrop of the mobile dropdown to prevent background interaction.

## Status
- [x] Robust scroll lock implemented.
- [x] Overscroll containment added.
- [x] Pushed to remote.
