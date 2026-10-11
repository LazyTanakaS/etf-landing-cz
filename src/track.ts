import { insertEvent } from './lib/inserts'
import { createTracker } from './tracker'
import { readAdVariant } from './variant'

// The one tracker of this page load, and the only file that touches window,
// crypto and the build mode. Components import `track` and call
// track('page_view') and so on; all rules are in tracker.ts.
//
// - The session id lives only in this module's memory: a new one on every page
//   load, no sessionStorage, localStorage or cookies.
// - The ad variant is read once here, at startup, from utm_content.
// - Events go out only in a production build (npm run build / npm run preview).
//   In dev (npm run dev) track() does nothing.
export const { track } = createTracker({
  insert: insertEvent,
  newSessionId: () => crypto.randomUUID(),
  variant: readAdVariant(window.location.search),
  enabled: import.meta.env.PROD,
})
