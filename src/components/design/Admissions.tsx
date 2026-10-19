'use client'

import { useMemo, useState } from 'react'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { formatLKR, type Program, type School } from '../../data/programs'

const STEPS = [
  { n: '01', t: 'Your details', s: 'Name, email & phone' },
  { n: '02', t: 'Pick your program', s: 'Choose Foundation / HND / Top-Up' },
  { n: '03', t: 'Upload results', s: 'O/L, A/L or other qualifications' },
  { n: '04', t: 'Reserve & pay', s: 'Secure your seat' },
]

const STREAMS: { label: string; value: School }[] = [
  { label: 'Computing', value: 'Computing' },
  { label: 'Business', value: 'Business' },
  { label: 'CPD / Short Courses', value: 'CPD' },
]

const WHY_NOW = [
  { label: 'First 50 seats', value: 'HND at LKR 295,000' },
  { label: 'Regular fee', value: 'LKR 400,000' },
  { label: 'You save', value: 'LKR 105,000' },
  { label: 'Foundation from', value: 'LKR 125,000' },
  { label: 'Short courses', value: 'from LKR 15,000' },
]

const PERKS = [
  'Globally recognised UK qualifications',
  'Study fully online — learn anywhere',
  'Expert tutors & live sessions',
  'Career support & alumni network',
  'Flexible payment plans available',
  'Sri Lanka\'s first tech-enabled university',
]

function inputCls(focused: boolean) {
  return {
    width: '100%',
    padding: '14px 18px',
    background: 'var(--bg-soft)',
    border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 8,
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }
}

export default function Admissions({ programs, initialProgramSlug = '' }: { programs: Program[]; initialProgramSlug?: string }) {
  const initialProgram = programs.find(p => p.slug === initialProgramSlug)

  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [stream, setStream] = useState<School>(initialProgram?.school ?? 'Computing')
  const [programSlug, setProgramSlug] = useState(initialProgram?.slug ?? '')
  const [qualification, setQualification] = useState('After A/L')
  const [fileName, setFileName] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

  const streamPrograms = useMemo(() => programs.filter(p => p.school === stream), [programs, stream])
  const selectedProgram = programs.find(p => p.slug === programSlug)

  const step1Valid = name.trim() && email.trim() && phone.trim()
  const step2Valid = Boolean(selectedProgram)
  const goNext = () => setStep(s => Math.min(4, s + 1))
  const goBack = () => setStep(s => Math.max(1, s - 1))

  const stepStatus = (n: number): 'done' | 'current' | 'pending' =>
    n < step ? 'done' : n === step ? 'current' : 'pending'

  if (submitted) {
    return (
      <div>
        <Navbar />
        <main style={{ paddingTop: 68, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <Icon kind="check" size={36} color="var(--accent)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, margin: '0 0 16px' }}>You're on the list!</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: '0 0 36px', maxWidth: 500, lineHeight: 1.65 }}>
              Thanks {name.split(' ')[0] || 'there'} — an advisor will reach out to {email || 'your email'} within one business day to confirm your seat{selectedProgram ? ` in ${selectedProgram.title}` : ''}.
            </p>
            <Button variant="outline" href="/">Back to home</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="page-load admissions-page" style={{ paddingTop: 68 }}>

        {/* Page header */}
        <div className="sx page-load-hero" style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 18 }}>
              <Tag accent>RESERVE YOUR SEAT</Tag>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,68px)', fontWeight: 700, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Begin your<br />
              <span className="text-gold">journey here.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: 0, maxWidth: 540, lineHeight: 1.65 }}>
              Four short steps, about twenty minutes. An advisor will confirm your seat within one business day.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="sx page-load-secondary" style={{ padding: '40px 0 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="rg-4" style={{ gap: 0 }}>
              {STEPS.map((s, i) => {
                const st = stepStatus(i + 1)
                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => st === 'done' ? setStep(i + 1) : undefined}
                    style={{ position: 'relative', textAlign: 'center', background: 'none', border: 'none', cursor: st === 'done' ? 'pointer' : 'default', padding: '0 12px 32px' }}
                  >
                    {/* connector line */}
                    {i < 3 && (
                      <div style={{ position: 'absolute', top: 24, left: '75%', width: '50%', height: 2, background: st === 'done' ? 'var(--accent)' : 'var(--border)', zIndex: 1, transition: 'background 0.3s' }} />
                    )}
                    <div style={{
                      width: 48, height: 48, margin: '0 auto 14px', borderRadius: '50%',
                      border: `2px solid ${st !== 'pending' ? 'var(--accent)' : 'var(--border)'}`,
                      background: st === 'done' ? 'var(--accent)' : st === 'current' ? 'var(--accent-dim)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14,
                      color: st === 'done' ? '#fff' : st === 'current' ? 'var(--accent)' : 'var(--ink-muted)',
                      position: 'relative', zIndex: 2, transition: 'all 0.3s',
                      boxShadow: st === 'current' ? '0 0 24px rgba(138,0,224,0.4)' : 'none',
                    }}>
                      {st === 'done' ? <Icon kind="check" size={20} color="#fff" /> : s.n}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: st === 'current' ? 'var(--ink)' : 'var(--ink-muted)' }}>{s.t}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>{s.s}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Form + Sidebar */}
        <div className="sx rg-form page-load-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0 100px' }}>

          {/* ── FORM (left, dominant) ── */}
          <div className="admissions-form-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '44px 48px', minHeight: 480 }}>

            {step === 1 && (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, margin: '0 0 8px' }}>Step 1 — Your details</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-muted)', margin: 0 }}>Tell us who you are so an advisor can reach you.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    { id: 'name', label: 'FULL NAME', value: name, set: setName, placeholder: 'Your full name', type: 'text' },
                    { id: 'email', label: 'EMAIL ADDRESS', value: email, set: setEmail, placeholder: 'you@example.com', type: 'email' },
                    { id: 'phone', label: 'PHONE NUMBER', value: phone, set: setPhone, placeholder: '+94 7X XXX XXXX', type: 'tel' },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: 10 }}>{f.label}</label>
                      <input
                        style={inputCls(focused === f.id)}
                        type={f.type}
                        value={f.value}
                        onChange={e => f.set(e.target.value)}
                        placeholder={f.placeholder}
                        onFocus={() => setFocused(f.id)}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, margin: '0 0 8px' }}>Step 2 — Pick your program</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-muted)', margin: 0 }}>Choose your stream and the program you want to study.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: 10 }}>STREAM</label>
                    <select
                      style={{ ...inputCls(focused === 'stream'), appearance: 'none', cursor: 'pointer' }}
                      value={stream}
                      onFocus={() => setFocused('stream')}
                      onBlur={() => setFocused(null)}
                      onChange={e => { setStream(e.target.value as School); setProgramSlug('') }}
                    >
                      {STREAMS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: 10 }}>HIGHEST QUALIFICATION</label>
                    <select
                      style={{ ...inputCls(focused === 'qual'), appearance: 'none', cursor: 'pointer' }}
                      value={qualification}
                      onFocus={() => setFocused('qual')}
                      onBlur={() => setFocused(null)}
                      onChange={e => setQualification(e.target.value)}
                    >
                      {["After O/L", "After A/L", "Diploma / Bachelor's"].map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: 10 }}>PROGRAM</label>
                    <select
                      style={{ ...inputCls(focused === 'prog'), appearance: 'none', cursor: 'pointer' }}
                      value={programSlug}
                      onFocus={() => setFocused('prog')}
                      onBlur={() => setFocused(null)}
                      onChange={e => setProgramSlug(e.target.value)}
                    >
                      <option value="">Select a program…</option>
                      {streamPrograms.map(p => (
                        <option key={p.slug} value={p.slug}>{p.title} · from {formatLKR(p.priceFrom)}</option>
                      ))}
                    </select>
                  </div>
                  {selectedProgram && (
                    <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', borderRadius: 10, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <Icon kind="star" size={20} color="var(--accent)" />
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
                        <b style={{ color: 'var(--ink)' }}>{selectedProgram.title}</b>
                        <span style={{ color: 'var(--ink-soft)' }}> — {selectedProgram.code} · {selectedProgram.duration} · from {formatLKR(selectedProgram.priceFrom)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, margin: '0 0 8px' }}>Step 3 — Upload results</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-muted)', margin: 0 }}>Optional for now — you can always add these later.</p>
                </div>
                <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, border: '2px dashed var(--border-accent)', borderRadius: 12, padding: '64px 24px', cursor: 'pointer', background: 'var(--accent-dim)', transition: 'background 0.2s' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(138,0,224,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon kind="book" size={28} color="var(--accent)" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', marginBottom: 6 }}>
                      {fileName ? <><b style={{ color: 'var(--accent)' }}>✓</b> {fileName}</> : 'Click to choose a file'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>PDF, JPG or PNG · max 10 MB</div>
                  </div>
                  <input type="file" style={{ display: 'none' }} onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
                </label>
              </>
            )}

            {step === 4 && (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, margin: '0 0 8px' }}>Step 4 — Reserve & pay</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-muted)', margin: 0 }}>Review your details, then secure your seat.</p>
                </div>
                <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
                  {[['Name', name || '—'], ['Email', email || '—'], ['Phone', phone || '—'], ['Program', selectedProgram ? selectedProgram.title : '—'], ['Documents', fileName ?? 'Not uploaded yet']].map(([k, v], i, arr) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'var(--font-body)', fontSize: 15 }}>
                      <span style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{k}</span>
                      <b style={{ color: 'var(--ink)', maxWidth: '60%', textAlign: 'right' }}>{v}</b>
                    </div>
                  ))}
                </div>
                {selectedProgram && (
                  <div style={{ background: 'linear-gradient(135deg, #3F007C, #7B3EC8)', borderRadius: 10, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>DUE TO RESERVE SEAT</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: '#fff' }}>{formatLKR(selectedProgram.priceFrom)}</div>
                    </div>
                    <Icon kind="star" size={32} color="rgba(255,255,255,0.4)" />
                  </div>
                )}
              </>
            )}

            {/* Navigation */}
            <div className="admissions-form-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              <Button variant="outline" onClick={goBack} disabled={step === 1}>← Back</Button>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {savedNotice && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-muted)' }}>Saved — come back anytime.</span>
                )}
                <Button variant="ghost" onClick={() => { setSavedNotice(true); setTimeout(() => setSavedNotice(false), 2500) }}>
                  Save & exit
                </Button>
                {step < 4 ? (
                  <Button
                    variant="primary"
                    disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid)}
                    onClick={goNext}
                  >
                    Continue to Step {step + 1} →
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setSubmitted(true)}>Reserve my seat →</Button>
                )}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR (right) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Pricing card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-accent)', borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 20, textTransform: 'uppercase' }}>Why act now</div>
              {WHY_NOW.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < WHY_NOW.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Perks card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 20, textTransform: 'uppercase' }}>What you get</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PERKS.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Icon kind="check" size={16} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div style={{ background: 'linear-gradient(135deg, var(--accent-dim), rgba(184,80,255,0.08))', border: '1px solid var(--border-accent)', borderRadius: 14, padding: '28px 24px' }}>
              <Icon kind="chat" size={24} color="var(--accent)" />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginTop: 14, marginBottom: 8 }}>Need a hand?</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 16px', lineHeight: 1.65 }}>
                Mon–Fri · 8:30 AM – 5:30 PM<br />
                Level 01, Shangri-La, Colombo 2
              </p>
              <a href="tel:+94711993331" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                +94 71 199 3331 →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
