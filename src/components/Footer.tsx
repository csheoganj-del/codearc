import Link from 'next/link';
import { site, telHref } from '../config/site';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#EDE6DA] border-t border-[rgba(24,23,19,0.1)] py-12 sm:py-24 text-[#181713]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 pb-10 sm:pb-16 border-b border-[rgba(24,23,19,0.1)]">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Logo variant="dark" />
              <p className="mt-4 sm:mt-6 text-[15px] sm:text-[16px] leading-[1.65] text-[#6B675F] max-w-[42ch]">
                An independent design and software studio in Rajasthan. We create distinctive websites and practical business systems for hospitality brands and growing teams.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 text-[12px] sm:text-[13px] font-mono text-[#6B675F]">
              <span>{site.region.label}</span> · <span>Working with businesses across India</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12">
            <div>
              <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#6B675F] font-semibold mb-3 sm:mb-5">
                Studio
              </h3>
              <ul className="space-y-2.5 sm:space-y-3.5 text-[14px] sm:text-[15px]">
                <li>
                  <Link href="/#work" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link href="/#studio" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    The Studio
                  </Link>
                </li>
                <li>
                  <Link href="/#capabilities" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    Field Notes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#6B675F] font-semibold mb-3 sm:mb-5">
                Suite
              </h3>
              <ul className="space-y-2.5 sm:space-y-3.5 text-[14px] sm:text-[15px]">
                <li>
                  <Link href="/products" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    Suite Overview
                  </Link>
                </li>
                <li>
                  <Link href="/products/restrosuite" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    RestroSuite POS
                  </Link>
                </li>
                <li>
                  <Link href="/products/staysuite" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    StaySuite PMS
                  </Link>
                </li>
                <li>
                  <Link href="/products/medisuite" className="text-[#181713] hover:text-[#C43C11] transition-colors">
                    MediSuite Clinic
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 mt-4 sm:mt-0">
              <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#6B675F] font-semibold mb-3 sm:mb-5">
                Connect
              </h3>
              <ul className="space-y-2.5 sm:space-y-3.5 text-[14px] sm:text-[15px]">
                <li>
                  <a
                    href={"mailto:" + site.email}
                    className="text-[#181713] hover:text-[#C43C11] transition-colors break-all"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={telHref()}
                    className="text-[#181713] hover:text-[#C43C11] transition-colors"
                  >
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={"https://wa.me/" + site.phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#181713] hover:text-[#C43C11] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link href="/#contact" className="text-[#C43C11] font-semibold hover:underline">
                    Start a project ↗
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px] sm:text-[13px] text-[#6B675F] text-center sm:text-left">
          <div>
            © {year} {site.brand}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-[#181713] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#181713] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
