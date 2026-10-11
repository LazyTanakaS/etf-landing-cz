import { describe, expect, it } from 'vitest'
import { cumulativeFees, totalFee } from './fees'
import { formatCzk } from './format'
import { etfs } from './data/etfs'

describe('totalFee', () => {
  it('is 0 for 0 months', () => {
    expect(totalFee(5000, 0.0003, 0)).toBe(0)
  })

  it('matches appendix A', () => {
    expect(totalFee(5000, 0.0003, 1)).toBeCloseTo(0.125)
    expect(totalFee(5000, 0.0003, 12)).toBeCloseTo(9.75)
    expect(totalFee(5000, 0.0003, 120)).toBeCloseTo(907.5)
    expect(totalFee(5000, 0.0006, 120)).toBeCloseTo(1815)
    expect(totalFee(5000, 0.0018, 120)).toBeCloseTo(5445)
  })

  it('scales linearly with deposit and with TER', () => {
    const base = totalFee(5000, 0.0003, 120)
    expect(totalFee(10000, 0.0003, 120)).toBeCloseTo(base * 2)
    expect(totalFee(5000, 0.0006, 120)).toBeCloseTo(base * 2)
  })

  it('is 0 when TER is 0', () => {
    expect(totalFee(5000, 0, 120)).toBe(0)
  })
})

describe('cumulativeFees', () => {
  it('has one item per year', () => {
    expect(cumulativeFees(5000, 0.0003, 1)).toHaveLength(1)
    expect(cumulativeFees(5000, 0.0003, 10)).toHaveLength(10)
    expect(cumulativeFees(5000, 0.0003, 20)).toHaveLength(20)
  })

  it('item k is totalFee after 12 * k months', () => {
    const rows = cumulativeFees(5000, 0.0003, 10)
    expect(rows[0]).toBe(totalFee(5000, 0.0003, 12))
    expect(rows[0]).toBeCloseTo(9.75)
    expect(rows[4]).toBe(totalFee(5000, 0.0003, 60))
  })

  it('last row is exactly the fee of the main table (5 000 Kc, 10 years)', () => {
    const cases = [
      { ter: 0.0003, shown: '907,50\u00A0Kč' },
      { ter: 0.0006, shown: '1\u00A0815,00\u00A0Kč' },
      { ter: 0.0018, shown: '5\u00A0445,00\u00A0Kč' },
    ]
    for (const { ter, shown } of cases) {
      const rows = cumulativeFees(5000, ter, 10)
      expect(rows[9]).toBe(totalFee(5000, ter, 120))
      expect(formatCzk(rows[9], 2)).toBe(shown)
    }
    expect(cumulativeFees(5000, 0.0003, 10)[9]).toBeCloseTo(907.5)
    expect(cumulativeFees(5000, 0.0006, 10)[9]).toBeCloseTo(1815)
    expect(cumulativeFees(5000, 0.0018, 10)[9]).toBeCloseTo(5445)
  })

  it('grows from year to year', () => {
    const rows = cumulativeFees(5000, 0.0018, 20)
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i]).toBeGreaterThan(rows[i - 1])
    }
  })
})

describe('illustration', () => {
  it('gap between the lowest and highest TER in etfs.ts is 4537.50', () => {
    const ters = etfs.map((etf) => etf.ter)
    const gap =
      totalFee(5000, Math.max(...ters), 120) -
      totalFee(5000, Math.min(...ters), 120)
    expect(gap).toBeCloseTo(4537.5)
  })
})
