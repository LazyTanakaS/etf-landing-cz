import { riskContent } from '../content'
import { Placeholders } from './Placeholders'

export function Risks() {
  return (
    <section className="section" id="rizika" aria-labelledby="rizika-nadpis">
      <div className="sheet risk-wrap">
        <div className="sec-head">
          <h2 id="rizika-nadpis">{riskContent.heading}</h2>
        </div>
        <div>
          <ol className="risk-list">
            {riskContent.items.map((item) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="operator">
            <Placeholders text={riskContent.operator} />
          </p>
        </div>
      </div>
    </section>
  )
}
