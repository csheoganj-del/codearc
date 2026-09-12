import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import SelectedWork from '../components/home/SelectedWork';
import StudioStatement from '../components/home/StudioStatement';
import Capabilities from '../components/home/Capabilities';
import ProductFamily from '../components/home/ProductFamily';
import Philosophy from '../components/home/Philosophy';
import FinalCTA from '../components/home/FinalCTA';
import Footer from '../components/Footer';
import { site } from '../config/site';
import { socialMetadata } from '../lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: 'CodeArc — Web Design & Business Software Studio, Rajasthan',
  },
  description:
    'CodeArc is an independent web design and business software studio in Rajasthan. We create distinctive websites and practical products including RestroSuite, StaySuite, and MediSuite.',
  alternates: { canonical: site.domain + '/' },
  ...socialMetadata({
    title: 'CodeArc — Web Design & Business Software Studio',
    description:
      'Distinctive websites and practical business software, designed and built in Rajasthan for growing businesses across India.',
    url: site.domain + '/',
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#181713] flex flex-col selection:bg-[#E85A2F]/20 selection:text-[#181713]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <SelectedWork />
        <StudioStatement />
        <Capabilities />
        <ProductFamily />
        <Philosophy />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
