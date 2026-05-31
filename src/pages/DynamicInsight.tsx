import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PostTemplate from '../templates/PostTemplate';

// Dynamically import all MDX files in the blog content directory recursively
const modules = import.meta.glob('../content/blog/**/*.mdx');

export default function DynamicInsight() {
  const params = useParams<{ locationSlug?: string; postSlug: string }>();
  const { locationSlug, postSlug } = params;
  const [moduleData, setModuleData] = useState<{
    Component: React.ComponentType<any> | null;
    frontmatter?: any;
    metadata?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { locationSlug, postSlug } = params;
    if (!postSlug) {
      setModuleData(null);
      setLoading(false);
      return;
    }

    const key = locationSlug
      ? `../content/blog/${locationSlug}/${postSlug}.mdx`
      : `../content/blog/${postSlug}.mdx`;
    if (key in modules) {
      setLoading(true);
      // Call the glob function to import the MDX module dynamically
      (modules[key] as () => Promise<any>)()
        .then((mod) => {
          setModuleData({
            Component: mod.default,
            frontmatter: mod.frontmatter,
            metadata: mod.metadata,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load insight MDX module:', err);
          setModuleData(null);
          setLoading(false);
        });
    } else {
      setModuleData(null);
      setLoading(false);
    }
  }, [locationSlug, postSlug]);

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading insight...</div>
        </div>
      </PageShell>
    );
  }

  if (!moduleData || !moduleData.Component) {
    return (
      <PageShell>
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-brand-black px-4">
          <h1 className="text-6xl font-bold mb-4 text-brand-green">404</h1>
          <p className="text-xl mb-8 text-slate-300">Insight not found</p>
          <Link to="/" className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all">
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  const { Component, frontmatter, metadata } = moduleData;
  const meta = frontmatter || metadata || {};

  // Format slug to a readable title as fallback
  const fallbackTitle = postSlug
    ? postSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Insight';

  return (
    <Suspense fallback={
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading insight...</div>
        </div>
      </PageShell>
    }>
      <PostTemplate
        title={meta.title || fallbackTitle}
        description={meta.description || `Professional insights and guides on ${meta.title || fallbackTitle} by Tantalus Geomatics.`}
        publishDate={meta.publishDate || new Date().toISOString()}
        tags={meta.tags}
        relevantLinks={meta.relevantLinks}
        relatedServices={meta.relatedServices}
      >
        <Component />
      </PostTemplate>
    </Suspense>
  );
}
