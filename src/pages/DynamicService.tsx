import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import ServiceTemplate from '../templates/ServiceTemplate';

// Dynamically import all MDX files in the services content directory
const modules = import.meta.glob('../content/services/*.mdx');

export default function DynamicService() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [moduleData, setModuleData] = useState<{
    Component: React.ComponentType<any> | null;
    frontmatter?: any;
    metadata?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceSlug) {
      setModuleData(null);
      setLoading(false);
      return;
    }

    const key = `../content/services/${serviceSlug}.mdx`;
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
          console.error('Failed to load service MDX module:', err);
          setModuleData(null);
          setLoading(false);
        });
    } else {
      setModuleData(null);
      setLoading(false);
    }
  }, [serviceSlug]);

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading service...</div>
        </div>
      </PageShell>
    );
  }

  if (!moduleData || !moduleData.Component) {
    return (
      <PageShell>
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-brand-black px-4">
          <h1 className="text-6xl font-bold mb-4 text-brand-green">404</h1>
          <p className="text-xl mb-8 text-slate-300">Service not found</p>
          <Link to="/services" className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all">
            Back to Services
          </Link>
        </div>
      </PageShell>
    );
  }

  const { Component, frontmatter, metadata } = moduleData;
  const meta = frontmatter || metadata || {};

  // Format slug to a readable title as fallback
  const fallbackTitle = serviceSlug
    ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Service';

  return (
    <Suspense fallback={
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading service...</div>
        </div>
      </PageShell>
    }>
      <ServiceTemplate
        title={meta.title || fallbackTitle}
        serviceName={meta.serviceName || fallbackTitle}
        description={meta.description || `Professional ${meta.title || fallbackTitle} services by Tantalus Geomatics.`}
        heroImage={meta.heroImage}
        steps={meta.steps}
        deliverables={meta.deliverables}
        faqs={meta.faqs}
        serviceLinks={meta.serviceLinks || meta.localLinks}
        locationLinks={meta.locationLinks}
        formVariant={meta.formVariant}
        locationName={meta.locationName}
        localAuthorityName={meta.localAuthorityName}
        municipalLink={meta.municipalLink}
      >
        <Component />
      </ServiceTemplate>
    </Suspense>
  );
}
