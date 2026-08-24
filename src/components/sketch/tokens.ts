// Design tokens + image bank, ported from design-reference/sketch-primitives.jsx.
// (RES() from the original is dropped: it only resolved images when running
// inside the standalone offline bundler, which this Next.js app isn't.)

export const SK = {
  ink: "#1d1a14",
  inkSoft: "#4a4638",
  paper: "#faf6ee",
  rule: "#2a251e",
  accent: "var(--sk-accent, #3F007C)",
  accentSoft: "var(--sk-accent-soft, #C6B8F0)",
  muted: "#9e978a",
} as const;

const IC = (path: string) => `https://inspirecollege.lk/wp-content/uploads/${path}`;
const U = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// Keyword → image URL. First matching key wins. Order matters (specific → generic).
const IMG_BANK: [string, string][] = [
  // Program detail / catalog tiles — keyed off the labels used in the wireframes
  ["program 1·1", IC("2025/11/13-1-768x397.png")], // HND Software Engineering
  ["program 1·2", IC("2025/11/14-768x397.png")], // HND Data Analytics
  ["program 1·3", IC("2025/11/8-768x397.png")], // HND Cyber Security
  ["program 1·4", IC("2025/11/17-768x397.png")], // HND Computing & AI

  ["program 2·1", IC("2025/11/10-1-768x397.png")], // HND Business Mgmt
  ["program 2·2", IC("2025/11/1-4-768x397.png")], // Foundation Business
  ["program 2·3", IC("2025/12/37-768x397.png")], // Higher Diploma Business
  ["program 2·4", IC("2025/12/31-768x397.png")], // Diploma Banking & Finance

  ["program 3·1", IC("2026/04/Gemini_Generated_Image_gop2mqgop2mqgop2-768x648.png")], // AI Mastery
  ["program 3·2", IC("2026/04/WhatsApp-Image-2026-04-06-at-15.05.40-768x648.jpeg")], // Digital Marketing
  ["program 3·3", IC("2025/12/7-1.png")], // Data Analytics with Google
  ["program 3·4", IC("2025/12/2-1.png")], // AI for Marketing

  // Program-detail page hero
  ["program · hero", IC("2025/11/17-768x397.png")],

  // Hero — campus shots
  ["campus hero", IC("2025/10/Home-page-image-3.png")],
  ["hero — campus life", IC("2025/10/Home-page-image-3.png")],
  ["hero — campus", IC("2025/10/Home-page-image-3.png")],
  ["hero — candid", IC("2025/12/Gemini_Generated_Image_7avc697avc697avc-Photoroom.png")],
  ["hero", IC("2025/10/Home-page-image-3.png")],

  // News / events — real Inspire posts
  ["open day", IC("2025/12/build-your-future-with-inspire-collage-and-WINC-1024x532.png")],
  ["lecture", IC("2024/04/London-School-of-Business-and-Finance-is-in-Sri-Lanka-Now-scaled-1-1024x555.png")],
  ["exhibit", IC("2024/04/BLOG-POST-STEVE-AS-A-CHIRMAN-1024x555.jpg")],
  ["event", IC("2025/12/build-your-future-with-inspire-collage-and-WINC-1024x532.png")],

  // Stock fallbacks for generic placeholders
  ["students · studio", U("1522202176988-66273c2fd55f", 1400, 600)],
  ["library · wide", U("1521587760476-6c12a4b040da", 800, 600)],
  ["library", U("1521587760476-6c12a4b040da", 800, 600)],
  ["studio", U("1558655146-9f40138edfeb", 600, 400)],
  ["lab", U("1581094288338-2314dddb7ece", 600, 400)],
  ["courtyard", U("1541339907198-e08756dedf3f", 600, 400)],
  ["campus", U("1541339907198-e08756dedf3f", 600, 400)],
  ["student portrait", U("1494790108377-be9c29b29330", 600, 800)],
  ["portrait", U("1531123897727-8f129e1688ce", 400, 500)],
];

export const pickImage = (label?: string | null): string | null => {
  if (!label) return null;
  const l = String(label).toLowerCase();
  for (const [k, src] of IMG_BANK) if (l.includes(k.toLowerCase())) return src;
  return null;
};
