import { NextResponse } from 'next/server';

const MAX_FIELD_LENGTH = 2000;

function clean(value: unknown): string {
  return String(value ?? '').trim().slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — only bots fill this in. Answer 200 so they learn nothing.
    if (clean(body?.company)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body?.name);
    const phone = clean(body?.phone);

    if (!name || !phone) {
      return NextResponse.json({ ok: false, message: 'Name and phone are required.' }, { status: 400 });
    }

    if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
      return NextResponse.json({ ok: false, message: 'Please enter a valid phone number.' }, { status: 400 });
    }

    const email = clean(body?.email);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const payload = {
      ...Object.fromEntries(Object.entries(body ?? {}).map(([key, value]) => [key, clean(value)])),
      submittedAt: new Date().toISOString(),
      source: 'chalmusafir.co.in',
    };

    const webhook = process.env.TRAVEL_ENQUIRY_WEBHOOK_URL;

    if (webhook) {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.TRAVEL_ENQUIRY_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.TRAVEL_ENQUIRY_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, message: 'The enquiry service is temporarily unavailable. Please call or WhatsApp 8909286000.' },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    // No webhook configured. Never fail silently in production — tell the
    // visitor to use a channel that definitely reaches the agency.
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { ok: false, message: 'Online enquiry delivery is not configured yet. Please call or WhatsApp 8909286000.' },
        { status: 503 },
      );
    }

    console.info('[development enquiry]', payload);
    return NextResponse.json({ ok: true, developmentMode: true });
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid enquiry request.' }, { status: 400 });
  }
}
