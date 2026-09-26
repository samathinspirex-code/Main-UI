'use client'

import { FormEvent, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function Contact() {
  const revealRef = useScrollReveal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  async function submitContactForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const trimmedName = name.trim()
      const trimmedEmail = email.trim()
      const trimmedPhone = phone.trim()
      const trimmedMessage = message.trim()

      if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
        throw new Error('Please fill in your name, email, phone number, and message.')
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: trimmedName, email: trimmedEmail, phone: trimmedPhone, message: trimmedMessage }),
      })
      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        let msg = 'We could not send your message. Please try again.'
        if (payload?.error?.details && Array.isArray(payload.error.details) && payload.error.details.length > 0) {
          msg = payload.error.details.map((d: { issue?: string; msg?: string; field?: string }) => d.issue || d.msg || `${d.field}: invalid`).join('. ')
        } else if (typeof payload?.error?.message === 'string') {
          msg = payload.error.message
        } else if (typeof payload?.detail === 'string') {
          msg = payload.detail
        } else if (Array.isArray(payload?.detail) && payload.detail.length > 0) {
          msg = payload.detail.map((d: { msg?: string }) => d.msg || 'Invalid input').join('. ')
        }
        throw new Error(msg)
      }

      setSent(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'We could not send your message. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div>
        <Navbar />
        <main style={{ paddingTop: 68, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Icon kind="check" size={28} color="var(--accent)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, margin: '0 0 12px' }}>Message sent!</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-soft)', margin: '0 0 32px' }}>
              Thanks {name.split(' ')[0] || 'there'} — we'll reply to {email || 'your email'} soon.
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
      <main style={{ paddingTop: 68 }}>
        <div className="sx" style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 12 }}>HOME / CONTACT</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Talk to an advisor</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: 0 }}>Mon–Fri · 8:30 AM – 5:30 PM · we usually reply within one business day.</p>
          </div>
        </div>

        <div ref={revealRef} className="sx rg-2" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 0 80px', gap: 48 }}>
          {/* Contact info */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: 'pin', label: 'Visit us', value: 'Level 01, Shangri la, Colombo 2', href: undefined },
              { icon: 'chat', label: 'Call or WhatsApp', value: '+94 71 199 3331', href: 'tel:+94711993331' },
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
            <a href="https://wa.me/94711993331" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--accent)', borderRadius: 10, padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Icon kind="chat" size={22} color="#FFFFFF" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Chat with us on WhatsApp →</span>
            </a>
          </div>

          {/* Form */}
          <form
            className="reveal reveal-delay-2 contact-form-card"
            onSubmit={submitContactForm}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, margin: 0 }}>Send us a message</h2>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: 8 }}>FULL NAME</label>
              <input style={{ ...inputStyle, borderColor: focused === 'name' ? 'var(--accent)' : 'var(--border)' }} required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input style={{ ...inputStyle, borderColor: focused === 'email' ? 'var(--accent)' : 'var(--border)' }} required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: 8 }}>PHONE NUMBER</label>
              <input style={{ ...inputStyle, borderColor: focused === 'phone' ? 'var(--accent)' : 'var(--border)' }} required type="tel" inputMode="tel" autoComplete="tel" minLength={5} maxLength={50} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 77 123 4567"
                onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: 8 }}>MESSAGE</label>
              <textarea style={{ ...inputStyle, minHeight: 130, resize: 'vertical', borderColor: focused === 'message' ? 'var(--accent)' : 'var(--border)' }} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?"
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
            </div>
            {error && (
              <div role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#a11b1b', background: '#fff3f3', border: '1px solid #efcaca', borderRadius: 6, padding: '10px 12px' }}>
                {error}
              </div>
            )}
            <Button variant="primary" type="submit" fullWidth disabled={busy}>{busy ? 'Sending…' : 'Send message →'}</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
