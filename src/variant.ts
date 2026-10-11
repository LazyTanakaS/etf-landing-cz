// Ad variant: which ad brought the visitor here. It comes from utm_content and
// is stored in events.variant. The Hero `variant` prop (hero copy) is derived
// from it by pickHeroVariant below.
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

// Hero copy for the visitor: ad b gets hero B, everything else gets hero A.
// Reuses readAdVariant, so utm_content is parsed in one place only.
export function pickHeroVariant(search: string): 'A' | 'B' {
  return readAdVariant(search) === 'b' ? 'B' : 'A'
}
