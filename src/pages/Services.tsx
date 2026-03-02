import React, { useState } from 'react';
import { Map, HardHat, Compass, Building, Mountain, CheckCircle2, ArrowRight, Home, Trees, Waves, Scale, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const services = [
    {
      id: 'land-development',
      title: 'Land Development',
      icon: <Map className="w-10 h-10 text-brand-green" />,
      description: 'A successful subdivision or land development project starts with accurate data. Our local expertise and professional services provide the essentials required for architectural and engineering design, helping you efficiently navigate the municipal approval process.',
      items: [
        { name: 'Topographic Surveys and Site Plans', desc: 'Detailed drawings showing building footprints, setbacks, utility locations and the physical terrain to support design and demonstrate compliance with local bylaws.' },
        { name: 'As-Built Surveys', desc: 'Documenting the final location of newly constructed improvements for municipal permitting and record drawings.' },
        { name: 'BC Land Surveyor’s Certificates', desc: 'Professional documents showing the location of buildings relative to property lines, often required by building inspectors and mortgage lenders.' }
      ]
    },
    {
      id: 'construction',
      title: 'Construction & Infrastructure',
      icon: <HardHat className="w-10 h-10 text-brand-green" />,
      description: 'What is built must match your designs. Our layout and monitoring services reduce the risk of costly rework and project delays.',
      items: [
        { name: 'Building Layouts', desc: 'Precise marking of foundations and structural elements to ensure accurate construction and compliance with municipal setbacks.' },
        { name: 'Quantity Estimate Surveys', desc: 'Estimating stockpile volumes and material changes to ground surfaces during site construction and development activites.' },
        { name: '3D Settlement Monitoring Surveys', desc: 'High-precision tracking of motion and settlement of earth and structures during construction to ensure site safety and stability.' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal Surveys',
      icon: <Compass className="w-10 h-10 text-brand-green" />,
      description: 'BC Land Surveyors are the only professionals qualified to determine the locations of property boundaries. We physically define these boundaries on the ground and prepare statutory plans for registration at the Land Title Office.',
      items: [
        { name: 'Boundary Surveys', desc: 'Locating property corners and marking existing boundaries to support the construction of fences, resolve disputes or facilitate renovations and landscaping.' },
        { name: 'Strata Plans', desc: 'Surveys and plans for multi-unit housing and air-space parcels.' },
        { name: 'Subdivision Plans', desc: 'Supporting developers through the subdivision process, from initial design consultations to final filing at the Land Title Office.' }
      ]
    },
    {
      id: 'reality-capture',
      title: '3D Reality Capture',
      icon: <Mountain className="w-10 h-10 text-brand-green" />,
      description: 'Using the latest in LiDAR and photogrammetry, we create accurate 3D replicas of physical sites and buildings.',
      items: [
        { name: 'UAV Mapping', desc: 'Aerial mapping ideal for large or inaccessible Sea-to-Sky sites.' },
        { name: 'Terrestrial 3D Laser Scanning', desc: 'Millimeter-accurate documentation of building facades, complex building interiors, and inaccessible utility infrastructure.' },
        { name: 'Digital Twins', desc: 'Converting point cloud data into high accuracy 3D models for architects, engineers and facility managers.' }
      ]
    }
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Tantalus Geomatics Land Surveying Ltd."
        }
      }
    }))
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Land Surveying Services in Squamish & Whistler"
        description="Comprehensive geomatics solutions including Land Development Surveys, Construction Surveys, Legal Boundary Surveys, Strata Surveys, and 3D Reality Capture."
        keywords="Land Development Surveying BC, Construction Surveying Whistler, 3D Reality Capture Squamish, UAV LiDAR, Legal Boundary Survey, Strata Plans, Topographic Surveys"
        canonicalUrl="https://tantalusgeomatics.com/services"
        schema={servicesSchema}
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span> Services
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Comprehensive Land Surveying, topographic mapping, and construction support for your most demanding projects.
          </p>
        </div>
      </section>

      {/* Services List - Improved Styling */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-32">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-brand-dark border border-white/10 mb-6 sm:mb-8 shadow-2xl">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 sm:mb-6 tracking-tight">{service.title}</h2>
                  <p className="text-lg sm:text-xl text-white/60 font-light mb-8 sm:mb-10 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-4 sm:space-y-6">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-brand-dark/50 border border-white/5 hover:border-brand-green/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white font-medium block mb-1 sm:mb-2 text-base sm:text-lg">{item.name}</strong>
                          <span className="text-white/60 font-light leading-relaxed block text-sm sm:text-base">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="aspect-square sm:aspect-[4/5] relative rounded-3xl overflow-hidden border border-white/10">
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
