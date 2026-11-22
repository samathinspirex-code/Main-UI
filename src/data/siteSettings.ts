export type Announcement = { text: string; link: string };

/** A home page hero slide as the CMS stores it (only Active slides reach the website). */
export type CmsHeroSlide = {
  id: string;
  tag: string;
  title: string;
  title_highlight: string;
  title_break: boolean;
  title_single_line: boolean;
  subtitle: string;
  description: string;
  benefits: string[];
  primary_label: string;
  primary_link: string;
  secondary_label: string;
  secondary_link: string;
  image: string;
  image_alt: string;
  badge_top: string;
  badge_bottom_eyebrow: string;
  badge_bottom_value: string;
};

export type PromoBanner = { desktopImage: string; mobileImage: string; alt: string; link: string };

export type SiteSettings = {
  christmasTheme: boolean;
  announcement: Announcement | null;
  /** null: the API sent no slides (older API or never reached), so the website keeps its built-in slides. */
  heroSlides: CmsHeroSlide[] | null;
  /** undefined: not sent, keep the built-in banner. null: switched off in the CMS. */
  promoBanner: PromoBanner | null | undefined;
};

const str = (value: unknown) => (typeof value === "string" ? value : "");

function readSlides(value: unknown): CmsHeroSlide[] | null {
  if (!Array.isArray(value)) return null;
  const slides = value
    .filter((slide) => slide && typeof slide === "object" && str(slide.image) && (str(slide.title) + str(slide.title_highlight)).trim())
    .map((slide, index): CmsHeroSlide => ({
      id: str(slide.id) || `slide-${index}`,
      tag: str(slide.tag),
      title: str(slide.title),
      title_highlight: str(slide.title_highlight),
      title_break: Boolean(slide.title_break),
      title_single_line: Boolean(slide.title_single_line),
      subtitle: str(slide.subtitle),
      description: str(slide.description),
      benefits: Array.isArray(slide.benefits) ? slide.benefits.map(str).filter(Boolean) : [],
      primary_label: str(slide.primary_label),
      primary_link: str(slide.primary_link),
      secondary_label: str(slide.secondary_label),
      secondary_link: str(slide.secondary_link),
      image: str(slide.image),
      image_alt: str(slide.image_alt),
      badge_top: str(slide.badge_top),
      badge_bottom_eyebrow: str(slide.badge_bottom_eyebrow),
      badge_bottom_value: str(slide.badge_bottom_value),
    }));
  return slides.length ? slides : null;
}

function readBanner(value: unknown): PromoBanner | null | undefined {
  if (!value || typeof value !== "object") return undefined;
  const banner = value as Record<string, unknown>;
  if (!banner.enabled || !str(banner.desktop_image)) return null;
  return { desktopImage: str(banner.desktop_image), mobileImage: str(banner.mobile_image), alt: str(banner.alt), link: str(banner.link) };
}

const API_BASE_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const OFF: SiteSettings = { christmasTheme: false, announcement: null, heroSlides: null, promoBanner: undefined };

/** Last settings the API gave us. A slow, restarting or briefly unreachable API keeps these instead of switching everything off. */
let lastGood: SiteSettings | null = null;

/** Website-wide CMS switches. Refreshes every 60s; if the API can't answer, the last known settings stay (off only if never loaded). */
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/site-settings`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) return lastGood ?? OFF;
    const data = await response.json();
    const text = typeof data?.announcement_text === "string" ? data.announcement_text.trim() : "";
    const link = typeof data?.announcement_link === "string" && data.announcement_link.trim() ? data.announcement_link.trim() : "/programs";
    lastGood = {
      christmasTheme: Boolean(data?.christmas_theme),
      announcement: data?.announcement_enabled && text ? { text, link } : null,
      heroSlides: readSlides(data?.hero_slides),
      promoBanner: readBanner(data?.promo_banner),
    };
    return lastGood;
  } catch {
    return lastGood ?? OFF;
  }
}
