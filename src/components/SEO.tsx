import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: object;
}

export default function SEO({ title, description, canonicalUrl, schema }: SEOProps) {
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

    // 3. Update or Create Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update or Create Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonicalUrl]);

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