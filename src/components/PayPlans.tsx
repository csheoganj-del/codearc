'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Mail } from 'lucide-react';
import {
  getPaymentPlan,
  paymentPlans,
  type PaymentPlan,
} from '../data/pricing';
import { site, whatsappUrl } from '../config/site';

type PayPlansProps = {
  initialPlanId?: string;
  paymentsAvailable?: boolean;
};

export default function PayPlans({ initialPlanId }: PayPlansProps) {
  const defaultPlan =
    getPaymentPlan(initialPlanId) ||
    paymentPlans.find((p) => p.id === 'restrosuite-setup') ||
    paymentPlans[0];

  const [selectedId, setSelectedId] = useState(defaultPlan.id);

  const selected: PaymentPlan = useMemo(
    () => getPaymentPlan(selectedId) || defaultPlan,
    [selectedId, defaultPlan],
  );

  const whatsappLink = whatsappUrl(
    `Hi CodeArc, I would like to enquire about pricing and details for ${selected.name}.`,
  );

  const mailLink = `mailto:${site.email}?subject=${encodeURIComponent(
    `Price enquiry: ${selected.name}`,
  )}&body=${encodeURIComponent(
    `Hi CodeArc team,\n\nI would like to enquire about pricing, onboarding and fit for ${selected.name}.\n\nBusiness name:\nLocation:\nRequirements:\n`,
  )}`;

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
                  : '1px solid rgba(28, 24, 20, 0.06)',
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
                <span
                  style={{
                    color: '#2f7a4e',
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Price on enquiry
                </span>
              </div>
              {plan.badge ? (
                <span
                  className="v2-badge v2-badge-muted"
                  style={{ marginBottom: 8, display: 'inline-block' }}
                >
                  {plan.badge}
                </span>
              ) : null}
              <p style={{ margin: 0, color: '#5e564c', lineHeight: 1.5 }}>
                {plan.blurb}
              </p>
            </button>
          );
        })}
      </div>

      <div className="v2-card v2-card-static" style={{ padding: '28px 24px', position: 'sticky', top: 96 }}>
        <p className="v2-kicker" style={{ marginBottom: 8 }}>
          Price enquiry & proposal
        </p>
        <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>{selected.name}</h2>
        <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: '#2f7a4e' }}>
          Quoted after a short review
        </p>
        <p style={{ margin: '0 0 20px', color: '#5e564c', lineHeight: 1.55 }}>
          {selected.blurb}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            className="v2-btn v2-btn-primary"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <MessageCircle size={18} /> Enquire on WhatsApp
          </a>

          <a
            className="v2-btn v2-btn-ghost"
            href={mailLink}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Mail size={18} /> Enquire via Email
          </a>
        </div>

        <p
          style={{
            margin: '18px 0 0',
            fontSize: 13,
            color: '#6a635a',
            lineHeight: 1.5,
          }}
        >
          We will review your requirements and provide a clear scope, onboarding timeline, and written quotation.
          Have questions? You can also reach us directly at{' '}
          <a href={`mailto:${site.email}`} style={{ color: '#1c1814' }}>
            {site.email}
          </a>{' '}
          or call {site.phone.display}.
        </p>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(28, 24, 20, 0.06)',
          }}
        >
          <h4 style={{ margin: '0 0 6px', fontSize: 13, color: '#1c1814', fontWeight: 600 }}>
            Existing client or custom project payment?
          </h4>
          <p style={{ margin: 0, fontSize: 12, color: '#5e564c', lineHeight: 1.5 }}>
            Milestone payments follow your accepted quotation. We issue direct invoices with bank details or private payment links for agreed amounts.
          </p>
          <div style={{ marginTop: 8 }}>
            <Link href="/terms" style={{ color: '#2f7a4e', fontSize: 12, fontWeight: 600, textDecoration: 'underline' }}>
              View payment & terms policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
