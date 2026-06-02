export interface ResourceLink {
  label: string;
  href: string;
}

export interface ResourceImage {
  src: string;
  alt: string;
  caption?: string;
}

export const SERVICE_LINKS_MAP: Record<string, ResourceLink[]> = {
  'subdivision-surveys': [
    { label: 'Subdivision Survey Guide', href: '/services/subdivision-surveys/guide' },
    { label: 'LTSA Subdivision Requirements', href: 'https://ltsa.ca' }
  ],
  'topographic-surveys': [
    { label: 'Topographic Survey Pricing', href: '/survey-pricing' },
    { label: 'Understanding Site Plans', href: '/services/topographic-surveys/site-plans' }
  ]
};

export const LOCATION_LINKS_MAP: Record<string, ResourceLink[]> = {
  'squamish': [
    { label: 'District of Squamish Development', href: 'https://squamish.ca/business-and-development/' },
    { label: 'Squamish GIS Map', href: 'https://squamish.ca/gis' }
  ],
  'whistler': [
    { label: 'Resort Municipality of Whistler Planning', href: 'https://whistler.ca/planning' },
    { label: 'Whistler GIS Map', href: 'https://whistler.ca/gis' }
  ]
};

export const SERVICE_IMAGES_MAP: Record<string, ResourceImage[]> = {
  'subdivision-surveys': [
    {
      src: '/images/subdivision-surveys.webp',
      alt: 'subdivision surveys',
      caption: 'subdivision surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'topographic-surveys': [
    {
      src: '/images/topographic-surveys.webp',
      alt: 'topographic surveys',
      caption: 'topographic surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  '3d-settlement-monitoring': [
    {
      src: '/images/3d-settlement-monitoring.webp',
      alt: '3d settlement monitoring',
      caption: '3d settlement monitoring at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'air-space-subdivision-surveys': [
    {
      src: '/images/air-space-subdivision-surveys.webp',
      alt: 'air space subdivision surveys',
      caption: 'air space subdivision surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'bare-land-strata-surveys': [
    {
      src: '/images/bare-land-strata-surveys.webp',
      alt: 'bare land strata surveys',
      caption: 'bare land strata surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'bc-land-surveyors-building-location-surveys': [
    {
      src: '/images/bc-land-surveyors-building-location-surveys.webp',
      alt: 'bc land surveyors building location surveys',
      caption: 'bc land surveyors building location surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'block-outline-surveys': [
    {
      src: '/images/block-outline-surveys.webp',
      alt: 'block outline surveys',
      caption: 'block outline surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'boundary-surveys': [
    {
      src: '/images/boundary-surveys.webp',
      alt: 'boundary surveys',
      caption: 'boundary surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'building-strata-surveys': [
    {
      src: '/images/building-strata-surveys.webp',
      alt: 'building strata surveys',
      caption: 'building strata surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'consolidation-surveys': [
    {
      src: '/images/consolidation-surveys.webp',
      alt: 'consolidation surveys',
      caption: 'consolidation surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'covenant-surveys': [
    {
      src: '/images/covenant-surveys.webp',
      alt: 'covenant surveys',
      caption: 'covenant surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'easement-surveys': [
    {
      src: '/images/easement-surveys.webp',
      alt: 'easement surveys',
      caption: 'easement surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'environmental-and-riparian-surveys': [
    {
      src: '/images/environmental-and-riparian-surveys.webp',
      alt: 'environmental and riparian surveys',
      caption: 'environmental and riparian surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'excavation-layout-surveys': [
    {
      src: '/images/excavation-layout-surveys.webp',
      alt: 'excavation layout surveys',
      caption: 'excavation layout surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'form-and-foundation-surveys': [
    {
      src: '/images/form-and-foundation-surveys.webp',
      alt: 'form and foundation surveys',
      caption: 'form and foundation surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'gridline-and-construction-layout-surveys': [
    {
      src: '/images/gridline-and-construction-layout-surveys.webp',
      alt: 'gridline and construction layout surveys',
      caption: 'gridline and construction layout surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'infrastructure-layout-and-construction-surveys': [
    {
      src: '/images/infrastructure-layout-and-construction-surveys.webp',
      alt: 'infrastructure layout and construction surveys',
      caption: 'infrastructure layout and construction surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'land-act-surveys': [
    {
      src: '/images/land-act-surveys.webp',
      alt: 'land act surveys',
      caption: 'land act surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'natural-boundary-surveys': [
    {
      src: '/images/natural-boundary-surveys.webp',
      alt: 'natural boundary surveys',
      caption: 'natural boundary surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'phased-strata-surveys': [
    {
      src: '/images/phased-strata-surveys.webp',
      alt: 'phased strata surveys',
      caption: 'phased strata surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'property-line-surveys': [
    {
      src: '/images/property-line-surveys.webp',
      alt: 'property line surveys',
      caption: 'property line surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'proposed-strata-plans': [
    {
      src: '/images/proposed-strata-plans.webp',
      alt: 'proposed strata plans',
      caption: 'proposed strata plans at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'road-surveys': [
    {
      src: '/images/road-surveys.webp',
      alt: 'road surveys',
      caption: 'road surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'statutory-rights-of-way-surveys': [
    {
      src: '/images/statutory-rights-of-way-surveys.webp',
      alt: 'statutory rights of way surveys',
      caption: 'statutory rights of way surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'strata-plan-amendment-surveys': [
    {
      src: '/images/strata-plan-amendment-surveys.webp',
      alt: 'strata plan amendment surveys',
      caption: 'strata plan amendment surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'strata-surveys': [
    {
      src: '/images/strata-surveys.webp',
      alt: 'strata surveys',
      caption: 'strata surveys at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'terrestrial-lidar-scanning': [
    {
      src: '/images/terrestrial-lidar-scanning.webp',
      alt: 'terrestrial lidar scanning',
      caption: 'terrestrial lidar scanning at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'topographic-surveys-and-site-plans': [
    {
      src: '/images/topographic-surveys-and-site-plans.webp',
      alt: 'topographic surveys and site plans',
      caption: 'topographic surveys and site plans at Tantalus Geomatics Land Surveying Ltd.'
    }
  ],
  'volume-and-earthwork-surveys': [
    {
      src: '/images/volume-and-earthwork-surveys.webp',
      alt: 'volume and earthwork surveys',
      caption: 'Volume and earthwork survey services at Tantalus Geomatics Land Surveying Ltd.'
    }
  ]
};

export const LOCATION_IMAGES_MAP: Record<string, ResourceImage[]> = {
  'squamish': [
    {
      src: '/images/tantalus-hero-banner.webp',
      alt: 'Squamish Tantalus Lookout Survey',
      caption: 'Professional Land Surveying in Squamish, BC.'
    }
  ],
  'whistler': [
    {
      src: '/images/black-tusk.webp',
      alt: 'Whistler Black Tusk Survey',
      caption: 'Professional Land Surveying in Whistler, BC.'
    }
  ],
  'pemberton': [
    {
      src: '/images/mt-currie.webp',
      alt: 'Pemberton Mt Currie Survey',
      caption: 'Professional Land Surveying in Pemberton, BC.'
    }
  ],
  'lillooet': [
    {
      src: '/images/seton-lake.webp',
      alt: 'Lillooet Seton Lake Survey',
      caption: 'Professional Land Surveying in Lillooet, BC.'
    }
  ],
  'Britannia Beach': [
    {
      src: '/images/britannia-beach.webp',
      alt: 'Britannia Beach Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Britannia Beach, BC.'
    }
  ],
  'Furry Creek': [
    {
      src: '/images/furry-creek.webp',
      alt: 'Furry Creek Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Furry Creek, BC.'
    }
  ],
  'West Vancouver': [
    {
      src: '/images/west-vancouver.webp',
      alt: 'West Vancouver Whytecliff Park Survey',
      caption: 'Professional Land Surveying in West Vancouver, BC.'
    }
  ],
  'Sea-to-Sky': [
    {
      src: '/images/sea-to-sky.webp',
      alt: 'Sea-to-Sky Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Sea-to-Sky, BC.'
    }
  ],
  'Bowen Island': [
    {
      src: '/images/bowen-island.webp',
      alt: 'Bowen Island Survey',
      caption: 'Professional Land Surveying in Bowen Island, BC.'
    }
  ],
  'North Vancouver': [
    {
      src: '/images/north-vancouver.webp',
      alt: 'North Vancouver Survey',
      caption: 'Professional Land Surveying in North Vancouver, BC.'
    }
  ],
  'Gibsons': [
    {
      src: '/images/gibsons.webp',
      alt: 'Gibsons Survey',
      caption: 'Professional Land Surveying in Gibsons, BC.'
    }
  ],
  'Sechelt': [
    {
      src: '/images/sechelt.webp',
      alt: 'Sechelt Survey',
      caption: 'Professional Land Surveying in Sechelt, BC.'
    }
  ],
  'Powell River': [
    {
      src: '/images/power-river.webp',
      alt: 'Powell River Survey',
      caption: 'Professional Land Surveying in Powell River, BC.'
    }
  ]
};
