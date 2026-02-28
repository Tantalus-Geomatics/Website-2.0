import React, { useState } from 'react';
import { Map, HardHat, Compass, Building, Mountain, CheckCircle2, ArrowRight, Home, Trees, Waves, Scale, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const services = [
    {
      id: 'land-development',
      title: '1. Land Development',
      icon: <Map className="w-10 h-10 text-brand-green" />,
      description: 'The road to a successful subdivision or site plan begins with accurate data. We help you navigate the municipal approval process by providing the foundational measurements required for architectural and engineering design.',
      items: [
        { name: 'Topographic Surveys', desc: 'Capturing the physical features of your land to support design and hazard mitigation.' },
        { name: 'Site Planning', desc: 'Detailed drawings showing building footprints, setbacks, and utility locations in compliance with local bylaws.' },
        { name: 'Subdivision Plans', desc: 'Guiding developers through the creation of new lots, from initial design to final filing at the Land Title Office.' }
      ]
    },
    {
      id: 'construction',
      title: '2. Construction & Infrastructure',
      icon: <HardHat className="w-10 h-10 text-brand-green" />,
      description: 'We ensure that what is designed is what is built. Our layout and monitoring services reduce the risk of costly rework and project delays.',
      items: [
        { name: 'Building Layouts', desc: 'Precise marking of foundations and structural elements to ensure compliance with municipal setbacks.' },
        { name: 'As-Built Surveys', desc: 'Documenting the final location of newly constructed improvements for occupancy permits and record drawings.' },
        { name: 'Monitoring & Deformation', desc: 'High-precision tracking of slopes and structures during construction to ensure site safety and stability.' }
      ]
    },
    {
      id: 'reality-capture',
      title: '3. 3D Reality Capture',
      icon: <Mountain className="w-10 h-10 text-brand-green" />,
      description: 'Using the latest in LiDAR and photogrammetry, we create accurate 3D replicas of physical sites and buildings.',
      items: [
        { name: 'UAV LiDAR', desc: 'Aerial scanning that penetrates vegetation to reveal the true terrain, ideal for large or inaccessible Sea-to-Sky sites.' },
        { name: 'Terrestrial 3D Laser Scanning', desc: 'Millimeter-accurate documentation of building facades, mechanical rooms, and heritage structures.' },
        { name: 'Scan-to-BIM', desc: 'Converting point cloud data into intelligent 3D models for architects and facility managers.' }
      ]
    },
    {
      id: 'legal',
      title: '4. Legal Surveys (BCLS Certified)',
      icon: <Compass className="w-10 h-10 text-brand-green" />,
      description: 'Legal surveying is a regulated profession in BC. We provide the certified plans required for land registration and property transfer.',
      items: [
        { name: 'Boundary Surveys', desc: 'Locating property corners and marking boundaries to resolve disputes or facilitate renovations.' },
        { name: 'Strata Plans', desc: 'Creating legal plans for multi-unit housing and air-space parcels in Squamish and Whistler.' },
        { name: 'Surveyor’s Certificates', desc: 'Professional documents showing the location of buildings relative to property lines, often required by mortgage lenders.' }
      ]
    }
  ];

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
      icon: <Home className="w-6 h-6" />,
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
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Land Surveying Services"
        description="Comprehensive geomatics solutions including Land Development Surveys, Construction Surveys, Legal Surveys, Strata Surveys, and Reality Capture."
        canonicalUrl="https://tantalusgeomatics.com/services"
      />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-green/30 bg-brand-green/10 text-brand-green text-sm font-medium mb-8 rounded-full">
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Professional Geomatics Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-md max-w-2xl mx-auto">
            Four Pillars of Geomatics
          </p>
        </div>
      </section>

      {/* Services List - Improved Styling */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-dark border border-white/10 mb-8 shadow-2xl">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-light text-white mb-6 tracking-tight">{service.title}</h2>
                  <p className="text-xl text-white/60 font-light mb-10 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-6">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-brand-dark/50 border border-white/5 hover:border-brand-green/30 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white font-medium block mb-2 text-lg">{item.name}</strong>
                          <span className="text-white/60 font-light leading-relaxed block">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="aspect-[4/5] relative rounded-3xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay z-10"></div>
                    <img
                      src={`https://picsum.photos/seed/${service.id}-survey/800/1000?grayscale`}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
