# TEAM_035 — Web3Forms Fallback Integration

**Created**: 2026-05-24
**Status**: ✅ Complete

## Task
Add Web3Forms as automatic fallback when EmailJS hits 200/month limit.

## Changes
- **NEW**: `emailService.ts` — Email service abstraction with monthly counter + fallback logic
- **MODIFIED**: `BookingSection.tsx` — Now uses `sendBookingEmails()` instead of inline `emailjs.send()`

## Build
- ✅ `npx vite build` passes cleanly (1740 modules, 3.66s)

## Testing Notes
- Set `FORCE_WEB3FORMS = true` in `emailService.ts` to test the Web3Forms path
- The `localStorage` counter tracks EmailJS sends and auto-resets monthly
- Runtime quota errors from EmailJS also trigger the Web3Forms fallback

## Handoff
- [x] Project builds cleanly
- [x] Team file updated
- [x] No remaining TODOs in code (FORCE_WEB3FORMS is intentionally `false` for production)
