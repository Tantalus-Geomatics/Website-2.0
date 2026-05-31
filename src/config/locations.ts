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
