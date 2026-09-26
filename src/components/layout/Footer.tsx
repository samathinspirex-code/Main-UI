'use client'

import Link from 'next/link'

const LOGO = 'https://inspirecollege.lk/wp-content/uploads/2025/09/LeadHype-300-x-80-px-1.png'

const COLS: Record<string, { label: string; href?: string; external?: boolean }[]> = {
  Programs: [
    { label: 'ATHE', href: '/programs?body=ATHE#programme-catalogue-top' },
    { label: 'WINC', href: '/programs?body=WINC#programme-catalogue-top' },
    { label: 'Jain University', href: '/programs?body=Jain+University#programme-catalogue-top' },
    { label: 'Short Courses', href: '/programs?level=Short+Course#programme-catalogue-top' },
  ],
  About: [
    { label: 'About Us', href: '/about' },
    { label: 'Visionary Leaders', href: '/about#board' },
    { label: 'Partners', href: '/#partners' },
    { label: 'News & Events', href: '/news' },
  ],
  Apply: [
    { label: 'Foundation', href: '/programs?level=Foundation#programme-catalogue-top' },
    { label: 'HND', href: '/programs?level=HND#programme-catalogue-top' },
    { label: 'Short Course', href: '/programs?level=Short+Course#programme-catalogue-top' },
    { label: 'Postgraduate', href: '/programs?level=Postgraduate#programme-catalogue-top' },
  ],
  Connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Student Portal', href: 'https://lms-ui-amber.vercel.app/', external: true },
    { label: 'WhatsApp', href: 'https://wa.me/94711993331', external: true },
    { label: '+94 71 199 3331', href: 'tel:+94711993331', external: true },
  ],
}

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/inspirecollege.srilanka', icon: <path d="M14.2 8.1h3V4.4c-.5-.1-2.2-.2-4.1-.2-4.1 0-6.9 2.5-6.9 7.1v4H1.6v4.2h4.6V30h5.6V19.5h4.7l.7-4.2h-5.4v-3.6c0-1.2.4-2.1 2.4-2.1Z" className="social-fill" transform="translate(6.5 0)" /> },
  { label: 'Instagram', href: 'https://www.instagram.com/inspirecollege.srilanka/', icon: <><rect x="4" y="4" width="24" height="24" rx="7" /><circle cx="16" cy="16" r="5.5" /><circle cx="24.2" cy="7.8" r="1.2" className="social-fill" /></> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/inspirecollege-lk/', icon: <><rect x="5" y="12" width="5" height="15" className="social-fill" /><circle cx="7.5" cy="7.5" r="2.5" className="social-fill" /><path d="M14 27V12h5v2.1c1.2-1.7 3-2.7 5.3-2.7 4.1 0 5.7 2.7 5.7 7.3V27h-5v-7.4c0-2.2-.8-3.7-2.8-3.7-2.2 0-3.2 1.5-3.2 4.3V27Z" className="social-fill" /></> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@inspirecollege.lk?_r=1&_t=ZS-91xYmQlt3XI', icon: <path d="M20 4c.5 3 2.3 4.9 5 5.4v4.8c-1.9-.1-3.6-.6-5-1.5v8.1a8.2 8.2 0 1 1-7.1-8.1v4.9a3.5 3.5 0 1 0 2.2 3.2V4Z" className="social-fill" /> },
] as const

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
            <div className="footer-socials">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inspire College on ${social.label}`}
                  title={social.label}
                >
                  <svg viewBox="0 0 32 32" aria-hidden="true"><g>{social.icon}</g></svg>
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
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms-conditions' },
              { label: 'Refund Policy', href: '/refund-policy' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: F.muted, letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.link)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = F.muted)}
              >{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
