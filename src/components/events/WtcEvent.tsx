'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '../ui/Icon'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import './wtc-event.css'

const PROGRAMMES = [
  { title: 'CPD Short Courses', displayTitle: 'CPD Short Courses', description: 'Practical, career-focused professional programmes.', image: '/wtc/cpd-portrait-hd.webp', icon: 'book' },
  { title: 'ATHE Level 7 Qualifications', displayTitle: 'ATHE Level 7 Qualifications', description: 'Explore postgraduate-level qualification pathways.', image: '/wtc/athe-portrait-hd.webp', icon: 'grad' },
  { title: 'Jain University Master’s', displayTitle: 'Jain University Online Master’s Programmes', description: 'Flexible online postgraduate degrees.', image: '/wtc/jain-portrait-hd.webp', icon: 'building' },
]
const TIMES = ['8.30 AM – 10.00 AM', '10.00 AM – 12.00 PM', '12.00 PM – 2.00 PM', '2.00 PM – 4.00 PM', '4.00 PM – 5.30 PM']
type Result = { registration_id: string; lead_id: number; crm_saved: true; confirmation_sent: boolean; notification_sent: boolean; message: string }

export default function WtcEvent() {
  const router = useRouter()
  const successDialog = useRef<HTMLDialogElement>(null)
  const formSection = useRef<HTMLElement>(null)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const submissionId = useRef('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!result) return
    const dialog = successDialog.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    successHeading.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [result])


  function reserveSlot() {
    const target = formSection.current
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = window.scrollY
    const end = target.getBoundingClientRect().top + start - 88
    if (reduce) {
      window.scrollTo({ top: end, behavior: 'instant' })
      target.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true })
      return
    }
    const started = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - started) / 320, 1)
      window.scrollTo({ top: start + (end - start) * (1 - Math.pow(1 - progress, 3)), behavior: 'instant' })
      if (progress < 1) window.requestAnimationFrame(animate)
      else target.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true })
    }
    window.requestAnimationFrame(animate)
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    const form = event.currentTarget
    const data = new FormData(form)
    setBusy(true)
    setError('')
    submissionId.current ||= crypto.randomUUID()
    try {
      const response = await fetch('/api/wtc-registrations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submissionId.current, full_name: data.get('full_name'), phone: data.get('phone'),
          email: data.get('email'), company_name: data.get('company_name'), employee_id: data.get('employee_id') || null,
          programme: data.get('programme'), visiting_time: data.get('visiting_time'), consent: data.get('consent') === 'on',
        }),
      })
      const payload = await response.json()
      if (!response.ok) {
        const details = Array.isArray(payload.detail) ? payload.detail.map((item: { msg: string }) => item.msg).join('. ') : null
        throw new Error(payload?.error?.message || details || 'Unable to register. Please check your details and try again.')
      }
      if (payload.crm_saved !== true || !Number.isInteger(payload.lead_id) || payload.lead_id <= 0 || !/^WTC26-[A-Z0-9]{4,16}$/.test(payload.registration_id)) {
        throw new Error('Your registration could not be verified. Please try again or contact enrol@inspire.college.')
      }
      setResult(payload)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to register right now. Please try again.')
    } finally { setBusy(false) }
  }

  return (
    <div className="wtc-page">
      <Navbar actionLabel="Reserve your slot" onAction={reserveSlot} />
      <main>
        <section className="wtc-hero wtc-section">
          <div className="wtc-hero-copy">
            <span className="wtc-eyebrow">01 · INSPIRE COLLEGE AT WTC</span>
            <h1>Inspire College<br />is coming to <strong>WTC!</strong></h1>
            <p>Meet our team, explore our programmes and take the next step in your career.</p>
            <div className="wtc-event-facts">
              <div><span className="wtc-fact-icon">26</span><span><small>Date &amp; time</small><b>26th October 2026</b><small>8.30 AM to 5.30 PM</small></span></div>
              <div><Icon kind="pin" size={27} /><span><small>Venue</small><b>World Trade Center,<br />Colombo</b></span></div>
            </div>
            <button className="wtc-button" onClick={reserveSlot}><span className="wtc-play">↗</span>RESERVE YOUR SLOT</button>
            <small className="wtc-hero-note">Free registration · Explore your career opportunities</small>
          </div>
          <div className="wtc-hero-art"><div className="wtc-art-orbit" /><Image src="/career-journey-wtc.png" alt="Professionals at the World Trade Center in Colombo" width={1024} height={1024} preload sizes="(max-width: 800px) 95vw, 55vw" /></div>
          <div className="wtc-wave" aria-hidden="true" />
        </section>

        <section id="programmes" className="wtc-programmes wtc-section">
          <span className="wtc-eyebrow">02 · EXPLORE OUR PROGRAMMES</span>
          <h2>Upgrade Your Skills.<br /><em>Advance Your Career.</em></h2>
          <p>Flexible learning opportunities designed for working professionals.</p>
          <div className="wtc-programme-grid">
            {PROGRAMMES.map(programme => <article className="wtc-programme-card" key={programme.title}>
              <div className="wtc-programme-copy">
                <span className="wtc-programme-icon"><Icon kind={programme.icon} size={38} /></span>
                <div><h3>{programme.displayTitle}</h3><p>{programme.description}</p></div>
              </div>
              <Image src={programme.image} alt="" width={724} height={724} quality={90} sizes="(max-width: 800px) 90vw, 400px" />
            </article>)}
          </div>
        </section>

        <section className="wtc-offers wtc-section" aria-labelledby="wtc-offer-heading">
          <div className="wtc-offer-art" aria-label="Exclusive WTC offers, up to 50 percent off selected programmes">
            <span className="wtc-offer-ribbon">EXCLUSIVE WTC OFFERS</span>
            <span className="wtc-offer-up">UP TO</span><strong>50<span>%</span></strong><span className="wtc-offer-sticker">OFF!</span>
            <i className="wtc-confetti wtc-confetti-one" /><i className="wtc-confetti wtc-confetti-two" /><i className="wtc-confetti wtc-confetti-three" />
          </div>
          <div className="wtc-offer-copy"><span className="wtc-eyebrow">03 · MEET US. DISCOVER MORE.</span><h2 id="wtc-offer-heading">Exclusive Event-Day Offers</h2><p>Register now, visit our stall on 26th October and explore special discounts on selected programmes.</p><span className="wtc-yellow-rule" /><button onClick={reserveSlot}>Reserve your slot <span>↗</span></button></div>
        </section>

        <section ref={formSection} id="registration" className="wtc-registration wtc-section">
          <div className="wtc-registration-copy"><span className="wtc-eyebrow">04 · REGISTRATION FORM</span><h2>Reserve{' '}<br /><em>Your Slot.</em></h2><p>Register today and explore your opportunities.</p><Image src="/wtc/registration-cutout.png" alt="Two professionals with the World Trade Center towers behind them and flowing purple ribbons" width={1254} height={1254} quality={90} sizes="(max-width: 800px) 90vw, 440px" /></div>
          <div className="wtc-form-card">
            <form onSubmit={register} aria-busy={busy}>
              <fieldset disabled={busy || Boolean(result)}>
                <legend className="wtc-form-legend">Your WTC event registration</legend>
                <div className="wtc-form-grid">
                  <label>Full Name <span>*</span><input name="full_name" autoComplete="name" minLength={2} maxLength={255} required placeholder="Enter your full name" /></label>
                  <label>Mobile / WhatsApp Number <span>*</span><input name="phone" autoComplete="tel" type="tel" minLength={7} maxLength={50} pattern="[+0-9() .-]{7,50}" required placeholder="+94 77 123 4567" /></label>
                  <label className="wtc-full-field">Email Address <span>*</span><input name="email" autoComplete="email" type="email" maxLength={254} required placeholder="Enter your email address" /></label>
                  <label>Company Name <span>*</span><input name="company_name" autoComplete="organization" minLength={2} maxLength={255} required placeholder="Enter your company name" /></label>
                  <label>Employee ID <small>(optional)</small><input name="employee_id" maxLength={100} placeholder="Enter your employee ID" /></label>
                  <label className="wtc-full-field">Programme of Interest <span>*</span><select name="programme" required defaultValue=""><option value="" disabled>Select a programme</option>{PROGRAMMES.map(item => <option key={item.title}>{item.title}</option>)}<option>Not Sure Yet</option></select></label>
                  <label className="wtc-full-field">Preferred Visiting Time <span>*</span><select name="visiting_time" required defaultValue=""><option value="" disabled>Select a time slot</option>{TIMES.map(time => <option key={time}>{time}</option>)}</select></label>
                </div>
                <label className="wtc-consent"><input type="checkbox" name="consent" required /><span>I agree to the processing of my details for event registration and eligibility verification, as described in the <a href="#wtc-privacy">Privacy Notice</a>.</span></label>
                <details id="wtc-privacy" className="wtc-privacy"><summary>Privacy Notice</summary><p>Inspire College uses your details to register your attendance, send your event confirmation, and verify eligibility for selected event offers. Your registration is recorded with our enrolments team. Employee ID is optional. For details about how we handle personal data and how to contact us, read our <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.</p></details>
                {error && <p className="wtc-error" role="alert">{error}</p>}
                <button className="wtc-button wtc-submit" type="submit"><span className="wtc-play">↗</span>{busy ? 'CONFIRMING YOUR SLOT…' : 'CONFIRM MY SLOT'}</button>
                <p className="wtc-form-note">Registration is free. Discounts apply to selected programmes only.</p>
              </fieldset>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <dialog ref={successDialog} className="wtc-success-dialog" aria-labelledby="wtc-success-title" aria-describedby="wtc-success-description" onClose={() => router.push('/')}>
        <button type="button" className="wtc-success-close" aria-label="Close confirmation and go home" onClick={() => successDialog.current?.close()}><Icon kind="x" size={22} /></button>
        <div className="wtc-success">
              <span className="wtc-success-icon"><Icon kind="check" size={34} /></span>
              <h2 id="wtc-success-title" ref={successHeading} tabIndex={-1}>You’re Registered!</h2>
              <p id="wtc-success-description">Thank you for registering for Inspire College at WTC.</p>
              <p><strong>26th October 2026</strong><br />World Trade Center, Colombo</p>
              <div className="wtc-registration-id"><small>Your Registration ID</small><strong>{result?.registration_id}</strong></div>
              <p>We look forward to meeting you!</p>
              <p className="wtc-email-status">{result?.confirmation_sent ? 'Your confirmation has been sent to your email address.' : 'Your slot is saved. We could not send the confirmation email right now. Please keep your registration ID and contact enrol@inspire.college if needed.'}</p>
              <button type="button" className="wtc-button wtc-success-home" onClick={() => successDialog.current?.close()}>Close &amp; go to home →</button>
            </div>
      </dialog>
    </div>
  )
}
