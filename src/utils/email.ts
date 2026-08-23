import { CONTACT, PROFILE } from './data'

/* ── Credentials (fill .env — see .env.example for the walkthrough) ── */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

/** True once real keys are present (placeholders count as absent). */
export const emailConfigured =
  SERVICE_ID.length > 0 &&
  TEMPLATE_ID.length > 0 &&
  PUBLIC_KEY.length > 0 &&
  !SERVICE_ID.startsWith('your-') &&
  !TEMPLATE_ID.startsWith('your-') &&
  !PUBLIC_KEY.startsWith('your-')

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export type SendResult = {
  status: 'sent' | 'error' | 'unconfigured'
  msg?: string
}

/**
 * Sends the contact form straight to the site owner's inbox through
 * EmailJS (https://www.emailjs.com — free tier, no backend needed).
 *
 * Uses the raw REST endpoint, so there is no SDK dependency:
 * POST https://api.emailjs.com/api/v1.0/email/send
 *
 * Template variables available in your EmailJS template:
 *   {{from_name}}  {{from_email}}  {{reply_to}}  {{to_name}}  {{message}}
 */
export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  if (!emailConfigured) return { status: 'unconfigured' }

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          from_name: payload.name,
          from_email: payload.email,
          reply_to: payload.email,
          to_name: PROFILE.name,
          message: payload.message,
        },
      }),
    })

    if (res.ok) return { status: 'sent' }
    const detail = (await res.text()).trim()
    return { status: 'error', msg: detail || `Request failed (${res.status})` }
  } catch {
    return { status: 'error', msg: 'Network error. Try again.' }
  }
}

/** Fallback handoff: prefilled email in the visitor's own mail app. */
export function composeMailtoLink(payload: ContactPayload): string {
  const subject = encodeURIComponent(`[Portfolio] Message from ${payload.name}`)
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name}\n${payload.email}`)
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
}
