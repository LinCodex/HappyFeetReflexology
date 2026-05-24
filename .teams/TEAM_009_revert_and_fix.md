# TEAM_009: Revert Video & Jitter Fix

## Objectives
- Bring back Hero video.
- Fix "jittery" scanning/resizing on mobile.
- Fix "gliding" (laggy feel).

## Key Changes
- **Hero.tsx**:
    - Uncommented video.
    - Changed `h-[100dvh]` to `h-[100svh]`.
        - **Why**: `dvh` (Dynamic Viewport Height) resizes constantly as the mobile address bar shows/hides, causing the whole page content to "jump" or "jitter" up and down. `svh` (Smallest Viewport Height) is stable and doesn't resize.
- **index.html**:
    - Removed `scroll-behavior: smooth`.
        - **Why**: Global CSS smooth scroll often interferes with native "fling" momentum on mobile, making it feel like "gliding" or unresponsive. Anchors now use JS-based smooth scroll, while manual scrolling remains raw and snappy.

## Status
- [x] Video restored.
- [x] Layout jitter fixed (svh).
- [x] Gliding fixed (native scroll).
- [x] Pushed to remote.
