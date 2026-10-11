import { footerContent, riskContent, tableContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatDate } from '../format'
import { Placeholders } from './Placeholders'

interface FooterProps {
  items: readonly Etf[]
}

export function Footer({ items }: FooterProps) {
  return (
    <footer className="footer on-dark" aria-labelledby="zdroje-nadpis">
      <div className="wrap">
        <div className="masthead" aria-hidden="true" />
        <h2 id="zdroje-nadpis">{footerContent.heading}</h2>
        <ul className="src-list num">
          {items.map((etf) => (
            <li key={etf.ticker}>
              <b>{etf.ticker}</b>{' '}
              <a href={etf.sourceUrl} rel="noopener noreferrer">
                {etf.sourceName}
              </a>
              , {tableContent.retrieved} {formatDate(etf.retrievedOn)}
            </li>
          ))}
        </ul>
        <p className="foot-op">
          <Placeholders text={riskContent.operator} />
        </p>
      </div>
    </footer>
  )
}
