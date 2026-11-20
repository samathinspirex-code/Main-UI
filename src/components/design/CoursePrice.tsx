import { formatLKR, type Program } from '../../data/programs'

/**
 * Course price. With a limited-offer discount the original is struck through and the
 * offer price shows in an animated red pill; otherwise the plain price in bold.
 */
export default function CoursePrice({ program, size = 'card' }: { program: Program; size?: 'card' | 'hero' }) {
  const offerPrice = program.limitedOffer?.price
  if (!offerPrice) return <span className={`course-price course-price--${size}`}><strong className="course-price-now">{formatLKR(program.priceFrom)}</strong></span>
  return (
    <span className={`course-price course-price--${size} has-discount`}>
      <s className="course-price-old" aria-label={`Was ${formatLKR(program.priceFrom)}`}>{formatLKR(program.priceFrom)}</s>
      <strong className="course-price-offer" aria-label={`Now ${formatLKR(offerPrice)}`}>{formatLKR(offerPrice)}</strong>
    </span>
  )
}

/** Dark-red "LKR 5,000 / month" pill with the same shine as the course page instalment row. */
export function InstalmentPill({ amount }: { amount: number }) {
  return <span className="instalment-pill">{formatLKR(amount)} <small>/ month</small></span>
}
