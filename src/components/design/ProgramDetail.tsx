'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { formatLKR, getProgramImage, type Program } from '../../data/programs'

const TABS = ['Overview','Curriculum','Careers','Fees & Aid','Apply']

export default function ProgramDetail({ program, related }: { program: Program; related: Program[] }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const heroImg = program.imageUrl || getProgramImage(program.imageLabel)

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* Breadcrumb */}
        <div className="sx" style={{ padding: '24px 0 0', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            <Link href="/" style={{ color: 'inherit' }}>HOME</Link>
            {' / '}
            <Link href="/programs" style={{ color: 'inherit' }}>PROGRAMS</Link>
            {' / '}
            <span style={{ color: 'var(--ink-soft)' }}>{program.title.toUpperCase()}</span>
          </div>
        </div>

        {/* Hero row */}
        <div className="sx rg-hero" style={{ padding: '32px 0 48px', maxWidth: 1200, margin: '0 auto', gap: 48, alignItems: 'start' }}>
          <div>
            {program.tag && <Tag accent style={{ marginBottom: 16 }}>{program.tag.toUpperCase()}</Tag>}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{program.title}</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.6 }}>{program.blurb}</p>
            <div className="rg-4" style={{ gap: 20, padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
              {[[program.code,'Awarding'],[program.duration,'Duration'],['100% Online','Mode'],[formatLKR(program.priceFrom), program.tag ? 'First 50' : 'From']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 4 }}>{l.toUpperCase()}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href={`/admissions?program=${program.slug}`}>Reserve your seat →</Button>
              <Button variant="outline" href="/contact">Talk to an advisor</Button>
            </div>
          </div>
          <div>
            <img src={heroImg} alt={program.title} style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', aspectRatio: '16/9', objectFit: 'cover' }} />
            <div style={{ marginTop: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: 14 }}>AT A GLANCE</div>
              {[['Awarding body', program.awardingBody === 'Jain' ? 'Jain University' : program.awardingBody],['Entry', program.entryRequirements || 'Contact admissions for entry requirements.'],['Format', 'Live online + LMS'],['Progression', program.progressionRoute || 'Contact admissions for progression options.']].map(([k, v], i, arr) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-muted)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sx" style={{ borderBottom: '1px solid var(--border)', padding: '0', overflowX: 'auto' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0 }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '14px 24px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                  color: activeTab === tab ? 'var(--accent)' : 'var(--ink-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="sx" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 0' }}>
          {activeTab === 'Overview' && (
            <div style={{ maxWidth: 720 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, margin: '0 0 16px' }}>Overview</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 24 }}>{program.blurb}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Tag accent>{program.awardingBody}-validated</Tag>
                <Tag>100% online</Tag>
                <Tag>{program.duration}</Tag>
              </div>
            </div>
          )}
          {activeTab === 'Curriculum' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, margin: '0 0 12px' }}>Curriculum</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-soft)', marginBottom: 32 }}>{program.progressionRoute || 'Contact admissions for progression options.'}</p>
              {program.topics && program.topics.length > 0 ? (
                <div className="rg-3" style={{ gap: 16 }}>
                  {[...program.topics].sort((a,b) => a.order - b.order).map((t,i) => (
                    <div key={t.topic_id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', marginBottom: 8 }}>{program.code} · Topic {i + 1}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{t.topic}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>Live online · LMS</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 32, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
                  Detailed curriculum is published prior to enrollment. Contact an advisor for more information.
                </div>
              )}
            </div>
          )}
          {activeTab === 'Careers' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, margin: '0 0 12px' }}>Where graduates go</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-soft)', marginBottom: 32, maxWidth: 640 }}>
                Graduates move into roles backed by an {program.awardingBody}-validated qualification employers recognise globally.
              </p>
              {program.outcomes && program.outcomes.length > 0 ? (
                <div className="rg-3" style={{ gap: 14 }}>
                  {[...program.outcomes].sort((a,b) => a.order - b.order).map(o => (
                    <div key={o.outcome_id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Icon kind="star" size={16} color="var(--accent)" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>{o.outcome}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 32, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
                  Career outcome data will be published as our first cohorts graduate. Contact us to learn more about placement support.
                </div>
              )}
            </div>
          )}
          {activeTab === 'Fees & Aid' && (
            <div className="rg-2" style={{ gap: 24, maxWidth: 720 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 8 }}>TUITION</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>From {formatLKR(program.priceFrom)}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {program.tag ? `${program.tag} — regular fee applies after the offer ends.` : 'Flexible payment plans available.'}
                </p>
              </div>
              <div style={{ background: 'var(--surface-lt)', border: '1px solid var(--border-accent)', borderRadius: 10, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 8 }}>PAYMENT</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Affordable plans</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>Flexible payment plans that fit your budget — study from anywhere in the world.</p>
              </div>
            </div>
          )}
          {activeTab === 'Apply' && (
            <div style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', padding: '32px 0' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, margin: '0 0 16px' }}>Ready to apply?</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.6 }}>
                Reserve your seat in {program.title} — takes about twenty minutes, save and return any time.
              </p>
              <Button variant="primary" size="lg" href={`/admissions?program=${program.slug}`}>Reserve your seat →</Button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="sx" style={{ padding: '0 0 56px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="program-detail-cta" style={{ background: 'var(--surface)', border: '1px solid var(--border-accent)', borderRadius: 12, padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, margin: '0 0 8px' }}>Ready to start?</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-muted)', margin: 0 }}>
                {program.tag ? `${program.tag} · ` : ''}Talk to an advisor on +94 71 199 3331
              </p>
            </div>
            <Button variant="primary" size="lg" href={`/admissions?program=${program.slug}`}>Reserve your seat →</Button>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="sx" style={{ padding: '0 0 80px', maxWidth: 1200, margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, margin: '0 0 20px' }}>Related programs</h3>
            <div className="rg-3" style={{ gap: 16 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/programs/${p.slug}`} className="card-hover" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>{p.title}</span>
                  <Icon kind="arrow" size={16} color="var(--accent)" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
