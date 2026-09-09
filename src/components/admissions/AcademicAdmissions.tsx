"use client";

import { useMemo, useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import type { Program, ProgrammeNode } from "../../data/programs";

type Props = { programs: Program[]; programmes: ProgrammeNode[]; initialProgramSlug?: string };

const field = { width: "100%", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--bg-soft)", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15 };
const label = { display: "block", marginBottom: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-muted)" };

export default function AcademicAdmissions({ programs, programmes, initialProgramSlug = "" }: Props) {
  const initialCourse = programs.find(item => item.slug === initialProgramSlug);
  const initialProgramme = programmes.find(item => item.programme_id === initialCourse?.programmeId);
  const [details, setDetails] = useState({ full_name: "", email: "", phone: "" });
  const [programmeId, setProgrammeId] = useState(String(initialProgramme?.programme_id ?? ""));
  const [levelId, setLevelId] = useState(String(initialCourse?.levelId ?? ""));
  const [schoolId, setSchoolId] = useState(String(initialCourse?.schoolId ?? ""));
  const [courseId, setCourseId] = useState(String(initialCourse?.courseId ?? ""));
  const [studyMode, setStudyMode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const catalogueAvailable = programmes.some(item => item.programme_id > 0);

  const programmeCourses = useMemo(() => programs.filter(item => String(item.programmeId ?? "") === programmeId || (!item.programmeId && item.level === programmes.find(p => String(p.programme_id) === programmeId)?.name)), [programs, programmes, programmeId]);
  const levels = useMemo(() => [...new Map(programmeCourses.filter(item => item.levelId).map(item => [String(item.levelId), item.levelName])).entries()], [programmeCourses]);
  const schools = useMemo(() => [...new Map(programmeCourses.filter(item => !levelId || String(item.levelId) === levelId).map(item => [String(item.schoolId ?? item.school), item.schoolName ?? item.school])).entries()], [programmeCourses, levelId]);
  const courses = useMemo(() => programmeCourses.filter(item => (!levelId || String(item.levelId) === levelId) && (!schoolId || String(item.schoolId ?? item.school) === schoolId)), [programmeCourses, levelId, schoolId]);
  const selectedCourse = courses.find(item => String(item.courseId) === courseId);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/programme-enrolments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...details, programme_id: Number(programmeId), preferred_level_id: levelId ? Number(levelId) : null,
        preferred_school_id: schoolId && /^\d+$/.test(schoolId) ? Number(schoolId) : null,
        preferred_course_id: courseId ? Number(courseId) : null, preferred_study_mode: studyMode || null,
      }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message || payload?.detail || "Unable to submit your enrolment.");
      setComplete(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to submit your enrolment."); }
    finally { setBusy(false); }
  }

  return <div><Navbar /><main style={{ paddingTop: 68, minHeight: "75vh" }}>
    <section className="sx" style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 0 90px" }}>
      <Tag accent>PROGRAMME ENROLMENT</Tag>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,6vw,64px)", margin: "18px 0 10px" }}>Start broad. Choose your pathway with us.</h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.65, maxWidth: 720 }}>Select only the programme you are interested in. Level, school, course and study mode are optional—your counsellor can help you decide them later.</p>
      {!catalogueAvailable && <p role="alert" style={{ marginTop: 24, padding: 18, border: "1px solid #e9b8be", borderRadius: 10, color: "#a52d3d" }}>Online enrolment is temporarily unavailable while the academic catalogue reconnects. No incomplete application will be submitted.</p>}
      {complete ? <div style={{ marginTop: 40, padding: 32, border: "1px solid var(--border-accent)", borderRadius: 14, background: "var(--accent-dim)" }}><h2>Enrolment received</h2><p>Your student profile is ready. Check your email for account access; a counsellor will contact you to confirm the pathway.</p><Button href="/">Back to home</Button></div> :
      <form onSubmit={submit} style={{ marginTop: 38, padding: 34, border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)", display: "grid", gap: 22 }}>
        <div className="rg-2" style={{ gap: 18 }}>
          <div><label style={label}>FULL NAME</label><input required style={field} value={details.full_name} onChange={e => setDetails({ ...details, full_name: e.target.value })} /></div>
          <div><label style={label}>EMAIL</label><input required type="email" style={field} value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /></div>
        </div>
        <div><label style={label}>PHONE</label><input required style={field} value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} /></div>
        <div><label style={label}>PROGRAMME *</label><select required style={field} value={programmeId} onChange={e => { setProgrammeId(e.target.value); setLevelId(""); setSchoolId(""); setCourseId(""); setStudyMode(""); }}><option value="">Choose Foundation, HND, Postgraduate…</option>{programmes.map(item => <option key={item.programme_id} value={item.programme_id}>{item.name}</option>)}</select></div>
        {programmeId && levels.length > 0 && <div><label style={label}>ACADEMIC LEVEL — OPTIONAL</label><select style={field} value={levelId} onChange={e => { setLevelId(e.target.value); setSchoolId(""); setCourseId(""); }}><option value="">Decide with a counsellor</option>{levels.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></div>}
        {programmeId && <div><label style={label}>SCHOOL — OPTIONAL</label><select style={field} value={schoolId} onChange={e => { setSchoolId(e.target.value); setCourseId(""); }}><option value="">Decide with a counsellor</option>{schools.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></div>}
        {programmeId && <div><label style={label}>COURSE — OPTIONAL</label><select style={field} value={courseId} onChange={e => { setCourseId(e.target.value); setStudyMode(""); }}><option value="">Decide with a counsellor</option>{courses.map(item => <option key={item.slug} value={item.courseId}>{item.title}</option>)}</select></div>}
        {selectedCourse && <div><label style={label}>STUDY MODE — OPTIONAL</label><select style={field} value={studyMode} onChange={e => setStudyMode(e.target.value)}><option value="">Decide with a counsellor</option>{selectedCourse.studyOptions?.map(option => <option key={option.study_mode} value={option.study_mode}>{option.study_mode === "full_time" ? "Full-time" : "Part-time"} · {option.duration}</option>)}</select></div>}
        {error && <p role="alert" style={{ color: "#c83b4d", margin: 0 }}>{error}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end" }}><Button variant="primary" disabled={busy || !programmeId || !catalogueAvailable}>{busy ? "Submitting…" : "Submit for counselling →"}</Button></div>
      </form>}
    </section>
  </main><Footer /></div>;
}
