export default function Philosophy() {
  const principles = [
    {
      num: '01',
      title: 'Clear Foundations',
      desc: 'We use clean, well-structured code and explain the important decisions. Your project stays understandable as it grows.',
    },
    {
      num: '02',
      title: 'Tested in Real Conditions',
      desc: 'We design around actual working conditions: unreliable connections, busy counters, quick guest turnarounds, and staff who need answers fast.',
    },
    {
      num: '03',
      title: 'Full Ownership',
      desc: 'You own the code, data, and intellectual property created for you. We keep the handover clear and avoid unnecessary lock-in.',
    },
  ];

  return (
    <section className="w-full bg-[#F5F1E8] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.08)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 mb-10 sm:mb-20 border-b border-[rgba(24,23,19,0.1)]">
          <div>
            <span className="font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-[#C43C11] font-semibold block mb-2 sm:mb-3">
              04 / How We Build
            </span>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[68px] font-normal leading-[1.04] tracking-[-0.03em] text-[#181713]">
              Made for real work. <br className="hidden sm:inline" />
              Built to last.
            </h2>
          </div>
          <p className="max-w-[460px] text-[15px] sm:text-[18px] leading-[1.6] text-[#6B675F]">
            Rajasthan’s enduring architecture reminds us that good work begins with sound foundations, honest materials, and care in every detail.
          </p>
        </div>

        {/* 3 Principles — Unboxed Editorial Columns (Zero Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 xl:gap-20">
          {principles.map((item) => (
            <div key={item.num} className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-[14px] font-semibold text-[#C43C11] block pb-3 border-b border-[rgba(24,23,19,0.1)]">
                  {item.num} / PRINCIPLE
                </span>
                <h3 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#181713] mt-5 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#6B675F]">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[rgba(24,23,19,0.08)] font-mono text-[11px] tracking-widest uppercase text-[#6B675F]">
                CodeArc Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
