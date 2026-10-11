import type { LeadRow } from '../leadForm'
import type { AdVariant } from '../variant'
import { postgrestInsert, type InsertResult } from './supabase'

// Same list as events_name_check in supabase/migrations.
export const EVENT_NAMES = [
  'page_view',
  'cta_click',
  'calc_used',
  'form_start',
  'form_submit',
] as const

export type EventName = (typeof EVENT_NAMES)[number]

export interface EventRow {
  session_id: string
  name: EventName
  variant: AdVariant | null
}

// Each function picks its columns by hand. The database grants INSERT to anon
// only on these columns, so a stray extra property must never reach the wire.
// Components do not call this directly: track() in src/track.ts does.
export function insertEvent(event: EventRow): Promise<InsertResult> {
  return postgrestInsert('events', {
    session_id: event.session_id,
    name: event.name,
    variant: event.variant,
  })
}

// leads has no session_id (events and leads are not linked), and consent_at is
// set by the database.
export function insertLead(lead: LeadRow): Promise<InsertResult> {
  return postgrestInsert('leads', {
    email: lead.email,
    consent_text_version: lead.consent_text_version,
  })
}
