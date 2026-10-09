import { riskContent } from '../content'

export function Footer() {
  return (
    <footer id="rizika" aria-labelledby="rizika-nadpis">
      <h2 id="rizika-nadpis">{riskContent.heading}</h2>
      <ul>
        {riskContent.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{riskContent.operator}</p>
    </footer>
  )
}
