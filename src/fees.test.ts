import { describe, expect, it } from 'vitest'
import { feeForYear, totalFee } from './fees'

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

describe('feeForYear', () => {
  it('matches appendix A', () => {
    expect(feeForYear(5000, 0.0003, 1)).toBeCloseTo(9.75)
    expect(feeForYear(5000, 0.0003, 2)).toBeCloseTo(27.75)
    expect(feeForYear(5000, 0.0003, 10)).toBeCloseTo(171.75)
  })

  it('adds up to the total fee over 10 years', () => {
    let sum = 0
    for (let year = 1; year <= 10; year++) {
      sum += feeForYear(5000, 0.0003, year)
    }
    expect(sum).toBeCloseTo(totalFee(5000, 0.0003, 120))
  })
})
