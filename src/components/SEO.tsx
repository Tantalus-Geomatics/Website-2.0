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

/**
 * One canonical shape for every page: https://www.tantalusgeomatics.com/<path>/
 * Trailing slash, no /index.html, no extra slash before a hash.
 * The route (window.location.pathname) wins over a passed-in URL so a stale
 * host or path on a page cannot drift again.
 */
export function normalizeCanonicalPath(input: string): string {
  let path = (input || '/').trim();

  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = '/';
    }
  }

  path = path.split('?')[0].split('#')[0];
  path = path.replace(/\/{2,}/g, '/');
  path = path.replace(/\/index\.html$/i, '/');
  if (/^\/?index\.html$/i.test(path)) path = '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  return path;
}

export function canonicalFromPath(input: string): string {
  return `${SITE_URL}${normalizeCanonicalPath(input)}`;
}

function computeFinalUrl(canonicalUrl?: string): string {
  const fromRoute = typeof window !== 'undefined' ? window.location.pathname : '';
  return canonicalFromPath(fromRoute || canonicalUrl || '/');
}

function normalizeSchemaValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value
      .replace(/https:\/\/tantalusgeomatics\.com(?!\/images\/)/g, SITE_URL)
      .replace(/\/+#/g, '/#');
  }
  if (Array.isArray(value)) return value.map(normalizeSchemaValue);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = normalizeSchemaValue(child);
    }
    return out;
  }
  return value;
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(normalizeSchemaValue(schema)) }}
    />
  ) : null;

  if (typeof document === 'undefined') {
    return schemaScript;
  }

  const headTarget = document.getElementById('seo-root') || document.head;
  if (schemaScript) {
    return createPortal(schemaScript, headTarget);
  }

  return null;
}
