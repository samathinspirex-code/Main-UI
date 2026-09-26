"use client";

import { FormEvent, useState } from "react";
import { SK } from "@/components/sketch/tokens";
import { Heading, SkBtn, SkIcon } from "@/components/sketch/primitives";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: `1.3px solid ${SK.ink}`,
  borderRadius: 4,
  fontFamily: "var(--sk-hand)",
  fontSize: 15,
  background: "#fff",
};
const labelStyle = { fontFamily: "var(--sk-hand)", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "block" as const };

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submitContactForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPhone = phone.trim();
      const trimmedMessage = message.trim();

      if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
        throw new Error("Please fill in your name, email, phone number, and message.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: trimmedName, email: trimmedEmail, phone: trimmedPhone, message: trimmedMessage }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        let msg = "We could not send your message. Please try again.";
        if (payload?.error?.details && Array.isArray(payload.error.details) && payload.error.details.length > 0) {
          msg = payload.error.details.map((d: { issue?: string; msg?: string; field?: string }) => d.issue || d.msg || `${d.field}: invalid`).join(". ");
        } else if (typeof payload?.error?.message === "string") {
          msg = payload.error.message;
        } else if (typeof payload?.detail === "string") {
          msg = payload.detail;
        } else if (Array.isArray(payload?.detail) && payload.detail.length > 0) {
          msg = payload.detail.map((d: { msg?: string }) => d.msg || "Invalid input").join(". ");
        }
        throw new Error(msg);
      }

      setSent(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not send your message. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 32, background: "#fff", textAlign: "center" }}>
        <SkIcon kind="check" size={36} color={SK.accent} />
        <Heading size={24} style={{ marginTop: 12 }}>Message sent</Heading>
        <div style={{ fontFamily: "var(--sk-hand)", fontSize: 14, color: SK.inkSoft, marginTop: 8 }}>
          Thanks {name.split(" ")[0] || "there"} — we&rsquo;ll reply to {email || "your email"} soon.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitContactForm}
      style={{ border: `1.5px solid ${SK.ink}`, borderRadius: 4, padding: 28, background: "#fff", display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Heading size={24}>Send us a message</Heading>
      <div>
        <label style={labelStyle}>Full name</label>
        <input style={inputStyle} required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div>
        <label style={labelStyle}>Phone number</label>
        <input style={inputStyle} required type="tel" inputMode="tel" autoComplete="tel" minLength={5} maxLength={50} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 77 123 4567" />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
        />
      </div>
      {error && (
        <div role="alert" style={{ fontFamily: "var(--sk-hand)", fontSize: 13, color: "#a11b1b", background: "#fff3f3", border: "1px solid #efcaca", borderRadius: 4, padding: "10px 12px" }}>
          {error}
        </div>
      )}
      <SkBtn primary arrow type="submit" disabled={busy}>{busy ? "Sending…" : "Send message"}</SkBtn>
    </form>
  );
}
