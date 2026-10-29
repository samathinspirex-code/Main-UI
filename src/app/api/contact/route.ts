import { NextRequest, NextResponse } from "next/server";

const API_URL = (process.env.API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Vercel sets these headers at the edge. Never accept an IP from form fields.
    const visitorIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
      || request.headers.get("x-forwarded-for")?.split(",")[0].trim()
      || request.headers.get("x-real-ip")?.trim()
      || "";
    if (visitorIp === "185.225.69.203") {
      return NextResponse.json({ error: { message: "This contact request cannot be accepted." } }, { status: 403 });
    }
    const response = await fetch(`${API_URL}/api/v1/public/contact-inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(visitorIp ? { "X-Contact-Visitor-IP": visitorIp } : {}) },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({ error: { message: "Unable to send your message." } }));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: { message: "The contact service is temporarily unavailable. Please email enrol@inspire.college directly." } },
      { status: 503 },
    );
  }
}
