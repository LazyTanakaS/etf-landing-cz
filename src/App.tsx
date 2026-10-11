import { useEffect } from 'react'
import { Calculator } from './components/Calculator'
import { EtfTable } from './components/EtfTable'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { Risks } from './components/Risks'
import { etfs, sortByTer } from './data/etfs'
import { track } from './track'

function App() {
  // One sorted list, so the table and the calculator offer the same order.
  const sorted = sortByTer(etfs)

  // StrictMode runs this effect twice in dev. That is harmless: the tracker
  // sends each event at most once per page load.
  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <>
      <Hero variant="A" />
      <main>
        <EtfTable items={sorted} />
        <Calculator items={sorted} />
        <LeadForm />
        <Risks />
      </main>
      <Footer items={sorted} />
    </>
  )
}

export default App
