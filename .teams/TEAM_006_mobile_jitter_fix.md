# TEAM_006: Mobile Scroll Jitter Fix

## Objectives
- Fix "whole webpage follows" scroll issue on mobile.
- Eliminate vertical jitter/rubber-banding.

## Key Changes
- **index.html**:
    - `html`: Added `height: 100%` and `overscroll-behavior-y: none`.
    - `body`: Added `min-height: 100%` and `overscroll-behavior-y: none`.
    - This forces the browser to treat the body as the primary scroll container and ignore viewport overscroll gestures that move the entire canvas.

## Status
- [x] Strict scroll constraints applied.
- [x] Pushed to remote.
