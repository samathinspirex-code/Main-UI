const IC = (path: string) => `https://inspirecollege.lk/wp-content/uploads/${path}`;

export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const NEWS: NewsItem[] = [
  {
    slug: "winc-partnership",
    date: "2025-12-04",
    title: "Inspire College partners with WINC, UK",
    category: "Partnership",
    image: IC("2025/12/build-your-future-with-inspire-collage-and-WINC-1024x532.png"),
    excerpt: "A new partnership with WINC opens a Top-Up route to a UK Bachelor's degree for every HND graduate.",
    body: [
      "Inspire College has entered a new partnership with WINC (UK), giving HND graduates a direct Top-Up route to a fully accredited UK Bachelor's (Hons) degree — without leaving Colombo.",
      "The partnership covers both the School of Computing and School of Business, and the first Top-Up cohorts are expected to begin within the year.",
    ],
  },
  {
    slug: "steven-enderby-chairman",
    date: "2026-04-11",
    title: "Steven Enderby — our new Chairman",
    category: "Leadership",
    image: IC("2024/04/BLOG-POST-STEVE-AS-A-CHIRMAN-1024x555.jpg"),
    excerpt: "25+ years in private equity, strategy and governance — Steven Enderby joins Inspire College as Chairman.",
    body: [
      "Inspire College is pleased to welcome Steven Enderby as Chairman of the Board. Steven brings 25+ years of leadership experience across private equity, strategy and governance, including as former CEO of Hemas Holdings PLC.",
      '"Inspire was built around a simple idea: that affordable, flexible, globally recognised education should be available to every Sri Lankan — wherever they are," Steven said.',
    ],
  },
  {
    slug: "athe-partnership",
    date: "2026-04-11",
    title: "Partnership with ATHE, UK awarding body",
    category: "Partnership",
    image: IC("2024/04/London-School-of-Business-and-Finance-is-in-Sri-Lanka-Now-scaled-1-1024x555.png"),
    excerpt: "ATHE-validated HND programs are now live across the School of Computing and School of Business.",
    body: [
      "Inspire College's HND programs are now validated by ATHE (UK), an Ofqual-regulated awarding body — giving students a globally recognised qualification at Level 5.",
      "The first ATHE-validated intake covers five Computing pathways and two Business pathways, all delivered 100% online.",
    ],
  },
  {
    slug: "open-day-2026",
    date: "2026-05-20",
    title: "Inspire College Open Day — book your spot",
    category: "Events",
    image: IC("2025/12/build-your-future-with-inspire-collage-and-WINC-1024x532.png"),
    excerpt: "Meet faculty, tour the online learning platform, and get your questions answered live.",
    body: [
      "Join our next Open Day for a live walkthrough of the online learning platform, a Q&A with faculty from the School of Computing and School of Business, and a look at the first-50 HND enrollment offer.",
      "Sessions run online — register through the Admissions page and an advisor will send you the link.",
    ],
  },
  {
    slug: "first-50-hnd-cohort",
    date: "2026-06-02",
    title: "First 50 HND students enroll at ₨295,000",
    category: "Admissions",
    image: IC("2025/12/build-your-future-with-inspire-collage-and-WINC-1024x532.png"),
    excerpt: "A limited-time offer for the first 50 HND students, before the fee returns to ₨400,000.",
    body: [
      "The first 50 students to enroll in any ATHE-validated HND program will lock in a fee of ₨295,000 — a ₨105,000 saving on the regular ₨400,000 fee.",
      "Seats are allocated on a first-come, first-served basis once an application is confirmed by an advisor.",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}

interface ApiNewsEvent {
  slug: string;
  title: string;
  kind: "News" | "Event";
  category: string;
  image_url: string;
  excerpt: string;
  content: string[];
  published_on: string | null;
  event_date: string | null;
  created_at: string;
}

const API_BASE_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

function mapApiNewsEvent(item: ApiNewsEvent): NewsItem {
  return {
    slug: item.slug,
    date: item.event_date || item.published_on || item.created_at.slice(0, 10),
    title: item.title,
    category: item.category || item.kind,
    image: item.image_url,
    excerpt: item.excerpt,
    body: item.content,
  };
}

export async function fetchNewsEvents(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/news-events`, { cache: "no-store" });
    if (!response.ok) throw new Error(`News API returned ${response.status}`);
    const payload = (await response.json()) as { data: ApiNewsEvent[] };
    return payload.data.map(mapApiNewsEvent);
  } catch (error) {
    console.error("Unable to load news from the API; using bundled news.", error);
    return NEWS;
  }
}

export async function fetchNewsEventBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/news-events/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (response.status === 404) {
      const items = await fetchNewsEvents();
      return items.find((item) => item.slug === slug) ?? null;
    }
    if (!response.ok) throw new Error(`News API returned ${response.status}`);
    return mapApiNewsEvent((await response.json()) as ApiNewsEvent);
  } catch (error) {
    console.error(`Unable to load news item ${slug} from the API; using bundled news.`, error);
    return getNewsBySlug(slug) ?? null;
  }
}

export function formatNewsDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", day: "2-digit" }).toUpperCase().replace(",", "");
}
