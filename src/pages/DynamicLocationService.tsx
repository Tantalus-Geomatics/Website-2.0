import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import HubTemplate from '../templates/HubTemplate';

// Dynamically import all MDX files in the locations and services content directories
const locationModules = import.meta.glob('../content/locations/*.mdx');
const serviceModules = import.meta.glob('../content/services/*.mdx');

export default function DynamicLocationService() {
  const { locationSlug, serviceSlug } = useParams<{ locationSlug: string; serviceSlug: string }>();
  const [data, setData] = useState<{
    LocationComponent: React.ComponentType<any> | null;
    ServiceComponent: React.ComponentType<any> | null;
    locationMeta: any;
    serviceMeta: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationSlug || !serviceSlug) {
      setData(null);
      setLoading(false);
      return;
    }

    const locationKey = `../content/locations/${locationSlug}.mdx`;
    const serviceKey = `../content/services/${serviceSlug}.mdx`;

    if (locationKey in locationModules && serviceKey in serviceModules) {
      setLoading(true);
      Promise.all([
        (locationModules[locationKey] as () => Promise<any>)(),
        (serviceModules[serviceKey] as () => Promise<any>)(),
      ])
        .then(([locationMod, serviceMod]) => {
          setData({
            LocationComponent: locationMod.default,
            ServiceComponent: serviceMod.default,
            locationMeta: locationMod.frontmatter || locationMod.metadata || {},
            serviceMeta: serviceMod.frontmatter || serviceMod.metadata || {},
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load location or service MDX module:', err);
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

  if (!data || !data.LocationComponent || !data.ServiceComponent) {
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

  const { LocationComponent, ServiceComponent, locationMeta, serviceMeta } = data;

  const locationTitle = locationMeta.title || locationSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || '';
  const serviceTitle = serviceMeta.title || serviceSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || '';

  const title = `${serviceTitle} in ${locationTitle}`;
  const description = serviceMeta.description || `Professional ${serviceTitle} services in ${locationTitle}, BC. Contact Tantalus Geomatics for a free quote.`;

  const relatedServices = serviceMeta.relatedServices || locationMeta.relatedServices || [];
  const relatedProjects = serviceMeta.relatedProjects || locationMeta.relatedProjects || [];
  const relatedPosts = serviceMeta.relatedPosts || locationMeta.relatedPosts || [];

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
        <div className="space-y-12">
          <div className="prose prose-slate max-w-none">
            <LocationComponent />
          </div>
          <hr className="border-slate-200" />
          <div className="prose prose-slate max-w-none">
            <ServiceComponent />
          </div>
        </div>
      </HubTemplate>
    </Suspense>
  );
}
