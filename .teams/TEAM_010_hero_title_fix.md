# TEAM_010: Fix Hero Title Overlap

## Objectives
- Fix text overlap of "Happy" and "Feet" in Hero section on mobile.
- Maintain aesthetic tight leading on desktop.

## Key Changes
- **Hero.tsx**:
    - Updated `h1` class: Changed `leading-[0.8]` to `leading-tight md:leading-[0.8]`.
    - **Result**: Mobile screens now use `leading-tight` (approx 1.25), which adds enough vertical space to prevent overlap. Desktop screens retain the stylish `0.8` leading.

## Status
- [x] Mobile overlap fixed.
- [x] Desktop visual intact.
- [x] Pushed to remote.
