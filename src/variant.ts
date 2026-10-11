// Ad variant: which ad brought the visitor here. It comes from utm_content and
// is stored in events.variant. It is separate from the Hero `variant` prop,
// which picks the hero copy. The two are not mapped to each other yet.
export type AdVariant = 'a' | 'b'

// Matches events_variant_check in supabase/migrations: NULL, 'a' or 'b'.
// utm_content is typed by hand in ad URLs, so " A " counts as 'a'.
export function readAdVariant(search: string): AdVariant | null {
  const value = new URLSearchParams(search)
    .get('utm_content')
    ?.trim()
    .toLowerCase()
  return value === 'a' || value === 'b' ? value : null
}
