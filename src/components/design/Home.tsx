'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import VideoTestimonials from './VideoTestimonials'
import type { Testimonial } from '../../data/testimonials'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCounter } from '../../hooks/useCounter'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { formatNewsDate, type NewsItem } from '../../data/news'
import { formatLKR, getProgramImage, type Program } from '../../data/programs'

const HERO_IMG = 'https://inspirecollege.lk/wp-content/uploads/2025/10/Home-page-image-3.png'
const AWARDING_BODY_ORDER = ['ATHE', 'CPD', 'WINC', 'LSBF', 'Jain University']
const canonicalBody = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (normalized.includes('athe')) return 'ATHE'
  if (normalized.includes('cpd')) return 'CPD'
  if (normalized.includes('winc')) return 'WINC'
  if (normalized.includes('lsbf')) return 'LSBF'
  if (normalized.includes('jain')) return 'Jain University'
  return value.trim()
}

const PATH_CARDS = [
  { icon: 'grad', title: 'Foundation', blurb: 'Build essential knowledge and skills for further study and a successful academic journey.', tag: 'From ₨125,000', href: '/programs?level=Foundation', delay: 0 },
  { icon: 'book', title: 'HND & Degrees', blurb: 'Strong foundation with HND, Top-Up Degrees and Postgraduate routes from UK partners.', tag: 'From ₨295,000', href: '/programs?level=HND', delay: 100 },
  { icon: 'brush', title: 'Short Courses', blurb: 'Practical, skill-focused courses — AI Mastery, Digital Marketing, Data Analytics & more.', tag: 'From ₨15,000', href: '/programs?level=Short+Course', delay: 200 },
]

/* ── Animated stat counter ── */
function StatBlock({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,60px)',
        fontWeight: 700, lineHeight: 1, color: 'var(--accent)',
        marginBottom: 8,
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

/* ── Floating cursor-reactive dot grid ── */
function DotGrid() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, rgba(63,0,124,0.45) 80px, transparent 140px)`
  return (
    <div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
      onPointerMove={(e) => { const r = (e.currentTarget.parentElement!).getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top }); setHovering(true) }}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(63,0,124,0.5) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        opacity: hovering ? 1 : 0,
        maskImage: mask, WebkitMaskImage: mask,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ── Decorative floating orb ── */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(60px)',
      pointerEvents: 'none',
      ...style,
    }} />
  )
}

export default function Home({ programs, news, testimonials = [] }: { programs: Program[]; news: NewsItem[]; testimonials?: Testimonial[] }) {
  const revealRef = useScrollReveal()
  const heroRef = useRef<HTMLDivElement>(null)
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const featuredPrograms = [...programs].sort((a, b) => b.popularity - a.popularity).slice(0, 6)
  const [selectedBody, setSelectedBody] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [selectedProgramme, setSelectedProgramme] = useState('')
  const awardingBodies = useMemo(() => [...new Set(programs.map((program) => canonicalBody(program.awardingBody)))].sort((a, b) => {
    const aRank = AWARDING_BODY_ORDER.indexOf(a); const bRank = AWARDING_BODY_ORDER.indexOf(b)
    return (aRank < 0 ? AWARDING_BODY_ORDER.length : aRank) - (bRank < 0 ? AWARDING_BODY_ORDER.length : bRank) || a.localeCompare(b)
  }), [programs])
  const bodyPrograms = useMemo(() => programs.filter((program) => !selectedBody || canonicalBody(program.awardingBody) === selectedBody), [programs, selectedBody])
  const schoolOptions = useMemo(() => [...new Set(bodyPrograms.map((program) => program.schoolName ?? program.school))].sort(), [bodyPrograms])
  const schoolPrograms = useMemo(() => bodyPrograms.filter((program) => !selectedSchool || (program.schoolName ?? program.school) === selectedSchool), [bodyPrograms, selectedSchool])
  const programmeOptions = useMemo(() => [...new Set(schoolPrograms.map((program) => program.programmeName ?? program.level))].sort(), [schoolPrograms])

  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t) }, [])

  /* Subtle parallax on hero orbs */
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tv = (delay: number, extra?: string) =>
    `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms${extra ? `, ${extra}` : ''}`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 68 }}
      >
        {/* Orb container — overflow hidden lives here, not on the section, so text is never clipped */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Orb style={{ width: 600, height: 600, background: 'rgba(198,184,240,0.55)', top: -120, left: -100, animation: 'orb-drift-a 14s ease-in-out infinite', transform: `translateY(${scrollY * 0.12}px)` }} />
          <Orb style={{ width: 400, height: 400, background: 'rgba(123,62,200,0.20)', bottom: 0, right: '10%', animation: 'orb-drift-b 18s ease-in-out infinite', transform: `translateY(${scrollY * -0.08}px)` }} />
          <Orb style={{ width: 250, height: 250, background: 'rgba(63,0,124,0.12)', top: '30%', right: '30%', animation: 'orb-drift-a 22s ease-in-out infinite reverse' }} />
        </div>

        {/* Dot grid */}
        <DotGrid />

        {/* Content */}
        <div className="sx home-hero-grid" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 48, padding: '80px 0' }}>

          {/* Left: text */}
          <div>
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(-14px)',
              transition: tv(0),
              marginBottom: 20, display: 'inline-block',
            }}>
              <Tag accent style={{ animation: heroVisible ? 'tag-bounce 0.7s ease forwards' : 'none' }}>
                · Sri Lanka's First Online University ·
              </Tag>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              fontWeight: 700, lineHeight: 1.04,
              letterSpacing: '-0.025em',
              margin: '0 0 6px',
              color: 'var(--ink)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(36px)',
              transition: tv(150),
            }}>
              Your online
            </h1>
            <h1 className="text-gold" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              fontWeight: 700, fontStyle: 'italic',
              lineHeight: 1.15, letterSpacing: '-0.025em',
              margin: '0 0 20px',
              paddingBottom: 8,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(36px)',
              transition: tv(280),
            }}>
              university.
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.4vw, 34px)',
              fontWeight: 400, lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: 'var(--ink-soft)',
              margin: '0 0 28px',
              whiteSpace: 'normal',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(36px)',
              transition: tv(400),
            }}>
              Foundation · HND · Degree · Master's
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 17,
              color: 'var(--ink-soft)', maxWidth: 460, lineHeight: 1.7,
              marginBottom: 36,
              opacity: heroVisible ? 1 : 0,
              transition: tv(520),
            }}>
              Globally recognised qualifications validated by ATHE, WINC, LSBF and Jain University — delivered fully online from Colombo.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', opacity: heroVisible ? 1 : 0, transition: tv(640) }}>
              <Button variant="primary" size="lg" href="/admissions">Reserve your seat →</Button>
              <Button variant="outline" size="lg" href="/contact">Talk to an advisor</Button>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 40, display: 'flex', gap: 20, alignItems: 'center', opacity: heroVisible ? 1 : 0, transition: tv(760), flexWrap: 'wrap' }}>
              {['ATHE Validated', 'WINC Accredited', 'Jain University', 'LSBF Partner'].map((b) => (
                <div key={b} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image card */}
          <div style={{
            position: 'relative',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateX(48px)',
            transition: tv(300),
          }}>
            {/* Decorative frame */}
            <div style={{ position: 'absolute', inset: -16, border: '2px solid rgba(63,0,124,0.18)', borderRadius: 24, pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: -8, background: 'linear-gradient(135deg, rgba(198,184,240,0.35), rgba(123,62,200,0.15))', borderRadius: 20, zIndex: 0 }} />
            <img
              src={HERO_IMG}
              alt="Inspire College students"
              style={{
                position: 'relative', zIndex: 1,
                width: '100%', borderRadius: 16,
                objectFit: 'cover', display: 'block',
                boxShadow: '0 32px 80px rgba(63,0,124,0.18)',
              }}
            />
            {/* Floating achievement badge */}
            <div style={{
              position: 'absolute', bottom: -24, left: -24, zIndex: 2,
              background: '#fff', borderRadius: 14,
              padding: '14px 18px',
              boxShadow: '0 12px 40px rgba(63,0,124,0.16)',
              border: '1px solid rgba(63,0,124,0.12)',
              animation: 'float 3.5s ease-in-out infinite',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Seats filling fast</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>First 50 at ₨295K</div>
            </div>
            {/* Online badge */}
            <div style={{
              position: 'absolute', top: -20, right: -20, zIndex: 2,
              background: 'var(--accent)', borderRadius: 12,
              padding: '10px 16px',
              boxShadow: '0 8px 24px rgba(63,0,124,0.30)',
              animation: 'float 4.5s ease-in-out infinite 1s',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>100% ONLINE</div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: heroVisible ? 0.55 : 0, transition: 'opacity 1s ease 1.2s',
          animation: 'float 2.2s ease-in-out infinite',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Scroll</div>
          <Icon kind="chevron_down" size={16} color="var(--ink-muted)" />
        </div>
      </section>

      {/* ══ SCROLL SECTIONS ══ */}
      <div ref={revealRef}>

        {/* Stats strip */}
        <section className="sx" style={{ background: 'var(--accent)', padding: '56px 0' }}>
          <div className="home-stats-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
            {[
              { target: 100, suffix: '%', label: 'Online — learn anywhere' },
              { target: 4, label: 'UK & Indian partners' },
              { target: programs.length, label: 'Courses available' },
              { target: 50, label: 'First-50 HND seats' },
            ].map((s, i) => (
              <div key={i} ref={undefined} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingLeft: i > 0 ? 32 : 0 }}>
                <StatBlockLight target={s.target} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </section>

        {/* Program search */}
        <section className="sx" style={{ padding: '96px 0 72px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: 10 }}><Tag>Find your path</Tag></div>
            <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 700, margin: '0 0 44px', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Choose your program
            </h2>
            <form
              action="/programs" method="get"
              className="reveal reveal-delay-2 home-program-search"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', background: '#fff', border: '1.5px solid rgba(63,0,124,0.18)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(63,0,124,0.08)' }}
            >
              <div style={{ padding: '18px 24px', borderRight: '1px solid rgba(63,0,124,0.10)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Awarding body</div>
                <select name="body" value={selectedBody} onChange={(event) => { setSelectedBody(event.target.value); setSelectedSchool(''); setSelectedProgramme('') }} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', appearance: 'none' }}>
                  <option value="">All awarding bodies</option>
                  {awardingBodies.map((body) => <option key={body} value={body}>{body}</option>)}
                </select>
              </div>
              <div style={{ padding: '18px 24px', borderRight: '1px solid rgba(63,0,124,0.10)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 6 }}>School</div>
                <select name="school" value={selectedSchool} disabled={!selectedBody} onChange={(event) => { setSelectedSchool(event.target.value); setSelectedProgramme('') }} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', appearance: 'none', opacity: selectedBody ? 1 : .55 }}>
                  <option value="">{selectedBody ? 'All schools' : 'Select awarding body first'}</option>
                  {schoolOptions.map((school) => <option key={school} value={school}>{school}</option>)}
                </select>
              </div>
              <div style={{ padding: '18px 24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Programme</div>
                <select name="programme" value={selectedProgramme} disabled={!selectedSchool} onChange={(event) => setSelectedProgramme(event.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', appearance: 'none', opacity: selectedSchool ? 1 : .55 }}>
                  <option value="">{selectedSchool ? 'All programmes' : 'Select school first'}</option>
                  {programmeOptions.map((programme) => <option key={programme} value={programme}>{programme}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 28px', background: 'var(--accent)', cursor: 'pointer' }}>
                <button type="submit" style={{ background: 'none', border: 'none', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
                  Find program →
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Path cards */}
        <section className="sx" style={{ padding: '0 0 96px' }}>
          <div className="home-path-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {PATH_CARDS.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className={`card-hover card-shimmer reveal reveal-delay-${i + 1}`}
                style={{ display: 'block', background: '#fff', border: '1.5px solid rgba(63,0,124,0.12)', borderRadius: 14, padding: '36px 32px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(63,0,124,0.06)' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                  <Icon kind={card.icon} size={26} color="var(--accent)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 700, margin: '0 0 12px', color: 'var(--ink)', letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, margin: '0 0 28px' }}>{card.blurb}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag accent>{card.tag}</Tag>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                    <Icon kind="arrow" size={16} color="var(--accent)" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured programs */}
        <section className="sx" style={{ padding: '96px 0', background: 'rgba(63,0,124,0.04)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
              <div>
                <div className="reveal" style={{ marginBottom: 10 }}><Tag>All Programs</Tag></div>
                <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                  Popular programs
                </h2>
              </div>
              <div className="reveal"><Button variant="outline" href="/programs">View all →</Button></div>
            </div>
            <div className="home-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {featuredPrograms.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  className={`programme-image-card home-programme-card card-hover reveal reveal-delay-${(i % 3) + 1}`}
                >
                  <div className="programme-card-cover">
                    <img
                      src={p.imageUrl || getProgramImage(p.imageLabel)}
                      alt={`${p.title} course cover`}
                      loading="lazy"
                      onError={(event) => { event.currentTarget.src = getProgramImage(p.imageLabel) }}
                    />
                  </div>
                  <div className="programme-card-content">
                    <div className="programme-card-meta">
                      <span>{p.awardingBody === 'Jain' ? 'Jain University' : p.awardingBody}</span>
                      <small>{p.duration}</small>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.blurb}</p>
                    <div className="programme-card-footer">
                      <strong>From {formatLKR(p.priceFrom)}</strong>
                      <span className="programme-read-more">Read more <Icon kind="arrow" size={14} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Student story + news */}
        <VideoTestimonials items={testimonials} />
        <section className="sx" style={{ padding: '96px 0' }}>
          <div className="home-story-news" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, alignItems: 'start' }}>
            {/* Story card */}
            <div className="reveal card-hover home-story-card" style={{ background: '#fff', border: '1.5px solid rgba(63,0,124,0.12)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(63,0,124,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&auto=format"
                  alt="Student"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  className="story-img"
                />
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 16, textTransform: 'uppercase' }}>HND · Software Engineering</div>
                <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, margin: '0 0 14px', lineHeight: 1.4, fontStyle: 'italic', color: 'var(--ink)' }}>
                  "I started with no coding background. Now I'm a software developer."
                </blockquote>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-muted)', marginBottom: 24, lineHeight: 1.6 }}>— Graduate, HND Computing</p>
                <Button variant="outline" size="sm" href="/programs/hnd-computing-software-engineering">Read her story →</Button>
              </div>
            </div>

            {/* Latest news */}
            <div className="reveal reveal-delay-2">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--ink)' }}>Latest news</h2>
                <Button variant="ghost" size="sm" href="/news">All news →</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {latestNews.map((item, i) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="card-hover"
                    style={{ display: 'flex', gap: 16, padding: '18px 20px', background: '#fff', borderRadius: 10, border: '1.5px solid rgba(63,0,124,0.10)', textDecoration: 'none', boxShadow: '0 2px 8px rgba(63,0,124,0.04)', transition: 'all 0.25s ease' }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', width: 44, flexShrink: 0, paddingTop: 2, letterSpacing: '0.03em' }}>
                      {formatNewsDate(item.date)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Tag accent style={{ marginBottom: 8 }}>{item.category}</Tag>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, lineHeight: 1.45, color: 'var(--ink)' }}>{item.title}</div>
                    </div>
                    <Icon kind="arrow" size={15} color="var(--ink-muted)" style={{ marginTop: 4, flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="sx" style={{ padding: '0 0 100px' }}>
          <div
            className="reveal home-cta"
            style={{
              maxWidth: 1200, margin: '0 auto',
              background: 'linear-gradient(135deg, #3F007C 0%, #7B3EC8 60%, #3F007C 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 6s ease infinite',
              borderRadius: 20, padding: '64px 72px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Decorative orbs inside banner */}
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: -80, right: 200, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: -60, right: 80, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)', marginBottom: 14, textTransform: 'uppercase' }}>Limited offer</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}>
                First 50 HND students<br />at <span style={{ color: '#c6b8f0' }}>₨295,000</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Regular fee ₨400,000 — save ₨105,000 by reserving today.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <a href="/admissions" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: '#fff', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: 'none', border: 'none', letterSpacing: '0.02em', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
              >
                Reserve your seat →
              </a>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', background: 'transparent', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, borderRadius: 8, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', letterSpacing: '0.02em', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
              >
                Talk to an advisor
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* White-text stat for the purple stats strip */
function StatBlockLight({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 700, lineHeight: 1, color: '#fff', marginBottom: 6 }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}
