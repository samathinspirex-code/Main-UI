import type { PaymentPlans as PaymentPlansData } from '../../data/programs'
import OfferStamp from './OfferStamp'

/** CMS-managed payment plan: section heading → plan cards (with breakdown) → additional fees. */
export default function PaymentPlans({ plan, programTitle }: { plan: PaymentPlansData; programTitle: string }) {
  const fees = plan.extra_fees
  const hasFees = fees.rows.length > 0
  const heading = plan.heading || `${programTitle} – Payment Plan`

  return (
    <section className={`pp${plan.cards.length === 1 ? ' single' : ''}`} aria-labelledby="pp-title">
      <header className="pp-head">
        <span className="pp-eyebrow">FEES &amp; PAYMENT PLANS</span>
        <h2 id="pp-title">{heading}</h2>
        {plan.highlight && <p className="pp-highlight">{plan.highlight}</p>}
        {plan.intro && <p className="pp-intro">{plan.intro}</p>}
      </header>

      <div className="pp-cards">
        {plan.cards.map((card, index) => (
          <article key={index} className={`pp-card${card.featured ? ' featured' : ''}${card.limited_offer ? ' has-offer' : ''}`}>
            {card.limited_offer && <OfferStamp label={card.limited_offer_label.trim() || 'Limited Offer'} />}
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
            {card.footnote && <p className="pp-card-footnote">{card.footnote}</p>}
          </article>
        ))}
      </div>

      {hasFees && (
        <div className="pp-extra">
          <h3>{fees.title || 'Additional fees'}</h3>
          <table className="pp-table">
            <thead>
              <tr><th scope="col">{fees.rows.some(row => /year/i.test(row.label)) ? 'Year' : 'Item'}</th><th scope="col">Amount</th><th scope="col">Due</th></tr>
            </thead>
            <tbody>
              {fees.rows.map((row, index) => (
                <tr key={index}>
                  <th scope="row" data-label="Item">{row.label}</th>
                  <td data-label="Amount" className="pp-extra-amount">{row.amount}</td>
                  <td data-label="Due">{row.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {fees.note && <p className="pp-extra-note">{fees.note}</p>}
        </div>
      )}
    </section>
  )
}
