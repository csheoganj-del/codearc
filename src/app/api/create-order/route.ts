import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getPaymentPlan } from '../../../data/pricing';
import {
  ApiInputError,
  isSameOriginRequest,
  noStoreHeaders,
  readJsonObject,
} from '../../../lib/api-security';
import { logPaymentEvent } from '../../../lib/payment-log';
import { clientIp, rateLimit, rateLimitHeaders } from '../../../lib/rate-limit';
import { getRazorpayInstance, isPaymentConfigured } from '../../../lib/razorpay';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    if (!isPaymentConfigured()) {
      return NextResponse.json(
        { error: 'Online payments are temporarily unavailable' },
        { status: 503, headers: noStoreHeaders() },
      );
    }

    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: 'Cross-origin requests are not allowed' },
        { status: 403, headers: noStoreHeaders() },
      );
    }

    const ip = clientIp(request);
    const limited = rateLimit(`create-order:${ip}`, { limit: 15, windowMs: 60_000 });
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Try again shortly.' },
        {
          status: 429,
          headers: noStoreHeaders(rateLimitHeaders(limited)),
        },
      );
    }

    const body = await readJsonObject<Record<string, unknown>>(request);
    const planId = typeof body.planId === 'string' ? body.planId.trim() : '';
    const plan = getPaymentPlan(planId);

    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid or missing planId' },
        { status: 400, headers: noStoreHeaders(rateLimitHeaders(limited)) },
      );
    }

    const receipt = `${plan.id}_${randomUUID().replaceAll('-', '').slice(0, 12)}`.slice(0, 40);
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: plan.amountPaise,
      currency: plan.currency,
      receipt,
      notes: {
        plan_id: plan.id,
        plan_name: plan.name,
        product: plan.product || 'studio',
      },
    });

    await logPaymentEvent({
      at: new Date().toISOString(),
      type: 'order.created',
      planId: plan.id,
      orderId: order.id,
      amountPaise: Number(order.amount),
      currency: String(order.currency),
      meta: { receipt },
    });

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        plan_id: plan.id,
      },
      { headers: noStoreHeaders(rateLimitHeaders(limited)) },
    );
  } catch (error: unknown) {
    if (error instanceof ApiInputError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status, headers: noStoreHeaders() },
      );
    }

    console.error('[create-order]', error);
    return NextResponse.json(
      { error: 'Could not create payment order. Please try again.' },
      { status: 502, headers: noStoreHeaders() },
    );
  }
}
