import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ExternalLink, ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { caseStudiesData } from '../../../data/case-studies';
import { site } from '../../../config/site';
import { socialMetadata } from '../../../lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const study = caseStudiesData.find((s) => s.id === params.id);
  if (!study) return {};
  const url = `${site.domain}/case-studies/${params.id}`;
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: {
      canonical: url,
    },
    ...socialMetadata({
      title: study.metaTitle,
      description: study.metaDescription,
      url,
      imageUrl: study.image,
      imageAlt: study.title,
    }),
  };
}

export default async function CaseStudyPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const study = caseStudiesData.find((s) => s.id === params.id);

  if (!study) notFound();

  const isProduct = study.kind === 'product';

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">
              <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Home
            </Link>
            <span>/</span>
            <Link href="/#work">Work</Link>
            <span>/</span>
            <span>{study.title}</span>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <span className="v2-badge">{study.statusLabel}</span>
            {isProduct ? <span className="v2-badge v2-badge-accent">CodeArc product</span> : null}
          </div>

          <h1>{study.title}</h1>
          <p className="v2-inner-lede">{study.subtitle}</p>
          <p className="v2-inner-lede" style={{ marginTop: 10 }}>
            {study.description}
          </p>

          <div className="v2-inline-actions">
            {study.isExternal ? (
              <a
                className="v2-btn v2-btn-primary"
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site <ExternalLink size={16} />
              </a>
            ) : (
              <Link className="v2-btn v2-btn-primary" href={study.url}>
                Talk to us
              </Link>
            )}
            {isProduct && (
              <Link className="v2-btn v2-btn-ghost" href={`/products/${study.id}`}>
                Product page
              </Link>
            )}
            <span style={{ fontSize: 13, color: 'rgba(243,240,232,0.55)', alignSelf: 'center' }}>
              Built by <strong style={{ color: '#f3f0e8' }}>CodeArc</strong>
            </span>
          </div>

          <div className="v2-tags">
            {study.tags.map((tag) => (
              <span key={tag} className="v2-tag">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="v2-inner" style={{ paddingBottom: 48 }}>
          <div className="v2-media" style={{ aspectRatio: '16 / 10' }}>
            <Image
              src={study.image}
              alt={`${study.title} preview`}
              fill
              sizes="(max-width: 900px) 100vw, 1180px"
              className="object-cover object-top"
              priority
              unoptimized={study.image.endsWith('.svg')}
            />
          </div>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <div className="v2-split-layout">
            <div className="v2-prose">
              <h2 style={{ marginTop: 0 }}>Challenge</h2>
              <p>{study.challenge}</p>
              <h2>Approach</h2>
              <p>{study.research}</p>
              <h2>Build</h2>
              <p>{study.designProcess}</p>
              <h2>Status</h2>
              <p>{study.results}</p>
            </div>

            <div>
              <div className="v2-aside-panel">
                <h3>How it was built</h3>
                <p>{study.techStackDetails}</p>
              </div>
              <div className="v2-aside-panel">
                <h3>What we focused on</h3>
                <p>{study.performanceImprovements}</p>
              </div>
              <div className="v2-aside-panel">
                <h3>Includes</h3>
                <ul className="v2-list-check">
                  {study.features.map((feat) => (
                    <li key={feat}>
                      <Check size={16} style={{ color: '#3d9b6a', flexShrink: 0, marginTop: 2 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-contact">
          <div className="v2-contact-inner">
            <div>
              <p className="v2-kicker light">Next</p>
              <h2>Need something in this direction?</h2>
              <p>
                Mail a few lines about your business. We&apos;ll say if it&apos;s custom work or
                closer to RestroSuite, StaySuite or MediSuite.
              </p>
            </div>
            <div className="v2-contact-actions">
              <a
                className="v2-btn v2-btn-primary"
                href="mailto:hello@codearc.co.in?subject=Saw your work"
              >
                hello@codearc.co.in
              </a>
              <Link className="v2-btn v2-btn-ghost-light" href="/products">
                Our products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
