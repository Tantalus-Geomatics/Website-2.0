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
  Phone,
} from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';
import { SERVICE_IMAGES_MAP } from '../config/resourceMapping';

const ALL_SERVICES = [
  {
    title: 'Property Line Surveys',
    description: 'Locating and marking legal boundaries to ensure fences, walls, and structures are built on your own land.',
    href: '/services/property-line-surveys/',
    icon: MapPin,
    image: '/images/survey-marker-post.webp',
  },
  {
    title: 'Topographic Surveys',
    description: 'Detailed certified drawings showing building footprints, setbacks, utility locations, and physical terrain to support design and permitting.',
    href: '/services/topographic-surveys/',
    icon: Map,
    image: '/images/land-development.webp',
  },
  {
    title: 'Subdivision & Consolidation',
    description: 'Supporting developers through the lot subdivision and consolidation process, from initial design to final Land Title Office filing.',
    href: '/subdivision/',
    icon: Scale,
  },
  {
    title: '3D Settlement Monitoring',
    description: 'High-precision tracking of motion and settlement of earth and structures during construction to ensure site safety and stability.',
    href: '/services/3d-settlement-monitoring/',
    icon: Mountain,
  },
  {
    title: 'Strata Plans',
    description: 'Surveys and plans for multi-unit housing, bare land strata layouts, and air-space parcels.',
    href: '/services/bare-land-strata-surveys/',
    icon: Building,
  },
  {
    title: 'Building Location Certificates',
    description: 'Certified surveys confirming that structures conform to legal boundaries and municipal setback requirements.',
    href: '/services/building-location-certificates/',
    icon: Home,
    image: '/images/old-home.webp',
  },
  {
    title: 'Construction Staking & Layout',
    description: 'Precise marking of foundations, gridlines, and structural elements to ensure accurate construction matches design specifications.',
    href: '/services/construction-staking/',
    icon: HardHat,
    image: '/images/construction.webp',
  },
  {
    title: 'Terrestrial 3D Laser Scanning',
    description: 'Millimeter-accurate documentation of building facades, complex building interiors, and inaccessible utility infrastructure.',
    href: '/services/terrestrial-lidar-scanning/',
    icon: CheckCircle2,
  },
  {
    title: 'UAV Drone Mapping',
    description: 'Aerial mapping and high-resolution photogrammetry ideal for large, complex, or inaccessible sites.',
    href: '/services/uav-mapping/',
    icon: Trees,
    image: '/images/reality-capture.webp',
  },
  {
    title: 'Boundary Surveys',
    description: 'Locating property corners and marking existing boundaries to resolve disputes or facilitate renovations and landscaping.',
    href: '/services/boundary-surveys/',
    icon: Compass,
  },
  {
    title: 'Volume & Earthwork Surveys',
    description: 'Estimating stockpile volumes and material changes to ground surfaces during site construction and development activities.',
    href: '/services/volume-and-earthwork-surveys/',
    icon: Waves,
  },
  {
    title: 'Environmental & Riparian Surveys',
    description: 'Accurately locating trees, watercourses, and environmental features to ensure compliance with municipal bylaws and covenants.',
    href: '/services/environmental-and-riparian-surveys/',
    icon: Trees,
  },
  {
    title: 'Easement & Covenant Plans',
    description: 'BCLS-certified plans required to register easements, covenants, and statutory rights-of-way on property titles.',
    href: '/services/statutory-rights-of-way-surveys/',
    icon: FileText,
  },
  {
    title: 'Air Space Subdivision',
    description: 'Specialized legal surveys creating independent three-dimensional volumetric parcels for complex multi-use developments.',
    href: '/services/air-space-subdivision-surveys/',
    icon: Building,
  }
];

const SERVICE_AREAS = [
  'Squamish',
  'Whistler',
  'Pemberton',
  'Lillooet',
  'West Vancouver',
  'Bowen Island',
  'Britannia Beach',
  'Furry Creek',
  'North Vancouver'
];

export default function Services() {
  const lead = useLeadForm();

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': ALL_SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': service.title,
        'description': service.description,
        'url': `https://tantalusgeomatics.com${service.href}`,
        'areaServed': SERVICE_AREAS.map(area => ({
          '@type': 'City',
          'name': area
        })),
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Tantalus Geomatics Land Surveying Ltd.',
          'areaServed': SERVICE_AREAS
        }
      }
    }))
  };

  return (
    <PageShell>
      <SEO
        title="Land Surveying Services in Sea to Sky"
        description="Comprehensive land surveying and geomatics engineering solutions including topographic Surveys, Construction Surveys, Legal Boundary Surveys, Strata Surveys, drone surveys and 3D laser scanning."
        canonicalUrl="https://tantalusgeomatics.com/services/"
        schema={servicesSchema}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span> Services
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Comprehensive Land Surveying, topographic mapping, and construction support.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-all flex items-center justify-center gap-2 rounded-full"
            >
              <Phone size={20} />
              Call for a free quote
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Explore our comprehensive range of land surveying, geomatics engineering, and 3D reality capture solutions.
            </p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isBuildingLocationCertificates = service.href === '/services/building-location-certificates/';
              
              // Determine if there is an image and what its src/alt are
              let imageSrc = undefined;
              let imageAlt = undefined;
              
              if (isBuildingLocationCertificates) {
                const serviceImageObj = SERVICE_IMAGES_MAP['building-location-certificates']?.[0];
                imageSrc = serviceImageObj?.src || service.image || '/images/old-home.webp';
                imageAlt = serviceImageObj?.alt || service.title;
              } else if (service.image) {
                imageSrc = service.image;
                imageAlt = service.title;
              }

              return (
                <Link
                  key={index}
                  to={service.href}
                  className="group relative overflow-hidden bg-white border border-slate-200/60 shadow-sm hover:shadow-md rounded-3xl transition-all duration-300 flex flex-col justify-between h-full col-span-1"
                >
                  {/* Image at Top if exists */}
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      className="w-full aspect-video object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Icon Box */}
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green-dark mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-slate-600 font-light text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Action Tray */}
                    <div className="flex items-center justify-between mt-6 pt-2">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-brand-green-dark transition-colors flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4 inline" />
                      </span>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-green group-hover:text-black text-slate-600 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action / Contact Form - 2 Column Layout */}
      <section className="py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Contact Form */}
            <div className="bg-brand-dark p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>

            {/* Column 2: Surveyor Image */}
            <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl">
              <img
                src="/images/DS-TS-1.webp"
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
