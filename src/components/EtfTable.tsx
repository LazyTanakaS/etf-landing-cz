import { tableContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatDate, formatTer } from '../format'

interface EtfTableProps {
  items: readonly Etf[]
}

// Table roles are set explicitly: on narrow screens the CSS turns rows into
// cards (display: block), which drops the native table semantics in some browsers.
export function EtfTable({ items }: EtfTableProps) {
  const text = tableContent

  return (
    <section id="tabulka" aria-labelledby="tabulka-nadpis">
      <h2 id="tabulka-nadpis">{text.heading}</h2>
      <table role="table">
        <caption>{text.sortLabel}</caption>
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" scope="col">{text.columns.fund}</th>
            <th role="columnheader" scope="col">{text.columns.exchange}</th>
            <th role="columnheader" scope="col">{text.columns.ter}</th>
            <th role="columnheader" scope="col">{text.columns.availability}</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {items.map((etf) => (
            <tr role="row" key={etf.ticker}>
              <th role="rowheader" scope="row" data-label={text.columns.fund}>
                <span className="ticker">{etf.ticker}</span>
                {etf.name !== null && <span className="fund-name">{etf.name}</span>}
              </th>
              <td role="cell" data-label={text.columns.exchange}>
                {etf.exchange ?? text.exchangeMissing}
              </td>
              <td role="cell" data-label={text.columns.ter}>
                <strong>{formatTer(etf.ter)}</strong>
                <span className="small">
                  {etf.terAsOf !== null
                    ? `${text.terAsOf} ${formatDate(etf.terAsOf)}`
                    : text.terAsOfMissing}
                </span>
                {etf.terCaveat !== null && (
                  <span className="small">{etf.terCaveat}</span>
                )}
                <span className="small">
                  {text.source}:{' '}
                  <a href={etf.sourceUrl} rel="noopener noreferrer">
                    {etf.sourceName}
                  </a>
                  , {text.retrieved} {formatDate(etf.retrievedOn)}
                </span>
              </td>
              <td role="cell" data-label={text.columns.availability}>
                {text.availability}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="small">{text.notes}</p>
    </section>
  )
}
