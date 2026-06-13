import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { blogPosts, additionalTopicsList } from '../../data/blog';
import * as Icons from 'lucide-react';

export const metadata = {
  title: 'Blog | Plain English Insights on Software & Web Performance',
  description: 'Read the CodeArc blog for clear, non-technical insights on website development costs, local SEO, website design, Next.js, and web speed.',
  alternates: {
    canonical: 'https://codearc.co.in/blog',
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-16">
        {/* Blog Hero */}
        <section className="relative py-20 overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="absolute inset-0 bg-grid mask-fade-bottom pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle,_rgba(79,70,229,0.06)_0%,_transparent_70%)] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs uppercase tracking-widest font-bold mb-5">
              CodeArc Knowledge
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-4">
              Software & Web Speed, <span className="font-accent text-gradient">explained simply.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto">
              No technical jargon. Just actionable tips on website design, cost structures, local SEO, and developer setups.
            </p>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-[#E2E8F0] p-8 hover:shadow-xl hover:border-[#4F46E5]/35 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[#EEF2FF] text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                      <Icons.Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-snug group-hover:text-[#4F46E5] transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] mt-6 flex items-center justify-between">
                  <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                    <Icons.Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#4F46E5] hover:text-[#7C3AED] flex items-center gap-1.5 group"
                  >
                    Read Article
                    <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Topics Section */}
        <section className="py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center md:text-left mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Upcoming Topics & Guides</h2>
              <p className="text-sm text-[#64748B] mt-2">Currently being drafted by our engineering and design teams for upcoming releases.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {additionalTopicsList.map((topic, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                    <Icons.BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#334155] leading-snug">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
