"use client";

// Tab shell for the program detail page. The original's tabs (Overview,
// Curriculum, Faculty, Careers, Fees & Aid, Apply) were static markup with
// "Curriculum" hardcoded as the only visible pane — this makes them real.
// Content for each tab is server-rendered JSX passed in as a prop, so this
// client component only owns the switching, not the content.
import { useState, type ReactNode } from "react";
import { SK } from "@/components/sketch/tokens";

export interface ProgramTab {
  id: string;
  label: string;
  content: ReactNode;
}

export function ProgramTabs({ tabs, defaultTab }: { tabs: ProgramTab[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div style={{ padding: "0 48px", borderBottom: `1.5px solid ${SK.ink}`, display: "flex", gap: 28, fontFamily: "var(--sk-hand)", fontSize: 15 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            style={{
              padding: "14px 2px",
              border: "none",
              background: "none",
              borderBottom: t.id === activeTab?.id ? `3px solid ${SK.accent}` : "3px solid transparent",
              fontWeight: t.id === activeTab?.id ? 700 : 500,
              color: t.id === activeTab?.id ? SK.accent : SK.ink,
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {activeTab?.content}
    </>
  );
}
