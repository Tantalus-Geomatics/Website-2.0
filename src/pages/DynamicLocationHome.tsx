import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HubTemplate, { HubService } from '../templates/HubTemplate';
import { isValidLocation, LOCATION_GEO_DATA, getLocationDisplayName, type ValidLocation } from '../config/locations';
import { LOCATION_IMAGES_MAP } from '../config/resourceMapping';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

const localizedModules = import.meta.glob('../content/services/*/*.mdx');
const SITE_URL = 'https://www.tantalusgeomatics.com';

function buildHubMeta(locationSlug: ValidLocation) {
  const geoData = LOCATION_GEO_DATA[locationSlug];
  const displayName = getLocationDisplayName(locationSlug);
  const hubTitle = geoData.hubTitle || `${displayName} Land Surveying Hub`;
  const metaDescription = geoData.metaDescription
    || `BCLS-certified land surveying in ${displayName}, BC — boundary surveys, topographic mapping, and legal plans tailored to ${geoData.localAuthorityName || 'local authority'} permitting requirements.`;

  return {
    geoData,
    displayName,
    hubTitle,
    metaDescription,
    canonicalUrl: `${SITE_URL}/${locationSlug}/`,
  };
}

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

  const { geoData, displayName, hubTitle, metaDescription, canonicalUrl } = buildHubMeta(locationSlug);
  const localAuthorityName = geoData.localAuthorityName;
  const municipalLink = geoData.municipalLink;
  const locationImages = LOCATION_IMAGES_MAP[locationSlug] || [];

  if (loading) {
    return (
      <PageShell>
        <SEO
          title={`${hubTitle} | Tantalus Geomatics Land Surveying`}
          description={metaDescription}
          canonicalUrl={canonicalUrl}
        />
        <div className="min-h-screen flex items-center justify-center text-white bg-brand-black">
          <div className="animate-pulse text-brand-green text-xl">Loading location hub...</div>
        </div>
      </PageShell>
    );
  }

  return (
    <HubTemplate
      title={hubTitle}
      description={metaDescription}
      canonicalUrl={canonicalUrl}
      relatedServices={services}
      locationName={displayName}
      localAuthorityName={localAuthorityName}
      municipalLink={municipalLink}
      locationImages={locationImages}
    >
      <h2>Professional Land Surveying in {displayName}, BC</h2>
      <p>
        Tantalus Geomatics provides comprehensive land surveying and geomatics services across {displayName} and the surrounding region. Our team of British Columbia Land Surveyors (BCLS) and Professional Engineers (P.Eng.) combines deep local knowledge with state-of-the-art technology to deliver highly accurate, certified plans that streamline your municipal permit approvals and protect your property investments.
      </p>
      <p>
        Whether you are planning a residential build, a commercial development, or a complex subdivision, we work closely with local architects, builders, and municipal planning staff to ensure full compliance with local zoning bylaws and development guidelines.
      </p>
    </HubTemplate>
  );
}
