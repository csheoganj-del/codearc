import type { ComponentType, CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AppWindow,
  Check,
  Eye,
  MessageSquare,
  Monitor,
  Rocket,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { servicesData, type ServiceIconName } from '../../data/services';

export const dynamicParams = false;

const serviceIcons: Record<
  ServiceIconName,
  ComponentType<{ className?: string; style?: CSSProperties; size?: number }>
> = {
  Monitor,
  AppWindow,
  Sparkles,
  Rocket,
  Smartphone,
  MessageSquare,
  Eye,
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData[params.slug];
  if (!service) return {};

  const title = service.metaTitle.replace(/\s*\|\s*CodeArc\s*$/i, '');

  return {
    title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://codearc.co.in/${params.slug}`,
    },
    openGraph: {
      title: service.metaTitle.includes('CodeArc') ? service.metaTitle : `${service.title} | CodeArc`,
      description: service.metaDescription,
      url: `https://codearc.co.in/${params.slug}`,
      images: [
        {
          url: '/brand/codearc-og.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} | CodeArc`,
        },
      ],
    },
  };
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData[params.slug];

  if (!service) notFound();

  const IconComponent = serviceIcons[service.icon] || Sparkles;

  const otherServices = Object.values(servicesData).filter((s) => s.slug !== service.slug);

  return (
    <div className="v2-page">
      <Navbar />
      <main id="main-content">
        <section className="v2-inner v2-inner-hero">
          <p className="v2-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#build">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(61,155,106,0.12)',
                border: '1px solid rgba(61,155,106,0.25)',
              }}
            >
              <IconComponent className="w-7 h-7" style={{ color: '#3d9b6a' }} />
            </div>
            <div>
              <p className="v2-kicker" style={{ marginBottom: 4 }}>
                {service.subtitle}
              </p>
              <h1 style={{ maxWidth: '16ch' }}>{service.title}</h1>
            </div>
          </div>

          <p className="v2-inner-lede">{service.description}</p>
        </section>

        <section className="v2-section" style={{ paddingTop: 0 }}>
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">Included</p>
              <h2>What this usually covers</h2>
            </div>
          </div>
          <div className="v2-grid-2">
            {service.features.map((feature) => (
              <div key={feature.title} className="v2-card v2-card-static v2-card-body" style={{ display: 'flex', gap: 14 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    background: 'rgba(61,155,106,0.12)',
                  }}
                >
                  <Check className="w-4 h-4" style={{ color: '#3d9b6a' }} />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-section v2-section-tight">
          <div className="v2-inner-mid v2-prose">
            {service.sections.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-section">
          <div className="v2-inner">
            <p className="v2-kicker">Also</p>
            <h2 style={{ marginBottom: 20, fontSize: 28, fontWeight: 750 }}>Other services</h2>
            <div className="v2-grid-3">
              {otherServices.map((other) => (
                <Link key={other.slug} href={`/${other.slug}`} className="v2-card v2-card-body">
                  <h3 style={{ fontSize: 16 }}>{other.title}</h3>
                  <p style={{ marginTop: 8 }}>{other.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {service.faqs.length > 0 && (
          <section className="v2-section" style={{ paddingTop: 0 }}>
            <div className="v2-inner-mid">
              <p className="v2-kicker">FAQ</p>
              <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 750 }}>Questions we get a lot</h2>
              <div className="v2-faq">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="v2-faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
