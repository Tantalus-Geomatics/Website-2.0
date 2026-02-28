import { Map, HardHat, Compass, Building, Mountain, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
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

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Land Surveying Services"
        description="Comprehensive geomatics solutions including Land Development Surveys, Construction Surveys, Legal Surveys, Strata Surveys, and Reality Capture."
        canonicalUrl="https://tantalusgeomatics.com/services"
      />
      {/* Hero */}
      <section className="bg-brand-dark py-24 text-center border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">Professional Geomatics Services</h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Four Pillars of Geomatics
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`bg-brand-dark p-8 md:p-12 border border-white/10 flex flex-col md:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="w-20 h-20 flex items-center justify-start mb-8">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-light text-white mb-4">{service.title}</h2>
                  <p className="text-lg text-white/70 font-light mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 gap-6">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-1" />
                        <div>
                          <strong className="text-white font-medium block mb-1">{item.name}</strong>
                          <span className="text-white/70 font-light leading-relaxed block">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full relative">
                  <div className={`absolute inset-0 border border-brand-green transform ${index % 2 === 1 ? '-translate-x-4' : 'translate-x-4'} translate-y-4 -z-10`}></div>
                  <img
                    src={`https://picsum.photos/seed/${service.id}-survey/800/600?grayscale`}
                    alt={service.title}
                    className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
