# TEAM_014: Refine Floating Dock UI

## Objectives
- Standardize size of mobile action buttons (Language Toggle & Hamburger Menu).
- Apply a "frost glass" effect to the floating navbar.

## Key Changes
- **Navbar.tsx**:
    - **Floating Dock Background**: Changed `bg-white/95` -> `bg-white/70` with `backdrop-blur-xl`.
    - **Mobile Buttons**: Standardized both buttons to `w-12 h-12 flex items-center justify-center rounded-full`.
        - Previously relied on padding (`p-2` vs `p-3`), causing slight size mismatches depending on content. Fixed dimensions guarantee alignment.

## Status
- [x] Buttons aligned and resized.
- [x] Frost effect applied.
- [x] Pushed to remote.
