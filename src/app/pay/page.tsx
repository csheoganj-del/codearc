import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PayPlans from '../../components/PayPlans';
import { getPaymentPlan } from '../../data/pricing';
import { isPaymentConfigured } from '../../lib/razorpay';
import { site } from '../../config/site';
import { socialMetadata } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Pay',
  description:
    'Pay for CodeArc products securely with Razorpay — RestroSuite, StaySuite and MediSuite setup or early access.',
  alternates: { canonical: `${site.domain}/pay` },
  ...socialMetadata({
    title: 'Pay | CodeArc',
    description: 'Secure online payment for CodeArc SaaS products and early access plans.',
    url: `${site.domain}/pay`,
  }),
};

export default async function PayPage(props: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planParam } = await props.searchParams;
  const matched = getPaymentPlan(planParam);
  const initialPlanId = matched?.id;
  const paymentsAvailable = isPaymentConfigured();

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Pay</span>
          </p>
          <p className="v2-kicker">Secure checkout</p>
          <h1>
            Pay online. <em>Simply.</em>
          </h1>
          <p className="v2-inner-lede">
            Choose a product setup or early-access plan. Payments are processed securely through
            Razorpay. Custom website and project advances follow your written quotation (milestone
            payments) — contact us for an invoice or private payment link.
          </p>
          <div className="v2-inline-actions">
            <Link className="v2-btn v2-btn-ghost" href="/products">
              Browse products
            </Link>
            <a
              className="v2-btn v2-btn-ghost"
              href="mailto:hello@codearc.co.in?subject=Custom%20project%20payment"
            >
              Custom project payment
            </a>
          </div>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <PayPlans initialPlanId={initialPlanId} paymentsAvailable={paymentsAvailable} />
        </section>

        <section className="v2-section v2-section-tight">
          <div className="v2-grid-2">
            <div className="v2-card v2-card-static v2-card-body">
              <h3 style={{ marginTop: 0 }}>What happens after you pay</h3>
              <p style={{ color: 'rgba(243,240,232,0.62)', lineHeight: 1.55, margin: 0 }}>
                Razorpay issues a receipt and we verify the selected plan, amount, and payment
                status directly. We&apos;ll then activate the product or contact you to schedule
                onboarding or project kickoff.
              </p>
            </div>
            <div className="v2-card v2-card-static v2-card-body">
              <h3 style={{ marginTop: 0 }}>Need help?</h3>
              <p style={{ color: 'rgba(243,240,232,0.62)', lineHeight: 1.55, margin: 0 }}>
                Questions about a plan, invoice, or custom quote? Write to{' '}
                <a href="mailto:hello@codearc.co.in" style={{ color: 'rgba(243,240,232,0.85)' }}>
                  hello@codearc.co.in
                </a>{' '}
                or WhatsApp +91 99837 21179 — we’ll reply quickly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
