import Link from 'next/link';
import { ArrowRight, Home, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans antialiased relative">
      <Navbar />

      <main className="pt-40 pb-28 min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-6">
            404
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            This page wandered off.
          </h1>
          <p className="text-lg text-[#475569] leading-relaxed mb-10">
            The page you're looking for doesn't exist, or the link may be out of
            date. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-base hover:shadow-[0_16px_40px_-12px_rgba(79,70,229,0.55)] transition-shadow duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-[#E2E8F0] text-[#0F172A] font-bold text-base hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/50 transition-colors duration-300"
            >
              Visit the Blog
            </Link>
          </div>
          <p className="text-sm text-[#64748B] mt-10">
            Or{' '}
            <Link href="/#contact" className="text-[#4F46E5] font-semibold hover:underline inline-flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              tell us what you were looking for
            </Link>
            {' '}and we'll point you in the right direction.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
