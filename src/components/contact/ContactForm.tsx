"use client";

// Simple dummy contact form: no backend/CMS wired up yet, so submitting
// just shows a confirmation state client-side instead of making a request.
import { useState } from "react";
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
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
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
        <label style={labelStyle}>Message</label>
        <textarea
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
        />
      </div>
      <SkBtn primary arrow type="submit">Send message</SkBtn>
    </form>
  );
}
