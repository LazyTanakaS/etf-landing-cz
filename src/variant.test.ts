import { describe, expect, it } from 'vitest'
import { pickHeroVariant, readAdVariant } from './variant'

describe('readAdVariant', () => {
  it('reads a and b', () => {
    expect(readAdVariant('?utm_content=a')).toBe('a')
    expect(readAdVariant('?utm_content=b')).toBe('b')
  })

  it('normalizes case: "A" and "B" count as a and b', () => {
    expect(readAdVariant('?utm_content=A')).toBe('a')
    expect(readAdVariant('?utm_content=B')).toBe('b')
  })

  it('trims spaces: " a " counts as a', () => {
    // %20 is a space in a URL; + is a space in a query string.
    expect(readAdVariant('?utm_content=%20a%20')).toBe('a')
    expect(readAdVariant('?utm_content=+B+')).toBe('b')
  })

  it('works with or without the leading question mark', () => {
    expect(readAdVariant('utm_content=a')).toBe('a')
  })

  it('returns null when the parameter is missing or empty', () => {
    expect(readAdVariant('')).toBeNull()
    expect(readAdVariant('?')).toBeNull()
    expect(readAdVariant('?utm_source=facebook')).toBeNull()
    expect(readAdVariant('?utm_content=')).toBeNull()
    expect(readAdVariant('?utm_content=%20%20')).toBeNull()
  })

  it('returns null for any other value', () => {
    expect(readAdVariant('?utm_content=c')).toBeNull()
    expect(readAdVariant('?utm_content=ab')).toBeNull()
    expect(readAdVariant('?utm_content=a%20b')).toBeNull()
    expect(readAdVariant('?utm_content=variant-a')).toBeNull()
    expect(readAdVariant('?utm_content=1')).toBeNull()
  })

  it('ignores other parameters and takes the first utm_content', () => {
    expect(readAdVariant('?utm_source=x&utm_content=b&utm_medium=cpc')).toBe(
      'b',
    )
    expect(readAdVariant('?utm_content=a&utm_content=b')).toBe('a')
    expect(readAdVariant('?utm_content=c&utm_content=a')).toBeNull()
  })
})

describe('pickHeroVariant', () => {
  it('a and A give hero A', () => {
    expect(pickHeroVariant('?utm_content=a')).toBe('A')
    expect(pickHeroVariant('?utm_content=A')).toBe('A')
  })

  it('b and B give hero B', () => {
    expect(pickHeroVariant('?utm_content=b')).toBe('B')
    expect(pickHeroVariant('?utm_content=B')).toBe('B')
  })

  it('any other value gives hero A', () => {
    expect(pickHeroVariant('?utm_content=c')).toBe('A')
  })

  it('empty value and missing parameter give hero A', () => {
    expect(pickHeroVariant('?utm_content=')).toBe('A')
    expect(pickHeroVariant('')).toBe('A')
    expect(pickHeroVariant('?utm_source=x')).toBe('A')
  })

  it('shares the parsing of readAdVariant (spaces, other parameters)', () => {
    expect(pickHeroVariant('?utm_content=+B+')).toBe('B')
    expect(pickHeroVariant('?utm_source=x&utm_content=b')).toBe('B')
  })
})
