import type { Metadata } from 'next';
import { site } from '../config/site';

/**
 * Prefer a short root path for share crawlers (WhatsApp, iMessage, LinkedIn).
 * Exact 1200×630 JPEG lives at public/og.jpg.
 */
export const OG_IMAGE_PATH = '/og.jpg';

/** Absolute HTTPS URL — required by WhatsApp / Facebook share scrapers. */
export function absoluteOgImageUrl(): string {
  return `${site.domain}${OG_IMAGE_PATH}`;
}

export const ogImage = {
  url: absoluteOgImageUrl(),
  secureUrl: absoluteOgImageUrl(),
  width: 1200,
  height: 630,
  alt: `${site.brand} — websites, apps and business software for ${site.region.label}`,
  type: 'image/jpeg',
} as const;

/**
 * Full Open Graph + Twitter card block for share previews.
 * Always include images — page-level openGraph that omits images
 * strips the layout default and WhatsApp shows a bare link.
 */
export function socialMetadata(options: {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  imageUrl?: string;
  imageAlt?: string;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const {
    title,
    description,
    url,
    type = 'website',
    publishedTime,
    imageUrl = absoluteOgImageUrl(),
    imageAlt = ogImage.alt,
  } = options;

  const resolvedImage = imageUrl.startsWith('http')
    ? imageUrl
    : `${site.domain}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;

  const isDefaultOg = resolvedImage === absoluteOgImageUrl() || resolvedImage.endsWith(OG_IMAGE_PATH);
  const imageType = isDefaultOg
    ? 'image/jpeg'
    : resolvedImage.endsWith('.png')
      ? 'image/png'
      : resolvedImage.endsWith('.webp')
        ? 'image/webp'
        : 'image/jpeg';

  return {
    openGraph: {
      type,
      locale: site.openGraphLocale,
      siteName: site.brand,
      title,
      description,
      url,
      images: [
        {
          url: resolvedImage,
          secureUrl: resolvedImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: imageType,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImage],
    },
  };
}
