import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ClipboardList, MapPinned, FileCheck, Phone } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

const CANONICAL = 'https://www.tantalusgeomatics.com/topographic-surveys';

const problems = [
  {
    problem: 'Permit Applications and Approvals',
    description: 'Site Plans and Topographic Surveys are standard requirements for municipalbuilding permits, subdivision applications, development permits and variance applications.',
  },
  {
    problem: 'Architecture and Engineering Design',
    description: 'Architects and Engineers rely on accurate topographic data for building design, site servicing plans, geotechnical design, and more.',
  },
  {
    problem: 'Protection of Natural Assets',
    description: 'A topographic survey depicts the locations of significant trees, watercourses and areas of steep slopes that may require protection throughout the land development process.',
  },
];

export default function TopographicSurveys() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The First Step to Building: Topographic Surveys Explained',
    description:
      'How topographic surveys support BC building permits, design, and geodetic elevations for residential homeowners.',
    url: CANONICAL,
  };

  return (
    <PageShell>
      <SEO
        title="The First Step to Building: Topographic Surveys Explained"
        description="Why a topographic survey is the digital foundation for your architect, engineer, and municipal permit—geodetic elevations, utility inverts, and BC Land Surveyor liability."
        keywords="topographic survey BC, building permit survey, BCLS topographic, geodetic elevation, residential survey Squamish"
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/Squamish-Garibaldi-Estates-Property-Survey.webp"
            alt="Topographic Survey"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            Land Development in the Sea to Sky Corridor
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Develop Your Property with Confidence.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Building or renovating a home in British Columbia involves a complex intersections of legal, permitting, environmental, and engineering requirements. A topographic survey translates the physical reality of your land into the data required by your architect, engineer, and the city..
          </p>
            <div className="flex justify-center px-4 sm:px-0">
              <a
                href="tel:6042139934"
                className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call for a free quote
              </a>
            </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">Draft a blueprint for success with a BC Land Surveyor certified topographic survey.</blockquote>
          <p className="text-white/65 font-light mb-10 max-w-3xl">
            Land use planning, design and development requires up-to-date and accurate data. A BC Land Surveyor's Topographic survey and site plan is critical for:
          </p>
          <div className="space-y-6">
            {problems.map((item) => (
              <div
                key={item.problem}
                className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)]"
              >
                <p className="text-brand-green font-medium mb-2">
                  {item.problem}
                </p>
                <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg shadow-brand-green/15"
            >
              Contact Us Today to Design with Confidence
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

{/* 3-step process */}
<section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            Our land survey process
          </h2>
          <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
            Conducting a Topographic Survey is a technical process that combines various legal, environmental, and engineering requirements. We follow a standard professional sequence to ensure all the necessary details are efficiently captured to support your project as it moves forward.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Research',
                body: "Every survey begins with a review of the existing records and the regulatory requirements that affect your project. We pull the original land titles and survey plans from the Land Title and Survey Authority of BC (LTSA), in addition to studying up to date satellite imagery and municipal Geospatial Information Systems. This allows us to confirm the context of your lot and the surrounding properties before we arrive on-site.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'Field visit',
                body: 'Once we have the data, our crew visits your property to perform a field survey. We search for original iron pins and use professional-grade equipment to take precise measurements to accurately capture all the necessary site features. Our use of modern technologies, such as robotic total stations, drones and laser scanners allows us to efficiently survey large tracts of land.',
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
                className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                  Step {step}
                </span>
                <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
                <p className="text-white/65 font-light leading-relaxed text-sm sm:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* FIX: Moved inside the max-w-7xl container and added mt-12 */}
          <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
            <div className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)]">
              <p className="text-brand-green font-medium mb-2">
                We Provide a Range of Datasets to Support Your Design Needs
              </p>
              <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
                In addition to a certified topographic survey or site plan in PDF format, we also offer a range of data product deliverables including CAD files, point clouds, digital terrain models and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-video flex items-center justify-center">
            <img alt="Site Plan Overview" class="object-cover h-full w-full border border-white/10 duration-500" referrerpolicy="no-referrer" src="images/reality-capture.webp"/>
          </div>
        </div>
      </section>
      
      {/* Case Study Section */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-3">
              Real World Example
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
              Case Study: Building a Home in the District of Squamish
            </h2>
            <p className="text-white/65 font-light leading-relaxed">
              Constructing a new home in the District of Squamish involves more than concrete and framing. Site design and servicing requirements, municipal bylaws and restrictive covenants on title all create a complex set of data and permitting requirements.
            </p>
          </div>

          {/* Three Things to Consider Box */}
          <div className="max-w-4xl mx-auto rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)] mb-12 md:mb-16">
            <h3 className="text-brand-green font-medium mb-4 text-lg">Three things to consider:</h3>
            <ol className="list-decimal list-inside text-white/80 font-light leading-relaxed space-y-3">
              <li>What are the data needs of my engineers and architect?</li>
              <li>Am I located in a development permit area?</li>
              <li>Have I checked my property title for any restrictive covenants that prohibit constructing my proposed design?</li>
            </ol>
          </div>

          <p className="text-center text-white/80 font-light max-w-2xl mx-auto mb-12 md:mb-16 text-lg">
            Tantalus Geomatics Land Surveying can help guide you navigate this process with our three step process:
          </p>

          {/* Case Study 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Step 1 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <ClipboardList className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 1
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Research</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
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
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <MapPinned className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 2
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Field Visit</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>We first search for sufficient property corner posts to accurately locate your parcel's boundaries.</li>
                <li>Next, we use high precision instruments, such as robotic total stations, rtk gps receivers, drones and laser scanners to accurately survey all the necessary topographic and site features.</li>
                <li>Finally, we use high accuracy GPS receivers and existing monuments to ensure your project's elevations are related to the official geodetic datum specified by the District of Squamish.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <FileCheck className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 3
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Certified Survey Plan</h3>
              <p className="text-left text-white/80 font-light text-sm sm:text-base mb-4 w-full">
                A site survey or topographic survey may result in the preparation of one or more deliverables, depending on your needs:
              </p>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li><strong className="text-white/90 font-medium">Certified site plan or topographic plan:</strong> A certified plan that depicts the locations of the site's current topography and constructed features relative to your property lines.</li>
                <li><strong className="text-white/90 font-medium">CAD File:</strong> A digital drawing format common among architecture, engineering and construction professionals.</li>
                <li><strong className="text-white/90 font-medium">Point Cloud:</strong> A file containing the XYZ locations of points. These can be a spare or dense representation of the site, depending on the field survey methods.</li>
              </ul>
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
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Ready to start your project with confidence?
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Tantalus Geomatics provides the local expertise and BCLS certification required for projects in the Sea-to-Sky corridor. Tell us about your property so we can help you move forward with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg"
            >
              Request a Professional Consultation
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/90 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View A Full List of Our Services
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
