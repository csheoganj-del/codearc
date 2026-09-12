import { site, telHref, whatsappUrl } from '../../config/site';

export default function FinalCTA() {
  const whatsappLink = whatsappUrl(
    'Hi CodeArc, I would like to discuss a website or software project.'
  );

  return (
    <section id="contact" className="w-full bg-[#EDE6DA] py-16 sm:py-24 lg:py-36 border-b border-[rgba(24,23,19,0.08)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        <div className="max-w-[1040px]">
          
          <div className="flex items-center gap-2.5 mb-4 sm:mb-8">
            <span className="h-px w-6 sm:w-8 bg-[#E85A2F]" />
            <p className="font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-[#C43C11] font-semibold">
              Talk Directly with the Team
            </p>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[54px] lg:text-[78px] xl:text-[88px] font-normal leading-[1.04] sm:leading-[1.0] tracking-[-0.035em] text-[#181713] text-balance">
            Let’s build something <br />
            worth keeping.
          </h2>

          <p className="mt-4 sm:mt-9 text-[16px] sm:text-[22px] leading-[1.62] text-[#6B675F] max-w-[580px]">
            Tell us what you are trying to improve. We will help you shape the right website or software project, with a clear scope and an honest next step.
          </p>

          {/* Action buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5">
            <a
              href={"mailto:" + site.email + "?subject=Project%20Enquiry%20%E2%80%94%20CodeArc"}
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4.5 rounded-full bg-[#E85A2F] text-[#FCFAF5] font-semibold text-[14px] sm:text-[15px] tracking-wide hover:bg-[#C43C11] shadow-[0_8px_24px_-6px_rgba(232,90,47,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 text-center"
            >
              <span>Email CodeArc</span>
              <span className="text-base leading-none">↗</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4.5 rounded-full bg-[#181713] text-[#FCFAF5] font-semibold text-[14px] sm:text-[15px] tracking-wide hover:bg-[#2f7a4e] transition-colors shadow-sm text-center"
            >
              <span>Chat on WhatsApp</span>
              <span className="text-base leading-none">↗</span>
            </a>
          </div>

          {/* Contact details */}
          <div className="mt-10 sm:mt-24 pt-8 sm:pt-10 border-t border-[rgba(24,23,19,0.12)] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 font-mono text-[12px] sm:text-[13px] text-[#6B675F]">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[rgba(24,23,19,0.45)] mb-1.5">
                Phone
              </span>
              <a
                href={telHref()}
                className="text-[#181713] font-medium text-[15px] hover:text-[#C43C11] transition-colors"
              >
                {site.phone.display}
              </a>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[rgba(24,23,19,0.45)] mb-1.5">
                Email
              </span>
              <a
                href={"mailto:" + site.email}
                className="text-[#181713] font-medium text-[15px] hover:text-[#C43C11] transition-colors"
              >
                {site.email}
              </a>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[rgba(24,23,19,0.45)] mb-1.5">
                Typical Reply Time
              </span>
              <span className="text-[#181713] font-medium text-[15px]">Within one working day</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
