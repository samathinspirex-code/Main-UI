const IC = (path: string) => `https://inspirecollege.lk/wp-content/uploads/${path}`;

export const AB_IMG = {
  heroFigure: IC("2025/10/Gemini_Generated_Image_vwcqbzvwcqbzvwcq-Photoroom.png"),
  whoWeAre: "/about-us-graduates.jpeg",
  steven: IC("2025/09/steven-600x606-1.jpg"),
  dinesh: IC("2025/09/dinesh-600x606-1.jpg"),
  bhanuka: IC("2025/09/bhanuka-600x606-1.jpg"),
  tim: IC("2025/09/tim-600x606-1.jpg"),
  kanishka: IC("2025/09/kanishka-1.png"),
  sumaiya: IC("2025/09/enfk.png"),
  nishadie: "/team/nishadie-gunathilaka.jpeg",
  leandra: "/team/leandra-joseph.jpeg",
} as const;

export interface Person {
  name: string;
  role: string;
  img: string;
  bio?: string;
  creds?: string[];
}

export const BOARD: Person[] = [
  {
    name: "Steven Enderby",
    role: "Chairman",
    img: AB_IMG.steven,
    bio: "A seasoned leader with 25+ years in private equity, strategy and governance. Former CEO of Hemas Holdings PLC, with senior roles at Actis LLP and CDC Capital Partners.",
  },
  {
    name: "Dinesh Kumara",
    role: "Director / CEO",
    img: AB_IMG.dinesh,
    bio: "Founder/CEO of Inspire College and Inspire X. A bootstrapped entrepreneur with 10+ years driving Sri Lanka's digital transformation. Advisory board member of NEDA and ITI.",
  },
  {
    name: "Bhanuka Harischandra",
    role: "Director",
    img: AB_IMG.bhanuka,
    bio: "Sri Lankan entrepreneur and digital strategist. Founder & CGO of Surge Global. Recognised by Forbes 30 Under 30 and Rest of World 100 Changemakers.",
  },
  {
    name: "Tim Edwards",
    role: "Director",
    img: AB_IMG.tim,
    bio: "UK-based higher education marketing strategist with 18+ years of global experience. Former CMO at QS Quacquarelli Symonds.",
  },
];

export const LEADERSHIP: Person[] = [
  {
    name: "Kanishka Liyanage",
    role: "COO",
    img: AB_IMG.kanishka,
    bio: "MBA. Experienced leader in strategic growth, operations and innovation. Skilled in digital transformation and startup mentorship.",
  },
  {
    name: "Sumaiya Iqbal",
    role: "Chief Academic Officer",
    img: AB_IMG.sumaiya,
    bio: "Education and development expert with global experience in youth empowerment, mental health and digital learning.",
  },
];

export const FACULTY: Person[] = [
  {
    name: "M. D. Nishadie Gunathilaka",
    role: "Programme Lead — School of Computing",
    img: AB_IMG.nishadie,
    creds: ["BSc (Special) IT & Management — University of Moratuwa", "MSc IT — University of Moratuwa", "Reading PhD"],
  },
  {
    name: "Leandra Joseph",
    role: "Programme Lead — School of Business",
    img: AB_IMG.leandra,
    creds: ["MSc Business & Org. Psychology (Distinction) — Northampton, UK", "BSc Business & Management — Northumbria, UK", "PGDip Professional Marketing — CIM, UK"],
  },
];

export interface Value { t: string; b: string; icon: string; }

export const VALUES: Value[] = [
  { t: "Industry-Ready Skills", b: "Career-focused programs with real-world training, internships and certifications.", icon: "flask" },
  { t: "Life Skills for Success", b: "Build confidence, communication, leadership, and critical thinking.", icon: "heart" },
  { t: "Affordable Education", b: "Flexible fees, scholarships and online learning for budget-friendly high-quality education.", icon: "user" },
  { t: "Excellence", b: "Rigorous academic standards aligned with global benchmarks.", icon: "star" },
  { t: "Empowerment", b: "Practical skills and professional networks that transform careers.", icon: "grad" },
  { t: "Innovation", b: "Continuously evolving teaching methods and technology to meet modern demands.", icon: "flask" },
];
