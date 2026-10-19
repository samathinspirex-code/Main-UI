// Program detail — "A · Tabs + structured", ported from
// design-reference/inner-pages.jsx (const DetailA), parametrized to work for
// any program instead of being hardcoded to "HND Computing & AI", and with
// the tabs actually switching content (see ProgramTabs).
import { SK } from "@/components/sketch/tokens";
import { Heading, SkTag, SkBtn, SkImage, SkLine, SkIcon } from "@/components/sketch/primitives";
import { Footer } from "@/components/layout/Footer";
import { TopNav } from "@/components/layout/TopNav";
import { PROGRAMS, formatLKR, type Program } from "@/data/programs";
import { ProgramTabs, type ProgramTab } from "./ProgramTabs";


const ENTRY_BY_LEVEL: Record<Program["level"], string> = {
  Foundation: "O/L or equivalent",
  HND: "A/L or Foundation",
  "Higher Diploma": "A/L or equivalent",
  Diploma: "A/L or equivalent",
  "Top-Up Degree": "HND or equivalent Diploma",
  Postgraduate: "Bachelor's degree or equivalent",
  "Short Course": "Open enrollment, no prerequisites",
};

const PROGRESSION_BY_LEVEL: Record<Program["level"], string> = {
  Foundation: "Progress to HND",
  HND: "Top-Up to UK Degree",
  "Higher Diploma": "Progress to Top-Up Degree",
  Diploma: "Progress to Top-Up Degree",
  "Top-Up Degree": "Progress to Master's / MBA",
  Postgraduate: "Career progression",
  "Short Course": "Stackable toward a Diploma or HND",
};

const CURRICULUM_BY_SCHOOL: Record<Program["school"], { stage1: string[]; stage2: string[] }> = {
  Computing: {
    stage1: ["Computer Systems", "Programming Fundamentals", "Mathematics for Computing", "Web Technologies"],
    stage2: ["Applied Specialism", "Cloud & Data", "Systems Design", "Capstone Project"],
  },
  Business: {
    stage1: ["Principles of Management", "Business Communication", "Introduction to Finance", "Marketing Fundamentals"],
    stage2: ["Strategic Management", "Applied Business Project", "Operations & Analytics", "Capstone Project"],
  },
  CPD: {
    stage1: ["Foundations", "Core Techniques", "Hands-on Practice", "Portfolio Project"],
    stage2: [],
  },
};

const CAREERS_BY_SCHOOL: Record<Program["school"], string[]> = {
  Computing: ["Software Developer", "Data Analyst", "Systems Administrator", "Cyber Security Analyst"],
  Business: ["Business Analyst", "Marketing Executive", "Operations Manager", "Finance Associate"],
  CPD: ["Freelance Consultant", "Marketing Assistant", "Junior Analyst", "Career switcher / upskiller"],
};

const TEACHERS = [
  { name: "Prof. I. Wijesinghe", tag: "ML" },
  { name: "Dr. N. Fernando", tag: "SYSTEMS" },
  { name: "Prof. A. Jayasuriya", tag: "STATS" },
  { name: "Dr. M. Perera", tag: "ETHICS" },
];

function OverviewTab({ program }: { program: Program }) {
  return (
    <div style={{ padding: "40px 48px 48px" }}>
      <Heading size={34}>Overview</Heading>
      <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, color: SK.inkSoft, marginTop: 10, maxWidth: 720, lineHeight: 1.6 }}>{program.blurb}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
        <SkTag accent>{program.awardingBody}-validated</SkTag>
        <SkTag>100% online</SkTag>
        <SkTag>{program.duration}</SkTag>
      </div>
    </div>
  );
}

function CurriculumTab({ program }: { program: Program }) {
  const topics = [...(program.topics || [])].sort((a, b) => a.order - b.order);
  return (
    <div style={{ padding: "40px 48px 48px" }}>
      <Heading size={34}>Curriculum</Heading>
      <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft, marginTop: 8, maxWidth: 720 }}>
        A focused, practical course outline. {PROGRESSION_BY_LEVEL[program.level]} on completion.
      </div>

      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 28, fontWeight: 800 }}>Course outline</div>
          <div style={{ flex: 1 }}><SkLine color={SK.inkSoft} /></div>
        </div>
        {topics.length === 0 ? (
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft }}>No topics specified yet.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {topics.map((t, i) => (
              <div key={t.topic_id} style={{ border: `1.3px solid ${SK.ink}`, borderRadius: 4, padding: 14 }}>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, color: SK.accent }}>{program.code} · Topic {i + 1}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>{t.topic}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 12, color: SK.inkSoft, marginTop: 6 }}>Live online · LMS</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FacultyTab() {
  return (
    <div style={{ padding: "40px 48px 48px" }}>
      <Heading size={28} style={{ marginBottom: 20 }}>Your teachers</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {TEACHERS.map((t) => (
          <div key={t.name} style={{ textAlign: "center" }}>
            <SkImage h={160} label="portrait" />
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, fontWeight: 700, marginTop: 10 }}>{t.name}</div>
            <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, color: SK.inkSoft, marginTop: 2 }}>{t.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareersTab({ program }: { program: Program }) {
  const outcomes = [...(program.outcomes || [])].sort((a, b) => a.order - b.order);
  return (
    <div style={{ padding: "40px 48px 48px" }}>
      <Heading size={28} style={{ marginBottom: 12 }}>Where graduates go</Heading>
      <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft, maxWidth: 640, lineHeight: 1.6 }}>
        Graduates of this program move into roles across {program.school === "CPD" ? "a range of teams" : `the ${program.school.toLowerCase()} sector`}, backed by an {program.awardingBody}-validated qualification employers recognise.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 22 }}>
        {outcomes.length === 0 ? (
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft }}>No specific career outcomes listed yet.</div>
        ) : (
          outcomes.map((o) => (
            <div key={o.outcome_id} style={{ border: `1.3px solid ${SK.ink}`, borderRadius: 4, padding: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <SkIcon kind="star" size={18} />
              <span style={{ fontFamily: "var(--sk-hand)", fontSize: 14 }}>{o.outcome}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FeesTab({ program }: { program: Program }) {
  return (
    <div style={{ padding: "40px 48px 48px" }}>
      <Heading size={28} style={{ marginBottom: 12 }}>Fees & aid</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
        <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24 }}>
          <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, color: SK.inkSoft, letterSpacing: 1 }}>TUITION</div>
          <Heading size={30} style={{ marginTop: 6 }}>From <span style={{ color: SK.accent }}>{formatLKR(program.priceFrom)}</span></Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 8 }}>
            {program.tag ? `${program.tag} — regular fee applies after the offer ends.` : "Flexible payment plans available."}
          </div>
        </div>
        <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24, background: SK.ink, color: SK.paper }}>
          <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>PAYMENT</div>
          <Heading size={30} style={{ color: SK.paper, marginTop: 6 }}>Affordable <span style={{ color: SK.accentSoft }}>plans</span></Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, opacity: 0.8, marginTop: 8 }}>Flexible payment plans that fit your budget — study from anywhere in the world.</div>
        </div>
      </div>
    </div>
  );
}

function ApplyTab({ program }: { program: Program }) {
  return (
    <div style={{ padding: "40px 48px 48px", textAlign: "center" }}>
      <Heading size={30}>Ready to apply?</Heading>
      <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, color: SK.inkSoft, marginTop: 8, maxWidth: 520, marginInline: "auto" }}>
        Reserve your seat in {program.title} — takes about twenty minutes, save and return any time.
      </div>
      <div style={{ marginTop: 22 }}>
        <SkBtn primary arrow href={`/admissions?program=${program.slug}`}>Reserve your seat</SkBtn>
      </div>
    </div>
  );
}

export function ProgramDetailA({ program }: { program: Program }) {
  const related = PROGRAMS.filter((p) => p.school === program.school && p.slug !== program.slug).slice(0, 3);

  const tabs: ProgramTab[] = [
    { id: "overview", label: "Overview", content: <OverviewTab program={program} /> },
    { id: "curriculum", label: "Curriculum", content: <CurriculumTab program={program} /> },
    { id: "faculty", label: "Faculty", content: <FacultyTab /> },
    { id: "careers", label: "Careers", content: <CareersTab program={program} /> },
    { id: "fees", label: "Fees & Aid", content: <FeesTab program={program} /> },
    { id: "apply", label: "Apply", content: <ApplyTab program={program} /> },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: SK.paper, color: SK.ink }}>
      <TopNav variant="classic" />
      <div style={{ padding: "28px 48px 24px" }}>
        <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 2, color: SK.inkSoft }}>
          HOME / PROGRAMS / {program.school.toUpperCase()} / {program.title.toUpperCase()}
        </div>
      </div>

      {/* Hero row */}
      <div style={{ padding: "0 48px 36px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32 }}>
        <div>
          <SkTag accent>{program.tag ? program.tag.toUpperCase() : `${program.awardingBody}-VALIDATED`}</SkTag>
          <Heading size={56} style={{ marginTop: 12 }}>{program.title}</Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 18, color: SK.inkSoft, marginTop: 10, lineHeight: 1.5 }}>{program.blurb}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24, padding: "18px 0", borderTop: `1.3px solid ${SK.ink}`, borderBottom: `1.3px solid ${SK.ink}` }}>
            {[
              [program.code, "Awarding"],
              [program.duration, "Duration"],
              ["100% Online", "Mode"],
              [formatLKR(program.priceFrom), program.tag ? "First 50" : "From"],
            ].map(([v, l], i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, letterSpacing: 1, color: SK.inkSoft }}>{l.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 18, fontWeight: 700, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <SkBtn primary arrow href={`/admissions?program=${program.slug}`}>Reserve your seat</SkBtn>
            <SkBtn href="/contact">Download brochure</SkBtn>
            <SkBtn href="/contact">Talk to an advisor</SkBtn>
          </div>
        </div>
        <div>
          <SkImage label={program.imageLabel} style={{ aspectRatio: "768 / 397", height: "auto" }} />
          <div style={{ marginTop: 16, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 16, background: "#fff" }}>
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>At a glance</div>
            {[
              ["Awarding body", program.awardingBody === "Jain" ? "Jain University" : `${program.awardingBody}, UK · Ofqual reg.`],
              ["Entry", ENTRY_BY_LEVEL[program.level]],
              ["Format", "Live online + LMS"],
              ["Progression", PROGRESSION_BY_LEVEL[program.level]],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 3 ? `1px dashed ${SK.inkSoft}` : "none", fontFamily: "var(--sk-hand)", fontSize: 13 }}>
                <span style={{ color: SK.inkSoft }}>{k}</span><b>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProgramTabs tabs={tabs} />

      {/* Apply CTA */}
      <div style={{ margin: "48px 48px 48px", background: SK.ink, color: SK.paper, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Heading size={30} style={{ color: SK.paper }}>Ready to start?</Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, opacity: 0.8, marginTop: 6 }}>
            {program.tag ? `${program.tag} · ` : ""}talk to an advisor on +94 71 199 3331
          </div>
        </div>
        <SkBtn primary arrow href={`/admissions?program=${program.slug}`}>Reserve your seat</SkBtn>
      </div>

      {related.length > 0 && (
        <div style={{ padding: "0 48px 48px" }}>
          <Heading size={26} style={{ marginBottom: 18 }}>Related programs</Heading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {related.map((p) => (
              <SkBtn key={p.slug} href={`/programs/${p.slug}`} style={{ width: "100%" }} fullWidth>
                {p.title}
              </SkBtn>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
