# TEAM_029: Implement Customer Confirmation Email

## Changes
- Created new email template `email_template_v2.html` (Admin) and `email_template_customer.html` (Customer).
- Updated `BookingSection.tsx` to send TWO emails upon booking:
  1. Admin notification (existing).
  2. Customer confirmation (new, using template `template_syf1au2`).
- Enhanced email templates with responsive design and removed Chinese from customer copy as requested.

## Rationale
- User requested a confirmation email for the customer, as they were not receiving one.
- Customer email needed to be English-only and fully responsive.

## Verification
- Code review of `BookingSection.tsx` ensures `emailjs.send` is called twice.
- User will verify reception of emails in production.
