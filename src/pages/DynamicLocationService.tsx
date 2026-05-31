import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import HubTemplate from '../templates/HubTemplate';

// Dynamically import all unified localized MDX files nested under content/services/[location]/[service].mdx
const localizedModules = import.meta.glob('../content/services/*/*.mdx');

export default function DynamicLocationService() {
  const { locationSlug, serviceSlug } = useParams<{ locationSlug: string; serviceSlug: string }>();
  const [data, setData] = useState<{
    Component: React.ComponentType<any>;
    meta: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationSlug || !serviceSlug) {
      setData(null);
      setLoading(false);
      return;
    }

    // Target the specific nested location/service path pattern
    const moduleKey = `../content/services/${locationSlug}/${serviceSlug}.mdx`;

    if (moduleKey in localizedModules) {
      setLoading(true);
      (localizedModules[moduleKey] as () => Promise<any>)()
        .then((mod) => {
          setData({
            Component: mod.default,
            meta: mod.frontmatter || mod.metadata || {},
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load localized MDX module:', err);
          setData(null);
          setLoading(false);
        });
    } else {
      setData(null);
      setLoading(false);
    }
  }, [locationSlug, serviceSlug]);

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading...</div>
        </div>
      </PageShell>
    );
  }

  if (!data || !data.Component) {
    return (
      <PageShell>
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-brand-black px-4">
          <h1 className="text-6xl font-bold mb-4 text-brand-green">404</h1>
          <p className="text-xl mb-8 text-slate-300">Location or Service not found</p>
          <Link to="/" className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all">
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  const { Component, meta } = data;

  // Fallbacks for missing frontmatter titles
  const locationTitle = meta.locationName || locationSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || '';
  const serviceTitle = meta.title || serviceSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || '';

  const title = meta.title || `${serviceTitle} in ${locationTitle}`;
  const description = meta.description || `Professional ${serviceTitle} services in ${locationTitle}, BC. Contact Tantalus Geomatics for a free quote.`;

  const relatedServices = meta.relatedServices || [];
  const relatedProjects = meta.relatedProjects || [];
  const relatedPosts = meta.relatedPosts || [];

  return (
    <Suspense fallback={
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading...</div>
        </div>
      </PageShell>
    }>
      <HubTemplate
        title={title}
        description={description}
        relatedServices={relatedServices}
        relatedProjects={relatedProjects}
        relatedPosts={relatedPosts}
      >
        <div className="prose prose-slate max-w-none">
          {/* Render the single unified localized file contents */}
          <Component />
        </div>
      </HubTemplate>
    </Suspense>
  );
}