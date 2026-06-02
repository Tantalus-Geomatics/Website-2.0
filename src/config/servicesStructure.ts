import { Home, HardHat, Scale, Building, Mountain, Trees } from 'lucide-react';

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
    serviceSlugs: ['property-line-surveys', 'building-location-certificates', 'boundary-surveys']
  },
  {
    id: 'construction',
    title: 'Construction Surveys',
    description: 'High-precision layout engineering, grading validation, and structure positioning to bridge design models with physical site deployment.',
    homeDescription: 'Precise layout staking for foundations, gridlines, and structural site utilities.',
    icon: HardHat,
    image: '/images/construction.webp',
    serviceSlugs: ['construction-staking']
  },
  {
    id: 'legal',
    title: 'Legal Surveys',
    description: 'Statutory boundary re-establishments, subdivision design layout plans, and land title office registry filings overseen by a commissioned BCLS.',
    homeDescription: 'Subdivision plans, airspace parcels, and easement plans registered at the Land Title Office.',
    icon: Scale,
    image: '/images/survey-marker-post.webp',
    serviceSlugs: ['bare-land-strata-surveys', 'air-space-subdivision-surveys', 'statutory-rights-of-way-surveys']
  },
  {
    id: 'commercial',
    title: 'Commercial Surveys',
    description: 'Comprehensive boundary mapping, base topographic frameworks, and title verification layouts for multi-unit, commercial, and industrial developments.',
    homeDescription: 'Comprehensive geomatics frameworks tailored for commercial real estate developments.',
    icon: Building,
    image: '/images/land-development.webp',
    serviceSlugs: ['volume-and-earthwork-surveys']
  },
  {
    id: 'engineering',
    title: 'Engineering Surveys',
    description: 'Millimeter-accurate tracking networks, structural deformation analysis, and settlement safety verification metrics for complex infrastructure systems.',
    homeDescription: 'High-precision 3D structural settlement monitoring and deformation analysis.',
    icon: Mountain,
    image: '/images/3d-settlement-monitoring.webp',
    serviceSlugs: ['3d-settlement-monitoring', 'terrestrial-lidar-scanning']
  },
  {
    id: 'uav-lidar',
    title: 'UAV/LiDAR Surveys',
    description: 'Advanced reality capture employing airborne sensors and terrestrial laser scanners to assemble high-fidelity spatial models of complex sites.',
    homeDescription: 'High-density drone mapping, aerial photogrammetry, and 3D point cloud generation.',
    icon: Trees,
    image: '/images/reality-capture.webp',
    serviceSlugs: ['uav-mapping', 'environmental-and-riparian-surveys']
  }
];
