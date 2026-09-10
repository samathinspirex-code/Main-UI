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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const catalogueAvailable = programs.some(item => (item.courseId ?? 0) > 0 && (item.schoolId ?? 0) > 0 && (item.programmeId ?? 0) > 0);

  const schools = useMemo(() => [...new Map(programs.map(item => [String(item.schoolId ?? item.school), item.schoolName ?? item.school])).entries()], [programs]);
  const schoolCourses = useMemo(() => programs.filter(item => String(item.schoolId ?? item.school) === schoolId), [programs, schoolId]);
  const availableProgrammes = useMemo(() => {
    const ids = new Set(schoolCourses.map(item => item.programmeId));
    return programmes.filter(item => ids.has(item.programme_id));
  }, [programmes, schoolCourses]);
  const programmeCourses = useMemo(() => schoolCourses.filter(item => String(item.programmeId ?? "") === programmeId), [schoolCourses, programmeId]);
  const levels = useMemo(() => [...new Map(programmeCourses.filter(item => item.levelId).map(item => [String(item.levelId), item.levelName])).entries()], [programmeCourses]);
  const courses = useMemo(() => programmeCourses.filter(item => !levelId || String(item.levelId) === levelId), [programmeCourses, levelId]);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/programme-enrolments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...details, programme_id: Number(programmeId), preferred_level_id: levelId ? Number(levelId) : null,
        preferred_school_id: schoolId && /^\d+$/.test(schoolId) ? Number(schoolId) : null,
        preferred_course_id: courseId ? Number(courseId) : null, preferred_study_mode: null,
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
      <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.65, maxWidth: 720 }}>Start with the school and broad programme you are interested in. Level, course and study mode can still be decided with your counsellor.</p>
      {!catalogueAvailable && <p role="alert" style={{ marginTop: 24, padding: 18, border: "1px solid #e9b8be", borderRadius: 10, color: "#a52d3d" }}>Online enrolment is temporarily unavailable while the academic catalogue reconnects. No incomplete application will be submitted.</p>}
      {complete ? <div style={{ marginTop: 40, padding: 32, border: "1px solid var(--border-accent)", borderRadius: 14, background: "var(--accent-dim)" }}><h2>Enrolment received</h2><p>Your student profile is ready. Check your email for account access; a counsellor will contact you to confirm the pathway.</p><Button href="/">Back to home</Button></div> :
      <form onSubmit={submit} style={{ marginTop: 38, padding: 34, border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)", display: "grid", gap: 22 }}>
        <div className="rg-2" style={{ gap: 18 }}>
          <div><label style={label}>FULL NAME</label><input required style={field} value={details.full_name} onChange={e => setDetails({ ...details, full_name: e.target.value })} /></div>
          <div><label style={label}>EMAIL</label><input required type="email" style={field} value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /></div>
        </div>
        <div><label style={label}>PHONE</label><input required style={field} value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} /></div>
        <div><label style={label}>SCHOOL *</label><select required style={field} value={schoolId} onChange={e => { setSchoolId(e.target.value); setProgrammeId(""); setLevelId(""); setCourseId(""); }}><option value="">Choose a school</option>{schools.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></div>
        {schoolId && <div><label style={label}>PROGRAMME *</label><select required style={field} value={programmeId} onChange={e => { setProgrammeId(e.target.value); setLevelId(""); setCourseId(""); }}><option value="">Choose Foundation, HND, Postgraduate…</option>{availableProgrammes.map(item => <option key={item.programme_id} value={item.programme_id}>{item.name}</option>)}</select></div>}
        {programmeId && levels.length > 0 && <div><label style={label}>ACADEMIC LEVEL — OPTIONAL</label><select style={field} value={levelId} onChange={e => { setLevelId(e.target.value); setCourseId(""); }}><option value="">Decide with a counsellor</option>{levels.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></div>}
        {programmeId && <div><label style={label}>COURSE — OPTIONAL</label><select style={field} value={courseId} onChange={e => setCourseId(e.target.value)}><option value="">Decide with a counsellor</option>{courses.map(item => <option key={item.slug} value={item.courseId}>{item.title}</option>)}</select></div>}
        {error && <p role="alert" style={{ color: "#c83b4d", margin: 0 }}>{error}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end" }}><Button variant="primary" disabled={busy || !schoolId || !programmeId || !catalogueAvailable}>{busy ? "Submitting…" : "Submit for counselling →"}</Button></div>
      </form>}
    </section>
  </main><Footer /></div>;
}
