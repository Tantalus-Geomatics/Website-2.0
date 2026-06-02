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
import { SERVICE_CATEGORIES } from '../config/servicesStructure';

const ALL_SERVICES = [
  {
    slug: 'property-line-surveys',
    title: 'Property Line Surveys',
    description: 'Locating and marking legal boundaries to ensure fences, walls, and structures are built on your own land.',
    href: '/services/property-line-surveys/',
    icon: MapPin,
    image: '/images/survey-marker-post.webp',
  },
  {
    slug: 'topographic-surveys',
    title: 'Topographic Surveys',
    description: 'Detailed certified drawings showing building footprints, setbacks, utility locations, and physical terrain to support design and permitting.',
    href: '/services/topographic-surveys/',
    icon: Map,
    image: '/images/land-development.webp',
  },
  {
    slug: 'subdivision',
    title: 'Subdivision & Consolidation',
    description: 'Supporting developers through the lot subdivision and consolidation process, from initial design to final Land Title Office filing.',
    href: '/subdivision/',
    icon: Scale,
  },
  {
    slug: '3d-settlement-monitoring',
    title: '3D Settlement Monitoring',
    description: 'High-precision tracking of motion and settlement of earth and structures during construction to ensure site safety and stability.',
    href: '/services/3d-settlement-monitoring/',
    icon: Mountain,
  },
  {
    slug: 'bare-land-strata-surveys',
    title: 'Strata Plans',
    description: 'Surveys and plans for multi-unit housing, bare land strata layouts, and air-space parcels.',
    href: '/services/bare-land-strata-surveys/',
    icon: Building,
  },
  {
    slug: 'building-location-certificates',
    title: 'Building Location Certificates',
    description: 'Certified surveys confirming that structures conform to legal boundaries and municipal setback requirements.',
    href: '/services/building-location-certificates/',
    icon: Home,
    image: '/images/old-home.webp',
  },
  {
    slug: 'construction-staking',
    title: 'Construction Staking & Layout',
    description: 'Precise marking of foundations, gridlines, and structural elements to ensure accurate construction matches design specifications.',
    href: '/services/construction-staking/',
    icon: HardHat,
    image: '/images/construction.webp',
  },
  {
    slug: 'terrestrial-lidar-scanning',
    title: 'Terrestrial 3D Laser Scanning',
    description: 'Millimeter-accurate documentation of building facades, complex building interiors, and inaccessible utility infrastructure.',
    href: '/services/terrestrial-lidar-scanning/',
    icon: CheckCircle2,
  },
  {
    slug: 'uav-mapping',
    title: 'UAV Drone Mapping',
    description: 'Aerial mapping and high-resolution photogrammetry ideal for large, complex, or inaccessible sites.',
    href: '/services/uav-mapping/',
    icon: Trees,
    image: '/images/reality-capture.webp',
  },
  {
    slug: 'boundary-surveys',
    title: 'Boundary Surveys',
    description: 'Locating property corners and marking existing boundaries to resolve disputes or facilitate renovations and landscaping.',
    href: '/services/boundary-surveys/',
    icon: Compass,
  },
  {
    slug: 'volume-and-earthwork-surveys',
    title: 'Volume & Earthwork Surveys',
    description: 'Estimating stockpile volumes and material changes to ground surfaces during site construction and development activities.',
    href: '/services/volume-and-earthwork-surveys/',
    icon: Waves,
  },
  {
    slug: 'environmental-and-riparian-surveys',
    title: 'Environmental & Riparian Surveys',
    description: 'Accurately locating trees, watercourses, and environmental features to ensure compliance with municipal bylaws and covenants.',
    href: '/services/environmental-and-riparian-surveys/',
    icon: Trees,
  },
  {
    slug: 'statutory-rights-of-way-surveys',
    title: 'Easement & Covenant Plans',
    description: 'BCLS-certified plans required to register easements, covenants, and statutory rights-of-way on property titles.',
    href: '/services/statutory-rights-of-way-surveys/',
    icon: FileText,
  },
  {
    slug: 'air-space-subdivision-surveys',
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

          <div className="space-y-8">
            {SERVICE_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="flex flex-col lg:flex-row items-stretch bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden mb-8"
                >
                  {/* Left-Side Graphic Block */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full lg:w-1/3 min-h-[240px] object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Right-Side Metadata Column */}
                  <div className="w-full lg:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                      {/* Icon Box */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green-dark mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 font-light text-base leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>

                    {/* Child Deep-Links List Section */}
                    <div className="border-t border-slate-100 pt-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Available Services
                      </h4>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {category.serviceSlugs.map((slug) => {
                          const service = ALL_SERVICES.find((s) => s.slug === slug);
                          if (!service) return null;
                          return (
                            <Link
                              key={slug}
                              to={`/services/${service.slug}/`}
                              className="text-brand-green-dark font-medium hover:underline flex items-center gap-2 mt-2"
                            >
                              <ArrowRight className="w-4 h-4" />
                              {service.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
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
