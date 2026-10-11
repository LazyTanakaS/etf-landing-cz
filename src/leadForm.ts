import { CONSENT_TEXT_VERSION } from './content'

// Shared limits. RULE: the database must never be stricter than this client
// validation, otherwise a visitor sees "valid" here and a failed send there.
// The same numbers sit in supabase/migrations/20261011120000_events_and_leads.sql
// (leads_email_length_check, leads_email_at_check,
// leads_consent_text_version_check). Change one side, change the other.
export const EMAIL_MIN_LENGTH = 5 // shortest accepted address: a@b.c
export const EMAIL_MAX_LENGTH = 254
export const CONSENT_TEXT_VERSION_PATTERN = /^v[0-9]{1,3}$/

// Deliberately light: one @, no spaces, a dot in the domain part. Real
// validation is a confirmation e-mail, which this page does not send.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface LeadFormValues {
  email: string
  consent: boolean
  // Hidden field. Real visitors never see it, so it stays empty.
  honeypot: string
}

export type LeadValidation =
  | { kind: 'bot' }
  | { kind: 'invalid'; emailInvalid: boolean; consentMissing: boolean }
  | { kind: 'valid'; email: string }

export function validateLeadForm(values: LeadFormValues): LeadValidation {
  if (values.honeypot.trim() !== '') return { kind: 'bot' }

  const email = values.email.trim()
  const emailInvalid =
    email.length < EMAIL_MIN_LENGTH ||
    email.length > EMAIL_MAX_LENGTH ||
    !EMAIL_PATTERN.test(email)
  const consentMissing = !values.consent

  if (emailInvalid || consentMissing) {
    return { kind: 'invalid', emailInvalid, consentMissing }
  }
  return { kind: 'valid', email }
}

// The row the client sends. consent_at and id are set by the database.
export interface LeadRow {
  email: string
  consent_text_version: string
}

export type InsertLead = (lead: LeadRow) => Promise<{ ok: boolean }>

export type SubmitResult =
  | { status: 'success' }
  | { status: 'error' }
  | {
      status: 'invalid'
      errors: { emailInvalid: boolean; consentMissing: boolean }
    }

// Validates, then saves. `insert` is passed in so tests need no network.
// A filled honeypot reports success without saving, so a bot learns nothing.
export async function submitLead(
  values: LeadFormValues,
  insert: InsertLead,
): Promise<SubmitResult> {
  const checked = validateLeadForm(values)
  if (checked.kind === 'bot') return { status: 'success' }
  if (checked.kind === 'invalid') {
    return {
      status: 'invalid',
      errors: {
        emailInvalid: checked.emailInvalid,
        consentMissing: checked.consentMissing,
      },
    }
  }

  try {
    const result = await insert({
      email: checked.email,
      consent_text_version: CONSENT_TEXT_VERSION,
    })
    return result.ok ? { status: 'success' } : { status: 'error' }
  } catch {
    return { status: 'error' }
  }
}
