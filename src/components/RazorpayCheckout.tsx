'use client';

import { useCallback, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

type CheckoutStatus = 'idle' | 'creating' | 'open' | 'verifying' | 'success' | 'error' | 'cancelled';

type CreateOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
  plan_id?: string;
  error?: string;
};

type VerifyResponse = {
  success: boolean;
  payment_id?: string;
  order_id?: string;
  message?: string;
  error?: string;
};

export type RazorpayCheckoutProps = {
  /** Catalog plan id — amount is resolved server-side */
  planId: string;
  /** Display-only amount in paise (must match catalog; server is source of truth) */
  amountPaise: number;
  currency?: string;
  description?: string;
  name?: string;
  buttonLabel?: string;
  className?: string;
  disabled?: boolean;
};

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckout({
  planId,
  amountPaise,
  currency = 'INR',
  description = 'CodeArc payment',
  name = 'CodeArc',
  buttonLabel = 'Pay with Razorpay',
  className = 'v2-btn v2-btn-primary',
  disabled = false,
}: RazorpayCheckoutProps) {
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const amountRupees = (amountPaise / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  });

  const handlePay = useCallback(async () => {
    if (disabled) return;

    setError(null);
    setPaymentId(null);

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      setStatus('error');
      setError('Online payments are temporarily unavailable. Please email hello@codearc.co.in.');
      return;
    }

    if (!planId) {
      setStatus('error');
      setError('Please select a plan and try again.');
      return;
    }

    try {
      setStatus('creating');

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const orderData = (await orderRes.json()) as CreateOrderResponse;
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Could not start payment. Please try again.');
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Could not open the payment window. Check your connection and try again.');
      }

      setStatus('open');

      const rzp = new window.Razorpay({
        key,
        amount: Number(orderData.amount),
        currency: orderData.currency || currency,
        name,
        description,
        order_id: orderData.order_id,
        theme: { color: '#174C3C' },
        modal: {
          ondismiss: () => {
            setStatus((prev) => (prev === 'success' || prev === 'verifying' ? prev : 'cancelled'));
            setError('Payment cancelled. You can try again when ready.');
          },
        },
        handler: async (response) => {
          try {
            setStatus('verifying');
            setError(null);

            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId,
              }),
            });

            const verifyData = (await verifyRes.json()) as VerifyResponse;
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            setPaymentId(verifyData.payment_id || response.razorpay_payment_id);
            setStatus('success');
          } catch (verifyError) {
            setStatus('error');
            setError(
              verifyError instanceof Error
                ? verifyError.message
                : 'Payment went through, but we could not confirm it yet. Contact us with your receipt number.',
            );
          }
        },
      });

      rzp.on('payment.failed', (response) => {
        setStatus('error');
        setError(
          response.error?.description ||
            response.error?.reason ||
            'Payment failed. Please try another method.',
        );
      });

      rzp.open();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong starting checkout');
    }
  }, [planId, currency, description, name, disabled]);

  const busy = status === 'creating' || status === 'open' || status === 'verifying';

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <CheckCircle2 size={40} style={{ color: '#3d9b6a', margin: '0 auto 12px' }} />
        <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Payment successful</p>
        {paymentId ? (
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 13,
              color: 'rgba(243,240,232,0.62)',
              wordBreak: 'break-all',
            }}
          >
            Receipt no.: {paymentId}
          </p>
        ) : null}
        <button
          type="button"
          className="v2-btn v2-btn-ghost"
          style={{ marginTop: 16 }}
          onClick={() => {
            setStatus('idle');
            setPaymentId(null);
            setError(null);
          }}
        >
          Pay again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          className={className}
          onClick={handlePay}
          disabled={busy || disabled}
          aria-busy={busy}
        >
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              {status === 'creating'
                ? 'Starting payment…'
                : status === 'verifying'
                  ? 'Confirming payment…'
                  : 'Complete payment in the window…'}
            </>
          ) : (
            <>
              {buttonLabel} · {amountRupees}
            </>
          )}
        </button>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'rgba(243,240,232,0.55)',
          }}
        >
          <ShieldCheck size={14} />
          Secured by Razorpay
        </span>
      </div>

      {error ? (
        <p
          role="alert"
          style={{
            margin: 0,
            fontSize: 14,
            color: status === 'cancelled' ? 'rgba(243,240,232,0.7)' : '#f0a0a0',
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
