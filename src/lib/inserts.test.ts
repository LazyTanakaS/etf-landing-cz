import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { EVENT_NAMES, insertEvent, insertLead } from './inserts'

const URL = 'https://abc.supabase.co'
const KEY = 'test-anon-key'

const okResponse = (status = 201) => new Response(null, { status })

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.stubEnv('VITE_SUPABASE_URL', URL)
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', KEY)
  fetchMock = vi.fn().mockResolvedValue(okResponse())
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

// [url, init] of the one fetch call, with the body parsed.
function sent() {
  expect(fetchMock).toHaveBeenCalledTimes(1)
  const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
  return { url, init, body: JSON.parse(init.body as string) as unknown }
}

describe('insertLead', () => {
  it('POSTs to /rest/v1/leads with the four headers and exactly two columns', async () => {
    const result = await insertLead({
      email: 'jmeno@priklad.cz',
      consent_text_version: 'v1',
    })
    const { url, init, body } = sent()
    expect(result).toEqual({ ok: true })
    expect(url).toBe(`${URL}/rest/v1/leads`)
    expect(init.method).toBe('POST')
    expect(init.headers).toEqual({
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    })
    expect(body).toEqual({
      email: 'jmeno@priklad.cz',
      consent_text_version: 'v1',
    })
  })

  it('never sends session_id or consent_at, even if a caller passes them', async () => {
    await insertLead({
      email: 'jmeno@priklad.cz',
      consent_text_version: 'v1',
      session_id: 'x',
      consent_at: '2020-01-01',
    } as never)
    expect(Object.keys(sent().body as object).sort()).toEqual([
      'consent_text_version',
      'email',
    ])
  })
})

describe('insertEvent', () => {
  it('POSTs to /rest/v1/events with exactly three columns', async () => {
    const sessionId = '00000000-0000-4000-8000-000000000000'
    await insertEvent({
      session_id: sessionId,
      name: 'page_view',
      variant: 'a',
    })
    const { url, body } = sent()
    expect(url).toBe(`${URL}/rest/v1/events`)
    expect(body).toEqual({
      session_id: sessionId,
      name: 'page_view',
      variant: 'a',
    })
  })

  it('sends a missing variant as null, not as an absent key', async () => {
    await insertEvent({ session_id: 's', name: 'cta_click', variant: null })
    expect(sent().body).toEqual({
      session_id: 's',
      name: 'cta_click',
      variant: null,
    })
    expect(Object.keys(sent().body as object)).toContain('variant')
  })

  it('ignores extra properties', async () => {
    await insertEvent({
      session_id: 's',
      name: 'calc_used',
      variant: 'b',
      email: 'jmeno@priklad.cz',
    } as never)
    expect(Object.keys(sent().body as object).sort()).toEqual([
      'name',
      'session_id',
      'variant',
    ])
  })

  it('lists the five event names of the database check', () => {
    expect([...EVENT_NAMES]).toEqual([
      'page_view',
      'cta_click',
      'calc_used',
      'form_start',
      'form_submit',
    ])
  })
})

describe('failures never throw', () => {
  const lead = { email: 'jmeno@priklad.cz', consent_text_version: 'v1' }

  it('returns ok: false for HTTP errors (fetch does not throw on them)', async () => {
    for (const status of [400, 401, 403, 409, 500, 503]) {
      fetchMock.mockResolvedValueOnce(new Response(null, { status }))
      expect(await insertLead(lead)).toEqual({ ok: false })
    }
  })

  it('returns ok: false when the network fails or the request times out', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    expect(await insertLead(lead)).toEqual({ ok: false })
    fetchMock.mockRejectedValueOnce(new DOMException('timeout', 'TimeoutError'))
    expect(await insertLead(lead)).toEqual({ ok: false })
  })

  it('passes an abort signal so a hung request ends', async () => {
    await insertLead(lead)
    expect(sent().init.signal).toBeInstanceOf(AbortSignal)
  })

  it('returns ok: false without calling fetch when the env is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', '')
    expect(await insertLead(lead)).toEqual({ ok: false })
    vi.stubEnv('VITE_SUPABASE_URL', URL)
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')
    expect(await insertLead(lead)).toEqual({ ok: false })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('does not double the slash when the URL ends with one', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', `${URL}/`)
    await insertLead(lead)
    expect(sent().url).toBe(`${URL}/rest/v1/leads`)
  })
})
