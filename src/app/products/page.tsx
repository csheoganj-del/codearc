import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { productsData, productStatusClass, statusLabel } from '../../data/products';
import { site } from '../../config/site';
import { socialMetadata } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'CodeArc product family: RestroSuite (restaurant POS), StaySuite (hotel PMS), MediSuite (clinic / OPD).',
  alternates: {
    canonical: `${site.domain}/products`,
  },
  ...socialMetadata({
    title: 'Products | CodeArc',
    description: 'RestroSuite, StaySuite and MediSuite — vertical products from CodeArc.',
    url: `${site.domain}/products`,
  }),
};

export default function ProductsPage() {
  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Products</span>
          </p>
          <p className="v2-kicker">CodeArc product family</p>
          <h1>
            Three suites. <em>One brand.</em>
          </h1>
          <p className="v2-inner-lede">
            RestroSuite for restaurants, StaySuite for hotels, MediSuite for clinics — products
            we improve for many businesses, built by the same team behind our client work.
          </p>
          <div className="v2-inline-actions">
            <a
              className="v2-btn v2-btn-primary"
              href="mailto:hello@codearc.co.in?subject=About your products"
            >
              Ask about a product <ArrowRight size={16} />
            </a>
            <Link className="v2-btn v2-btn-ghost" href="/#work">
              Client projects
            </Link>
          </div>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <div className="v2-grid-3">
            {productsData.map((product) => (
              <Link key={product.slug} href={product.href} className="v2-card">
                <div className="v2-work-media">
                  <Image
                    src={product.image}
                    alt={`${product.name} preview`}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="v2-card-body">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <span className={`v2-status-pill ${productStatusClass(product.status)}`}>
                      {statusLabel(product.status)}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'rgba(243,240,232,0.4)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.category}
                    </span>
                  </div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {product.name}
                    <ArrowUpRight size={16} style={{ opacity: 0.5 }} />
                  </h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="v2-section v2-section-tight">
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">Product or custom?</p>
              <h2>A quick way we decide.</h2>
            </div>
            <p className="v2-section-aside">
              If five businesses would use the same screens, it might be a product. If your
              process is odd in a good way, we build custom.
            </p>
          </div>
          <div className="v2-grid-2">
            <article className="v2-card v2-card-static v2-card-body">
              <h3>Products</h3>
              <p>
                RestroSuite, StaySuite, MediSuite — same core for many customers. We fix bugs
                once and keep a public page for each.
              </p>
            </article>
            <article className="v2-card v2-card-static v2-card-body">
              <h3>Custom work</h3>
              <p>
                Your website, tourism site, or one-off system — scoped and built for you.
                See Wild Jawai, Bloom Café, Bro&apos;s Bar and other shipped work.
              </p>
            </article>
          </div>
        </section>

        <section className="v2-contact" id="contact">
          <div className="v2-contact-inner">
            <div>
              <p className="v2-kicker light">Not sure which path?</p>
              <h2>Describe the headache in plain words.</h2>
              <p>
                We&apos;ll tell you if it fits a product or needs a custom build. No long pitch.
              </p>
            </div>
            <div className="v2-contact-actions">
              <a
                className="v2-btn v2-btn-primary"
                href="mailto:hello@codearc.co.in?subject=Not sure if product or custom"
              >
                hello@codearc.co.in <ArrowRight size={16} />
              </a>
              <a
                className="v2-btn v2-btn-ghost-light"
                href="https://wa.me/919983721179"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
