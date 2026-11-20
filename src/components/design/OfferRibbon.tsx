/**
 * Red hanging "Limited Offer" ribbon for the top-left corner of a programme box.
 * It folds over the box's top edge and unfolds downward when the page loads.
 */
export default function OfferRibbon({ label }: { label: string }) {
  const words = label.trim().split(/\s+/).filter(Boolean)
  return (
    <span className="offer-ribbon" role="img" aria-label={label}>
      <span className="offer-ribbon-body" aria-hidden="true">
        {words.map((word, index) => <b key={index}>{word}</b>)}
      </span>
    </span>
  )
}
