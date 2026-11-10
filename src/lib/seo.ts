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
    title: "Postgraduate Degrees – Online MBA, MCA & Level 7",
    description:
      "Postgraduate study designed for global careers. Online MBA, MCA and Level 7 diplomas, UK-recognised and flexible. Compare programmes and apply.",
  },
  "/computing-degrees": {
    title: "Computing & IT Degrees – School of Computing",
    description:
      "Software Engineering, AI, Cyber Security & Data Analytics. Foundation to Master's, 100% online from Sri Lanka. Explore the School of Computing.",
  },
  "/short-courses": {
    title: "Short Courses – CPD Certified, 100% Online",
    description:
      "CPD short courses in AI, digital marketing, data and finance. Learn practical skills in weeks, fully online. Browse all short courses.",
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
    title: "About Inspire College – Sri Lanka's Online University",
    description:
      "Sri Lanka's first tech-enabled online higher education institution, partnered with ATHE and WINC UK. Learn about our vision and leadership.",
  },
  "/news": {
    title: "News & Events",
    description:
      "Latest news, partnerships and events from Inspire College, including our ATHE and WINC UK partnerships.",
  },
  "/contact": {
    title: "Contact Us – Free Counselling Session",
    description:
      "Talk to an advisor for free. Call or WhatsApp +94 71 199 3331, email enrol@inspire.college, or visit us at Level 01, Shangri-La, Colombo 2.",
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
  "postgraduate-diploma-in-computing-artificial-intelligence-postgraduate": {
    title: "Study Artificial Intelligence – Postgraduate Diploma in AI (Online)",
    description:
      "Ready to work in AI? Study a Level 7 Postgraduate Diploma in Computing – Artificial Intelligence, 100% online with practical, industry-shaped modules.",
  },
  "hnd-computing-ai": {
    title: "HND in Computing & Artificial Intelligence (Online)",
    description:
      "Study AI online: machine learning, Python and data skills on a UK HND-level pathway. Go from AI student to AI engineer. Apply now.",
  },
  "hnd-computing-software-engineering": {
    title: "HND in Computing – Software Engineering (Online)",
    description:
      "Full-stack and cloud-focused software engineering HND, 100% online. Build, test and deploy real applications. UK-regulated pathway.",
  },
  "hnd-computing-cyber-security": {
    title: "HND in Computing – Cyber Security (Online)",
    description:
      "Learn ethical hacking, network security and digital forensics online on a UK HND-level Cyber Security pathway. Apply today.",
  },
  "hnd-computing-data-analytics": {
    title: "HND in Computing – Data Analytics (Online)",
    description:
      "Master data analysis, visualisation and business intelligence on a 100% online UK HND-level Data Analytics pathway.",
  },
  "foundation-in-information-digital-technologies-foundation": {
    title: "Foundation in Information & Digital Technologies (Online)",
    description:
      "Start your IT career with an online Foundation in Information & Digital Technologies – your pathway into HND and degree study.",
  },
  "foundation-in-business-management-foundation": {
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
