import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HubTemplate, { HubService } from '../templates/HubTemplate';
import { isValidLocation, LOCATION_GEO_DATA, getLocationDisplayName, type ValidLocation } from '../config/locations';
import { LOCATION_IMAGES_MAP } from '../config/resourceMapping';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

const localizedModules = import.meta.glob('../content/services/*/*.mdx');
const SITE_URL = 'https://www.tantalusgeomatics.com';

// Previous hero subtitles. The meta description is separate so this visible line stays as it was.
const HUB_HERO: Partial<Record<ValidLocation, string>> = {
  squamish: 'Land surveying by a BC Land Surveyor (BCLS) in Squamish, BC — boundary surveys, subdivision plans, and strata development tailored to District of Squamish permitting and the Garibaldi Estates corridor.',
  whistler: 'Land surveying by a BC Land Surveyor (BCLS) in Whistler, BC — strata conversions, easement plans, and topographic surveys tailored to Resort Municipality of Whistler permitting requirements.',
  pemberton: 'Land surveying by a BC Land Surveyor (BCLS) in Pemberton, BC — rural subdivisions, agricultural lot surveys, and Crown land applications tailored to Village of Pemberton requirements.',
  'district-north-vancouver': 'Land surveying by a BC Land Surveyor (BCLS) in the District of North Vancouver — boundary surveys, subdivision plans, and covenant work tailored to DNV Development Services permitting requirements.',
  'city-north-vancouver': 'Land surveying by a BC Land Surveyor (BCLS) in the City of North Vancouver — building location surveys, lot consolidations, and strata plans tailored to CNV Community Development permitting requirements.',
};

// One distinct clause per hub so this paragraph is not the same sentence in every town.
const HUB_WORK: Record<ValidLocation, string> = {
  squamish: 'boundary surveys, subdivision plans and strata plans for District of Squamish permits',
  whistler: 'boundary and topographic surveys for Resort Municipality of Whistler permits',
  pemberton: 'boundary, topographic and subdivision surveys for Village of Pemberton and SLRD applications',
  lillooet: 'boundary surveys, topographic mapping and legal plans for District of Lillooet applications',
  'west-vancouver': 'boundary, topographic and building location surveys for District of West Vancouver permits',
  'bowen-island': 'boundary surveys, topographic site plans and legal plans for Bowen Island Municipality',
  'britannia-beach': 'boundary, topographic and legal surveys for SLRD planning applications just south of Squamish',
  'furry-creek': 'boundary, topographic and construction surveys for Squamish-Lillooet Regional District approvals',
  'district-north-vancouver': 'boundary surveys, subdivision plans and covenant surveys for DNV permit applications',
  'city-north-vancouver': 'building location surveys, lot consolidations and strata plans for CNV permit applications',
  gibsons: 'boundary, topographic and legal surveys for Town of Gibsons permit applications',
  sechelt: 'boundary, topographic and legal plans for District of Sechelt development applications',
  'powell-river': 'boundary and topographic plans for the City of Powell River and qathet Regional District',
  'the-sea-to-sky': 'legal, topographic and construction surveys from Squamish through Whistler to Pemberton',
};

function buildHubMeta(locationSlug: ValidLocation) {
  const geoData = LOCATION_GEO_DATA[locationSlug];
  const displayName = getLocationDisplayName(locationSlug);
  const hubTitle = geoData.hubTitle || `${displayName} Land Surveying Hub`;
  const metaDescription = geoData.metaDescription
    || `Land surveying by a BC Land Surveyor (BCLS) in ${displayName}, BC — boundary surveys, topographic mapping, and legal plans tailored to ${geoData.localAuthorityName || 'local authority'} permitting requirements.`;
  const heroDescription = HUB_HERO[locationSlug]
    || `Land surveying by a BC Land Surveyor (BCLS) in ${displayName}, BC — boundary surveys, topographic mapping, and legal plans tailored to ${geoData.localAuthorityName || 'local authority'} permitting requirements.`;

  return {
    geoData,
    displayName,
    hubTitle,
    metaDescription,
    heroDescription,
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

  const { geoData, displayName, hubTitle, metaDescription, heroDescription, canonicalUrl } = buildHubMeta(locationSlug);
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
      description={heroDescription}
      metaDescription={metaDescription}
      canonicalUrl={canonicalUrl}
      relatedServices={services}
      locationName={displayName}
      localAuthorityName={localAuthorityName}
      municipalLink={municipalLink}
      locationImages={locationImages}
    >
      <h2>Professional Land Surveying in {displayName}, BC</h2>
      <p>
        Tantalus Geomatics provides comprehensive land surveying and geomatics services across {displayName} and the surrounding region. Our team of British Columbia Land Surveyors (BCLS) and Professional Engineers (P.Eng.) prepares {HUB_WORK[locationSlug]}.
      </p>
      <p>
        Whether you are planning a residential build, a commercial development, or a complex subdivision, we work closely with local architects, builders, and municipal planning staff to ensure full compliance with local zoning bylaws and development guidelines.
      </p>
    </HubTemplate>
  );
}
