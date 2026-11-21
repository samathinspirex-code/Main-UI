'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Announcement } from '../../data/siteSettings'

const DISMISS_KEY = 'inspire-announcement-dismissed'

/** Short stable fingerprint so a closed strip reappears when the CMS text changes. */
function fingerprint(text: string) {
  let hash = 0
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0
  return String(hash)
}

/**
 * CMS-managed strip above the menu on every page. The message glides from right to left,
 * fades out, and comes back in from the right. Clicking it opens the link (default /programs);
 * the ✕ hides it for this visitor until the text changes.
 */
export default function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  const [closed, setClosed] = useState(false)
  const id = fingerprint(announcement.text)

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === id) setClosed(true)
    } catch { /* storage unavailable: keep showing */ }
  }, [id])

  useEffect(() => {
    document.documentElement.classList.toggle('has-announce', !closed)
    return () => document.documentElement.classList.remove('has-announce')
  }, [closed])

  if (closed) return null

  const close = () => {
    setClosed(true)
    try { localStorage.setItem(DISMISS_KEY, id) } catch { /* ignore */ }
  }
  const external = /^https?:\/\//.test(announcement.link)

  return (
    <div className="announce-bar" role="region" aria-label="Announcement">
      <Link
        href={announcement.link}
        className="announce-bar-link"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="announce-bar-track">
          <span className="announce-bar-text">{announcement.text} <b aria-hidden="true">→</b></span>
        </span>
        <span className="sr-only">{announcement.text}</span>
      </Link>
      <button type="button" className="announce-bar-close" onClick={close} aria-label="Close announcement">✕</button>
    </div>
  )
}
