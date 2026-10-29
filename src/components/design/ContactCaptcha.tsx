'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      }) => number
      reset: (widgetId: number) => void
    }
    onContactRecaptchaReady?: () => void
  }
}

interface Props {
  siteKey: string
  onToken: (token: string) => void
  resetCount: number
}

export function ContactCaptcha({ siteKey, onToken, resetCount }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const [scriptConfigured, setScriptConfigured] = useState(false)

  const renderWidget = useCallback(() => {
    if (!container.current || typeof window.grecaptcha?.render !== 'function' || widgetId.current !== null) return
    widgetId.current = window.grecaptcha.render(container.current, {
      sitekey: siteKey,
      callback: onToken,
      'expired-callback': () => onToken(''),
      'error-callback': () => onToken(''),
    })
  }, [siteKey, onToken])

  useEffect(() => {
    // Google's onload callback runs only after the widget API is initialized.
    window.onContactRecaptchaReady = renderWidget
    setScriptConfigured(true)
    renderWidget() // Handles an already loaded script after client navigation.
    return () => { window.onContactRecaptchaReady = undefined }
  }, [renderWidget])
  useEffect(() => {
    if (resetCount > 0 && widgetId.current !== null && typeof window.grecaptcha?.reset === 'function') {
      window.grecaptcha.reset(widgetId.current)
      onToken('')
    }
  }, [resetCount, onToken])

  return <div aria-label="Verify you are human">
    {scriptConfigured && <Script src="https://www.google.com/recaptcha/api.js?onload=onContactRecaptchaReady&render=explicit" strategy="afterInteractive" onReady={renderWidget} />}
    <div ref={container} />
  </div>
}
