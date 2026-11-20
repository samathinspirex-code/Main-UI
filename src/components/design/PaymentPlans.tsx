'use client'

import { useEffect, useRef, useState } from 'react'
import type { PaymentPlans as PaymentPlansData } from '../../data/programs'
import OfferStamp from './OfferStamp'

type Offer = { enabled: boolean; label: string }
/** hidden → (offer only) stamp → exit → done. Cards rise in from `exit`. */
type Phase = 'hidden' | 'stamp' | 'exit' | 'done'

const STAMP_HOLD_MS = 1900
const STAMP_EXIT_MS = 550

/**
 * CMS-managed payment plan: section heading → plan cards (breakdown + the card's own additional fee).
 * When the course has a limited offer, the first time the section scrolls into view a large stamp
 * pops up over it, then clears away and the cards rise in.
 */
export default function PaymentPlans({ plan, programTitle, offer }: { plan: PaymentPlansData; programTitle: string; offer?: Offer }) {
  const heading = plan.heading || `${programTitle} – Payment Plan`
  const showOffer = Boolean(offer?.enabled)
  const sectionRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>('hidden')

  useEffect(() => {
    const node = sectionRef.current
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!node || reduced || typeof IntersectionObserver === 'undefined') { setPhase('done'); return }
    const timers: number[] = []
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      if (!showOffer) { setPhase('done'); return }
      setPhase('stamp')
      timers.push(window.setTimeout(() => setPhase('exit'), STAMP_HOLD_MS))
      timers.push(window.setTimeout(() => setPhase('done'), STAMP_HOLD_MS + STAMP_EXIT_MS))
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0 })
    observer.observe(node)
    return () => { observer.disconnect(); timers.forEach(clearTimeout) }
  }, [showOffer])

  const cardsShown = phase === 'exit' || phase === 'done'

  return (
    <section ref={sectionRef} className={`pp pp-phase-${phase}${plan.cards.length === 1 ? ' single' : ''}`} aria-labelledby="pp-title">
      {showOffer && (phase === 'stamp' || phase === 'exit') && (
        <div className="pp-reveal" aria-hidden="true">
          <OfferStamp label={offer!.label} variant="hero" />
        </div>
      )}

      <header className="pp-head">
        <span className="pp-eyebrow">FEES &amp; PAYMENT PLANS</span>
        <h2 id="pp-title">{heading}</h2>
        {plan.highlight && <p className="pp-highlight">{plan.highlight}</p>}
        {plan.intro && <p className="pp-intro">{plan.intro}</p>}
      </header>

      <div className={`pp-cards${cardsShown ? ' is-shown' : ''}`}>
        {plan.cards.map((card, index) => {
          const fees = card.extra_fees
          return (
            <article key={index} className={`pp-card${card.featured ? ' featured' : ''}`} style={{ ['--pp-i' as string]: index }}>
              <div className="pp-card-top">
                {card.eyebrow && <span className="pp-card-eyebrow">{card.eyebrow}</span>}
                {card.badge && <span className="pp-card-badge">{card.badge}</span>}
              </div>
              {card.title && <h3 className="pp-card-title">{card.title}</h3>}
              {card.amount && (
                <div className="pp-card-price">
                  <p className="pp-card-amount">{card.amount}</p>
                  {card.amount_note && <small className="pp-card-amount-note">{card.amount_note}</small>}
                </div>
              )}
              {card.rows.length > 0 && (
                <table className="pp-table">
                  <thead>
                    <tr><th scope="col">Payment</th><th scope="col">Calculation</th><th scope="col">Amount</th></tr>
                  </thead>
                  <tbody>
                    {card.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={row.emphasis ? 'emphasis' : undefined}>
                        <th scope="row" data-label="Payment">{row.label}</th>
                        <td data-label="Calculation">{row.calculation}</td>
                        <td data-label="Amount">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {fees.rows.length > 0 && (
                <div className="pp-card-fees">
                  <h4>{fees.title || 'Additional fee'}</h4>
                  <ul>
                    {fees.rows.map((row, rowIndex) => (
                      <li key={rowIndex}>
                        <span className="pp-card-fees-label">{row.label}</span>
                        <strong>{row.amount}</strong>
                        {row.due && <small>{row.due}</small>}
                      </li>
                    ))}
                  </ul>
                  {fees.note && <p>{fees.note}</p>}
                </div>
              )}
              {card.footnote && <p className="pp-card-footnote">{card.footnote}</p>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
