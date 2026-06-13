import { notFound } from 'next/navigation';
import * as Icons from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { servicesData } from '../../data/services';
import Link from 'next/link';

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData[params.slug];
  if (!service) {
    return {};
  }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://codearc.co.in/${params.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://codearc.co.in/${params.slug}`,
      images: [
        {
          url: '/assets/codearc_og.png',
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

  if (!service) {
    notFound();
  }

  // Dynamically resolve icon
  const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;

  // Find other services for internal linking
  const otherServices = Object.values(servicesData).filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-16">
        {/* Service Hero */}
        <section className="relative py-20 overflow-hidden border-b border-[#E2E8F0]">
          <div className="absolute inset-0 bg-grid mask-fade-bottom pointer-events-none" />
          <div
            className="absolute top-[-10%] right-[-10%] w-[35%] aspect-square rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: service.accentColor }}
          />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 justify-center sm:justify-start">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: service.accentSoft }}
              >
                <IconComponent className="w-8 h-8" style={{ color: service.accentColor }} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: service.accentColor }}>
                  {service.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-1 text-[#0F172A]">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-lg md:text-xl text-[#475569] leading-relaxed max-w-3xl mb-10">
              {service.description}
            </p>

            {/* Keyword tags */}
            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
              {service.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#64748B]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Checklists & Key Deliverables */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#0F172A]">Key Offerings & Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: service.accentSoft }}
                  >
                    <Icons.Check className="w-4 h-4" style={{ color: service.accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{feature}</h3>
                    <p className="text-sm text-[#64748B]">Professional grade, built with care to ensure high performance and seamless client flows.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rich Editorial Body Content (1200 - 2000 words copy) */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-slate max-w-none space-y-12">
              {service.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg text-[#475569] leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Linking Bridge */}
        <section className="py-12 border-y border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#94A3B8] mb-6">Other Development & Design Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${other.slug}`}
                  className="px-4 py-3 rounded-xl border border-[#E2E8F0] hover:border-[#4F46E5] hover:bg-[#EEF2FF]/20 text-center transition-all"
                >
                  <span className="text-xs font-bold text-[#475569] hover:text-[#4F46E5] block truncate">
                    {other.title.split(' ')[0]} {other.title.split(' ')[1] || ''}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 md:p-8 rounded-3xl bg-white border border-[#E2E8F0] space-y-3 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0F172A] flex gap-2">
                    <span className="text-[#4F46E5] font-extrabold">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-base text-[#475569] leading-relaxed pl-6 border-l-2 border-[#E2E8F0]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic CTA Hook */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
