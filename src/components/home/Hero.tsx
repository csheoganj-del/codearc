import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] bg-[#F5F1E8] overflow-hidden flex flex-col justify-between selection:bg-[#E85A2F]/25 selection:text-[#181713] pt-20 sm:pt-24 lg:pt-0">
      
      {/* Photography with Seamless Soft Edge Fade into Warm Canvas */}
      <div className="relative w-full h-[48svh] sm:h-[52svh] lg:h-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-[56%] xl:w-[58%] overflow-hidden z-0">
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
          className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[rgba(18,16,13,0.92)] via-[rgba(18,16,13,0.35)] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* The Seamless Soft Edge Fade into #F5F1E8 */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-48 xl:w-72 bg-gradient-to-r from-transparent via-[#F5F1E8]/70 to-[#F5F1E8] pointer-events-none"
          aria-hidden="true"
        />

        {/* Integrated Tagline: Directly over lower water */}
        <div className="absolute bottom-6 sm:bottom-12 lg:bottom-16 xl:bottom-20 left-6 sm:left-12 lg:left-14 xl:left-16 z-10 text-[#FAF7F2]">
          <p className="font-serif text-[32px] sm:text-[48px] lg:text-[44px] xl:text-[56px] 2xl:text-[68px] font-normal leading-[1.02] tracking-[-0.03em] drop-shadow-[0_4px_26px_rgba(0,0,0,0.85)]">
            Design with purpose. <br />
            Build for years.
          </p>
        </div>
      </div>

      {/* Right Side: Editorial Space + Large Headline + Readable Copy + Studio CTA */}
      <div className="relative flex-1 lg:flex-initial lg:absolute lg:inset-y-0 lg:right-0 w-full lg:w-[48%] xl:w-[46%] z-20 flex flex-col justify-center px-6 sm:px-12 lg:pl-8 lg:pr-12 xl:pl-10 xl:pr-16 py-8 sm:py-10 lg:py-0">
        <div className="max-w-[620px]">
          
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 h-px bg-[#E85A2F]" />
            <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-[#C43C11] font-bold">
              Design &amp; Software Studio &mdash; Rajasthan
            </span>
          </div>

          <h1 className="font-serif font-normal text-[#14120E] tracking-[-0.04em] leading-[0.98] sm:leading-[0.94] text-[32px] xs:text-[38px] sm:text-[54px] md:text-[64px] lg:text-[clamp(44px,4vw,60px)] text-balance">
            <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Distinctive websites.</span>
            <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Dependable software.</span>
          </h1>

          <p className="mt-4 sm:mt-7 text-[16px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-[#2C2923] font-normal max-w-[520px]">
            We design distinctive websites for hospitality and growing businesses, then build the custom software behind them when the work calls for more.
          </p>

          <div className="mt-7 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 h-[48px] sm:h-[50px] px-8 sm:px-9 rounded-full bg-[#181713] text-[#FAF7F2] text-[14px] sm:text-[15px] font-medium tracking-wide hover:bg-[#C43C11] transition-all duration-300 shadow-sm"
            >
              <span>Start a project</span>
              <span className="text-sm font-semibold">↗</span>
            </Link>

            <Link
              href="#estimate"
              className="inline-flex items-center justify-center gap-2 h-[48px] sm:h-[50px] px-6 rounded-full border border-[rgba(24,23,19,0.2)] text-[#181713] text-[14px] sm:text-[15px] font-medium hover:border-[#181713] hover:bg-[rgba(24,23,19,0.04)] transition-all"
            >
              <span>Estimate timeline</span>
              <span className="text-xs font-mono text-[#C43C11]">calc</span>
            </Link>

            <Link
              href="#work"
              className="text-[14px] sm:text-[15px] font-medium text-[#4A453C] hover:text-[#181713] transition-colors underline underline-offset-4 decoration-[rgba(24,23,19,0.25)] hover:decoration-[#181713] ml-1"
            >
              View selected work
            </Link>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[rgba(24,23,19,0.12)] grid grid-cols-3 gap-4 font-mono text-[11px] sm:text-[12px]">
            <div>
              <span className="block text-[#C43C11] font-bold text-sm sm:text-base">100%</span>
              <span className="text-[#6B675F]">Offline POS sync</span>
            </div>
            <div>
              <span className="block text-[#181713] font-bold text-sm sm:text-base">24/7</span>
              <span className="text-[#6B675F]">Guest bookings</span>
            </div>
            <div>
              <span className="block text-[#181713] font-bold text-sm sm:text-base">Zero</span>
              <span className="text-[#6B675F]">Vendor lock-in</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Metadata: Crisp, Highly Legible Monospaced Line */}
      <footer className="relative lg:absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-20 py-4 sm:pb-7 lg:pb-9 pointer-events-none">
        <span className="text-[#6B675F] lg:text-[#FAF7F2] font-mono font-bold text-[11px] sm:text-[13px] tracking-[0.22em] uppercase lg:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          codearc.co.in
        </span>
        <span className="text-[#181713] font-mono font-bold text-[11px] sm:text-[13px] tracking-[0.22em] uppercase">
          web + business software · rajasthan
        </span>
      </footer>

    </section>
  );
}
