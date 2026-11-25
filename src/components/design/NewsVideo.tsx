'use client'

import { useState } from 'react'
import type { NewsVideo as NewsVideoData } from '../../data/news'

export default function NewsVideo({ video, title }: { video: NewsVideoData; title: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`article-video article-video--${video.orientation}`}>
      {failed ? (
        <div className="article-video-error">
          <p>This video can&apos;t play here.</p>
          <a href={video.url} target="_blank" rel="noopener noreferrer">Open video directly →</a>
        </div>
      ) : (
        <video
          // Without a cover, #t=0.1 makes browsers (Safari too) show the first frame instead of a black box.
          src={video.poster || video.url.includes('#') ? video.url : `${video.url}#t=0.1`}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={`Video: ${title}`}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  )
}
