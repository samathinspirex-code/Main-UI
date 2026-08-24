'use client'

import Link from 'next/link'
import { Icon } from '../ui/Icon'

const LOGO = 'https://inspirecollege.lk/wp-content/uploads/2025/09/LeadHype-300-x-80-px-1.png'

const COLS: Record<string, { label: string; href?: string; external?: boolean }[]> = {
  Programs: [
    { label: 'ATHE', href: '/programs?body=ATHE' },
    { label: 'WINC', href: '/programs?body=WINC' },
    { label: 'LSBF', href: '/programs?body=LSBF' },
    { label: 'Jain University', href: '/programs?body=Jain' },
    { label: 'Short Courses', href: '/programs?level=Short+Course' },
  ],
  About: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Chairman', href: '/about#board' },
    { label: 'Partners', href: '/about' },
    { label: 'News & Events', href: '/news' },
  ],
  Apply: [
    { label: 'Foundation', href: '/programs?level=Foundation' },
    { label: 'HND', href: '/programs?level=HND' },
    { label: 'Top-Up Degree', href: '/programs?level=Top-Up+Degree' },
    { label: 'Postgraduate', href: '/programs?level=Postgraduate' },
  ],
  Connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Student Portal' },
    { label: 'WhatsApp', href: 'https://wa.me/94711993331', external: true },
    { label: '+94 71 199 3331', href: 'tel:+94711993331', external: true },
  ],
}

const F = {
  bg: '#1A0840',
  border: 'rgba(255,255,255,0.10)',
  heading: '#c6b8f0',
  link: 'rgba(255,255,255,0.68)',
  linkHover: '#ffffff',
  muted: 'rgba(255,255,255,0.40)',
}

export function Footer() {
  return (
    <footer className="site-footer" style={{ background: F.bg, borderTop: '4px solid #3F007C' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="site-footer-grid">

          {/* Brand */}
          <div>
            <Link href="/">
              <img
                src={LOGO}
                alt="Inspire College"
                height={32}
                style={{ height: 32, width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: F.link, marginTop: 18, lineHeight: 1.75, maxWidth: 260 }}>
              Sri Lanka's first tech-enabled online higher education institution, revolutionizing education through innovation.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: F.muted, marginTop: 14, lineHeight: 1.7 }}>
              Level 01, Shangri-La, Colombo 2<br />+94 71 199 3331
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 22 }}>
              {[
                { icon: 'mail', href: 'mailto:info@inspirecollege.lk' },
                { icon: 'chat', href: 'https://wa.me/94711993331' },
                { icon: 'globe', href: 'https://inspirecollege.lk' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: F.link, transition: 'color 0.2s, transform 0.2s', display: 'inline-flex' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = F.link; (e.currentTarget as HTMLAnchorElement).style.transform = '' }}
                >
                  <Icon kind={s.icon} size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([heading, items]) => (
            <div key={heading}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: F.heading, textTransform: 'uppercase', marginBottom: 18, fontWeight: 600 }}>
                {heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {items.map((item) =>
                  item.href ? (
                    item.external ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: F.link, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.linkHover)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.link)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: F.link, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.linkHover)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.link)}
                      >
                        {item.label}
                      </Link>
                    )
                  ) : (
                    <span key={item.label} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: F.muted, cursor: 'default' }}>
                      {item.label}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="site-footer-bottom" style={{ borderTop: `1px solid ${F.border}`, paddingTop: 22 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: F.muted, letterSpacing: '0.06em' }}>© 2026 INSPIRE COLLEGE</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Accessibility'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: F.muted, letterSpacing: '0.06em', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = F.link)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = F.muted)}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
