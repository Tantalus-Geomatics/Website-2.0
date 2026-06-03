import React, { useState, useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  Phone, 
  Calendar, 
  Tag,
  Activity,
  LayoutGrid,
  Grid,
  Mountain,
  HardHat,
  Building2,
  ExternalLink,
  Compass
} from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { SERVICE_CATEGORIES } from '../config/servicesStructure';

const SERVICE_ICON_MAP: Record<string, React.ComponentType<any>> = {
  '3d-settlement-monitoring': Activity,
  'air-space-subdivision-surveys': Layers,
  'bare-land-strata-surveys': LayoutGrid,
};

export interface HubService {
  title: string;
  href: string;
  description?: string;
}

const getServiceIcon = (service: HubService) => {
  const parts = service.href.split('/').filter(Boolean);
  const slug = parts[parts.length - 1] || '';
  
  if (SERVICE_ICON_MAP[slug]) {
    return SERVICE_ICON_MAP[slug];
  }
  
  const normalizedTitle = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (SERVICE_ICON_MAP[normalizedTitle]) {
    return SERVICE_ICON_MAP[normalizedTitle];
  }
  
  if (slug.includes('subdivision') || normalizedTitle.includes('subdivision')) {
    return Layers;
  }
  if (slug.includes('strata') || normalizedTitle.includes('strata')) {
    return LayoutGrid;
  }
  if (slug.includes('topographic') || normalizedTitle.includes('topographic') || slug.includes('site-plan') || normalizedTitle.includes('site-plan')) {
    return Mountain;
  }
  if (slug.includes('construction') || normalizedTitle.includes('construction') || slug.includes('staking') || normalizedTitle.includes('staking') || slug.includes('layout') || normalizedTitle.includes('layout')) {
    return HardHat;
  }
  if (slug.includes('boundary') || normalizedTitle.includes('boundary') || slug.includes('property-line') || normalizedTitle.includes('property-line')) {
    return Grid;
  }
  if (slug.includes('monitoring') || normalizedTitle.includes('monitoring')) {
    return Activity;
  }

  return Compass;
};

const MASTER_IMAGE_POOL = [
  { src: '/images/subdivision-surveys.webp', alt: 'Subdivision Surveys' },
  { src: '/images/topographic-surveys.webp', alt: 'Topographic Surveys' },
  { src: '/images/3d-settlement-monitoring.webp', alt: '3D Settlement Monitoring' },
  { src: '/images/air-space-subdivision-surveys.webp', alt: 'Air Space Subdivision Surveys' },
  { src: '/images/bare-land-strata-surveys.webp', alt: 'Bare Land Strata Surveys' },
  { src: '/images/bc-land-surveyors-building-location-surveys.webp', alt: 'BC Land Surveyors Building Location Surveys' },
  { src: '/images/block-outline-surveys.webp', alt: 'Block Outline Surveys' },
  { src: '/images/boundary-surveys.webp', alt: 'Boundary Surveys' },
  { src: '/images/building-strata-surveys.webp', alt: 'Building Strata Surveys' },
  { src: '/images/consolidation-surveys.webp', alt: 'Consolidation Surveys' },
  { src: '/images/covenant-surveys.webp', alt: 'Covenant Surveys' },
  { src: '/images/easement-surveys.webp', alt: 'Easement Surveys' },
  { src: '/images/environmental-and-riparian-surveys.webp', alt: 'Environmental and Riparian Surveys' }
];

function getSeedFromKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  let currentSeed = seed;
  return function() {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
}

function getDeterministicImages(locationName: string, pool: { src: string; alt: string; caption?: string }[]): { src: string; alt: string; caption?: string }[] {
  const seed = getSeedFromKey(locationName);
  const random = seededRandom(seed);
  const clone = [...pool];
  
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  }
  
  return clone.slice(0, 3);
}

export interface HubProject {
  title: string;
  href: string;
  location?: string;
  completionDate?: string;
  heroImage?: string;
  description?: string;
}

export interface HubPost {
  title: string;
  href: string;
  publishDate?: string;
  description?: string;
  tags?: string[];
}

export interface HubTemplateProps {
  title: string;
  description: string;
  relatedServices?: HubService[];
  relatedProjects?: HubProject[];
  relatedPosts?: HubPost[];
  locationName: string;
  localAuthorityName?: string;
  municipalLink?: string;
  locationImages?: { src: string; alt: string; caption?: string }[];
  children?: ReactNode;
}

export default function HubTemplate({
  title,
  description,
  relatedServices = [],
  relatedProjects = [],
  relatedPosts = [],
  locationName,
  localAuthorityName,
  municipalLink,
  locationImages = [],
  children
}: HubTemplateProps) {
  const { locationSlug } = useParams<{ locationSlug?: string }>();
  const fallbackImage = "/images/Squamish-Garibaldi-Estates-Property-Survey.webp";
  const [heroSrc, setHeroSrc] = useState(locationImages[0]?.src || fallbackImage);

  useEffect(() => {
    setHeroSrc(locationImages[0]?.src || fallbackImage);
  }, [locationImages]);

  return (
    <PageShell>
      <SEO
        title={`${title} | Tantalus Geomatics Land Surveying`}
        description={description}
      />

      {/* Header / Hero Section */}
      <header className="bg-brand-dark border-b-2 border-brand-green py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt={`${locationName} Land Surveying`}
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(fallbackImage)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-brand-dark" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider border border-brand-green/20 mb-4">
            Local Service Provider
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
            {description}
          </p>
        </div>
      </header>

      {/* Optional Custom Content Section */}
      {children && (
        <section className="py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose-custom text-slate-800 font-light leading-relaxed
              [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-2
              [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-6 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
              [&>li]:pl-1
              [&>a]:text-brand-green-dark [&>a]:underline hover:[&>a]:text-brand-green [&>a]:font-medium [&>a]:transition-colors
              [&>blockquote]:border-l-4 [&>blockquote]:border-brand-green [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-6
              [&>strong]:font-semibold [&>strong]:text-slate-900
              [&>hr]:my-10 [&>hr]:border-slate-200"
            >
              {children}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Services
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Explore our professional surveying services tailored to {title.toLowerCase()}.
              </p>
            </div>

            {/* Deterministic 3-Image Sub-Gallery Row */}
            {locationName && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {getDeterministicImages(locationName, MASTER_IMAGE_POOL).map((image, idx) => (
                  <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={image.src}
                      alt={image.alt || `${locationName} Land Surveying`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-8">
              {SERVICE_CATEGORIES.map((category) => {
                const categoryServices = relatedServices.filter(service => {
                  const parts = service.href.split('/').filter(Boolean);
                  const slug = parts[parts.length - 1] || '';
                  return category.serviceSlugs.includes(slug);
                });

                if (categoryServices.length === 0) return null;

                const IconComponent = category.icon;

                return (
                  <div
                    key={category.id}
                    className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 flex flex-col justify-between w-full"
                  >
                    <div>
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green-dark">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {category.title}
                        </h3>
                      </div>

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
                        {categoryServices.map((service, idx) => {
                          const parts = service.href.split('/').filter(Boolean);
                          const serviceSlug = parts[parts.length - 1] || '';
                          const targetHref = locationSlug 
                            ? `/${locationSlug}/services/${serviceSlug}/` 
                            : `/services/${serviceSlug}/`;
                          return (
                            <Link
                              key={idx}
                              to={targetHref}
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
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Discover our real-world case studies and successful projects related to {title.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((project, index) => (
                <Link
                  key={index}
                  to={project.href}
                  className="flex flex-col md:flex-row bg-stone-100 border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-green hover:shadow-md transition-all group"
                >
                  {project.heroImage && (
                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden shrink-0">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                        {project.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-brand-green-dark" />
                            {project.location}
                          </span>
                        )}
                        {project.location && project.completionDate && <span>•</span>}
                        {project.completionDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-brand-green-dark" />
                            {project.completionDate}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-green-dark transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-brand-green-dark font-semibold text-sm group-hover:text-brand-green transition-colors mt-4">
                      <span>View Case Study</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insights & Resources Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Insights & Resources
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Read our latest articles, guides, and professional insights on {title.toLowerCase()}.
              </p>
            </div>

            <div className="space-y-6">
              {relatedPosts.map((post, index) => (
                <Link
                  key={index}
                  to={post.href}
                  className="block p-6 bg-stone-100 border border-slate-200 rounded-2xl hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {post.publishDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-brand-green-dark" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-medium border border-brand-green/20"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-brand-green-dark transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-brand-green-dark font-semibold text-sm group-hover:text-brand-green transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Municipal Resources Section */}
      {municipalLink && localAuthorityName && (
        <section className="py-16 md:py-24 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">Local Resources for {locationName}</h2>
            <p className="text-slate-600 font-light text-lg mb-8">Access official municipal planning guidelines and permit checklists directly from the local authority.</p>
            <a href={municipalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-slate-900 font-semibold rounded-full shadow-md">
              <Building2 size={20} />
              <span>View {localAuthorityName} Guidelines</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white border-t-2 border-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Need Professional Assistance with {title}?
          </h2>
          <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Our team of British Columbia Land Surveyors (BCLS) and Professional Engineers (P.Eng.) is ready to help guide your project to success. Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact/"
              className="px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all shadow-lg shadow-brand-green/20"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+16042139934"
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold rounded-full transition-all flex items-center gap-2"
            >
              <Phone size={18} /> Call (604) 213-9934
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
