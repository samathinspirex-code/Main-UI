'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Tag } from '../ui/Tag'
import { Icon } from '../ui/Icon'
import { formatLKR, type Program } from '../../data/programs'

const LEVELS = ['Foundation','HND','Higher Diploma','Diploma','Top-Up Degree','Postgraduate','Short Course'] as const
const SCHOOLS: { label: string; value: Program['school'] }[] = [
  { label: 'School of Computing', value: 'Computing' },
  { label: 'School of Business', value: 'Business' },
  { label: 'CPD / Short Courses', value: 'CPD' },
]
const BODIES: { label: string; value: Program['awardingBody'] }[] = [
  { label: 'ATHE (UK)', value: 'ATHE' },
  { label: 'WINC — UoB (UK)', value: 'WINC' },
  { label: 'LSBF (UK)', value: 'LSBF' },
  { label: 'Jain University', value: 'Jain' },
]
const PAGE_SIZE = 6

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

function Checkbox({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '4px 0' }}>
      <div
        style={{
          width: 16, height: 16, borderRadius: 3,
          border: `1px solid ${checked ? 'var(--accent)' : 'var(--border)'}`,
          background: checked ? 'var(--accent)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.15s',
        }}
      >
        {checked && <Icon kind="check" size={10} color="#FFFFFF" />}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)' }}>{label} <span style={{ color: 'var(--ink-muted)', fontSize: 11 }}>({count})</span></span>
    </label>
  )
}

function FilterGroup({ title, items, selected, onToggle }: { title: string; items: { label: string; value: string; count: number }[]; selected: Set<string>; onToggle: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>
      {items.map(it => (
        <Checkbox key={it.value} checked={selected.has(it.value)} onChange={() => onToggle(it.value)} label={it.label} count={it.count} />
      ))}
    </div>
  )
}

export default function Programs({ programs, initialQuery = '', initialLevel = '', initialBody = '' }: { programs: Program[]; initialQuery?: string; initialLevel?: string; initialBody?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [levels, setLevels] = useState<Set<string>>(new Set(initialLevel ? [initialLevel] : []))
  const [schools, setSchools] = useState<Set<string>>(new Set())
  const [bodies, setBodies] = useState<Set<string>>(new Set(initialBody ? [initialBody] : []))
  const [sort, setSort] = useState<'popularity'|'price-asc'|'price-desc'>('popularity')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const counts = useMemo(() => {
    const lc = new Map<string, number>(); const sc = new Map<string, number>(); const bc = new Map<string, number>()
    for (const p of programs) {
      lc.set(p.level, (lc.get(p.level) ?? 0) + 1)
      sc.set(p.school, (sc.get(p.school) ?? 0) + 1)
      bc.set(p.awardingBody, (bc.get(p.awardingBody) ?? 0) + 1)
    }
    return { lc, sc, bc }
  }, [programs])

  const filtered = useMemo(() => {
    let list = programs.filter(p => {
      if (levels.size && !levels.has(p.level)) return false
      if (schools.size && !schools.has(p.school)) return false
      if (bodies.size && !bodies.has(p.awardingBody)) return false
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false
      return true
    })
    list = [...list].sort((a, b) => sort === 'price-asc' ? a.priceFrom - b.priceFrom : sort === 'price-desc' ? b.priceFrom - a.priceFrom : b.popularity - a.popularity)
    return list
  }, [programs, levels, schools, bodies, query, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const cur = Math.min(page, pageCount)
  const items = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* Header */}
        <div className="sx" style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 12 }}>HOME / PROGRAMS</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Find your program</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: 0 }}>Foundation · HND · Top-Up Degree · Master's · Short Courses — all 100% online</p>
          </div>
        </div>

        <div className="sx rg-sidebar" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0 80px', gap: 48 }}>
          {/* Sidebar */}
          <div>
            <button className="filter-toggle-btn" onClick={() => setShowFilters(f => !f)}>
              <span>⚙</span> {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            <div style={{ position: 'sticky', top: 88 }} className={showFilters ? undefined : 'sidebar-collapsed'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Filters</div>
                {(levels.size || schools.size || bodies.size || query) ? (
                  <button onClick={() => { setLevels(new Set()); setSchools(new Set()); setBodies(new Set()); setQuery(''); setPage(1) }} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--accent)', cursor: 'pointer' }}>
                    Clear all
                  </button>
                ) : null}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search programs…"
                style={{ width: '100%', padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none', marginBottom: 24 }}
              />
              <FilterGroup title="Level" items={LEVELS.map(l => ({ label: l, value: l, count: counts.lc.get(l) ?? 0 }))} selected={levels} onToggle={v => { setLevels(toggle(levels, v)); setPage(1) }} />
              <FilterGroup title="School" items={SCHOOLS.map(s => ({ label: s.label, value: s.value, count: counts.sc.get(s.value) ?? 0 }))} selected={schools} onToggle={v => { setSchools(toggle(schools, v)); setPage(1) }} />
              <FilterGroup title="Awarding Body" items={BODIES.map(b => ({ label: b.label, value: b.value, count: counts.bc.get(b.value) ?? 0 }))} selected={bodies} onToggle={v => { setBodies(toggle(bodies, v)); setPage(1) }} />
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink-soft)' }}>
                <b style={{ color: 'var(--ink)' }}>{filtered.length}</b> {filtered.length === 1 ? 'program' : 'programs'}
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} style={{ fontFamily: 'var(--font-body)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 12px', color: 'var(--ink)', cursor: 'pointer' }}>
                <option value="popularity">Most popular</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
              </select>
            </div>

            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
                No programs match your filters. Try clearing a few.
              </div>
            ) : (
              <div className="rg-2" style={{ gap: 16 }}>
                {items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="card-hover"
                    style={{ display: 'block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, textDecoration: 'none' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon kind={p.icon} size={18} color="var(--accent)" />
                      </div>
                      {p.tag && <Tag accent>{p.tag}</Tag>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 6 }}>{p.code} · {p.duration}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '0 0 10px', lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 16px' }}>{p.blurb}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>From {formatLKR(p.priceFrom)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-muted)' }}>Details <Icon kind="arrow" size={13} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <nav aria-label="Program results pages" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 40 }}>
                <button
                  type="button"
                  aria-label="Previous programs"
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={cur === 1}
                  style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid var(--border)', background: cur === 1 ? 'var(--surface)' : 'var(--accent)', color: cur === 1 ? 'var(--ink-muted)' : '#FFFFFF', cursor: cur === 1 ? 'not-allowed' : 'pointer', fontSize: 24, lineHeight: 1 }}
                >‹</button>
                <span style={{ minWidth: 88, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                  {cur} / {pageCount}
                </span>
                <button
                  type="button"
                  aria-label="Next programs"
                  onClick={() => { setPage(p => Math.min(pageCount, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={cur === pageCount}
                  style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid var(--border)', background: cur === pageCount ? 'var(--surface)' : 'var(--accent)', color: cur === pageCount ? 'var(--ink-muted)' : '#FFFFFF', cursor: cur === pageCount ? 'not-allowed' : 'pointer', fontSize: 24, lineHeight: 1 }}
                >›</button>
              </nav>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
