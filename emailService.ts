// TEAM_035: Email service abstraction with Web3Forms fallback for EmailJS
import emailjs from '@emailjs/browser';

// ── EmailJS Config ──────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_l8y1jlr";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_dzyrezg";
const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_syf1au2";
const EMAILJS_PUBLIC_KEY = "_1cEnB8RnVwD4SCW-";

// ── Web3Forms Config ────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "b4f41b6a-b398-40a2-9ee9-f0c880d82cd2";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// TEAM_035: Set this to `true` to force all emails through Web3Forms for testing.
// Set back to `false` for production to use EmailJS as primary.
const FORCE_WEB3FORMS = false;

// ── Payload type (matches the existing templateParams shape) ────────────────
export interface EmailPayload {
  to_name: string;
  from_name: string;
  service_name: string;
  service_duration: string;
  booking_date: string;
  booking_time: string;
  phone_number: string;
  email_address: string;
  customer_note: string;
}

// ── EmailJS sender ──────────────────────────────────────────────────────────

async function sendViaEmailJS(payload: EmailPayload): Promise<void> {
  // Send admin notification
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, payload as unknown as Record<string, unknown>, EMAILJS_PUBLIC_KEY);
  // Send customer confirmation
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, payload as unknown as Record<string, unknown>, EMAILJS_PUBLIC_KEY);
}

// ── Web3Forms sender ────────────────────────────────────────────────────────
// TEAM_035: Web3Forms free tier only sends to the verified account owner (admin).
// Customer confirmation emails are NOT possible without the Pro autoresponse feature.
// The admin email fields are structured to match the booking notification HTML template.

/**
 * Sends the admin notification email via Web3Forms.
 * Fields are named to match the admin HTML email template variables:
 *   {{from_name}}, {{phone_number}}, {{email_address}},
 *   {{service_name}}, {{booking_time}}, {{booking_date}},
 *   {{service_duration}}, {{customer_note}}
 *
 * The `replyto` field allows the admin to reply directly to the customer.
 */
async function sendAdminEmailViaWeb3Forms(payload: EmailPayload): Promise<void> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Booking: ${payload.service_name} — ${payload.from_name}`,
      from_name: "Happy Feet Reflexology Booking",
      replyto: payload.email_address,

      // ── Customer [客戶] ──
      "Name [姓名]": payload.from_name,
      "Phone [電話]": payload.phone_number,
      "Email [電郵]": payload.email_address,

      // ── Service [服務] ──
      "Service [服務]": payload.service_name,
      "Time [時間]": payload.booking_time,
      "Date [日期]": payload.booking_date,
      "Duration [時長]": payload.service_duration,

      // ── Notes [備註] ──
      "Notes [備註]": payload.customer_note,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Web3Forms admin email failed: ${response.status} ${JSON.stringify(errorData)}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(`Web3Forms admin email rejected: ${result.message || "Unknown error"}`);
  }
}

async function sendViaWeb3Forms(payload: EmailPayload): Promise<void> {
  // Send admin notification only — Web3Forms free tier cannot send customer confirmation emails.
  await sendAdminEmailViaWeb3Forms(payload);
}

// ── Public API ──────────────────────────────────────────────────────────────

export type EmailProvider = 'emailjs' | 'web3forms';

/**
 * Sends booking emails (admin notification + customer confirmation).
 * Returns which provider was used so the UI can adapt the success message.
 *
 * Strategy:
 * 1. Try EmailJS first (sends admin + customer emails)
 * 2. If EmailJS fails for ANY reason, retry via Web3Forms (admin email only)
 */
export async function sendBookingEmails(payload: EmailPayload): Promise<EmailProvider> {
  if (FORCE_WEB3FORMS) {
    await sendViaWeb3Forms(payload);
    return 'web3forms';
  }

  try {
    await sendViaEmailJS(payload);
    return 'emailjs';
  } catch {
    // TEAM_035: Any EmailJS failure → fall back to Web3Forms
    await sendViaWeb3Forms(payload);
    return 'web3forms';
  }
}
