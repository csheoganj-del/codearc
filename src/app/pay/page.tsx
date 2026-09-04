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
  title: 'Price Enquiry & Plans',
  description:
    'Enquire about pricing and onboarding for CodeArc products — RestroSuite, StaySuite, and MediSuite, or request a custom project quote.',
  alternates: { canonical: `${site.domain}/pay` },
  ...socialMetadata({
    title: 'Price Enquiry & Plans | CodeArc',
    description: 'Enquire about pricing and onboarding for CodeArc products or request a custom proposal.',
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
            <span>Pricing</span>
          </p>
          <p className="v2-kicker">Plans & proposals</p>
          <h1>
            Price enquiry. <em>Tailored to your needs.</em>
          </h1>
          <p className="v2-inner-lede">
            Explore our software products or ask for tailored pricing and onboarding. Every business is unique — we provide clear quotations, transparent deliverables, and responsive support.
          </p>
          <div className="v2-inline-actions">
            <Link className="v2-btn v2-btn-ghost" href="/products">
              Browse products
            </Link>
            <a
              className="v2-btn v2-btn-ghost"
              href="mailto:hello@codearc.co.in?subject=Custom%20project%20enquiry"
            >
              Custom project enquiry
            </a>
          </div>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <PayPlans initialPlanId={initialPlanId} paymentsAvailable={paymentsAvailable} />
        </section>

        <section className="v2-section v2-section-tight">
          <div className="v2-grid-2">
            <div className="v2-card v2-card-static v2-card-body">
              <h3 style={{ marginTop: 0 }}>How enquiry & onboarding works</h3>
              <p style={{ color: 'rgba(243,240,232,0.62)', lineHeight: 1.55, margin: 0 }}>
                Once you send an enquiry via WhatsApp or email, we discuss your setup, demonstrate the product or walk through scope, and send a transparent quotation tailored to your outlets or users.
              </p>
            </div>
            <div className="v2-card v2-card-static v2-card-body">
              <h3 style={{ marginTop: 0 }}>Need a custom proposal?</h3>
              <p style={{ color: 'rgba(243,240,232,0.62)', lineHeight: 1.55, margin: 0 }}>
                Questions about a custom website, portal, or bespoke SaaS tool? Write to{' '}
                <a href="mailto:hello@codearc.co.in" style={{ color: 'rgba(243,240,232,0.85)' }}>
                  hello@codearc.co.in
                </a>{' '}
                or WhatsApp +91 99837 21179 — we’ll reply promptly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
