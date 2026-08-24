// Programs listing + Program detail + Admissions wireframes
const INNER_W = 1200;

// ══════════════ PROGRAMS LISTING A — filter sidebar + cards ══════════════
const ProgramsA = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="classic" />
    <div style={{ padding: '32px 48px 20px' }}>
      <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>HOME / PROGRAMS</div>
      <Heading size={52} style={{ marginTop: 10 }}>Find your program</Heading>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 17, color: SK.inkSoft, marginTop: 8 }}>Foundation · HND · Top-Up Degree · Master’s · Short Courses — all 100% online</div>
    </div>

    <div style={{ padding: '20px 48px 48px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 36 }}>
      {/* Sidebar filters */}
      <div>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Filters</div>
        {[
          { title: 'Level', items: ['Foundation (8)', 'HND (7)', 'Top-Up Degree (6)', 'Postgraduate (12)', 'Short Course (6)'] },
          { title: 'School', items: ['School of Computing', 'School of Business', 'CPD / Short Courses'] },
          { title: 'Awarding Body', items: ['ATHE (UK)', 'WINC — UoB (UK)', 'LSBF (UK)', 'Jain University'] },
          { title: 'Mode', items: ['100% Online', 'Live online classes', 'Self-paced LMS'] },
        ].map((g, i) => (
          <div key={i} style={{ marginTop: 22 }}>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{g.title}</div>
            {g.items.map((it, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 14, height: 14, border: `1.3px solid ${SK.ink}`, borderRadius: 2, background: j === 0 && i === 0 ? SK.accent : 'transparent' }} />
                <span style={{ fontFamily: 'var(--sk-hand)', fontSize: 14 }}>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: `1.3px solid ${SK.ink}` }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16 }}>Showing <b>HND</b> pathways · ATHE-validated</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13 }}>Sort: Popularity ▾</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            { t: 'HND in Computing (Software Engineering)', code: 'ATHE · L5', dur: '12–18 months', tag: 'Most popular', icon: 'code' },
            { t: 'HND in Computing & AI', code: 'ATHE · L5', dur: '12–18 months', tag: 'New', icon: 'flask' },
            { t: 'HND in Computing (Data Analytics)', code: 'ATHE · L5', dur: '12–18 months', tag: null, icon: 'flask' },
            { t: 'HND in Computing (Cyber Security)', code: 'ATHE · L5', dur: '12–18 months', tag: null, icon: 'building' },
            { t: 'HND in Computing (NetDevOps)', code: 'ATHE · L5', dur: '12–18 months', tag: null, icon: 'code' },
            { t: 'HND in Business Management', code: 'ATHE · L5', dur: '12–18 months', tag: 'First 50 · ₨295K', icon: 'building' },
          ].map((p, i) => (
            <div key={i} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, position: 'relative', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <SkIcon kind={p.icon} size={26} />
                {p.tag && <SkTag accent>{p.tag}</SkTag>}
              </div>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, color: SK.inkSoft, marginTop: 14 }}>{p.code} · {p.dur}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>{p.t}</div>
              <Scribble lines={2} color={SK.inkSoft} style={{ marginTop: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${SK.inkSoft}` }}>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13 }}>From <b>₨295,000</b></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--sk-hand)', fontSize: 13 }}>Details <SkIcon kind="arrow" size={14} /></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 28, fontFamily: 'var(--sk-hand)', fontSize: 14 }}>
          {['‹', '1', '2', '3', '4', '›'].map((n, i) => (
            <div key={i} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.3px solid ${SK.ink}`, borderRadius: 4, background: n === '1' ? SK.ink : 'transparent', color: n === '1' ? '#fff' : SK.ink }}>{n}</div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ══════════════ PROGRAMS LISTING B — visual catalog grid ══════════════
const ProgramsB = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="minimal" />
    <div style={{ padding: '40px 48px 24px', borderBottom: `1.5px solid ${SK.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>THE CATALOG / 2027</div>
          <Heading size={80} style={{ marginTop: 6, letterSpacing: -2 }}>Programs</Heading>
        </div>
        <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--sk-hand)' }}>
          {['ATHE', 'WINC', 'LSBF', 'Jain University'].map((t, i) => (
            <div key={t} style={{ padding: '6px 14px', border: `1.3px solid ${SK.ink}`, borderRadius: 20, background: i === 0 ? SK.ink : 'transparent', color: i === 0 ? '#fff' : SK.ink, fontSize: 13 }}>{t}</div>
          ))}
        </div>
      </div>
      {/* inline filters */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24, fontFamily: 'var(--sk-hand)', fontSize: 13, alignItems: 'center' }}>
        <span style={{ color: SK.inkSoft }}>Filter:</span>
        {['Level ▾', 'School ▾', 'Awarding body ▾', 'Fees ▾', 'Start date ▾'].map((t) => (
          <div key={t} style={{ padding: '4px 12px', border: `1.3px dashed ${SK.ink}`, borderRadius: 4 }}>{t}</div>
        ))}
        <div style={{ flex: 1 }} />
        <SkIcon kind="search" size={16} /><span>Search program…</span>
      </div>
    </div>

    <div style={{ padding: '36px 48px 48px' }}>
      {/* Faculty sections */}
      {[
        { name: 'School of Computing', n: '5 pathways', icon: 'code' },
        { name: 'School of Business', n: '4 programs', icon: 'building' },
        { name: 'CPD & Short Courses', n: '6 courses', icon: 'brush' },
      ].map((f, idx) => (
        <div key={f.name} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <SkIcon kind={f.icon} size={24} />
            <Heading size={28}>{f.name}</Heading>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, color: SK.inkSoft }}>{f.n.toUpperCase()}</div>
            <div style={{ flex: 1 }}><SkLine color={SK.inkSoft} /></div>
            <span style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft }}>See all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[0,1,2,3].map((i) => {
              const meta = [
                [['HND · ATHE', 'Software Engineering', '₨295K'], ['HND · ATHE', 'Data Analytics', '₨295K'], ['HND · ATHE', 'Cyber Security', '₨295K'], ['HND · ATHE', 'Computing & AI', '₨295K']],
                [['HND · ATHE', 'Business Management', '₨295K'], ['Foundation', 'Business & Mgmt', '₨125K'], ['Higher Dip. · LSBF', 'Business Studies', '₨175K'], ['Diploma · LSBF', 'Banking & Finance', '₨150K']],
                [['Short Course · CPD', 'AI Mastery', '₨15K'], ['Short Course · CPD', 'Digital Marketing', '₨15K'], ['Short Course · CPD', 'Data Analytics (Google)', '₨15K'], ['Short Course · CPD', 'AI for Marketing', '₨15K']],
              ][idx][i];
              return (
                <div key={i} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, overflow: 'hidden' }}>
                  <SkImage h={120} label={`program ${idx+1}·${i+1}`} radius={0} />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, color: SK.accent }}>{meta[0].toUpperCase()}</div>
                    <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>{meta[1]}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      <SkTag>From {meta[2]}</SkTag>
                      <SkIcon kind="arrow" size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ══════════════ PROGRAM DETAIL A — structured academic layout ══════════════
const DetailA = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="classic" />
    <div style={{ padding: '28px 48px 24px' }}>
      <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.inkSoft }}>HOME / PROGRAMS / COMPUTING / HND COMPUTING & AI</div>
    </div>

    {/* Hero row */}
    <div style={{ padding: '0 48px 36px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }}>
      <div>
        <SkTag accent>NEW · ATHE-VALIDATED</SkTag>
        <Heading size={56} style={{ marginTop: 12 }}>HND in Computing &amp; AI</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, color: SK.inkSoft, marginTop: 10, lineHeight: 1.5 }}>
          A Higher National Diploma at Level 5, awarded by ATHE (UK). Strong foundations in computing, machine learning and applied AI — delivered fully online with live tutor support and a verified certificate on completion.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24, padding: '18px 0', borderTop: `1.3px solid ${SK.ink}`, borderBottom: `1.3px solid ${SK.ink}` }}>
          {[['ATHE L5', 'Awarding'], ['12–18 mo', 'Duration'], ['100% Online', 'Mode'], ['₨295,000', 'First 50']].map(([v, l], i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.inkSoft }}>{l.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, fontWeight: 700, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <SkBtn primary arrow>Reserve your seat</SkBtn>
          <SkBtn>Download brochure</SkBtn>
          <SkBtn>Talk to an advisor</SkBtn>
        </div>
      </div>
      <div>
        <SkImage h={360} label="program · hero" />
        {/* Quick facts card */}
        <div style={{ marginTop: 16, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 16, background: '#fff' }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>At a glance</div>
          {[
            ['Awarding body', 'ATHE, UK · Ofqual reg.'],
            ['Entry', 'A/L or Foundation'],
            ['Format', 'Live online + LMS'],
            ['Progression', 'Top-Up to UK Degree'],
          ].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 3 ? `1px dashed ${SK.inkSoft}` : 'none', fontFamily: 'var(--sk-hand)', fontSize: 13 }}>
              <span style={{ color: SK.inkSoft }}>{k}</span><b>{v}</b>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div style={{ padding: '0 48px', borderBottom: `1.5px solid ${SK.ink}`, display: 'flex', gap: 28, fontFamily: 'var(--sk-hand)', fontSize: 15 }}>
      {['Overview', 'Curriculum', 'Faculty', 'Careers', 'Fees & Aid', 'Apply'].map((t, i) => (
        <div key={t} style={{ padding: '14px 2px', borderBottom: i === 1 ? `3px solid ${SK.accent}` : 'none', fontWeight: i === 1 ? 700 : 500, color: i === 1 ? SK.accent : SK.ink }}>{t}</div>
      ))}
    </div>

    {/* Curriculum */}
    <div style={{ padding: '40px 48px 48px' }}>
      <Heading size={34}>Curriculum</Heading>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, color: SK.inkSoft, marginTop: 8, maxWidth: 720 }}>Stage 1 builds core computing &amp; programming foundations. Stage 2 goes deep on AI, data and applied projects. On completion you can Top-Up to a UK Bachelor’s with WINC.</div>

      {[1, 2].map((y) => (
        <div key={y} style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 28, fontWeight: 800 }}>Stage {y}</div>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, color: SK.inkSoft }}>· {y === 1 ? 'L4 · FOUNDATIONS' : 'L5 · SPECIALISM + PROJECT'}</div>
            <div style={{ flex: 1 }}><SkLine color={SK.inkSoft} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {['Module A', 'Module B', 'Module C', 'Module D'].map((m, i) => (
              <div key={i} style={{ border: `1.3px solid ${SK.ink}`, borderRadius: 4, padding: 14 }}>
                <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, color: SK.accent }}>L{y === 1 ? '4' : '5'}.{i+1} · ATHE</div>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>
                  {y === 1 ? ['Computer Systems', 'Programming Fundamentals', 'Mathematics for Computing', 'Web Technologies'][i] : ['Machine Learning', 'AI Applications', 'Cloud & Data', 'Capstone Project'][i]}
                </div>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 12, color: SK.inkSoft, marginTop: 6 }}>Live online · LMS</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Faculty */}
    <div style={{ padding: '0 48px 48px' }}>
      <Heading size={28} style={{ marginBottom: 20 }}>Your teachers</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {['Prof. I. Wijesinghe', 'Dr. N. Fernando', 'Prof. A. Jayasuriya', 'Dr. M. Perera'].map((n, i) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <SkImage h={160} label="portrait" />
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, fontWeight: 700, marginTop: 10 }}>{n}</div>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, color: SK.inkSoft, marginTop: 2 }}>{['ML', 'SYSTEMS', 'STATS', 'ETHICS'][i]}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Apply CTA */}
    <div style={{ margin: '0 48px 48px', background: SK.ink, color: SK.paper, padding: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Heading size={30} style={{ color: SK.paper }}>Ready to start?</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, opacity: 0.8, marginTop: 6 }}>First 50 students: ₨295,000 · talk to an advisor on +94 71 199 3331</div>
      </div>
      <SkBtn primary arrow>Reserve your seat</SkBtn>
    </div>

    <Footer />
  </div>
);

// ══════════════ PROGRAM DETAIL B — storytelling vertical ══════════════
const DetailB = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="minimal" />
    {/* Full bleed hero */}
    <div style={{ position: 'relative' }}>
      <SkImage h={440} label="students · studio · wide" radius={0} />
      <div style={{ position: 'absolute', inset: 0, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(180deg, transparent 40%, rgba(29,26,20,0.55))' }}>
        <SkTag>HND · ATHE-VALIDATED · 100% ONLINE</SkTag>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 80, fontWeight: 800, lineHeight: 1, color: '#fff', marginTop: 14, letterSpacing: -1.5 }}>Computing<br />&amp; AI</div>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, color: 'rgba(255,255,255,0.85)', marginTop: 14, maxWidth: 640 }}>Build the next generation of AI — from anywhere in Sri Lanka.</div>
      </div>
    </div>

    {/* Sticky side nav + prose */}
    <div style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '200px 1fr 240px', gap: 36 }}>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13 }}>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 2, color: SK.inkSoft, marginBottom: 14 }}>ON THIS PAGE</div>
        {[['Why this program', true], ['How it works', false], ['Who teaches', false], ['What you build', false], ['Where grads go', false], ['How to apply', false]].map(([t, a], i) => (
          <div key={i} style={{ padding: '6px 0', borderLeft: a ? `2px solid ${SK.accent}` : `2px solid transparent`, paddingLeft: 10, color: a ? SK.accent : SK.ink, fontWeight: a ? 700 : 500 }}>{t}</div>
        ))}
      </div>

      <div>
        <Heading size={36}>Why this program?</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 17, lineHeight: 1.7, marginTop: 14, color: SK.inkSoft }}>
          <Scribble lines={6} color={SK.inkSoft} lineGap={10} />
        </div>

        <div style={{ marginTop: 36, padding: 24, background: SK.accentSoft, border: `1.5px solid ${SK.ink}`, borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 22, fontWeight: 700 }}>"Inspire let me study and keep my job. The LMS made it possible to attend live and catch up on my own time."</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, marginTop: 14, opacity: 0.7 }}>— Shan · HND Computing · now Software Developer</div>
        </div>

        <Heading size={28} style={{ marginTop: 44 }}>How it works</Heading>
        <div style={{ marginTop: 16 }}>
          {[['Stage 1', 'Level 4 ATHE — core computing, programming, maths and web tech. Live online classes plus self-paced LMS.'], ['Stage 2', 'Level 5 ATHE — machine learning, applied AI, cloud & data, and a capstone project assessed by ATHE.'], ['Then', 'Top-Up to a UK Bachelor’s with WINC, or continue with a PG Diploma at Inspire.']].map(([y, b], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 20, padding: '16px 0', borderTop: i === 0 ? `1.3px solid ${SK.ink}` : 'none', borderBottom: `1.3px solid ${SK.ink}` }}>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 22, fontWeight: 800 }}>{y}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, lineHeight: 1.6 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right rail: apply card + facts */}
      <div>
        <div style={{ position: 'sticky', top: 20, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, background: '#fff' }}>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.inkSoft }}>SPECIAL OFFER</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 32, fontWeight: 800, color: SK.accent, marginTop: 4 }}>₨295K</div>
          <SkLine color={SK.inkSoft} style={{ margin: '14px 0' }} />
          {[['Level', 'HND · L5'], ['Awarding', 'ATHE, UK'], ['Duration', '12–18 months'], ['Mode', '100% Online']].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--sk-hand)', fontSize: 13, padding: '5px 0' }}>
              <span style={{ color: SK.inkSoft }}>{k}</span><b>{v}</b>
            </div>
          ))}
          <div style={{ marginTop: 18 }}><SkBtn primary fullWidth arrow>Reserve seat</SkBtn></div>
          <div style={{ marginTop: 10 }}><SkBtn fullWidth>Download brochure</SkBtn></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ══════════════ ADMISSIONS A — stepper + application form ══════════════
const AdmitA = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="classic" />
    <div style={{ padding: '36px 48px 24px', textAlign: 'center' }}>
      <SkTag accent>RESERVE YOUR SEAT</SkTag>
      <Heading size={56} style={{ marginTop: 14 }}>How you'll enroll</Heading>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 17, color: SK.inkSoft, marginTop: 10, maxWidth: 640, marginInline: 'auto' }}>
        Four short steps, about twenty minutes. Save and return any time.
      </div>
    </div>

    {/* Stepper */}
    <div style={{ padding: '32px 48px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
        {[
          ['01', 'Your details', 'Name, email & phone', 'done'],
          ['02', 'Pick your program', 'Choose Foundation / HND / Top-Up', 'current'],
          ['03', 'Upload results', 'O/L, A/L or other qualifications', 'pending'],
          ['04', 'Reserve & pay', 'Secure your seat', 'pending'],
        ].map(([n, t, s, st], i) => (
          <div key={i} style={{ position: 'relative', padding: '0 12px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, margin: '0 auto 12px', borderRadius: '50%', border: `2px solid ${SK.ink}`, background: st === 'done' ? SK.ink : st === 'current' ? SK.accent : SK.paper, color: st === 'done' || st === 'current' ? '#fff' : SK.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sk-hand)', fontWeight: 800, fontSize: 18, position: 'relative', zIndex: 2 }}>
              {st === 'done' ? <SkIcon kind="check" size={22} color="#fff" /> : n}
            </div>
            {i < 3 && <div style={{ position: 'absolute', top: 24, left: '75%', width: '50%', height: 2, background: st === 'done' ? SK.ink : SK.inkSoft, zIndex: 1 }} />}
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, fontWeight: 700 }}>{t}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 12, color: SK.inkSoft, marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Form area */}
    <div style={{ padding: '36px 48px 48px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 36 }}>
      <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 28, background: '#fff' }}>
        <Heading size={26}>Step 2 · Pick your program</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 6 }}>Choose your stream and the program you’re interested in.</div>

        <div style={{ marginTop: 22 }}>
          {[
            ['Stream', 'Computing', 'School of Computing'],
            ['Highest qual.', 'After A/L', 'A/L · Diploma · Bachelor’s'],
            ['Program', 'HND in Computing & AI', 'ATHE · L5 · from ₨295,000'],
          ].map(([k, v, c], i) => (
            <div key={i} style={{ border: `1.3px solid ${SK.ink}`, borderRadius: 4, padding: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16, background: SK.paper }}>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.inkSoft, width: 90 }}>{k.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 17, fontWeight: 700 }}>{v}</div>
                <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, color: SK.accent, marginTop: 2 }}>{c}</div>
              </div>
              <SkBtn small>Change</SkBtn>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, padding: 16, background: SK.accentSoft, borderRadius: 4, border: `1.3px dashed ${SK.ink}`, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <SkIcon kind="star" size={18} />
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13 }}>
            <b>Heads up:</b> the first 50 HND students enroll at ₨295,000 — regular fee is ₨400,000. Limited seats.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, paddingTop: 20, borderTop: `1.3px solid ${SK.ink}` }}>
          <SkBtn>← Back</SkBtn>
          <div style={{ display: 'flex', gap: 10 }}>
            <SkBtn>Save & exit</SkBtn>
            <SkBtn primary arrow>Continue to Step 3</SkBtn>
          </div>
        </div>
      </div>

      {/* sidebar: deadlines + help */}
      <div>
        <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, background: '#fff' }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, fontWeight: 700 }}>Why act now</div>
          {[['First 50', 'HND at ₨295,000'], ['Regular fee', '₨400,000'], ['You save', '₨105,000'], ['Foundation from', '₨125,000'], ['Short courses', 'from ₨15,000']].map(([d, t], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 4 ? `1px dashed ${SK.inkSoft}` : 'none', fontFamily: 'var(--sk-hand)', fontSize: 13 }}>
              <div style={{ width: 100, color: SK.accent, fontWeight: 700 }}>{d}</div>
              <div>{t}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, background: SK.ink, color: SK.paper }}>
          <SkIcon kind="chat" size={22} color={SK.paper} />
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 17, fontWeight: 700, marginTop: 10 }}>Need a hand?</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, opacity: 0.85, marginTop: 4, lineHeight: 1.5 }}>Mon–Fri · 8:30 AM – 5:00 PM<br />Level 01, Shangri la, Colombo 2</div>
          <div style={{ marginTop: 12, fontFamily: 'var(--sk-hand)', fontSize: 13, textDecoration: 'underline' }}>+94 71 199 3331 →</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ══════════════ ADMISSIONS B — friendly landing with FAQ ══════════════
const AdmitB = () => (
  <div style={{ width: INNER_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="mega" />
    {/* Hero: big question */}
    <div style={{ padding: '64px 48px 40px', textAlign: 'center', background: SK.accentSoft, borderBottom: `1.5px solid ${SK.ink}` }}>
      <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.ink }}>· RESERVE YOUR SEAT · NEW INTAKE ·</div>
      <Heading size={72} style={{ marginTop: 14, maxWidth: 900, margin: '14px auto 0' }}>So — how do you<br />actually enroll?</Heading>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, marginTop: 16, maxWidth: 600, margin: '16px auto 0', color: SK.inkSoft }}>Short answer: tell us about yourself, pick a program, talk to an advisor. Long answer below.</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 28 }}>
        <SkBtn primary arrow>Reserve my seat</SkBtn>
        <SkBtn>Talk to an expert</SkBtn>
      </div>
    </div>

    {/* Path selector - 3 applicant types */}
    <div style={{ padding: '48px 48px' }}>
      <Heading size={28} style={{ marginBottom: 24 }}>Which best describes you?</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { t: 'After O/L', b: 'Start with a Foundation program in Computing or Business and progress to HND and beyond.', n: '4 Foundations', icon: 'grad' },
          { t: 'After A/L', b: 'Jump straight into an ATHE HND or a Jain University Bachelor’s degree.', n: 'HND · BBA · BCA', icon: 'user' },
          { t: 'Diploma / Bachelor’s', b: 'Top-Up to a UK Degree with WINC, or move on to an MBA / Master’s.', n: 'Top-Up · MBA · MSc', icon: 'globe' },
        ].map((p, i) => (
          <div key={i} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24, background: '#fff', position: 'relative' }}>
            <SkIcon kind={p.icon} size={32} />
            <Heading size={24} style={{ marginTop: 14 }}>{p.t}</Heading>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 8, lineHeight: 1.5 }}>{p.b}</div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkTag>{p.n}</SkTag>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>My path <SkIcon kind="arrow" size={14} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Timeline */}
    <div style={{ padding: '0 48px 48px' }}>
      <Heading size={28} style={{ marginBottom: 22 }}>How enrollment works</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 22, left: 24, right: 24, height: 2, borderTop: `2px dashed ${SK.ink}` }} />
        {[
          ['Day 1', 'Submit form', SK.paper],
          ['Day 2', 'Advisor calls', SK.accent],
          ['Day 3', 'Confirm program', SK.paper],
          ['Day 5', 'Reserve seat', SK.paper],
          ['Week 2', 'Classes start', SK.ink],
        ].map(([d, t, bg], i) => (
          <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: `2px solid ${SK.ink}`, background: bg, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 0.5, color: bg === SK.ink ? '#fff' : SK.ink }}>{i + 1}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, fontWeight: 700, marginTop: 10 }}>{d}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft }}>{t}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Fees split */}
    <div style={{ padding: '0 48px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24 }}>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, color: SK.inkSoft, letterSpacing: 1 }}>TUITION</div>
        <Heading size={30} style={{ marginTop: 6 }}>From <span style={{ color: SK.accent }}>₨15,000</span></Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 8 }}>Short Courses from ₨15K · Foundation ₨125K · HND ₨295K (first 50, regular ₨400K).</div>
        <div style={{ marginTop: 16 }}><SkBtn small arrow>See full fee table</SkBtn></div>
      </div>
      <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24, background: SK.ink, color: SK.paper }}>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>PAYMENT</div>
        <Heading size={30} style={{ color: SK.paper, marginTop: 6 }}>Affordable <span style={{ color: SK.accentSoft }}>plans</span></Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, opacity: 0.8, marginTop: 8 }}>Flexible payment plans that fit your budget — study from anywhere in the world.</div>
        <div style={{ marginTop: 16 }}><SkBtn small arrow>Talk to finance →</SkBtn></div>
      </div>
    </div>

    {/* FAQ */}
    <div style={{ padding: '0 48px 56px' }}>
      <Heading size={28} style={{ marginBottom: 18 }}>Honest answers to common questions</Heading>
      {[
        ['Are the qualifications globally recognised?', 'Yes — Diplomas, Degrees and Master’s are validated by leading UK awarding bodies (ATHE, WINC, LSBF) and Jain University.'],
        ['Is it really 100% online?', 'Yes. Attend live classes, submit assignments and graduate fully online — with LMS access, verified certification and real-time interaction.'],
        ['Who teaches the programs?', 'Experienced academics and industry professionals — expert lecturers across computing, business, AI and digital marketing.'],
        ['What does the HND cost?', 'Regular HND fee is ₨400,000. For a limited time, the first 50 students can enroll at ₨295,000.'],
        ['How do I get in touch?', 'Call +94 71 199 3331 or visit Level 01, Shangri la, Colombo 2 (Mon–Fri, 8:30 AM–5:00 PM).'],
      ].map(([q, a], i) => (
        <div key={i} style={{ padding: '18px 0', borderBottom: `1.3px solid ${SK.ink}`, borderTop: i === 0 ? `1.3px solid ${SK.ink}` : 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 19, fontWeight: 700 }}>{q}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, color: SK.inkSoft, marginTop: 8, maxWidth: 780 }}>{a}</div>
          </div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 24 }}>{i === 0 ? '−' : '+'}</div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

Object.assign(window, { ProgramsA, ProgramsB, DetailA, DetailB, AdmitA, AdmitB, INNER_W });
