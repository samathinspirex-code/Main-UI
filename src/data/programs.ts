export type ProgramLevel = "Foundation" | "HND" | "Higher Diploma" | "Diploma" | "Top-Up Degree" | "Postgraduate" | "Short Course";
export type School = "Computing" | "Business" | "CPD";
export type AwardingBody = "ATHE" | "WINC" | "LSBF" | "Jain";

export interface Topic { topic_id: number; program_id: number; order: number; topic: string; }
export interface Outcome { outcome_id: number; program_id: number; order: number; outcome: string; }

export interface Program {
  slug: string;
  title: string;
  level: ProgramLevel;
  school: School;
  awardingBody: AwardingBody;
  code: string;
  duration: string;
  priceFrom: number;
  tag?: string;
  icon: string;
  imageLabel: string;
  imageUrl?: string;
  blurb: string;
  popularity: number;
  topics?: Topic[];
  outcomes?: Outcome[];
}

const IC = (path: string) => `https://inspirecollege.lk/wp-content/uploads/${path}`;
const U = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const PROGRAM_IMAGES: Record<string, string> = {
  "program 1·1": IC("2025/11/13-1-768x397.png"),
  "program 1·2": IC("2025/11/14-768x397.png"),
  "program 1·3": IC("2025/11/8-768x397.png"),
  "program 1·4": IC("2025/11/17-768x397.png"),
  "program 2·1": IC("2025/11/10-1-768x397.png"),
  "program 2·2": IC("2025/11/1-4-768x397.png"),
  "program 2·3": IC("2025/12/37-768x397.png"),
  "program 2·4": IC("2025/12/31-768x397.png"),
  "program 3·1": IC("2026/04/Gemini_Generated_Image_gop2mqgop2mqgop2-768x648.png"),
  "program 3·2": IC("2026/04/WhatsApp-Image-2026-04-06-at-15.05.40-768x648.jpeg"),
  "program 3·3": IC("2025/12/7-1.png"),
  "program 3·4": IC("2025/12/2-1.png"),
  "library": U("1521587760476-6c12a4b040da", 800, 600),
  "lab": U("1581094288338-2314dddb7ece", 600, 400),
  "courtyard": U("1541339907198-e08756dedf3f", 600, 400),
  "students · studio": U("1522202176988-66273c2fd55f", 1400, 600),
};

export function getProgramImage(label: string): string {
  for (const [key, src] of Object.entries(PROGRAM_IMAGES)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return src;
  }
  return U("1522202176988-66273c2fd55f", 800, 500);
}

export const PROGRAMS: Program[] = [
  {
    slug: "hnd-computing-software-engineering",
    title: "HND in Computing (Software Engineering)",
    level: "HND", school: "Computing", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    tag: "Most popular", icon: "code", imageLabel: "program 1·1",
    blurb: "Build production-grade software: full-stack engineering, data structures, and applied project work, delivered fully online with live tutor support.",
    popularity: 100,
  },
  {
    slug: "hnd-computing-ai",
    title: "HND in Computing & AI",
    level: "HND", school: "Computing", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    tag: "New", icon: "flask", imageLabel: "program 1·4",
    blurb: "Strong foundations in computing, machine learning and applied AI — delivered fully online with live tutor support.",
    popularity: 95,
  },
  {
    slug: "hnd-computing-data-analytics",
    title: "HND in Computing (Data Analytics)",
    level: "HND", school: "Computing", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    icon: "flask", imageLabel: "program 1·2",
    blurb: "Turn raw data into decisions: statistics, visualization and applied analytics tooling, with a capstone project assessed by ATHE.",
    popularity: 80,
  },
  {
    slug: "hnd-computing-cyber-security",
    title: "HND in Computing (Cyber Security)",
    level: "HND", school: "Computing", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    icon: "building", imageLabel: "program 1·3",
    blurb: "Defend systems and networks: security fundamentals, ethical hacking and risk management, taught by industry practitioners.",
    popularity: 70,
  },
  {
    slug: "hnd-computing-netdevops",
    title: "HND in Computing (NetDevOps)",
    level: "HND", school: "Computing", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    icon: "code", imageLabel: "lab",
    blurb: "Networking meets DevOps: infrastructure, automation and CI/CD pipelines for modern cloud-native teams.",
    popularity: 60,
  },
  {
    slug: "hnd-business-management",
    title: "HND in Business Management",
    level: "HND", school: "Business", awardingBody: "ATHE",
    code: "ATHE · L5", duration: "12–18 months", priceFrom: 295000,
    tag: "First 50 · ₨295K", icon: "building", imageLabel: "program 2·1",
    blurb: "Core management, marketing, finance and operations — a broad business foundation that progresses straight into a UK Top-Up degree.",
    popularity: 85,
  },
  {
    slug: "foundation-business-management",
    title: "Foundation in Business & Management",
    level: "Foundation", school: "Business", awardingBody: "ATHE",
    code: "ATHE · L3", duration: "6–9 months", priceFrom: 125000,
    icon: "grad", imageLabel: "program 2·2",
    blurb: "Build essential knowledge and study skills for further study and a successful academic journey into HND or degree study.",
    popularity: 50,
  },
  {
    slug: "higher-diploma-business-studies",
    title: "Higher Diploma in Business Studies",
    level: "Higher Diploma", school: "Business", awardingBody: "LSBF",
    code: "LSBF · UK", duration: "9–12 months", priceFrom: 175000,
    icon: "building", imageLabel: "program 2·3",
    blurb: "A broad, practical grounding in business studies awarded by LSBF, UK — built for working professionals.",
    popularity: 40,
  },
  {
    slug: "diploma-banking-finance",
    title: "Diploma in Banking & Finance",
    level: "Diploma", school: "Business", awardingBody: "LSBF",
    code: "LSBF · UK", duration: "6–9 months", priceFrom: 150000,
    icon: "building", imageLabel: "program 2·4",
    blurb: "Core banking, finance and risk fundamentals for a career in Sri Lanka's financial sector.",
    popularity: 35,
  },
  {
    slug: "topup-bsc-computing",
    title: "Top-Up BSc (Hons) Computing",
    level: "Top-Up Degree", school: "Computing", awardingBody: "WINC",
    code: "WINC · UK", duration: "12 months", priceFrom: 350000,
    icon: "code", imageLabel: "library",
    blurb: "Complete your HND with a UK Bachelor's (Hons) degree, awarded by WINC — studied fully online from Colombo.",
    popularity: 55,
  },
  {
    slug: "topup-ba-business",
    title: "Top-Up BA (Hons) Business",
    level: "Top-Up Degree", school: "Business", awardingBody: "WINC",
    code: "WINC · UK", duration: "12 months", priceFrom: 350000,
    icon: "building", imageLabel: "courtyard",
    blurb: "Convert your HND or Higher Diploma into a UK Bachelor's (Hons) in Business, awarded by WINC.",
    popularity: 45,
  },
  {
    slug: "mba-jain",
    title: "MBA — Jain University",
    level: "Postgraduate", school: "Business", awardingBody: "Jain",
    code: "Jain University", duration: "18–24 months", priceFrom: 450000,
    icon: "grad", imageLabel: "students · studio",
    blurb: "A globally recognised Master's in Business Administration from Jain University, delivered live online for working professionals.",
    popularity: 65,
  },
  {
    slug: "ai-mastery",
    title: "AI Mastery",
    level: "Short Course", school: "CPD", awardingBody: "ATHE",
    code: "Short Course · CPD", duration: "4–6 weeks", priceFrom: 15000,
    icon: "brush", imageLabel: "program 3·1",
    blurb: "A practical, hands-on introduction to using AI tools in real work — no coding background required.",
    popularity: 90,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    level: "Short Course", school: "CPD", awardingBody: "ATHE",
    code: "Short Course · CPD", duration: "4–6 weeks", priceFrom: 15000,
    icon: "brush", imageLabel: "program 3·2",
    blurb: "Social, search and content marketing fundamentals, with a portfolio-ready campaign project.",
    popularity: 75,
  },
  {
    slug: "data-analytics-google",
    title: "Data Analytics with Google",
    level: "Short Course", school: "CPD", awardingBody: "ATHE",
    code: "Short Course · CPD", duration: "4–6 weeks", priceFrom: 15000,
    icon: "flask", imageLabel: "program 3·3",
    blurb: "Google's data analytics curriculum, adapted into a fast-paced short course with a certificate on completion.",
    popularity: 60,
  },
  {
    slug: "ai-for-marketing",
    title: "AI for Marketing",
    level: "Short Course", school: "CPD", awardingBody: "ATHE",
    code: "Short Course · CPD", duration: "4–6 weeks", priceFrom: 15000,
    icon: "brush", imageLabel: "program 3·4",
    blurb: "Apply AI tools to campaign planning, content generation and performance analysis.",
    popularity: 55,
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function formatLKR(amount: number): string {
  return `₨${amount.toLocaleString("en-LK")}`;
}

interface ApiProgram {
  slug: string;
  title: string;
  level: string;
  school: string;
  awarding_body: string;
  code: string;
  duration: string;
  price_from: number;
  tag: string | null;
  icon: string;
  image_label: string;
  image_url?: string | null;
  blurb: string;
  popularity: number;
  topics?: Topic[];
  outcomes?: Outcome[];
}

const API_BASE_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

function mapApiProgramToUi(api: ApiProgram): Program {
  return {
    slug: api.slug,
    title: api.title,
    level: api.level as ProgramLevel,
    school: api.school as School,
    awardingBody: api.awarding_body as AwardingBody,
    code: api.code,
    duration: api.duration,
    priceFrom: api.price_from,
    tag: api.tag || undefined,
    icon: api.icon,
    imageLabel: api.image_label,
    imageUrl: api.image_url || undefined,
    blurb: api.blurb,
    popularity: api.popularity,
    topics: api.topics,
    outcomes: api.outcomes,
  };
}

export async function fetchPrograms(): Promise<Program[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/programs`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Programme API returned ${response.status}`);
    const payload = (await response.json()) as { data: ApiProgram[] };
    return payload.data.map(mapApiProgramToUi);
  } catch (error) {
    console.error("Unable to load programmes from the API; using the bundled catalogue.", error);
    return PROGRAMS;
  }
}

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/programs/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Programme API returned ${response.status}`);
    return mapApiProgramToUi((await response.json()) as ApiProgram);
  } catch (error) {
    console.error(`Unable to load programme ${slug} from the API; using the bundled catalogue.`, error);
    return getProgramBySlug(slug) ?? null;
  }
}
