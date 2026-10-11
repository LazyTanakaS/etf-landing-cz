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
  // Label above the big TER number in the mobile card (session 06b).
  terLabel: 'TER',
  exchangeMissing: 'neuvedeno',
  terAsOf: 'k datu',
  terAsOfMissing: 'datum na stránce neuvedeno',
  source: 'Zdroj',
  retrieved: 'načteno',
  availability: 'Záleží na brokerovi. Ověřte před nákupem.',
  notes:
    'QQQ je podle stránky emitenta kótován na Nasdaq, ne na NYSE. Poplatek fondu je jen jedna ze složek nákladů. Poplatky brokera, směna měn a daně v něm nejsou.',
} as const

// docs/copy-cs.md, section 5 (calculator). Labels are the text only, the units
// stand next to the fields. Error texts and year forms: see the same section.
// not in the doc yet.
export const calculatorContent = {
  heading: 'Kalkulačka poplatku fondu (TER)',
  subheading: 'Bez zhodnocení a bez poplatků brokera.',
  fields: {
    fund: 'Fond',
    deposit: 'Měsíční vklad',
    years: 'Doba investování',
  },
  units: {
    deposit: 'Kč',
  },
  yearsForms: {
    one: 'rok',
    few: 'roky',
    many: 'let',
  },
  depositError: (min: string, max: string) =>
    `Zadejte měsíční vklad v celých korunách od ${min} do ${max}.`,
  yearsError: (min: number, max: number) =>
    `Zadejte dobu investování v celých letech od ${min} do ${max}.`,
  result: (years: number, yearsForm: string, fee: string, invested: string) =>
    `Poplatek fondu za ${years} ${yearsForm}: ${fee}. Z vložených ${invested}. Ilustrace, výpočet.`,
  belowResult:
    'Je to jen poplatek fondu. Poplatky brokera, směna měn a daně v něm nejsou. Výsledek není předpověď.',
  assumption:
    'Předpoklad výpočtu: vkládáte na začátku každého měsíce. Každý měsíc se z držené hodnoty účtuje jedna dvanáctina ročního poplatku fondu (TER). Zhodnocení 0 %, bez poplatků brokera a směny měn.',
  // Every value is computed, the text has no fixed number.
  illustration: (
    deposit: string,
    years: number,
    invested: string,
    minTer: string,
    maxTer: string,
    gap: string,
  ) =>
    `Pro představu, ilustrace, výpočet: při ${deposit} měsíčně po dobu ${years} let (vloženo ${invested}), bez zhodnocení a bez poplatků brokera, je rozdíl mezi nejnižším (${minTer}) a nejvyšším (${maxTer}) poplatkem fondu z této tabulky ${gap}.`,
} as const

// Stored with every lead (leads.consent_text_version) so a lead can be matched
// to the exact consent wording it agreed to. The text below still contains the
// [PROVOZOVATEL] placeholders. When the operator fills them in, the wording
// changes, so this MUST be raised to 'v2' (and 'v3', ...) in the same commit.
// The database accepts 'v' plus 1-3 digits (leads_consent_text_version_check).
export const CONSENT_TEXT_VERSION = 'v1'

// docs/copy-cs.md, section 6 (form). The consent text is [právní riziko]:
// purpose and controller are for [PROVOZOVATEL] to fill in.
export const leadFormContent = {
  heading: 'Souhrn pro váš scénář',
  intro:
    'Po zadání e-mailu se na obrazovce zobrazí souhrn: částka, doba, všech pět fondů, rozpis po letech a otázky pro brokera. E-mailem ho neposíláme.',
  emailLabel: 'E-mail',
  emailPlaceholder: 'jmeno@priklad.cz',
  consent:
    'Souhlasím se zpracováním e-mailové adresy za účelem [PROVOZOVATEL: účel]. Správce: [PROVOZOVATEL: název, kontakt]. Souhlas mohu kdykoli odvolat na [PROVOZOVATEL: kontakt].',
  submit: 'Zobrazit souhrn',
  note: 'Souhrn se vytvoří ve vašem prohlížeči. Zadanou částku a dobu neukládáme.',
  emailError: 'Zadejte e-mail ve tvaru jmeno@domena.cz.',
  consentError: 'Bez souhlasu souhrn zobrazit nemůžeme.',
  // Proposal, author to approve (návrh, schválí autor). Not in
  // docs/copy-cs.md yet: the author moves the approved wording there.
  sending: 'Odesílám…',
  sendError:
    'Odeslání se nepodařilo. Zkontrolujte připojení a zkuste to znovu. Váš e-mail ve formuláři zůstal.',
  retry: 'Zkusit znovu',
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

// docs/copy-cs.md, section 8 (footer heading, session 06b).
export const footerContent = {
  heading: 'Zdroje',
} as const
