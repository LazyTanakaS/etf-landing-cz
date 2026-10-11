// Deposit at the start of each month; deposit m is held (months - m + 1) months,
// so held months add up to months * (months + 1) / 2. See appendix A, docs/strategy.md.

export function totalFee(deposit: number, ter: number, months: number): number {
  return (deposit * (ter / 12) * (months * (months + 1))) / 2
}

export function feeForYear(deposit: number, ter: number, year: number): number {
  const first = 12 * (year - 1) + 1
  const last = 12 * year
  return (deposit * (ter / 12) * ((first + last) * 12)) / 2
}
