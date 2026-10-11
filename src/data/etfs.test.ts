import { describe, expect, it } from 'vitest'
import { etfs } from './etfs'

describe('etfs', () => {
  it('every fund has a name', () => {
    for (const etf of etfs) {
      expect(etf.name, etf.ticker).not.toBeNull()
      expect(etf.name?.trim(), etf.ticker).toBeTruthy()
    }
  })

  it('no placeholder text is left in the names', () => {
    for (const etf of etfs) {
      expect(etf.name, etf.ticker).not.toMatch(/\[|\]|doplnit|název z webu/i)
    }
  })
})
