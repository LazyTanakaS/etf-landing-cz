// Deposit at the start of each month; deposit m is held (months - m + 1) months,
// so held months add up to months * (months + 1) / 2. See appendix A, docs/strategy.md.

export function totalFee(deposit: number, ter: number, months: number): number {
  return (deposit * (ter / 12) * (months * (months + 1))) / 2
}

// Cumulative fee after k years, for k = 1..years: totalFee(deposit, ter, 12 * k).
// The last item is the same call as the fee in the main summary table.
export function cumulativeFees(
  deposit: number,
  ter: number,
  years: number,
): number[] {
  return Array.from({ length: years }, (_, index) =>
    totalFee(deposit, ter, 12 * (index + 1)),
  )
}
