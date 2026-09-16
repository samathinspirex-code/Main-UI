'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

const LOGO = 'https://inspirecollege.lk/wp-content/uploads/2025/09/LeadHype-300-x-80-px-1.png'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 48px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          background: scrolled ? 'rgba(240,235,251,0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(63,0,124,0.14)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 24px rgba(63,0,124,0.08)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={LOGO}
            alt="Inspire College"
            height={34}
            style={{ height: 34, width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`nav-link ${pathname === n.href || (n.href !== '/' && pathname.startsWith(n.href)) ? 'active' : ''}`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="desktop-apply"><Button variant="primary" size="sm" href="/admissions">Apply Now</Button></span>
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ color: 'var(--ink)', padding: 4 }}
            aria-label="Menu"
            className="hamburger"
          >
            <Icon kind={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 68,
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(240,235,251,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 8px 32px rgba(63,0,124,0.10)',
          }}
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--ink)', fontWeight: 500 }}
            >
              {n.label}
            </Link>
          ))}
          <Button variant="primary" href="/admissions">Apply Now</Button>
        </div>
      )}

      <style>{`
        .hamburger { display: none; }
        @media (max-width: 900px) {
          .hamburger { display: flex !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav { padding: 0 24px !important; }
        }
        @media (max-width: 520px) {
          nav { height: 62px !important; padding: 0 16px !important; }
          nav img { height: 29px !important; max-width: 170px; }
          .desktop-apply { display: none !important; }
        }
      `}</style>
    </>
  )
}
