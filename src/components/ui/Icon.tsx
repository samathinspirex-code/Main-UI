import type { CSSProperties, ReactElement } from 'react'

const PATHS: Record<string, ReactElement> = {
  search: <><circle cx="9" cy="9" r="6" /><path d="M14 14l5 5" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1-4 5-6 8-6s7 2 8 6" /></>,
  book: <path d="M4 5c3-1 6-1 8 0v14c-2-1-5-1-8 0V5zM20 5c-3-1-6-1-8 0v14c2-1 5-1 8 0V5z" />,
  pin: <><path d="M12 21s-6-6-6-11a6 6 0 1112 0c0 5-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></>,
  mail: <><rect x="3" y="6" width="18" height="13" rx="1" /><path d="M3 8l9 6 9-6" /></>,
  chat: <path d="M4 6h16v10H9l-4 4V6z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  star: <path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14l-5-4.5L9.5 9 12 3z" />,
  check: <path d="M4 12l5 5L20 6" />,
  arrow_right: <path d="M5 12h14M13 6l6 6-6 6" />,
  grad: <><path d="M3 9l9-4 9 4-9 4-9-4z" /><path d="M7 11v5c0 1 3 2 5 2s5-1 5-2v-5" /></>,
  flask: <path d="M9 3h6M10 3v6l-5 10c-.5 1 .3 2 1.5 2h11c1.2 0 2-1 1.5-2l-5-10V3" />,
  brush: <path d="M4 20c2 0 3-1 3-3 0-1-1-2-2-2s-2 1-2 2c0 1-1 3-1 3h2zM7 15l9-9 3 3-9 9" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  building: <><rect x="4" y="4" width="16" height="17" /><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M10 21v-3h4v3" /></>,
  heart: <path d="M12 20s-7-5-7-10a4 4 0 017-2 4 4 0 017 2c0 5-7 10-7 10z" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  chevron_down: <path d="M6 9l6 6 6-6" />,
  external: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></>,
}

export function Icon({
  kind,
  size = 20,
  color,
  style,
}: {
  kind: string
  size?: number
  color?: string
  style?: CSSProperties
}) {
  const common = {
    fill: 'none',
    stroke: color || 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <g {...common}>{PATHS[kind] ?? PATHS.star}</g>
    </svg>
  )
}
