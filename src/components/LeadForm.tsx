import { useRef, useState, type SubmitEvent } from 'react'
import { leadFormContent } from '../content'
import { submitLead, type LeadRow } from '../leadForm'
import { insertLead } from '../lib/inserts'
import type { InsertResult } from '../lib/supabase'
import { track } from '../track'
import { AlertIcon } from './Icons'
import { Placeholders } from './Placeholders'

type Status = 'idle' | 'sending' | 'success' | 'error'

const noErrors = { emailInvalid: false, consentMissing: false }

// Saves the lead and reports form_submit only when it was really saved. The
// honeypot branch of submitLead never calls insert, so a bot sends no event.
// The result goes back unchanged; track() is fire and forget and not awaited.
async function insertLeadAndTrack(lead: LeadRow): Promise<InsertResult> {
  const result = await insertLead(lead)
  if (result.ok) track('form_submit')
  return result
}

interface LeadFormProps {
  // The form shows no success text of its own. The parent decides what the
  // visitor sees next (the summary, session 07).
  onSuccess?: () => void
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const text = leadFormContent
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState(noErrors)
  // `disabled` only takes effect after the next render. The ref closes the gap
  // between two submit events in the same tick (no UNIQUE on leads.email, so a
  // second insert would be a duplicate row).
  const inFlight = useRef(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    inFlight.current = true
    setStatus('sending')

    const result = await submitLead(
      { email, consent, honeypot },
      insertLeadAndTrack,
    )
    inFlight.current = false

    if (result.status === 'success') {
      // The only branch that clears the typed values. On 'error' and 'invalid'
      // they stay, so a failed send never loses the e-mail.
      setEmail('')
      setConsent(false)
      setHoneypot('')
      setErrors(noErrors)
      setStatus('success')
      onSuccess?.()
      return
    }
    if (result.status === 'invalid') {
      setErrors(result.errors)
      setStatus('idle')
      return
    }
    setErrors(noErrors)
    setStatus('error')
  }

  if (status === 'success') return null

  const sending = status === 'sending'
  const buttonLabel = sending
    ? text.sending
    : status === 'error'
      ? text.retry
      : text.submit

  return (
    <section
      className="section"
      id="formular"
      aria-labelledby="formular-nadpis"
    >
      <div className="form-card">
        <div className="form-grid">
          <div>
            <div className="sec-head">
              <h2 id="formular-nadpis">{text.heading}</h2>
            </div>
            <p>{text.intro}</p>
          </div>

          <form className="form-stack" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="formular-email">{text.emailLabel}</label>
              <div
                className={`control${errors.emailInvalid ? ' is-invalid' : ''}`}
              >
                <input
                  id="formular-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={text.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => track('form_start')}
                  aria-invalid={errors.emailInvalid}
                  aria-describedby={
                    errors.emailInvalid ? 'formular-email-chyba' : undefined
                  }
                />
              </div>
              {errors.emailInvalid && (
                <p id="formular-email-chyba" className="err">
                  <AlertIcon />
                  {text.emailError}
                </p>
              )}
            </div>

            <div>
              <label className="check" htmlFor="formular-souhlas">
                <input
                  id="formular-souhlas"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  aria-invalid={errors.consentMissing}
                  aria-describedby={
                    errors.consentMissing ? 'formular-souhlas-chyba' : undefined
                  }
                />
                <span className="check-text">
                  <Placeholders text={text.consent} />
                </span>
              </label>
              {errors.consentMissing && (
                <p id="formular-souhlas-chyba" className="err">
                  <AlertIcon />
                  {text.consentError}
                </p>
              )}
            </div>

            {/* Honeypot: invisible to visitors and screen readers, off the tab
                order. The name is neutral on purpose: a name like "email" or
                "phone" would be filled by browser autofill and drop a real lead. */}
            <div className="lead-trap" aria-hidden="true">
              <input
                name="contact_via"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            {status === 'error' && (
              <p className="alert" role="alert">
                <AlertIcon />
                {text.sendError}
              </p>
            )}

            <div>
              <button type="submit" className="btn btn-wide" disabled={sending}>
                {buttonLabel}
              </button>
            </div>
            <p className="small">{text.note}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
