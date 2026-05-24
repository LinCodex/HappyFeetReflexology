# TEAM_007: Deep Mobile Scroll Fix

## Objectives
- Resolve persistent "whole page jitter" on mobile.
- Stop interference with mobile browser address bar resizing.

## Key Changes
- **index.html**:
    - Removed `height: 100%` and `min-height: 100%` from `html` and `body`. Correct logic: constraining height forces the browser to handle scrolling in a non-standard way, fighting the dynamic address bar.
    - Added `width: 100%` and `overflow-x: hidden` to both.
    - Used `position: relative` on `body` to anchor layout.
    - Kept `overscroll-behavior-y: none` on `body` to prevent bounce.

## Status
- [x] Removed conflicting height constraints.
- [x] Verified mobile-safe overflow rules.
- [x] Pushed to remote.
