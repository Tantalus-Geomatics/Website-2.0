/**
 * SEO Component for React 19
 * No library required! React 19 hoists these tags to the <head> automatically.
 */
import type { ReactNode } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  /** JSON-LD object rendered as a script tag */
  schema?: Record<string, unknown>;
  children?: ReactNode;
}

export default function SEO({
  title = 'Tantalus Geomatics | Squamish Land Surveying',
  description = 'Professional geomatics and land surveying services in Squamish and the Sea to Sky corridor.',
  keywords,
  canonicalUrl,
  schema,
  children,
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {schema ? (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}
      {children}
    </>
  );
}
