import { describe, expect, it } from 'vitest'
import { splitPlaceholders } from './placeholders'

describe('splitPlaceholders', () => {
  it('returns one plain part when there is no placeholder', () => {
    expect(splitPlaceholders('Bez zástupných textů.')).toEqual([
      { text: 'Bez zástupných textů.', placeholder: false },
    ])
  })

  it('marks each [PROVOZOVATEL ...] part and keeps the text around it', () => {
    expect(
      splitPlaceholders(
        'Správce: [PROVOZOVATEL: název, kontakt]. Odvolat na [PROVOZOVATEL: kontakt].',
      ),
    ).toEqual([
      { text: 'Správce: ', placeholder: false },
      { text: '[PROVOZOVATEL: název, kontakt]', placeholder: true },
      { text: '. Odvolat na ', placeholder: false },
      { text: '[PROVOZOVATEL: kontakt]', placeholder: true },
      { text: '.', placeholder: false },
    ])
  })

  it('does not treat other brackets as placeholders', () => {
    expect(splitPlaceholders('[doplnit]')).toEqual([
      { text: '[doplnit]', placeholder: false },
    ])
  })

  it('returns no parts for an empty string', () => {
    expect(splitPlaceholders('')).toEqual([])
  })
})
