import { NextRequest, NextResponse } from 'next/server'

const API_URL = (process.env.API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/v1/public/wtc-registrations`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(await request.json()), cache: 'no-store',
    })
    const payload = await response.json().catch(() => ({ error: { message: 'Unable to register right now. Please try again.' } }))
    return NextResponse.json(payload, { status: response.status })
  } catch {
    return NextResponse.json({ error: { message: 'The registration service is temporarily unavailable. Please try again.' } }, { status: 503 })
  }
}
