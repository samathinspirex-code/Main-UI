import { NextRequest, NextResponse } from "next/server";

const API_URL = (process.env.API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${API_URL}/api/v1/public/contact-inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({ error: { message: "Unable to send your message." } }));
  return NextResponse.json(payload, { status: response.status });
}
