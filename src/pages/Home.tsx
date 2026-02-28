import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, Compass, HardHat, Mountain, Home as HomeIcon, Trees, Waves, Scale, FileText, Building } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      title: "Fence Replacements and Boundary Staking",
      icon: <Map className="w-6 h-6" />,
      content: "Homeowners frequently discover that their existing fence—which they assumed was the boundary—is actually several feet off-course. A BCLS provides the objective proof needed to install a new fence with confidence.",
      image: "https://picsum.photos/seed/fence-survey/800/600?grayscale"
    },
    {
      title: "Retaining Wall Construction",
      icon: <HardHat className="w-6 h-6" />,
      content: "In the steep terrain of Squamish, retaining walls are essential for creating usable yard space. Municipalities require a BCLS survey to ensure walls don't encroach and to determine the building heights allowed under local bylaws.",
      image: "https://picsum.photos/seed/retaining-wall/800/600?grayscale"
    },
    {
      title: "Deck and Pool Permits",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "Municipalities require a site plan prepared by a BCLS to ensure that new decks, pools, or accessory buildings meet the \"site coverage\" and \"setback\" requirements of the zoning bylaw.",
      image: "https://picsum.photos/seed/deck-pool/800/600?grayscale"
    },
    {
      title: "Purchasing an Older Home",
      icon: <Building className="w-6 h-6" />,
      content: "Buyers of older homes in the Lower Mainland often want to \"verify\" what they are buying. A Building Location Certificate identifies if any past owners have built structures over the property line, potentially saving the buyer from future litigation.",
      image: "https://picsum.photos/seed/older-home/800/600?grayscale"
    },
    {
      title: "Strata Conversions (Duplexes and Garden Suites)",
      icon: <Building className="w-6 h-6" />,
      content: "With the provincial push for \"missing middle\" housing, many owners are looking to convert single-family lots or duplexes into stratified units. This requires a BCLS to define the strata lots and common property.",
      image: "https://picsum.photos/seed/strata-conversion/800/600?grayscale"
    },
    {
      title: "Septic System Design (Rural Pemberton/Squamish)",
      icon: <Map className="w-6 h-6" />,
      content: "In rural areas not served by city sewers, a BCLS provides the topographic and boundary data needed for engineers to design and place septic fields in compliance with health regulations.",
      image: "https://picsum.photos/seed/septic-design/800/600?grayscale"
    },
    {
      title: "Tree Cutting and Covenants",
      icon: <Trees className="w-6 h-6" />,
      content: "In the Sea-to-Sky region, many titles have \"Restricted Covenant Areas\" that forbid tree removal due to slope stability. A BCLS identifies these zones on the ground so owners don't inadvertently violate provincial environmental laws.",
      image: "https://picsum.photos/seed/tree-cutting/800/600?grayscale"
    },
    {
      title: "Mortgage Refinancing",
      icon: <FileText className="w-6 h-6" />,
      content: "Lenders often require a current Building Location Certificate to ensure their security (the house) is properly situated on the land before approving a new loan or line of credit.",
      image: "https://picsum.photos/seed/mortgage-refi/800/600?grayscale"
    },
    {
      title: "Natural Boundary Identification",
      icon: <Waves className="w-6 h-6" />,
      content: "Owners of properties on the Squamish River or Howe Sound need a BCLS to determine the \"Present Natural Boundary\" for dock applications or to verify the impact of erosion on their lot size.",
      image: "https://picsum.photos/seed/waterfront/800/600?grayscale"
    },
    {
      title: "Civil Litigation and Expert Witness",
      icon: <Scale className="w-6 h-6" />,
      content: "When neighbor disputes escalate to court, a BCLS is called as an expert witness. Their plans and testimony are the definitive evidence used by judges to settle boundary and encroachment cases.",
      image: "https://picsum.photos/seed/litigation/800/600?grayscale"
    }
  ];

  return (
    <div className="flex flex-col bg-brand-black">
      <SEO 
        title="Land Surveying in Squamish, Whistler & Sea to Sky"
        description="Professional Land Surveying and Reality Capture for homeowners, industry professionals, and real estate experts in the Sea to Sky corridor."
        keywords="Land Surveying, Geomatics, Squamish, Whistler, Pemberton, Sea to Sky, Topographic Surveys, Legal Surveys, Reality Capture, 3D Laser Scanning"
        canonicalUrl="https://tantalusgeomatics.com/"
      />
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
            alt="Sea-to-Sky Mountains"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Precision <span className="text-brand-green font-medium">Land Surveying</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md">
            Expert geomatics for the Sea-to-Sky Corridor.
          </p>
          <p className="text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Your project depends on data you can trust. We combine the legal authority of a BCLS practice with advanced 3D Reality Capture to deliver field-to-finish precision in the Coast Mountains.
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
      <section className="py-32 bg-brand-dark border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">When Do I Need a Surveyor?</h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
              Explore common scenarios where professional geomatics expertise is essential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Interactive List */}
            <div className="lg:col-span-5 space-y-2">
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

            {/* Dynamic Display */}
            <div className="lg:col-span-7">
              <div className="sticky top-32">
                <div className="bg-brand-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={useCases[activeUseCase].image} 
                      alt={useCases[activeUseCase].title}
                      className="w-full h-full object-cover grayscale opacity-80 transition-opacity duration-500"
                      key={useCases[activeUseCase].image} // Force re-render for animation
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-12 relative -mt-20 z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green text-brand-black mb-6 shadow-xl">
                      {useCases[activeUseCase].icon}
                    </div>
                    <h3 className="text-3xl font-light text-white mb-6">
                      {useCases[activeUseCase].title}
                    </h3>
                    <p className="text-xl text-white/70 font-light leading-relaxed">
                      {useCases[activeUseCase].content}
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
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Our Core Pillars of Service</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Delivering accurate, reliable, and timely spatial data to support your projects from conception to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Land Development',
                icon: <Map className="w-8 h-8 text-brand-green" />,
                description: 'Site plans and topographic mapping for residential and commercial growth.',
              },
              {
                title: 'Construction & Infrastructure',
                icon: <HardHat className="w-8 h-8 text-brand-green" />,
                description: 'High-accuracy layout and monitoring for road, bridge, and building projects.',
              },
              {
                title: '3D Reality Capture',
                icon: <Mountain className="w-8 h-8 text-brand-green" />,
                description: 'UAV LiDAR and terrestrial laser scanning for digital twins and BIM coordination.',
              },
              {
                title: 'Legal Surveys',
                icon: <Compass className="w-8 h-8 text-brand-green" />,
                description: 'Licensed BCLS expertise for subdivisions, strata plans, and property boundaries.',
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
      <section className="py-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://picsum.photos/seed/construction-site/1920/1080?grayscale"
            alt="Construction background"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
                Why Local Expertise Matters in the <br />
                <span className="text-brand-green font-medium">Sea-to-Sky</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
                Development in Squamish and Whistler isn't just about measuring land—it's about navigating a complex web of hazardous terrain, riparian setbacks, and evolving municipal bylaws.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Steep Slope Compliance:</strong> We help you meet the District of Squamish's rigorous Steep Slope Development Permit Area (DPA) requirements with high-density contour mapping.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Riparian Navigation:</strong> Our team works alongside environmental professionals to precisely delineate Streamside Protection and Enhancement Areas (SPEA), ensuring your project respects provincial regulations.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Municipal Mastery:</strong> Whether it’s meeting Whistler’s foundation formwork checks or Squamish’s subdivision standards, we provide the documentation needed for rapid approval.
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
                src="https://picsum.photos/seed/survey-equipment/600/800?grayscale"
                alt="Survey Equipment"
                className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="grid grid-rows-2 gap-4">
                <img
                  src="https://picsum.photos/seed/mountain-biking/600/400?grayscale"
                  alt="Mountain Lifestyle"
                  className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://picsum.photos/seed/architecture-plan/600/400?grayscale"
                  alt="Architecture Plans"
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
