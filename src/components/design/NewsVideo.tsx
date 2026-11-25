'use client'

import { useEffect, useRef, useState } from 'react'
import type { NewsVideo as NewsVideoData } from '../../data/news'

/**
 * News article video. It starts by itself when the page opens. Browsers only
 * allow that while muted, so it begins muted with a "Tap for sound" button.
 */
export default function NewsVideo({ video, title }: { video: NewsVideoData; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.play().catch(() => { /* autoplay blocked: the controls stay available */ })
  }, [video.url])

  const turnSoundOn = () => {
    const el = ref.current
    if (!el) return
    el.muted = false
    setMuted(false)
    el.play().catch(() => {})
  }

  return (
    <figure className={`article-video article-video--${video.orientation}`}>
      {failed ? (
        <div className="article-video-error">
          <p>This video can&apos;t play here.</p>
          <a href={video.url} target="_blank" rel="noopener noreferrer">Open video directly →</a>
        </div>
      ) : (
        <>
          <video
            ref={ref}
            src={video.url}
            poster={video.poster}
            autoPlay
            muted
            playsInline
            controls
            preload="auto"
            aria-label={`Video: ${title}`}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            onError={() => setFailed(true)}
          />
          {muted && (
            <button type="button" className="contact-video-sound" onClick={turnSoundOn}>
              <span aria-hidden="true">🔊</span> Tap for sound
            </button>
          )}
        </>
      )}
    </figure>
  )
}
