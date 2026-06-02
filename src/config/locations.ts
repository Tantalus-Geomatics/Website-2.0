export const VALID_LOCATIONS = [
  'squamish',
  'whistler',
  'pemberton',
  'lillooet',
  'west-vancouver',
  'bowen-island',
  'britannia-beach',
  'furry-creek',
  'north-vancouver'
] as const;

export type ValidLocation = typeof VALID_LOCATIONS[number];

export function isValidLocation(slug: string): slug is ValidLocation {
  return VALID_LOCATIONS.includes(slug as ValidLocation);
}

export interface GeoData {
  lat: number;
  lng: number;
  locality: string;
}

export const LOCATION_GEO_DATA: Record<ValidLocation, GeoData> = {
  'squamish': { lat: 49.7016, lng: -123.1558, locality: 'Squamish' },
  'whistler': { lat: 50.1163, lng: -122.9574, locality: 'Whistler' },
  'pemberton': { lat: 50.3210, lng: -122.8050, locality: 'Pemberton' },
  'lillooet': { lat: 50.6853, lng: -121.9364, locality: 'Lillooet' },
  'west-vancouver': { lat: 49.3692, lng: -123.1702, locality: 'West Vancouver' },
  'bowen-island': { lat: 49.3822, lng: -123.3711, locality: 'Bowen Island' },
  'britannia-beach': { lat: 49.6264, lng: -123.2044, locality: 'Britannia Beach' },
  'furry-creek': { lat: 49.5833, lng: -123.2167, locality: 'Furry Creek' },
  'north-vancouver': { lat: 49.3198, lng: -123.0724, locality: 'North Vancouver' }
};

