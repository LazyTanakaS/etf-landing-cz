import { EtfTable } from './components/EtfTable'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { etfs, sortByTer } from './data/etfs'

function App() {
  return (
    <>
      <Hero variant="A" />
      <main>
        <EtfTable items={sortByTer(etfs)} />
      </main>
      <Footer />
    </>
  )
}

export default App
