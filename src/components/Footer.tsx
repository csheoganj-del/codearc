import Link from 'next/link';
import { site } from '../config/site';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="v2-footer">
      <div className="v2-footer-top">
        <div>
          <Logo variant="light" />
          <p className="v2-footer-blurb">
            Small software team in Rajasthan. We build client projects and a few products
            of our own — RestroSuite, StaySuite, MediSuite. Pricing on this site is in INR
            for India.
          </p>
        </div>

        <div className="v2-footer-cols">
          <div>
            <h3>Products</h3>
            <Link href="/products">Overview</Link>
            <Link href="/products/restrosuite">RestroSuite</Link>
            <Link href="/products/staysuite">StaySuite</Link>
            <Link href="/products/medisuite">MediSuite</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/#work">Work</Link>
            <Link href="/#build">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/website-design">Website design</Link>
            <Link href="/pay">Pay online</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.e164}`}>{site.phone.display}</a>
            <a
              href={`https://wa.me/${site.phone.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <span>{site.region.label}</span>
          </div>
        </div>
      </div>

      <div className="v2-footer-bottom">
        <span>
          © {year} {site.brand}
        </span>
        <span className="v2-footer-legal">
          <a
            href={site.sister.domain}
            target="_blank"
            rel="noopener noreferrer"
            title={site.sister.blurb}
          >
            {site.sister.brand} ({site.sister.marketLabel})
          </a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
