import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Map,
  HardHat,
  Compass,
  Building,
  Mountain,
  CheckCircle2,
  ArrowRight,
  Home,
  Trees,
  Waves,
  Scale,
  FileText,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

export default function Services() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const lead = useLeadForm();

  const services = [
    {
      id: 'residential',
      title: 'Residential Property Surveys',
      icon: <Home className="w-10 h-10 text-brand-green" />,
      image: "images/old-home.webp",
      description: 'We provide Property Line, Fence, and Tree Surveys, for Boundary Confirmation, in addition to Site Plans and Building Location Certificates required for Design and Municipal Permitting.',
      items: [
        { name: 'Site Plans', desc: 'Detailed certified plans required to support municipal building permits, showing existing conditions and proposed improvements.' },
        { name: 'Property Line Surveys', desc: 'Locating and marking legal boundaries to ensure fences, walls, and structures are built on your own land.' },
        { name: 'Tree Surveys', desc: 'Accurately locating trees to ensure compliance with municipal tree bylaws and restrictive covenants.' },
        { name: 'Building Location Certificates', desc: 'Certified surveys confirming that structures conform to legal boundaries and municipal setback requirements.' }
      ]
    },
    {
      id: 'land-development',
      title: 'Land Development',
      icon: <Map className="w-10 h-10 text-brand-green" />,
      image: "images/land-development.webp",
      description: 'We provide the certified surveying and engineering essentials required to support architectural and civil engineering design and streamline the municipal approval process.',
      items: [
        { name: 'Topographic Surveys and Site Plans', desc: 'Detailed certified drawings showing building footprints, setbacks, utility locations and the physical terrain to support design and demonstrate compliance with local bylaws.' },
        { name: 'As-Built Surveys', desc: 'Documenting the final location of newly constructed improvements for municipal permitting and record drawings.' },
        { name: 'BC Land Surveyor’s Certificates', desc: 'Certified plans showing the location of buildings relative to property lines, often required by building inspectors and mortgage lenders.' }
        ]
    },
    {
      id: 'construction',
      title: 'Construction & Infrastructure',
      icon: <HardHat className="w-10 h-10 text-brand-green" />,
      image: "images/construction.webp",
      description: 'We provide the precise layout and monitoring services required to ensure construction matches design specifications. Our professional oversight reduces the risk of costly rework and keeps your project on schedule.',
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
      image: "images/survey-marker-post.webp",
      description: 'We provide the professional boundary surveys and statutory plans required for Land Title Office registration, ensuring your property interests are legally protected.',
      items: [
        { name: 'Boundary Surveys', desc: 'Locating property corners and marking existing boundaries to support the construction of fences, resolve disputes or facilitate renovations and landscaping.' },
        { name: 'Strata Plans', desc: 'Surveys and plans for multi-unit housing and air-space parcels.' },
        { name: 'Subdivision and Consolidation Plans', desc: 'Supporting developers through the lot subdivision and consolidation process, from initial design consultations to final filing at the Land Title Office.' },
        { name: 'Easement, Covenant and Right of Way Plans', desc:'We provide the BCLS-certified plans required to register easements, covenants, and rights-of-way. These documents ensure all legal land-use restrictions are accurately documented and protected on the property title.'}
      ]
    },
    {
      id: 'reality-capture',
      title: '3D Reality Capture',
      icon: <Mountain className="w-10 h-10 text-brand-green" />,
      image: "images/reality-capture.webp",
      description: 'Using the latest in LiDAR and photogrammetry, we create accurate 3D replicas of physical sites and buildings.',
      items: [
        { name: 'UAV Mapping', desc: 'Aerial mapping ideal for large or inaccessible sites.' },
        { name: 'Terrestrial 3D Laser Scanning', desc: 'Millimeter-accurate documentation of building facades, complex building interiors, and inaccessible utility infrastructure.' },
        { name: 'Digital Twins', desc: 'Converting point cloud data into high accuracy 3D models for architects, engineers and facility managers.' }
      ]
    }
  ];

  const serviceAreas = [
    "Squamish", 
    "Whistler", 
    "Pemberton", 
    "Lillooet", 
    "West Vancouver", 
    "Bowen Island", 
    "Britannia Beach", 
    "Furry Creek", 
    "North Vancouver"
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
        "areaServed": serviceAreas.map(area => ({
          "@type": "City",
          "name": area
        })),
        "provider": {
          "@type": "ProfessionalService",
          "name": "Tantalus Geomatics Land Surveying Ltd.",
          "areaServed": serviceAreas
        }
      }
    }))
  };

  return (
    <PageShell>
      <SEO 
        title="Land Surveying Services in Sea to Sky"
        description="Comprehensive land surveying and geomatics engineering solutions including topographic Surveys, Construction Surveys, Legal Boundary Surveys, Strata Surveys, drone surveys and 3D laser scanning."
        canonicalUrl="https://tantalusgeomatics.com/services"
        schema={servicesSchema}
      />
      
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span> Services
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Comprehensive Land Surveying, topographic mapping, and construction support.
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
                      src={service.image}
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

    {/* Call to Action / Contact Form - 2 Column Layout */}
    <section className="py-24 bg-brand-dark border-b border-white/10">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Column 1 (Formerly Column 2): Contact Form */}
            <div className="bg-brand-black p-8 md:p-10 border border-white/10 shadow-xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>

            {/* Column 2 (Formerly Column 3): Surveyor Image */}
            <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <img 
                src="images/DS-TS-1.webp" 
                alt="Land Surveyor out in the field" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>
    </PageShell>
  );
}