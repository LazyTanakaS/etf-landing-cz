// process.on is Node-only; tsconfig.app.json loads only the browser types.
/// <reference types="node" />
import { describe, expect, it, vi } from 'vitest'
import { EVENT_NAMES } from './lib/inserts'
import { createTracker, type TrackerDeps } from './tracker'

function setup(overrides: Partial<TrackerDeps> = {}) {
  const insert = vi.fn().mockResolvedValue({ ok: true })
  let counter = 0
  const newSessionId = vi.fn(() => `session-${++counter}`)
  const { track } = createTracker({
    insert,
    newSessionId,
    variant: null,
    enabled: true,
    ...overrides,
  })
  return { insert, newSessionId, track }
}

// Lets promise callbacks (and any unhandled rejection) run before asserting.
const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('once per page load', () => {
  it('sends each of the five events exactly once', () => {
    const { insert, track } = setup()
    for (const name of EVENT_NAMES) {
      track(name)
      track(name)
      track(name)
    }
    expect(insert).toHaveBeenCalledTimes(5)
    expect(insert.mock.calls.map(([row]) => row.name)).toEqual([...EVENT_NAMES])
  })

  it('sends a row with exactly session_id, name and variant', () => {
    const { insert, track } = setup({ variant: 'a' })
    track('page_view')
    expect(insert).toHaveBeenCalledWith({
      session_id: 'session-1',
      name: 'page_view',
      variant: 'a',
    })
  })
})

describe('variant', () => {
  it.each(['a', 'b', null] as const)('passes %s with every event', (variant) => {
    const { insert, track } = setup({ variant })
    for (const name of EVENT_NAMES) track(name)
    expect(insert).toHaveBeenCalledTimes(5)
    for (const [row] of insert.mock.calls) expect(row.variant).toBe(variant)
  })
})

describe('session id', () => {
  it('is created once and shared by all events of one tracker', () => {
    const { insert, newSessionId, track } = setup()
    for (const name of EVENT_NAMES) track(name)
    expect(newSessionId).toHaveBeenCalledTimes(1)
    const ids = new Set(insert.mock.calls.map(([row]) => row.session_id))
    expect(ids).toEqual(new Set(['session-1']))
  })

  it('differs between page loads (two trackers)', () => {
    let counter = 0
    const newSessionId = () => `session-${++counter}`
    const insert = vi.fn().mockResolvedValue({ ok: true })
    const deps = { insert, newSessionId, variant: null, enabled: true }
    createTracker(deps).track('page_view')
    createTracker(deps).track('page_view')
    expect(insert.mock.calls.map(([row]) => row.session_id)).toEqual([
      'session-1',
      'session-2',
    ])
  })
})

describe('disabled mode', () => {
  it('sends nothing and creates no session id', () => {
    const { insert, newSessionId, track } = setup({ enabled: false })
    for (const name of EVENT_NAMES) track(name)
    expect(insert).not.toHaveBeenCalled()
    expect(newSessionId).not.toHaveBeenCalled()
  })
})

describe('failures stay silent and are not retried', () => {
  it('ok: false is not retried', async () => {
    const { insert, track } = setup()
    insert.mockResolvedValue({ ok: false })
    track('page_view')
    await flush()
    track('page_view')
    await flush()
    expect(insert).toHaveBeenCalledTimes(1)
  })

  it('a rejected insert does not throw or leak an unhandled rejection', async () => {
    // A plain function, not vi.fn(): a spy attaches its own handler to the
    // returned promise and would hide an unhandled rejection from this test.
    let calls = 0
    const { track } = setup({
      insert: () => {
        calls++
        return Promise.reject(new Error('network down'))
      },
    })
    const unhandled: unknown[] = []
    const listener = (reason: unknown) => unhandled.push(reason)
    process.on('unhandledRejection', listener)
    try {
      expect(() => track('page_view')).not.toThrow()
      await flush()
      track('page_view')
      await flush()
    } finally {
      process.off('unhandledRejection', listener)
    }
    expect(unhandled).toEqual([])
    expect(calls).toBe(1)
  })

  it('a synchronous throw from insert does not escape and is not retried', () => {
    const { insert, track } = setup()
    insert.mockImplementation(() => {
      throw new Error('boom')
    })
    expect(() => track('page_view')).not.toThrow()
    expect(() => track('page_view')).not.toThrow()
    expect(insert).toHaveBeenCalledTimes(1)
    // A different event is a new event and is attempted once, also silently.
    expect(() => track('cta_click')).not.toThrow()
    expect(insert).toHaveBeenCalledTimes(2)
  })

  it('a failing session id factory turns measurement off without a throw', () => {
    const { insert, newSessionId, track } = setup()
    newSessionId.mockImplementation(() => {
      throw new Error('randomUUID is not available')
    })
    expect(() => track('page_view')).not.toThrow()
    expect(() => track('cta_click')).not.toThrow()
    expect(insert).not.toHaveBeenCalled()
    expect(newSessionId).toHaveBeenCalledTimes(1)
  })
})

describe('fire and forget', () => {
  it('track returns at once, even if the insert never finishes', () => {
    const { insert, track } = setup()
    insert.mockReturnValue(new Promise(() => {}))
    expect(track('page_view')).toBeUndefined()
    // The next event does not wait for the first one.
    expect(track('cta_click')).toBeUndefined()
    expect(insert).toHaveBeenCalledTimes(2)
  })
})
