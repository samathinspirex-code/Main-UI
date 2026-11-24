// One place for the site's search titles and descriptions. Short, specific
// descriptions are what Google shows under results and sitelinks.
import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://inspirecollege.lk").replace(/\/+$/, "");
export const SITE_NAME = "Inspire College";

type PageSeo = { title: string; description: string };

/** Fixed pages. Programme and news pages come from the CMS (see below). */
export const PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Inspire College Sri Lanka | Online UK Qualifications – Foundation, HND & Degrees",
    description:
      "Study 100% online with Inspire College Sri Lanka. UK-recognised ATHE, WINC & Jain University qualifications in AI, Computing & Business. Apply now.",
  },

  // ---- Sitelink landing pages (each shows the programmes list pre-filtered) ----
  "/postgraduate-degrees": {
    title: "Postgraduate Degrees",
    description:
      "Take your career further with an online MBA, MCA, MSc or Level 7 diploma from WINC, ATHE or Jain University, studied alongside your job.",
  },
  "/computing-degrees": {
    title: "Computing & IT Degrees",
    description:
      "Become a software engineer, AI specialist or data analyst. Computing qualifications from Foundation to Master's, built around real industry projects.",
  },
  "/hnd-courses": {
    title: "HND Courses",
    description:
      "Finished your A/Ls? Earn a UK HND in two years in AI, software engineering, cyber security, accounting or law, then top up to a full degree.",
  },
  "/business-degrees": {
    title: "Business Degrees",
    description:
      "Prepare to lead in management, finance, marketing or HR with a BBA, B.Com, MBA, top-up degree or business HND recognised in the UK and India.",
  },
  "/short-courses": {
    title: "Short Courses",
    description:
      "Gain a job-ready skill in 4 to 12 weeks. CPD-certified courses in AI tools, digital marketing, data and personal finance for working professionals.",
  },
  "/programs": {
    title: "Programmes – Foundation, HND, Top-Up Degree & Master's",
    description:
      "Explore 100% online Foundation, HND, Top-Up Degree, Master's and short courses in Computing, AI and Business. UK-recognised, flexible study.",
  },
  "/admissions": {
    title: "Admissions – Apply Online",
    description:
      "Apply to Inspire College in minutes. Tell us what you want to study and a free advisor will guide you through entry requirements and fees.",
  },
  "/about": {
    title: "About Us – Sri Lanka's First Tech-Enabled Online College",
    description:
      "Meet the team behind Inspire College: our story, vision, leadership board and UK partners ATHE and WINC. Based at Shangri-La, Colombo.",
  },
  "/news": {
    title: "News & Events",
    description:
      "Latest news, partnerships and events from Inspire College, including our ATHE and WINC UK partnerships.",
  },
  "/contact": {
    title: "Free Counselling Session",
    description:
      "Not sure which course is right for you? Speak to an advisor free of charge by phone, WhatsApp or in person at our Colombo office.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "How Inspire College collects, uses and protects your personal information.",
  },
  "/refund-policy": {
    title: "Refund Policy",
    description: "Inspire College's refund policy for course fees and payments.",
  },
  "/terms-conditions": {
    title: "Terms & Conditions",
    description: "The terms and conditions for studying with and using the services of Inspire College.",
  },
};

/**
 * Hand-written search copy for programme pages, keyed by CMS slug. A programme
 * not listed here falls back to its CMS title and blurb.
 */
export const PROGRAM_SEO: Record<string, PageSeo> = {
  "international-foundation-diploma": {
    title: "International Foundation Diploma in Business & ICT (LSBF)",
    description:
      "LSBF General Foundation in Business and ICT, studied online from Sri Lanka. A first step into diploma and degree study after O/Ls.",
  },
  "postgraduate-diploma-in-computing-artificial-intelligence": {
    title: "Study Artificial Intelligence – Postgraduate Diploma in AI (Online)",
    description:
      "Ready to work in AI? Study a Level 7 Postgraduate Diploma in Computing – Artificial Intelligence, 100% online with practical, industry-shaped modules.",
  },
  "hnd-in-artificial-intelligence": {
    title: "HND in Artificial Intelligence (Online)",
    description:
      "Study AI online: machine learning, Python and data skills on a UK HND-level pathway. Go from AI student to AI engineer. Apply now.",
  },
  "hnd-in-computing-software-engineering-software-developer-pathway": {
    title: "HND in Computing – Software Engineering (Online)",
    description:
      "Full-stack and cloud-focused software engineering HND, 100% online. Build, test and deploy real applications. UK-regulated pathway.",
  },
  "hnd-in-computing-cyber-security-technologist-pathway": {
    title: "HND in Computing – Cyber Security (Online)",
    description:
      "Learn ethical hacking, network security and digital forensics online on a UK HND-level Cyber Security pathway. Apply today.",
  },
  "hnd-in-computing-data-analytics-data-technologist-pathway": {
    title: "HND in Computing – Data Analytics (Online)",
    description:
      "Master data analysis, visualisation and business intelligence on a 100% online UK HND-level Data Analytics pathway.",
  },
  "foundation-in-information-digital-technologies": {
    title: "Foundation in Information & Digital Technologies (Online)",
    description:
      "Start your IT career with an online Foundation in Information & Digital Technologies – your pathway into HND and degree study.",
  },
  "foundation-in-business-management": {
    title: "Foundation in Business Management (Online)",
    description:
      "Online Foundation in Business Management – a flexible first step toward HND and top-up degrees in business. UK-recognised.",
  },
};

/** Trim free text to a search-snippet length without cutting a word in half. */
export function snippet(text: string | undefined | null, max = 160): string | undefined {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return undefined;
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length)}…`;
}

/** Build page metadata: title, description, canonical URL and social previews. */
export function buildMetadata(path: string, seo: { title: string; description?: string }, opts: { absoluteTitle?: boolean; type?: "website" | "article" } = {}): Metadata {
  return {
    // Home uses an absolute title; other pages get " | Inspire College" from the layout template.
    title: opts.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: { title: seo.title, description: seo.description, url: path, type: opts.type ?? "website", siteName: SITE_NAME, locale: "en_LK" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

/** For fixed pages:  export const metadata = pageMetadata("/about"); */
export function pageMetadata(path: keyof typeof PAGES & string): Metadata {
  return buildMetadata(path, PAGES[path], { absoluteTitle: path === "/" });
}
