# TEAM_032: Update Google Calendar Webhook URL

## Changes
- Updated `BookingSection.tsx` with the new Google Apps Script Web App URL.
- Logic update: The underlying script was updated to create "All Day" events in "Flamingo" color.

## Context
- The user re-deployed the Google Apps Script to a "New version" to apply the display logic changes.
- This generated a new unique URL for the web app deployment.
- The `fetch` implementation remains the same.

## Verification
- Code review confirms the new URL matches the one provided by the user.
- Integration test pending user confirmation.
