import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { site } from '../../config/site';
import { socialMetadata } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CodeArc handles your information — explained in plain English.',
  alternates: {
    canonical: `${site.domain}/privacy`,
  },
  ...socialMetadata({
    title: 'Privacy Policy | CodeArc',
    description: 'How CodeArc handles your information — explained in plain English.',
    url: `${site.domain}/privacy`,
  }),
};

export default function PrivacyPage() {
  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner-narrow v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Privacy</span>
          </p>
          <p className="v2-kicker">Legal</p>
          <h1>
            Privacy <em>(plain English)</em>
          </h1>
          <p className="v2-inner-lede" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
            Last updated: July 31, 2026
          </p>
        </section>

        <section className="v2-inner-narrow" style={{ paddingBottom: 80 }}>
          <div className="v2-callout" style={{ marginBottom: 28 }}>
            The short version: we collect only what is needed to answer enquiries, process payments,
            operate the site securely, and meet our legal obligations. We do not sell personal data
            or use advertising trackers.
          </div>

          <div className="v2-prose">
            <h2>What we collect</h2>
            <p>
              When you contact us, your message is sent through your own email or WhatsApp app
              directly to us (WhatsApp +91 99837 21179 or{' '}
              <a href="mailto:hello@codearc.co.in">hello@codearc.co.in</a>
              ). We receive what you choose to send, typically your name, email address, phone
              number, and a description of your project.
            </p>

            <h2>Payments</h2>
            <p>
              Online checkout is provided by Razorpay. Payment-card, bank, or UPI credentials are
              entered into Razorpay&apos;s checkout and are not stored by CodeArc. We receive and
              retain transaction information such as the selected plan, amount, currency, order
              identifier, payment identifier, payment status, and receipt details so we can verify
              payment, provide the purchased service, prevent fraud, and handle support or refunds.
            </p>

            <h2>How we use your information</h2>
            <p>
              We use contact information to reply to you and deliver or support requested work. We
              use transaction information to reconcile payments, activate services, issue invoices
              or refunds, and meet accounting and tax requirements. We do not sell personal data or
              share it for third-party advertising.
            </p>

            <h2>Security and technical data</h2>
            <p>
              Our hosting and payment endpoints process limited technical information, including IP
              address and request metadata, for abuse prevention, rate limiting, reliability, and
              security logging. We do not use this information to build advertising profiles.
            </p>

            <h2>Hosting</h2>
            <p>
              This site is hosted on Vercel, which may log basic technical data (such as IP
              addresses) to serve pages and keep things secure, as is standard for any web host. You
              can read Vercel&apos;s own privacy policy at{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>

            <h2>How long we keep information</h2>
            <p>
              Enquiries are kept only while they are useful for the conversation or an ongoing
              client relationship. Payment, invoice, and transaction records are kept for the
              period required by applicable accounting, tax, fraud-prevention, and legal
              obligations. Security logs are retained for a limited operational period.
            </p>

            <h2>Your choices</h2>
            <p>
              Want us to delete an email you sent us, or anything we hold about you? Just write to{' '}
              <a href="mailto:hello@codearc.co.in">hello@codearc.co.in</a> and we&apos;ll take care
              of it promptly.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, we&apos;ll update this page and the date at the top. No legal
              tricks, no fine print.
            </p>
          </div>

          <p style={{ marginTop: 40, fontSize: 13, color: 'rgba(243,240,232,0.45)' }}>
            <Link href="/terms" style={{ color: '#3d9b6a' }}>
              Terms of Service
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
