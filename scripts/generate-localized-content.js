import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define the mapping object for all 9 locations
const LOCATION_MAPPING = {
  'squamish': {
    LOCATION_NAME: 'Squamish',
    LOCAL_AUTHORITY: 'District of Squamish',
    MUNICIPAL_LINK: 'https://squamish.ca/assets/BLDG/RESIDENTIAL-BP-Document-Checklist-Revised-FEB-FILLABLE_2022.pdf',
    HERO_IMAGE: '/images/Squamish-Garibaldi-Estates-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Squamish's geography presents distinct environmental and geotechnical challenges, which are managed through designated Development Permit Areas (DPAs). Properties near the Squamish, Mamquam, or Cheakamus rivers often fall within Flood Hazard DPAs, requiring precise determination of Flood Construction Levels (FCLs) and natural boundaries. Similarly, projects in hillside areas like Valleycliffe or the Garibaldi Highlands must address steep slope and landslide hazard guidelines. Tantalus Geomatics specializes in mapping these critical features, including top-of-bank lines, watercourses, and slope gradients, ensuring your project seamlessly satisfies the District's environmental and geotechnical review processes.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Sea-to-Sky corridor. We work closely with local architects, engineers, and District of Squamish planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Squamish project moving forward on schedule."
  },
  'whistler': {
    LOCATION_NAME: 'Whistler',
    LOCAL_AUTHORITY: 'Resort Municipality of Whistler',
    MUNICIPAL_LINK: 'https://www.whistler.ca/business/building-development/building-permits/',
    HERO_IMAGE: '/images/Whistler-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Whistler's alpine terrain and heavy winter snowpack present unique environmental and geotechnical challenges, managed through the Resort Municipality of Whistler's (RMOW) strict development permit guidelines. Properties in areas like Whistler Creek, Alpine Meadows, or Alta Vista often require careful assessment of wildfire hazards, steep slopes, and riparian areas near the River of Golden Dreams or Fitzsimmons Creek. Tantalus Geomatics specializes in mapping these complex alpine features, including precise topographic contours, tree locations, and watercourse boundaries, ensuring your project meets all RMOW environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of Whistler's unique resort environment. We work closely with local architects, builders, and Resort Municipality of Whistler planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Whistler project moving forward on schedule."
  },
  'pemberton': {
    LOCATION_NAME: 'Pemberton',
    LOCAL_AUTHORITY: 'Village of Pemberton',
    MUNICIPAL_LINK: 'https://www.pemberton.ca/government/departments/development-services/building-department',
    HERO_IMAGE: '/images/Pemberton-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Pemberton's valley floor and surrounding mountain slopes present distinct agricultural, flood, and geotechnical considerations. Properties near the Lillooet River or in the Pemberton Valley floodplains require precise determination of Flood Construction Levels (FCLs) and natural boundaries. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies the Village of Pemberton's environmental and geotechnical review processes.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Pemberton Valley. We work closely with local builders, engineers, and Village of Pemberton planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your Pemberton project moving forward on schedule."
  },
  'lillooet': {
    LOCATION_NAME: 'Lillooet',
    LOCAL_AUTHORITY: 'District of Lillooet',
    MUNICIPAL_LINK: 'https://www.lillooet.ca/business-development/building-permits',
    HERO_IMAGE: '/images/Lillooet-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Lillooet's semi-arid climate and rugged Fraser Canyon terrain present unique geotechnical and slope stability challenges. Development on hillside properties requires precise topographic mapping and slope analysis to address landslide hazards and erosion control. Tantalus Geomatics provides certified topographic surveys that map these critical terrain features, ensuring compliance with the District of Lillooet's building bylaws.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that understands the unique terrain of the Lillooet region. We work closely with local contractors and District of Lillooet staff to deliver high-precision digital terrain models and detailed CAD files that keep your project moving forward on schedule."
  },
  'west-vancouver': {
    LOCATION_NAME: 'West Vancouver',
    LOCAL_AUTHORITY: 'District of West Vancouver',
    MUNICIPAL_LINK: 'https://westvancouver.ca/home-building-property/permits-licences/building-permits',
    HERO_IMAGE: '/images/West-Vancouver-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "West Vancouver's steep hillside terrain and coastal environment present significant engineering and zoning challenges. Properties in areas like British Properties, Caulfeild, or Horseshoe Bay require precise topographic mapping to manage steep slope development permits, creek setbacks, and marine boundary determinations. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets the District of West Vancouver's rigorous planning requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the North Shore. We work closely with premier architects, engineers, and District of West Vancouver planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow. From initial site analysis to final municipal submission, we help you mitigate development risks, avoid costly design revisions, and keep your West Vancouver project moving forward on schedule."
  },
  'bowen-island': {
    LOCATION_NAME: 'Bowen Island',
    LOCAL_AUTHORITY: 'Bowen Island Municipality',
    MUNICIPAL_LINK: 'https://www.bowenislandmunicipality.ca/building-permits/',
    HERO_IMAGE: '/images/Bowen-Island-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Bowen Island's rugged island topography and sensitive coastal ecosystems require careful planning and precise spatial data. Properties often face challenges related to steep slopes, rocky terrain, and riparian protection areas. Tantalus Geomatics provides certified topographic surveys that map these critical features, ensuring your project complies with Bowen Island Municipality's environmental and development permit guidelines.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that understands the unique logistics and requirements of island development. We work closely with local builders and Bowen Island Municipality staff to deliver high-precision digital terrain models and detailed CAD files that keep your project moving forward on schedule."
  },
  'britannia-beach': {
    LOCATION_NAME: 'Britannia Beach',
    LOCAL_AUTHORITY: 'Squamish-Lillooet Regional District',
    MUNICIPAL_LINK: 'https://www.slrd.bc.ca/planning-development/building-services',
    HERO_IMAGE: '/images/Britannia-Beach-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Britannia Beach's historic mining landscape and coastal hillside terrain present unique geotechnical and natural hazard considerations. Properties near Britannia Creek or on the steep slopes of Howe Sound require precise topographic mapping to address flood hazards, debris flow risks, and slope stability. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies the Squamish-Lillooet Regional District's (SLRD) development permit guidelines.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Howe Sound corridor. We work closely with local engineers and SLRD planning staff to deliver high-precision digital terrain models and detailed CAD files that keep your Britannia Beach project moving forward on schedule."
  },
  'furry-creek': {
    LOCATION_NAME: 'Furry Creek',
    LOCAL_AUTHORITY: 'Squamish-Lillooet Regional District',
    MUNICIPAL_LINK: 'https://www.slrd.bc.ca/planning-development/building-services',
    HERO_IMAGE: '/images/Furry-Creek-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "Furry Creek's dramatic coastal hillside terrain and master-planned community guidelines present unique development and engineering challenges. Properties require precise topographic mapping to manage steep slopes, creek setbacks, and marine boundary determinations. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets the Squamish-Lillooet Regional District's (SLRD) rigorous planning requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the Howe Sound corridor. We work closely with local architects, engineers, and SLRD planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
  },
  'north-vancouver': {
    LOCATION_NAME: 'North Vancouver',
    LOCAL_AUTHORITY: 'City and District of North Vancouver',
    MUNICIPAL_LINK: 'https://www.dnv.org/property-and-development/building-and-permits',
    HERO_IMAGE: '/images/North-Vancouver-Property-Survey.webp',
    GEOGRAPHY_PARAGRAPH: "North Vancouver's steep mountain slopes, dense forests, and numerous creek ravines present significant engineering and zoning challenges. Properties in areas like Deep Cove, Lynn Valley, or Lonsdale require precise topographic mapping to manage steep slope development permits, creek setbacks, and wildfire hazard assessments. Tantalus Geomatics specializes in mapping these complex features, ensuring your project meets all municipal environmental and engineering requirements.",
    PARTNERSHIP_PARAGRAPH: "By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of the North Shore. We work closely with local architects, engineers, and municipal planning staff to deliver high-precision digital terrain models and detailed CAD files that integrate perfectly into your design workflow."
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

// 3. Read the base MDX template file
const templatePath = path.join(__dirname, '../src/content/base/services/topographic-surveys.mdx');
console.log(`Reading base template from: ${templatePath}`);

let templateContent = '';
try {
  templateContent = fs.readFileSync(templatePath, 'utf8');
} catch (error) {
  console.error('Error reading base template:', error.message);
  process.exit(1);
}

// 4. Loop through each location and generate the localized MDX file
locations.forEach(locationSlug => {
  console.log(`\nProcessing location: ${locationSlug}`);
  
  // Get mapping data for this location, or use a fallback
  const data = LOCATION_MAPPING[locationSlug] || {
    LOCATION_NAME: locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    LOCAL_AUTHORITY: `Municipality of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    MUNICIPAL_LINK: 'https://example.com',
    HERO_IMAGE: `/images/${locationSlug}-Property-Survey.webp`,
    GEOGRAPHY_PARAGRAPH: `The geography of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} presents unique environmental and geotechnical challenges. Tantalus Geomatics specializes in mapping these critical features, ensuring your project satisfies all local environmental and geotechnical review processes.`,
    PARTNERSHIP_PARAGRAPH: `By choosing Tantalus Geomatics, you partner with a team that possesses deep local knowledge of ${locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}. We work closely with local builders, engineers, and planning staff to deliver high-precision digital terrain models and detailed CAD files.`
  };

  // Replace placeholders
  let localizedContent = templateContent;
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    localizedContent = localizedContent.replace(placeholder, value);
  });

  // Define output directory and file path
  const outputDir = path.join(__dirname, `../src/content/services/${locationSlug}`);
  const outputFilePath = path.join(outputDir, 'topographic-surveys.mdx');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }

  // Write the localized MDX file
  try {
    fs.writeFileSync(outputFilePath, localizedContent, 'utf8');
    console.log(`Successfully generated: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error writing file for ${locationSlug}:`, error.message);
  }
});

console.log('\nContent generation complete!');
