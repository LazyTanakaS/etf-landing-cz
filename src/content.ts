// All Czech page copy lives here, word for word from docs/copy-cs.md.
// Components only render it. Change the wording in the doc first.

// docs/copy-cs.md, section 2 (hero). Only variant A for now.
export const heroContent = {
  A: {
    heading: 'Kolik činí poplatek fondu za 10 let?',
    subheading:
      'Pět amerických ETF vedle sebe. U každého poplatek fondu (TER), zdroj a datum. A kalkulačka, která poplatek spočítá pro vaši částku.',
    cta: 'Spočítat poplatek',
    note: 'Informativní obsah, nejde o investiční doporučení a investice nesou riziko ztráty.',
    riskLinkLabel: 'Poučení o rizicích',
  },
} as const

export type HeroVariant = keyof typeof heroContent

// docs/copy-cs.md, section 3 (table).
export const tableContent = {
  heading: 'Pět amerických ETF vedle sebe',
  sortLabel:
    'Řazeno podle poplatku fondu (TER), od nejnižšího. Při stejném poplatku abecedně podle symbolu.',
  columns: {
    fund: 'Burzovní symbol a název',
    exchange: 'Burza (podle stránky emitenta)',
    ter: 'Poplatek fondu (TER)',
    availability: 'Dostupnost',
  },
  exchangeMissing: 'neuvedeno',
  terAsOf: 'k datu',
  terAsOfMissing: 'datum na stránce neuvedeno',
  source: 'Zdroj',
  retrieved: 'načteno',
  availability: 'Záleží na brokerovi. Ověřte před nákupem.',
  notes:
    'QQQ je podle stránky emitenta kótován na Nasdaq, ne na NYSE. Poplatek fondu je jen jedna ze složek nákladů. Poplatky brokera, směna měn a daně v něm nejsou.',
} as const

// docs/copy-cs.md, section 8 (risk notice). The final wording is for
// [PROVOZOVATEL] or a lawyer to approve.
export const riskContent = {
  heading: 'Poučení o rizicích',
  items: [
    'Investování je spojeno s rizikem. Hodnota investice může klesat i stoupat a můžete získat zpět méně, než jste vložili.',
    'Tato stránka neuvádí ani neslibuje žádný výnos.',
    'Pokud fond obchoduje v jiné měně než koruna, působí na hodnotu vaší investice i kurz.',
    'Poplatek fondu (TER) je jen jedna ze složek nákladů. K němu se mohou přičíst poplatky brokera, směna měn a daně.',
    'Dostupnost amerických ETF se u brokerů a v čase liší. Údaje jsou načteny 9. 10. 2026 a mohou být zastaralé. Před nákupem je ověřte u svého brokera.',
    'Stránka je informativní. Není investičním poradenstvím ani doporučením koupit či prodat konkrétní fond.',
    'Daňové zacházení závisí na vaší situaci. Stránka ho neposuzuje.',
  ],
  operator: 'Provozovatel: [PROVOZOVATEL: název, sídlo, kontakt].',
} as const
