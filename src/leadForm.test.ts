import { describe, expect, it, vi } from 'vitest'
import { CONSENT_TEXT_VERSION } from './content'
import {
  CONSENT_TEXT_VERSION_PATTERN,
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  submitLead,
  validateLeadForm,
  type LeadFormValues,
} from './leadForm'

const valid: LeadFormValues = {
  email: 'jmeno@priklad.cz',
  consent: true,
  honeypot: '',
}

const withEmail = (email: string): LeadFormValues => ({ ...valid, email })

describe('shared limits with the database', () => {
  it('matches the numbers in the migration', () => {
    expect(EMAIL_MIN_LENGTH).toBe(5)
    expect(EMAIL_MAX_LENGTH).toBe(254)
  })

  it('has a consent version the database check accepts', () => {
    expect(CONSENT_TEXT_VERSION).toMatch(CONSENT_TEXT_VERSION_PATTERN)
    expect(CONSENT_TEXT_VERSION_PATTERN.test('v1')).toBe(true)
    expect(CONSENT_TEXT_VERSION_PATTERN.test('v999')).toBe(true)
    expect(CONSENT_TEXT_VERSION_PATTERN.test('v1234')).toBe(false)
    expect(CONSENT_TEXT_VERSION_PATTERN.test('1')).toBe(false)
    expect(CONSENT_TEXT_VERSION_PATTERN.test('v')).toBe(false)
  })
})

describe('validateLeadForm', () => {
  it('accepts a normal address and trims it', () => {
    expect(validateLeadForm(valid)).toEqual({
      kind: 'valid',
      email: 'jmeno@priklad.cz',
    })
    expect(validateLeadForm(withEmail('  jmeno@priklad.cz  '))).toEqual({
      kind: 'valid',
      email: 'jmeno@priklad.cz',
    })
  })

  it('rejects empty, no @, no dot in the domain, inner spaces, two @', () => {
    for (const email of [
      '',
      '   ',
      'jmeno',
      'jmeno.priklad.cz',
      'jmeno@priklad',
      '@priklad.cz',
      'jmeno@.cz',
      'jmeno@priklad.',
      'jm eno@priklad.cz',
      'jmeno@@priklad.cz',
      'a@b@c.cz',
    ]) {
      expect(validateLeadForm(withEmail(email))).toEqual({
        kind: 'invalid',
        emailInvalid: true,
        consentMissing: false,
      })
    }
  })

  it('has the length limits 5 and 254 inclusive', () => {
    const at = (length: number) =>
      'a'.repeat(length - '@example.com'.length) + '@example.com'
    expect(validateLeadForm(withEmail('a@b.c')).kind).toBe('valid')
    expect(validateLeadForm(withEmail('a@bc')).kind).toBe('invalid')
    expect(validateLeadForm(withEmail(at(254))).kind).toBe('valid')
    expect(validateLeadForm(withEmail(at(255))).kind).toBe('invalid')
  })

  it('requires the consent', () => {
    expect(validateLeadForm({ ...valid, consent: false })).toEqual({
      kind: 'invalid',
      emailInvalid: false,
      consentMissing: true,
    })
  })

  it('reports both errors at once', () => {
    expect(
      validateLeadForm({ email: 'x', consent: false, honeypot: '' }),
    ).toEqual({
      kind: 'invalid',
      emailInvalid: true,
      consentMissing: true,
    })
  })

  it('flags a filled honeypot as a bot, even for otherwise invalid input', () => {
    expect(
      validateLeadForm({ ...valid, honeypot: 'http://spam.example' }),
    ).toEqual({
      kind: 'bot',
    })
    expect(
      validateLeadForm({ email: '', consent: false, honeypot: 'x' }),
    ).toEqual({
      kind: 'bot',
    })
  })

  it('does not treat a whitespace-only honeypot as a bot', () => {
    expect(validateLeadForm({ ...valid, honeypot: '   ' }).kind).toBe('valid')
  })
})

describe('submitLead', () => {
  it('saves a valid form once, with the trimmed e-mail and the consent version', async () => {
    const insert = vi.fn().mockResolvedValue({ ok: true })
    const result = await submitLead(withEmail(' jmeno@priklad.cz '), insert)
    expect(result).toEqual({ status: 'success' })
    expect(insert).toHaveBeenCalledTimes(1)
    expect(insert).toHaveBeenCalledWith({
      email: 'jmeno@priklad.cz',
      consent_text_version: CONSENT_TEXT_VERSION,
    })
  })

  it('does not save an invalid form', async () => {
    const insert = vi.fn().mockResolvedValue({ ok: true })
    expect(await submitLead(withEmail('x'), insert)).toEqual({
      status: 'invalid',
      errors: { emailInvalid: true, consentMissing: false },
    })
    expect(await submitLead({ ...valid, consent: false }, insert)).toEqual({
      status: 'invalid',
      errors: { emailInvalid: false, consentMissing: true },
    })
    expect(insert).not.toHaveBeenCalled()
  })

  it('reports success to a bot without saving anything', async () => {
    const insert = vi.fn().mockResolvedValue({ ok: true })
    const result = await submitLead({ ...valid, honeypot: 'x' }, insert)
    expect(result).toEqual({ status: 'success' })
    expect(insert).not.toHaveBeenCalled()
  })

  it('returns error when the insert reports a failure', async () => {
    const insert = vi.fn().mockResolvedValue({ ok: false })
    expect(await submitLead(valid, insert)).toEqual({ status: 'error' })
  })

  it('returns error when the insert throws', async () => {
    const insert = vi.fn().mockRejectedValue(new Error('network down'))
    expect(await submitLead(valid, insert)).toEqual({ status: 'error' })
  })
})
