import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ClipboardList, MapPinned, FileCheck, Phone } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';

const CANONICAL = 'https://www.tantalusgeomatics.com/topographic-surveys/';

const problems = [
  {
    problem: 'Permit Applications and Approvals',
    description: 'Site Plans and Topographic Surveys are standard requirements for municipal building permits, subdivision applications, development permit applications and variance permit applications.',
  },
  {
    problem: 'Architecture and Engineering Design',
    description: 'Architects and Engineers rely on accurate topographic data for building design, site servicing plans, flood hazard mitigation, environmental assessments and geotechnical designs.',
  },
  {
    problem: 'Protection of Natural Assets',
    description: 'A topographic survey depicts the locations of significant trees, watercourses, steep slopes and areas under strict environmental regulation that may require protection throughout the land development process.',
  },
];

export default function TopographicSurveys() {
  // Advanced Service Schema mapped to your local area
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${CANONICAL}/#webpage`,
    'url': CANONICAL,
    'name': 'The First Step to Building: Topographic Surveys Explained | Tantalus Geomatics',
    'description': 'How topographic surveys support permit applications, site designs, and regulatory compliance throughout British Columbia.',
    'isPartOf': {
      '@id': 'https://tantalusgeomatics.com/#website'
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
          'name': 'Topographic Surveys',
          'item': 'https://tantalusgeomatics.com/topographic-surveys/'
        }
      ]
    },
    'mainEntity': {
      '@type': 'Service',
      'name': 'Topographic Surveys & Site Plans',
      'serviceType': 'Land Surveying',
      'provider': {
        '@id': 'https://tantalusgeomatics.com/#organization'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Squamish' },
        { '@type': 'City', 'name': 'Whistler' },
        { '@type': 'City', 'name': 'Pemberton' },
        { '@type': 'City', 'name': 'Lillooet' },
        { '@type': 'City', 'name': 'West Vancouver' },
        { '@type': 'City', 'name': 'Bowen Island' },
        { '@type': 'City', 'name': 'Britannia Beach' },
        { '@type': 'City', 'name': 'Furry Creek' },
        { '@type': 'City', 'name': 'North Vancouver' }
      ]
    }
  };
  
  return (
    <PageShell>
      <SEO
        title="The First Step to Building: Topographic Surveys Explained | Tantalus Geomatics"
        description="Why a topographic survey is the digital blueprint for your design. We work with other professionals and municipal officials to guide you through the construction proccess with ease."
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 flex flex-col justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Squamish-Garibaldi-Estates-Property-Survey.webp"
            alt="Topographic Survey"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            Land Development in British Columbia
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Develop Your Property with Confidence.
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
            Building a home in British Columbia involves a complex intersections of legal, permitting, environmental, and engineering requirements. A topographic survey translates the physical reality of your land into the data required by your architect, engineer, and the city.
          </p>
            <div className="flex justify-center px-4 sm:px-0">
              <a
                href="tel:6042139934"
                className="w-full sm:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-all flex items-center justify-center gap-2 rounded-full"
              >
                <Phone size={20} />
                Call for a free quote
              </a>
            </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-b-2 border-brand-green">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GeoDirectAnswer
            question="What is included in a Tantalus Geomatics Topographic Survey?"
            questionClassName="max-w-3xl"
          >
            <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-slate-900 font-light text-lg italic">A BC Land Surveyor certified topographic survey satisfies the permitting and design requirements to move your project forward.</blockquote>
            <p className="text-slate-700 font-light mb-10 max-w-3xl">
              Land use planning, design and development requires up-to-date and accurate data. A BC Land Surveyor's topographic survey and site plan is critical for:
            </p>
          </GeoDirectAnswer>
          <div className="space-y-6">
            {problems.map((item) => (
              <div
                key={item.problem}
                className="rounded-2xl border border-slate-200 bg-stone-100 p-6 md:p-8 shadow-sm"
              >
                <p className="text-brand-green-dark font-semibold mb-2 text-lg sm:text-xl">
                  {item.problem}
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200 pt-4 mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg rounded-full"
            >
              Contact Us Today to Design with Confidence
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

{/* 3-step process */}
<section className="py-16 md:py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 text-center mb-4">
            Our land survey process
          </h2>
          <GeoDirectAnswer
            align="center"
            question="How does Tantalus Geomatics Land Surveying conduct a topographic survey?"
          >
            <p className="text-center text-slate-700 font-light max-w-2xl mx-auto mb-12 md:mb-16">
              Conducting a Topographic Survey is a technical process that combines legal, environmental, and engineering requirements. We follow a standard professional process to ensure all the necessary details are efficiently captured to move your project forward.
            </p>
          </GeoDirectAnswer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Consultation and Research',
                body: "Contact us with your property details. We research existing survey and land title records, in addition to the regulatory requirements that affect your project. We pull the original land titles and survey plans from the Land Title and Survey Authority of BC (LTSA), in addition to studying up to date satellite imagery and municipal Geospatial Information Systems. This allows us to confirm the context of your lot and the surrounding properties before we arrive on-site.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'Field visit',
                body: 'Our crew visits your property to perform a field survey. We search for original property corner posts and use professional-grade equipment to take precise measurements that accurately capture all the necessary site features. Our use of modern technologies, such as robotic total stations, GPS, drones and laser scanners allows us to efficiently survey large tracts of land.',
                icon: MapPinned,
              },
              {
                step: '3',
                title: 'Certified survey plan',
                body: 'After the field work, we process the data and draft a topographic survey plan or a site plan to satisfy your permitting and design requirements. This document is signed and sealed by a British Columbia Land Surveyor (BCLS). This is the official survey document you will need for your permit submission and technical design needs.',
                icon: FileCheck,
              },
            ].map(({ step, title, body, icon: Icon }) => (
              <div
                key={step}
                className="bg-stone-100 border border-slate-200 p-8 flex flex-col items-center text-center rounded-2xl shadow-sm"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green/40 bg-white text-brand-green">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                  Step {step}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* FIX: Moved inside the max-w-7xl container and added mt-12 */}
          <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
            <GeoDirectAnswer
              question="What types of datasets are offered for a topographic survey or a site plan?"
              questionClassName="max-w-3xl mx-auto text-center"
              align="center"
            >
              <div className="rounded-2xl border border-slate-200 bg-stone-100 p-6 md:p-8 shadow-sm">
                <p className="text-brand-green-dark font-semibold mb-2 text-lg sm:text-xl">
                  We Provide a Range of Datasets to Support Your Design Needs
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200 pt-4 mt-4">
                  In addition to a certified topographic survey or site plan in PDF format, we also offer a range of data product deliverables including CAD DWG files, point clouds, digital terrain models and more.
                </p>
              </div>
            </GeoDirectAnswer>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="py-10 bg-white border-b-2 border-brand-green">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-2 border-slate-200 bg-stone-100 aspect-video flex items-center justify-center">
            <img alt="Site Plan Overview" className="object-cover h-full w-full border-2 border-slate-200 duration-500" referrerPolicy="no-referrer" src="/images/reality-capture.webp"/>
          </div>
        </div>
      </section>
      
      {/* Case Study Section */}
      <section className="py-16 md:py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-3">
              Real World Example
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-6">
              Case Study: Building a Home in the District of Squamish
            </h2>
            <GeoDirectAnswer
              align="center"
              question="What steps are required to construct a new home in the District of Squamish?"
            >
              <p className="text-slate-700 font-light leading-relaxed">
                Constructing a new home in the District of Squamish involves navigating permit applications, strict site design and servicing requirements, municipal bylaws and restrictive covenants. Prior to any construction, a topographic survey or site plan forms a necessary foundation for permit applications, identifying land use restrictions, and developing compliant designs.
              </p>
            </GeoDirectAnswer>
          </div>

          {/* Three Things to Consider Box */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-stone-100 p-6 md:p-8 shadow-sm mb-12 md:mb-16">
            <h3 className="text-slate-900 font-semibold mb-4 text-lg sm:text-xl">
              What three questions should you ask before building in the District of Squamish?
            </h3>
            <ol className="list-decimal list-inside text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
              <li>What are the data needs of my engineers and architect?</li>
              <li>Am I located in a development permit area?</li>
              <li>Have I checked my property title for any restrictive covenants that prohibit constructing my proposed design?</li>
            </ol>
          </div>

          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 md:mb-16 text-base sm:text-lg">
            Tantalus Geomatics Land Surveying can help guide you navigate this process with our three step process:
          </p>

          {/* Case Study 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Step 1 */}
            <div className="bg-stone-100 border border-slate-200 p-8 flex flex-col items-center text-center rounded-2xl shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green/40 bg-white text-brand-green">
                <ClipboardList className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 1
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">Research</h3>
              <ul className="text-left text-slate-600 leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>Complete an initial consultation to confirm exactly what you are seeking to accomplish.</li>
                <li>Obtain property title, legal charge documents and relevant survey plans from the land title office.</li>
                <li>Confirm whether there are any restrictive covenants that would prohibit constructing the proposed design.</li>
                <li>Collect relevant records of visible and buried services.</li>
                <li>Correspond with your design team to confirm their data needs and any land use restrictions they have identified.</li>
                <li>
                  Confirm the District of Squamish land use bylaws and permitting requirements:
                  <div className="mt-3 flex flex-col gap-2">
                    <a 
                      href="https://squamish.ca/assets/BLDG/COMMERCIAL-BP-Document-Checklist-FEB-2022.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-green hover:text-brand-green-light transition-colors break-words underline underline-offset-2"
                    >
                      Commercial Building Permit Checklist
                    </a>
                    <a 
                      href="https://squamish.ca/assets/BLDG/RESIDENTIAL-BP-Document-Checklist-Revised-FEB-FILLABLE_2022.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-green hover:text-brand-green-light transition-colors break-words underline underline-offset-2"
                    >
                      Residential Building Permit Checklist
                    </a>
                  </div>
                </li>
                <li>Preparation of field reference data to ensure we capture everything necessary to move your project forward.</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-100 border border-slate-200 p-8 flex flex-col items-center text-center rounded-2xl shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green/40 bg-white text-brand-green">
                <MapPinned className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 2
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">Field Visit</h3>
              <ul className="text-left text-slate-600 leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>We first search for sufficient property corner posts to accurately locate your parcel's boundaries.</li>
                <li>Next, we use high precision instruments, such as robotic total stations, rtk gps receivers, drones and laser scanners to accurately survey all the necessary topographic and site features.</li>
                <li>Finally, we use high accuracy GPS receivers and existing monuments to ensure your project's elevations are related to the official geodetic datum specified by the District of Squamish.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-100 border border-slate-200 p-8 flex flex-col items-center text-center rounded-2xl shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green/40 bg-white text-brand-green">
                <FileCheck className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 3
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">Certified Survey Plan</h3>
              <p className="text-left text-slate-600 text-sm sm:text-base mb-4 w-full">
                A site survey or topographic survey may result in the preparation of one or more deliverables, depending on your needs:
              </p>
              <ul className="text-left text-slate-600 leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li><strong className="text-slate-900 font-medium">Certified site plan or topographic plan:</strong> A certified plan that depicts the locations of the site's current topography and constructed features relative to your property lines.</li>
                <li><strong className="text-slate-900 font-medium">CAD File:</strong> A digital drawing format common among architecture, engineering and construction professionals.</li>
                <li><strong className="text-slate-900 font-medium">Point Cloud:</strong> A file containing the XYZ locations of points. These can be a spare or dense representation of the site, depending on the field survey methods.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-white border-t-2 border-brand-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-200 bg-stone-100 mb-6">
            <MapPin className="w-7 h-7 text-brand-green" aria-hidden />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
            Ready to start your project with confidence?
          </h2>
          <p className="text-slate-700 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Tantalus Geomatics provides the local expertise and BCLS certification required for projects in the Sea-to-Sky corridor. Tell us about your property so we can help you move forward with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              to="/contact/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg rounded-full"
            >
              Request a Free Quote Today
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/residential/"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-100 transition-colors rounded-full"
            >
              View A Full List of Our Property Survey Services
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
