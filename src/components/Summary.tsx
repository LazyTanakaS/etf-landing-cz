import { useEffect, useRef, useState } from 'react'
import { yearsForm } from '../calculator'
import { calculatorContent, summaryContent } from '../content'
import type { Etf } from '../data/etfs'
import { formatCzk, formatTer } from '../format'
import {
  buildSummaryText,
  copyText,
  investedTotal,
  summaryRows,
  type SummaryInput,
} from '../summary'
import { CopyIcon, DisclosureIcon } from './Icons'

type CopyStatus = 'idle' | 'copied' | 'failed'

interface SummaryProps {
  items: readonly Etf[]
  input: SummaryInput
}

// Replaces the form after a successful submit. Everything here is computed in
// the browser from the scenario in App; nothing is stored or sent.
export function Summary({ items, input }: SummaryProps) {
  const text = summaryContent
  const { deposit, years } = input
  const rows = summaryRows(items, input)
  const form = calculatorContent.yearsForms[yearsForm(years)]

  const headingRef = useRef<HTMLHeadingElement>(null)
  const fallbackRef = useRef<HTMLTextAreaElement>(null)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  // The form is gone, so the visitor's place on the page is gone too. Focus
  // goes to the heading of the summary.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  // The text is selected when the copy failed, so Ctrl/Cmd+C is one step.
  useEffect(() => {
    if (copyStatus === 'failed') fallbackRef.current?.select()
  }, [copyStatus])

  // "Zkopírováno." goes away after a while, so a second click announces again.
  useEffect(() => {
    if (copyStatus !== 'copied') return
    const timer = setTimeout(() => setCopyStatus('idle'), 4000)
    return () => clearTimeout(timer)
  }, [copyStatus])

  const summaryText = buildSummaryText(items, input)

  async function handleCopy() {
    const ok = await copyText(summaryText)
    setCopyStatus(ok ? 'copied' : 'failed')
  }

  // The live region is always in the DOM; only its text changes.
  const message =
    copyStatus === 'copied'
      ? text.copied
      : copyStatus === 'failed'
        ? text.copyFailed
        : ''

  return (
    <section className="section" id="souhrn" aria-labelledby="souhrn-nadpis">
      <div className="sheet">
        <div className="sec-head">
          <h2 id="souhrn-nadpis" tabIndex={-1} ref={headingRef}>
            {text.heading}
          </h2>
        </div>

        <div className="sum-grid">
          <div className="sum-col">
            <p className="scenario num">
              {text.scenario(
                formatCzk(deposit, 0),
                years,
                form,
                formatCzk(investedTotal(input), 0),
              )}
            </p>

            <div className="tbl-box">
              <table className="sumtable">
                <thead>
                  <tr>
                    <th scope="col">{text.columns.fund}</th>
                    <th scope="col" className="r">
                      {text.columns.ter}
                    </th>
                    <th scope="col" className="r">
                      {text.feeColumn(years, form)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.ticker}>
                      <th scope="row">
                        <span className="tk">{row.ticker}</span>
                      </th>
                      <td className="r">{formatTer(row.ter)}</td>
                      <td className="r">{formatCzk(row.total, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <details className="disclosure">
              <summary>
                <DisclosureIcon />
                {text.byYearSummary}
              </summary>
              <div
                className="tbl-box"
                role="region"
                aria-label={text.byYearSummary}
                tabIndex={0}
              >
                <table className="sumtable">
                  <thead>
                    <tr>
                      <th scope="col">{text.yearColumn}</th>
                      {rows.map((row) => (
                        <th scope="col" className="r" key={row.ticker}>
                          {row.ticker}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: years }, (_, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {rows.map((row) => (
                          <td className="r" key={row.ticker}>
                            {formatCzk(row.byYear[index], 2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="small">{text.byYearNote}</p>
            </details>

            <p className="small">{text.disclaimer}</p>
          </div>

          <div className="sum-col">
            <h3>{text.questionsHeading}</h3>
            <ol className="q-list">
              {text.questions.map((question) => (
                <li key={question}>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
            <div>
              <button
                type="button"
                className="btn btn-secondary btn-wide btn-icon"
                onClick={handleCopy}
              >
                <CopyIcon />
                {text.copyButton}
              </button>
              <span className="done" role="status" aria-live="polite">
                {message}
              </span>
            </div>
            {copyStatus === 'failed' && (
              <textarea
                ref={fallbackRef}
                className="copy-fallback"
                readOnly
                rows={12}
                value={summaryText}
                aria-labelledby="souhrn-nadpis"
              />
            )}
            <p className="small">{text.closing}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
