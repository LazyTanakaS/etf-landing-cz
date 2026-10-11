import type { Etf } from './data/etfs'
import { totalFee } from './fees'

export const limits = {
  deposit: { min: 100, max: 1_000_000 },
  years: { min: 1, max: 20 },
} as const

// Fixed scenario of the "Pro představu" line (docs/copy-cs.md, section 5).
// It does not depend on what the visitor types into the calculator.
const ILLUSTRATION_DEPOSIT = 5000
const ILLUSTRATION_MONTHS = 120

// Whole numbers only. All whitespace is dropped first (including the no-break
// space), so "5 000" is valid. Returns null for anything else or out of range.
export function parseWholeNumber(
  text: string,
  min: number,
  max: number,
): number | null {
  const compact = text.replace(/\s/g, '')
  if (!/^\d+$/.test(compact)) return null
  const value = Number(compact)
  return value >= min && value <= max ? value : null
}

export function parseDeposit(text: string): number | null {
  return parseWholeNumber(text, limits.deposit.min, limits.deposit.max)
}

export function parseYears(text: string): number | null {
  return parseWholeNumber(text, limits.years.min, limits.years.max)
}

export type YearsForm = 'one' | 'few' | 'many'

// Czech plural of "rok" for whole numbers 1-20: 1 rok, 2-4 roky, 5+ let.
// Compound numbers (21, 22, ...) are out of range on purpose.
export function yearsForm(years: number): YearsForm {
  if (years === 1) return 'one'
  if (years >= 2 && years <= 4) return 'few'
  return 'many'
}

// Calculator result for one fund. Rounding happens only when displaying.
export function scenario(deposit: number, ter: number, years: number) {
  const months = years * 12
  return {
    months,
    fee: totalFee(deposit, ter, months),
    invested: deposit * months,
  }
}

// Gap between the highest and the lowest TER in the table for the fixed
// scenario. Same fee function as the calculator, no second copy of the formula.
// The text template says "let", which is right for 10 years (120 / 12).
export function illustration(items: readonly Etf[]) {
  const ters = items.map((etf) => etf.ter)
  const minTer = Math.min(...ters)
  const maxTer = Math.max(...ters)
  return {
    deposit: ILLUSTRATION_DEPOSIT,
    years: ILLUSTRATION_MONTHS / 12,
    invested: ILLUSTRATION_DEPOSIT * ILLUSTRATION_MONTHS,
    minTer,
    maxTer,
    gap:
      totalFee(ILLUSTRATION_DEPOSIT, maxTer, ILLUSTRATION_MONTHS) -
      totalFee(ILLUSTRATION_DEPOSIT, minTer, ILLUSTRATION_MONTHS),
  }
}
