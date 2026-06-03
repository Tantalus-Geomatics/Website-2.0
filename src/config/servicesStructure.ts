import { Home, HardHat, Scale, Building, Mountain, Layers } from 'lucide-react';

export interface ServiceCategoryConfig {
  id: string;
  title: string;
  description: string;
  homeDescription: string; // Abbreviated version for the 2x3 home panel
  icon: any;
  image: string;
  serviceSlugs: string[]; // Child service slugs belonging to this bucket
}

export const SERVICE_CATEGORIES: ServiceCategoryConfig[] = [
  {
    id: 'residential',
    title: 'Residential Surveys',
    description: 'Residential surveys are typically performed for the owner of a property, or someone looking to purchase a property to facilitate improvements, additions, or renovations.',
    homeDescription: 'Boundary marking, site plans for permits, and zoning layout inspections for homeowners.',
    icon: Home,
    image: '/images/old-home.webp',
    serviceSlugs: ["bc-land-surveyors-building-location-surveys","topographic-surveys-and-site-plans"]
  },
  {
    id: 'construction',
    title: 'Construction Surveys',
    description: 'High-precision layout engineering, grading validation, and structure positioning to bridge design models with physical site deployment.',
    homeDescription: 'Precise layout staking for foundations, gridlines, and structural site utilities.',
    icon: HardHat,
    image: '/images/construction.webp',
    serviceSlugs: ["environmental-and-riparian-surveys","excavation-layout-surveys","form-and-foundation-surveys","gridline-and-construction-layout-surveys","infrastructure-layout-and-construction-surveys","road-surveys"]
  },
  {
    id: 'legal',
    title: 'Legal Surveys',
    description: 'Statutory boundary re-establishments, subdivision design layout plans, and land title office registry filings overseen by a commissioned BCLS.',
    homeDescription: 'Subdivision plans, airspace parcels, and easement plans registered at the Land Title Office.',
    icon: Scale,
    image: '/images/survey-marker-post.webp',
    serviceSlugs: ["block-outline-surveys","boundary-surveys","consolidation-surveys","covenant-surveys","easement-surveys","land-act-surveys","natural-boundary-surveys","statutory-rights-of-way-surveys","subdivisions-surveys","property-line-surveys"]
  },
  {
    id: 'commercial',
    title: 'Commercial Surveys',
    description: 'Comprehensive boundary mapping, base topographic frameworks, and title verification layouts for multi-unit, commercial, and industrial developments.',
    homeDescription: 'Comprehensive geomatics frameworks tailored for commercial real estate developments.',
    icon: Building,
    image: '/images/land-development.webp',
    serviceSlugs: ["volume-and-earthwork-surveys", "topographic-surveys", "construction-staking", "air-space-subdivision-surveys"]
  },
  {
    id: 'engineering',
    title: 'Engineering Surveys',
    description: 'Millimeter-accurate tracking networks, structural deformation analysis, and settlement safety verification metrics for complex infrastructure systems.',
    homeDescription: 'High-precision 3D structural settlement monitoring and deformation analysis.',
    icon: Mountain,
    image: '/images/3d-settlement-monitoring.webp',
    serviceSlugs: ["3d-settlement-monitoring","terrestrial-lidar-scanning","uav-mapping","volume-and-earthwork-surveys"]
  },
  {
    id: 'strata',
    title: 'Strata Surveys',
    description: 'Comprehensive legal surveying and plan preparation for multi-unit residential, commercial, and industrial developments, ensuring clear definitions of individual titles and common property.',
    homeDescription: 'Specialized building strata plans, bare land strata layouts, and phased multi-unit development surveys.',
    icon: Layers,
    image: '/images/bare-land-strata-surveys.webp',
    serviceSlugs: ["air-space-subdivision-surveys","bare-land-strata-surveys","building-strata-surveys","phased-strata-surveys","proposed-strata-plans","strata-plan-amendment-surveys","strata-surveys"]
  }
];
