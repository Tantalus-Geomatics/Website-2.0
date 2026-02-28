import { Link } from 'react-router-dom';
import { ArrowRight, Map, Compass, HardHat, Mountain } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
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
            src="https://picsum.photos/seed/squamish-mountains/1920/1080?blur=2"
            alt="Squamish Mountains"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 to-brand-black" />
          
          {/* Geometric pattern from business card */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 opacity-20 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 400" preserveAspectRatio="none" className="w-full h-full text-brand-green stroke-current" fill="none" strokeWidth="1">
              <path d="M0,0 L100,50 L100,100 L0,50 Z" />
              <path d="M0,100 L100,150 L100,200 L0,150 Z" />
              <path d="M0,200 L100,250 L100,300 L0,250 Z" />
              <path d="M0,300 L100,350 L100,400 L0,350 Z" />
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            Tantalus Geomatics: Precision from the <span className="text-brand-green font-medium">Ground Up</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Precision Measurement for the Sea-to-Sky Corridor
          </p>
          <p className="text-lg text-white/60 mb-10 max-w-4xl mx-auto font-light leading-relaxed">
            From the steep granite slopes of Squamish to the high-density resort infrastructure of Whistler, your project depends on data you can trust. Tantalus Geomatics provides BC Land Surveying and 3D Reality Capture services designed to meet the unique challenges of the Coast Mountain corridor. We combine the legal authority of a BCLS practice with the digital innovation of 3D laser scanning to deliver field-to-finish precision.
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
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-medium transition-all border border-brand-green flex items-center justify-center"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-brand-dark border-b border-white/10">
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
