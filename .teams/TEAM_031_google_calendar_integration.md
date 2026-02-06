# TEAM_031: Google Calendar Integration

## Changes
- Created `scripts/google_calendar_webhook.js` for user to deploy as a Google Apps Script Web App.
- Updated `BookingSection.tsx` to call the provided GAS Webhook URL (`https://script.google.com/macros/s/.../exec`) upon successful booking.
- Implemented `fetch` with `mode: 'no-cors'` to handle opaque responses from GAS.

## Rationale
- The application is a static site (react). Integration with Google Calendar requires a secure intermediate layer to hold authentication/permissions.
- Google Apps Script running as the user ("Me") and deployed as a Web App ("Anyone") acts as a secure, serverless backend.
- It receives booking JSON payload and uses `CalendarApp.createEvent()` to sync the booking instantly.

## Verification
- User deployed script and provided URL.
- Code implements standard `fetch` pattern for GAS webhooks.
- `try-catch` block ensures calendar sync failure doesn't block the user's booking success UI.
