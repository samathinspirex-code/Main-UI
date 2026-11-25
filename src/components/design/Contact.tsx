'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Icon } from '../ui/Icon'

const CONTACT_VIDEO = '/contact/inspire-contact-video.mp4'

/** Portrait welcome video: starts by itself (muted, as browsers require) and offers a sound button. */
function ContactVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = video.current
    if (!el) return
    el.muted = true
    el.play().catch(() => { /* autoplay blocked: the controls stay available */ })
  }, [])

  const turnSoundOn = () => {
    const el = video.current
    if (!el) return
    el.muted = false
    setMuted(false)
    el.play().catch(() => {})
  }

  return (
    <figure id="contact-video" className="reveal reveal-delay-2 contact-video">
      <video
        ref={video}
        src={CONTACT_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="auto"
        aria-label="Welcome video from Inspire College"
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      />
      {muted && (
        <button type="button" className="contact-video-sound" onClick={turnSoundOn}>
          <span aria-hidden="true">🔊</span> Tap for sound
        </button>
      )}
    </figure>
  )
}

export default function Contact() {
  const revealRef = useScrollReveal()

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <div className="sx" style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 12 }}>HOME / CONTACT</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Chat with an advisor</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: 0 }}>Mon–Fri · 8:30 AM – 5:30 PM · we usually reply within one business day.</p>
          </div>
        </div>

        <div ref={revealRef} className="sx rg-2" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 0 80px', gap: 48 }}>
          {/* Contact info */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: 'pin', label: 'Visit us', value: 'Level 01, Shangri la, Colombo 2', href: undefined },
              { icon: 'chat', label: 'Call or WhatsApp', value: '+94 76 097 4225', href: 'tel:+94760974225' },
              { icon: 'mail', label: 'Email', value: 'enrol@inspire.college', href: 'mailto:enrol@inspire.college' },
            ].map((c) => (
              <div key={c.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon kind={c.icon} size={20} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}>{c.value}</a>
                  ) : (
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 16 }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}
            <a href="https://wa.me/94760974225" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--accent)', borderRadius: 10, padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Icon kind="chat" size={22} color="#FFFFFF" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Chat with us on WhatsApp →</span>
            </a>
          </div>

          {/* Video (replaces the old contact form) */}
          <ContactVideo />
        </div>
      </main>
      <Footer />
    </div>
  )
}
