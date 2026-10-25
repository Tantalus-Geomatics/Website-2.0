import { STATIC_META_DESCRIPTIONS } from '../data/staticMetaDescriptions';

const VALID_LOCATIONS = [
  'squamish',
  'whistler',
  'pemberton',
  'lillooet',
  'west-vancouver',
  'bowen-island',
  'britannia-beach',
  'furry-creek',
  'city-north-vancouver',
  'district-north-vancouver',
  'gibsons',
  'sechelt',
  'powell-river',
  'the-sea-to-sky'
] as const;

export type ValidLocation = typeof VALID_LOCATIONS[number];

export function isValidLocation(slug: string): slug is ValidLocation {
  return VALID_LOCATIONS.includes(slug as ValidLocation);
}

export interface GeoData {
  lat: number;
  lng: number;
  locality: string;
  localityName?: string;
  localAuthorityName?: string;
  municipalLink?: string;
  metaDescription?: string;
  hubTitle?: string;
}

export const LOCATION_GEO_DATA: Record<ValidLocation, GeoData> = {
  'squamish': {
    lat: 49.7016,
    lng: -123.1558,
    locality: 'Squamish',
    localAuthorityName: 'District of Squamish',
    municipalLink: 'https://squamish.ca/building-and-land-development/home-land-and-property-development/land-development-applications/',
    metaDescription: STATIC_META_DESCRIPTIONS['/squamish/']
  },
  'whistler': {
    lat: 50.1163,
    lng: -122.9574,
    locality: 'Whistler',
    localAuthorityName: 'Resort Municipality of Whistler',
    municipalLink: 'https://www.whistler.ca/business-development/',
    metaDescription: STATIC_META_DESCRIPTIONS['/whistler/']
  },
  'pemberton': {
    lat: 50.3210,
    lng: -122.8050,
    locality: 'Pemberton',
    localAuthorityName: 'Village of Pemberton',
    municipalLink: 'https://www.pemberton.ca/building-development',
    metaDescription: STATIC_META_DESCRIPTIONS['/pemberton/']
  },
  'lillooet': {
    lat: 50.6853,
    lng: -121.9364,
    locality: 'Lillooet',
    localAuthorityName: 'District of Lillooet',
    municipalLink: 'https://www.lillooet.ca/building-planning-development',
    metaDescription: STATIC_META_DESCRIPTIONS['/lillooet/']
  },
  'west-vancouver': {
    lat: 49.3692,
    lng: -123.1702,
    locality: 'West Vancouver',
    localAuthorityName: 'District of West Vancouver',
    municipalLink: 'https://westvancouver.ca/business-development/building-development',
    metaDescription: STATIC_META_DESCRIPTIONS['/west-vancouver/']
  },
  'bowen-island': {
    lat: 49.3822,
    lng: -123.3711,
    locality: 'Bowen Island',
    localAuthorityName: 'Bowen Island Municipality',
    municipalLink: 'https://bowenislandmunicipality.ca/property-development/planning-development/',
    metaDescription: STATIC_META_DESCRIPTIONS['/bowen-island/']
  },
  'britannia-beach': {
    lat: 49.6264,
    lng: -123.2044,
    locality: 'Britannia Beach',
    localAuthorityName: 'Squamish-Lillooet Regional District',
    municipalLink: 'https://www.slrd.bc.ca/planning-development-services',
    metaDescription: STATIC_META_DESCRIPTIONS['/britannia-beach/']
  },
  'furry-creek': {
    lat: 49.5833,
    lng: -123.2167,
    locality: 'Furry Creek',
    localAuthorityName: 'Squamish-Lillooet Regional District',
    municipalLink: 'https://www.slrd.bc.ca/planning-development-services',
    metaDescription: STATIC_META_DESCRIPTIONS['/furry-creek/']
  },
  'district-north-vancouver': {
    lat: 49.3237,
    lng: -122.9947,
    locality: 'North Vancouver',
    localityName: 'District of North Vancouver',
    localAuthorityName: 'District of North Vancouver (DNV)',
    municipalLink: 'https://www.dnv.org/business-development',
    metaDescription: STATIC_META_DESCRIPTIONS['/district-north-vancouver/'],
    hubTitle: 'District of North Vancouver Land Surveying Hub'
  },
  'city-north-vancouver': {
    lat: 49.3198,
    lng: -123.0724,
    locality: 'North Vancouver',
    localityName: 'City of North Vancouver',
    localAuthorityName: 'City of North Vancouver (CNV)',
    municipalLink: 'https://www.cnv.org/business-development/building',
    metaDescription: STATIC_META_DESCRIPTIONS['/city-north-vancouver/'],
    hubTitle: 'City of North Vancouver Land Surveying Hub'
  },
  'gibsons': {
    lat: 49.4011,
    lng: -123.5113,
    locality: 'Gibsons',
    localAuthorityName: 'Town of Gibsons',
    municipalLink: 'https://gibsons.ca/business/building_development/',
    metaDescription: STATIC_META_DESCRIPTIONS['/gibsons/']
  },
  'sechelt': {
    lat: 49.4716,
    lng: -123.7544,
    locality: 'Sechelt',
    localAuthorityName: 'District of Sechelt',
    municipalLink: 'https://www.sechelt.ca/en/business-and-development/planning-and-development.aspx',
    metaDescription: STATIC_META_DESCRIPTIONS['/sechelt/']
  },
  'powell-river': {
    lat: 49.8352,
    lng: -124.5247,
    locality: 'Powell River',
    localAuthorityName: 'City of Powell River',
    municipalLink: 'https://powellriver.ca/pages/land-development-and-subdivision',
    metaDescription: STATIC_META_DESCRIPTIONS['/powell-river/']
  },
  'the-sea-to-sky': {
    lat: 49.5841,
    lng: -123.2255,
    locality: 'The Sea to Sky',
    localityName: 'The Sea to Sky',
    localAuthorityName: 'Sea-to-Sky Corridor',
    municipalLink: 'https://www.slrd.bc.ca/planning-development-services',
    metaDescription: STATIC_META_DESCRIPTIONS['/the-sea-to-sky/'],
    hubTitle: 'The Sea to Sky Land Surveying Hub'
  }
};

export function getLocationDisplayName(locationSlug: ValidLocation): string {
  const geoData = LOCATION_GEO_DATA[locationSlug];
  return geoData.localityName || geoData.locality;
}

/** Mid-sentence location label for service page H1/body (e.g. "the Sea to Sky"). */
export function getServiceLocationName(locationSlug: ValidLocation): string {
  if (locationSlug === 'the-sea-to-sky') {
    return 'the Sea to Sky';
  }
  const geoData = LOCATION_GEO_DATA[locationSlug];
  return geoData.localityName || geoData.locality;
}
