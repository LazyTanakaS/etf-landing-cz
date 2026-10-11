import { tableContent, type BrokerItem, type SourcePart } from './content'
import { formatDate } from './format'

// The citation in brackets, as parts so the component can link some of them:
// "(" + source + ", načteno 9. 10. 2026.)". null = the item has no source.
export function citeParts(item: BrokerItem): SourcePart[] | null {
  if (item.source === null || item.retrievedOn === null) return null
  return [
    { text: '(' },
    ...item.source,
    {
      text: `, ${tableContent.retrieved} ${formatDate(item.retrievedOn)}.)`,
    },
  ]
}

// The whole item as one plain string. The component renders exactly these
// parts, so this is what the doc comparison in brokers.test.ts checks.
export function brokerSentence(item: BrokerItem): string {
  const cite = citeParts(item)
  if (cite === null) return item.text
  return `${item.text} ${cite.map((part) => part.text).join('')}`
}
