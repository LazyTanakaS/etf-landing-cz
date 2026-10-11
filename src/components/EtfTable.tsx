import { tableContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatDate, formatTer } from '../format'
import { InfoIcon } from './Icons'

interface EtfTableProps {
  items: readonly Etf[]
}

// Date, caveat and source under the TER. Used by the card and by the table row.
function TerDetails({ etf }: { etf: Etf }) {
  const text = tableContent

  return (
    <>
      {etf.terAsOf !== null ? (
        <span className="src">
          {text.terAsOf} {formatDate(etf.terAsOf)}
        </span>
      ) : (
        <span className="src missing">{text.terAsOfMissing}</span>
      )}
      {etf.terCaveat !== null && (
        <span className="caveat">
          <InfoIcon />
          {etf.terCaveat}
        </span>
      )}
      <span className="src">
        {text.source}:{' '}
        <a href={etf.sourceUrl} rel="noopener noreferrer">
          {etf.sourceName}
        </a>
        , {text.retrieved} {formatDate(etf.retrievedOn)}
      </span>
    </>
  )
}

// Two renderings of the same rows: cards below 40rem, a real table from 40rem.
// The CSS hides one of them with display: none, so a screen reader sees only
// the visible one.
export function EtfTable({ items }: EtfTableProps) {
  const text = tableContent

  return (
    <section className="section" id="tabulka" aria-labelledby="tabulka-nadpis">
      <div className="sec-head">
        <h2 id="tabulka-nadpis">{text.heading}</h2>
      </div>
      <p className="caption" id="tabulka-popisek">
        {text.sortLabel}
      </p>

      <ul className="fund-list">
        {items.map((etf) => (
          <li className="fund-card" key={etf.ticker}>
            <div className="fund-top">
              <div>
                <span className="ticker">{etf.ticker}</span>
                {etf.name !== null && (
                  <span className="fund-name">{etf.name}</span>
                )}
              </div>
              <div className="ter-top">
                <span className="ter-label">{text.terLabel}</span>
                <span className="ter-big">{formatTer(etf.ter)}</span>
              </div>
            </div>
            <dl className="fund-dl">
              <div className="fund-row">
                <dt>{text.columns.exchange}</dt>
                <dd className={etf.exchange === null ? 'missing' : undefined}>
                  {etf.exchange ?? text.exchangeMissing}
                </dd>
              </div>
              <div className="fund-row">
                <dt>{text.columns.ter}</dt>
                <dd>
                  <TerDetails etf={etf} />
                </dd>
              </div>
              <div className="fund-row">
                <dt>{text.columns.availability}</dt>
                <dd>{text.availability}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="fund-table-box">
        <table
          className="funds"
          aria-labelledby="tabulka-nadpis"
          aria-describedby="tabulka-popisek"
        >
          <thead>
            <tr>
              <th scope="col">{text.columns.fund}</th>
              <th scope="col">{text.columns.exchange}</th>
              <th scope="col">{text.columns.ter}</th>
              <th scope="col">{text.columns.availability}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((etf) => (
              <tr key={etf.ticker}>
                <th scope="row">
                  <span className="ticker">{etf.ticker}</span>
                  {etf.name !== null && (
                    <span className="fund-name">{etf.name}</span>
                  )}
                </th>
                <td className={etf.exchange === null ? 'missing' : undefined}>
                  {etf.exchange ?? text.exchangeMissing}
                </td>
                <td>
                  <span className="ter-big">{formatTer(etf.ter)}</span>
                  <TerDetails etf={etf} />
                </td>
                <td>{text.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="note">{text.notes}</p>
    </section>
  )
}
