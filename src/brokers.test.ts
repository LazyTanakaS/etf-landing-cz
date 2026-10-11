import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { brokerSentence, citeParts } from './brokers'
import { brokersContent } from './content'

// Section 4 of the copy doc: the bullet lines between "## 4." and "## 5.".
function docSection4Bullets(): string[] {
  const doc = readFileSync(
    new URL('../docs/copy-cs.md', import.meta.url),
    'utf8',
  )
  const start = doc.indexOf('## 4. ')
  const end = doc.indexOf('## 5. ')
  return doc
    .slice(start, end)
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2))
    .filter(
      (line) => !/^(Proč|\[právní riziko\]|Záměrně vynecháno):/.test(line),
    )
}

describe('broker block', () => {
  const normalize = (text: string) => text.replace(/ /g, ' ')

  it('has the same number of items as the doc', () => {
    expect(docSection4Bullets()).toHaveLength(brokersContent.items.length)
  })

  it('composes every item word for word as in docs/copy-cs.md, section 4', () => {
    const bullets = docSection4Bullets()
    brokersContent.items.forEach((item, index) => {
      expect(normalize(brokerSentence(item))).toBe(bullets[index])
    })
  })

  it('has no quotation marks around the paraphrases', () => {
    for (const item of brokersContent.items) {
      expect(brokerSentence(item)).not.toMatch(/["„“”]/)
    }
  })

  it('only the item without a source has no citation', () => {
    const withoutCite = brokersContent.items.filter(
      (item) => citeParts(item) === null,
    )
    expect(withoutCite.map((item) => item.id)).toEqual(['xtb-portu'])
  })

  it('every link goes to https and every citation has a link', () => {
    for (const item of brokersContent.items) {
      const links = (item.source ?? []).filter((part) => part.url)
      if (item.source !== null) expect(links.length).toBeGreaterThan(0)
      for (const part of links) expect(part.url).toMatch(/^https:\/\//)
    }
  })
})
