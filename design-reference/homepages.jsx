// Homepage wireframe variations for Inspire College
// Real content sourced from inspirecollege.lk

const HOME_W = 1200;
const HOME_H = 1500;

// Real Inspire College assets
const INSPIRE_LOGO = 'https://inspirecollege.lk/wp-content/uploads/2025/09/LeadHype-300-x-80-px-1.png';
const PARTNER_LOGOS = {
  ATHE: 'https://dwf.efc.mybluehost.me/website_8fb955f8/wp-content/uploads/2025/10/Colour-PNG-_No-BackGround_.png',
  LSBF: 'https://dwf.efc.mybluehost.me/website_8fb955f8/wp-content/uploads/2025/10/London_School_of_Business_and_Finance__LSBF__logo-removebg-preview.png',
  WINC: 'https://dwf.efc.mybluehost.me/website_8fb955f8/wp-content/uploads/2025/10/WINC-Logo.png',
  CPD: 'https://dwf.efc.mybluehost.me/website_8fb955f8/wp-content/uploads/2025/10/cpdmember-logo-1-removebg-preview.png',
};

const Logo = ({ height = 36, light = false }) => (
  <img src={RES(INSPIRE_LOGO)} alt="Inspire College" style={{ height, width: 'auto', display: 'block', filter: light ? 'brightness(0) invert(1)' : 'none' }} />
);

// Shared: top nav bar
const TopNav = ({ variant = 'classic' }) => {
  if (variant === 'minimal') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', borderBottom: `1.5px solid ${SK.ink}` }}>
        <Logo height={32} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SkIcon kind="search" size={18} />
          <SkIcon kind="menu" size={22} />
        </div>
      </div>
    );
  }
  if (variant === 'mega') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 48px', background: SK.ink, color: '#fff', fontFamily: 'var(--sk-mono)', fontSize: 11 }}>
          <span>Student Portal  ·  Staff  ·  Alumni</span>
          <span>EN / සි / த</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px' }}>
          <Logo height={40} />
          <div style={{ display: 'flex', gap: 28, fontFamily: 'var(--sk-hand)', fontSize: 15 }}>
            {['ATHE ▾', 'WINC ▾', 'LSBF ▾', 'Jain University ▾', 'Short Courses ▾'].map((l) => (
              <span key={l} style={{ cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SkIcon kind="search" size={18} />
            <SkBtn small primary>Apply Now</SkBtn>
          </div>
        </div>
      </div>
    );
  }
  // classic
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: `1.5px solid ${SK.ink}` }}>
      <Logo height={36} />
      <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--sk-hand)', fontSize: 14 }}>
        {['Programs', 'Admissions', 'About Us', 'News', 'Contact'].map((l) => (<span key={l}>{l}</span>))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <SkIcon kind="search" size={18} />
        <SkBtn small primary>Apply</SkBtn>
      </div>
    </div>
  );
};

// Shared: footer
const FOOTER_LINKS = {
  'Programs': ['ATHE', 'WINC', 'LSBF', 'Jain University', 'Short Courses'],
  'About': ['About Us', 'Our Chairman', 'Partners', 'News & Events'],
  'Apply': ['Foundation', 'HND', 'Top-Up Degree', 'Postgraduate'],
  'Connect': ['Contact Us', 'Student Portal', 'WhatsApp', '+94 71 199 3331'],
};
const Footer = () => (
  <div style={{ background: SK.ink, color: '#e8e2d3', padding: '40px 48px 24px', fontFamily: 'var(--sk-hand)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32 }}>
      <div>
        <Logo height={36} light />
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 14, lineHeight: 1.5 }}>Sri Lanka's first tech-enabled online higher education institution, revolutionizing education through innovation.</div>
        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>Level 01, Shangri la, Colombo 2<br />+94 71 199 3331</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {['globe', 'mail', 'chat'].map((k) => <SkIcon key={k} kind={k} size={18} color="#e8e2d3" />)}
        </div>
      </div>
      {Object.entries(FOOTER_LINKS).map(([h, items]) => (
        <div key={h}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{h}</div>
          {items.map((it) => (
            <div key={it} style={{ fontSize: 13, opacity: 0.65, padding: '3px 0' }}>{it}</div>
          ))}
        </div>
      ))}
    </div>
    <SkLine color="rgba(232,226,211,0.3)" style={{ margin: '28px 0 14px' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.6, fontFamily: 'var(--sk-mono)' }}>
      <span>© 2026 INSPIRE COLLEGE</span>
      <span>PRIVACY · TERMS · ACCESSIBILITY</span>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// Homepage A — Classic hero, centered message, 3-col features
// ════════════════════════════════════════════════════════════
const HomeA = () => (
  <div style={{ width: HOME_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="classic" />
    {/* Hero */}
    <div style={{ padding: '64px 48px 48px', textAlign: 'center', position: 'relative' }}>
      <Annotation style={{ position: 'absolute', top: 80, left: 80, transform: 'rotate(-8deg)' }}>↙ Sri Lanka's first online university</Annotation>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft, marginBottom: 18 }}>· Learn without limits · 100% online ·</div>
      <Heading size={68} style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>Your online<br />university.<br />Start with Foundation,<br />HND, degree, or Master's.</Heading>
      <div style={{ maxWidth: 560, margin: '24px auto 0', fontFamily: 'var(--sk-hand)', fontSize: 17, color: SK.inkSoft, lineHeight: 1.5 }}>
        Globally recognised qualifications validated by ATHE, WINC, LSBF and Jain University — delivered fully online from Colombo.
      </div>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 34 }}>
        <SkBtn primary arrow>Reserve your seat</SkBtn>
        <SkBtn>Talk to an expert</SkBtn>
      </div>
      <div style={{ marginTop: 40 }}>
        <Dood dood={[{kind:'sparkle', pos:'tr', size: 40, offset: -10}, {kind:'asterisk', pos:'bl', size: 22, offset: -4}]}>
          <SkImage h={280} w="100%" label="campus hero · 16:9" />
        </Dood>
      </div>
    </div>

    {/* Quick program search */}
    <div style={{ padding: '0 48px 48px' }}>
      <SkBox h={78} style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 0, height: '100%' }}>
          {[['I want to study', 'e.g. Computing'], ['Level', 'Foundation / HND'], ['Awarding body', 'ATHE · WINC · LSBF']].map(([l, v], i) => (
            <div key={i} style={{ padding: '16px 22px', borderRight: i < 2 ? `1px dashed ${SK.inkSoft}` : 'none' }}>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: SK.inkSoft }}>{l}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, marginTop: 6 }}>{v}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <SkBtn primary arrow>Find program</SkBtn>
          </div>
        </div>
      </SkBox>
    </div>

    {/* Stats strip */}
    <div style={{ padding: '12px 48px 56px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {[['100%', 'online'], ['4', 'UK & Indian partners'], ['from ₨15K', 'short courses'], ['from ₨125K', 'foundation']].map(([n, l], i) => (
        <div key={i} style={{ borderLeft: `2px solid ${SK.accent}`, paddingLeft: 16 }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{n}</div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: SK.inkSoft, marginTop: 6 }}>{l}</div>
        </div>
      ))}
    </div>

    {/* 3 feature blocks */}
    <div style={{ padding: '0 48px 56px' }}>
      <Heading size={32} style={{ marginBottom: 28 }}>Choose your path ↘</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { icon: 'grad', title: 'Foundation', blurb: 'Build essential knowledge and skills for further study and a successful academic journey.', tag: 'From ₨125,000' },
          { icon: 'book', title: 'HND & Degrees', blurb: 'Strong foundation of knowledge and practical skills with HND, Top-Up Degrees and Postgraduate routes.', tag: 'From ₨295,000' },
          { icon: 'brush', title: 'Short Courses', blurb: 'Practical, skill-focused courses — AI Mastery, Digital Marketing, Data Analytics & more.', tag: 'From ₨15,000' },
        ].map((f, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <SkBox h={240} style={{ padding: 0 }}>
              <div style={{ padding: 22, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SkIcon kind={f.icon} size={32} />
                <Heading size={24} style={{ marginTop: 14 }}>{f.title}</Heading>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, color: SK.inkSoft, marginTop: 8, flex: 1 }}>{f.blurb}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SkTag>{f.tag}</SkTag>
                  <SkIcon kind="arrow" size={20} />
                </div>
              </div>
            </SkBox>
          </div>
        ))}
      </div>
    </div>

    {/* Student story + news */}
    <div style={{ padding: '0 48px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
      <div>
        <Heading size={22} style={{ marginBottom: 14 }}>Student stories</Heading>
        <SkBox h={280} style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', height: '100%' }}>
            <SkImage h="100%" w="100%" label="student portrait" radius={0} />
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: SK.accent }}>HND · SOFTWARE ENGINEERING</div>
                <Heading size={22} style={{ marginTop: 10 }}>"I started with no coding<br />background. Now I'm a<br />software developer."</Heading>
                <Scribble lines={3} lineGap={7} style={{ marginTop: 12 }} color={SK.inkSoft} />
              </div>
              <SkBtn small arrow>Read her story</SkBtn>
            </div>
          </div>
        </SkBox>
      </div>
      <div>
        <Heading size={22} style={{ marginBottom: 14 }}>Latest news</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            ['DEC 04', 'Inspire College partners with WINC, UK'],
            ['APR 11', 'Steven Enderby — our new Chairman'],
            ['APR 11', 'Partnership with ATHE, UK awarding body'],
          ].map(([d, t], i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 14px', border: `1.3px solid ${SK.ink}`, borderRadius: 4 }}>
              <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 0.5, width: 50, color: SK.accent }}>{d}</div>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, flex: 1 }}>{t}</div>
              <SkIcon kind="arrow" size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ════════════════════════════════════════════════════════════
// Homepage B — Editorial: oversized type, asymmetric hero
// ════════════════════════════════════════════════════════════
const HomeB = () => (
  <div style={{ width: HOME_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="minimal" />
    {/* Magazine hero */}
    <div style={{ padding: '40px 48px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft, paddingBottom: 12, borderBottom: `1px solid ${SK.ink}` }}>
        <span>Issue Nº 1 · Inspire College</span>
        <span>100% Online · Colombo</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, marginTop: 36 }}>
        <div>
          <Annotation style={{ marginBottom: 10, transform: 'rotate(-2deg)', display: 'inline-block' }}>~ a small manifesto ~</Annotation>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 140, fontWeight: 800, lineHeight: 0.88, letterSpacing: -3, color: SK.ink }}>
            Learn<br />without<br />limits<span style={{ color: SK.accent }}>.</span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
            <SkBtn primary arrow>Reserve your seat</SkBtn>
            <SkBtn>Explore programs</SkBtn>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Dood dood={[{kind:'arrow', pos:'bl', size: 60, offset: -16, rotate: -10}]}>
            <SkImage h={360} label="hero — candid" />
          </Dood>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, lineHeight: 1.5, color: SK.inkSoft, borderLeft: `2px solid ${SK.accent}`, paddingLeft: 14 }}>
            Sri Lanka's first tech-enabled online higher education institution — revolutionising education through innovation, partnership and 100% flexible online delivery.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
            <SkIcon kind="play" size={16} /> Watch our 90-second story
          </div>
        </div>
      </div>
    </div>

    {/* Marquee */}
    <div style={{ borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}`, padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: 'var(--sk-hand)', fontSize: 22, fontWeight: 700 }}>
      {'★  Reserve your seat — first 50 students get HND at ₨295,000  ★  Now partnered with WINC, UK  ★  AI Mastery short course enrolling  ★  100% Online — study from anywhere  ★  '.repeat(2)}
    </div>

    {/* Programs as editorial index */}
    <div style={{ padding: '56px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <Heading size={44}>The programs</Heading>
        <Annotation>48 ways in →</Annotation>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 64px' }}>
        {[
          ['01', 'School of Computing', 'HND · Top-Up · PGDip'],
          ['02', 'School of Business', 'Foundation · HND · PGDip'],
          ['03', 'WINC — UK Top-Up & MBA', 'BSc · MBA · MSc'],
          ['04', 'LSBF — Diplomas', 'Foundation → Advanced Diploma'],
          ['05', 'Jain University — BBA/BCA/MBA/MCA', 'Bachelor & Master degrees'],
          ['06', 'Short Courses & CPD', 'AI · Digital Marketing · Data'],
        ].map(([n, t, c], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 14, alignItems: 'center', padding: '20px 0', borderBottom: `1px solid ${SK.ink}` }}>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 13, color: SK.accent }}>{n}</div>
            <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 28, fontWeight: 700 }}>{t}</div>
            <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, color: SK.inkSoft }}>{c} →</div>
          </div>
        ))}
      </div>
    </div>

    {/* Pull quote */}
    <div style={{ padding: '40px 48px 56px', background: SK.ink, color: SK.paper }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color: SK.accentSoft, marginBottom: 24 }}>— FROM THE CHAIRMAN —</div>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 36, lineHeight: 1.25, fontWeight: 500 }}>
          "Inspire College is built around a simple idea: that affordable, flexible, globally recognised education should be available to every Sri Lankan, no matter where they are."
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 32 }}>
          <SkAvatar size={40} label="SE" />
          <div style={{ textAlign: 'left', fontFamily: 'var(--sk-hand)' }}>
            <div style={{ fontWeight: 700 }}>Steven Enderby</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Chairman, Inspire College</div>
          </div>
        </div>
      </div>
    </div>

    {/* Events + news editorial grid */}
    <div style={{ padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
      <div style={{ gridColumn: 'span 3', marginBottom: 6 }}><Heading size={32}>What's on</Heading></div>
      {[
        { tag: 'NEWS · DEC 04', title: 'Inspire partners with WINC to deliver UK qualifications', img: 'open day' },
        { tag: 'PARTNERSHIP · APR 11', title: 'Now offering ATHE-validated Foundation, HND & PGDip', img: 'lecture' },
        { tag: 'COURSE · NEW', title: 'AI Mastery & Digital Marketing Mastery now enrolling', img: 'exhibit' },
      ].map((e, i) => (
        <div key={i}>
          <SkImage h={200} label={e.img} />
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: SK.accent, marginTop: 12 }}>{e.tag}</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>{e.title}</div>
          <div style={{ marginTop: 10, fontFamily: 'var(--sk-hand)', fontSize: 13, display: 'flex', gap: 6, alignItems: 'center', color: SK.inkSoft }}>Read more <SkIcon kind="arrow" size={14} /></div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ════════════════════════════════════════════════════════════
// Homepage C — Modern SaaS-like: split hero with program finder card
// ════════════════════════════════════════════════════════════
const HomeC = () => (
  <div style={{ width: HOME_W, background: SK.paper, color: SK.ink }}>
    <TopNav variant="mega" />

    {/* Split hero */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: 520 }}>
      <div style={{ padding: '72px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <Annotation style={{ position: 'absolute', top: 48, left: 48, transform: 'rotate(-3deg)' }}>↙ friendly, warm hero</Annotation>
        <SkTag accent>NEW · RESERVE YOUR SEAT</SkTag>
        <Heading size={62} style={{ marginTop: 18 }}>Your turn to<br />learn without<br /><span style={{ color: SK.accent }}>limits</span>.<br />Start today.</Heading>
        <div style={{ maxWidth: 460, marginTop: 22, fontFamily: 'var(--sk-hand)', fontSize: 17, color: SK.inkSoft, lineHeight: 1.5 }}>
          Foundation. HND. Top-Up Degree. Master's.<br />Fully online. Globally recognised. Affordable.
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
          <SkBtn primary arrow>Reserve your seat</SkBtn>
          <SkBtn>Talk to an expert</SkBtn>
        </div>
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex' }}>{[0,1,2,3].map((i) => <div key={i} style={{ marginLeft: i ? -10 : 0 }}><SkAvatar size={32} /></div>)}</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 13, color: SK.inkSoft }}><b style={{ color: SK.ink }}>First 50</b> HND students get ₨295,000 · limited offer</div>
        </div>
      </div>
      <div style={{ padding: '48px 48px 48px 24px', position: 'relative' }}>
        <SkImage h="100%" label="hero — campus life" />
        {/* Floating program finder */}
        <div style={{ position: 'absolute', left: -60, bottom: 32, width: 340 }}>
          <div style={{ background: SK.paper, border: `1.5px solid ${SK.ink}`, borderRadius: 6, padding: 20, boxShadow: '4px 4px 0 rgba(29,26,20,0.15)' }}>
            <div style={{ fontFamily: 'var(--sk-hand)', fontWeight: 700, fontSize: 18, marginBottom: 14 }}>Find your program</div>
            {[['Field of study', 'School of Computing'], ['Level', 'HND'], ['Awarding body', 'ATHE, UK']].map(([l, v], i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 1, color: SK.inkSoft }}>{l.toUpperCase()}</div>
                <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, borderBottom: `1px dashed ${SK.ink}`, paddingBottom: 4, display: 'flex', justifyContent: 'space-between' }}>{v} <span style={{ opacity: 0.5 }}>▾</span></div>
              </div>
            ))}
            <div style={{ marginTop: 16 }}><SkBtn primary fullWidth arrow>Show 5 pathways</SkBtn></div>
          </div>
        </div>
      </div>
    </div>

    {/* Logo strip — awarding partners */}
    <div style={{ padding: '24px 48px', borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}`, display: 'flex', alignItems: 'center', gap: 32 }}>
      <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: SK.inkSoft, flexShrink: 0 }}>Our awarding partners →</div>
      <div style={{ display: 'flex', gap: 36, flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <img src={RES(PARTNER_LOGOS.ATHE)} alt="ATHE" style={{ height: 44, objectFit: 'contain', opacity: 0.85 }} />
        <img src={RES(PARTNER_LOGOS.WINC)} alt="WINC" style={{ height: 44, objectFit: 'contain', opacity: 0.85 }} />
        <img src={RES(PARTNER_LOGOS.LSBF)} alt="LSBF" style={{ height: 44, objectFit: 'contain', opacity: 0.85 }} />
        <span style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, fontWeight: 700, opacity: 0.65 }}>JAIN UNIVERSITY</span>
        <img src={RES(PARTNER_LOGOS.CPD)} alt="CPD" style={{ height: 44, objectFit: 'contain', opacity: 0.85 }} />
      </div>
    </div>

    {/* Why Inspire — three card row with annotations */}
    <div style={{ padding: '64px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36 }}>
        <Heading size={38}>Why Inspire?</Heading>
        <span style={{ fontFamily: 'var(--sk-hand)', fontSize: 15, color: SK.inkSoft }}>Three reasons, honestly →</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { n: '01', t: 'Globally Recognised', b: 'Diplomas, Degrees, and Master’s validated by leading UK awarding bodies — ATHE, WINC, LSBF.', icon: 'globe' },
          { n: '02', t: 'Affordable & Flexible', b: 'Study from anywhere in the world, with payment plans that fit your budget. Short courses from just ₨15,000.', icon: 'user' },
          { n: '03', t: '100% Online', b: 'Attend classes, submit assignments, and graduate fully online — led by expert academics and industry professionals.', icon: 'flask' },
        ].map((f, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{ background: i === 1 ? SK.accent : 'transparent', color: i === 1 ? '#fff' : SK.ink, border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 24, height: 260, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SkIcon kind={f.icon} size={28} color={i === 1 ? '#fff' : SK.ink} />
                <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 12, opacity: 0.6 }}>{f.n}</div>
              </div>
              <Heading size={24} style={{ marginTop: 20, color: i === 1 ? '#fff' : SK.ink }}>{f.t}</Heading>
              <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 14, marginTop: 12, flex: 1, opacity: i === 1 ? 0.9 : 0.7 }}>{f.b}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--sk-hand)', fontSize: 13 }}>Learn more <SkIcon kind="arrow" size={16} color={i === 1 ? '#fff' : SK.ink} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Campus life collage */}
    <div style={{ padding: '0 48px 64px' }}>
      <Heading size={32} style={{ marginBottom: 28 }}>Life on campus</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '180px 180px', gap: 16 }}>
        <div style={{ gridRow: 'span 2' }}><SkImage h="100%" label="library · wide" /></div>
        <SkImage h="100%" label="studio" />
        <SkImage h="100%" label="lab" />
        <SkImage h="100%" label="courtyard" />
        <SkImage h="100%" label="event" />
      </div>
    </div>

    {/* CTA banner */}
    <div style={{ margin: '0 48px 64px', border: `2px solid ${SK.ink}`, borderRadius: 6, padding: 40, background: SK.accentSoft, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Heading size={36}>Reserve your seat before it’s gone</Heading>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 16, color: SK.inkSoft, marginTop: 6 }}>First 50 HND students enroll at ₨295,000 · regular fee ₨400,000.</div>
      </div>
      <SkBtn primary arrow>Reserve now</SkBtn>
    </div>

    <Footer />
  </div>
);

// ════════════════════════════════════════════════════════════
// Homepage D — Bold typographic / experimental
// ════════════════════════════════════════════════════════════
const HomeD = () => (
  <div style={{ width: HOME_W, background: SK.paper, color: SK.ink }}>
    {/* ultra-thin nav */}
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 32px', fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
      <span>INSPIRE / / 100% ONLINE</span>
      <span>PROGRAMS · RESERVE · CONTACT · LOG IN</span>
    </div>
    <SkLine color={SK.ink} thickness={2} />

    {/* Giant type hero - fills most of screen */}
    <div style={{ padding: '40px 32px', position: 'relative' }}>
      <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 260, fontWeight: 800, lineHeight: 0.82, letterSpacing: -8, color: SK.ink }}>INSP<span style={{ color: SK.accent }}>I</span>RE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 36, borderTop: `1.5px solid ${SK.ink}`, paddingTop: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>A — The place</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, marginTop: 8, lineHeight: 1.3 }}>Sri Lanka’s first tech-enabled online higher education institution. Based in Colombo, open to the world.</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>B — The offer</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, marginTop: 8, lineHeight: 1.3 }}>Foundation, HND, Top-Up Degrees and Master’s validated by ATHE, WINC, LSBF and Jain University. 100% online.</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: SK.inkSoft }}>C — The ask</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20, marginTop: 8, lineHeight: 1.3 }}>Reserve your seat. Talk to an advisor on +94 71 199 3331. Start your application today.</div>
          <div style={{ marginTop: 14 }}><SkBtn primary arrow>Begin</SkBtn></div>
        </div>
      </div>
    </div>

    {/* Big alternating list of facts */}
    <div style={{ padding: '24px 32px 32px', borderTop: `1.5px solid ${SK.ink}`, borderBottom: `1.5px solid ${SK.ink}` }}>
      {[
        ['100%', 'ONLINE', 'attend classes, submit assignments, graduate — fully online'],
        ['4', 'PARTNERS', 'ATHE, WINC, LSBF and Jain University'],
        ['₨15K', 'SHORT COURSES', 'AI Mastery, Digital Marketing, Data Analytics & more'],
        ['₨295K', 'HND OFFER', 'first 50 students · regular fee ₨400,000'],
        ['8:30–5', 'OFFICE HOURS', 'Mon–Fri · Level 01, Shangri la, Colombo 2'],
      ].map(([n, l, d], i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '240px 160px 1fr auto', alignItems: 'center', gap: 24, padding: '18px 0', borderBottom: i < 4 ? `1px dashed ${SK.inkSoft}` : 'none' }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 54, fontWeight: 800, lineHeight: 1 }}>{n}</div>
          <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 11, letterSpacing: 2, color: SK.accent }}>{l}</div>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 20 }}>{d}</div>
          <SkIcon kind="arrow" size={22} />
        </div>
      ))}
    </div>

    {/* Brutal program grid */}
    <div style={{ padding: '56px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <Heading size={72} style={{ letterSpacing: -2 }}>Programs.</Heading>
        <div style={{ fontFamily: 'var(--sk-mono)', fontSize: 12, letterSpacing: 2, color: SK.inkSoft }}>20+ · PATHWAYS</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1.5px solid ${SK.ink}` }}>
        {[
          'Foundation in Computing', 'Foundation in Business', 'Foundation in English & Comms', 'Foundation in Stats',
          'HND Software Eng.', 'HND Data Analytics', 'HND Cyber Security', 'HND NetDevOps',
          'HND Computing & AI', 'HND Business Mgmt', 'Higher Dip. Business', 'Diploma Banking & Fin.',
          'Top-Up BSc (UoB)', 'BEng Software Eng.', 'BBA Digital Marketing', 'BBA HR Management',
          'BCA Cyber Security', 'BCA Cloud Computing', 'B.Com Acc. & Finance', 'MBA Project Mgmt',
          'MBA Finance & Analytics', 'MSc Data Analytics', 'MSc Cloud Security', 'PGDip Strategic Mgmt',
        ].map((p, i) => (
          <div key={p} style={{ padding: '18px 16px', borderRight: (i + 1) % 4 !== 0 ? `1px solid ${SK.ink}` : 'none', borderBottom: i < 20 ? `1px solid ${SK.ink}` : 'none', background: i === 4 ? SK.accent : 'transparent', color: i === 4 ? '#fff' : SK.ink, fontFamily: 'var(--sk-hand)', fontSize: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <span>{p}</span>
            <span style={{ fontFamily: 'var(--sk-mono)', fontSize: 10, opacity: 0.6 }}>→</span>
          </div>
        ))}
      </div>
    </div>

    {/* Poster-style CTA */}
    <div style={{ padding: '0 32px 64px' }}>
      <div style={{ background: SK.ink, color: SK.paper, padding: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 140, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
          Reserve<br />your <span style={{ color: SK.accentSoft }}>seat</span>.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 28 }}>
          <div style={{ fontFamily: 'var(--sk-hand)', fontSize: 18, maxWidth: 520, opacity: 0.8 }}>Talk to an expert. Choose the right course. Begin today. — Call +94 71 199 3331 · Mon–Fri 8:30 AM–5 PM.</div>
          <SkBtn primary arrow>Start</SkBtn>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

Object.assign(window, { HomeA, HomeB, HomeC, HomeD, HOME_W, HOME_H, TopNav, Footer });
