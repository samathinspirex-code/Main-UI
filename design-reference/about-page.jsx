// About Us wireframes — real content sourced from inspirecollege.lk/about-us
// Two variations, same sketchy style, sized identically to other inner pages

const ABOUT_W = 1200;

// Real Inspire College About page imagery
const AB_IMG = {
  heroFigure: 'https://inspirecollege.lk/wp-content/uploads/2025/10/Gemini_Generated_Image_vwcqbzvwcqbzvwcq-Photoroom.png',
  whoWeAre: 'https://inspirecollege.lk/wp-content/uploads/2025/10/About-us-image-1-1.png',
  steven: 'https://inspirecollege.lk/wp-content/uploads/2025/09/steven-600x606-1.jpg',
  dinesh: 'https://inspirecollege.lk/wp-content/uploads/2025/09/dinesh-600x606-1.jpg',
  bhanuka: 'https://inspirecollege.lk/wp-content/uploads/2025/09/bhanuka-600x606-1.jpg',
  tim: 'https://inspirecollege.lk/wp-content/uploads/2025/09/tim-600x606-1.jpg',
  kanishka: 'https://inspirecollege.lk/wp-content/uploads/2025/09/kanishka-1.png',
  sumaiya: 'https://inspirecollege.lk/wp-content/uploads/2025/09/enfk.png',
  nishadie: 'https://inspirecollege.lk/wp-content/uploads/2025/12/Inspire-Portratis-14-819x1024.jpg',
  leandra: 'https://inspirecollege.lk/wp-content/uploads/2025/12/Inspire-Portratis-4-819x1024.jpg',
};

// Real photo placeholder — drops in a sketchy bordered photo from a URL
const RealPhoto = ({ src, w = '100%', h = 200, radius = 4, style = {}, fit = 'cover' }) => (
  <div style={{ position: 'relative', width: w, height: h, borderRadius: radius, overflow: 'hidden', border: `1.3px solid ${SK.ink}`, ...style }}>
    <img src={RES(src)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
  </div>
);

const BOARD = [
  { name: 'Steven Enderby', role: 'Chairman', img: AB_IMG.steven,
    bio: 'A seasoned leader with 25+ years in private equity, strategy and governance. Former CEO of Hemas Holdings PLC, with senior roles at Actis LLP and CDC Capital Partners. Leverages deep regional experience to advance Inspire\u2019s mission of innovative, accessible education.' },
  { name: 'Dinesh Kumara', role: 'Director / CEO', img: AB_IMG.dinesh,
    bio: 'Founder/CEO of Inspire College and Founder & Chairman of Inspire X, Niwadu Deals and HealthX. A bootstrapped entrepreneur with 10+ years driving Sri Lanka\u2019s digital transformation. Advisory board member of NEDA and ITI.' },
  { name: 'Bhanuka Harischandra', role: 'Director', img: AB_IMG.bhanuka,
    bio: 'Sri Lankan entrepreneur and digital strategist. Founder & Chief Growth Officer of Surge Global. Co-founder of Watchdog, backed by the Tavistock Group. Recognised by Forbes 30 Under 30 and Rest of World 100 Changemakers.' },
  { name: 'Tim Edwards', role: 'Director', img: AB_IMG.tim,
    bio: 'UK-based higher education marketing strategist with 18+ years of global experience. Former CMO at QS Quacquarelli Symonds. Recognised for expertise in storytelling, brand development and leading high-performing teams.' },
];

const LEADERSHIP = [
  { name: 'Kanishka Liyanage', role: 'COO', img: AB_IMG.kanishka,
    bio: 'MBA. Experienced leader in strategic growth, operations and innovation. Skilled in digital transformation and startup mentorship \u2014 drives sustainable scaling at Inspire.' },
  { name: 'Sumaiya Iqbal', role: 'Academic Head', img: AB_IMG.sumaiya,
    bio: 'Education and development expert with global experience in youth empowerment, mental health and digital learning. UNICEF Sierra Leone consultant leading adolescent development programs.' },
];

const FACULTY = [
  { name: 'M. D. Nishadie Gunathilaka', role: 'Programme Lead \u2014 School of Computing', img: AB_IMG.nishadie,
    creds: ['BSc (Special) IT & Management \u2014 University of Moratuwa', 'MSc IT \u2014 University of Moratuwa', 'Reading PhD'] },
  { name: 'Leandra Joseph', role: 'Programme Lead \u2014 School of Business', img: AB_IMG.leandra,
    creds: ['MSc Business & Org. Psychology (Distinction) \u2014 Northampton, UK', 'BSc Business & Management \u2014 Northumbria, UK', 'PGDip Professional Marketing \u2014 CIM, UK'] },
];

const VALUES = [
  { t: 'Industry-Ready Skills', b: 'Career-focused programs with real-world training, internships and certifications to prepare students for the job market.', icon: 'flask' },
  { t: 'Life Skills for Success', b: 'Build confidence, communication, leadership, critical thinking and financial literacy for personal and professional growth.', icon: 'heart' },
  { t: 'Affordable Education', b: 'Flexible fees, scholarships and online/blended learning options for high-quality, budget-friendly education.', icon: 'user' },
  { t: 'Excellence', b: 'Rigorous academic standards aligned with global benchmarks \u2014 from curriculum design to faculty selection.', icon: 'star' },
  { t: 'Empowerment', b: 'Practical skills, professional networks and personal development opportunities that transform careers and lives.', icon: 'grad' },
  { t: 'Innovation', b: 'Continuously evolving our teaching methods, technology and content to meet the demands of the modern workplace.', icon: 'flask' },
];

// ══════════════ ABOUT A — Classic structured layout ══════════════
const AboutA = () => (
  <div style={{ width: ABOUT_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="classic" />

    {/* Hero */}
    <div style={{ padding: '48px 48px 24px', textAlign: 'center', position: 'relative' }}>
      <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>ABOUT INSPIRE COLLEGE</div>
      <Heading size={64} style={{ marginTop: 14, maxWidth: 900, margin: '14px auto 0' }}>Explore our diverse range<br />of programs designed to<br />prepare you for <span style={{ color: SK.accent }}>global success</span>.</Heading>
      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
        <Dood dood={[{kind:'sparkle', pos:'tr', size: 36, offset: -6}, {kind:'rays', pos:'bl', size: 40, offset: -8}]} style={{ width: 460 }}>
          <RealPhoto src={AB_IMG.heroFigure} w={460} h={300} fit="contain" />
        </Dood>
      </div>
    </div>

    {/* Who We Are */}
    <div style={{ padding: '48px 48px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
      <Dood dood={[{kind:'asterisk', pos:'tr', size: 24, offset: -6}, {kind:'dots', pos:'bl', size: 32, offset: -10}]}>
        <RealPhoto src={AB_IMG.whoWeAre} h={420} fit="contain" />
      </Dood>
      <div>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.accent }}>WHO WE ARE</div>
        <Heading size={42} style={{ marginTop: 10 }}>A catalyst for personal &amp; professional transformation.</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, color: SK.inkSoft, marginTop: 16, lineHeight: 1.65 }}>
          Inspire College is Sri Lanka&rsquo;s pioneering fully online higher education provider, bridging the gap between traditional learning and the digital future. Established with a vision to democratize education, we offer globally aligned programs from diploma to master&rsquo;s level.
          <br /><br />
          Our flexible learning model eliminates geographic barriers and rigid schedules, allowing students to pursue world-class education regardless of their location or life circumstances. With industry-relevant curriculum, expert faculty and innovative teaching methods, we prepare students not just for degrees, but for meaningful careers and lifelong success.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          {['Industry-Ready Skills', 'Life Skills for Success', 'Affordable Education', 'Excellence', 'Empowerment', 'Innovation'].map((t) => (
            <SkTag key={t} accent>{t}</SkTag>
          ))}
        </div>
      </div>
    </div>

    {/* Visionary leaders / Board */}
    <div style={{ padding: '40px 48px 48px', background: SK.accentSoft, borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <Heading size={40}>Visionary leaders</Heading>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, color: SK.inkSoft }}>BOARD OF DIRECTORS</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {BOARD.map((p) => (
          <div key={p.name} style={{ background: SK.paper, border: `1.5px solid ${SK.ink}`, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <RealPhoto src={p.img} h={240} radius={0} />
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft, marginTop: 10, lineHeight: 1.5, flex: 1 }}>{p.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Leadership team */}
    <div style={{ padding: '48px 48px' }}>
      <Heading size={36} style={{ marginBottom: 24 }}>Leadership team</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {LEADERSHIP.map((p) => (
          <div key={p.name} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 20, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, background: '#fff' }}>
            <RealPhoto src={p.img} h={180} />
            <div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 22, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft, marginTop: 10, lineHeight: 1.55 }}>{p.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Faculty */}
    <div style={{ padding: '24px 48px 48px' }}>
      <div style={{ marginBottom: 22 }}>
        <Heading size={36}>Meet the minds behind your success</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, color: SK.inkSoft, marginTop: 6 }}>Learn from experts who inspire, guide and empower your journey.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {FACULTY.map((p) => (
          <div key={p.name} style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
            <RealPhoto src={p.img} h={260} radius={0} />
            <div style={{ padding: 20 }}>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 12, fontWeight: 700, marginTop: 14, color: SK.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 }}>Academic profile</div>
              <ul style={{ margin: '6px 0 0', padding: '0 0 0 16px', fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft, lineHeight: 1.6 }}>
                {p.creds.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Core values */}
    <div style={{ padding: '40px 48px 56px', background: SK.ink, color: SK.paper }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <Heading size={40} style={{ color: SK.paper }}>Our core values</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, opacity: 0.7, marginTop: 6 }}>The principles that guide everything we do at Inspire College.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {VALUES.map((v, i) => (
          <div key={v.t} style={{ border: `1.3px solid rgba(232,226,211,0.4)`, borderRadius: 4, padding: 22 }}>
            <SkIcon kind={v.icon} size={28} color={SK.accentSoft} />
            <Heading size={22} style={{ color: SK.paper, marginTop: 14 }}>{v.t}</Heading>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, opacity: 0.75, marginTop: 10, lineHeight: 1.55 }}>{v.b}</div>
          </div>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);

// ══════════════ ABOUT B — Editorial / story-led layout ══════════════
const AboutB = () => (
  <div style={{ width: ABOUT_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="minimal" />

    {/* Editorial hero */}
    <div style={{ padding: '40px 48px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft, paddingBottom: 12, borderBottom: `1px solid ${SK.ink}` }}>
        <span>About · Inspire College</span>
        <span>Colombo · 100% Online</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, marginTop: 32, alignItems: 'center' }}>
        <div>
          <Annotation style={{ display: 'inline-block', transform: 'rotate(-2deg)', marginBottom: 10 }}>~ who we are ~</Annotation>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 110, fontWeight: 800, lineHeight: 0.88, letterSpacing: -3 }}>
            Democratize<br />education<span style={{ color: SK.accent }}>.</span>
          </div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, color: SK.inkSoft, marginTop: 24, lineHeight: 1.6, maxWidth: 540 }}>
            Sri Lanka&rsquo;s pioneering fully online higher education provider — bridging traditional learning and the digital future. We&rsquo;re more than an institution; we&rsquo;re a catalyst for personal and professional transformation.
          </div>
        </div>
        <Dood dood={[{kind:'sparkle', pos:'tr', size: 38, offset: -10}, {kind:'squiggle', pos:'b', size: 90, offset: -8}]}>
          <RealPhoto src={AB_IMG.heroFigure} h={420} fit="contain" />
        </Dood>
      </div>
    </div>

    {/* Pillars strip */}
    <div style={{ borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {[
        ['Globally aligned', 'Diplomas to master\u2019s, validated by ATHE, WINC, LSBF and Jain University.'],
        ['No geographic barriers', 'Pursue world-class education from anywhere, on your schedule.'],
        ['Industry-relevant', 'Built with expert faculty and real-world curriculum for meaningful careers.'],
      ].map(([t, b], i) => (
        <div key={i} style={{ padding: '28px 28px', borderRight: i < 2 ? `1px solid ${SK.ink}` : 'none' }}>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.accent }}>0{i + 1}</div>
          <Heading size={24} style={{ marginTop: 8 }}>{t}</Heading>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 8, lineHeight: 1.55 }}>{b}</div>
        </div>
      ))}
    </div>

    {/* Chairman feature */}
    <div style={{ padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'center' }}>
      <Dood dood={[{kind:'circle', pos:'tr', size: 120, offset: -30, opacity: 0.7}, {kind:'sparkle', pos:'br', size: 30, offset: -6}]}>
        <RealPhoto src={AB_IMG.steven} h={460} />
      </Dood>
      <div>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.accent }}>— FROM THE CHAIRMAN —</div>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 38, lineHeight: 1.2, marginTop: 14, fontWeight: 600 }}>
          &ldquo;Inspire was built around a simple idea: that affordable, flexible, globally recognised education should be available to every Sri Lankan — wherever they are.&rdquo;
        </div>
        <div style={{ marginTop: 24, fontFamily: 'var(--sk-hand)' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Steven Enderby</div>
          <div style={{ fontSize: 13, color: SK.inkSoft }}>Chairman · 25+ years in private equity, strategy &amp; governance</div>
          <div style={{ fontSize: 13, color: SK.inkSoft, marginTop: 4 }}>Former CEO, Hemas Holdings PLC · Actis LLP · CDC Capital Partners</div>
        </div>
      </div>
    </div>

    {/* Directors grid (3 across) */}
    <div style={{ padding: '0 48px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <Heading size={36}>The directors</Heading>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, color: SK.inkSoft, letterSpacing: 1 }}>03 · BOARD</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
        {BOARD.slice(1).map((p) => (
          <div key={p.name}>
            <RealPhoto src={p.img} h={280} />
            <Heading size={22} style={{ marginTop: 14 }}>{p.name}</Heading>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.accent, marginTop: 4 }}>{p.role.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft, marginTop: 10, lineHeight: 1.55 }}>{p.bio}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Leadership + Faculty in alternating rows */}
    <div style={{ padding: '0 48px 48px', borderTop: `1.5px solid ${SK.ink}` }}>
      <Heading size={36} style={{ marginTop: 36, marginBottom: 22 }}>The team running it</Heading>
      {[...LEADERSHIP, ...FACULTY].map((p, i) => (
        <div key={p.name} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '180px 1fr' : '1fr 180px', gap: 28, padding: '22px 0', borderBottom: `1px solid ${SK.inkSoft}`, alignItems: 'center' }}>
          {i % 2 === 0 && <RealPhoto src={p.img} h={180} />}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 28, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, color: SK.accent }}>{p.role.toUpperCase()}</div>
            </div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 10, lineHeight: 1.6, maxWidth: 720 }}>
              {p.bio || (p.creds && p.creds.join('  \u00b7  '))}
            </div>
          </div>
          {i % 2 === 1 && <RealPhoto src={p.img} h={180} />}
        </div>
      ))}
    </div>

    {/* Values — minimal type-led */}
    <div style={{ padding: '48px 48px 56px', background: SK.accentSoft, borderTop: `1.5px solid ${SK.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <Heading size={40}>What we stand for</Heading>
        <Annotation>six things, in order →</Annotation>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 64px' }}>
        {VALUES.map((v, i) => (
          <div key={v.t} style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 14, alignItems: 'baseline', padding: '20px 0', borderBottom: `1px solid ${SK.ink}` }}>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 14, color: SK.accent }}>0{i + 1}</div>
            <div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 26, fontWeight: 700 }}>{v.t}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 6, lineHeight: 1.55 }}>{v.b}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{ margin: '0 48px 48px', marginTop: 48, background: SK.ink, color: SK.paper, padding: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Heading size={30} style={{ color: SK.paper }}>Ready to learn without limits?</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, opacity: 0.8, marginTop: 6 }}>Talk to an advisor · +94 71 199 3331 · Level 01, Shangri la, Colombo 2</div>
      </div>
      <SkBtn primary arrow>Reserve your seat</SkBtn>
    </div>

    <Footer />
  </div>
);

Object.assign(window, { AboutA, AboutB, ABOUT_W });
