export type Announcement = { text: string; link: string };
export type SiteSettings = { christmasTheme: boolean; announcement: Announcement | null };

const API_BASE_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const OFF: SiteSettings = { christmasTheme: false, announcement: null };

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
    };
    return lastGood;
  } catch {
    return lastGood ?? OFF;
  }
}
