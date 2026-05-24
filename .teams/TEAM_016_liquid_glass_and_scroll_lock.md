# TEAM_016: Liquid Glass & Mobile UX

## Objectives
- Apply "Apple-like" liquid glass effect to the floating dock.
- Disable background scrolling when the mobile menu is open.
- Hide scrollbars on the mobile menu (implicitly handled by fixed positioning and overlay).

## Key Changes
- **Navbar.tsx**:
    - **Liquid Glass**:
        - `bg-white/70` → `bg-white/60` (More translucent)
        - `backdrop-blur-xl` → `backdrop-blur-3xl` (Heavier blur)
        - `border-white/20` → `border-white/40` (Frosted edge)
        - `ring-1 ring-white/10` (Subtle inner glow)
    - **Scroll Lock**: Added `useEffect` to toggle `overflow: hidden` on `document.body` when `mobileMenuOpen` is true.

## Status
- [x] Liquid glass effect applied.
- [x] Scroll lock verified (logic added).
- [x] Pushed to remote.
