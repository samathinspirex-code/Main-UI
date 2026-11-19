import { useId } from 'react'

const C = 100 // centre of the 200 × 200 viewBox

/** Points for a serrated seal edge: alternating outer and inner radius. */
function sealPoints(teeth: number, outer: number, inner: number) {
  const points: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI * i) / teeth - Math.PI / 2
    points.push(`${(C + r * Math.cos(a)).toFixed(2)},${(C + r * Math.sin(a)).toFixed(2)}`)
  }
  return points.join(' ')
}

function starPath(cx: number, cy: number, r: number) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45
    const a = (Math.PI * i) / 5 - Math.PI / 2
    pts.push(`${(cx + radius * Math.cos(a)).toFixed(2)},${(cy + radius * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

const SEAL = sealPoints(30, 98, 88)
const STARS = [
  starPath(78, 64, 5), starPath(100, 58, 8), starPath(122, 64, 5),
  starPath(78, 137, 5), starPath(100, 143, 8), starPath(122, 137, 5),
]
const RIBBON = '2,82 198,82 186,100 198,118 2,118 14,100'

/** Animated rubber-stamp seal with the offer text curved around the ring and across a ribbon. */
export default function OfferStamp({ label }: { label: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const text = label.toUpperCase()
  const ringSize = Math.max(9, Math.min(14, 150 / Math.max(text.length, 1)))
  const ribbonSize = 21
  const ribbonFits = text.length * ribbonSize * 0.62 <= 150

  return (
    <span className="pp-offer-stamp" role="img" aria-label={label}>
      <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <defs>
          {/* Worn-ink speckles: noise punches small holes in the artwork. */}
          <filter id={`${id}-ink`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.16" numOctaves="4" seed="11" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -12 0 0 0 9.1" result="holes" />
            <feComposite in="SourceGraphic" in2="holes" operator="in" />
          </filter>
          <path id={`${id}-top`} d="M 38 100 A 62 62 0 0 1 162 100" />
          <path id={`${id}-bottom`} d="M 30 100 A 70 70 0 0 0 170 100" />
          <clipPath id={`${id}-ribbon`}><polygon points={RIBBON} /></clipPath>
          <linearGradient id={`${id}-shine`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g filter={`url(#${id}-ink)`}>
          <polygon className="pp-stamp-edge" points={SEAL} fill="var(--stamp-red)" />
          <circle cx={C} cy={C} r="83" fill="#fff" />
          <circle cx={C} cy={C} r="79" fill="none" stroke="var(--stamp-red)" strokeWidth="3" />
          <circle cx={C} cy={C} r="52" fill="var(--stamp-red)" />
          <circle cx={C} cy={C} r="47" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />

          <text className="pp-stamp-ring-text" fontSize={ringSize}>
            <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">{text}</textPath>
          </text>
          <text className="pp-stamp-ring-text" fontSize={ringSize}>
            <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">{text}</textPath>
          </text>
          <circle cx="32" cy="100" r="2.6" fill="var(--stamp-red)" />
          <circle cx="168" cy="100" r="2.6" fill="var(--stamp-red)" />
          {STARS.map((d, i) => <path key={i} d={d} fill="#fff" />)}

          <g transform={`rotate(-8 ${C} ${C})`}>
            <polygon points={RIBBON} fill="#fff" stroke="var(--stamp-red)" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="10,88 190,88 181,100 190,112 10,112 19,100" fill="none" stroke="var(--stamp-red)" strokeWidth="1.2" />
            <text
              className="pp-stamp-ribbon-text"
              x={C}
              y={C + 1}
              fontSize={ribbonSize}
              textAnchor="middle"
              dominantBaseline="central"
              {...(ribbonFits ? {} : { textLength: 150, lengthAdjust: 'spacingAndGlyphs' as const })}
            >
              {text}
            </text>
            <g clipPath={`url(#${id}-ribbon)`}>
              <rect className="pp-stamp-shine" x="-60" y="70" width="46" height="60" fill={`url(#${id}-shine)`} transform="skewX(-20)" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  )
}
