import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.tantalusgeomatics.com').replace(/\/$/, '');
const DEFAULT_OG_IMAGE = 'https://tantalusgeomatics.com/images/Squamish-Garibaldi-Estates-Property-Survey.webp';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: object;
  ogImage?: string;
  ogType?: string;
}

function computeFinalTitle(title: string): string {
  const cleanTitle = title.replace(/<[^>]+>/g, '').trim();
  const suffixRegex = /\s*\|\s*(Tantalus Geomatics Land Surveying|Tantalus Geomatics|Tantalus|Project Case Study\s*\|\s*Tantalus Geomatics)$/i;

  if (suffixRegex.test(cleanTitle)) {
    const baseTitle = cleanTitle.replace(suffixRegex, '').trim();
    if (baseTitle.length > 38) {
      let displayTitle = baseTitle;
      if (baseTitle.length > 48) {
        displayTitle = baseTitle.substring(0, 45) + '...';
      }
      return `${displayTitle} | Tantalus`;
    }
    return `${baseTitle} | Tantalus Geomatics`;
  }

  if (cleanTitle.length > 60) {
    return cleanTitle.substring(0, 57) + '...';
  }
  return cleanTitle;
}

function computeFinalDescription(description: string): string {
  const locationPattern = /Professional land surveying, topographic mapping, and legal boundary definition services in ([^,]+), British Columbia\./i;
  const match = description.match(locationPattern);
  if (match) {
    const locationName = match[1];
    return `BCLS-certified land surveying, topographic mapping, and legal boundary definition in ${locationName}, BC. Tailored to local municipal requirements.`;
  }

  if (description.length <= 155) {
    return description;
  }

  const sentences = description.split(/(?<=[.!?])\s+/);
  let currentDesc = '';
  for (const sentence of sentences) {
    if ((currentDesc + (currentDesc ? ' ' : '') + sentence).length <= 155) {
      currentDesc += (currentDesc ? ' ' : '') + sentence;
    } else {
      break;
    }
  }

  if (currentDesc) {
    return currentDesc;
  }

  return description.substring(0, 152) + '...';
}

function computeFinalUrl(canonicalUrl?: string): string {
  if (!canonicalUrl) {
    if (typeof window !== 'undefined') {
      return `${SITE_URL}${window.location.pathname}${window.location.search}`;
    }
    return SITE_URL;
  }

  if (canonicalUrl.startsWith('/')) {
    return `${SITE_URL}${canonicalUrl}`;
  }

  if (canonicalUrl.includes('localhost:3000')) {
    return canonicalUrl.replace(/https?:\/\/localhost:3000/g, SITE_URL);
  }

  return canonicalUrl;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SEO({ title, description, canonicalUrl, schema, ogImage, ogType }: SEOProps) {
  const finalTitle = computeFinalTitle(title);
  const finalDescription = computeFinalDescription(description);
  const finalUrl = computeFinalUrl(canonicalUrl);
  const finalImage = ogImage || DEFAULT_OG_IMAGE;

  useLayoutEffect(() => {
    document.title = finalTitle;

    setMetaTag('name', 'description', finalDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:url', finalUrl);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:type', ogType || 'website');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    setMetaTag('name', 'twitter:image', finalImage);
  }, [finalTitle, finalDescription, finalUrl, finalImage, ogType]);

  const schemaScript = schema ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ) : null;

  if (typeof document === 'undefined') {
    return schemaScript;
  }

  const seoRoot = document.getElementById('seo-root');
  if (seoRoot && schemaScript) {
    return createPortal(schemaScript, seoRoot);
  }

  return schemaScript;
}
