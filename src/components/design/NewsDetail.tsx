import Link from 'next/link'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { formatNewsDate, type NewsItem } from '../../data/news'

export default function NewsDetail({ item, others }: { item: NewsItem; others: NewsItem[] }) {
  return (
    <div>
      <Navbar />
      <main className="article-page" style={{ paddingTop: 68 }}>
        <div className="article-breadcrumb">
          <Link href="/news">News &amp; Events</Link>
          <span aria-hidden="true">/</span>
          <span>{item.category}</span>
        </div>

        <header className="article-heading">
          <div className="article-meta"><Tag accent>{item.category}</Tag><span>{formatNewsDate(item.date)}</span></div>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </header>

        <div className="article-image-wrap">
          <figure className="article-image"><img src={item.image} alt={item.title} /></figure>
        </div>

        <div className="article-body">
          <div className="article-copy">
            {item.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="article-back"><Button variant="outline" href="/news">← Back to all news</Button></div>
        </div>

        {others.length > 0 && (
          <section className="article-more">
            <div className="article-more-heading">
              <div><span>Keep reading</span><h2>More news &amp; events</h2></div>
              <Button variant="ghost" href="/news">View all →</Button>
            </div>
            <div className="article-more-grid">
              {others.map(n => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="article-more-card card-hover">
                  <div className="article-more-media"><img src={n.image} alt={n.title} /></div>
                  <div className="article-more-content">
                    <div className="article-more-meta"><Tag accent>{n.category}</Tag><span>{formatNewsDate(n.date)}</span></div>
                    <h3>{n.title}</h3>
                    <span className="article-more-link">Read story →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
