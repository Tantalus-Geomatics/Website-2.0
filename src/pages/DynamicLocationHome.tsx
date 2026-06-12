import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HubTemplate, { HubService } from '../templates/HubTemplate';
import { isValidLocation, LOCATION_GEO_DATA } from '../config/locations';
import { LOCATION_IMAGES_MAP } from '../config/resourceMapping';
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
  const localAuthorityName = geoData.localAuthorityName;
  const municipalLink = geoData.municipalLink;
  const locationImages = LOCATION_IMAGES_MAP[locationSlug] || [];

  // Determine the city-specific meta description
  let customDescription = '';
  if (locationSlug === 'squamish') {
    customDescription = "BCLS-certified land surveying in Squamish, BC — boundary surveys, subdivision plans, and strata development tailored to District of Squamish permitting and the Garibaldi Estates corridor.";
  } else if (locationSlug === 'whistler') {
    customDescription = "BCLS-certified land surveying in Whistler, BC — strata conversions, easement plans, and topographic surveys tailored to Resort Municipality of Whistler permitting requirements.";
  } else if (locationSlug === 'city-north-vancouver' || locationSlug === 'district-north-vancouver') {
    customDescription = "BCLS-certified land surveying in North Vancouver, BC — building location surveys, covenant plans, and lot consolidations tailored to DNV and CNV permit applications.";
  } else if (locationSlug === 'pemberton') {
    customDescription = "BCLS-certified land surveying in Pemberton, BC — rural subdivisions, agricultural lot surveys, and Crown land applications tailored to Village of Pemberton requirements.";
  } else {
    customDescription = `BCLS-certified land surveying in ${localityName}, BC — boundary surveys, topographic mapping, and legal plans tailored to ${localAuthorityName || 'local authority'} permitting requirements.`;
  }

  return (
    <HubTemplate
      title={`${localityName} Land Surveying Hub`}
      description={customDescription}
      relatedServices={services}
      locationName={localityName}
      localAuthorityName={localAuthorityName}
      municipalLink={municipalLink}
      locationImages={locationImages}
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
