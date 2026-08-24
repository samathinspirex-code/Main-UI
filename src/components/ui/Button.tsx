import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: CSSProperties
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'outline',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  style,
  fullWidth,
}: ButtonProps) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderRadius: 'var(--radius)',
    transition: 'all 0.2s ease',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    border: '1.5px solid transparent',
    whiteSpace: 'nowrap' as const,
    width: fullWidth ? '100%' : 'auto',
    justifyContent: fullWidth ? 'center' : 'flex-start',
    textDecoration: 'none',
    ...style,
  }

  const sizes: Record<string, CSSProperties> = {
    sm: { fontSize: 13, padding: '7px 16px' },
    md: { fontSize: 14, padding: '10px 22px' },
    lg: { fontSize: 15, padding: '13px 28px' },
  }

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: '#ffffff',
      borderColor: 'var(--accent)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      borderColor: 'var(--border-accent)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-soft)',
      borderColor: 'transparent',
    },
  }

  const composed = { ...base, ...sizes[size], ...variants[variant] }

  if (href && !disabled) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a href={href} style={composed} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return <Link href={href} style={composed}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={composed}>
      {children}
    </button>
  )
}
