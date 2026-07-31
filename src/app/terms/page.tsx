import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms for using the CodeArc website — written simply.',
  alternates: {
    canonical: 'https://codearc.co.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner-narrow v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Terms</span>
          </p>
          <p className="v2-kicker">Legal</p>
          <h1>
            Terms <em>(kept short)</em>
          </h1>
          <p className="v2-inner-lede" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
            Last updated: July 31, 2026
          </p>
        </section>

        <section className="v2-inner-narrow" style={{ paddingBottom: 80 }}>
          <div className="v2-callout" style={{ marginBottom: 28 }}>
            The short version: browse freely, the content here is ours, and actual project work is
            agreed separately in writing.
          </div>

          <div className="v2-prose">
            <h2>Using this website</h2>
            <p>
              You&apos;re welcome to browse this site, read about our work and products, and contact
              us. Please don&apos;t misuse the site — for example, by attempting to disrupt it or
              copying it to pass off as your own.
            </p>

            <h2>Our content</h2>
            <p>
              The text, design, branding and product materials on this site belong to CodeArc.
              Client work and product previews appear with permission where required. Don&apos;t
              reuse either without asking us first.
            </p>

            <h2>Project work & products</h2>
            <p>
              This website is an introduction, not a contract. Custom software projects and product
              access (including suites such as RestroSuite) are governed by separate written
              agreements covering scope, timeline, pricing and support in plain English.
            </p>

            <h2>Online payments</h2>
            <p>
              Prices shown at checkout are in Indian rupees and identify the selected product,
              onboarding fee, subscription start, early-access fee, or project deposit. Payments
              are processed by Razorpay. A successful payment confirms receipt of funds; delivery,
              onboarding, access, scope, and timing remain subject to the description shown at
              checkout and any written quote or product agreement.
            </p>

            <h2>Cancellations and refunds</h2>
            <p>
              Duplicate or incorrect charges should be reported within seven days. Setup and
              early-access payments may be cancelled for a full refund before onboarding, access,
              or reserved work begins. For custom-project deposits, any refund after work begins is
              limited to the undelivered portion after completed work and committed third-party
              costs are deducted. Approved refunds are returned to the original payment method and
              may take the payment provider&apos;s standard processing time. These terms do not
              limit rights that cannot legally be excluded.
            </p>

            <h2>Payment support</h2>
            <p>
              For a failed, duplicate, or disputed payment, email{' '}
              <a href="mailto:hello@codearc.co.in">hello@codearc.co.in</a> with the Razorpay receipt
              or payment identifier. Do not send card, bank, UPI PIN, password, or one-time-code
              details.
            </p>

            <h2>No guarantees about the site</h2>
            <p>
              We keep this site accurate and online to the best of our ability, but it&apos;s
              provided &quot;as is&quot; — we can&apos;t promise it will always be available or
              error-free, and we&apos;re not liable for losses arising from your use of the site
              itself.
            </p>

            <h2>Links to other sites</h2>
            <p>
              We link to live product environments and external resources. Those sites have their
              own rules and policies, which we don&apos;t control.
            </p>

            <h2>Questions</h2>
            <p>
              Anything unclear? Email{' '}
              <a href="mailto:hello@codearc.co.in">hello@codearc.co.in</a> — we reply in plain
              English.
            </p>
          </div>

          <p style={{ marginTop: 40, fontSize: 13, color: 'rgba(243,240,232,0.45)' }}>
            <Link href="/privacy" style={{ color: '#3d9b6a' }}>
              Privacy Policy
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
