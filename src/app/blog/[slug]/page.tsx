import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { blogPosts } from '../../../data/blog';
import { formatBlogDate } from '../../../lib/dates';
import { site } from '../../../config/site';
import { socialMetadata } from '../../../lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const title = post.metaTitle.replace(/\s*\|\s*CodeArc\s*$/i, '');
  const ogTitle = post.metaTitle.includes('CodeArc') ? post.metaTitle : `${post.title} | CodeArc`;
  const url = `${site.domain}/blog/${params.slug}`;

  return {
    title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    ...socialMetadata({
      title: ogTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.date,
      imageAlt: post.title,
    }),
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner-mid v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/blog">
              <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Blog
            </Link>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, alignItems: 'center' }}>
            <span className="v2-badge">{post.category}</span>
            <span style={{ fontSize: 12, color: 'rgba(243,240,232,0.5)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={13} /> {formatBlogDate(post.date)}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(243,240,232,0.5)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
          <h1 style={{ maxWidth: '22ch' }}>{post.title}</h1>
          <p className="v2-inner-lede">{post.excerpt}</p>
          <p style={{ marginTop: 18, fontSize: 13, color: 'rgba(243,240,232,0.5)' }}>
            By <strong style={{ color: '#f3f0e8' }}>{post.author}</strong>
          </p>
        </section>

        <article className="v2-inner-mid v2-prose" style={{ paddingBottom: 48 }}>
          {post.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
            </div>
          ))}
        </article>

        {post.faqs.length > 0 && (
          <section className="v2-section" style={{ paddingTop: 0 }}>
            <div className="v2-inner-mid">
              <p className="v2-kicker">FAQs</p>
              <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 750 }}>From this article</h2>
              <div className="v2-faq">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="v2-faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="v2-section">
          <div className="v2-inner">
            <p className="v2-kicker">Keep reading</p>
            <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 750 }}>Recommended</h2>
            <div className="v2-grid-3">
              {otherPosts.map((other) => (
                <Link key={other.slug} href={`/blog/${other.slug}`} className="v2-card v2-card-body">
                  <span className="v2-badge" style={{ marginBottom: 12 }}>
                    {other.category}
                  </span>
                  <h3>{other.title}</h3>
                  <p style={{ marginTop: 8 }}>{other.excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: '#3d9b6a' }}>
                    Read <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
