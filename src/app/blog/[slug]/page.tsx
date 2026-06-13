import { notFound } from 'next/navigation';
import * as Icons from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { blogPosts } from '../../../data/blog';
import Link from 'next/link';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://codearc.co.in/blog/${params.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      url: `https://codearc.co.in/blog/${params.slug}`,
      images: [
        {
          url: '/assets/codearc_og.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Find other posts for internal linking recommendations
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-16">
        {/* Article Header */}
        <section className="py-12 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] hover:text-[#7C3AED] mb-8 group"
            >
              <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md bg-[#EEF2FF] text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                <Icons.Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                <Icons.Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm">
                CA
              </div>
              <div>
                <div className="text-sm font-bold text-[#334155]">{post.author}</div>
                <div className="text-xs text-[#94A3B8]">Software and SEO Strategy</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16 max-w-3xl mx-auto px-6">
          <div className="prose prose-slate max-w-none space-y-10">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight border-b border-[#E2E8F0] pb-2">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-[#475569] leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* FAQs Section */}
        {post.faqs.length > 0 && (
          <section className="py-16 bg-[#F8FAFC] border-y border-[#E2E8F0]">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-8">Article FAQs</h2>
              <div className="space-y-6">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-2">
                    <h3 className="font-bold text-[#0F172A] text-base">{faq.question}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed border-l-2 border-[#E2E8F0] pl-4">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Read More Internal Links */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-8">Recommended Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((other) => (
              <div
                key={other.slug}
                className="bg-white p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#4F46E5] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded">
                    {other.category}
                  </span>
                  <Link href={`/blog/${other.slug}`} className="block group">
                    <h4 className="font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                      {other.title}
                    </h4>
                  </Link>
                </div>
                <Link
                  href={`/blog/${other.slug}`}
                  className="text-xs font-bold text-[#4F46E5] mt-4 flex items-center gap-1 hover:underline"
                >
                  Read Post <Icons.ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
