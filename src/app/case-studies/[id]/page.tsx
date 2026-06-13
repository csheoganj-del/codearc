import { notFound } from 'next/navigation';
import * as Icons from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { caseStudiesData } from '../../../data/case-studies';

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const study = caseStudiesData.find((s) => s.id === params.id);
  if (!study) {
    return {};
  }
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: {
      canonical: `https://codearc.co.in/case-studies/${params.id}`,
    },
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      url: `https://codearc.co.in/case-studies/${params.id}`,
      images: [
        {
          url: study.image,
          alt: study.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const study = caseStudiesData.find((s) => s.id === params.id);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0F172A] font-sans relative">
      <Navbar />

      <main className="pt-32 pb-16">
        {/* Case Study Hero */}
        <section className="relative py-20 overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="absolute inset-0 bg-grid mask-fade-bottom pointer-events-none" />
          <div
            className="absolute top-[-10%] left-[-15%] w-[40%] aspect-square rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: study.accentColor }}
          />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <span
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold mb-5 bg-white border border-[#E2E8F0]"
              style={{ color: study.accentColor }}
            >
              Case Study
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-4">
              {study.title}
            </h1>
            <p className="text-xl text-[#475569] leading-relaxed max-w-3xl mb-8">
              {study.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold text-sm hover:shadow-[0_12px_32px_-10px_rgba(79,70,229,0.55)] transition-all"
              >
                Visit Live Site
                <Icons.ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-sm text-[#64748B] font-medium">
                Created by: <span className="font-bold text-[#334155]">{study.creator}</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-semibold text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Mockup Preview */}
        <section className="py-12 max-w-5xl mx-auto px-6">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
            <div className="h-10 bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 max-w-xs h-5 rounded-md bg-white border border-[#E2E8F0] px-2.5 flex items-center">
                <span className="text-[10px] text-[#94A3B8] font-medium truncate">{study.url}</span>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden bg-slate-950">
              <img
                src={study.image}
                alt={`${study.title} Mockup`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* Narrative breakdown */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              {/* Challenge */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">Client Challenge</h2>
                <p className="text-base md:text-lg text-[#475569] leading-relaxed">{study.challenge}</p>
              </div>

              {/* Research */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">Research & Insights</h2>
                <p className="text-base md:text-lg text-[#475569] leading-relaxed">{study.research}</p>
              </div>

              {/* Design Process */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">Design Process & UX</h2>
                <p className="text-base md:text-lg text-[#475569] leading-relaxed">{study.designProcess}</p>
              </div>
            </div>

            <div className="space-y-8 bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0]">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-3">Tech Stack Details</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{study.techStackDetails}</p>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-3">Performance Audit</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{study.performanceImprovements}</p>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-3">Project Deliverables</h3>
                <ul className="space-y-2 text-sm text-[#475569] font-medium">
                  {study.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icons.Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2">Final Outcome</h3>
                <div className="text-xl font-extrabold text-[#16A34A]">{study.results}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
