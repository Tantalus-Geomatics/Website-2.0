/**
 * SEO Component for React 19
 * No library required! React 19 hoists these tags to the <head> automatically.
 */
interface SEOProps {
  title?: string;
  description?: string;
}

export default function SEO({ 
  title = "Tantalus Geomatics | Squamish Land Surveying", 
  description = "Professional geomatics and land surveying services in Squamish and the Sea to Sky corridor." 
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}