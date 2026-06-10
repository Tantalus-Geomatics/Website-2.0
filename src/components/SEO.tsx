import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: object;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ title, description, canonicalUrl, schema, ogImage, ogType }: SEOProps) {
  useEffect(() => {
    // 1. Clean and sanitize the title string (strip HTML/JSX markup)
    const cleanTitle = title.replace(/<[^>]+>/g, '').trim();

    // 2. Check if there is a legacy suffix or any branding suffix
    const suffixRegex = /\s*\|\s*(Tantalus Geomatics Land Surveying|Tantalus Geomatics|Tantalus|Project Case Study\s*\|\s*Tantalus Geomatics)$/i;
    
    let finalTitle = cleanTitle;
    if (suffixRegex.test(cleanTitle)) {
      const baseTitle = cleanTitle.replace(suffixRegex, '').trim();
      if (baseTitle.length > 38) {
        let displayTitle = baseTitle;
        if (baseTitle.length > 48) {
          displayTitle = baseTitle.substring(0, 45) + '...';
        }
        finalTitle = `${displayTitle} | Tantalus`;
      } else {
        finalTitle = `${baseTitle} | Tantalus Geomatics`;
      }
    } else {
      // If no branding suffix, just ensure the clean title is under 60 characters
      if (cleanTitle.length > 60) {
        finalTitle = cleanTitle.substring(0, 57) + '...';
      }
    }

    // Update Title (This native API automatically overwrites, never duplicates)
    document.title = finalTitle;

    // Intercept and compress regional/location landing page descriptions
    let finalDescription = description;
    const locationPattern = /Professional land surveying, topographic mapping, and legal boundary definition services in ([^,]+), British Columbia\./i;
    const match = description.match(locationPattern);
    if (match) {
      const locationName = match[1];
      finalDescription = `BCLS-certified land surveying, topographic mapping, and legal boundary definition in ${locationName}, BC. Tailored to local municipal requirements.`;
    } else if (finalDescription.length > 155) {
      // Smart shortener: try to split by sentences and take what fits
      const sentences = finalDescription.split(/(?<=[.!?])\s+/);
      let currentDesc = '';
      for (const sentence of sentences) {
        if ((currentDesc + (currentDesc ? ' ' : '') + sentence).length <= 155) {
          currentDesc += (currentDesc ? ' ' : '') + sentence;
        } else {
          break;
        }
      }
      if (currentDesc) {
        finalDescription = currentDesc;
      } else {
        // Fallback to simple truncation if even the first sentence is too long
        finalDescription = finalDescription.substring(0, 152) + '...';
      }
    }

    // 3. Update or Create Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);

    // 4. Update or Create Canonical URL
    let finalUrl = canonicalUrl || window.location.href;
    if (finalUrl.includes('localhost:3000')) {
      finalUrl = finalUrl.replace(/https?:\/\/localhost:3000/g, 'https://www.tantalusgeomatics.com');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Helper to update or create meta tags (Open Graph & Twitter)
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 5. Inject Open Graph Meta Tags
    const defaultImage = 'https://tantalusgeomatics.com/images/Squamish-Garibaldi-Estates-Property-Survey.webp';
    const finalImage = ogImage || defaultImage;

    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:url', finalUrl);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:type', ogType || 'website');

    // 6. Inject X (Twitter) Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    setMetaTag('name', 'twitter:image', finalImage);

  }, [title, description, canonicalUrl, ogImage, ogType]);

  return (
    <>
      {/* Inject Schema.org JSON-LD directly into the DOM */}
      {schema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
        />
      )}
    </>
  );
}