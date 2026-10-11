const terFormat = new Intl.NumberFormat('cs-CZ', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFormat = new Intl.NumberFormat('cs-CZ', {
  maximumFractionDigits: 0,
})

// 1000000 -> "1 000 000" (no-break spaces)
export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

// Rounds only here, when displaying. 907.5 with 2 digits -> "907,50 Kč".
export function formatCzk(value: number, fractionDigits: number): string {
  const formatted = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
  return `${formatted}\u00A0Kč`
}

// 0.0003 -> "0,03 %"
export function formatTer(ter: number): string {
  return terFormat.format(ter)
}

// "2026-04-28" -> "28. 4. 2026". Parsed by hand so the time zone cannot shift the day.
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day}.\u00A0${month}.\u00A0${year}`
}
