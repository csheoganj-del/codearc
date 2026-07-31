import { createHmac, timingSafeEqual } from 'crypto';
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
import { getRazorpayInstance, getRazorpayKeySecret } from '../../../lib/razorpay';

export const runtime = 'nodejs';

function signaturesMatch(expected: string, received: string): boolean {
  try {
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(received, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function isProviderId(value: string, prefix: 'order_' | 'pay_'): boolean {
  return value.startsWith(prefix) && /^[A-Za-z0-9_]+$/.test(value) && value.length <= 64;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Online payments are temporarily unavailable' },
        { status: 503, headers: noStoreHeaders() },
      );
    }

    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { success: false, error: 'Cross-origin requests are not allowed' },
        { status: 403, headers: noStoreHeaders() },
      );
    }

    const limited = rateLimit(`verify-payment:${clientIp(request)}`, {
      limit: 30,
      windowMs: 60_000,
    });
    if (!limited.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Try again shortly.' },
        { status: 429, headers: noStoreHeaders(rateLimitHeaders(limited)) },
      );
    }

    const body = await readJsonObject<Record<string, unknown>>(request);
    const orderId =
      typeof body.razorpay_order_id === 'string' ? body.razorpay_order_id.trim() : '';
    const paymentId =
      typeof body.razorpay_payment_id === 'string' ? body.razorpay_payment_id.trim() : '';
    const signature =
      typeof body.razorpay_signature === 'string' ? body.razorpay_signature.trim() : '';

    if (
      !isProviderId(orderId, 'order_') ||
      !isProviderId(paymentId, 'pay_') ||
      !/^[a-f0-9]{64}$/i.test(signature)
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment verification data' },
        { status: 400, headers: noStoreHeaders(rateLimitHeaders(limited)) },
      );
    }

    const expected = createHmac('sha256', getRazorpayKeySecret())
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (!signaturesMatch(expected, signature)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400, headers: noStoreHeaders(rateLimitHeaders(limited)) },
      );
    }

    const razorpay = getRazorpayInstance();
    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(orderId),
      razorpay.payments.fetch(paymentId),
    ]);

    const notes = order.notes && !Array.isArray(order.notes) ? order.notes : {};
    const planId = typeof notes.plan_id === 'string' ? notes.plan_id : '';
    const plan = getPaymentPlan(planId);
    const paymentStatus = String(payment.status);

    if (
      !plan ||
      payment.order_id !== orderId ||
      Number(order.amount) !== plan.amountPaise ||
      Number(payment.amount) !== plan.amountPaise ||
      String(order.currency).toUpperCase() !== plan.currency ||
      String(payment.currency).toUpperCase() !== plan.currency ||
      !['authorized', 'captured'].includes(paymentStatus)
    ) {
      console.error('[verify-payment] provider data did not match the catalog order');
      return NextResponse.json(
        { success: false, error: 'Payment details could not be confirmed' },
        { status: 409, headers: noStoreHeaders(rateLimitHeaders(limited)) },
      );
    }

    await logPaymentEvent({
      at: new Date().toISOString(),
      type: 'payment.verified',
      planId,
      orderId,
      paymentId,
      amountPaise: Number(payment.amount),
      currency: String(payment.currency),
      meta: { providerStatus: paymentStatus },
    });

    return NextResponse.json(
      {
        success: true,
        order_id: orderId,
        payment_id: paymentId,
        plan_id: planId,
        status: paymentStatus,
        message: 'Payment verified successfully',
      },
      { headers: noStoreHeaders(rateLimitHeaders(limited)) },
    );
  } catch (error: unknown) {
    if (error instanceof ApiInputError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status, headers: noStoreHeaders() },
      );
    }

    console.error('[verify-payment]', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification is temporarily unavailable' },
      { status: 502, headers: noStoreHeaders() },
    );
  }
}
