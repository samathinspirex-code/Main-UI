// About — "A · Classic structured", ported from
// design-reference/about-page.jsx (const AboutA). No interactivity in the
// original beyond nav/CTAs (handled by TopNav/Footer), so this stays a
// Server Component.
import Image from "next/image";
import { SK } from "@/components/sketch/tokens";
import { Heading, SkTag, SkIcon } from "@/components/sketch/primitives";
import { Dood } from "@/components/sketch/doodles";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { AB_IMG, BOARD, LEADERSHIP, FACULTY, VALUES } from "@/data/team";


function RealPhoto({
  src,
  w = "100%",
  h = 200,
  radius = 4,
  fit = "cover",
}: {
  src: string;
  w?: number | string;
  h?: number;
  radius?: number;
  fit?: "cover" | "contain";
}) {
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: radius, overflow: "hidden", border: `1.3px solid ${SK.ink}` }}>
      <Image src={src} alt="" fill sizes="100vw" style={{ objectFit: fit }} />
    </div>
  );
}




export function AboutA() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: SK.paper, color: SK.ink }}>
      <TopNav variant="classic" />

      {/* Hero */}
      <div style={{ padding: "48px 48px 24px", textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: SK.inkSoft }}>ABOUT INSPIRE COLLEGE</div>
        <Heading size={64} style={{ marginTop: 14, maxWidth: 900, margin: "14px auto 0" }}>
          Explore our diverse range
          <br />
          of programs designed to
          <br />
          prepare you for <span style={{ color: SK.accent }}>global success</span>.
        </Heading>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Dood dood={[{ kind: "sparkle", pos: "tr", size: 36, offset: -6 }, { kind: "rays", pos: "bl", size: 40, offset: -8 }]} style={{ width: 460 }}>
            <RealPhoto src={AB_IMG.heroFigure} w={460} h={300} fit="contain" />
          </Dood>
        </div>
      </div>

      {/* Who We Are */}
      <div style={{ padding: "48px 48px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "center" }}>
        <Dood dood={[{ kind: "asterisk", pos: "tr", size: 24, offset: -6 }, { kind: "dots", pos: "bl", size: 32, offset: -10 }]}>
          <RealPhoto src={AB_IMG.whoWeAre} h={420} fit="contain" />
        </Dood>
        <div>
          <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 2, color: SK.accent }}>WHO WE ARE</div>
          <Heading size={42} style={{ marginTop: 10 }}>A catalyst for personal &amp; professional transformation.</Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, color: SK.inkSoft, marginTop: 16, lineHeight: 1.65 }}>
            Inspire College is Sri Lanka&rsquo;s pioneering fully online higher education provider, bridging the gap between traditional learning and the digital future. Established with a vision to democratize education, we offer globally aligned programs from diploma to master&rsquo;s level.
            <br />
            <br />
            Our flexible learning model eliminates geographic barriers and rigid schedules, allowing students to pursue world-class education regardless of their location or life circumstances. With industry-relevant curriculum, expert faculty and innovative teaching methods, we prepare students not just for degrees, but for meaningful careers and lifelong success.
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
            {VALUES.map((v) => (
              <SkTag key={v.t} accent>{v.t}</SkTag>
            ))}
          </div>
        </div>
      </div>

      {/* Visionary leaders / Board */}
      <div id="board" style={{ padding: "40px 48px 48px", background: SK.accentSoft, borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
          <Heading size={40}>Visionary leaders</Heading>
          <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 1, color: SK.inkSoft }}>BOARD OF DIRECTORS</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {BOARD.map((p) => (
            <div key={p.name} style={{ background: SK.paper, border: `1.5px solid ${SK.ink}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <RealPhoto src={p.img} h={240} radius={0} />
              <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13, color: SK.inkSoft, marginTop: 10, lineHeight: 1.5, flex: 1 }}>{p.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership team */}
      <div style={{ padding: "48px 48px" }}>
        <Heading size={36} style={{ marginBottom: 24 }}>Leadership team</Heading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {LEADERSHIP.map((p) => (
            <div key={p.name} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, background: "#fff" }}>
              <RealPhoto src={p.img} h={180} />
              <div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 22, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13, color: SK.inkSoft, marginTop: 10, lineHeight: 1.55 }}>{p.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty */}
      <div style={{ padding: "24px 48px 48px" }}>
        <div style={{ marginBottom: 22 }}>
          <Heading size={36}>Meet the minds behind your success</Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 16, color: SK.inkSoft, marginTop: 6 }}>Learn from experts who inspire, guide and empower your journey.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {FACULTY.map((p) => (
            <div key={p.name} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, overflow: "hidden", display: "grid", gridTemplateColumns: "200px 1fr" }}>
              <RealPhoto src={p.img} h={260} radius={0} />
              <div style={{ padding: 20 }}>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 20, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 12, fontWeight: 700, marginTop: 14, color: SK.inkSoft, textTransform: "uppercase", letterSpacing: 0.5 }}>Academic profile</div>
                <ul style={{ margin: "6px 0 0", padding: "0 0 0 16px", fontFamily: "var(--sk-hand)", fontSize: 13, color: SK.inkSoft, lineHeight: 1.6 }}>
                  {p.creds?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core values */}
      <div style={{ padding: "40px 48px 56px", background: SK.ink, color: SK.paper }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Heading size={40} style={{ color: SK.paper }}>Our core values</Heading>
          <div style={{ fontFamily: "var(--sk-hand)", fontSize: 15, opacity: 0.7, marginTop: 6 }}>The principles that guide everything we do at Inspire College.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {VALUES.map((v) => (
            <div key={v.t} style={{ border: "1.3px solid rgba(232,226,211,0.4)", borderRadius: 4, padding: 22 }}>
              <SkIcon kind={v.icon} size={28} color={SK.accentSoft} />
              <Heading size={22} style={{ color: SK.paper, marginTop: 14 }}>{v.t}</Heading>
              <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, opacity: 0.75, marginTop: 10, lineHeight: 1.55 }}>{v.b}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
