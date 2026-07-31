import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '80px 20px' }}>
        <div style={{ maxWidth: 460, textAlign: 'center' }}>
          <span className="v2-badge" style={{ marginBottom: 20 }}>
            404
          </span>
          <h1
            style={{
              margin: '16px 0 12px',
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            Nothing here.
          </h1>
          <p style={{ color: 'rgba(243,240,232,0.62)', lineHeight: 1.55, marginBottom: 28 }}>
            That link is broken or the page moved. Try the home page, products, or the blog.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link className="v2-btn v2-btn-primary" href="/">
              <Home size={16} /> Home <ArrowRight size={16} />
            </Link>
            <Link className="v2-btn v2-btn-ghost" href="/products">
              Products
            </Link>
            <Link className="v2-btn v2-btn-ghost" href="/blog">
              Blog
            </Link>
          </div>
          <p style={{ marginTop: 28, fontSize: 14, color: 'rgba(243,240,232,0.5)' }}>
            Still stuck?{' '}
            <a href="mailto:hello@codearc.co.in" style={{ color: '#3d9b6a', fontWeight: 600 }}>
              hello@codearc.co.in
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
