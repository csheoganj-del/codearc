import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { listedBlogPosts } from '../../data/blog';
import { formatBlogDate } from '../../lib/dates';

import { site } from '../../config/site';
import { socialMetadata } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from CodeArc on websites, cost, SEO, and building software without the jargon.',
  alternates: {
    canonical: `${site.domain}/blog`,
  },
  ...socialMetadata({
    title: 'Blog | CodeArc',
    description:
      'Notes from CodeArc on websites, cost, SEO, and building software without the jargon.',
    url: `${site.domain}/blog`,
  }),
};

export default function BlogListingPage() {
  const posts = listedBlogPosts();

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Blog</span>
          </p>
          <p className="v2-kicker">From the studio</p>
          <h1>
            Notes on websites <em>& software.</em>
          </h1>
          <p className="v2-inner-lede">
            Written the way we’d explain it to a shop owner over chai — costs, SEO, and what
            to watch out for when someone sells you a “custom” template.
          </p>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <div className="v2-grid-2">
            {posts.map((post) => (
              <article key={post.slug} className="v2-card v2-card-static">
                <div
                  className="v2-card-body"
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 220 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span className="v2-badge">{post.category}</span>
                    <span
                      style={{
                        fontSize: 12,
                        color: 'rgba(243,240,232,0.45)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Calendar size={13} />
                      {formatBlogDate(post.date)}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 style={{ fontSize: 22, marginBottom: 10 }}>{post.title}</h3>
                  </Link>
                  <p style={{ flex: 1 }}>{post.excerpt || post.metaDescription}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="v2-btn v2-btn-ghost"
                    style={{ marginTop: 18, alignSelf: 'flex-start' }}
                  >
                    Read <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
