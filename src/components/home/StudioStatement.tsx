export default function StudioStatement() {
  const pillars = [
    {
      num: '01',
      title: 'Direct Collaboration',
      desc: 'You work directly with the people designing and building your project. Fewer handoffs mean clearer decisions and a more coherent result.',
    },
    {
      num: '02',
      title: 'Built with Discipline',
      desc: 'We set clear performance targets, test the important journeys, and choose technology that fits the way your business actually works.',
    },
    {
      num: '03',
      title: 'Yours to Keep',
      desc: 'Clean code, practical documentation, and full ownership give you a digital asset that can evolve without trapping you with one supplier.',
    },
  ];

  return (
    <section id="studio" className="w-full bg-[#EDE6DA] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.08)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        {/* Architectural Quote Container */}
        <div className="max-w-[1120px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-8">
            <span className="h-px w-6 sm:w-8 bg-[#E85A2F]" />
            <p className="font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-[#C43C11] font-semibold">
              Built in Rajasthan
            </p>
            <span className="h-px w-6 sm:w-8 bg-[#E85A2F]" />
          </div>

          <h2 className="font-serif text-[30px] sm:text-[48px] lg:text-[76px] font-normal leading-[1.08] sm:leading-[1.04] tracking-[-0.035em] text-[#181713]">
            &ldquo;Considered design. Dependable engineering.&rdquo;
          </h2>

          <p className="mt-5 sm:mt-10 text-[15px] sm:text-[20px] lg:text-[22px] leading-[1.62] text-[#6B675F] font-normal max-w-[64ch] mx-auto">
            We bring the patience of a design studio and the discipline of an engineering team to every project. The result is thoughtful, useful, and made to hold up beyond the launch.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-10 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 pt-8 sm:pt-14 border-t border-[rgba(24,23,19,0.12)]">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="flex flex-col">
              <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#C43C11] mb-2 sm:mb-4">
                {pillar.num}
              </span>
              <h3 className="font-serif text-[22px] sm:text-[28px] font-normal text-[#181713] mb-2 sm:mb-3 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-[15px] sm:text-[17px] leading-[1.62] text-[#6B675F]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
