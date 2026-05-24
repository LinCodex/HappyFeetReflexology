# TEAM_003: Performance Audit

## Objectives
- Audit codebase for performance bottlenecks.
- Implement lazy loading for heavy assets.
- Optimize build configuration.

## Key Changes
- **Lazy Loading**: Added `loading="lazy"` to iframes in `Hero.tsx` and `Services.tsx`.
- **Image Optimization**: Added `decoding="async"` to service images.
- **Build Config**: Updated `vite.config.ts` to implement manual chunk splitting for better caching.
- **Tailwind**: Attempted migration to build-time CSS but reverted to CDN due to environment-specific PostCSS failures.

## Status
- [x] Optimizations implemented.
- [x] Code built and verified.
- [x] Changes pushed to main.
