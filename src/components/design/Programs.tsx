'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '../layout/Navbar'
import { Footer } from '../layout/Footer'
import { Icon } from '../ui/Icon'
import { formatLKR, getProgramImage, type Program, type ProgrammeNode } from '../../data/programs'

const PAGE_SIZE = 6
const AWARDING_BODY_ORDER = ['ATHE', 'CPD', 'WINC', 'LSBF', 'Jain University']
const JAIN_PROGRAMMES = new Set(['BCOM', 'BBA', 'BCA', 'MBA', 'MCA'])
const programmeCode = (value: string) => value.toUpperCase().replace(/[^A-Z]/g, '')
const canonicalBody = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (normalized.includes('athe')) return 'ATHE'
  if (normalized.includes('cpd')) return 'CPD'
  if (normalized.includes('winc')) return 'WINC'
  if (normalized.includes('lsbf')) return 'LSBF'
  if (normalized.includes('jain')) return 'Jain University'
  return value.trim()
}
const bodyRank = (value: string) => {
  const index = AWARDING_BODY_ORDER.indexOf(canonicalBody(value))
  return index < 0 ? AWARDING_BODY_ORDER.length : index
}

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

export default function Programs({ programs, programmeNodes = [], initialQuery = '', initialBody = '', initialSchool = '', initialProgramme = '', initialLevel = '' }: { programs: Program[]; programmeNodes?: ProgrammeNode[]; initialQuery?: string; initialBody?: string; initialSchool?: string; initialProgramme?: string; initialLevel?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [programmes, setProgrammes] = useState<Set<string>>(new Set(initialLevel ? [initialLevel] : []))
  const [schools, setSchools] = useState<Set<string>>(new Set())
  const [bodies, setBodies] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<'popularity'|'price-asc'|'price-desc'>('popularity')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [guidedBody, setGuidedBody] = useState(canonicalBody(initialBody))
  const [guidedSchool, setGuidedSchool] = useState(initialSchool)
  const [programme, setProgramme] = useState(initialProgramme)
  const jainSelected = guidedBody === 'Jain University'

  const guidedBodies = useMemo(() => [...new Set(programs.map(p => canonicalBody(p.awardingBody)))].sort((a, b) => bodyRank(a) - bodyRank(b) || a.localeCompare(b)), [programs])
  const bodyCourses = useMemo(() => programs.filter(p => (!guidedBody || canonicalBody(p.awardingBody) === guidedBody) && (!jainSelected || JAIN_PROGRAMMES.has(programmeCode(p.programmeName ?? p.level)))), [programs, guidedBody, jainSelected])
  const guidedSchools = useMemo(() => [...new Set(bodyCourses.map(p => p.schoolName ?? p.school))].sort(), [bodyCourses])
  const schoolCourses = useMemo(() => bodyCourses.filter(p => jainSelected || !guidedSchool || (p.schoolName ?? p.school) === guidedSchool), [bodyCourses, guidedSchool, jainSelected])
  const programmeOptions = useMemo(() => [...new Set(schoolCourses.map(p => p.programmeName ?? p.level))].sort(), [schoolCourses])

  const counts = useMemo(() => {
    const lc = new Map<string, number>(); const sc = new Map<string, number>(); const bc = new Map<string, number>()
    for (const p of programs) {
      const programmeName = p.programmeName ?? p.level
      const schoolName = p.schoolName ?? p.school
      lc.set(programmeName, (lc.get(programmeName) ?? 0) + 1)
      sc.set(schoolName, (sc.get(schoolName) ?? 0) + 1)
      const body = canonicalBody(p.awardingBody)
      bc.set(body, (bc.get(body) ?? 0) + 1)
    }
    return { lc, sc, bc }
  }, [programs])
  const programmeFilters = useMemo(() => {
    return programmeNodes
      .map((node) => {
        const normalizedName = node.name.trim().toLowerCase()
        const count = programs.filter((program) =>
          program.programmeId === node.programme_id ||
          (program.programmeId == null && (program.programmeName ?? program.level).trim().toLowerCase() === normalizedName)
        ).length
        return { label: node.name, value: node.name, count }
      })
      .filter((item) => item.count > 0)
  }, [programs, programmeNodes])
  const schoolFilters = useMemo(() => {
    const visibleSchoolCounts = new Map<string, number>()
    for (const program of programs) {
      const school = program.schoolName ?? program.school
      if (canonicalBody(program.awardingBody) === 'Jain University' || canonicalBody(school) === 'Jain University') continue
      visibleSchoolCounts.set(school, (visibleSchoolCounts.get(school) ?? 0) + 1)
    }
    return [...visibleSchoolCounts].map(([label, count]) => ({ label, value: label, count })).sort((a, b) => a.label.localeCompare(b.label))
  }, [programs])
  const bodyFilters = useMemo(() => [...counts.bc].map(([label, count]) => ({ label, value: label, count })).sort((a, b) => bodyRank(a.value) - bodyRank(b.value) || a.label.localeCompare(b.label)), [counts])

  const filtered = useMemo(() => {
    let list = programs.filter(p => {
      if (programme && (p.programmeName ?? p.level) !== programme) return false
      if (jainSelected && !JAIN_PROGRAMMES.has(programmeCode(p.programmeName ?? p.level))) return false
      if (!jainSelected && guidedSchool && (p.schoolName ?? p.school) !== guidedSchool) return false
      if (guidedBody && canonicalBody(p.awardingBody) !== guidedBody) return false
      if (programmes.size && !programmes.has(p.programmeName ?? p.level)) return false
      if (schools.size && !schools.has(p.schoolName ?? p.school)) return false
      if (bodies.size && !bodies.has(canonicalBody(p.awardingBody))) return false
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false
      return true
    })
    list = [...list].sort((a, b) => sort === 'price-asc' ? a.priceFrom - b.priceFrom : sort === 'price-desc' ? b.priceFrom - a.priceFrom : b.popularity - a.popularity)
    return list
  }, [programs, programmes, schools, bodies, query, sort, programme, guidedSchool, guidedBody, jainSelected])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const cur = Math.min(page, pageCount)
  const items = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)
  const changePage = (nextPage: number) => {
    setPage(nextPage)
    window.requestAnimationFrame(() => document.getElementById('programme-catalogue-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div>
      <Navbar />
      <main className="page-load programs-page" style={{ paddingTop: 68 }}>
        {/* Header */}
        <div className="sx page-load-hero" style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 12 }}>HOME / PROGRAMS</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Find your program</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-soft)', margin: 0 }}>Foundation · HND · Top-Up Degree · Master's · Short Courses — all 100% online</p>
          </div>
        </div>

        <div id="programme-catalogue-top" className="sx programme-catalogue-top page-load-secondary" style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 0 0' }}>
          <div className="catalogue-pathway-selects">
            <select className="catalogue-select" aria-label="Awarding body" value={guidedBody} onChange={e => { setGuidedBody(e.target.value); setGuidedSchool(''); setProgramme(''); setPage(1) }}><option value="">Awarding body · All awarding bodies</option>{guidedBodies.map(value => <option key={value} value={value}>{value}</option>)}</select>
            {!jainSelected && <select className="catalogue-select" aria-label="School" value={guidedSchool} onChange={e => { setGuidedSchool(e.target.value); setProgramme(''); setPage(1) }} disabled={!guidedBody}><option value="">School · All schools</option>{guidedSchools.map(value => <option key={value} value={value}>{value}</option>)}</select>}
            <select className="catalogue-select" aria-label="Programme" value={programme} onChange={e => { setProgramme(e.target.value); setPage(1) }} disabled={!guidedBody || (!jainSelected && !guidedSchool)}><option value="">Programme · All programmes</option>{programmeOptions.map(value => <option key={value} value={value}>{value}</option>)}</select>
          </div>
        </div>

        <div className="sx rg-sidebar page-load-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0 80px', gap: 48 }}>
          {/* Sidebar */}
          <div>
            <button className="filter-toggle-btn" onClick={() => setShowFilters(f => !f)}>
              <span>⚙</span> {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            <div style={{ position: 'sticky', top: 88 }} className={showFilters ? undefined : 'sidebar-collapsed'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Filters</div>
                {(programmes.size || schools.size || bodies.size || query || guidedBody || guidedSchool || programme) ? (
                  <button onClick={() => { setProgrammes(new Set()); setSchools(new Set()); setBodies(new Set()); setGuidedBody(''); setGuidedSchool(''); setProgramme(''); setQuery(''); setPage(1) }} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--accent)', cursor: 'pointer' }}>
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
              <FilterGroup title="Awarding Body" items={bodyFilters} selected={bodies} onToggle={v => { setBodies(toggle(bodies, v)); setPage(1) }} />
              <FilterGroup title="School" items={schoolFilters} selected={schools} onToggle={v => { setSchools(toggle(schools, v)); setPage(1) }} />
              {programmeFilters.length > 0 && <FilterGroup title="Programme" items={programmeFilters} selected={programmes} onToggle={v => { setProgrammes(toggle(programmes, v)); setPage(1) }} />}
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
              <div className="rg-2 programme-card-grid">
                {items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="programme-image-card card-hover"
                  >
                    <div className="programme-card-cover">
                      <img
                        src={p.imageUrl || getProgramImage(p.imageLabel)}
                        alt={`${p.title} course cover`}
                        loading="lazy"
                        onError={(event) => { event.currentTarget.src = getProgramImage(p.imageLabel) }}
                      />
                    </div>
                    <div className="programme-card-content">
                      <div className="programme-card-meta" style={{ justifyContent: 'flex-end' }}>
                        <small>{p.duration}</small>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.blurb}</p>
                      <div className="programme-card-footer">
                        <strong>From {formatLKR(p.priceFrom)}</strong>
                        <span className="programme-read-more">Read more <Icon kind="arrow" size={14} /></span>
                      </div>
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
                  onClick={() => changePage(Math.max(1, cur - 1))}
                  disabled={cur === 1}
                  style={{ width: 42, height: 42, borderRadius: 8, border: '1px solid var(--border)', background: cur === 1 ? 'var(--surface)' : 'var(--accent)', color: cur === 1 ? 'var(--ink-muted)' : '#FFFFFF', cursor: cur === 1 ? 'not-allowed' : 'pointer', fontSize: 24, lineHeight: 1 }}
                >‹</button>
                <span style={{ minWidth: 88, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                  {cur} / {pageCount}
                </span>
                <button
                  type="button"
                  aria-label="Next programs"
                  onClick={() => changePage(Math.min(pageCount, cur + 1))}
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
