import { afterEach, describe, expect, it, vi } from 'vitest'
import { etfs, sortByTer } from './data/etfs'
import { totalFee } from './fees'
import { formatCzk } from './format'
import { buildSummaryText, copyText, summaryRows } from './summary'

const items = sortByTer(etfs)
const input = { deposit: 5000, years: 10 }

describe('summaryRows', () => {
  it('has one row per fund with one value per year', () => {
    const rows = summaryRows(items, input)
    expect(rows.map((row) => row.ticker)).toEqual([
      'IVV',
      'VOO',
      'VTI',
      'SCHD',
      'QQQ',
    ])
    for (const row of rows) expect(row.byYear).toHaveLength(10)
  })

  it('last year of the breakdown is exactly the fee in the main table', () => {
    for (const row of summaryRows(items, input)) {
      expect(row.byYear[9]).toBe(row.total)
    }
  })

  it('matches appendix A for 5 000 Kc and 10 years', () => {
    const shown = Object.fromEntries(
      summaryRows(items, input).map((row) => [
        row.ticker,
        formatCzk(row.total, 2),
      ]),
    )
    expect(shown.IVV).toBe('907,50 Kč')
    expect(shown.SCHD).toBe('1 815,00 Kč')
    expect(shown.QQQ).toBe('5 445,00 Kč')
  })

  it('works for other inputs too', () => {
    const [row] = summaryRows(items, { deposit: 100, years: 1 })
    expect(row.total).toBe(totalFee(100, row.ter, 12))
    expect(row.byYear).toEqual([row.total])
  })
})

describe('buildSummaryText', () => {
  const text = buildSummaryText(items, input)

  it('has no no-break spaces', () => {
    expect(text).not.toMatch(/[  ]/)
  })

  it('contains the scenario, the fees and the questions', () => {
    expect(text).toContain(
      'Měsíční vklad 5 000 Kč, doba 10 let, vloženo celkem 600 000 Kč.',
    )
    expect(text).toContain(
      'IVV: TER 0,03 %, poplatek fondu za 10 let: 907,50 Kč',
    )
    expect(text).toContain(
      'QQQ: TER 0,18 %, poplatek fondu za 10 let: 5 445,00 Kč',
    )
    expect(text).toContain('5. Poskytujete k nákupu poradenství')
    expect(text).toContain('Rok 10: IVV 907,50 Kč')
  })

  it('uses the right year form', () => {
    expect(buildSummaryText(items, { deposit: 5000, years: 1 })).toContain(
      'doba 1 rok',
    )
    expect(buildSummaryText(items, { deposit: 5000, years: 3 })).toContain(
      'doba 3 roky',
    )
  })
})

describe('copyText', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns true when the clipboard accepts the text', async () => {
    let copied = ''
    vi.stubGlobal('navigator', {
      clipboard: { writeText: async (value: string) => void (copied = value) },
    })
    expect(await copyText('abc')).toBe(true)
    expect(copied).toBe('abc')
  })

  it('returns false when writeText rejects', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: () => Promise.reject(new Error('denied')) },
    })
    expect(await copyText('abc')).toBe(false)
  })

  it('returns false when there is no clipboard or writeText throws', async () => {
    vi.stubGlobal('navigator', {})
    expect(await copyText('abc')).toBe(false)
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: () => {
          throw new Error('sync')
        },
      },
    })
    expect(await copyText('abc')).toBe(false)
  })
})
