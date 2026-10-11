// Values come only from data/etf-sources.md (issuer pages, read on 2026-10-09;
// fund names on 2026-10-11).
// Anything the source does not show is null. Do not fill gaps from memory.

export interface Etf {
  ticker: string
  // Fund name as written on the issuer page (data/etf-sources.md, "Fund names").
  name: string | null
  // Exchange as shown on the issuer page, null when the page does not show it.
  exchange: string | null
  // Total expense ratio as a fraction (0.03 % = 0.0003), same convention as
  // appendix A in docs/strategy.md.
  ter: number
  // ISO date the issuer page gives for the TER ("as of"), null when it gives none.
  terAsOf: string | null
  sourceName: string
  sourceUrl: string
  // ISO date the source page was read.
  retrievedOn: string
  // Short note shown next to the TER, null when there is nothing to flag.
  terCaveat: string | null
}

export const etfs: Etf[] = [
  {
    ticker: 'IVV',
    name: 'iShares Core S&P 500 ETF',
    exchange: 'NYSE Arca',
    ter: 0.0003,
    terAsOf: null, // source: "no date"
    sourceName: 'iShares',
    sourceUrl:
      'https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf',
    retrievedOn: '2026-10-09',
    terCaveat: null,
  },
  {
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    exchange: null, // source: "not shown on page"
    ter: 0.0003,
    terAsOf: '2026-04-28',
    sourceName: 'Vanguard',
    sourceUrl:
      'https://investor.vanguard.com/investment-products/etfs/profile/voo',
    retrievedOn: '2026-10-09',
    terCaveat: null,
  },
  {
    ticker: 'VTI',
    name: 'Vanguard Morningstar Total Stock Market ETF',
    exchange: null, // source: "not shown on page"
    ter: 0.0003,
    terAsOf: '2026-04-28',
    sourceName: 'Vanguard',
    sourceUrl:
      'https://investor.vanguard.com/investment-products/etfs/profile/vti',
    retrievedOn: '2026-10-09',
    // Fund page shows 0.03 %, a secondary source shows 0.04 %, not resolved.
    // The prospectus was not opened (for any fund; the copy flags only VTI).
    terCaveat: 'údaj ze stránky fondu, prospekt neověřen',
  },
  {
    ticker: 'SCHD',
    name: 'Schwab U.S. Dividend Equity ETF',
    exchange: 'NYSE Arca',
    ter: 0.0006, // source writes 0.060 %
    terAsOf: null, // source: "no date"
    sourceName: 'Schwab',
    sourceUrl: 'https://www.schwabassetmanagement.com/products/schd',
    retrievedOn: '2026-10-09',
    terCaveat: null,
  },
  {
    ticker: 'QQQ',
    name: 'Invesco QQQ ETF',
    exchange: 'Nasdaq', // source: "Nasdaq/NMS (Global Market)"
    ter: 0.0018,
    terAsOf: '2026-10-08',
    sourceName: 'Invesco',
    sourceUrl: 'https://www.invesco.com/qqq-etf/en/about.html',
    retrievedOn: '2026-10-09',
    terCaveat: null,
  },
]

// Lowest TER first, equal TER ordered alphabetically by ticker.
export function sortByTer(items: readonly Etf[]): Etf[] {
  return [...items].sort(
    (a, b) => a.ter - b.ter || a.ticker.localeCompare(b.ticker),
  )
}
