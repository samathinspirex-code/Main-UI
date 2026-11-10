// Structured data (JSON-LD) that tells Google who the college is, the site
// name, and how pages relate. This is what search results and sitelinks use.
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function JsonLd({ data }: { data: object }) {
  // Escape "<" so CMS text can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** Rendered once in the root layout. */
export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Inspire College Sri Lanka", "Inspire College LK"],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: "Sri Lanka's first tech-enabled online higher education institution.",
    email: "enrol@inspire.college",
    telephone: "+94711993331",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 01, Shangri-La",
      addressLocality: "Colombo 2",
      addressCountry: "LK",
    },
    sameAs: [
      "https://www.facebook.com/inspirecollege.srilanka",
      "https://www.instagram.com/inspirecollege.srilanka/",
      "https://www.linkedin.com/company/inspirecollege-lk/",
      "https://www.tiktok.com/@inspirecollege.lk",
    ],
  };

  // The WebSite entry sets the site name Google shows above the URL.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Inspire College Sri Lanka",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absolute(item.path),
        })),
      }}
    />
  );
}

/** On each programme page. */
export function CourseJsonLd({ slug, name, description, duration }: { slug: string; name: string; description: string; duration?: string }) {
  const path = `/programs/${slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name,
          description,
          url: absolute(path),
          provider: { "@type": "CollegeOrUniversity", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, sameAs: SITE_URL },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            ...(duration ? { description: `Duration: ${duration}` } : {}),
          },
        }}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Programmes", path: "/programs" }, { name, path }]} />
    </>
  );
}

/** On each news article. */
export function ArticleJsonLd({ slug, title, description, image, date }: { slug: string; title: string; description?: string; image?: string; date?: string }) {
  const path = `/news/${slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: title,
          ...(description ? { description } : {}),
          ...(image ? { image: [image.startsWith("http") ? image : absolute(image)] } : {}),
          ...(date ? { datePublished: date } : {}),
          mainEntityOfPage: absolute(path),
          publisher: { "@id": `${SITE_URL}/#organization` },
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "News & Events", path: "/news" }, { name: title, path }]} />
    </>
  );
}
