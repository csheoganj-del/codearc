import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | CodeArc',
  description: 'How CodeArc handles your information — explained in plain English.',
  alternates: {
    canonical: 'https://codearc.co.in/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans antialiased leading-relaxed">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5] hover:underline mb-12">
          &larr; Back to CodeArc
        </Link>
        <div className="text-xl font-extrabold tracking-tight mb-2">
          Code<span className="text-[#4F46E5]">Arc</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-3">
          Privacy, <em className="font-accent text-gradient not-italic">in plain English.</em>
        </h1>
        <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-12">
          Last updated: June 12, 2026
        </p>

        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-6 text-sm font-semibold text-[#0F172A] mb-8">
          The short version: we only ever see information you choose to send us, we never sell it, and we don\'t track you around the internet.
        </div>

        <div className="space-y-8 text-[#475569]">
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">What we collect</h2>
            <p className="text-base">
              When you contact us through this website, your message is sent through your own WhatsApp or email app directly to us (WhatsApp +91 99837 21179 or{' '}
              <a href="mailto:hello@codearc.dev" className="text-[#4F46E5] font-semibold hover:underline">
                hello@codearc.dev
              </a>
              ). We receive only what you write: typically your name, email address, and a description of your project. We do not collect anything you haven\'t deliberately typed and sent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">What we don\'t collect</h2>
            <p className="text-base">
              This website does not use advertising trackers, does not sell or share visitor data with third parties for marketing, and does not require an account or login. We don\'t ask for payment details on this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">How we use your information</h2>
            <p className="text-base">
              We use your contact details for one purpose: replying to you and discussing your project. If we work together, we\'ll keep your correspondence so we can support you over time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Hosting</h2>
            <p className="text-base">
              This site is hosted on Vercel, which may log basic technical data (such as IP addresses) to serve pages and keep things secure, as is standard for any web host. You can read Vercel\'s own privacy policy at{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#4F46E5] hover:underline"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Your choices</h2>
            <p className="text-base">
              Want us to delete an email you sent us, or anything we hold about you? Just write to{' '}
              <a href="mailto:hello@codearc.dev" className="text-[#4F46E5] font-semibold hover:underline">
                hello@codearc.dev
              </a>{' '}
              and we\'ll take care of it promptly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Changes</h2>
            <p className="text-base">
              If this policy changes, we\'ll update this page and the date at the top. No legal tricks, no fine print.
            </p>
          </section>
        </div>

        <footer className="border-t border-[#E2E8F0] mt-16 pt-6 text-xs text-[#64748B] flex items-center justify-between">
          <span>&copy; 2026 CodeArc</span>
          <Link href="/terms" className="hover:text-[#4F46E5] font-semibold">
            Terms of Service
          </Link>
        </footer>
      </div>
    </div>
  );
}
