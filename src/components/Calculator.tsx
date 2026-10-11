import { useEffect, useState } from 'react'
import {
  illustration,
  limits,
  parseDeposit,
  parseYears,
  scenario,
  yearsForm,
} from '../calculator'
import { calculatorContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatCzk, formatNumber, formatTer } from '../format'
import { track } from '../track'

interface CalculatorProps {
  items: readonly Etf[]
}

export function Calculator({ items }: CalculatorProps) {
  const text = calculatorContent
  const [ticker, setTicker] = useState(items[0].ticker)
  const [depositText, setDepositText] = useState('5000')
  const [yearsText, setYearsText] = useState('10')
  // An error shows after the field is left, and stays live from then on.
  const [depositTouched, setDepositTouched] = useState(false)
  const [yearsTouched, setYearsTouched] = useState(false)
  // Set by the first change of the fund, the deposit or the years.
  const [interacted, setInteracted] = useState(false)

  const etf = items.find((item) => item.ticker === ticker) ?? items[0]
  const deposit = parseDeposit(depositText)
  const years = parseYears(yearsText)
  const result =
    deposit !== null && years !== null ? scenario(deposit, etf.ter, years) : null
  const gap = illustration(items)

  // The defaults (5 000 Kč, 10 years) already show a valid result on load, so
  // "a valid result is on screen" alone would fire for every visitor. It counts
  // as use only after the visitor changed something. The tracker sends it once.
  const hasResult = result !== null
  useEffect(() => {
    if (interacted && hasResult) track('calc_used')
  }, [interacted, hasResult])

  const showDepositError = depositTouched && deposit === null
  const showYearsError = yearsTouched && years === null

  return (
    <section id="kalkulacka" aria-labelledby="kalkulacka-nadpis">
      <h2 id="kalkulacka-nadpis">{text.heading}</h2>
      <p>{text.subheading}</p>

      <div className="calc-fields">
        <div className="calc-field">
          <label htmlFor="kalkulacka-fond">{text.fields.fund}</label>
          <select
            id="kalkulacka-fond"
            value={ticker}
            onChange={(event) => {
              setTicker(event.target.value)
              setInteracted(true)
            }}
          >
            {items.map((item) => (
              <option key={item.ticker} value={item.ticker}>
                {item.ticker}
              </option>
            ))}
          </select>
        </div>

        <div className="calc-field">
          <label htmlFor="kalkulacka-vklad">{text.fields.deposit}</label>
          <div className="calc-input-row">
            <input
              id="kalkulacka-vklad"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={depositText}
              onChange={(event) => {
                setDepositText(event.target.value)
                setInteracted(true)
              }}
              onBlur={() => setDepositTouched(true)}
              aria-invalid={showDepositError}
              aria-describedby={`kalkulacka-vklad-jednotka${showDepositError ? ' kalkulacka-vklad-chyba' : ''}`}
            />
            <span id="kalkulacka-vklad-jednotka">{text.units.deposit}</span>
          </div>
          {showDepositError && (
            <p id="kalkulacka-vklad-chyba" className="calc-error">
              {text.depositError(
                formatNumber(limits.deposit.min),
                formatNumber(limits.deposit.max),
              )}
            </p>
          )}
        </div>

        <div className="calc-field">
          <label htmlFor="kalkulacka-roky">{text.fields.years}</label>
          <div className="calc-input-row">
            <input
              id="kalkulacka-roky"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={yearsText}
              onChange={(event) => {
                setYearsText(event.target.value)
                setInteracted(true)
              }}
              onBlur={() => setYearsTouched(true)}
              aria-invalid={showYearsError}
              aria-describedby={`kalkulacka-roky-jednotka${showYearsError ? ' kalkulacka-roky-chyba' : ''}`}
            />
            <span id="kalkulacka-roky-jednotka">{text.units.years}</span>
          </div>
          {showYearsError && (
            <p id="kalkulacka-roky-chyba" className="calc-error">
              {text.yearsError(limits.years.min, limits.years.max)}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {result !== null && years !== null && (
          <div className="calc-result">
            <p className="calc-result-line">
              {text.result(
                years,
                text.yearsForms[yearsForm(years)],
                formatCzk(result.fee, 2),
                formatCzk(result.invested, 0),
              )}
            </p>
            <p>{text.belowResult}</p>
          </div>
        )}
      </div>
      <p>{text.assumption}</p>
      <p>
        {text.illustration(
          formatCzk(gap.deposit, 0),
          gap.years,
          formatCzk(gap.invested, 0),
          formatTer(gap.minTer),
          formatTer(gap.maxTer),
          formatCzk(gap.gap, 2),
        )}
      </p>
    </section>
  )
}
