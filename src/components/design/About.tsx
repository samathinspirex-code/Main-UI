'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { AB_IMG, BOARD, LEADERSHIP, FACULTY, VALUES } from '../../data/team'

export default function About() {
  const revealRef = useScrollReveal()

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* Hero */}
        <section className="about-hero sx">
          <div className="about-hero-inner">
            <div className="about-hero-copy">
              <span>About Inspire College</span>
              <h1>Education designed for <strong>global success.</strong></h1>
              <i aria-hidden="true" />
              <p>Explore flexible, globally aligned programmes created to prepare ambitious learners for tomorrow’s opportunities.</p>
              <small>Sri Lanka’s pioneering fully online higher education provider.</small>
            </div>
            <div className="about-hero-visual">
              <img src={AB_IMG.heroFigure} alt="Inspire College students" />
            </div>
          </div>
        </section>

        <div ref={revealRef}>
          {/* Who We Are */}
          <section className="sx rg-2 about-intro-section" style={{ padding: '36px 0 80px', maxWidth: 1200, margin: '0 auto', gap: 64, alignItems: 'center' }}>
            <div className="reveal">
              <img src={AB_IMG.whoWeAre} alt="Who we are" style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border)' }} />
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 16 }}>WHO WE ARE</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                A catalyst for personal & professional transformation.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 16 }}>
                Inspire College is Sri Lanka's pioneering fully online higher education provider, bridging the gap between traditional learning and the digital future. Established with a vision to democratize education, we offer globally aligned programs from diploma to master's level.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 28 }}>
                Our flexible learning model eliminates geographic barriers, allowing students to pursue world-class education regardless of their location or life circumstances.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {VALUES.map(v => <Tag key={v.t} accent>{v.t}</Tag>)}
              </div>
            </div>
          </section>

          {/* Board */}
          <section id="board" className="sx" style={{ padding: '80px 0', background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, marginBottom: 48 }}>
                <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Visionary leaders</h2>
                <div className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>BOARD OF DIRECTORS</div>
              </div>
              <div className="rg-4" style={{ gap: 20 }}>
                {BOARD.map((p, i) => (
                  <div key={p.name} className={`card-hover reveal reveal-delay-${i + 1}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: 260, objectFit: 'contain', objectPosition: 'center bottom', padding: '14px 10px 0', background: 'linear-gradient(145deg, #b7a6e5, #c9b9eb)' }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 12 }}>{p.role.toUpperCase()}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{p.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="sx" style={{ padding: '80px 0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, margin: '0 0 32px', letterSpacing: '-0.02em', textAlign: 'center' }}>Leadership team</h2>
              <div className="rg-2" style={{ gap: 24 }}>
                {LEADERSHIP.map((p, i) => (
                  <div key={p.name} className={`reveal reveal-delay-${i + 1} profile-card leadership-card`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', display: 'grid', gridTemplateColumns: '160px 1fr' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', minHeight: 200, background: 'linear-gradient(145deg, #b7a6e5, #c9b9eb)' }} />
                    <div style={{ padding: 24 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 14 }}>{p.role.toUpperCase()}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>{p.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Faculty */}
          <section className="sx" style={{ padding: '0 0 80px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Meet the minds behind your success</h2>
                <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', margin: 0 }}>Learn from experts who inspire, guide and empower your journey.</p>
              </div>
              <div className="rg-2" style={{ gap: 24 }}>
                {FACULTY.map((p, i) => (
                  <div key={p.name} className={`reveal reveal-delay-${i + 1} profile-card`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 260 }} />
                    <div style={{ padding: 24 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 18 }}>{p.role.toUpperCase()}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Academic profile</div>
                      <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {p.creds?.map((c, j) => (
                          <li key={j} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="sx" style={{ padding: '80px 0', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Our core values</h2>
                <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-muted)', margin: 0 }}>The principles that guide everything we do at Inspire College.</p>
              </div>
              <div className="rg-3" style={{ gap: 20 }}>
                {VALUES.map((v, i) => (
                  <div key={v.t} className={`card-hover reveal reveal-delay-${(i % 3) + 1}`} style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 10, padding: 28 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      <Icon kind={v.icon} size={22} color="var(--accent)" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>{v.t}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>{v.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="sx" style={{ padding: '80px 0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
              <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Ready to be part of our story?
              </h2>
              <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: '0 0 32px' }}>
                Join thousands of students building global careers from Sri Lanka.
              </p>
              <div className="reveal" style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                <Button variant="primary" size="lg" href="/admissions">Apply now →</Button>
                <Button variant="outline" size="lg" href="/contact">Get in touch</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
