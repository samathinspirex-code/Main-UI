import { NextRequest, NextResponse } from "next/server";

const API_URL = (process.env.API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Forward the visitor's IP so the API can rate-limit per visitor, not per website server.
    const visitorIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "";
    const response = await fetch(`${API_URL}/api/v1/public/site-assistant/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(visitorIp ? { "X-Forwarded-For": visitorIp } : {}) },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({ error: { message: "The assistant sent an unexpected reply." } }));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: { message: "The assistant is unavailable right now. Please WhatsApp us on +94 71 199 3331." } },
      { status: 503 },
    );
  }
}
