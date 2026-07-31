import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { noStoreHeaders } from '../../../lib/api-security';
import { logPaymentEvent } from '../../../lib/payment-log';
import { getRazorpayWebhookSecret } from '../../../lib/razorpay';

export const runtime = 'nodejs';

function signaturesMatch(expected: string, received: string): boolean {
  try {
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(received, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        currency?: string;
        status?: string;
        notes?: Record<string, string>;
      };
    };
  };
};

export async function POST(request: NextRequest) {
  const secret = getRazorpayWebhookSecret();
  if (!secret) {
    return NextResponse.json(
      { error: 'Webhook secret is not configured' },
      { status: 503, headers: noStoreHeaders() },
    );
  }

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > 256_000) {
    return NextResponse.json(
      { error: 'Webhook body is too large' },
      { status: 413, headers: noStoreHeaders() },
    );
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > 256_000) {
    return NextResponse.json(
      { error: 'Webhook body is too large' },
      { status: 413, headers: noStoreHeaders() },
    );
  }
  const signature = request.headers.get('x-razorpay-signature')?.trim();

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  if (!signaturesMatch(expected, signature)) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  let data: RazorpayWebhookPayload;
  try {
    data = JSON.parse(rawBody) as RazorpayWebhookPayload;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400, headers: noStoreHeaders() },
    );
  }

  const event = data.event || 'unknown';
  const payment = data.payload?.payment?.entity;
  const planId = payment?.notes?.plan_id;
  const eventId = request.headers.get('x-razorpay-event-id') || undefined;

  if (event === 'payment.captured') {
    await logPaymentEvent({
      at: new Date().toISOString(),
      type: 'webhook.payment.captured',
      planId,
      orderId: payment?.order_id,
      paymentId: payment?.id,
      amountPaise: payment?.amount,
      currency: payment?.currency,
      meta: { status: payment?.status, event, eventId },
    });
  } else if (event === 'payment.failed') {
    await logPaymentEvent({
      at: new Date().toISOString(),
      type: 'webhook.payment.failed',
      planId,
      orderId: payment?.order_id,
      paymentId: payment?.id,
      amountPaise: payment?.amount,
      currency: payment?.currency,
      meta: { status: payment?.status, event, eventId },
    });
  } else {
    await logPaymentEvent({
      at: new Date().toISOString(),
      type: 'webhook.other',
      planId,
      orderId: payment?.order_id,
      paymentId: payment?.id,
      meta: { event, eventId },
    });
  }

  return NextResponse.json(
    { received: true },
    { headers: noStoreHeaders() },
  );
}
