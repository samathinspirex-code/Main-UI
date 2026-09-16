// Homepage A — Classic hero, centered message, 3-col features.
// Ported from design-reference/homepages.jsx (const HomeA), with CTAs wired
// to real routes and the quick-search box turned into a real GET form.
import Link from "next/link";
import { SK } from "@/components/sketch/tokens";
import { Heading, SkBox, SkImage, SkBtn, SkTag, SkIcon, Scribble, Annotation } from "@/components/sketch/primitives";
import { Dood } from "@/components/sketch/doodles";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { NEWS, formatNewsDate } from "@/data/news";


const PATH_CARDS = [
  { icon: "grad", title: "Foundation", blurb: "Build essential knowledge and skills for further study and a successful academic journey.", tag: "From Rs 125,000", href: "/programs?level=Foundation" },
  { icon: "book", title: "HND & Degrees", blurb: "Strong foundation of knowledge and practical skills with HND, Top-Up Degrees and Postgraduate routes.", tag: "From Rs 250,000", href: "/programs?level=HND" },
  { icon: "brush", title: "Short Courses", blurb: "Practical, skill-focused courses — AI Mastery, Digital Marketing, Data Analytics & more.", tag: "From Rs 15,000", href: "/programs?level=Short+Course" },
] as const;

const STATS = [
  ["100%", "online"],
  ["4", "UK & Indian partners"],
  ["from Rs 15K", "short courses"],
  ["from Rs 125K", "foundation"],
] as const;

const LEVEL_OPTIONS = ["Foundation", "HND", "Higher Diploma", "Diploma", "Top-Up Degree", "Postgraduate", "Short Course"];
const BODY_OPTIONS = ["ATHE", "WINC", "LSBF", "Jain"];

const fieldLabelStyle = { fontFamily: "var(--sk-mono)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" as const, color: SK.inkSoft };
const fieldInputStyle = { fontFamily: "var(--sk-hand)", fontSize: 18, marginTop: 6, width: "100%", border: "none", outline: "none", background: "transparent", appearance: "none" as const };

export function HomeA() {
  const latestNews = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: SK.paper, color: SK.ink }}>
      <TopNav variant="classic" />

      {/* Hero */}
      <div style={{ padding: "64px 48px 48px", textAlign: "center", position: "relative" }}>
        <Annotation style={{ position: "absolute", top: 80, left: 80, transform: "rotate(-8deg)" }}>
          ↙ Sri Lanka&apos;s first online university
        </Annotation>
        <div style={{ fontFamily: "var(--sk-hand)", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: SK.inkSoft, marginBottom: 18 }}>
          · Learn without limits · 100% online ·
        </div>
        <Heading size={68} style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
          Your online
          <br />
          university.
          <br />
          Start with Foundation,
          <br />
          HND, degree, or Master&apos;s.
        </Heading>
        <div style={{ maxWidth: 560, margin: "24px auto 0", fontFamily: "var(--sk-hand)", fontSize: 17, color: SK.inkSoft, lineHeight: 1.5 }}>
          Globally recognised qualifications validated by ATHE, WINC, LSBF and Jain University — delivered fully online from Colombo.
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34 }}>
          <SkBtn primary arrow href="/admissions">Reserve your seat</SkBtn>
          <SkBtn href="/contact">Talk to an expert</SkBtn>
        </div>
        <div style={{ marginTop: 40 }}>
          <Dood dood={[{ kind: "sparkle", pos: "tr", size: 40, offset: -10 }, { kind: "asterisk", pos: "bl", size: 22, offset: -4 }]}>
            <SkImage h={280} w="100%" label="campus hero · 16:9" />
          </Dood>
        </div>
      </div>

      {/* Quick program search — real GET form, no JS needed to navigate to /programs */}
      <div style={{ padding: "0 48px 48px" }}>
        <form action="/programs" method="get">
          <SkBox h={78} style={{ padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 0, height: "100%" }}>
              <div style={{ padding: "16px 22px", borderRight: `1px dashed ${SK.inkSoft}` }}>
                <div style={fieldLabelStyle}>I want to study</div>
                <input type="text" name="q" placeholder="e.g. Computing" style={fieldInputStyle} />
              </div>
              <div style={{ padding: "16px 22px", borderRight: `1px dashed ${SK.inkSoft}` }}>
                <div style={fieldLabelStyle}>Level</div>
                <select name="level" defaultValue="" style={fieldInputStyle}>
                  <option value="">Foundation / HND</option>
                  {LEVEL_OPTIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div style={{ padding: "16px 22px" }}>
                <div style={fieldLabelStyle}>Awarding body</div>
                <select name="body" defaultValue="" style={fieldInputStyle}>
                  <option value="">ATHE · WINC · LSBF</option>
                  {BODY_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", padding: "0 20px" }}>
                <SkBtn primary arrow type="submit">Find program</SkBtn>
              </div>
            </div>
          </SkBox>
        </form>
      </div>

      {/* Stats strip */}
      <div style={{ padding: "12px 48px 56px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {STATS.map(([n, l], i) => (
          <div key={i} style={{ borderLeft: `2px solid ${SK.accent}`, paddingLeft: 16 }}>
            <div style={{ fontFamily: "var(--sk-hand)", fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: SK.inkSoft, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* 3 feature blocks */}
      <div style={{ padding: "0 48px 56px" }}>
        <Heading size={32} style={{ marginBottom: 28 }}>Choose your path ↘</Heading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PATH_CARDS.map((f, i) => (
            <Link key={i} href={f.href} style={{ position: "relative", display: "block" }}>
              <SkBox h={240} style={{ padding: 0 }}>
                <div style={{ padding: 22, height: "100%", display: "flex", flexDirection: "column" }}>
                  <SkIcon kind={f.icon} size={32} />
                  <Heading size={24} style={{ marginTop: 14 }}>{f.title}</Heading>
                  <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 8, flex: 1 }}>{f.blurb}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <SkTag>{f.tag}</SkTag>
                    <SkIcon kind="arrow" size={20} />
                  </div>
                </div>
              </SkBox>
            </Link>
          ))}
        </div>
      </div>

      {/* Student story + news */}
      <div style={{ padding: "0 48px 56px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <div>
          <Heading size={22} style={{ marginBottom: 14 }}>Student stories</Heading>
          <SkBox h={280} style={{ padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", height: "100%" }}>
              <SkImage h="100%" w="100%" label="student portrait" radius={0} />
              <div style={{ padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "var(--sk-mono)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: SK.accent }}>
                    HND · SOFTWARE ENGINEERING
                  </div>
                  <Heading size={22} style={{ marginTop: 10 }}>
                    &quot;I started with no coding
                    <br />
                    background. Now I&apos;m a
                    <br />
                    software developer.&quot;
                  </Heading>
                  <Scribble lines={3} lineGap={7} style={{ marginTop: 12 }} color={SK.inkSoft} />
                </div>
                <SkBtn small arrow href="/programs/hnd-computing-software-engineering">Read her story</SkBtn>
              </div>
            </div>
          </SkBox>
        </div>
        <div>
          <Heading size={22} style={{ marginBottom: 14 }}>Latest news</Heading>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {latestNews.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                style={{ display: "flex", gap: 14, padding: "12px 14px", border: `1.3px solid ${SK.ink}`, borderRadius: 4 }}
              >
                <div style={{ fontFamily: "var(--sk-mono)", fontSize: 11, letterSpacing: 0.5, width: 50, color: SK.accent }}>{formatNewsDate(item.date)}</div>
                <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, flex: 1 }}>{item.title}</div>
                <SkIcon kind="arrow" size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
