'use client'

import Link from 'next/link'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { formatNewsDate, type NewsItem } from '../../data/news'

export default function NewsPage({ items }: { items: NewsItem[] }) {
  const sortedItems = [...items].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <Navbar />
      <main className="news-page" style={{ paddingTop: 68 }}>
        <div className="news-page-hero sx">
          <div className="news-page-hero-inner">
            <div>
              <div className="news-eyebrow">INSPIRE COLLEGE JOURNAL</div>
              <h1>News &amp; events</h1>
              <p>Discover college announcements, partnerships, student opportunities, and upcoming events.</p>
            </div>
            <div className="news-page-mark" aria-hidden="true">N<span>°</span></div>
          </div>
        </div>

        <div className="news-page-content sx">
          <div className="news-section-heading">
            <div>
              <span>Latest updates</span>
              <h2>From across our community</h2>
            </div>
            <div className="news-item-count">{sortedItems.length} {sortedItems.length === 1 ? 'story' : 'stories'}</div>
          </div>

          <div className="news-grid">
            {sortedItems.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="news-card card-hover"
              >
                <div className="news-card-media"><img src={item.image} alt={item.title} /></div>
                <div className="news-card-body">
                  <div className="news-card-meta"><Tag accent>{item.category}</Tag><span>{formatNewsDate(item.date)}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <div className="news-card-link">Read more <Icon kind="arrow" size={14} color="var(--accent)" /></div>
                </div>
              </Link>
            ))}
            {sortedItems.length === 0 && <div className="news-empty">No published news or events yet.</div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
