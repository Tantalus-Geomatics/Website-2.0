import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SERVICE_LINKS_MAP,
  LOCATION_LINKS_MAP,
  SERVICE_IMAGES_MAP,
  LOCATION_IMAGES_MAP,
  LOCATION_GEO_DATA
} from '../src/config/resourceMapping.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sanitizeFrontmatter(content) {
  // Find the frontmatter block at the start of the file
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return content;

  const frontmatterBlock = match[1];
  const lines = frontmatterBlock.split(/\r?\n/);
  
  const sanitizedLines = lines.map(line => {
    // Match key: value
    const parts = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (parts) {
      const key = parts[1];
      const value = parts[2];
      
      if (['title', 'serviceName', 'description', 'metaDescription', 'faqs', 'steps'].includes(key)) {
        // Strip out all Markdown asterisks (* and **) and HTML/JSX tags
        const sanitizedValue = value
          .replace(/\*/g, '')
          .replace(/<[^>]+>/g, '');
        return `${key}: ${sanitizedValue}`;
      }
    }
    return line;
  });

  const newFrontmatterBlock = sanitizedLines.join('\n');
  return content.replace(frontmatterBlock, newFrontmatterBlock);
}

function sanitizeMetadata(content) {
  // Find the export const metadata block by matching from 'export const metadata = {' to the end of the metadata declaration.
  const metadataStart = content.indexOf('export const metadata = {');
  if (metadataStart === -1) return content;
  
  const metadataEnd = content.indexOf('export default', metadataStart);
  if (metadataEnd === -1) return content;
  
  const metadataBlock = content.substring(metadataStart, metadataEnd);
  
  // Sanitize any string values inside this metadata block.
  // Specifically, we want to strip HTML tags and asterisks from 'title', 'serviceName', 'description', etc.
  const sanitizedMetadataBlock = metadataBlock.replace(/(title|serviceName|description|metaDescription)\s*:\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g, (match, key, doubleQuotedValue, singleQuotedValue) => {
    const isDouble = doubleQuotedValue !== undefined;
    const value = isDouble ? doubleQuotedValue : singleQuotedValue;
    const quote = isDouble ? '"' : "'";
    
    const sanitizedValue = value
      .replace(/\*/g, '')
      .replace(/\\"/g, '"') // temporarily unescape quotes if any
      .replace(/\\'/g, "'")
      .replace(/<[^>]+>/g, '') // strip HTML tags
      .replace(/"/g, '\\"') // re-escape quotes
      .replace(/'/g, "\\'");
      
    return `${key}: ${quote}${sanitizedValue}${quote}`;
  });
  
  return content.substring(0, metadataStart) + sanitizedMetadataBlock + content.substring(metadataEnd);
}

function removeDoubleThe(content) {
  let previous;
  let current = content;
  const regex = /\b(the)\s+the\b/gi;
  do {
    previous = current;
    current = current.replace(regex, (match, p1) => p1);
  } while (current !== previous);
  return current;
}

function getImagesForLocation(locationSlug) {
  if (LOCATION_IMAGES_MAP[locationSlug]) {
    return LOCATION_IMAGES_MAP[locationSlug];
  }
  const normalizedSlug = locationSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  for (const key of Object.keys(LOCATION_IMAGES_MAP)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (normalizedKey === normalizedSlug) {
      return LOCATION_IMAGES_MAP[key];
    }
  }
  return [];
}

function getLinksForLocation(locationSlug) {
  if (LOCATION_LINKS_MAP[locationSlug]) {
    return LOCATION_LINKS_MAP[locationSlug];
  }
  const normalizedSlug = locationSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  for (const key of Object.keys(LOCATION_LINKS_MAP)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (normalizedKey === normalizedSlug) {
      return LOCATION_LINKS_MAP[key];
    }
  }
  return [];
}

function getCleanServiceName(serviceSlug) {
  const mapping = {
    '3d-settlement-monitoring': '3D Settlement Monitoring',
    'air-space-subdivision-surveys': 'Air Space Subdivision Surveys',
    'bare-land-strata-surveys': 'Bare Land Strata Surveys',
    'bc-land-surveyors-building-location-surveys': 'Building Location Surveys',
    'block-outline-surveys': 'Block Outline Surveys',
    'boundary-surveys': 'Boundary Surveys',
    'building-strata-surveys': 'Building Strata Surveys',
    'consolidation-surveys': 'Consolidation Surveys',
    'covenant-surveys': 'Covenant Surveys',
    'easement-surveys': 'Easement Surveys',
    'environmental-and-riparian-surveys': 'Environmental and Riparian Surveys',
    'excavation-layout-surveys': 'Excavation Layout Surveys',
    'form-and-foundation-surveys': 'Form and Foundation Surveys',
    'gridline-and-construction-layout-surveys': 'Gridline and Construction Layout Surveys',
    'infrastructure-layout-and-construction-surveys': 'Infrastructure Layout and Construction Surveys',
    'land-act-surveys': 'Land Act Surveys',
    'natural-boundary-surveys': 'Natural Boundary Surveys',
    'phased-strata-surveys': 'Phased Strata Surveys',
    'proposed-strata-plans': 'Proposed Strata Plans',
    'road-surveys': 'Road Surveys',
    'statutory-rights-of-way-surveys': 'Statutory Rights of Way Surveys',
    'strata-plan-amendment-surveys': 'Strata Plan Amendment Surveys',
    'strata-surveys': 'Strata Surveys',
    'subdivisions-surveys': 'Subdivision Surveys',
    'terrestrial-lidar-scanning': 'Terrestrial LiDAR Scanning',
    'topographic-surveys-and-site-plans': 'Topographic Surveys and Site Plans',
    'uav-mapping': 'UAV Mapping',
    'volume-and-earthwork-surveys': 'Volume and Earthwork Surveys'
  };
  return mapping[serviceSlug] || serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function injectServiceImage(content, serviceSlug, locationName) {
  const serviceImages = SERVICE_IMAGES_MAP[serviceSlug];
  if (!serviceImages || serviceImages.length === 0) {
    return content;
  }
  const firstImage = serviceImages[0];
  if (!firstImage || !firstImage.src) {
    return content;
  }
  const { src } = firstImage;
  const cleanServiceName = getCleanServiceName(serviceSlug);
  const dynamicAlt = `BC Land Surveyor performing ${cleanServiceName} in ${locationName}, BC`;

  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.[^/.]+$/, "") + ".webp";
  const pictureTag = `<picture className="w-full md:w-1/2 md:float-right mb-6 md:ml-8 md:mb-8 block">
  <source srcSet="${webpSrc}" type="image/webp" sizes="(max-width: 768px) 100vw, 600px" />
  <img src="${src}" alt="${dynamicAlt}" width="600" height="400" fetchPriority="high" className="w-full h-auto rounded-2xl shadow-lg border border-slate-200 object-cover" />
</picture>`;

  // Find the end of the export default block
  const templateEndIndex = content.indexOf('</ServiceTemplate>');
  if (templateEndIndex === -1) {
    return content;
  }
  
  const closingParenIndex = content.indexOf(')', templateEndIndex);
  if (closingParenIndex === -1) {
    return content;
  }

  const header = content.substring(0, closingParenIndex + 1);
  const body = content.substring(closingParenIndex + 1);

  // Split the body into paragraphs by double newlines (with optional whitespace/carriage returns)
  const paragraphs = body.split(/\r?\n\s*\r?\n/);
  
  // Find the first non-empty paragraph
  let firstParaIdx = -1;
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].trim().length > 0) {
      firstParaIdx = i;
      break;
    }
  }

  if (firstParaIdx === -1) {
    return content;
  }

  // Inject the picture tag after the first paragraph
  paragraphs[firstParaIdx] = paragraphs[firstParaIdx] + "\n\n" + pictureTag;

  // Reconstruct the body and full content
  const newBody = paragraphs.join("\n\n");
  return header + newBody;
}

function injectSchemaIntoMetadata(content, schema) {
  if (!schema) return content;
  const metadataIndex = content.indexOf('export const metadata = {');
  if (metadataIndex === -1) return content;
  
  const insertIndex = metadataIndex + 'export const metadata = {'.length;
  const schemaString = `\n  schema: ${JSON.stringify(schema, null, 2)},`;
  
  return content.substring(0, insertIndex) + schemaString + content.substring(insertIndex);
}

// 1. Define the mapping object for all 9 locations
const LOCATION_MAPPING = {
  'squamish': {
    LOCATION_NAME: 'Squamish',
    LOCAL_AUTHORITY: 'District of Squamish',
    MUNICIPAL_LINK: 'https://squamish.ca/building-and-land-development/home-land-and-property-development/land-development-applications/',
    HERO_IMAGE: '/images/Squamish-Garibaldi-Estates-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Squamish's geography presents distinct environmental and geotechnical challenges, which are managed through designated Development Permit Areas (DPAs). Properties near the Squamish, Mamquam, or Cheakamus rivers often fall within Flood Hazard DPAs, requiring precise determination of Flood Construction Levels (FCLs) and natural boundaries. Similarly, projects in hillside areas like Valleycliffe or the Garibaldi Highlands must address steep slope and landslide hazard guidelines. Tantalus Geomatics specializes in mapping these critical features, including top-of-bank lines, watercourses, and slope gradients, ensuring your project seamlessly satisfies the District's environmental and geotechnical review processes.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sea-to-Sky corridor. We work closely with local architects, engineers, and District of Squamish planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Squamish project moving forward on schedule."
  },
  'whistler': {
    LOCATION_NAME: 'Whistler',
    LOCAL_AUTHORITY: 'Resort Municipality of Whistler',
    MUNICIPAL_LINK: 'https://www.whistler.ca/business-development/',
    HERO_IMAGE: '/images/Whistler-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Whistler's alpine terrain and heavy winter snowpack present unique environmental and geotechnical challenges, managed through the Resort Municipality of Whistler's (RMOW) strict development permit guidelines. Properties in areas like Whistler Creek, Alpine Meadows, or Alta Vista often require careful assessment of wildfire hazards, steep slopes, and riparian areas near the River of Golden Dreams or Fitzsimmons Creek. Tantalus Geomatics specializes in mapping these complex alpine features, including precise topographic contours, tree locations, and watercourse boundaries, ensuring your project meets all RMOW environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of Whistler's unique resort environment. We work closely with local architects, builders, and Resort Municipality of Whistler planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Whistler project moving forward on schedule."
  },
  'pemberton': {
    LOCATION_NAME: 'Pemberton',
    LOCAL_AUTHORITY: 'Village of Pemberton',
    MUNICIPAL_LINK: 'https://www.pemberton.ca/building-development',
    HERO_IMAGE: '/images/Pemberton-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Pemberton's valley floor and surrounding mountain slopes present distinct agricultural, flood, and geotechnical considerations. Properties near the Lillooet River or in the Pemberton Valley floodplains require precise determination of Flood Construction Levels (FCLs) and natural boundaries. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies the Village of Pemberton's environmental and geotechnical review processes.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Pemberton Valley. We work closely with local builders, engineers, and Village of Pemberton planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Pemberton project moving forward on schedule."
  },
  'lillooet': {
    LOCATION_NAME: 'Lillooet',
    LOCAL_AUTHORITY: 'District of Lillooet',
    MUNICIPAL_LINK: 'https://www.lillooet.ca/building-planning-development',
    HERO_IMAGE: '/images/Lillooet-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Lillooet's semi-arid climate and rugged Fraser Canyon terrain present unique geotechnical and slope stability challenges. Development on hillside properties requires precise topographic mapping and slope analysis to address landslide hazards and erosion control. Tantalus Geomatics provides certified topographic surveys that map these critical terrain features, ensuring compliance with the District of Lillooet's building bylaws.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that understands the unique terrain of the Lillooet region. We work closely with local contractors and District of Lillooet staff to deliver high-precision digital terrain models and detailed CAD files that keep your project moving forward on schedule."
  },
  'west-vancouver': {
    LOCATION_NAME: 'West Vancouver',
    LOCAL_AUTHORITY: 'District of West Vancouver',
    MUNICIPAL_LINK: 'https://westvancouver.ca/business-development/building-development',
    HERO_IMAGE: '/images/West-Vancouver-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "West Vancouver's steep hillside terrain and coastal environment present significant engineering and zoning challenges. Properties in areas like British Properties, Caulfeild, or Horseshoe Bay require precise topographic mapping to manage steep slope development permits, creek setbacks, and marine boundary determinations. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets the District of West Vancouver's rigorous planning requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the North Shore. We work closely with premier architects, engineers, and District of West Vancouver planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your West Vancouver project moving forward on schedule."
  },
  'bowen-island': {
    LOCATION_NAME: 'Bowen Island',
    LOCAL_AUTHORITY: 'Bowen Island Municipality',
    MUNICIPAL_LINK: 'https://bowenislandmunicipality.ca/property-development/planning-development/',
    HERO_IMAGE: '/images/Bowen-Island-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Bowen Island's rugged island topography and sensitive coastal ecosystems require careful planning and precise spatial data. Properties often face challenges related to steep slopes, rocky terrain, and riparian protection areas. Tantalus Geomatics provides certified topographic surveys that map these critical features, ensuring your project complies with Bowen Island Municipality's environmental and development permit guidelines.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that understands the unique logistics and requirements of island development. We work closely with local builders and Bowen Island Municipality staff to deliver high-precision digital terrain models and detailed CAD files that keep your project moving forward on schedule."
  },
  'britannia-beach': {
    LOCATION_NAME: 'Britannia Beach',
    LOCAL_AUTHORITY: 'Squamish-Lillooet Regional District',
    MUNICIPAL_LINK: 'https://www.slrd.bc.ca/planning-development-services',
    HERO_IMAGE: '/images/Britannia-Beach-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Britannia Beach's historic mining landscape and coastal hillside terrain present unique geotechnical and natural hazard considerations. Properties near Britannia Creek or on the steep slopes of Howe Sound require precise topographic mapping to address flood hazards, debris flow risks, and slope stability. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies the Squamish-Lillooet Regional District's (SLRD) development permit guidelines.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Howe Sound corridor. We work closely with local engineers and SLRD planning staff to deliver high-precision digital terrain models and detailed CAD files that keep your Britannia Beach project moving forward on schedule."
  },
  'furry-creek': {
    LOCATION_NAME: 'Furry Creek',
    LOCAL_AUTHORITY: 'Squamish-Lillooet Regional District',
    MUNICIPAL_LINK: 'https://www.slrd.bc.ca/planning-development-services',
    HERO_IMAGE: '/images/Furry-Creek-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Furry Creek's dramatic coastal hillside terrain and master-planned community guidelines present unique development and engineering challenges. Properties require precise topographic mapping to manage steep slopes, creek setbacks, and marine boundary determinations. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets the Squamish-Lillooet Regional District's (SLRD) rigorous planning requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Howe Sound corridor. We work closely with local architects, engineers, and SLRD planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'city-north-vancouver': {
    LOCATION_NAME: 'City of North Vancouver',
    LOCAL_AUTHORITY: 'City of North Vancouver',
    MUNICIPAL_LINK: 'https://www.cnv.org/business-development/building',
    HERO_IMAGE: '/images/North-Vancouver-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "North Vancouver's steep mountain slopes, dense forests, and numerous creek ravines present significant engineering and zoning challenges. Properties in areas like Deep Cove, Lynn Valley, or Lonsdale require precise topographic mapping to manage steep slope development permits, creek setbacks, and wildfire hazard assessments. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the North Shore. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'district-north-vancouver': {
    LOCATION_NAME: 'District of North Vancouver',
    LOCAL_AUTHORITY: 'District of North Vancouver',
    MUNICIPAL_LINK: 'https://www.dnv.org/business-development',
    HERO_IMAGE: '/images/North-Vancouver-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "North Vancouver's steep mountain slopes, dense forests, and numerous creek ravines present significant engineering and zoning challenges. Properties in areas like Deep Cove, Lynn Valley, or Lonsdale require precise topographic mapping to manage steep slope development permits, creek setbacks, and wildfire hazard assessments. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the North Shore. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'gibsons': {
    LOCATION_NAME: 'Gibsons',
    LOCAL_AUTHORITY: 'Town of Gibsons',
    MUNICIPAL_LINK: 'https://gibsons.ca/business/building_development/',
    HERO_IMAGE: '/images/gibsons.webp',
    GEOGRAPHY_PARAGRAPH: "Gibsons’ dramatic transition from a bustling marine waterfront up to rolling, forested benches creates a diverse topographic landscape with distinct development constraints. Properties in areas like Lower Gibsons, Upper Gibsons, or Granthams Landing require careful mapping to navigate steep marine bluffs, complex stormwater runoff paths, and strict municipal regulations surrounding the sensitive Gibsons Aquifer watershed. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sunshine Coast. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'sechelt': {
    LOCATION_NAME: 'Sechelt',
    LOCAL_AUTHORITY: 'District of Sechelt',
    MUNICIPAL_LINK: 'https://www.sechelt.ca/en/business-and-development/planning-and-development.aspx',
    HERO_IMAGE: '/images/sechelt.webp',
    GEOGRAPHY_PARAGRAPH: "Sechelt’s unique position on a narrow isthmus between the Sechelt Inlet and the Strait of Georgia features a mix of low-lying coastal floodplains, sandy shorelines, and steep hillside terrain. Properties in areas like West Sechelt, Tuwanek, or Davis Bay face challenges ranging from coastal erosion and marine flood hazards to steep slope geotechnical constraints and sensitive archaeological overlays. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sunshine Coast. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'powell-river': {
    LOCATION_NAME: 'Powell River',
    LOCAL_AUTHORITY: 'City of Powell River',
    MUNICIPAL_LINK: 'https://powellriver.ca/pages/land-development-and-subdivision',
    HERO_IMAGE: '/images/powel-river.webp',
    GEOGRAPHY_PARAGRAPH: "Powell River’s rugged coastal topography, characterized by rocky shorelines, dense coastal rainforests, and a steep rise toward the Coast Mountains, presents distinct spatial and engineering hurdles. Properties in areas like Westview, Townsite, or Wildwood require precise legal and topographic surveying to address wildfire-urban interface hazards, complex bedrock terrain, and coastal development setbacks. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sunshine Coast. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'the-sea-to-sky': {
    LOCATION_NAME: 'Sea to Sky',
    SERVICE_LOCATION_NAME: 'the Sea to Sky',
    LOCAL_AUTHORITY: 'Squamish-Lillooet Regional District',
    MUNICIPAL_LINK: 'https://www.slrd.bc.ca/planning-development-services',
    HERO_IMAGE: '/images/sea-to-sky.webp',
    GEOGRAPHY_PARAGRAPH: "The Sea to Sky's historic mining landscape and coastal hillside terrain present unique geotechnical and natural hazard considerations. Properties along the steep slopes of Howe Sound require precise topographic mapping to address flood hazards, debris flow risks, and slope stability. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies the Squamish-Lillooet Regional District's (SLRD) development permit guidelines.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sea to Sky corridor. We work closely with local engineers and SLRD planning staff to deliver high-precision digital terrain models and detailed CAD files that keep your Britannia Beach project moving forward on schedule."
  }
};

// 2. Read locations from src/config/locations.ts
const locationsFilePath = path.join(__dirname, '../src/config/locations.ts');
console.log(`Reading locations from: ${locationsFilePath}`);

let locations = [];
try {
  const locationsFileContent = fs.readFileSync(locationsFilePath, 'utf8');
  const locationsMatch = locationsFileContent.match(/VALID_LOCATIONS\s*=\s*\[([\s\S]*?)\]/);
  if (!locationsMatch) {
    throw new Error('Could not parse VALID_LOCATIONS from src/config/locations.ts');
  }
  locations = locationsMatch[1]
    .split(',')
    .map(loc => loc.replace(/['"\s]/g, ''))
    .filter(loc => loc && loc !== 'asconst');
  
  console.log(`Found ${locations.length} locations:`, locations);
} catch (error) {
  console.error('Error reading locations:', error.message);
  process.exit(1);
}

// 3. Read all base MDX template files
const baseServicesDir = path.join(__dirname, '../src/content/base/services');
console.log(`Scanning base services directory: ${baseServicesDir}`);

let baseTemplates = [];
try {
  baseTemplates = fs.readdirSync(baseServicesDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  console.log(`Found ${baseTemplates.length} base service templates:`, baseTemplates);
} catch (error) {
  console.error('Error scanning base services directory:', error.message);
  process.exit(1);
}

// 4. Loop through each base template and each location to generate the localized MDX files
baseTemplates.forEach(templateFile => {
  const templatePath = path.join(baseServicesDir, templateFile);
  console.log(`\nProcessing template: ${templateFile}`);

  let templateContent = '';
  try {
    templateContent = fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error(`Error reading base template ${templateFile}:`, error.message);
    return;
  }

  const serviceSlug = templateFile.replace(/\.mdx?$/, '');

  const serviceLinks = SERVICE_LINKS_MAP[serviceSlug] || [];
  const serviceImages = SERVICE_IMAGES_MAP[serviceSlug] || [];

  locations.forEach(locationSlug => {
    console.log(`- Generating for location: ${locationSlug}`);
    
    const locationLinks = getLinksForLocation(locationSlug);
    const locationImages = getImagesForLocation(locationSlug);

    // Get mapping data for this location, or use a fallback
    const locationData = LOCATION_MAPPING[locationSlug] || {
      LOCATION_NAME: locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      LOCAL_AUTHORITY: `Municipality of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
      MUNICIPAL_LINK: 'https://example.com',
      HERO_IMAGE: `/images/${locationSlug}-Property-Survey.webp`,
      GEOGRAPHY_PARAGRAPH: `The geography of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} presents unique environmental and geotechnical challenges. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies all local environmental and geotechnical review processes.`,
      PARTNERSHIP_PARAGRAPH: `By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}. We work closely with local builders, engineers, and planning staff to deliver high-precision digital terrain models and detailed CAD files.`
    };

    // Look up LOCATION_IMAGES_MAP[locationSlug]
    const directLocationImages = LOCATION_IMAGES_MAP[locationSlug] || getImagesForLocation(locationSlug);
    const computedHeroImage = (directLocationImages && directLocationImages.length > 0 && directLocationImages[0].src)
      ? directLocationImages[0].src
      : "/images/Squamish-Garibaldi-Estates-Property-Survey.webp";

    const cleanServiceName = getCleanServiceName(serviceSlug);
    const serviceLocationName = locationData.SERVICE_LOCATION_NAME || locationData.LOCATION_NAME;
    const dynamicAlt = `BC Land Surveyor conducting ${cleanServiceName} in ${serviceLocationName}, BC`;

    const dynamicServiceImages = serviceImages.map(img => ({
      ...img,
      alt: `BC Land Surveyor conducting ${cleanServiceName} in ${serviceLocationName}, BC`
    }));

    const dynamicLocationImages = locationImages.map(img => ({
      ...img,
      alt: `BC Land Surveyor conducting ${cleanServiceName} in ${serviceLocationName}, BC`
    }));

    const data = {
      ...locationData,
      HERO_IMAGE: computedHeroImage,
      HERO_IMAGE_ALT: dynamicAlt,
      SERVICE_LINKS: JSON.stringify(serviceLinks, null, 2),
      LOCATION_LINKS: JSON.stringify(locationLinks, null, 2),
      SERVICE_IMAGES: JSON.stringify(dynamicServiceImages, null, 2),
      LOCATION_IMAGES: JSON.stringify(dynamicLocationImages, null, 2)
    };

    // Replace placeholders
    let localizedContent = templateContent;
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      localizedContent = localizedContent.replace(placeholder, value);
    });

    if (locationData.SERVICE_LOCATION_NAME) {
      localizedContent = localizedContent.replace(
        /locationName: 'Sea to Sky'/g,
        `locationName: '${locationData.SERVICE_LOCATION_NAME}'`
      );
      localizedContent = localizedContent.replace(/\bin Sea to Sky\b/g, 'in the Sea to Sky');
    }

    // Inject inline service image if available
    localizedContent = injectServiceImage(localizedContent, serviceSlug, serviceLocationName);

    // Construct localized schema
    const geoData = LOCATION_GEO_DATA[locationSlug];
    const schemaRegionLabel = locationSlug === 'the-sea-to-sky'
      ? `the ${geoData?.locality || locationData.LOCATION_NAME}`
      : geoData?.locality || locationData.LOCATION_NAME;
    
    // Normalize image paths to absolute URLs as required strictly by schema protocol engines
    const absoluteSchemaImage = computedHeroImage.startsWith('http')
      ? computedHeroImage
      : `https://www.tantalusgeomatics.com${computedHeroImage}`;

    const localizedSchema = geoData ? {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `Tantalus Geomatics Land Surveying - ${geoData.locality}`,
      "description": `Professional ${cleanServiceName} and geomatics services in ${schemaRegionLabel}, BC.`,
      "url": `https://www.tantalusgeomatics.com/${locationSlug}/services/${serviceSlug}/`,
      "telephone": "+16042139934",
      "priceRange": "$$",
      "image": absoluteSchemaImage,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": geoData.locality,
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": geoData.lat,
        "longitude": geoData.lng
      },
      "hasService": {
        "@type": "Service",
        "name": cleanServiceName,
        "description": `Professional ${cleanServiceName} in ${schemaRegionLabel}, BC.`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://tantalusgeomatics.com/#organization"
        }
      }
    } : null;

    // Inject schema into metadata
    localizedContent = injectSchemaIntoMetadata(localizedContent, localizedSchema);

    // Sanitize frontmatter variables
    localizedContent = sanitizeFrontmatter(localizedContent);
    localizedContent = sanitizeMetadata(localizedContent);
    localizedContent = removeDoubleThe(localizedContent);

    // Define output directory and file path
    const outputDir = path.join(__dirname, `../src/content/services/${locationSlug}`);
    const outputFilePath = path.join(outputDir, templateFile);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`  Created directory: ${outputDir}`);
    }

    // Write the localized MDX file
    try {
      fs.writeFileSync(outputFilePath, localizedContent, 'utf8');
      console.log(`  Successfully generated: ${outputFilePath}`);
    } catch (error) {
      console.error(`  Error writing file for ${locationSlug}:`, error.message);
    }
  });
});

console.log('\nContent generation complete!');