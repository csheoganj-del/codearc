'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  formatInrFromPaise,
  getPaymentPlan,
  paymentPlans,
  type PaymentPlan,
} from '../data/pricing';
import RazorpayCheckout from './RazorpayCheckout';

type PayPlansProps = {
  initialPlanId?: string;
  paymentsAvailable?: boolean;
};

export default function PayPlans({ initialPlanId, paymentsAvailable = true }: PayPlansProps) {
  const defaultPlan =
    getPaymentPlan(initialPlanId) ||
    paymentPlans.find((p) => p.id === 'restrosuite-setup') ||
    paymentPlans[0];

  const [selectedId, setSelectedId] = useState(defaultPlan.id);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const selected: PaymentPlan = useMemo(
    () => getPaymentPlan(selectedId) || defaultPlan,
    [selectedId, defaultPlan],
  );

  return (
    <div className="v2-grid-2" style={{ alignItems: 'start', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {paymentPlans.map((plan) => {
          const active = plan.id === selected.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedId(plan.id)}
              className="v2-card v2-card-static v2-card-body"
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: active
                  ? '1px solid rgba(61, 155, 106, 0.55)'
                  : '1px solid rgba(243,240,232,0.08)',
                background: active ? 'rgba(61, 155, 106, 0.08)' : undefined,
                width: '100%',
              }}
              aria-pressed={active}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 17 }}>{plan.name}</h3>
                <strong style={{ color: '#f3f0e8', whiteSpace: 'nowrap' }}>
                  {formatInrFromPaise(plan.amountPaise)}
                </strong>
              </div>
              {plan.badge ? (
                <span
                  className="v2-badge v2-badge-muted"
                  style={{ marginBottom: 8, display: 'inline-block' }}
                >
                  {plan.badge}
                </span>
              ) : null}
              <p style={{ margin: 0, color: 'rgba(243,240,232,0.62)', lineHeight: 1.5 }}>
                {plan.blurb}
              </p>
            </button>
          );
        })}
      </div>

      <div className="v2-card v2-card-static" style={{ padding: '28px 24px', position: 'sticky', top: 96 }}>
        <p className="v2-kicker" style={{ marginBottom: 8 }}>
          Checkout
        </p>
        <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>{selected.name}</h2>
        <p style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 750, color: '#f3f0e8' }}>
          {formatInrFromPaise(selected.amountPaise)}
        </p>
        <p style={{ margin: '0 0 20px', color: 'rgba(243,240,232,0.62)', lineHeight: 1.55 }}>
          {selected.blurb}
        </p>

        <RazorpayCheckout
          key={selected.id}
          planId={selected.id}
          amountPaise={selected.amountPaise}
          description={selected.name}
          buttonLabel={selected.buttonLabel}
          disabled={!acceptedTerms || !paymentsAvailable}
        />

        {!paymentsAvailable ? (
          <p role="status" className="v2-form-error" style={{ marginTop: 14 }}>
            Online checkout is temporarily unavailable while secure payment webhooks are being
            configured. Email hello@codearc.co.in and we&apos;ll help you directly.
          </p>
        ) : null}

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginTop: 14,
            color: 'rgba(243,240,232,0.72)',
            fontSize: 13,
            lineHeight: 1.5,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            style={{ width: 18, height: 18, marginTop: 1, accentColor: '#3d9b6a' }}
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" style={{ color: '#8fd4ad', textDecoration: 'underline' }}>
              payment, cancellation and refund terms
            </Link>
            .
          </span>
        </label>

        <p
          style={{
            margin: '18px 0 0',
            fontSize: 13,
            color: 'rgba(243,240,232,0.5)',
            lineHeight: 1.5,
          }}
        >
          Secure payment via Razorpay. We verify the amount and plan directly with Razorpay.
          Keep the receipt for your records, and contact{' '}
          <a href="mailto:hello@codearc.co.in" style={{ color: 'rgba(243,240,232,0.75)' }}>
            hello@codearc.co.in
          </a>{' '}
          if you need help with activation. Prefer a custom quote?{' '}
          <Link href="/#contact" style={{ color: 'rgba(243,240,232,0.75)' }}>
            Write to us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
