// Minimal Supabase REST client: one INSERT into a table, nothing else.
// It is plain fetch on purpose. @supabase/supabase-js was measured in this
// project at +54.84 kB gzip (72.27 -> 127.11 kB) for a page that needs one
// POST, and a landing page opened from an ad has a few seconds.
//
// The key is the public anon/publishable key. It ships to every browser, so
// the security is in RLS (supabase/migrations), not in hiding the key.

const REQUEST_TIMEOUT_MS = 10_000

export type Table = 'events' | 'leads'

export interface InsertResult {
  ok: boolean
}

// Never throws: a missing config, a network error, a timeout and an HTTP error
// all come back as { ok: false }. PostgREST answers an INSERT with 201 and an
// empty body (Prefer: return=minimal), so the row is never read back; the
// database has no SELECT policy for anon, a read-back would fail.
export async function postgrestInsert(
  table: Table,
  row: Record<string, unknown>,
): Promise<InsertResult> {
  const url: string | undefined = import.meta.env.VITE_SUPABASE_URL
  const key: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return { ok: false }

  try {
    const response = await fetch(
      `${url.replace(/\/+$/, '')}/rest/v1/${table}`,
      {
        method: 'POST',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
        // Without a timeout a hung request would keep the form in "sending"
        // (button disabled) forever.
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    )
    return { ok: response.ok }
  } catch {
    return { ok: false }
  }
}
