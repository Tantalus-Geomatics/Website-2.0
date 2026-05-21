import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, ShieldCheck, MapPinned, Search, ClipboardList } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';

const CANONICAL = 'https://tantalusgeomatics.com/subdivisions/';

export default function Subdivisions() {
  const serviceAreas = [
    "Squamish", "Whistler", "Pemberton", "Lillooet", 
    "West Vancouver", "Bowen Island", "Britannia Beach", 
    "Furry Creek", "North Vancouver"
  ];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${CANONICAL}/#webpage`,
    'url': CANONICAL,
    'name': 'The Process of Subdividing a Parcel in British Columbia | Tantalus Geomatics',
    'description': 'A comprehensive technical guide on the process of subdividing a parcel in British Columbia, including municipal reviews, surveys, and Land Title registration.',
    'isPartOf': {
      '@id': 'https://tantalusgeomatics.com/#website'
    },
    'about': [
      { '@type': 'Thing', 'name': 'Land Subdivision' },
      { '@type': 'Thing', 'name': 'Land Surveying' },
      { '@type': 'Thing', 'name': 'British Columbia Real Estate' }
    ],
    'mainEntity': {
      '@type': 'Service',
      'name': 'Land Subdivision Surveys',
      'serviceType': 'Land Surveying',
      'provider': {
        '@id': 'https://tantalusgeomatics.com/#organization'
      },
      'areaServed': serviceAreas.map(city => ({
        '@type': 'City',
        'name': city
      }))
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://tantalusgeomatics.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Residential Surveys',
          'item': 'https://tantalusgeomatics.com/residential/'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'Subdividing a Parcel in BC',
          'item': CANONICAL
        }
      ]
    },
    'provider': {
      '@id': 'https://tantalusgeomatics.com/#organization'
    }
  };

  // Reusable component for the side panel / bottom content
  const ReferenceContent = () => (
    <div className="space-y-8">
      {/* Panel 1: Municipalities */}
      <div className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 shadow-[0_4px_24px_rgba(107,158,84,0.08)]">
        <h3 className="text-brand-green font-medium mb-4 text-lg border-b border-white/10 pb-2">Example Municipal Requirements</h3>
        <ul className="space-y-3 text-sm text-white/80 font-light">
          <li>
            <a href="https://squamish.ca/building-and-land-development/home-land-and-property-development/land-development-applications/subdivision/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">District of Squamish</a> [cite: 42]
          </li>
          <li>
            <a href="https://www.whistler.ca/business-development/land-use-and-development/subdivision-and-strata-conversion/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Resort Municipality of Whistler</a> [cite: 43]
          </li>
          <li>
            <a href="https://westvancouver.ca/business-development/building-development/development-regulations/other-developments/subdivision" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">West Vancouver</a> [cite: 44]
          </li>
          <li>
            <a href="https://www.dnv.org/business-development/apply-subdivide" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">District of North Vancouver</a> [cite: 45]
          </li>
          <li>
            <a href="https://www.cnv.org/Business-Development/Building/Subdivisions" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">City of North Vancouver</a> [cite: 46]
          </li>
          <li>
            <a href="https://www.pemberton.ca/building-development/planning-development/subdivision" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Village of Pemberton</a> [cite: 47]
          </li>
        </ul>
      </div>

      {/* Panel 2: Glossary */}
      <div className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 shadow-[0_4px_24px_rgba(107,158,84,0.08)]">
        <h3 className="text-brand-green font-medium mb-4 text-lg border-b border-white/10 pb-2">Glossary of Terms [cite: 84]</h3>
        <ul className="space-y-4 text-sm text-white/80 font-light">
          <li><strong className="text-white">Approving Officer:</strong> Statutory decision makers at the municipal and provincial level who ensure that proposed subdivision applications comply with relevant legislation and local bylaws. [cite: 85]</li>
          <li><strong className="text-white">Registrar of Land Titles:</strong> Provincial officer responsible for overseeing the approval and registration of applications for various forms of land use under the jurisdiction of the Land Title and Survey Authority of British Columbia. [cite: 86]</li>
          <li><strong className="text-white">Subdivision:</strong> The process of creating one or more new titled lots from one or more existing titled lots. [cite: 87]</li>
          <li><strong className="text-white">Consolidation:</strong> The process of creating one new titled lot by combining multiple existing titled lots. [cite: 88]</li>
          <li><strong className="text-white">Dedication:</strong> The process of transferring ownership of a portion of a titled lot to a municipality or provincial government body (e.g. Ministry of Transportation and Transit) for purposes such as roads and parks. [cite: 89]</li>
          <li><strong className="text-white">Subdivision Plan:</strong> A plan prepared by a BC Land Surveyor that is based on a ground survey that creates new parcels for which the registrar registers title. [cite: 90] This plan shows the streets, lanes, parks, numbered lots, and other information about the land, with all the necessary measurements. [cite: 91] The plan must also show the position of required monumentation found and placed during the ground survey. [cite: 92]</li>
          <li><strong className="text-white">Reference Plan:</strong> A plan prepared by a BC Land Surveyor that is based on a ground survey that generally refers to a single parcel or charge. [cite: 93]</li>
          <li><strong className="text-white">Statutory Right of Way Plan:</strong> A plan prepared by a BC Land Surveyor that is based on a ground survey that defines the area over which there is a statutory right of way in relation to the boundaries of an existing subdivided parcel. [cite: 94]</li>
          <li><strong className="text-white">Explanatory Plan:</strong> A plan prepared by a BC Land Surveyor that is not based on a ground survey, but on existing descriptions, plans or records of the land title office. [cite: 95]</li>
        </ul>
      </div>

      {/* Panel 3: Relevant Links */}
      <div className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 shadow-[0_4px_24px_rgba(107,158,84,0.08)]">
        <h3 className="text-brand-green font-medium mb-4 text-lg border-b border-white/10 pb-2">Relevant Links [cite: 103]</h3>
        <ul className="space-y-3 text-sm text-white/80 font-light">
          <li><a href="https://www2.gov.bc.ca/gov/content/governments/local-governments/planning-land-use/land-use-regulation/subdividing-land" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Government of BC: Subdividing Land</a> [cite: 104]</li>
          <li><a href="https://ltpm.ltsa.ca/appendix-2-types-plans" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Land Title Practice Manual: Types of Plans</a> [cite: 105]</li>
          <li><a href="https://ltpm.ltsa.ca/overview-part-7" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Land title Practice Manual Part 7: Descriptions and Plans</a> [cite: 106]</li>
          <li><a href="https://ltpm.ltsa.ca/land-title-act-regulation-bc-reg-33479" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Land Title Act Regulations</a> [cite: 107]</li>
          <li><a href="https://www.alc.gov.bc.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">BC Agricultural Land Commission</a> [cite: 108]</li>
          <li><a href="https://www2.gov.bc.ca/gov/content/environment/air-land-water/site-remediation/guidance-resources" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">BC Contaminated Sites Guidance and Resources</a> [cite: 109]</li>
          <li><a href="https://ltsa.ca/professionals/surveyor-general/directions-to-land-surveyors/establishment-of-highway-over-untitled-crown-land/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Establishing Road Access over Crown Land</a> [cite: 110]</li>
          <li><a href="https://ltsa.ca/professionals/surveyor-general/directions-to-land-surveyors/electronic-submission-of-statutory-applications-to-the-surveyor-general/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green underline transition-colors">Natural Boundary Adjustments</a> [cite: 111]</li>
        </ul>
      </div>
    </div>
  );

  return (
    <PageShell>
      <SEO
        title="The Process of Subdividing a Parcel in BC | Tantalus Geomatics"
        description="A comprehensive technical guide to navigating municipal regulations, field surveys, and plan registration for land subdivision in British Columbia."
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/80 to-brand-black z-10" />
          <div className="w-full h-full bg-brand-dark flex items-center justify-center text-white/20 italic">
            [Hero Image Background Placeholder]
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            Technical Guide [cite: 1]
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            The Process of Subdividing a Parcel in British Columbia [cite: 1]
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Professional insight into municipal regulations, survey requirements, and title registration.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Consult an Expert BCLS
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content Column */}
            <div className="lg:w-2/3 space-y-16">
              
              {/* Introduction */}
              <div>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  The process of subdividing a parcel in British Columbia sits at the intersection of various municipal and provincial regulations and approvals. [cite: 2] In general terms, it involves creating one or more new lots from one or more existing lots through the registration of plans by establishing good safe holding and marketable title in fee simple for each of the new lots. [cite: 3]
                </p>
                <p className="text-white/80 font-light leading-relaxed mb-6">
                  These conditions are essential for ensuring the new lots are free from undisclosed defects, and safe from future legal challenges, such that they can easily be sold to others. [cite: 4]
                </p>
                
                {/* Image Placeholder */}
                <div className="aspect-video bg-brand-dark flex items-center justify-center border border-white/10 my-6 text-white/50 italic rounded-md shadow-lg">
                  [Image Placeholder: Subdivision Process Infographic]
                </div>
                
                <p className="text-white/80 font-light leading-relaxed">
                  While the process itself varies depending on the municipality the lots are situated within, it can generally be summarized as follows: [cite: 4]
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">1. Initial consultation with Municipality to assess feasibility [cite: 5]</h2>
                <GeoDirectAnswer question="What is the first step when considering subdividing a parcel in British Columbia?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    The applicant, along with the BC Land Surveyor supporting the work, contacts the municipal planning department to assess the feasibility of proceeding with the subdivision. [cite: 5]
                  </p>
                </GeoDirectAnswer>
                <p className="text-white/80 font-light leading-relaxed mb-2">Points of discussion include: [cite: 6]</p>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4">
                  <li>Zoning Bylaws [cite: 7]</li>
                  <li>Minimum Lot Size + Dimensions [cite: 8]</li>
                  <li>Trees [cite: 9]</li>
                  <li>Steep slopes and Geotechnical Considerations [cite: 10]</li>
                  <li>Proximity to watercourses [cite: 11]</li>
                  <li>Lot Servicing Requirements [cite: 12]</li>
                  <li>Access Requirements [cite: 13]</li>
                  <li>Park Dedication Requirements [cite: 14]</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">2. Retracement and site survey of Subject Lot(s) [cite: 15]</h2>
                <GeoDirectAnswer question="What surveys are required for a preliminary subdivision application in BC?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    A preliminary survey is conducted to collect all the relevant information required to prepare the preliminary application to subdivide. [cite: 16] The survey requirements can be split into two categories: [cite: 17]
                  </p>
                </GeoDirectAnswer>
                
                <h3 className="text-xl text-brand-green font-medium mt-6 mb-3">A. The Topographic Survey</h3>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  The topographic survey per the municipal submission requirements. These requirements are essential for the various municipal departments (e.g. engineering, planning, building) to complete their assessments as they determine whether they can permit the lot(s) to be subdivided. [cite: 18] The topographic survey requirements vary by municipality, however they typically include: [cite: 19]
                </p>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>Existing building locations with setbacks and dimensions [cite: 20]</li>
                  <li>Location and diameter (DBH) of any significant trees on site [cite: 21]</li>
                  <li>Current site access (e.g. roads, driveways, etc…) [cite: 22]</li>
                  <li>Grade changes and Steep slopes [cite: 23]</li>
                  <li>Watercourses/Ravines/Natural Boundaries [cite: 24]</li>
                  <li>Above ground services [cite: 25]</li>
                  <li>Sewer locations and inverts [cite: 26]</li>
                  <li>Adjacent lot buildings [cite: 27]</li>
                  <li>Grades at Lot corners and adjacent lots (~5m offset) [cite: 28]</li>
                </ul>

                <div className="aspect-video bg-brand-dark flex items-center justify-center border border-white/10 my-6 text-white/50 italic rounded-md shadow-lg">
                  [Image Placeholder: Topographic Survey] [cite: 29]
                </div>

                <h3 className="text-xl text-brand-green font-medium mt-8 mb-3">B. The Boundary Retracement Survey</h3>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  A boundary retracement survey that re-establishes the original boundaries of the subject lot(s) that are proposed to be subdivided. [cite: 30] This is required to produce a proposed subdivision plan that depicts the proposed dimensions and lot areas of the parcels resulting from the subdivision. [cite: 31]
                </p>

                <div className="aspect-video bg-brand-dark flex items-center justify-center border border-white/10 my-6 text-white/50 italic rounded-md shadow-lg">
                  [Image Placeholder: Boundary Retracement Survey] [cite: 32]
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">3. Preparation of a preliminary application to subdivide [cite: 33]</h2>
                <GeoDirectAnswer question="What documents are included in a preliminary application to subdivide in BC?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    A preliminary application to subdivide is prepared and submitted to the municipality that includes: [cite: 33]
                  </p>
                </GeoDirectAnswer>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>Topographic Plan of the Subject Lot(s). [cite: 34]</li>
                  <li>Current Title Search [cite: 35]</li>
                  <li>Copies of any existing charges, liens or notices on the titles of the lot(s) proposed to be subdivided. [cite: 36]</li>
                  <li>The proposed subdivision plan depicting: [cite: 37] Property Dimensions of the Subject Lot [cite: 38], and Dimensions and Areas of the Proposed Lots. [cite: 39]</li>
                </ul>
                <div className="bg-brand-dark/50 border-l-4 border-brand-green p-4 mb-4 text-white/80 font-light text-sm">
                  <strong>Note:</strong> Proposed Subdivision plan and Topographic Survey Plan can often be combined. [cite: 40]
                </div>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  Other applications, such as Development Variance Permits, Development Permits and Re-zoning may also be required. [cite: 41] The requirements for subdivision applications vary by municipality. [cite: 42]
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">4. Preliminary Application Municipal Review [cite: 49]</h2>
                <GeoDirectAnswer question="Who reviews the preliminary subdivision application at the municipal level?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    The preliminary application is reviewed by the municipal approving officer, the planning department, the engineering department, and any other department deemed necessary. [cite: 49]
                  </p>
                </GeoDirectAnswer>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  The approving officer must consider a wide range of factors when reviewing a preliminary subdivision application, such as: [cite: 49]
                </p>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>Proposed road access to the subdivision. [cite: 50]</li>
                  <li>Proposed land use of the subdivision. [cite: 51]</li>
                  <li>Proposed shape and size of the subdivided parcels. [cite: 52]</li>
                  <li>Adverse physical effects the proposed subdivision may have on adjacent lots. [cite: 53]</li>
                  <li>Utility servicing to the proposed lots. [cite: 54]</li>
                  <li>Lands required for proposed parks and proposed municipal roads. [cite: 55]</li>
                  <li>Development cost charges associated with the proposed subdivision. [cite: 56]</li>
                  <li>Amenity cost charges associated with the proposed subdivision. [cite: 57]</li>
                  <li>Approvals from other government agencies. [cite: 58]</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">5. Issuance of a Conditional Letter [cite: 59]</h2>
                <GeoDirectAnswer question="What is a conditional letter in the BC subdivision process?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    If the approving officer gives tentative approval, a letter outlining the conditions of the subdivision is issued. [cite: 59]
                  </p>
                </GeoDirectAnswer>
                <p className="text-white/80 font-light leading-relaxed mb-4">The conditions may include: [cite: 60]</p>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>Registration of Charges on title (i.e. Restrictive Covenants, Easements, Rights of Way) and the Preparation of Charge Plans for registration in the Land Title Office. [cite: 61]</li>
                  <li>Park Dedications and the preparation of Park Dedication Plans for registration in the Land Title Office. [cite: 62]</li>
                  <li>Road Dedications and the preparation of Road Dedication Plans for registration in the Land Title Office. [cite: 63]</li>
                  <li>Road Closures and the preparation of Road Closure Plans for registration in the Land Title Office. [cite: 64]</li>
                  <li>Development and amenity cost charges. [cite: 65]</li>
                  <li>Utility Servicing Agreements. [cite: 66]</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">6. Subdivision Field Survey [cite: 67]</h2>
                <GeoDirectAnswer question="What does a subdivision field survey entail?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    A field survey is conducted that consists of setting new legal survey monuments at every corner and point of curvature that defines: [cite: 67]
                  </p>
                </GeoDirectAnswer>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>The extent of each subdivided lot. [cite: 68]</li>
                  <li>The extent of each road dedication. [cite: 69]</li>
                  <li>The extent of each park dedication. [cite: 70]</li>
                  <li>The extent of all charges (unless an explanatory plan is acceptable). [cite: 71]</li>
                </ul>

                <div className="aspect-video bg-brand-dark flex items-center justify-center border border-white/10 my-6 text-white/50 italic rounded-md shadow-lg">
                  [Image Placeholder: Subdivision Field Survey] [cite: 72]
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">7. Legal Plan Preparation [cite: 73]</h2>
                <GeoDirectAnswer question="What factors influence the preparation of legal plans for a subdivision in BC?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    Following the field survey, the required plans are prepared for registration in the Land Title Office. [cite: 73] The preparation of plans is influenced by the following factors: [cite: 74]
                  </p>
                </GeoDirectAnswer>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4 mb-6">
                  <li>Is a municipal approving officer required to certify the plan? [cite: 75]</li>
                  <li>Are the extent of charges defined by a reference plan or an explanatory plan? [cite: 76]</li>
                  <li>Can multiple plans (e.g. subdivision and road dedication) be combined into a single subdivision plan? [cite: 77]</li>
                </ul>

                <p className="text-white/80 font-light leading-relaxed mb-4">
                  The following table explains the factors that influence the preparation of plans: [cite: 78] [cite: 79]
                </p>

                <div className="overflow-x-auto border border-white/10 rounded-lg">
                  <table className="min-w-full text-left text-sm font-light text-white/80">
                    <thead className="border-b border-white/10 bg-brand-dark">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-medium">Type of Plan</th>
                        <th scope="col" className="px-6 py-4 font-medium">LTA Section</th>
                        <th scope="col" className="px-6 py-4 font-medium">Approving Officer Certification?</th>
                        <th scope="col" className="px-6 py-4 font-medium">Combined with Sub. Plan?</th>
                        <th scope="col" className="px-6 py-4 font-medium">Field Survey Required?</th>
                        <th scope="col" className="px-6 py-4 font-medium">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Subdivision Plan</td>
                        <td className="whitespace-nowrap px-6 py-4">67</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Not Applicable</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/subdivision.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Consolidation Plan</td>
                        <td className="whitespace-nowrap px-6 py-4">100 (1) (b)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/consolidation.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Road Dedication Plan</td>
                        <td className="whitespace-nowrap px-6 py-4">107</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/road_dedication.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Park Dedication Plan</td>
                        <td className="whitespace-nowrap px-6 py-4">107</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/park_dedication.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Reference Plan for Easement</td>
                        <td className="whitespace-nowrap px-6 py-4">99 (1) (e)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/reference_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Reference Plan for Covenant</td>
                        <td className="whitespace-nowrap px-6 py-4">99 (1) (e)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/reference_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Statutory Right of Way Plan</td>
                        <td className="whitespace-nowrap px-6 py-4">113</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">Yes</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/srw_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Explanatory Plan for Easement</td>
                        <td className="whitespace-nowrap px-6 py-4">99 (1) (e)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/explanatory_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Explanatory Plan for Covenant</td>
                        <td className="whitespace-nowrap px-6 py-4">99 (1) (e)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/explanatory_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">Explanatory Plan of SRW</td>
                        <td className="whitespace-nowrap px-6 py-4">99 (1) (e)</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4">No</td>
                        <td className="whitespace-nowrap px-6 py-4"><a href="/docs/explanatory_plan.pdf" className="text-brand-green hover:underline">Link</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">8. Approving Officer Review and Certification [cite: 80]</h2>
                <GeoDirectAnswer question="What is the role of the municipal approving officer before title registration?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    All plans, including those not requiring the approving officer’s certification, are submitted to the approving officer for review to demonstrate satisfying the requirements to subdivide outlined in the conditional letter issued by the municipality. [cite: 80]
                  </p>
                </GeoDirectAnswer>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  Once all conditions required to proceed with subdivision have been met, the approving officer certifies the plans as necessary. [cite: 80]
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">9. Registrar of Land Title’s Review and Registration of Titles [cite: 81]</h2>
                <GeoDirectAnswer question="How are new titles registered following a subdivision in BC?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    The proponent coordinates with the approving officer, the BC Land Surveyor and their legal representation to submit the plans to the Land Title Office. [cite: 81] The registrar of land titles reviews the subdivision application, including all plans and documents prepared on behalf of the proponent. [cite: 81]
                  </p>
                </GeoDirectAnswer>
                <p className="text-white/80 font-light leading-relaxed mb-4">
                  Once the registrar is satisfied that the boundaries of the lands are sufficiently defined by the description in submitted plans and documents, and that good safe holding and marketable title in fee simple has been established by the proponent, titles to the new lots are registered in the land title Register. [cite: 82]
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">10. Additional Considerations [cite: 97]</h2>
                <GeoDirectAnswer question="What additional factors can introduce complexity to a BC subdivision?">
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    There are several important considerations that can introduce significant complexity to the subdivision process described above, such as: [cite: 98]
                  </p>
                </GeoDirectAnswer>
                <ul className="list-disc list-inside text-white/80 font-light leading-relaxed space-y-2 ml-4">
                  <li>Is the lot within an agricultural land reserve (ALR)? [cite: 99]</li>
                  <li>Does the lot have a natural boundary? [cite: 100]</li>
                  <li>Does the lot currently have road access? [cite: 101]</li>
                  <li>Was the lot previously used for a commercial or industrial purpose that falls under the contaminated sites regulations? [cite: 102]</li>
                </ul>
              </div>

              {/* Mobile / Bottom Panel Mirror */}
              <div className="lg:hidden mt-16 border-t border-brand-green/30 pt-12">
                <ReferenceContent />
              </div>

            </div>

            {/* Right Column: Sticky Side Panel */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="sticky top-32 h-fit">
                <ReferenceContent />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-green/15 via-brand-black to-brand-black border-t border-brand-green/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-green/50 bg-brand-dark mb-6">
            <MapPin className="w-7 h-7 text-brand-green" aria-hidden />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            Ready to Begin Your Project?
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Contact Tantalus Geomatics to discuss the feasibility and survey requirements for your property subdivision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              to="/contact/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg"
            >
              Contact Us Today
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

    </PageShell>
  );
}