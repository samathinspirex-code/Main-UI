'use client'

import { useEffect, useRef, useState } from 'react'

function FeeAmount({ value, currency, progress }: { value: number; currency: 'LKR' | 'GBP'; progress: number }) {
  const finalAmount = `${currency} ${value.toLocaleString('en-GB')}`
  return (
    <span role="img" aria-label={finalAmount} className="hnd-fee-amount">
      <span aria-hidden="true" className="hnd-fee-amount-width">{finalAmount}</span>
      <span aria-hidden="true" className="hnd-fee-amount-value">{currency} {Math.round(value * progress).toLocaleString('en-GB')}</span>
    </span>
  )
}

export default function HndFees() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return
    let frame = 0
    let startedAt: number | null = null
    const tick = (time: number) => {
      if (reducedMotion.matches) {
        setProgress(1)
        return
      }
      startedAt ??= time
      const elapsed = Math.min((time - startedAt) / 400, 1)
      setProgress(1 - Math.pow(1 - elapsed, 3))
      if (elapsed < 1) frame = window.requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      frame = window.requestAnimationFrame(tick)
    }, { threshold: 0.15 })
    observer.observe(section)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hnd-fees" aria-labelledby="hnd-fees-title">
      <div className="hnd-fees-heading">
        <span>HND FEES & PAYMENT OPTIONS</span>
        <h2 id="hnd-fees-title">Choose how you pay</h2>
        <p>Regular course fee: <strong>LKR 450,000</strong> + ATHE learner registration fees. The following payment options are available under the offer.</p>
      </div>
      <div className="hnd-fees-plans">
        <div className="hnd-fees-card hnd-fees-offer">
          <span>UPFRONT OFFER</span>
          <h3><FeeAmount value={250000} currency="LKR" progress={progress} /></h3>
          <p>Pay upfront under the discount offer.</p>
          <small>+ ATHE learner registration fees</small>
        </div>
        <div className="hnd-fees-card">
          <span>12-MONTH PAYMENT PLAN</span>
          <h3><FeeAmount value={27000} currency="LKR" progress={progress} /> <small>/ month</small></h3>
          <p>LKR 27,000 × 12 months</p>
          <small>+ ATHE learner registration fees</small>
          <p className="hnd-fees-seat-note">Reserve your seat — <strong><FeeAmount value={15000} currency="LKR" progress={progress} /></strong></p>
        </div>
        <div className="hnd-fees-card">
          <span>18-MONTH PAYMENT PLAN</span>
          <h3><FeeAmount value={20000} currency="LKR" progress={progress} /> <small>/ month</small></h3>
          <p>LKR 20,000 × 18 months</p>
          <small>+ ATHE learner registration fees</small>
          <p className="hnd-fees-seat-note">Reserve your seat — <strong><FeeAmount value={15000} currency="LKR" progress={progress} /></strong></p>
        </div>
      </div>
      <div className="hnd-fees-details">
        <div className="hnd-fees-card">
          <span>ATHE LEARNER REGISTRATION FEES</span>
          <h3>ATHE fees</h3>
          <dl>
            <div><dt>Year 1 · First 9 months</dt><dd><FeeAmount value={170} currency="GBP" progress={progress} /></dd></div>
            <div><dt>Year 2 · Second 9 months</dt><dd><FeeAmount value={184} currency="GBP" progress={progress} /></dd></div>
          </dl>
          <small>These fees are additional to every payment option.</small>
        </div>
      </div>
    </section>
  )
}
