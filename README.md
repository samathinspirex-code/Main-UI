# inspire-ui

Next.js (App Router + TypeScript) rebuild of the Inspire College wireframes —
a working site with real navigation and dummy data, ready to be wired up to
a real CMS/backend later.

## Status

All routes are built and every button/link goes somewhere real:

| Route | Variant used | Notes |
|---|---|---|
| `/` | Home A · Classic academic | quick-search is a real GET form → `/programs` |
| `/programs` | A · Filter + results | live filters, search, sort, pagination |
| `/programs/[slug]` | A · Tabs + structured | parametrized for all 16 dummy programs; tabs actually switch |
| `/admissions` | A · Form + stepper | real 4-step flow with client-side state; dummy submit |
| `/about` | A · Classic structured | board/leadership/faculty from real about-us content |
| `/news`, `/news/[slug]` | — | not in the original wireframes; built to match the visual system |
| `/contact` | — | not in the original wireframes; dummy contact form |

## Running it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Folder structure

```
src/
  app/
    layout.tsx              Root layout: Google Fonts via next/font, the
                             "sketchy" SVG wobble filter, globals.css.
    globals.css              CSS vars (--sk-hand, --sk-mono, --sk-accent,
                             --sk-accent-soft), the .sketch-mode filter, and
                             a/button resets (the original had zero real
                             <a>/<button> elements — everything was a
                             styled <span>).
    page.tsx                  "/" → <HomeA />
    programs/page.tsx          "/programs" → <ProgramsA />
    programs/[slug]/page.tsx    "/programs/:slug" → <ProgramDetailA />, statically
                             generated per program via generateStaticParams
    admissions/page.tsx        "/admissions" → <AdmissionsForm />
    about/page.tsx              "/about" → <AboutA />
    news/page.tsx, news/[slug]/page.tsx   listing + detail
    contact/page.tsx            contact info + <ContactForm />

  components/
    sketch/                  Hand-drawn design system, ported from
                             design-reference/sketch-primitives.jsx +
                             doodles.jsx.
      tokens.ts               SK constants, the image-bank lookup (pickImage)
      primitives.tsx          SkBox, SkLine, Scribble, SkImage, SkBtn,
                             SkAvatar, Heading, SkTag, Annotation, SkIcon,
                             Sp, SkDivider. SkBtn now renders a real
                             next/link (href), a real <button>
                             (onClick/type="submit"), or a plain <span>
                             (nothing wired up) depending on what you pass it.
      doodles.tsx              Doodle/Doodles/Dood ornaments

    layout/                  Shared chrome, ported from homepages.jsx
      Logo.tsx, TopNav.tsx, Footer.tsx   every nav/footer link now points
                             at a real route (or tel:/mailto:/wa.me for
                             ones with no page behind them yet)

    home/HomeA.tsx            Homepage content
    programs/                ProgramsA (client — filters/search/sort/
                             pagination), ProgramDetailA (server),
                             ProgramTabs (client shell; content passed
                             in as server-rendered children)
    admissions/AdmissionsForm.tsx   client — 4-step stepper
    about/AboutA.tsx           server — uses src/data/team.ts
    contact/ContactForm.tsx    client — dummy submit → success state

  data/                     Dummy content, shaped so swapping in a real
                             CMS later is a one-file change per module —
                             nothing that reads these knows where the data
                             came from.
    programs.ts               16 programs across Computing/Business/CPD,
                             covering every filter category
    news.ts                    5 articles (3 are the same ones shown in
                             the original Homepage mock, 2 new)
    team.ts                    Board/leadership/faculty — real content
                             from design-reference/about-page.jsx, not
                             invented

design-reference/          The original delivered files, kept for
                             reference. Not built/linted as part of the
                             app (see design-reference/** in
                             eslint.config.mjs). This was a *design
                             exploration tool* showing every layout
                             variant side by side — not a finished site.
```

## Notable conversion decisions

- **Server Components by default.** Interactivity (filters, the admissions
  stepper, tabs, the contact form) lives in small client components; content
  around them stays server-rendered. `/`, `/about`, `/news`, `/contact` and
  every `/programs/[slug]` and `/news/[slug]` page prerender statically.
- **Images.** `next/image` throughout. Remote hosts are allow-listed in
  `next.config.ts` (`images.remotePatterns`) — add a hostname there if a
  future page pulls from somewhere new. `Logo` passes explicit
  `width`/`height` derived from the source asset's real 300×80px size,
  since `next/image` can't do `width: auto`.
- **Fonts** load via `next/font/google` (Kalam, Caveat, Gloria Hallelujah,
  JetBrains Mono) instead of a Google Fonts `<link>` tag.
- **Dropped `Math.random()` from `Scribble`** — caused a hydration mismatch
  under SSR (server and client would render different "random" widths).
  Replaced with a deterministic per-line value that looks the same.
- **Dropped `RES()`** — only did something inside the original's offline
  bundler mode, which doesn't exist here; was a no-op passthrough.
- **Accent color / sketchy filter are constants, not a toggle.** The
  original's "Tweaks" panel (color picker, filter toggle) was design-review
  tooling, not part of the site — its defaults (purple accent, filter on,
  doodles on) are just baked into `globals.css`/`layout.tsx`.
- **Program/News detail pages are data-driven, not hardcoded.** The original
  `DetailA` wireframe only ever showed one specific program (HND Computing &
  AI) with content written directly into the JSX. `ProgramDetailA` now takes
  a `Program` and derives curriculum modules, entry requirements, and
  careers generically from its `school`/`level`, so it works for all 16
  dummy programs. Swap `src/data/programs.ts` for a real CMS fetch and nothing
  in the component needs to change.
- **"Download brochure" links to `/contact`** rather than a real file —
  there's no PDF asset to serve yet. Worth pointing at a real download once
  one exists.
- **No real backend yet.** The admissions stepper and contact form hold
  everything in React state and end in a dummy success screen — there's no
  API route or persistence. Wiring them to a real CMS/backend later means
  replacing the `onClick`/`onSubmit` handlers in `AdmissionsForm.tsx` and
  `ContactForm.tsx` with real requests; the UI/validation around them
  doesn't need to change.
