import { Calculator } from './components/Calculator'
import { EtfTable } from './components/EtfTable'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { etfs, sortByTer } from './data/etfs'

function App() {
  // One sorted list, so the table and the calculator offer the same order.
  const sorted = sortByTer(etfs)

  return (
    <>
      <Hero variant="A" />
      <main>
        <EtfTable items={sorted} />
        <Calculator items={sorted} />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}

export default App
