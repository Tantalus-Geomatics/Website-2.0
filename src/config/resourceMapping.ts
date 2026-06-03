export interface ResourceLink {
  label: string;
  href: string;
}

export interface ResourceImage {
  src: string;
  alt: string;
  caption?: string;
}

export const LOCATION_GEO_DATA: Record<string, { lat: number; lng: number; locality: string; localAuthorityName?: string; municipalLink?: string }> = {
  'squamish': {
    lat: 49.7016,
    lng: -123.1558,
    locality: 'Squamish',
    localAuthorityName: 'District of Squamish',
    municipalLink: 'https://squamish.ca/assets/BLDG/RESIDENTIAL-BP-Document-Checklist-Revised-FEB-FILLABLE_2022.pdf'
  },
  'whistler': {
    lat: 50.1163,
    lng: -122.9574,
    locality: 'Whistler',
    localAuthorityName: 'Resort Municipality of Whistler',
    municipalLink: 'https://www.whistler.ca/business/building-development/building-permits/'
  },
  'pemberton': {
    lat: 50.3210,
    lng: -122.8050,
    locality: 'Pemberton',
    localAuthorityName: 'Village of Pemberton',
    municipalLink: 'https://www.pemberton.ca/government/departments/development-services/building-department'
  },
  'lillooet': {
    lat: 50.6853,
    lng: -121.9364,
    locality: 'Lillooet',
    localAuthorityName: 'District of Lillooet',
    municipalLink: 'https://www.lillooet.ca/business-development/building-permits'
  },
  'west-vancouver': {
    lat: 49.3692,
    lng: -123.1702,
    locality: 'West Vancouver',
    localAuthorityName: 'District of West Vancouver',
    municipalLink: 'https://westvancouver.ca/home-building-property/permits-licences/building-permits'
  },
  'bowen-island': {
    lat: 49.3822,
    lng: -123.3711,
    locality: 'Bowen Island',
    localAuthorityName: 'Bowen Island Municipality',
    municipalLink: 'https://www.bowenislandmunicipality.ca/building-permits/'
  },
  'britannia-beach': {
    lat: 49.6264,
    lng: -123.2044,
    locality: 'Britannia Beach',
    localAuthorityName: 'Squamish-Lillooet Regional District',
    municipalLink: 'https://www.slrd.bc.ca/planning-development/building-services'
  },
  'furry-creek': {
    lat: 49.5833,
    lng: -123.2167,
    locality: 'Furry Creek',
    localAuthorityName: 'Squamish-Lillooet Regional District',
    municipalLink: 'https://www.slrd.bc.ca/planning-development/building-services'
  },
  'north-vancouver': {
    lat: 49.3198,
    lng: -123.0724,
    locality: 'North Vancouver',
    localAuthorityName: 'City and District of North Vancouver',
    municipalLink: 'https://www.dnv.org/property-and-development/building-and-permits'
  }
};

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
    { label: 'Squamish Building Permits', href: 'https://squamish.ca/building-and-land-development/building-permit/' },
    { label: 'Squamish Development Permits', href: 'https://squamish.ca/building-and-land-development/home-land-and-property-development/land-development-applications/development-permits/' },
    { label: 'Squamish Subdivision Requirements', href: 'https://squamish.ca/building-and-land-development/home-land-and-property-development/land-development-applications/subdivision/' },
    { label: 'Squamish Subdivision & Development Control Bylaw', href: 'https://squamish.civicweb.net/filepro/document/200228/Subdivision%20and%20Development%20Control%20Bylaw%202649,%202018%20(Updated%20October%202022).pdf' },
    { label: 'District of Squamish GIS Map', href: 'https://squamish.ca/gis' }
  ],
  'whistler': [
    { label: 'Whistler Building Permits', href: 'https://www.whistler.ca/business-development/building-and-development-permits/' },
    { label: 'Whistler Development Permits', href: 'https://www.whistler.ca/business-development/land-use-and-development/development-permits/' },
    { label: 'Whistler Subdivision & Strata Conversion', href: 'https://www.whistler.ca/business-development/land-use-and-development/subdivision-and-strata-conversion/' },
    { label: 'Resort Municipality of Whistler Maps and Data', href: 'https://www.whistler.ca/municipal-services/maps-and-data/' }
  ],
  'pemberton': [
    { label: 'Pemberton Building Permits', href: 'https://www.pemberton.ca/building-development/building-permits' },
    { label: 'Pemberton Development Permits', href: 'https://www.pemberton.ca/building-development/planning-development/development-permits' },
    { label: 'Pemberton Subdivision Requirements', href: 'https://www.pemberton.ca/building-development/planning-development/subdivision' },
    { label: 'Village of Pemberton Mapping and GIS', href: 'https://www.pemberton.ca/building-development/mapping-gis' }
  ],
  'lillooet': [
    { label: 'Lillooet Building Permits', href: 'https://www.lillooet.ca/building-permits' },
    { label: 'Lillooet Development Applications', href: 'https://lillooet.civicweb.net/filepro/document/67171/Development%20Application%20Form.pdf' },
    { label: 'Lillooet Subdivision Procedures Bylaw', href: 'https://lillooet.civicweb.net/document/72750/4.%20Current%20Subdivision%20Procedures%20Bylaw.pdf?handle=8FE103DA5E974E07BAFE3D767DC41094' },
    { label: 'District of Lillooet Mapping', href: 'https://www.lillooet.ca/mapping-1' }
  ],
  'west-vancouver': [
    { label: 'West Vancouver Building Permits', href: 'https://westvancouver.ca/business-development/building-development/building-permits-inspections' },
    { label: 'West Vancouver Development Permits', href: 'https://westvancouver.ca/business-development/building-development/building-permits-inspections/development-permits' },
    { label: 'West Vancouver Subdivision Regulations', href: 'https://westvancouver.ca/business-development/building-development/development-regulations/other-developments/subdivision' },
    { label: 'District of West Vancouver Maps', href: 'https://westvancouver.ca/business-development/building-development/maps' }
  ],
  'bowen-island': [
    { label: 'Bowen Island Building Permit Guide', href: 'https://bowenislandmunicipality.ca/property-development/building-renovating/building-permit-applications-guide/' },
    { label: 'Bowen Island Planning & Development Permits', href: 'https://bowenislandmunicipality.ca/property-development/planning-development/planning-applications-guides-permits/' },
    { label: 'Bowen Island Planning & Development Department', href: 'https://bowenislandmunicipality.ca/our-government/departments/planning-development/' },
    { label: 'Bowen Island Municipality Maps', href: 'https://bowenislandmunicipality.ca/bowmap/' }
  ],
  'britannia-beach': [
    { label: 'SLRD Building Permits (Britannia Beach)', href: 'https://www.slrd.bc.ca/planning-building/building-department/building-permits' },
    { label: 'SLRD Development Application Forms & Guides', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-application-forms-guides-fees/application-forms-guides' },
    { label: 'SLRD Subdivision Approvals', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-applications-approvals/subdivisions-slrd' },
    { label: 'Village of Britannia Beach Maps', href: 'https://www.slrd.bc.ca/planning-building/mapping' }
  ],
  'furry-creek': [
    { label: 'SLRD Building Permits (Furry Creek)', href: 'https://www.slrd.bc.ca/planning-building/building-department/building-permits' },
    { label: 'SLRD Development Application Forms & Guides', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-application-forms-guides-fees/application-forms-guides' },
    { label: 'SLRD Subdivision Approvals', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-applications-approvals/subdivisions-slrd' },
    { label: 'Village of Furry Creek Maps', href: 'https://www.slrd.bc.ca/planning-building/mapping' }
  ],
  'sea-to-sky': [
    { label: 'SLRD Building Permits (Sea to Sky)', href: 'https://www.slrd.bc.ca/planning-building/building-department/building-permits' },
    { label: 'SLRD Development Application Forms & Guides', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-application-forms-guides-fees/application-forms-guides' },
    { label: 'SLRD Subdivision Approvals', href: 'https://www.slrd.bc.ca/planning-building/planning-development-services/development-applications-approvals/subdivisions-slrd' },
    { label: 'Sea to Sky Corridor Maps', href: 'https://www.slrd.bc.ca/planning-building/mapping' }
  ],
  'district-north-vancouver': [
    { label: 'District of North Vancouver Building Permits', href: 'https://www.dnv.org/business-development/permits-and-inspections-building-and-renovating' },
    { label: 'District of North Vancouver Development Permit Procedure', href: 'https://docs.dnv.org/documents/Development_Permit_Application_Procedure.pdf' },
    { label: 'District of North Vancouver Subdivision Process', href: 'https://docs.dnv.org/documents/subdivision-application-process.pdf' },
    { label: 'District of North Vancouver Mapping', href: 'https://geoweb.dnv.org/' }
  ],
  'district-of-north-vancouver': [
    { label: 'District of North Vancouver Building Permits', href: 'https://www.dnv.org/business-development/permits-and-inspections-building-and-renovating' },
    { label: 'District of North Vancouver Development Permit Procedure', href: 'https://docs.dnv.org/documents/Development_Permit_Application_Procedure.pdf' },
    { label: 'District of North Vancouver Subdivision Process', href: 'https://docs.dnv.org/documents/subdivision-application-process.pdf' },
    { label: 'District of North Vancouver Mapping', href: 'https://geoweb.dnv.org/' }
  ],
  'city-north-vancouver': [
    { label: 'City of North Vancouver Building Permits', href: 'https://www.cnv.org/property-and-development/building-and-development/permits-and-inspections/building-permits' },
    { label: 'City of North Vancouver Development Permits', href: 'https://www.cnv.org/property-and-development/building-and-development/development-applications/development-permits' },
    { label: 'City of North Vancouver Subdivisions', href: 'https://www.cnv.org/Business-Development/Building/Subdivisions' },
    { label: 'City of North Vancouver Mapping', href: 'https://www.cnv.org/City-Hall/About/Maps' }
  ],
  'city-of-north-vancouver': [
    { label: 'City of North Vancouver Building Permits', href: 'https://www.cnv.org/property-and-development/building-and-development/permits-and-inspections/building-permits' },
    { label: 'City of North Vancouver Development Permits', href: 'https://www.cnv.org/property-and-development/building-and-development/development-applications/development-permits' },
    { label: 'City of North Vancouver Subdivisions', href: 'https://www.cnv.org/Business-Development/Building/Subdivisions' },
    { label: 'City of North Vancouver Mapping', href: 'https://www.cnv.org/City-Hall/About/Maps' }
  ],
  'powell-river': [
    { label: 'Powell River Building Permits', href: 'https://powellriver.ca/pages/building-permits' },
    { label: 'Powell River Land Development & Subdivision', href: 'https://powellriver.ca/pages/land-development-and-subdivision' },
    { label: 'Powell River Maps & GIS', href: 'https://powellriver.ca/pages/maps-and-gis' }
  ],
  'sechelt': [
    { label: 'Sechelt Building Permits', href: 'https://www.sechelt.ca/en/business-and-development/building-permits.aspx' },
    { label: 'Sechelt Planning & Development', href: 'https://www.sechelt.ca/en/business-and-development/planning-and-development.aspx' },
    { label: 'District of Sechelt Maps', href: 'https://www.sechelt.ca/en/living-here/maps.aspx' }
  ],
  'gibsons': [
    { label: 'Gibsons Building Permits', href: 'https://gibsons.ca/business/building_development/building-permits/' },
    { label: 'Gibsons Planning & Development', href: 'https://gibsons.ca/business/building_development/planning-development/' },
    { label: 'Town of Gibsons Maps & GIS', href: 'https://gibsons.ca/services/maps-gis/' }
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
  'building-location-certificates': [
    {
      src: '/images/old-home.webp',
      alt: 'Example Building Location Certificate showing a house foundation relative to property lines',
      caption: 'Example plan depicting a building foundation relative to property lines.'
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
  'britannia-beach': [
    {
      src: '/images/britannia-beach.webp',
      alt: 'Britannia Beach Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Britannia Beach, BC.'
    }
  ],
  'furry-creek': [
    {
      src: '/images/furry-creek.webp',
      alt: 'Furry Creek Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Furry Creek, BC.'
    }
  ],
  'west-vancouver': [
    {
      src: '/images/west-vancouver.webp',
      alt: 'West Vancouver Whytecliff Park Survey',
      caption: 'Professional Land Surveying in West Vancouver, BC.'
    }
  ],
  'sea-to-sky': [
    {
      src: '/images/sea-to-sky.webp',
      alt: 'Sea-to-Sky Whytecliff Park Survey',
      caption: 'Professional Land Surveying in Sea-to-Sky, BC.'
    }
  ],
  'bowen-island': [
    {
      src: '/images/bowen-island.webp',
      alt: 'Bowen Island Survey',
      caption: 'Professional Land Surveying in Bowen Island, BC.'
    }
  ],
  'north-vancouver': [
    {
      src: '/images/north-vancouver.webp',
      alt: 'North Vancouver Survey',
      caption: 'Professional Land Surveying in North Vancouver, BC.'
    }
  ],
  'gibsons': [
    {
      src: '/images/gibsons.webp',
      alt: 'Gibsons Survey',
      caption: 'Professional Land Surveying in Gibsons, BC.'
    }
  ],
  'sechelt': [
    {
      src: '/images/sechelt.webp',
      alt: 'Sechelt Survey',
      caption: 'Professional Land Surveying in Sechelt, BC.'
    }
  ],
  'powell-river': [
    {
      src: '/images/power-river.webp',
      alt: 'Powell River Survey',
      caption: 'Professional Land Surveying in Powell River, BC.'
    }
  ]
};
