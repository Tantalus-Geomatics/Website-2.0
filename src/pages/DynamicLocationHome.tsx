import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HubTemplate, { HubService } from '../templates/HubTemplate';
import { isValidLocation, LOCATION_GEO_DATA } from '../config/locations';
import PageShell from '../components/PageShell';

const localizedModules = import.meta.glob('../content/services/*/*.mdx');

export default function DynamicLocationHome() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const [services, setServices] = useState<HubService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationSlug || !isValidLocation(locationSlug)) {
      setLoading(false);
      return;
    }

    const loadServices = async () => {
      setLoading(true);
      const loadedServices: HubService[] = [];
      
      // Filter modules that belong to this location
      const prefix = `../content/services/${locationSlug}/`;
      const matchingKeys = Object.keys(localizedModules).filter(key => key.startsWith(prefix));

      for (const key of matchingKeys) {
        try {
          const mod = await (localizedModules[key] as () => Promise<any>)();
          const meta = mod.frontmatter || mod.metadata || {};
          const serviceSlug = key.replace(prefix, '').replace(/\.mdx$/, '');
          
          loadedServices.push({
            title: meta.title || serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            href: `/${locationSlug}/services/${serviceSlug}/`,
            description: meta.description || `Professional land surveying services in ${LOCATION_GEO_DATA[locationSlug].locality}.`
          });
        } catch (err) {
          console.error(`Failed to load service module for key ${key}:`, err);
        }
      }

      // Sort services alphabetically by title
      loadedServices.sort((a, b) => a.title.localeCompare(b.title));
      setServices(loadedServices);
      setLoading(false);
    };

    loadServices();
  }, [locationSlug]);

  if (!locationSlug || !isValidLocation(locationSlug)) {
    return (
      <PageShell>
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-brand-black px-4">
          <h1 className="text-6xl font-bold mb-4 text-brand-green">404</h1>
          <p className="text-xl mb-8 text-slate-300">Location not found</p>
          <Link to="/" className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all">
            Back to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading location hub...</div>
        </div>
      </PageShell>
    );
  }

  const geoData = LOCATION_GEO_DATA[locationSlug];
  const localityName = geoData.locality;

  return (
    <HubTemplate
      title={`${localityName} Land Surveying Hub`}
      description={`Professional land surveying, topographic mapping, and legal boundary definition services in ${localityName}, British Columbia. Explore our BCLS-certified services tailored to local municipal requirements.`}
      relatedServices={services}
    >
      <h2>Professional Land Surveying in {localityName}, BC</h2>
      <p>
        Tantalus Geomatics provides comprehensive land surveying and geomatics services across {localityName} and the surrounding region. Our team of British Columbia Land Surveyors (BCLS) and Professional Engineers (P.Eng.) combines deep local knowledge with state-of-the-art technology to deliver highly accurate, certified plans that streamline your municipal permit approvals and protect your property investments.
      </p>
      <p>
        Whether you are planning a residential build, a commercial development, or a complex subdivision, we work closely with local architects, builders, and municipal planning staff to ensure full compliance with local zoning bylaws and development guidelines.
      </p>
    </HubTemplate>
  );
}
