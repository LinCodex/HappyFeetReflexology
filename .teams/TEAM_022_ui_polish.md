# TEAM_022: UI Polish (Scrollbars & Transitions)

## Objectives
- Hide the visible scrollbar on the "Change Treatment" dropdown.
- Fix the "ghosting" double X button effect when opening the mobile menu.

## Key Changes
- **BookingSection.tsx**:
    - Replaced `custom-scrollbar` class with `[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`.
    - This hides the scrollbar on all browsers while keeping the content scrollable.
- **Navbar.tsx**:
    - Modified the mobile toggle button to `opacity-0 pointer-events-none` when the menu is open.
    - This prevents the navbar button (which was transforming into an X) from being visible alongside the Overlay's own X button, solving the "ghosting" issue.

## Status
- [x] Scrollbar hidden.
- [x] Ghost button fixed.
- [x] Pushed to remote.
