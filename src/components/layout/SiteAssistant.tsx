"use client";

// Floating chat assistant, rendered once from the root layout. Each question is
// sent with the current page's path, title and visible text, so answers are about
// the page the visitor is reading (on a course page the API adds the course record).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

type Turn = { role: "user" | "assistant"; content: string };

const MAX_PAGE_TEXT = 12000;
const MAX_HISTORY = 10;

function suggestionsFor(path: string): string[] {
  if (/^\/programs\/[^/]+/.test(path)) return ["How much does this course cost?", "What are the entry requirements?", "What will I study?", "How long does it take?"];
  return ["Which course suits me?", "What IT courses do you offer?", "What's your cheapest course?"];
}

function readPageContext() {
  const root = document.querySelector("main") ?? document.body;
  const copy = root.cloneNode(true) as HTMLElement;
  copy.querySelectorAll("script, style, noscript, svg, video, dialog, nav, footer, [data-site-assistant], .whatsapp-float").forEach((node) => node.remove());
  const text = (copy.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_PAGE_TEXT);
  return { page_title: document.title.slice(0, 300), page_text: text };
}

const INLINE = /(\*\*[^*]+\*\*|(?<![\w/.])\/(?:programs(?:\/[a-z0-9-]+)?|admissions|contact|about|news)(?![\w-]))/gi;

function renderInline(text: string, onNavigate: () => void): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("/") && index % 2 === 1) return <Link key={index} href={part} onClick={onNavigate}>{part}</Link>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderReply(text: string, onNavigate: () => void): ReactNode {
  return text.split(/\n\s*\n/).map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length && lines.every((line) => /^[-*•]\s+/.test(line))) {
      return <ul key={index}>{lines.map((line, i) => <li key={i}>{renderInline(line.replace(/^[-*•]\s+/, ""), onNavigate)}</li>)}</ul>;
    }
    return <p key={index}>{lines.map((line, i) => <Fragment key={i}>{i > 0 && <br />}{renderInline(line.replace(/^[-*•]\s+/, "• "), onNavigate)}</Fragment>)}</p>;
  });
}

export function SiteAssistant() {
  const pathname = usePathname() || "/";
  // Only offered on the programmes list and course pages.
  return pathname.startsWith("/programs") ? <AssistantChat pathname={pathname} /> : null;
}

function AssistantChat({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const onCoursePage = /^\/programs\/[^/]+/.test(pathname);
  // The panel only renders after a click, so the DOM is available whenever this is used.
  const heading = open ? document.querySelector("h1")?.textContent?.trim() ?? "" : "";

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pathname]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy, error]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    const history = turns.slice(-MAX_HISTORY);
    setTurns([...turns, { role: "user", content: message }]);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/site-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.slice(0, 1000), path: pathname, ...readPageContext(), history }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.reply) throw new Error(payload?.error?.message || "Sorry, something went wrong. Please try again.");
      setTurns((current) => [...current, { role: "assistant", content: payload.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const close = () => setOpen(false);
  const greeting = onCoursePage && heading
    ? `Hi! 👋 Ask me anything about **${heading}** — fees, entry requirements, what you'll study and more.`
    : "Hi! 👋 I'm the Inspire College assistant. Ask me about our courses, fees or how to apply.";

  return (
    <div data-site-assistant>
      {open && (
        <section className="site-assistant-panel" role="dialog" aria-label="Inspire College assistant">
          <header className="site-assistant-header">
            <span className="site-assistant-avatar" aria-hidden="true">IC</span>
            <div>
              <strong>Inspire Assistant</strong>
              <span><i aria-hidden="true" /> {onCoursePage && heading ? `Viewing ${heading}` : "Online · usually instant"}</span>
            </div>
            {turns.length > 0 && (
              <button type="button" className="site-assistant-icon-button" onClick={() => { setTurns([]); setError(""); }} aria-label="Start a new chat" title="New chat">↺</button>
            )}
            <button type="button" className="site-assistant-icon-button" onClick={close} aria-label="Close assistant">✕</button>
          </header>

          <div className="site-assistant-log" ref={logRef} aria-live="polite">
            <div className="site-assistant-bubble assistant">{renderReply(greeting, close)}</div>
            {turns.map((turn, index) => (
              <div key={index} className={`site-assistant-bubble ${turn.role}`}>
                {turn.role === "assistant" ? renderReply(turn.content, close) : turn.content}
              </div>
            ))}
            {busy && <div className="site-assistant-bubble assistant site-assistant-typing" aria-label="Assistant is typing"><span /><span /><span /></div>}
            {error && <div className="site-assistant-error" role="alert">{error}</div>}
            {turns.length === 0 && !busy && (
              <div className="site-assistant-suggestions">
                {suggestionsFor(pathname).map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => send(suggestion)}>{suggestion}</button>
                ))}
              </div>
            )}
          </div>

          <form className="site-assistant-form" onSubmit={(event) => { event.preventDefault(); send(input); }}>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={1000}
              placeholder={onCoursePage ? "Ask about this course…" : "Type your question…"}
              aria-label="Your question"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(input); } }}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6l-.01 6.53L15 12 3.39 13.87z" /></svg>
            </button>
          </form>
          <p className="site-assistant-note">AI answers can be wrong — please confirm fees and dates with admissions.</p>
        </section>
      )}

      <button
        type="button"
        className={`site-assistant-launcher${open ? " is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask the Inspire College assistant"}
        title={open ? "Close" : "Ask a question"}
      >
        <svg className="site-assistant-launcher-chat" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path fill="currentColor" d="M12 3C6.48 3 2 6.94 2 11.8c0 2.3 1 4.39 2.65 5.96L4 21.5l4.06-1.9c1.2.4 2.53.6 3.94.6 5.52 0 10-3.94 10-8.8S17.52 3 12 3Z" />
          <path fill="#3F007C" d="m12 7.2.95 2.55 2.55.95-2.55.95L12 14.2l-.95-2.55-2.55-.95 2.55-.95z" />
        </svg>
        <svg className="site-assistant-launcher-close" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
