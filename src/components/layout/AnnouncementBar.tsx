'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Announcement } from '../../data/siteSettings'

/** Older builds remembered a closed strip in the browser; clear it so the strip shows on every load. */
const OLD_DISMISS_KEY = 'inspire-announcement-dismissed'

/**
 * CMS-managed strip above the menu on every page. The message glides from right to left,
 * fades out, and comes back in from the right. Clicking it opens the link (default /programs);
 * the ✕ hides it until the visitor reloads or opens the site again.
 */
export default function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    try { localStorage.removeItem(OLD_DISMISS_KEY) } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('has-announce', !closed)
    return () => document.documentElement.classList.remove('has-announce')
  }, [closed])

  if (closed) return null

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
      <button type="button" className="announce-bar-close" onClick={() => setClosed(true)} aria-label="Close announcement">✕</button>
    </div>
  )
}
