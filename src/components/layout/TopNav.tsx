// Shared top nav bar, ported from design-reference/homepages.jsx. The
// original nav items were plain <span>s with no destination — now real
// next/link routes so the "buttons" are actually clickable.
import Link from "next/link";
import { SK } from "@/components/sketch/tokens";
import { SkIcon, SkBtn } from "@/components/sketch/primitives";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const MEGA_LINKS = [
  { label: "ATHE ▾", href: "/programs?body=ATHE" },
  { label: "WINC ▾", href: "/programs?body=WINC" },
  { label: "LSBF ▾", href: "/programs?body=LSBF" },
  { label: "Jain University ▾", href: "/programs?body=Jain" },
  { label: "Short Courses ▾", href: "/programs?level=Short+Course" },
];

export function TopNav({ variant = "classic" }: { variant?: "classic" | "minimal" | "mega" }) {
  if (variant === "minimal") {
    return (
      <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: `1.5px solid ${SK.ink}` }}>
        <Link href="/">
          <Logo height={32} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Link href="/programs" aria-label="Search programs">
            <SkIcon kind="search" size={18} />
          </Link>
          <SkIcon kind="menu" size={22} />
        </div>
      </nav>
    );
  }
  if (variant === "mega") {
    return (
      <nav aria-label="Primary">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 48px", background: SK.ink, color: "#fff", fontFamily: "var(--sk-mono)", fontSize: 11 }}>
          <span>Student Portal  ·  Staff  ·  Alumni</span>
          <span>EN / සි / த</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px" }}>
          <Link href="/">
            <Logo height={40} />
          </Link>
          <div style={{ display: "flex", gap: 28, fontFamily: "var(--sk-hand)", fontSize: 15 }}>
            {MEGA_LINKS.map((l) => (
              <Link key={l.label} href={l.href} style={{ cursor: "pointer" }}>
                {l.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/programs" aria-label="Search programs">
              <SkIcon kind="search" size={18} />
            </Link>
            <SkBtn small primary href="/admissions">Apply Now</SkBtn>
          </div>
        </div>
      </nav>
    );
  }
  // classic
  return (
    <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: `1.5px solid ${SK.ink}` }}>
      <Link href="/">
        <Logo height={36} />
      </Link>
      <div style={{ display: "flex", gap: 24, fontFamily: "var(--sk-hand)", fontSize: 14 }}>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Link href="/programs" aria-label="Search programs">
          <SkIcon kind="search" size={18} />
        </Link>
        <SkBtn small primary href="/admissions">Apply</SkBtn>
      </div>
    </nav>
  );
}
