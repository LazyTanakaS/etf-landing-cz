import { useEffect, useState } from 'react'
import { parseDeposit, parseYears } from './calculator'
import { Brokers } from './components/Brokers'
import { Calculator } from './components/Calculator'
import { EtfTable } from './components/EtfTable'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { Risks } from './components/Risks'
import { Summary } from './components/Summary'
import { etfs, sortByTer } from './data/etfs'
import { track } from './track'
import type { SummaryInput } from './summary'
import { pickHeroVariant } from './variant'

// Defaults of the calculator (docs/copy-cs.md, section 5).
const DEFAULT_DEPOSIT = 5000
const DEFAULT_YEARS = 10

function App() {
  // One sorted list, so the table and the calculator offer the same order.
  const sorted = sortByTer(etfs)

  // The calculator state lives here so the form can hand it to the summary.
  // It stays in the memory of this page: not stored, not sent (the form says
  // "neukládáme").
  const [depositText, setDepositText] = useState(String(DEFAULT_DEPOSIT))
  const [yearsText, setYearsText] = useState(String(DEFAULT_YEARS))
  // Last valid values, used when the input is invalid at the moment of submit.
  const [lastDeposit, setLastDeposit] = useState(DEFAULT_DEPOSIT)
  const [lastYears, setLastYears] = useState(DEFAULT_YEARS)
  const [summaryInput, setSummaryInput] = useState<SummaryInput | null>(null)

  function changeDepositText(value: string) {
    setDepositText(value)
    const parsed = parseDeposit(value)
    if (parsed !== null) setLastDeposit(parsed)
  }

  function changeYearsText(value: string) {
    setYearsText(value)
    const parsed = parseYears(value)
    if (parsed !== null) setLastYears(parsed)
  }

  // Read once: the hero copy cannot change while the page is open.
  const [heroVariant] = useState(() => pickHeroVariant(window.location.search))

  // StrictMode runs this effect twice in dev. That is harmless: the tracker
  // sends each event at most once per page load.
  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <>
      <Hero variant={heroVariant} />
      <main>
        <EtfTable items={sorted} />
        <Brokers />
        <Calculator
          items={sorted}
          depositText={depositText}
          yearsText={yearsText}
          onDepositTextChange={changeDepositText}
          onYearsTextChange={changeYearsText}
        />
        {summaryInput === null ? (
          <LeadForm
            onSuccess={() =>
              setSummaryInput({ deposit: lastDeposit, years: lastYears })
            }
          />
        ) : (
          <Summary items={sorted} input={summaryInput} />
        )}
        <Risks />
      </main>
      <Footer items={sorted} />
    </>
  )
}

export default App
