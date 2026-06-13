import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | CodeArc',
  description: 'The terms for using the CodeArc website — written simply.',
  alternates: {
    canonical: 'https://codearc.co.in/terms',
  },
};

export default function TermsPage() {
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
          Terms, <em className="font-accent text-gradient not-italic">without the jargon.</em>
        </h1>
        <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-12">
          Last updated: June 12, 2026
        </p>

        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-6 text-sm font-semibold text-[#0F172A] mb-8">
          The short version: browse freely, the content here is ours, and actual project work is agreed separately in writing.
        </div>

        <div className="space-y-8 text-[#475569]">
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Using this website</h2>
            <p className="text-base">
              You\'re welcome to browse this site, read about our work, and contact us. Please don\'t misuse the site — for example, by attempting to disrupt it or copying it to pass off as your own.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Our content</h2>
            <p className="text-base">
              The text, design, and branding on this site belong to CodeArc. The client projects shown in our showcase belong to those clients and appear with their permission. Don\'t reuse either without asking us first.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Project work</h2>
            <p className="text-base">
              This website is an introduction, not a contract. Any websites, web applications, or Android apps we build for you are governed by a separate written agreement we make together before work begins — covering scope, timeline, and payment in plain English.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">No guarantees about the site</h2>
            <p className="text-base">
              We keep this site accurate and online to the best of our ability, but it\'s provided "as is" — we can\'t promise it will always be available or error-free, and we\'re not liable for losses arising from your use of the site itself.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Links to other sites</h2>
            <p className="text-base">
              Our showcase links to live client systems and other external sites. Those sites have their own rules and policies, which we don\'t control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Questions</h2>
            <p className="text-base">
              Anything unclear? Email{' '}
              <a href="mailto:hello@codearc.dev" className="text-[#4F46E5] font-semibold hover:underline">
                hello@codearc.dev
              </a>{' '}
              — we reply in plain English.
            </p>
          </section>
        </div>

        <footer className="border-t border-[#E2E8F0] mt-16 pt-6 text-xs text-[#64748B] flex items-center justify-between">
          <span>&copy; 2026 CodeArc</span>
          <Link href="/privacy" className="hover:text-[#4F46E5] font-semibold">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
}
