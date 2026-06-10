import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { isValidLocation, LOCATION_GEO_DATA, ValidLocation } from '../config/locations';

// Custom overrides for specific location slugs to match official naming
const LOCATION_NAME_OVERRIDES: Record<string, string> = {
  'city-north-vancouver': 'City of North Vancouver',
  'district-north-vancouver': 'District of North Vancouver',
  'the-sea-to-sky': 'The Sea to Sky',
};

// Precise string translation table for common service acronyms, titles, and pages
const SERVICE_NAME_MAP: Record<string, string> = {
  // Services
  '3d-settlement-monitoring': '3D Settlement Monitoring',
  'air-space-subdivision-surveys': 'Air Space Subdivision Surveys',
  'bare-land-strata-surveys': 'Bare Land Strata Surveys',
  'bc-land-surveyors-building-location-surveys': 'BC Land Surveyors Building Location Surveys',
  'building-location-certificates': 'Building Location Certificates',
  'block-outline-surveys': 'Block Outline Surveys',
  'boundary-surveys': 'Boundary Surveys',
  'building-strata-surveys': 'Building Strata Surveys',
  'consolidation-surveys': 'Consolidation Surveys',
  'covenant-surveys': 'Covenant Surveys',
  'easement-surveys': 'Easement Surveys',
  'environmental-and-riparian-surveys': 'Environmental & Riparian Surveys',
  'excavation-layout-surveys': 'Excavation Layout Surveys',
  'form-and-foundation-surveys': 'Form & Foundation Surveys',
  'gridline-and-construction-layout-surveys': 'Gridline & Construction Layout Surveys',
  'infrastructure-layout-and-construction-surveys': 'Infrastructure Layout & Construction Surveys',
  'land-act-surveys': 'Land Act Surveys',
  'natural-boundary-surveys': 'Natural Boundary Surveys',
  'phased-strata-surveys': 'Phased Strata Surveys',
  'property-line-surveys': 'Property Line Surveys',
  'proposed-strata-plans': 'Proposed Strata Plans',
  'road-surveys': 'Road Surveys',
  'statutory-rights-of-way-surveys': 'Statutory Rights of Way Surveys',
  'strata-plan-amendment-surveys': 'Strata Plan Amendment Surveys',
  'strata-surveys': 'Strata Surveys',
  'subdivisions-surveys': 'Subdivision Surveys',
  'terrestrial-lidar-scanning': 'Terrestrial LiDAR Scanning',
  'topographic-surveys-and-site-plans': 'Topographic Surveys & Site Plans',
  'topographic-surveys': 'Topographic Surveys',
  'uav-mapping': 'UAV Mapping',
  'volume-and-earthwork-surveys': 'Volume & Earthwork Surveys',
  
  // Other pages and routes
  'sea-to-sky-property-line-and-boundary-staking': 'Property Line & Boundary Staking',
  'surveys-and-title-insurance': 'Surveys & Title Insurance',
  'survey-pricing': 'Survey Pricing',
  'faq': 'FAQ',
  'about': 'About Us',
  'contact': 'Contact',
  'services': 'Services',
  'insights': 'Insights',
  'projects': 'Projects',
  'residential': 'Residential Surveys',
  'subdivision': 'Subdivision Surveys',
};

// Clean fallback that title-cases any unmapped strings
function titleCase(str: string): string {
  return str
    .split('-')
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (lower === 'uav') return 'UAV';
      if (lower === 'lidar') return 'LiDAR';
      if (lower === 'bc') return 'BC';
      if (lower === 'bcls') return 'BCLS';
      if (lower === 'faq') return 'FAQ';
      if (lower === '3d') return '3D';
      
      // Keep minor words lowercase unless they are the first word
      if (index > 0 && ['and', 'of', 'the', 'to', 'for', 'in', 'with', 'by', 'at'].includes(lower)) {
        return lower;
      }
      
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Do not render breadcrumbs on the homepage
  if (pathname === '/' || pathname === '') {
    return null;
  }

  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbs = paths.map((chunk, index) => {
    const isLast = index === paths.length - 1;
    
    // Construct the URL path for this breadcrumb
    let href = '/' + paths.slice(0, index + 1).join('/') + '/';
    
    // Special case: if 'services' is nested under a location, link to the main '/services/' page
    // since there is no intermediate '/:locationSlug/services/' landing page
    if (chunk === 'services' && index > 0 && isValidLocation(paths[index - 1])) {
      href = '/services/';
    }

    // Resolve human-readable label
    let label = chunk;
    if (isValidLocation(chunk)) {
      label = LOCATION_NAME_OVERRIDES[chunk] || LOCATION_GEO_DATA[chunk as ValidLocation]?.locality || titleCase(chunk);
    } else if (SERVICE_NAME_MAP[chunk]) {
      label = SERVICE_NAME_MAP[chunk];
    } else {
      label = titleCase(chunk);
    }

    return { label, href, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList" className="bg-brand-dark/40 border-b border-white/5 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs sm:text-sm text-white/60">
        {/* Home Link */}
        <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
          <Link 
            to="/" 
            itemProp="item"
            className="flex items-center gap-1 hover:text-brand-green transition-colors"
          >
            <Home size={14} className="shrink-0" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </div>

        {/* Dynamic Breadcrumbs */}
        {breadcrumbs.map((crumb, index) => (
          <div key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-2">
            <ChevronRight size={12} className="text-white/30 shrink-0" />
            {crumb.isLast ? (
              <>
                <span itemProp="name" className="font-semibold text-white truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {crumb.label}
                </span>
                <meta itemProp="item" content={`https://www.tantalusgeomatics.com${crumb.href}`} />
              </>
            ) : (
              <Link 
                to={crumb.href} 
                itemProp="item"
                className="hover:text-brand-green transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                <span itemProp="name">{crumb.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={(index + 2).toString()} />
          </div>
        ))}
      </div>
    </nav>
  );
}
