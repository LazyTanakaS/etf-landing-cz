import { useEffect, useState } from 'react'
import {
  illustration,
  limits,
  parseDeposit,
  parseYears,
  scenario,
  yearsForm,
  yearsUnit,
} from '../calculator'
import { calculatorContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatCzk, formatNumber, formatTer } from '../format'
import { track } from '../track'
import { AlertIcon, ChevronIcon } from './Icons'

interface CalculatorProps {
  items: readonly Etf[]
  // The typed text lives in App, so the summary can use the same scenario.
  depositText: string
  yearsText: string
  onDepositTextChange: (value: string) => void
  onYearsTextChange: (value: string) => void
}

export function Calculator({
  items,
  depositText,
  yearsText,
  onDepositTextChange,
  onYearsTextChange,
}: CalculatorProps) {
  const text = calculatorContent
  const [ticker, setTicker] = useState(items[0].ticker)
  // An error shows after the field is left, and stays live from then on.
  const [depositTouched, setDepositTouched] = useState(false)
  const [yearsTouched, setYearsTouched] = useState(false)
  // Set by the first change of the fund, the deposit or the years.
  const [interacted, setInteracted] = useState(false)

  const etf = items.find((item) => item.ticker === ticker) ?? items[0]
  const deposit = parseDeposit(depositText)
  const years = parseYears(yearsText)
  const result =
    deposit !== null && years !== null
      ? scenario(deposit, etf.ter, years)
      : null
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

  // The result sentence is one string from content.ts. The fee and its full
  // stop are cut out of it only to show the number large.
  const feeText = result !== null ? `${formatCzk(result.fee, 2)}.` : ''
  const resultLine =
    result !== null && years !== null
      ? text.result(
          years,
          text.yearsForms[yearsForm(years)],
          formatCzk(result.fee, 2),
          formatCzk(result.invested, 0),
        )
      : ''
  const feeAt = resultLine.indexOf(feeText)

  return (
    <section
      className="section"
      id="kalkulacka"
      aria-labelledby="kalkulacka-nadpis"
    >
      <div className="sheet">
        <div className="sec-head">
          <h2 id="kalkulacka-nadpis">{text.heading}</h2>
          <p className="sub">{text.subheading}</p>
        </div>

        <div className="fields">
          <div className="field">
            <label htmlFor="kalkulacka-fond">{text.fields.fund}</label>
            <div className="control">
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
              <ChevronIcon />
            </div>
          </div>

          <div className="field">
            <label htmlFor="kalkulacka-vklad">{text.fields.deposit}</label>
            <div className={`control${showDepositError ? ' is-invalid' : ''}`}>
              <input
                id="kalkulacka-vklad"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={depositText}
                onChange={(event) => {
                  onDepositTextChange(event.target.value)
                  setInteracted(true)
                }}
                onBlur={() => setDepositTouched(true)}
                aria-invalid={showDepositError}
                aria-describedby={`kalkulacka-vklad-jednotka${showDepositError ? ' kalkulacka-vklad-chyba' : ''}`}
              />
              <span className="unit" id="kalkulacka-vklad-jednotka">
                {text.units.deposit}
              </span>
            </div>
            {showDepositError && (
              <p id="kalkulacka-vklad-chyba" className="err">
                <AlertIcon />
                {text.depositError(
                  formatNumber(limits.deposit.min),
                  formatNumber(limits.deposit.max),
                )}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="kalkulacka-roky">{text.fields.years}</label>
            <div className={`control${showYearsError ? ' is-invalid' : ''}`}>
              <input
                id="kalkulacka-roky"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={yearsText}
                onChange={(event) => {
                  onYearsTextChange(event.target.value)
                  setInteracted(true)
                }}
                onBlur={() => setYearsTouched(true)}
                aria-invalid={showYearsError}
                aria-describedby={`kalkulacka-roky-jednotka${showYearsError ? ' kalkulacka-roky-chyba' : ''}`}
              />
              <span className="unit" id="kalkulacka-roky-jednotka">
                {yearsUnit(years, text.yearsForms)}
              </span>
            </div>
            {showYearsError && (
              <p id="kalkulacka-roky-chyba" className="err">
                <AlertIcon />
                {text.yearsError(limits.years.min, limits.years.max)}
              </p>
            )}
          </div>
        </div>

        <div className="calc-out">
          <div aria-live="polite" aria-atomic="true">
            {result !== null && (
              <div className="result">
                <p className="result-line">
                  {feeAt === -1 ? (
                    resultLine
                  ) : (
                    <>
                      {resultLine.slice(0, feeAt)}
                      <span className="result-num">{feeText}</span>
                      {resultLine.slice(feeAt + feeText.length)}
                    </>
                  )}
                </p>
                <p className="result-foot">{text.belowResult}</p>
              </div>
            )}
          </div>
          <div className="calc-side">
            <p className="assume">{text.assumption}</p>
            <p className="example">
              {text.illustration(
                formatCzk(gap.deposit, 0),
                gap.years,
                formatCzk(gap.invested, 0),
                formatTer(gap.minTer),
                formatTer(gap.maxTer),
                formatCzk(gap.gap, 2),
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
