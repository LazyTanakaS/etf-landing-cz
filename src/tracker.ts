import type { EventName, EventRow } from './lib/inserts'
import type { InsertResult } from './lib/supabase'
import type { AdVariant } from './variant'

// Pure module: no window, no crypto, no import.meta.env. Everything it needs is
// injected, so it runs in tests without a browser. The wiring is in track.ts.
export interface TrackerDeps {
  insert: (event: EventRow) => Promise<InsertResult>
  newSessionId: () => string
  variant: AdVariant | null
  enabled: boolean
}

export interface Tracker {
  track: (name: EventName) => void
}

// Measurement must never break the page: fire and forget, nothing is awaited,
// nothing is thrown, a failed send is not retried and not reported.
export function createTracker(deps: TrackerDeps): Tracker {
  // "At most once per page load" lives here, not in a React effect, so React
  // StrictMode running an effect twice (or a double click) cannot send twice.
  const sent = new Set<EventName>()
  let sessionId: string | null = null
  let broken = false

  function track(name: EventName): void {
    if (!deps.enabled || broken || sent.has(name)) return
    // Marked before sending, not after the answer: a failed event is gone for
    // this page load, there is no retry.
    sent.add(name)

    try {
      // Created on the first event, so a disabled tracker never makes one.
      sessionId ??= deps.newSessionId()
    } catch {
      // For example crypto.randomUUID is missing. Measurement stays off.
      broken = true
      return
    }

    try {
      const pending = deps.insert({
        session_id: sessionId,
        name,
        variant: deps.variant,
      })
      // insert may reject; an unhandled rejection would be a page error.
      void Promise.resolve(pending).catch(() => {})
    } catch {
      // insert threw synchronously. Silence, by design.
    }
  }

  return { track }
}
