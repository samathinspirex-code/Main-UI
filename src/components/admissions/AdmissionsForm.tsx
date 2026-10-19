"use client";

// Admissions — "A · Form + stepper", ported from
// design-reference/inner-pages.jsx (const AdmitA). The original stepper was
// static markup permanently frozen on "Step 2, current" — this makes it a
// real 4-step flow with client-side state (no backend yet; the user will
// wire this to a CMS/API later, so submission just ends in a dummy
// confirmation screen instead of a network call).
import { useMemo, useState } from "react";
import { SK } from "@/components/sketch/tokens";
import { Heading, SkBtn, SkIcon } from "@/components/sketch/primitives";
import { formatLKR, type Program, type School } from "@/data/programs";

const STEPS = [
  { n: "01", t: "Your details", s: "Name, email & phone" },
  { n: "02", t: "Pick your program", s: "Choose Foundation / HND / Top-Up" },
  { n: "03", t: "Upload results", s: "O/L, A/L or other qualifications" },
  { n: "04", t: "Reserve & pay", s: "Secure your seat" },
];

const STREAMS: { label: string; value: School }[] = [
  { label: "Computing", value: "Computing" },
  { label: "Business", value: "Business" },
  { label: "CPD / Short Courses", value: "CPD" },
];

const QUALIFICATIONS = ["After O/L", "After A/L", "Diploma / Bachelor's"];

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: `1.3px solid ${SK.ink}`,
  borderRadius: 4,
  fontFamily: "var(--sk-hand)",
  fontSize: 15,
  background: "#fff",
};
const labelStyle = { fontFamily: "var(--sk-hand)", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "block" as const };

export function AdmissionsForm({ programs, initialProgramSlug = "" }: { programs: Program[]; initialProgramSlug?: string }) {
  const initialProgram = programs.find((p) => p.slug === initialProgramSlug);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [stream, setStream] = useState<School>(initialProgram?.school ?? "Computing");
  const [qualification, setQualification] = useState(QUALIFICATIONS[1]);
  const [programSlug, setProgramSlug] = useState(initialProgram?.slug ?? "");

  const [fileName, setFileName] = useState<string | null>(null);

  const streamPrograms = useMemo(() => programs.filter((p) => p.school === stream), [programs, stream]);
  const selectedProgram = programs.find((p) => p.slug === programSlug);

  const step1Valid = name.trim() && email.trim() && phone.trim();
  const step2Valid = Boolean(selectedProgram);

  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const stepStatus = (n: number): "done" | "current" | "pending" => (n < step ? "done" : n === step ? "current" : "pending");

  if (submitted) {
    return (
      <div style={{ padding: "80px 48px", textAlign: "center" }}>
        <SkIcon kind="check" size={48} color={SK.accent} />
        <Heading size={36} style={{ marginTop: 16 }}>You&rsquo;re on the list!</Heading>
        <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, color: SK.inkSoft, marginTop: 10, maxWidth: 480, marginInline: "auto" }}>
          Thanks {name.split(" ")[0] || "there"} — an advisor will reach out to {email || "your email"} within one business day to confirm your seat
          {selectedProgram ? ` in ${selectedProgram.title}` : ""}.
        </div>
        <div style={{ marginTop: 24 }}>
          <SkBtn href="/">Back to home</SkBtn>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Stepper */}
      <div style={{ padding: "32px 48px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
          {STEPS.map((s, i) => {
            const st = stepStatus(i + 1);
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => (st === "done" ? setStep(i + 1) : undefined)}
                style={{ position: "relative", padding: "0 12px", textAlign: "center", background: "none", border: "none", cursor: st === "done" ? "pointer" : "default" }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    margin: "0 auto 12px",
                    borderRadius: "50%",
                    border: `2px solid ${SK.ink}`,
                    background: st === "done" ? SK.ink : st === "current" ? SK.accent : SK.paper,
                    color: st === "done" || st === "current" ? "#fff" : SK.ink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--sk-hand)",
                    fontWeight: 800,
                    fontSize: 18,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {st === "done" ? <SkIcon kind="check" size={22} color="#fff" /> : s.n}
                </div>
                {i < 3 && <div style={{ position: "absolute", top: 24, left: "75%", width: "50%", height: 2, background: st === "done" ? SK.ink : SK.inkSoft, zIndex: 1 }} />}
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 12, color: SK.inkSoft, marginTop: 2 }}>{s.s}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form area */}
      <div style={{ padding: "36px 48px 48px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 36 }}>
        <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 28, background: "#fff" }}>
          {step === 1 && (
            <>
              <Heading size={26}>Step 1 · Your details</Heading>
              <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 6 }}>Tell us who you are so an advisor can reach you.</div>
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 7X XXX XXXX" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Heading size={26}>Step 2 · Pick your program</Heading>
              <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 6 }}>Choose your stream and the program you&rsquo;re interested in.</div>
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Stream</label>
                  <select
                    style={inputStyle}
                    value={stream}
                    onChange={(e) => {
                      const next = e.target.value as School;
                      setStream(next);
                      setProgramSlug("");
                    }}
                  >
                    {STREAMS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Highest qualification</label>
                  <select style={inputStyle} value={qualification} onChange={(e) => setQualification(e.target.value)}>
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Program</label>
                  <select style={inputStyle} value={programSlug} onChange={(e) => setProgramSlug(e.target.value)}>
                    <option value="">Select a program…</option>
                    {streamPrograms.map((p) => (
                      <option key={p.slug} value={p.slug}>{p.title} · from {formatLKR(p.priceFrom)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedProgram && (
                <div style={{ marginTop: 22, padding: 16, background: SK.accentSoft, borderRadius: 4, border: `1.3px dashed ${SK.ink}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <SkIcon kind="star" size={18} />
                  <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13 }}>
                    <b>{selectedProgram.title}</b> — {selectedProgram.code} · {selectedProgram.duration} · from {formatLKR(selectedProgram.priceFrom)}
                    {selectedProgram.tag ? ` · ${selectedProgram.tag}` : ""}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <Heading size={26}>Step 3 · Upload results</Heading>
              <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 6 }}>O/L, A/L or other qualification documents. Optional for now — you can add these later.</div>
              <div style={{ marginTop: 22 }}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    border: `1.5px dashed ${SK.ink}`,
                    borderRadius: 4,
                    padding: "40px 20px",
                    cursor: "pointer",
                    background: SK.paper,
                  }}
                >
                  <SkIcon kind="book" size={28} />
                  <span style={{ fontFamily: "var(--sk-hand)", fontSize: 14 }}>{fileName ? fileName : "Click to choose a file"}</span>
                  <input type="file" style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                </label>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <Heading size={26}>Step 4 · Reserve &amp; pay</Heading>
              <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 6 }}>Review your details, then secure your seat.</div>
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Name", name || "—"],
                  ["Email", email || "—"],
                  ["Phone", phone || "—"],
                  ["Program", selectedProgram ? selectedProgram.title : "—"],
                  ["Qualification documents", fileName ?? "Not uploaded yet"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${SK.inkSoft}`, fontFamily: "var(--sk-hand)", fontSize: 14 }}>
                    <span style={{ color: SK.inkSoft }}>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
              {selectedProgram && (
                <div style={{ marginTop: 20, padding: 16, background: SK.ink, color: SK.paper, borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--sk-hand)", fontSize: 14 }}>Due to reserve your seat</span>
                  <span style={{ fontFamily: "var(--sk-hand)", fontSize: 22, fontWeight: 800 }}>{formatLKR(selectedProgram.priceFrom)}</span>
                </div>
              )}
            </>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, paddingTop: 20, borderTop: `1.3px solid ${SK.ink}` }}>
            <SkBtn onClick={goBack} disabled={step === 1}>← Back</SkBtn>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {savedNotice && <span style={{ fontFamily: "var(--sk-hand)", fontSize: 12, color: SK.inkSoft }}>Saved — come back anytime.</span>}
              <SkBtn
                onClick={() => {
                  setSavedNotice(true);
                  setTimeout(() => setSavedNotice(false), 2500);
                }}
              >
                Save &amp; exit
              </SkBtn>
              {step < 4 ? (
                <SkBtn
                  primary
                  arrow
                  disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid)}
                  onClick={goNext}
                >
                  Continue to Step {step + 1}
                </SkBtn>
              ) : (
                <SkBtn primary arrow onClick={() => setSubmitted(true)}>Reserve my seat</SkBtn>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, background: "#fff" }}>
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, fontWeight: 700 }}>Why act now</div>
            {[
              ["First 50", "HND at LKR 295,000"],
              ["Regular fee", "LKR 400,000"],
              ["You save", "LKR 105,000"],
              ["Foundation from", "LKR 125,000"],
              ["Short courses", "from LKR 15,000"],
            ].map(([d, t], i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 4 ? `1px dashed ${SK.inkSoft}` : "none", fontFamily: "var(--sk-hand)", fontSize: 13 }}>
                <div style={{ width: 100, color: SK.accent, fontWeight: 700 }}>{d}</div>
                <div>{t}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, background: SK.ink, color: SK.paper }}>
            <SkIcon kind="chat" size={22} color={SK.paper} />
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 17, fontWeight: 700, marginTop: 10 }}>Need a hand?</div>
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13, opacity: 0.85, marginTop: 4, lineHeight: 1.5 }}>
              Mon–Fri · 8:30 AM – 5:30 PM<br />Level 01, Shangri la, Colombo 2
            </div>
            <a href="tel:+94711993331" style={{ display: "block", marginTop: 12, fontFamily: "var(--sk-hand)", fontSize: 13, textDecoration: "underline" }}>
              +94 71 199 3331 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
