import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

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

  const { Component } = data;

  return (
    <Suspense fallback={
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading...</div>
        </div>
      </PageShell>
    }>
      {/* FIX: Render the Component directly. 
        The MDX file handles wrapping itself in ServiceTemplate automatically.
      */}
      <Component />
    </Suspense>
  );
}