'use client'

import { useCallback, useEffect, useRef } from 'react'
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

  const renderWidget = useCallback(() => {
    if (!container.current || !window.grecaptcha || widgetId.current !== null) return
    widgetId.current = window.grecaptcha.render(container.current, {
      sitekey: siteKey,
      callback: onToken,
      'expired-callback': () => onToken(''),
      'error-callback': () => onToken(''),
    })
  }, [siteKey, onToken])

  useEffect(() => { renderWidget() }, [renderWidget])
  useEffect(() => {
    if (resetCount > 0 && widgetId.current !== null) {
      window.grecaptcha?.reset(widgetId.current)
      onToken('')
    }
  }, [resetCount, onToken])

  return <div aria-label="Verify you are human">
    <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" onReady={renderWidget} />
    <div ref={container} />
  </div>
}
