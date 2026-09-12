import Image from 'next/image';
import Link from 'next/link';
import Logo from '../Logo';

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[800px] sm:min-h-[760px] lg:min-h-[660px] max-h-[1140px] bg-[#FAF6F0] overflow-hidden flex flex-col justify-between selection:bg-[#E85A2F]/25 selection:text-[#181713]">
      
      {/* Top Header: Floating Ivory Badges for 100% Logo & Nav Legibility over Photography */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 sm:px-10 lg:px-16 xl:px-20 pt-5 sm:pt-8 lg:pt-10 pointer-events-auto">
        
        {/* Logo Badge */}
        <div className="flex items-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FAF6F0] border border-[rgba(24,23,19,0.12)] shadow-[0_4px_24px_-4px_rgba(24,23,19,0.15)] transition-transform duration-300 hover:scale-[1.02]">
          <Logo variant="dark" />
        </div>

        {/* Navigation Badge: High-contrast, crystal clear links */}
        <nav className="flex items-center gap-2 sm:gap-8 lg:gap-10 text-[12px] sm:text-[15px] text-[#181713] font-medium tracking-wide px-3 sm:px-8 py-2 sm:py-3 rounded-full bg-[#FAF6F0] border border-[rgba(24,23,19,0.12)] shadow-[0_4px_24px_-4px_rgba(24,23,19,0.15)]">
          <Link href="#work" className="hover:text-[#C43C11] transition-colors">Work</Link>
          <Link href="#studio" className="hidden xs:inline hover:text-[#C43C11] transition-colors">Studio</Link>
          <Link href="#suite" className="hover:text-[#C43C11] transition-colors">Suite</Link>
          <Link href="#contact" className="hover:text-[#C43C11] transition-colors">Contact</Link>
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#181713] font-bold hover:text-[#C43C11] transition-colors ml-1.5 group"
          >
            <span>Start a project</span>
            <span className="text-xs font-semibold transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </Link>
        </nav>
      </header>

      {/* Photography with Seamless Soft Edge Fade into Warm Canvas */}
      <div className="relative w-full h-[52%] lg:h-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-[58%] xl:w-[60%] overflow-hidden z-0">
        <Image
          src="/images/codearc-rajasthan-hero-v2.webp"
          alt="Weathered Rajasthan sandstone arcade beside a reflecting pool at sunset"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />

        {/* Lower shadow gradient for tagline typography legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[rgba(18,16,13,0.92)] via-[rgba(18,16,13,0.35)] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* The Seamless Soft Edge Fade into #FAF6F0 */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-48 xl:w-72 bg-gradient-to-r from-transparent via-[#FAF6F0]/70 to-[#FAF6F0] pointer-events-none"
          aria-hidden="true"
        />

        {/* Integrated Tagline: Directly over lower water */}
        <div className="absolute bottom-6 sm:bottom-12 lg:bottom-18 xl:bottom-22 left-6 sm:left-12 lg:left-16 xl:left-20 z-10 text-[#FAF7F2]">
          <p className="font-serif text-[34px] sm:text-[50px] lg:text-[46px] xl:text-[60px] 2xl:text-[74px] font-normal leading-[1.0] tracking-[-0.03em] drop-shadow-[0_4px_26px_rgba(0,0,0,0.85)]">
            Design with purpose. <br />
            Build for years.
          </p>
        </div>
      </div>

      {/* Right Side: Editorial Space + Large Headline + Readable Copy + Studio CTA */}
      <div className="relative flex-1 lg:flex-initial lg:absolute lg:inset-y-0 lg:right-0 w-full lg:w-[50%] z-20 flex flex-col justify-center px-6 sm:px-12 lg:pl-10 lg:pr-12 xl:pl-12 xl:pr-16 py-6 sm:py-8 lg:py-0">
        <div className="max-w-[660px]">
          
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 h-px bg-[#E85A2F]" />
            <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-[#C43C11] font-bold">
              Design &amp; Software Studio &mdash; Rajasthan
            </span>
          </div>

          <h1 className="font-serif font-normal text-[#14120E] tracking-[-0.04em] leading-[0.95] sm:leading-[0.93] text-[29px] xs:text-[34px] sm:text-[52px] md:text-[66px] lg:text-[clamp(46px,4.2vw,64px)] text-balance">
            <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Distinctive websites.</span>
            <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Dependable software.</span>
          </h1>

          <p className="mt-4 sm:mt-7 text-[15px] sm:text-[19px] lg:text-[21px] leading-[1.55] sm:leading-[1.6] text-[#24221D] font-normal max-w-[520px]">
            We design distinctive websites for hospitality and growing businesses, then build the custom software behind them when the work calls for more.
          </p>

          <div className="mt-7 sm:mt-10 flex items-center gap-5 sm:gap-6">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 h-[48px] sm:h-[50px] px-8 sm:px-9 rounded-full border-[1.5px] border-[#181713] text-[#181713] text-[14px] sm:text-[15px] font-medium tracking-wide hover:bg-[#181713] hover:text-[#FAF7F2] transition-all duration-300 shadow-2xs"
            >
              <span>Start a project</span>
              <span className="text-sm font-semibold">↗</span>
            </Link>

            <Link
              href="#work"
              className="text-[14px] sm:text-[15px] font-medium text-[#4A453C] hover:text-[#181713] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.25)] hover:decoration-[#181713]"
            >
              View selected work
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Metadata: Crisp, Highly Legible Monospaced Line */}
      <footer className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-20 pb-5 sm:pb-7 lg:pb-9 pointer-events-none">
        <span className="text-[#FAF7F2] font-mono font-bold text-[12px] sm:text-[14px] tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          codearc.co.in
        </span>
        <span className="text-[#181713] font-mono font-bold text-[12px] sm:text-[14px] tracking-[0.22em] uppercase">
          web + software
        </span>
      </footer>

    </section>
  );
}
