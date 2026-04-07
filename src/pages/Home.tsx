import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, Compass, HardHat, Mountain, Home as HomeIcon, Trees, Waves, Scale, FileText, Building, Fence } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      title: "Property Line Surveys",
      icon: <Fence className="w-6 h-6" />,
      content: "Many homeowners discover their existing fences are misaligned with their legal property lines once a formal survey is conducted. A BCLS-certified survey is the only way to definitively establish your boundaries and replace property corners before you invest in new fencing.",
      image: "images/fence-boundary-staking.webp"
    },
    {
      title: "Building Design and Construction Permitting",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "Municipalities require BCLS-certified topographic surveys to verify that proposed designs comply with site coverage and setback zoning bylaws. These surveys provide the foundational data architects and designers need to align their plans with the physical and legal constraints of the site.",
      image: "images/adu.webp"
    },
    {
      title: "Retaining Wall Construction",
      icon: <HardHat className="w-6 h-6" />,
      content: "Municipalities require a BCLS survey to ensure retaining walls don't encroach onto neighbouring properties and to ensure they conform to local bylaws.",
      image: "images/retaining-wall.webp"
    },
    {
      title: "Deck and Pool Permits",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "Municipalities require a site plan prepared by a BC Land Surveyor to confirm that new decks, pools, or accessory buildings meet the \"site coverage\" and \"setback\" requirements of the zoning bylaw.",
      image: "images/deck-pool.webp"
    },
    {
      title: "Purchasing an Older Home",
      icon: <Building className="w-6 h-6" />,
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
      image: "images/tree.webp"
    },
    {
      title: "Mortgage Refinancing",
      icon: <FileText className="w-6 h-6" />,
      content: "Lenders often require a recent Building Location Certificate to confirm all structures on the property conform to municipal bylaws and to determine the total lot area prior to approving a new loan or line of credit.",
      image: "images/mortgage.webp"
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
    "@type": "ProfessionalService",
    "name": "Tantalus Geomatics Land Surveying Ltd.",
    "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
    "url": "https://tantalusgeomatics.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": ["Squamish", "Whistler", "Pemberton", "West Vancouver", "Lillooet", "Bowen Island"],
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "areaServed": ["Squamish", "Whistler", "Pemberton", "Lillooet", "West Vancouver", "Bowen Island"],
    "description": "Professional Land Surveying and 3D Reality Capture for homeowners, AEC industry professionals, and real estate experts in the Sea to Sky corridor."
  };

  return (
    <div className="flex flex-col bg-brand-black">
      <SEO 
        title="BC Land Surveyor in Squamish, Whistler & Sea to Sky"
        description="Hire a professional BC Land Surveyor (BCLS) for topographic surveys, legal boundaries, and 3D reality capture in Squamish, Whistler, and Pemberton."
        keywords="BC Land Surveyor, Land Surveying Squamish, Land Surveying Sea to Sky, Land Surveying Whistler, Topographic Survey Squamish, Topographic Survey Sea to Sky, Topographic Survey Whistler, Property Boundary Survey, 3D Reality Capture, Land Surveying Sea to Sky, BCLS"
        canonicalUrl="https://tantalusgeomatics.com/"
        schema={homeSchema}
      />
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md">
            Professional Land Surveying throughout the Sea-to-Sky Corridor.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Your project depends on data you can trust and a team you can rely on. We combine Professional Land Surveying with advanced 3D technologies to support your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              Request a Quote <ArrowRight size={20} />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-medium transition-all border border-brand-green flex items-center justify-center backdrop-blur-sm"
            >
              Explore Services
            </Link>
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
                        //className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
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
                      key={useCases[activeUseCase === -1 ? 0 : activeUseCase].image} // Force re-render for animation
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
                title: 'Land Development',
                icon: <Map className="w-8 h-8 text-brand-green" />,
                description: 'Site plans and topographic mapping to support residential and commercial growth.',
              },
              {
                title: 'Construction & Infrastructure',
                icon: <HardHat className="w-8 h-8 text-brand-green" />,
                description: 'High-accuracy layout and monitoring for buildings, roads, utilities and large infrastructure.',
              },
              {
                title: 'Legal Surveys',
                icon: <Compass className="w-8 h-8 text-brand-green" />,
                description: 'Professional expertise for property boundaries, subdivisions, and strata plans.',
              },
              {
                title: '3D Reality Capture',
                icon: <Mountain className="w-8 h-8 text-brand-green" />,
                description: 'UAV mapping and terrestrial laser scanning for design, digital twins and BIM coordination.',
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-brand-black p-8 border border-white/10 hover:border-brand-green/50 transition-all group flex flex-col">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 font-light">
                  {service.description}
                </p>
                <Link to="/services" className="text-brand-green font-medium flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
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
                Why Local Expertise Matters in the <br className="hidden sm:block" />
                <span className="text-brand-green font-medium">Sea-to-Sky</span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 font-light leading-relaxed">
                Development in the Sea-to-Sky involves navigating the challenges of hazardous terrain, riparian setbacks, and evolving municipal bylaws.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Steep Slope Compliance:</strong> Our high-density contour mapping helps you meet the District of Squamish's Steep Slope Development Permit Area (DPA) requirements.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Riparian Boundaries:</strong> Our team works with environmental professionals to accurately identify Streamside Protection and Enhancement Areas (SPEA), ensuring your project conforms to provincial regulations.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Municipal Experience:</strong> Whether it’s a certificate for the location of a new foundation, or supporting subdivision applications, we provide the essential documentation needed for rapid approval.
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
                src="images/steep-slope.webp"
                alt="Steep Slope"
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
                  src="images/muni-ex.webp"
                  alt="Municipal Expertise"
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
