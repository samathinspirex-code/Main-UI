import { NextRequest, NextResponse } from "next/server";

const API_URL = (process.env.API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const NO_STORE = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };

type Context = { params: Promise<{ token: string }> };

function target(token: string) {
  return `${API_URL}/api/v1/public/offer-documents/${encodeURIComponent(token)}`;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { token } = await params;
  const response = await fetch(target(token), { cache: "no-store" });
  const payload = await response.json().catch(() => ({ status: "unavailable" }));
  return NextResponse.json(payload, { status: response.status, headers: NO_STORE });
}

export async function POST(request: NextRequest, { params }: Context) {
  const { token } = await params;
  const body = await request.json();
  const response = await fetch(target(token), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({ error: { message: "Unable to upload the document." } }));
  return NextResponse.json(payload, { status: response.status, headers: NO_STORE });
}
