"use client";

// Programs listing — "A · Filter + results", ported from
// design-reference/inner-pages.jsx (const ProgramsA). The sidebar filters,
// search, sort and pagination are real client-side state now (the original
// checkboxes/sort/pagination were static markup with no behavior behind them).
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SK } from "@/components/sketch/tokens";
import { SkIcon, SkTag, Scribble } from "@/components/sketch/primitives";
import { PROGRAMS, formatLKR, type Program } from "@/data/programs";

const LEVELS = ["Foundation", "HND", "Higher Diploma", "Diploma", "Top-Up Degree", "Postgraduate", "Short Course"] as const;
const SCHOOLS: { label: string; value: Program["school"] }[] = [
  { label: "School of Computing", value: "Computing" },
  { label: "School of Business", value: "Business" },
  { label: "CPD / Short Courses", value: "CPD" },
];
const BODIES: { label: string; value: Program["awardingBody"] }[] = [
  { label: "ATHE (UK)", value: "ATHE" },
  { label: "WINC — UoB (UK)", value: "WINC" },
  { label: "LSBF (UK)", value: "LSBF" },
  { label: "Jain University", value: "Jain" },
];
const MODES = ["100% Online", "Live online classes", "Self-paced LMS"] as const;

// All programs are online; only Short Courses skip live classes. Derived
// rather than stored on every Program record, since it's implied by level.
function getProgramModes(p: Program): string[] {
  return p.level === "Short Course" ? ["100% Online", "Self-paced LMS"] : ["100% Online", "Live online classes", "Self-paced LMS"];
}

const PAGE_SIZE = 6;

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: { label: string; value: string; count: number }[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{title}</div>
      {items.map((it) => {
        const active = selected.has(it.value);
        return (
          <label key={it.value} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={active}
              onChange={() => onToggle(it.value)}
              style={{ position: "absolute", opacity: 0, width: 14, height: 14 }}
            />
            <div style={{ width: 14, height: 14, border: `1.3px solid ${SK.ink}`, borderRadius: 2, background: active ? SK.accent : "transparent", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--sk-hand)", fontSize: 14 }}>{it.label} ({it.count})</span>
          </label>
        );
      })}
    </div>
  );
}

export function ProgramsA({ programs, initialQuery = "", initialLevel = "", initialBody = "" }: { programs: Program[]; initialQuery?: string; initialLevel?: string; initialBody?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [levels, setLevels] = useState<Set<string>>(new Set(initialLevel ? [initialLevel] : []));
  const [schools, setSchools] = useState<Set<string>>(new Set());
  const [bodies, setBodies] = useState<Set<string>>(new Set(initialBody ? [initialBody] : []));
  const [modes, setModes] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<"popularity" | "price-asc" | "price-desc">("popularity");
  const [page, setPage] = useState(1);

  const syncUrl = (next: { q?: string; level?: string; body?: string }) => {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.level) params.set("level", next.level);
    if (next.body) params.set("body", next.body);
    const qs = params.toString();
    router.replace(qs ? `/programs?${qs}` : "/programs", { scroll: false });
  };

  const levelCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of programs) counts.set(p.level, (counts.get(p.level) ?? 0) + 1);
    return counts;
  }, [programs]);
  const schoolCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of programs) counts.set(p.school, (counts.get(p.school) ?? 0) + 1);
    return counts;
  }, [programs]);
  const bodyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of programs) counts.set(p.awardingBody, (counts.get(p.awardingBody) ?? 0) + 1);
    return counts;
  }, [programs]);
  const modeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of programs) for (const m of getProgramModes(p)) counts.set(m, (counts.get(m) ?? 0) + 1);
    return counts;
  }, [programs]);

  const filtered = useMemo(() => {
    let list = programs.filter((p) => {
      if (levels.size && !levels.has(p.level)) return false;
      if (schools.size && !schools.has(p.school)) return false;
      if (bodies.size && !bodies.has(p.awardingBody)) return false;
      if (modes.size && !getProgramModes(p).some((m) => modes.has(m))) return false;
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      return b.popularity - a.popularity;
    });
    return list;
  }, [programs, levels, schools, bodies, modes, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const summary =
    levels.size === 1
      ? `Showing ${[...levels][0]} pathways`
      : levels.size > 1
        ? `Showing ${levels.size} levels`
        : "Showing all programs";

  return (
    <div style={{ padding: "20px 48px 48px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 36 }}>
      {/* Sidebar filters */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Filters</div>
          {(levels.size || schools.size || bodies.size || modes.size || query) ? (
            <button
              type="button"
              onClick={() => {
                setLevels(new Set());
                setSchools(new Set());
                setBodies(new Set());
                setModes(new Set());
                setQuery("");
                setPage(1);
                syncUrl({});
              }}
              style={{ fontFamily: "var(--sk-hand)", fontSize: 12, color: SK.accent, background: "none", border: "none", padding: 0 }}
            >
              Clear all
            </button>
          ) : null}
        </div>

        <div style={{ marginTop: 18 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
              syncUrl({ q: e.target.value, level: [...levels][0], body: [...bodies][0] });
            }}
            placeholder="Search programs…"
            style={{ width: "100%", padding: "8px 10px", border: `1.3px solid ${SK.ink}`, borderRadius: 4, fontFamily: "var(--sk-hand)", fontSize: 14, background: "#fff" }}
          />
        </div>

        <FilterGroup
          title="Level"
          items={LEVELS.map((l) => ({ label: l, value: l, count: levelCounts.get(l) ?? 0 }))}
          selected={levels}
          onToggle={(v) => {
            const next = toggle(levels, v);
            setLevels(next);
            setPage(1);
            syncUrl({ q: query, level: [...next][0], body: [...bodies][0] });
          }}
        />
        <FilterGroup
          title="School"
          items={SCHOOLS.map((s) => ({ label: s.label, value: s.value, count: schoolCounts.get(s.value) ?? 0 }))}
          selected={schools}
          onToggle={(v) => {
            setSchools(toggle(schools, v));
            setPage(1);
          }}
        />
        <FilterGroup
          title="Awarding Body"
          items={BODIES.map((b) => ({ label: b.label, value: b.value, count: bodyCounts.get(b.value) ?? 0 }))}
          selected={bodies}
          onToggle={(v) => {
            const next = toggle(bodies, v);
            setBodies(next);
            setPage(1);
            syncUrl({ q: query, level: [...levels][0], body: [...next][0] });
          }}
        />
        <FilterGroup
          title="Mode"
          items={MODES.map((m) => ({ label: m, value: m, count: modeCounts.get(m) ?? 0 }))}
          selected={modes}
          onToggle={(v) => {
            setModes(toggle(modes, v));
            setPage(1);
          }}
        />
      </div>

      {/* Results */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `1.3px solid ${SK.ink}` }}>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16 }}>
            {summary} · <b>{filtered.length}</b> {filtered.length === 1 ? "result" : "results"}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            style={{ fontFamily: "var(--sk-hand)", fontSize: 13, border: `1.3px solid ${SK.ink}`, borderRadius: 4, padding: "4px 8px", background: "#fff" }}
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price-asc">Sort: Price (low to high)</option>
            <option value="price-desc">Sort: Price (high to low)</option>
          </select>
        </div>

        {pageItems.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft }}>
            No programs match your filters yet — try clearing a few.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {pageItems.map((p) => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                style={{ display: "block", border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, position: "relative", background: "#fff" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <SkIcon kind={p.icon} size={26} />
                  {p.tag && <SkTag accent>{p.tag}</SkTag>}
                </div>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, color: SK.inkSoft, marginTop: 14 }}>{p.code} · {p.duration}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 20, fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>{p.title}</div>
                <Scribble lines={2} color={SK.inkSoft} style={{ marginTop: 10 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${SK.inkSoft}` }}>
                  <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13 }}>From <b>{formatLKR(p.priceFrom)}</b></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--sk-hand)", fontSize: 13 }}>Details <SkIcon kind="arrow" size={14} /></div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28, fontFamily: "var(--sk-hand)", fontSize: 14 }}>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1.3px solid ${SK.ink}`, borderRadius: 4, background: "transparent", opacity: currentPage === 1 ? 0.4 : 1 }}
            >
              ‹
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1.3px solid ${SK.ink}`, borderRadius: 4, background: n === currentPage ? SK.ink : "transparent", color: n === currentPage ? "#fff" : SK.ink }}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1.3px solid ${SK.ink}`, borderRadius: 4, background: "transparent", opacity: currentPage === pageCount ? 0.4 : 1 }}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
