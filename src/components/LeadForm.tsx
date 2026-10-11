import { useRef, useState, type SubmitEvent } from 'react'
import { leadFormContent } from '../content'
import { submitLead } from '../leadForm'
import { insertLead } from '../lib/inserts'

type Status = 'idle' | 'sending' | 'success' | 'error'

const noErrors = { emailInvalid: false, consentMissing: false }

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

    const result = await submitLead({ email, consent, honeypot }, insertLead)
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
    <section id="formular" aria-labelledby="formular-nadpis">
      <h2 id="formular-nadpis">{text.heading}</h2>
      <p>{text.intro}</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="lead-field">
          <label htmlFor="formular-email">{text.emailLabel}</label>
          <input
            id="formular-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={text.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.emailInvalid}
            aria-describedby={
              errors.emailInvalid ? 'formular-email-chyba' : undefined
            }
          />
          {errors.emailInvalid && (
            <p id="formular-email-chyba" className="lead-error">
              {text.emailError}
            </p>
          )}
        </div>

        <div className="lead-field lead-consent">
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
          <label htmlFor="formular-souhlas">{text.consent}</label>
        </div>
        {errors.consentMissing && (
          <p id="formular-souhlas-chyba" className="lead-error">
            {text.consentError}
          </p>
        )}

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

        <div aria-live="polite">
          {status === 'error' && (
            <p className="lead-error">{text.sendError}</p>
          )}
        </div>

        <button type="submit" className="lead-submit" disabled={sending}>
          {buttonLabel}
        </button>
        <p className="small">{text.note}</p>
      </form>
    </section>
  )
}
