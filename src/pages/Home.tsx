import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  WavesLadder,
  Hammer,
  ArrowRight,
  Map,
  Compass,
  HardHat,
  Mountain,
  Home as HomeIcon,
  Trees,
  Waves,
  Scale,
  FileText,
  Building,
  Fence,
  BrickWall,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

export default function Home() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const lead = useLeadForm();

  const useCases = [
    {
      title: "Property Line Surveys",
      icon: <Fence className="w-6 h-6" />,
      content: "Many homeowners discover their existing fences are misaligned with their legal property lines once a formal survey is conducted. A BCLS-certified survey is the only way to definitively establish your boundaries and replace property corners before you invest in new fencing.",
      image: "images/squamish-property-line.webp"
    },
    {
      title: "Building Design and Construction Permitting",
      icon: <Hammer className="w-6 h-6" />,
      content: "Municipalities require BCLS-certified topographic surveys to verify that proposed designs comply with site coverage and setback zoning bylaws. These surveys provide the foundational data architects and designers need to align their plans with the physical and legal constraints of the site.",
      image: "images/adu.webp"
    },
    {
      title: "Retaining Wall Construction",
      icon: <BrickWall className="w-6 h-6" />,
      content: "Municipalities require a BCLS survey to ensure retaining walls don't encroach onto neighbouring properties and to ensure they conform to local bylaws.",
      image: "images/squamish-retaining-wall-survey.webp"
    },
    {
      title: "Deck and Pool Permits",
      icon: <WavesLadder className="w-6 h-6" />,
      content: "Municipalities require a site plan prepared by a BC Land Surveyor to confirm that new decks, pools, or accessory buildings meet the \"site coverage\" and \"setback\" requirements of the zoning bylaw.",
      image: "images/deck-pool.webp"
    },
    {
      title: "Purchasing an Older Home",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "A Building Location Certificate confirms that all existing structures are situated within the legal property boundaries and comply with municipal regulations. For those purchasing older homes, this survey is an essential safeguard against the risks of undocumented encroachments and zoning non-compliance.",
      image: "images/old-home.webp"
    },
    {
      title: "Strata Developments",
      icon: <Building className="w-6 h-6" />,
      content: "Developing multi-unit housing or duplexes requires a BCLS-certified strata plan to define individual strata lot boundaries and common property. Tantalus Geomatics provides the precise measurements and documentation needed to successfully register your project at the Land Title Office.",
      image: "images/strata.webp"
    },
    {
      title: "Tree Removal",
      icon: <Trees className="w-6 h-6" />,
      content: "Municipal tree bylaws and \"Restricted Covenant Areas\" often limit or restrict tree removal. A BCLS identifies these zones on the ground so owners don't face large fines for unlawful tree removal.",
      image: "images/squamish-tree-survey.webp"
    },
    {
      title: "Mortgage Refinancing",
      icon: <FileText className="w-6 h-6" />,
      content: "Lenders often require a recent Building Location Certificate to confirm all structures on the property conform to municipal bylaws and to determine the total lot area prior to approving a new loan or line of credit.",
      image: "images/Squamish-Garibaldi-Estates-Property-Survey.webp"
    },
    {
      title: "Natural Boundary Identification",
      icon: <Waves className="w-6 h-6" />,
      content: "Owners of properties adjacent to a body of water need a BCLS to determine the location of the \"Present Natural Boundary\" for dock applications or to verify the impact of erosion on their extent of ownership.",
      image: "images/natural-boundary.webp"
    },
    {
      title: "BC Land Surveyor: Your Expert Witness",
      icon: <Scale className="w-6 h-6" />,
      content: "If a neighbor dispute escalate to court, a BCLS is often called as an expert witness. Their plans and testimony are used as evidence the courts to settle boundary and encroachment cases.",
      image: "images/expert-witness.webp"
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://tantalusgeomatics.com/#organization",
    "name": "Tantalus Geomatics Land Surveying Ltd.",
    "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
    "url": "https://tantalusgeomatics.com",
    "telephone": "+1-604-213-9934",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Squamish", // Primary office location
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
      "West Vancouver", "Bowen Island", "Britannia Beach", 
      "Furry Creek", "North Vancouver"
    ],
    "description": "Professional BCLS Land Surveying and Geomatics Engineering supporting residential and commercial projects throughout the Sea to Sky corridor.",
    "sameAs": [
      "https://www.linkedin.com/company/tantalus-geomatics", // Add your social links here
      "https://www.instagram.com/tantalusgeomatics"
    ]
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
      <section className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTA */}
            <div className="text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
                Professional <br className="hidden lg:block"/>
                <span className="text-brand-green font-medium">Land Surveying</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 font-light leading-relaxed drop-shadow-md">
                Servicing British Columbia
              </p>
              <div className="flex justify-start">
                <a
                  href="tel:6042139934"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2 rounded-md"
                >
                  <Phone size={20} />
                  Call for quote
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-brand-black/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl w-full max-w-xl mx-auto lg:ml-auto lg:mr-0">
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
      <section className="py-20 md:py-32 bg-brand-dark border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6">When Do I Need a Land Surveyor?</h2>
            <p className="text-lg sm:text-xl text-white/60 font-light max-w-2xl mx-auto">
              Explore common scenarios where a land survey is required. <Link to="/faq" className="text-brand-green hover:underline">Read our FAQ</Link> for more details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-brand-black/50 border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveUseCase(activeUseCase === index ? -1 : index)}
                    className={`w-full text-left px-5 py-4 flex items-center justify-between ${activeUseCase === index ? 'bg-brand-green text-brand-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${activeUseCase === index ? 'text-brand-black' : 'text-brand-green'}`}>
                        {useCase.icon}
                      </div>
                      <span className="font-medium text-base sm:text-lg pr-4">
                        {useCase.title}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 shrink-0 transition-transform ${activeUseCase === index ? 'rotate-90 text-brand-black' : ''}`} />
                  </button>
                  {activeUseCase === index && (
                    <div className="p-5 sm:p-6 bg-brand-black border-t border-white/10">
                      <img 
                        src={useCase.image} 
                        alt={useCase.title}
                        className="w-full h-40 sm:h-48 object-cover rounded-xl mb-5 grayscale-35"
                      />
                      <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base">
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
                      ? 'bg-brand-green text-brand-black shadow-lg shadow-brand-green/20' 
                      : 'bg-brand-black/50 text-white/70 hover:bg-white/5 hover:text-white border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors ${activeUseCase === index ? 'text-brand-black' : 'text-brand-green group-hover:text-brand-green-light'}`}>
                      {useCase.icon}
                    </div>
                    <span className={`font-medium text-lg ${activeUseCase === index ? 'text-brand-black' : ''}`}>
                      {useCase.title}
                    </span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${activeUseCase === index ? 'translate-x-1' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
            </div>

            {/* Desktop Dynamic Display */}
            <div className="hidden lg:block lg:col-span-7">
              <div className="sticky top-32">
                <div className="bg-brand-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={useCases[activeUseCase === -1 ? 0 : activeUseCase].image} 
                      alt={useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                      className="w-full h-full object-cover opacity-100 transition-opacity grayscale-35 duration-500"
                      key={useCases[activeUseCase === -1 ? 0 : activeUseCase].image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-12 relative -mt-20 z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green text-brand-black mb-6 shadow-xl">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].icon}
                    </div>
                    <h3 className="text-3xl font-light text-white mb-6">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                    </h3>
                    <p className="text-xl text-white/70 font-light leading-relaxed">
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
      <section className="py-24 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Our Core Services</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Supporting your projects from conception to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Residential Property Surveys',
                icon: <HomeIcon className="w-8 h-8 text-brand-green" />,
                description: 'We provide property line, fence, and tree surveys, for boundary confirmation, in addition to site plans and Building Location Certificates required for design accuracy and municipal compliance.',
              },
              {
                title: 'Land Development',
                icon: <Map className="w-8 h-8 text-brand-green" />,
                description: 'We provide subdivision, consolidation and strata plans, topographic mapping and site plans for design and permitting, and construction layouts to ensure your development can progress efficiently.',
              },
              {
                title: 'Construction & Infrastructure',
                icon: <HardHat className="w-8 h-8 text-brand-green" />,
                description: 'High-accuracy layout, earthwork estimates and monitoring for buildings, land development, roads, utilities and large infrastructure.',
              },
              {
                title: 'Legal Surveys',
                icon: <Compass className="w-8 h-8 text-brand-green" />,
                description: 'Professional expertise for property boundaries, subdivisions, and strata plans.',
              },
            ].map((service, idx) => (
              <Link 
                key={idx}
                to="/services"
                className="bg-brand-black p-8 border border-white/10 hover:border-brand-green/50 transition-all group flex flex-col block cursor-pointer"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-4 group-hover:text-brand-green transition-colors">{service.title}</h3>
                <p className="text-white/60 mb-8 font-light">
                  {service.description}
                </p>
                <div className="text-brand-green font-medium flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Learn more <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="py-16 md:py-24 bg-brand-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight">
               Why Professional Certification Matters in<br className="hidden sm:block" />
                <span className="text-brand-green font-medium">British Columbia</span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 font-light leading-relaxed">
                Protect your property rights by engaging a commissioned British Columbia Land Surveyor. This ensures your project meets rigorous technical standards and carries the legal authority necessary for municipal and provincial compliance.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Legal Boundary Authority:</strong> Only a licensed Land Surveyor has the legal authority to define property lines and set permanent boundary markers. Non-licensed individuals are not legally permitted to verify property limits, and their work lacks standing in the event of a boundary dispute or encroachment claim.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Professional Indemnity & Accountability:</strong> Licensed surveyors are governed by a strict code of professional ethics and carry mandatory professional liability insurance. This oversight provides a layer of protection for your investment that non-licensed service providers cannot offer.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Regulatory Acceptance:</strong> Municipalities, financial institutions, and the Land Title Office only accept survey plans that carry the official seal of a BCLS. Using an unlicensed provider often results in rejected permit applications and significant delays when legal documentation is required.
                  </div>
                </li>
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                About Our Team
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="images/Garibaldi-Highland-Road-Survey.webp"
                alt="Garibaldi Highland Road Survey"
                className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="grid grid-rows-2 gap-4">
                <img
                  src="images/spea-rar.webp"
                  alt="SPEA and RAR"
                  className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="images/Squamish-Garibaldi-Estates-Property-Survey.webp"
                  alt="Garibaldi Estates Property Survey"
                  className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
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