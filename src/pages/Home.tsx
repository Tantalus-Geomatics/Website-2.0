import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  WavesLadder,
  Hammer,
  ArrowRight,
  Home as HomeIcon,
  Trees,
  Waves,
  Scale,
  FileText,
  Building,
  Fence,
  BrickWall,
  Phone,
} from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';
import { useLeadForm } from '../hooks/useLeadForm';
import { SERVICE_CATEGORIES } from '../config/servicesStructure';

export default function Home() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const lead = useLeadForm();

  const useCases = [
    {
      title: "Property Line Surveys",
      icon: <Fence className="w-6 h-6" />,
      content: "Many homeowners discover their existing fences are misaligned with their legal property lines once a formal survey is conducted. A BCLS-certified survey is the only way to definitively establish your boundaries and replace property corners before you invest in new fencing.",
      image: "/images/squamish-property-line.webp"
    },
    {
      title: "Design and Construction",
      icon: <Hammer className="w-6 h-6" />,
      content: "Municipalities require BCLS-certified topographic surveys to verify that proposed designs comply with site coverage and setback zoning bylaws. These surveys provide the foundational data architects and designers need to align their plans with the physical and legal constraints of the site.",
      image: "/images/adu.webp"
    },
    {
      title: "Retaining Walls",
      icon: <BrickWall className="w-6 h-6" />,
      content: "Municipalities require a BCLS survey to ensure retaining walls don't encroach onto neighbouring properties and to ensure they conform to local bylaws.",
      image: "/images/squamish-retaining-wall-survey.webp"
    },
    {
      title: "Deck and Pool Permits",
      icon: <WavesLadder className="w-6 h-6" />,
      content: "Municipalities require a site plan prepared by a BC Land Surveyor to confirm that new decks, pools, or accessory buildings meet the \"site coverage\" and \"setback\" requirements of the zoning bylaw.",
      image: "/images/deck-pool.webp"
    },
    {
      title: "Real Estate Transactions",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "A Building Location Certificate confirms that all existing structures are situated within the legal property boundaries and comply with municipal regulations. For those purchasing older homes, this survey is an essential safeguard against the risks of undocumented encroachments and zoning non-compliance.",
      image: "/images/old-home.webp"
    },
    {
      title: "Strata Developments",
      icon: <Building className="w-6 h-6" />,
      content: "Developing multi-unit housing or duplexes requires a BCLS-certified strata plan to define individual strata lot boundaries and common property. Tantalus Geomatics provides the precise measurements and documentation needed to successfully register your project at the Land Title Office.",
      image: "/images/strata.webp"
    },
    {
      title: "Tree Removal",
      icon: <Trees className="w-6 h-6" />,
      content: "Municipal tree bylaws and \"Restricted Covenant Areas\" often limit or restrict tree removal. A BCLS identifies these zones on the ground so owners don't face large fines for unlawful tree removal.",
      image: "/images/squamish-tree-survey.webp"
    },
    {
      title: "Mortgage Refinancing",
      icon: <FileText className="w-6 h-6" />,
      content: "Lenders often require a recent Building Location Certificate to confirm all structures on the property conform to municipal bylaws and to determine the total lot area prior to approving a new loan or line of credit.",
      image: "/images/Squamish-Garibaldi-Estates-Property-Survey.webp"
    },
    {
      title: "Natural Boundary Identification",
      icon: <Waves className="w-6 h-6" />,
      content: "Owners of properties adjacent to a body of water need a BCLS to determine the location of the \"Present Natural Boundary\" for dock applications or to verify the impact of erosion on their extent of ownership.",
      image: "/images/natural-boundary.webp"
    },
    {
      title: "Expert Witness",
      icon: <Scale className="w-6 h-6" />,
      content: "If a neighbor dispute escalate to court, a BCLS is often called as an expert witness. Their plans and testimony are used as evidence the courts to settle boundary and encroachment cases.",
      image: "/images/expert-witness.webp"
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://tantalusgeomatics.com/#organization",
    "name": "Tantalus Geomatics Land Surveying Ltd.",
    "identifier": [
      {
        "@type": "PropertyValue",
        "name": "Association of BC Land Surveyors Corporate Permit Number",
        "propertyID": "ABCLS Corporate Permit #",
        "value": "1046" 
      }
    ],
    "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
    "url": "https://www.tantalusgeomatics.com",
    "telephone": "+16042139934",
    "email": "contact@tantalusgeomatics.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Squamish",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.7016", 
      "longitude": "-123.1558"
    },
    "areaServed": [
      "Squamish", "Whistler", "Pemberton", "Lillooet",
      "North Vancouver", "West Vancouver", "Bowen Island",
      "Gibsons", "Sechelt", "Furry Creek", "Britannia Beach", "Powell River"
    ],
    "description": "Professional BCLS Land Surveying and Geomatics Engineering supporting residential and commercial projects throughout the Sea to Sky corridor.",
    "sameAs": [
      "https://www.linkedin.com/company/tantalus-geomatics"
    ],
    "employee": {
      "@type": "Person",
      "name": "Dennis Sherman",
      "jobTitle": "British Columbia Land Surveyor and Professional Engineer",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Lassonde School of Engineering, York University"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "BCLS Commission #1104"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "EGBC Registration #57741"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "ABCLS Corporate Permit #1046"
        }
      ]
    }
  };

  return (
    <div className="flex flex-col bg-brand-black">
      <SEO 
        title="BC Land Surveyor in Squamish, Whistler & Sea to Sky"
        description="Hire a professional BC Land Surveyor (BCLS) for topographic surveys, legal boundaries, construction surveys and drone surveys in Squamish, Whistler, and Pemberton."
        canonicalUrl="https://tantalusgeomatics.com/"
        schema={homeSchema}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-12 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            width={1200}
            height={800}
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>
        
        <div className="relative z-10 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTA */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                Professional <br className="hidden lg:block"/>
                <span className="text-brand-green font-medium"> BC Land Surveyors</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed drop-shadow-md">
                Servicing British Columbia across the Sea to Sky Corridor, Vancouver's North Shore, and the Sunshine Coast.
              </p>
              <div className="flex justify-start">
                <a
                  href="tel:6042139934"
                  className="w-full sm:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-all flex items-center justify-center gap-2 rounded-full"
                >
                  <Phone size={20} />
                  Call for quote
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-brand-dark p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl w-full max-w-xl mx-auto lg:ml-auto lg:mr-0">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Interactive Use Cases Section */}
      <section className="py-20 md:py-32 bg-white border-b-2 border-brand-green relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-6">When Do I Need a Land Surveyor?</h2>
            <p className="text-lg sm:text-xl text-slate-700 font-light max-w-2xl mx-auto">
              Explore common scenarios where a land survey is required. <Link to="/faq/" className="text-brand-green-dark hover:underline">Read our FAQ</Link> for more details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-stone-100 border-2 border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveUseCase(activeUseCase === index ? -1 : index)}
                    className={`w-full text-left px-5 py-4 flex items-center justify-between ${activeUseCase === index ? 'bg-brand-green text-black' : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${activeUseCase === index ? 'text-black' : 'text-brand-green'}`}>
                        {useCase.icon}
                      </div>
                      <span className="font-medium text-base sm:text-lg pr-4">
                        {useCase.title}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 shrink-0 transition-transform ${activeUseCase === index ? 'rotate-90 text-black' : 'text-slate-500'}`} />
                  </button>
                  {activeUseCase === index && (
                    <div className="p-5 sm:p-6 bg-stone-100 border-t-2 border-slate-200">
                      <img 
                        src={useCase.image} 
                        alt={useCase.title}
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-40 sm:h-48 object-cover rounded-xl mb-5 grayscale-35"
                      />
                      <p className="text-slate-700 font-light leading-relaxed text-sm sm:text-base">
                        {useCase.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Interactive List */}
            <div className="hidden lg:block lg:col-span-5 space-y-2">
              {useCases.map((useCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`w-full text-left px-6 py-5 rounded-2xl transition-all flex items-center justify-between group ${
                    activeUseCase === index 
                      ? 'bg-brand-green text-black shadow-lg shadow-brand-green/20 border-2 border-brand-green' 
                      : 'bg-stone-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-2 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors ${activeUseCase === index ? 'text-black' : 'text-brand-green group-hover:text-brand-green-dark'}`}>
                      {useCase.icon}
                    </div>
                    <span className={`font-medium text-lg ${activeUseCase === index ? 'text-black' : ''}`}>
                      {useCase.title}
                    </span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${activeUseCase === index ? 'translate-x-1 text-black' : 'text-slate-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
            </div>

            {/* Desktop Dynamic Display */}
            <div className="hidden lg:block lg:col-span-7">
              <div className="sticky top-32">
                <div className="bg-stone-100 rounded-3xl border-2 border-slate-200 overflow-hidden shadow-2xl">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={useCases[activeUseCase === -1 ? 0 : activeUseCase].image} 
                      alt={useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                      width={800}
                      height={450}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-100 transition-opacity grayscale-35 duration-500"
                      key={useCases[activeUseCase === -1 ? 0 : activeUseCase].image}
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-100/50 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-12 relative -mt-20 z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green text-black mb-6 shadow-xl">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].icon}
                    </div>
                    <h3 className="text-3xl font-light text-slate-900 mb-6">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                    </h3>
                    <p className="text-xl text-slate-700 font-light leading-relaxed">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">Our Core Services</h2>
            <GeoDirectAnswer
              align="center"
              question="What core land surveying services does Tantalus Geomatics offer from project conception through completion?"
            >
              <div className="text-lg text-slate-700 max-w-2xl mx-auto font-light">
                Supporting your projects from conception to completion.
              </div>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/services/#${category.id}`}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="mb-4">
                    <div className="bg-brand-green/10 text-brand-green-dark p-3 rounded-xl inline-block">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">
                    {category.title}
                  </h3>
                  <p className="text-slate-700 font-light text-sm leading-relaxed">
                    {category.homeDescription}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight">
               Why Professional Certification Matters in<br className="hidden sm:block" />
                <span className="text-brand-green font-medium">British Columbia</span>
              </h2>
              <GeoDirectAnswer question="Why should you engage a commissioned British Columbia Land Surveyor to protect your property rights?">
                <div className="text-base sm:text-lg text-slate-700 mb-8 font-light leading-relaxed">
                  Protect your property rights by engaging a commissioned British Columbia Land Surveyor. This ensures your project meets rigorous technical standards and carries the legal authority necessary for municipal and provincial compliance.
                </div>
              </GeoDirectAnswer>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3 text-slate-700 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-medium">Legal Boundary Authority:</strong> Only a licensed Land Surveyor has the legal authority to define property lines and set permanent boundary markers. Non-licensed individuals are not legally permitted to verify property limits, and their work lacks standing in the event of a boundary dispute or encroachment claim.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-medium">Professional Indemnity & Accountability:</strong> Licensed surveyors are governed by a strict code of professional ethics and carry mandatory professional liability insurance. This oversight provides a layer of protection for your investment that non-licensed service providers cannot offer.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-medium">Regulatory Acceptance:</strong> Municipalities, financial institutions, and the Land Title Office only accept survey plans that carry the official seal of a BCLS. Using an unlicensed provider often results in rejected permit applications and significant delays when legal documentation is required.
                  </div>
                </li>
              </ul>
              <Link
                to="/about/"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-green text-slate-900 font-semibold hover:bg-brand-green/10 transition-colors rounded-full"
              >
                About Our Team
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/Garibaldi-Highland-Road-Survey.webp"
                alt="Garibaldi Highland Road Survey"
                width={400}
                height={300}
                loading="lazy"
                className="object-cover h-full w-full border-2 border-slate-200 grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="grid grid-rows-2 gap-4">
                <img
                  src="/images/spea-rar.webp"
                  alt="SPEA and RAR"
                  width={400}
                  height={150}
                  loading="lazy"
                  className="object-cover h-full w-full border-2 border-slate-200 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/images/Squamish-Garibaldi-Estates-Property-Survey.webp"
                  alt="Garibaldi Estates Property Survey"
                  width={400}
                  height={150}
                  loading="lazy"
                  className="object-cover h-full w-full border-2 border-slate-200 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}