import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getProduct, productsData, productStatusClass, statusLabel } from '../../../data/products';
import { plansForProduct } from '../../../data/pricing';
import { site } from '../../../config/site';
import { socialMetadata } from '../../../lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  const url = `${site.domain}/products/${product.slug}`;
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: url,
    },
    ...socialMetadata({
      title: `${product.metaTitle} | CodeArc`,
      description: product.metaDescription,
      url,
      imageUrl: product.image,
      imageAlt: product.name,
    }),
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = productsData.filter((p) => p.slug !== product.slug);
  const productPlans = plansForProduct(product.slug);
  const primaryPayPlan = productPlans[0];

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </p>

          <div className="v2-product-hero">
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                <span className={`v2-status-pill ${productStatusClass(product.status)}`}>
                  {statusLabel(product.status)}
                </span>
                <span className="v2-badge v2-badge-muted">{product.category}</span>
              </div>
              <h1>{product.name}</h1>
              <p className="v2-inner-lede">{product.description}</p>
              <p className="v2-inner-lede" style={{ marginTop: 12, fontSize: 14 }}>
                <strong style={{ color: '#f3f0e8' }}>Who it’s for:</strong> {product.audience}
              </p>
              <div className="v2-inline-actions">
                {product.externalUrl ? (
                  <a
                    className="v2-btn v2-btn-primary"
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open the live app <ExternalLink size={16} />
                  </a>
                ) : (
                  <a
                    className="v2-btn v2-btn-primary"
                    href={`mailto:hello@codearc.co.in?subject=${encodeURIComponent(`About ${product.name}`)}`}
                  >
                    I’m interested <ArrowRight size={16} />
                  </a>
                )}
                {primaryPayPlan ? (
                  <Link className="v2-btn v2-btn-ghost" href={`/pay?plan=${primaryPayPlan.id}`}>
                    Pay for {product.name}
                  </Link>
                ) : (
                  <Link className="v2-btn v2-btn-ghost" href="/pay">
                    Pay online
                  </Link>
                )}
                <a className="v2-btn v2-btn-ghost" href="mailto:hello@codearc.co.in">
                  Email us
                </a>
              </div>
            </div>

            <div className="v2-media">
              <Image
                src={product.image}
                alt={`${product.name} screen`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="v2-section" style={{ paddingTop: 12 }}>
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">What’s inside</p>
              <h2>The parts that matter day to day.</h2>
            </div>
          </div>
          <div className="v2-grid-2">
            {product.highlights.map((item) => (
              <div
                key={item}
                className="v2-card v2-card-static v2-card-body"
                style={{ display: 'flex', gap: 12 }}
              >
                <Check size={18} style={{ color: '#3d9b6a', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 style={{ marginBottom: 0 }}>{item}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-section v2-section-tight">
          <div className="v2-split-layout">
            <div className="v2-prose">
              <h2 style={{ marginTop: 0 }}>Why we built it</h2>
              <p>{product.story}</p>
              <p>
                {product.name} sits under CodeArc — same team that does custom websites and
                apps. Products get a long road; client projects stay separate so neither story
                gets muddy.
              </p>
            </div>
            <div>
              <div className="v2-aside-panel">
                <h3>Status</h3>
                <p>{statusLabel(product.status)}</p>
              </div>
              <div className="v2-aside-panel">
                <h3>Made by</h3>
                <p>CodeArc, Rajasthan</p>
              </div>
              <div className="v2-aside-panel">
                <h3>Talk to us</h3>
                <p>
                  <a href="mailto:hello@codearc.co.in" style={{ color: '#3d9b6a' }}>
                    hello@codearc.co.in
                  </a>
                </p>
              </div>
              {primaryPayPlan ? (
                <div className="v2-aside-panel">
                  <h3>Pay online</h3>
                  <p style={{ marginBottom: 12 }}>
                    Setup and plan payments via Razorpay on codearc.co.in.
                  </p>
                  <Link
                    className="v2-btn v2-btn-primary"
                    href={`/pay?plan=${primaryPayPlan.id}`}
                    style={{ display: 'inline-flex' }}
                  >
                    Pay for {product.name} <ArrowRight size={16} />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="v2-section">
            <div className="v2-section-head">
              <div>
                <p className="v2-kicker">Also from us</p>
                <h2>Other products</h2>
              </div>
              <Link className="v2-btn v2-btn-ghost" href="/products">
                All products
              </Link>
            </div>
            <div className="v2-grid-2">
              {others.map((item) => (
                <Link key={item.slug} href={item.href} className="v2-card v2-card-body">
                  <span className={`v2-status-pill ${productStatusClass(item.status)}`}>
                    {statusLabel(item.status)}
                  </span>
                  <h3 style={{ marginTop: 12 }}>{item.name}</h3>
                  <p>{item.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="v2-contact">
          <div className="v2-contact-inner">
            <div>
              <p className="v2-kicker light">Next</p>
              <h2>Curious about {product.name}?</h2>
              <p>
                Send a short note about your setup. We’ll reply with a straight answer —
                fit, not fit, or “you need custom instead.”
              </p>
            </div>
            <div className="v2-contact-actions">
              <a
                className="v2-btn v2-btn-primary"
                href={`mailto:hello@codearc.co.in?subject=${encodeURIComponent(`${product.name} question`)}`}
              >
                Email us <ArrowRight size={16} />
              </a>
              {primaryPayPlan ? (
                <Link
                  className="v2-btn v2-btn-ghost-light"
                  href={`/pay?plan=${primaryPayPlan.id}`}
                >
                  Pay for {product.name}
                </Link>
              ) : null}
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
