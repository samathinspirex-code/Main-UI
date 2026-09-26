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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

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
            style={{ color: 'var(--ink)', padding: '8px', minWidth: 44, minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="hamburger"
          >
            <Icon kind={open ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="mobile-nav-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      {open && (
        <div className="mobile-nav-menu">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== '/' && pathname.startsWith(n.href))
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`mobile-nav-item ${active ? 'active' : ''}`}
              >
                <span>{n.label}</span>
                {active && <span className="mobile-nav-dot" />}
              </Link>
            )
          })}
          <div style={{ paddingTop: 8 }}>
            <Button variant="primary" fullWidth href="/admissions" onClick={() => setOpen(false)}>Apply Now</Button>
          </div>
        </div>
      )}

      <style>{`
        .hamburger { display: none; }
        .mobile-nav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 98;
          background: rgba(26, 8, 64, 0.4);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: fade-in 0.2s ease;
        }
        .mobile-nav-menu {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          z-index: 99;
          background: rgba(240, 235, 251, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 20px 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: calc(100vh - 68px);
          overflow-y: auto;
          box-shadow: 0 16px 40px rgba(63, 0, 124, 0.14);
          animation: nav-slide-down 0.22s ease-out;
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 17px;
          font-weight: 550;
          color: var(--ink);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          min-height: 44px;
        }
        .mobile-nav-item:active, .mobile-nav-item:hover {
          background: var(--accent-dim);
          color: var(--accent);
        }
        .mobile-nav-item.active {
          color: var(--accent);
          background: var(--accent-dim);
          font-weight: 650;
        }
        .mobile-nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 900px) {
          .hamburger { display: flex !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav { padding: 0 24px !important; }
        }
        @media (max-width: 520px) {
          nav { height: 62px !important; padding: 0 16px !important; }
          nav img { height: 28px !important; max-width: 160px; }
          .desktop-apply { display: none !important; }
          .mobile-nav-menu {
            top: 62px !important;
            max-height: calc(100vh - 62px) !important;
            padding: 16px 16px 24px !important;
          }
        }
      `}</style>
    </>
  )
}
