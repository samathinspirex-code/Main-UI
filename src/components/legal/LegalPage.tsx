import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string
  title: string
  introduction: string
  sections: LegalSection[]
}) {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 68, background: 'var(--bg)', color: 'var(--ink)' }}>
        <header className="sx" style={{ paddingTop: 58, paddingBottom: 38, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, marginBottom: 14 }}>
              {eyebrow}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 6vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: 0 }}>
              {title}
            </h1>
          </div>
        </header>

        <div className="sx" style={{ paddingTop: 46, paddingBottom: 80 }}>
          <article style={{ maxWidth: 980, margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(24px, 5vw, 54px)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.75, color: 'var(--ink-soft)', margin: '0 0 42px' }}>
              {introduction}
            </p>

            <div style={{ display: 'grid', gap: 34 }}>
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 25, lineHeight: 1.2, margin: '0 0 14px' }}>
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)', margin: '0 0 12px' }}>
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0, paddingLeft: 22 }}>
                      {section.bullets.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div style={{ marginTop: 46, paddingTop: 24, borderTop: '1px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              Questions about this policy? Email <a href="mailto:enrol@inspire.college" style={{ color: 'var(--accent)', fontWeight: 650 }}>enrol@inspire.college</a>.
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
