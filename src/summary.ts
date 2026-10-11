import { yearsForm, scenario } from './calculator'
import { calculatorContent, summaryContent } from './content'
import type { Etf } from './data/etfs'
import { cumulativeFees } from './fees'
import { formatCzk, formatTer } from './format'

export interface SummaryInput {
  deposit: number
  years: number
}

export interface SummaryRow {
  ticker: string
  ter: number
  // Fee for the whole period: the same scenario() call as the calculator.
  total: number
  // Cumulative fee after year 1, 2, ..., years. The last item equals `total`.
  byYear: number[]
}

// Deposited amount. It does not depend on the TER, so a zero TER is passed to
// the same scenario() the calculator uses.
export function investedTotal({ deposit, years }: SummaryInput): number {
  return scenario(deposit, 0, years).invested
}

export function summaryRows(
  items: readonly Etf[],
  { deposit, years }: SummaryInput,
): SummaryRow[] {
  return items.map((etf) => ({
    ticker: etf.ticker,
    ter: etf.ter,
    total: scenario(deposit, etf.ter, years).fee,
    byYear: cumulativeFees(deposit, etf.ter, years),
  }))
}

// Plain text for the clipboard. Regular spaces only: no-break spaces from the
// number formatting are replaced at the end, so pasting into a chat or an
// e-mail does not carry invisible characters.
export function buildSummaryText(
  items: readonly Etf[],
  input: SummaryInput,
): string {
  const text = summaryContent
  const { deposit, years } = input
  const form = calculatorContent.yearsForms[yearsForm(years)]
  const rows = summaryRows(items, input)

  const lines = [
    text.heading,
    text.scenario(
      formatCzk(deposit, 0),
      years,
      form,
      formatCzk(investedTotal(input), 0),
    ),
    '',
    ...rows.map((row) =>
      text.textFundLine(
        row.ticker,
        formatTer(row.ter),
        years,
        form,
        formatCzk(row.total, 2),
      ),
    ),
    '',
    text.byYearSummary,
    ...Array.from(
      { length: years },
      (_, index) =>
        `${text.yearColumn} ${index + 1}: ` +
        rows
          .map((row) => `${row.ticker} ${formatCzk(row.byYear[index], 2)}`)
          .join(', '),
    ),
    text.byYearNote,
    '',
    text.disclaimer,
    calculatorContent.assumption,
    '',
    text.questionsHeading,
    ...text.questions.map((question, index) => `${index + 1}. ${question}`),
  ]

  return lines.join('\n').replace(/[  ]/g, ' ')
}

// Copies text; never throws. false = the visitor has to copy by hand.
export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}
