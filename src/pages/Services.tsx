import { Map, HardHat, Compass, Building, Mountain, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
  const services = [
    {
      id: 'land-development',
      title: 'Land Development Surveys',
      icon: <Map className="w-10 h-10 text-brand-green" />,
      description: 'Essential spatial data and legal boundaries for planning and developing land.',
      items: [
        'Site Plans',
        'Topographic Surveys',
        'Building Certificates',
        'Boundary Staking'
      ]
    },
    {
      id: 'construction',
      title: 'Construction Surveys',
      icon: <HardHat className="w-10 h-10 text-brand-green" />,
      description: 'Precision layout and monitoring to ensure your project is built exactly as designed.',
      items: [
        'Layout and Staking',
        'Monitoring Surveys',
        'Volumetric Surveys',
        'Control Surveys'
      ]
    },
    {
      id: 'legal',
      title: 'Legal Surveys',
      icon: <Compass className="w-10 h-10 text-brand-green" />,
      description: 'Defining and documenting property boundaries under the Land Title Act.',
      items: [
        'Subdivision and Consolidation Surveys',
        'Easement, Covenant and Right of Way Surveys',
        'Property Boundary Surveys',
        'Air Space Surveys',
        'Land Act Surveys'
      ]
    },
    {
      id: 'strata',
      title: 'Strata Surveys',
      icon: <Building className="w-10 h-10 text-brand-green" />,
      description: 'Comprehensive strata plans for multi-unit developments and bare land stratas.',
      items: [
        'Building Strata',
        'Bare Land Strata',
        'Phased Strata',
        'Strata Plan Amendments',
        'Common Property Conversions'
      ]
    },
    {
      id: 'reality-capture',
      title: 'Reality Capture',
      icon: <Mountain className="w-10 h-10 text-brand-green" />,
      description: 'Advanced 3D data collection for complex environments and detailed modeling.',
      items: [
        '3D Laser Scanning',
        'Photogrammetry',
        'Drone Imagery',
        'LiDAR'
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
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">Our Services</h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Comprehensive geomatics solutions tailored for homeowners, industry professionals, and developers.
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
                        <span className="text-white/80 font-light">{item}</span>
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
