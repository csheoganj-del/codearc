import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import ProductPreview from '../components/ProductPreview';
import WorkLiveMedia from '../components/WorkLiveMedia';
import type { WorkLiveMode } from '../components/WorkLiveMedia';
import { productsData, productStatusClass, statusLabel } from '../data/products';
import { caseStudiesData } from '../data/case-studies';
import { site } from '../config/site';
import { socialMetadata } from '../lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: site.seo.defaultTitle,
  },
  description: site.seo.description,
  alternates: { canonical: `${site.domain}/` },
  ...socialMetadata({
    title: site.seo.defaultTitle,
    description:
      'Small team in Rajasthan. Client work plus RestroSuite, StaySuite and MediSuite.',
    url: `${site.domain}/`,
  }),
};

function liveModeForWork(id: string): WorkLiveMode {
  if (
    id === 'wild-jawai-safari' ||
    id === 'bros-bar' ||
    id === 'theo-media' ||
    id === 'codearc'
  ) {
    return 'iframe';
  }
  return 'static';
}

/** Same-origin previews: live sites or looping brand logo animation */
function livePreviewSrc(id: string): string | undefined {
  if (id === 'wild-jawai-safari') return '/work-proxy/jawai';
  if (id === 'bros-bar') return '/work-proxy/brosbar';
  if (id === 'theo-media') return '/work-proxy/theomedia';
  if (id === 'codearc') return '/work-proxy/codearc';
  return undefined;
}

/** Shipped work — cards open our case study pages */
const work = caseStudiesData
  .filter((c) => c.isExternal && c.id !== 'restrosuite' && c.id !== 'bloom-cafe')
  .slice(0, 3)
  .map((c) => ({
    id: c.id,
    title: c.title,
    tag: c.subtitle,
    blurb: c.description,
    href: `/case-studies/${c.id}`,
    image: c.image,
    note: c.statusLabel,
    externalUrl: c.url,
    liveMode: liveModeForWork(c.id),
    livePreviewSrc: livePreviewSrc(c.id),
  }));

const buildItems = [
  {
    n: '01',
    title: 'Business websites',
    copy: 'A site that says what you do, shows proof, and makes it easy to call or book.',
    href: '/website-design',
  },
  {
    n: '02',
    title: 'Hospitality systems',
    copy: 'Cafe, bar and hotel tools — the same world as RestroSuite and StaySuite.',
    href: '/products',
  },
  {
    n: '03',
    title: 'Web apps & dashboards',
    copy: 'Tools for your team — not another spreadsheet chain on WhatsApp.',
    href: '/web-development',
  },
  {
    n: '04',
    title: 'Clinic software',
    copy: 'OPD and clinic desks via MediSuite patterns — appointments, queue, billing.',
    href: '/products/medisuite',
  },
  {
    n: '05',
    title: 'Automation',
    copy: 'Forms, payments and WhatsApp hooks so fewer things fall through by hand.',
    href: '/landing-page-design',
  },
  {
    n: '06',
    title: 'Our product family',
    copy: 'RestroSuite (live), StaySuite and MediSuite — software we improve for many businesses.',
    href: '/products',
  },
];

const steps = [
  {
    n: '1',
    title: 'Talk it through',
    copy: 'What breaks today? Who uses it? What does “done” look like in three months?',
  },
  {
    n: '2',
    title: 'Sketch & agree',
    copy: 'We show the flow and screens before we bury you in code.',
  },
  {
    n: '3',
    title: 'Build, launch, stay',
    copy: 'We ship, fix what only shows up in real use, and don’t vanish after invoice.',
  },
];

export default function Home() {
  return (
    <div className="site-v2 is-ready">
      <Navbar />

      <main id="main-content">
        <section className="v2-hero">
          <div className="v2-hero-grid">
            <div className="v2-hero-copy">
              <p className="v2-kicker">Based in Rajasthan · Working across India</p>
              <h1>
                We build software
                <br />
                <em>people actually use.</em>
              </h1>
              <p className="v2-lede">
                CodeArc is a small team that makes websites, apps and day-to-day business
                tools. We also run our own product family — RestroSuite for restaurants,
                StaySuite for hotels, MediSuite for clinics.
              </p>
              <div className="v2-hero-actions">
                <a
                  className="v2-btn v2-btn-primary"
                  href="mailto:hello@codearc.co.in?subject=Hi from the website"
                >
                  Write to us <ArrowRight size={16} />
                </a>
                <Link className="v2-btn v2-btn-ghost" href="/#work">
                  See real work
                </Link>
              </div>
              <p className="v2-status">
                <span className="v2-status-dot" />
                Open for new work · RestroSuite is live
              </p>
            </div>

            <div className="v2-hero-panel" aria-hidden="true">
              <div className="v2-panel-top">
                <span>CodeArc products</span>
                <span className="v2-panel-pulse" />
              </div>
              <div className="v2-panel-body">
                <div className="v2-panel-row">
                  <span>RestroSuite</span>
                  <strong>Live POS</strong>
                </div>
                <div className="v2-panel-row">
                  <span>StaySuite</span>
                  <strong>Hotel PMS</strong>
                </div>
                <div className="v2-panel-row">
                  <span>MediSuite</span>
                  <strong>Clinic / OPD</strong>
                </div>
                <div className="v2-panel-note-block">
                  <p className="v2-panel-note">
                    One company. Custom projects when your process is unique; products when
                    many shops share the same headache.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-proof" aria-label="Quick facts">
          <div className="v2-proof-inner">
            <div className="v2-proof-item">
              <strong>Small team</strong>
              <span>You talk to the people who design and write the code</span>
            </div>
            <div className="v2-proof-item">
              <strong>Rajasthan</strong>
              <span>Remote-friendly with businesses across India</span>
            </div>
            <div className="v2-proof-item">
              <strong>RestroSuite live</strong>
              <span>Restaurant POS shipping on web, Windows and Android</span>
            </div>
            <div className="v2-proof-item">
              <strong>Live projects</strong>
              <span>Wild Jawai, Bloom Café, Bro&apos;s Bar and TheoMedia</span>
            </div>
          </div>
        </section>

        <section className="v2-section" id="products">
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">Product family</p>
              <h2>RestroSuite, StaySuite, MediSuite.</h2>
            </div>
            <p className="v2-section-aside">
              RestroSuite is live. StaySuite and MediSuite are in early access, shaped
              with real hotel and clinic workflows.
            </p>
          </div>

          <div className="v2-grid-3">
            {productsData.map((product) => {
              const live = Boolean(product.status === 'live' && product.externalUrl);
              const body = (
                <>
                  <div className="v2-work-media">
                    <ProductPreview slug={product.slug} />
                  </div>
                  <div className="v2-card-body">
                    <div className="v2-card-meta-row">
                      <span className={`v2-status-pill ${productStatusClass(product.status)}`}>
                        {statusLabel(product.status)}
                        {live ? ' · open' : ''}
                      </span>
                      <span className="v2-card-category">{product.category}</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.tagline}</p>
                  </div>
                </>
              );

              if (live && product.externalUrl) {
                return (
                  <a
                    key={product.slug}
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-card"
                  >
                    {body}
                  </a>
                );
              }

              return (
                <Link key={product.slug} href={product.href} className="v2-card">
                  {body}
                </Link>
              );
            })}
          </div>

          <div className="v2-inline-actions">
            <Link className="v2-btn v2-btn-ghost" href="/products">
              All products <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="v2-section" id="work">
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">Work</p>
              <h2>Selected work.</h2>
            </div>
            <p className="v2-section-aside">
              Three live builds. Wild Jawai scrolls the real site, Bro&apos;s Bar
              plays its entrance, and TheoMedia loops the brand logo animation.
            </p>
          </div>

          <div className="v2-work-grid">
            {work.map((item) => (
              <article
                key={item.id}
                className={`v2-work-card is-${item.id}`}
              >
                <WorkLiveMedia
                  href={item.href}
                  title={item.title}
                  tag={item.tag}
                  image={item.image}
                  liveMode={item.liveMode}
                  iframeSrc={item.livePreviewSrc}
                />
                <div className="v2-work-meta">
                  <div>
                    <p className="v2-work-tag">{item.note}</p>
                    <h3>
                      <Link href={item.href}>{item.title}</Link>
                    </h3>
                    <p>{item.blurb}</p>
                  </div>
                  <a
                    className="v2-work-arrow"
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title} live site`}
                    title="Open live site"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-section v2-section-tight" id="build">
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">Services</p>
              <h2>What you can hire us for.</h2>
            </div>
          </div>
          <div className="v2-build-list">
            {buildItems.map((item) => (
              <Link key={item.n} href={item.href} className="v2-build-row">
                <span className="v2-build-n">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="v2-section" id="approach">
          <div className="v2-section-head">
            <div>
              <p className="v2-kicker">How we work</p>
              <h2>Three clear steps.</h2>
            </div>
            <p className="v2-section-aside">
              Founder-led from first call to launch. You talk directly with the people
              designing and building your product.
            </p>
          </div>
          <div className="v2-steps">
            {steps.map((step) => (
              <article key={step.n} className="v2-step">
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
