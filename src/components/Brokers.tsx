import { citeParts } from '../brokers'
import { brokersContent } from '../content'

// Paraphrases of what the brokers say on their own pages. Not quotes: plain
// paragraphs, no quotation marks, no <blockquote>.
export function Brokers() {
  const text = brokersContent

  return (
    <section className="section" id="brokeri" aria-labelledby="brokeri-nadpis">
      <div className="sec-head">
        <h2 id="brokeri-nadpis">{text.heading}</h2>
      </div>
      <ul className="quotes">
        {text.items.map((item) => {
          const cite = citeParts(item)
          return (
            <li className="quote" key={item.id}>
              <p>{item.text}</p>
              {cite !== null && (
                <cite>
                  {cite.map((part, index) =>
                    part.url !== undefined ? (
                      <a key={index} href={part.url} rel="noopener noreferrer">
                        {part.text}
                      </a>
                    ) : (
                      part.text
                    ),
                  )}
                </cite>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
