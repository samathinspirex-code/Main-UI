import type { CSSProperties, ReactNode } from 'react'

export function Tag({
  children,
  accent = false,
  style,
}: {
  children: ReactNode
  accent?: boolean
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 12px',
        borderRadius: 99,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.06em',
        fontWeight: 500,
        border: `1px solid ${accent ? 'var(--border-accent)' : 'var(--border)'}`,
        color: accent ? 'var(--accent)' : 'var(--ink-muted)',
        background: accent ? 'var(--accent-dim)' : 'transparent',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
