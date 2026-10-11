import { describe, expect, it } from 'vitest'
import {
  illustration,
  parseDeposit,
  parseYears,
  scenario,
  yearsForm,
  yearsUnit,
} from './calculator'
import { etfs } from './data/etfs'

describe('parseDeposit', () => {
  it('accepts whole numbers in range, with or without spaces', () => {
    expect(parseDeposit('5000')).toBe(5000)
    expect(parseDeposit('5 000')).toBe(5000)
    expect(parseDeposit('5 000')).toBe(5000)
    expect(parseDeposit('1 000 000')).toBe(1_000_000)
  })

  it('rejects empty, zero, negative, decimal and non-numeric input', () => {
    expect(parseDeposit('')).toBeNull()
    expect(parseDeposit('   ')).toBeNull()
    expect(parseDeposit('0')).toBeNull()
    expect(parseDeposit('-5000')).toBeNull()
    expect(parseDeposit('5000,5')).toBeNull()
    expect(parseDeposit('5000.5')).toBeNull()
    expect(parseDeposit('abc')).toBeNull()
    expect(parseDeposit('1e3')).toBeNull()
  })

  it('has the limits 100 and 1 000 000 inclusive', () => {
    expect(parseDeposit('99')).toBeNull()
    expect(parseDeposit('100')).toBe(100)
    expect(parseDeposit('1000000')).toBe(1_000_000)
    expect(parseDeposit('1000001')).toBeNull()
  })
})

describe('parseYears', () => {
  it('has the limits 1 and 20 inclusive', () => {
    expect(parseYears('0')).toBeNull()
    expect(parseYears('1')).toBe(1)
    expect(parseYears('20')).toBe(20)
    expect(parseYears('21')).toBeNull()
  })

  it('rejects empty, negative, decimal and non-numeric input', () => {
    expect(parseYears('')).toBeNull()
    expect(parseYears('-5')).toBeNull()
    expect(parseYears('2,5')).toBeNull()
    expect(parseYears('abc')).toBeNull()
  })
})

describe('yearsUnit', () => {
  const words = { one: 'rok', few: 'roky', many: 'let' }

  it.each([
    [1, 'rok'],
    [2, 'roky'],
    [4, 'roky'],
    [5, 'let'],
    [10, 'let'],
    [20, 'let'],
  ])('%i → %s', (years, expected) => {
    expect(yearsUnit(years, words)).toBe(expected)
  })

  it('keeps "roky" while the input is invalid', () => {
    expect(yearsUnit(null, words)).toBe('roky')
  })
})

describe('yearsForm', () => {
  it('uses "rok" for 1, "roky" for 2-4 and "let" for 5-20', () => {
    expect(yearsForm(1)).toBe('one')
    expect(yearsForm(2)).toBe('few')
    expect(yearsForm(3)).toBe('few')
    expect(yearsForm(4)).toBe('few')
    expect(yearsForm(5)).toBe('many')
    expect(yearsForm(10)).toBe('many')
    expect(yearsForm(20)).toBe('many')
  })
})

describe('scenario', () => {
  it('turns years into months and matches appendix A', () => {
    const tenYears = scenario(5000, 0.0003, 10)
    expect(tenYears.months).toBe(120)
    expect(tenYears.fee).toBeCloseTo(907.5)
    expect(tenYears.invested).toBe(600_000)

    const oneYear = scenario(5000, 0.0003, 1)
    expect(oneYear.months).toBe(12)
    expect(oneYear.fee).toBeCloseTo(9.75)
    expect(oneYear.invested).toBe(60_000)
  })
})

describe('illustration', () => {
  it('uses the lowest and highest TER in etfs.ts', () => {
    const result = illustration(etfs)
    expect(result.minTer).toBe(0.0003)
    expect(result.maxTer).toBe(0.0018)
  })

  it('gives 4537.50 Kč from 600 000 Kč invested over 10 years', () => {
    const result = illustration(etfs)
    expect(result.gap).toBeCloseTo(4537.5)
    expect(result.invested).toBe(600_000)
    expect(result.years).toBe(10)
  })

  it('follows the data, not a fixed number', () => {
    const doubled = etfs.map((etf) => ({ ...etf, ter: etf.ter * 2 }))
    expect(illustration(doubled).gap).toBeCloseTo(illustration(etfs).gap * 2)
  })
})
