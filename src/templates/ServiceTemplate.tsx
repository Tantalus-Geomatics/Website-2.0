import { useState, useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowRight, 
  ClipboardList, 
  MapPinned, 
  FileCheck, 
  HelpCircle,
  Phone,
  Building2,
  ExternalLink,
  Image as ImageIcon,
  Maximize2,
  X,
  FileText
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../config/servicesStructure';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import LeadQuoteForm from '../components/LeadQuoteForm';
import { useLeadForm } from '../hooks/useLeadForm';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';

export interface LocalImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ServiceTemplateProps {
  title: string;
  description: string;
  serviceName: string;
  category?: string;
  heroImage?: string;
  heroImageAlt?: string;
  steps?: { title: string; description: string }[];
  deliverables?: string[];
  faqs?: { question: string; answer: string }[];
  serviceLinks?: { label: string; href: string }[];
  locationLinks?: { label: string; href: string }[];
  serviceImages?: LocalImage[];
  locationImages?: LocalImage[];
  formVariant?: 'embedded' | 'stacked-residential';
  locationName?: string;
  localAuthorityName?: string;
  municipalLink?: string;
  children: ReactNode;
}

const HERO_FALLBACK = '/images/Squamish-Garibaldi-Estates-Property-Survey.webp';
const PHONE_TEL = 'tel:+16042139934';

const defaultSteps: { title: string; description: string }[] = [
  {
    title: 'Consultation and Research',
    description: 'We review property records, LTSA plans, and municipal GIS data to understand your lot\'s context and regulatory requirements before arriving on-site.',
  },
  {
    title: 'On-Site Field Survey',
    description: 'Our crew uses high-precision robotic total stations and GPS equipment to measure and mark boundaries or capture detailed topographic data.',
  },
  {
    title: 'Drafting and Certification',
    description: 'We process the field data, draft professional plans, and provide certified BCLS documents tailored to your project requirements.',
  }
];

const defaultDeliverables: string[] = [
  'Certified BCLS Plan (PDF & Physical Copies)',
  'Digital CAD Files (DWG/DXF formats)',
  'On-Site Boundary Markers & Stakes',
  'Detailed Topographic Site Map'
];

const defaultFaqs: { question: string; answer: string }[] = [
  {
    question: 'How long does a typical survey take?',
    answer: 'Fieldwork usually takes 1-2 days, while research and drafting take another 1-2 weeks depending on the complexity of the property and the project requirements.'
  },
  {
    question: 'What is the difference between a survey and title insurance?',
    answer: 'A survey shows actual physical boundaries and improvements, while title insurance only covers financial loss from unknown defects. A survey is the only way to confirm where your property lines are.'
  },
  {
    question: 'Do I need to be home during the field survey?',
    answer: 'No, as long as our crew has clear access to your entire property and any boundary markers. We will coordinate access details with you beforehand.'
  }
];

const defaultServiceLinks: { label: string; href: string }[] = [
  { label: 'Survey Pricing & Cost Factors', href: '/survey-pricing/' },
  { label: 'Property Line Staking', href: '/sea-to-sky-property-line-and-boundary-staking/' },
  { label: 'Topographic Surveys', href: '/topographic-surveys/' }
];

const MASTER_IMAGE_POOL: LocalImage[] = [
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

function getDeterministicImages(serviceName: string, pool: LocalImage[]): LocalImage[] {
  const seed = getSeedFromKey(serviceName);
  const random = seededRandom(seed);
  const clone = [...pool];
  
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  }
  
  return clone.slice(0, 6);
}

function highlightLocation(text: string, locationName?: string): ReactNode {
  if (!text) return text;
  const targetLocation = locationName || 'the Sea to Sky';
  const cleanedText = text.replace(/\bSea To Sky\b/gi, 'the Sea to Sky');
  const parts = cleanedText.split(new RegExp(`(${targetLocation})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === targetLocation.toLowerCase() ? (
          <span key={index} className="text-brand-green-dark font-semibold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function ServiceTemplate({
  title,
  description,
  serviceName,
  category,
  heroImage = HERO_FALLBACK,
  heroImageAlt,
  steps = defaultSteps,
  deliverables = defaultDeliverables,
  faqs = defaultFaqs,
  serviceLinks = defaultServiceLinks,
  locationLinks,
  serviceImages = [],
  locationImages = [],
  formVariant = 'embedded',
  locationName,
  localAuthorityName,
  municipalLink,
  children
}: ServiceTemplateProps) {
  const [heroSrc, setHeroSrc] = useState(heroImage);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const lead = useLeadForm();

  useEffect(() => {
    setHeroSrc(heroImage);
  }, [heroImage]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const stepIcons = [ClipboardList, MapPinned, FileCheck];
  
  // Derive serviceName if not provided
  const derivedServiceName = serviceName || (
    title.includes('Topographic') ? 'Topographic Surveys' :
    title.includes('Property Line') ? 'Property Line Surveys' :
    title.includes('Subdivision') ? 'Subdivision Surveys' :
    title.replace(/<[^>]+>/g, '')
  );

  // Find category from prop or by searching SERVICE_CATEGORIES for serviceSlug
  const { serviceSlug, locationSlug } = useParams<{ serviceSlug?: string; locationSlug?: string }>();
  
  const currentCategory = SERVICE_CATEGORIES.find(cat => 
    (category && cat.id === category.toLowerCase()) || 
    (serviceSlug && cat.serviceSlugs.includes(serviceSlug))
  );

  const otherServices = currentCategory
    ? currentCategory.serviceSlugs.filter(slug => slug !== serviceSlug)
    : [];

  const getServiceLink = (slug: string) => {
    return locationSlug ? `/${locationSlug}/services/${slug}/` : `/services/${slug}/`;
  };

  const formatSlugToTitle = (slug: string): string => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace('Bcls', 'BCLS')
      .replace('3d', '3D')
      .replace('Uav', 'UAV')
      .replace('Lidar', 'LiDAR')
      .replace('And', '&');
  };

  // Extract a 1-phrase summary for the hero subtitle description dynamically.
  // If description contains periods, grab the first sentence string token and append a trailing period.
  const shortDescription = description.includes('.')
    ? description.split('.')[0].trim() + '.'
    : description;

  const uniqueCombinedPool: LocalImage[] = [];
  const seenSrcs = new Set<string>();
  [...serviceImages, ...locationImages, ...MASTER_IMAGE_POOL].forEach(img => {
    if (img && img.src && !seenSrcs.has(img.src)) {
      seenSrcs.add(img.src);
      uniqueCombinedPool.push(img);
    }
  });

  const galleryImages = getDeterministicImages(derivedServiceName, uniqueCombinedPool);

  const cleanTitle = title.replace(/\bSea To Sky\b/gi, 'the Sea to Sky');
  const cleanDescription = description.replace(/\bSea To Sky\b/gi, 'the Sea to Sky');

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": derivedServiceName,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Tantalus Geomatics Land Surveying Ltd.",
      "url": "https://www.tantalusgeomatics.com"
    },
    "areaServed": locationName || "Sea to Sky Corridor"
  };

  return (
    <PageShell>
      <SEO
        title={`${cleanTitle} | Tantalus Geomatics Land Surveying`}
        description={cleanDescription}
        schema={serviceSchema}
      />

      {/* 1. Hero Banner */}
      <header className="relative py-24 md:py-36 flex flex-col items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark w-full">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt={heroImageAlt || cleanTitle.replace(/<[^>]+>/g, '')}
            className="w-full h-full object-cover object-top opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(HERO_FALLBACK)}
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <span className="inline-block bg-brand-green/10 text-brand-green border border-brand-green/20 uppercase font-semibold text-xs rounded-full px-3 py-1 mb-6">
            Professional Land Surveying Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {derivedServiceName} in <span className="text-brand-green">{locationName || 'the Sea to Sky'}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md max-w-2xl mx-auto font-light mb-10">
            {highlightLocation(description, locationName || 'the Sea to Sky')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#quote-form"
              className="px-8 py-3 bg-brand-green hover:bg-brand-green-light text-slate-900 font-semibold rounded-full transition-all shadow-lg shadow-brand-green/20"
            >
              Request a Quote
            </a>
            <a
              href={PHONE_TEL}
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold rounded-full transition-all flex items-center gap-2"
            >
              <Phone size={18} /> Call (604) 213-9934
            </a>
          </div>
        </div>
      </header>

      {/* 2. Service Description & Value Proposition Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Typography for Readability */}
          <div className="prose-custom text-slate-800 font-light leading-relaxed flow-root
            [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-3
            [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-10 [&>h3]:mb-4
            [&>p]:mb-8 [&>p]:text-lg [&>p]:leading-relaxed
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-3 [&>ul]:text-lg
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:space-y-3 [&>ol]:text-lg
            [&>li]:pl-2
            [&>a]:text-brand-green-dark [&>a]:underline hover:[&>a]:text-brand-green [&>a]:font-medium [&>a]:transition-colors
            [&>blockquote]:bg-stone-50 [&>blockquote]:py-4 [&>blockquote]:pr-4 [&>blockquote]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-green [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-8 [&>blockquote]:text-lg
            [&>strong]:font-semibold [&>strong]:text-slate-900
            [&>hr]:my-12 [&>hr]:border-slate-200"
          >
            {children}
          </div>

          {/* Value Proposition Callout */}
          <div className="mt-16 p-8 bg-stone-100 border-l-4 border-brand-green rounded-r-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Choose Tantalus Geomatics?</h3>
            <p className="text-slate-700 text-lg font-light leading-relaxed">
              Our team combines {locationName ? `local ${locationName} expertise` : 'expertise in the Sea to Sky'} with state-of-the-art surveying technology. We deliver highly accurate, BCLS-certified plans that streamline your municipal permit approvals and protect your property investments.
            </p>
          </div>
        </div>
      </section>

      {/* Category Cross-Linking Section */}
      {currentCategory && otherServices.length > 0 && (
        <section className="py-16 bg-stone-50 border-t border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-8 text-center">
              Other {currentCategory.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherServices.map((slug) => (
                <Link
                  key={slug}
                  to={getServiceLink(slug)}
                  className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-green hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-800 group-hover:text-brand-green-dark transition-colors text-base">
                    {formatSlugToTitle(slug)}
                  </span>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-green-dark transition-all group-hover:translate-x-1 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. 3-Step Process Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mb-4 text-center">
              Our {derivedServiceName} Process in {locationName || 'the Sea to Sky'}
            </h2>
            <GeoDirectAnswer
              align="center"
              question="How do we ensure accuracy and efficiency in our land surveying projects?"
            >
              <div className="text-slate-600 font-light text-lg max-w-2xl mx-auto">
                We follow a structured, transparent process to deliver precise results and keep your project on schedule.
              </div>
            </GeoDirectAnswer>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, index) => {
              const IconComponent = stepIcons[index] || ClipboardList;
              return (
                <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center group">
                  <div className="w-16 h-16 shrink-0 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green-dark group-hover:bg-brand-green/20 transition-colors">
                    <IconComponent size={32} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-brand-green-dark uppercase tracking-wider block mb-2">
                      Step 0{index + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed text-base md:text-lg">
                      {highlightLocation(step.description, locationName || 'the Sea to Sky')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Deliverables We Offer Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white border-b-2 border-brand-green">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              What professional documents and markers do you receive upon project completion?
            </h2>
            <GeoDirectAnswer
              align="center"
              question="What professional documents and markers do you receive upon project completion?"
              questionClassName="text-white"
            >
              <div className="text-white/70 font-light text-lg max-w-2xl mx-auto">
                Every project concludes with a comprehensive package of certified documents and physical markers to meet all legal and municipal requirements.
              </div>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => {
              // Parse titles and descriptions based on colons or parenthesis fallbacks
              let titlePart = deliverable;
              let descPart = '';
              
              if (deliverable.includes(':')) {
                const colonIndex = deliverable.indexOf(':');
                titlePart = deliverable.substring(0, colonIndex).trim();
                descPart = deliverable.substring(colonIndex + 1).trim();
              } else if (deliverable.includes('(')) {
                const parenIndex = deliverable.indexOf('(');
                titlePart = deliverable.substring(0, parenIndex).trim();
                let rawDesc = deliverable.substring(parenIndex + 1).trim();
                if (rawDesc.endsWith(')')) {
                  rawDesc = rawDesc.substring(0, rawDesc.length - 1).trim();
                }
                descPart = rawDesc;
              }

              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brand-green/40 hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 mt-0.5 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {titlePart}
                    </h3>
                    {descPart && (
                      <p className="text-sm text-white/60 font-light">
                        {descPart}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <GeoDirectAnswer
              align="center"
              question="Get answers to common questions about our land surveying services."
            >
              <div className="text-slate-600 font-light text-lg">
                Have questions about timelines, pricing, or requirements? Find quick answers below.
              </div>
            </GeoDirectAnswer>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-slate-100/70 transition-all"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900 pr-4 flex items-center gap-3 text-lg">
                      <HelpCircle size={20} className="text-brand-green-dark shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={24} className="text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown size={24} className="text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-6 bg-white border-t border-slate-200">
                      <p className="text-slate-700 font-light leading-relaxed text-base">
                        {highlightLocation(faq.answer, locationName || 'the Sea to Sky')}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Resources Section */}
      {serviceLinks && serviceLinks.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
                {serviceName || derivedServiceName} Resources & Guides
              </h2>
              <GeoDirectAnswer
                align="center"
                question={`Explore more resources and guides for ${derivedServiceName}.`}
              >
                <div className="text-slate-600 font-light text-lg">
                  Learn more about our pricing, boundary staking, and topographic site plans.
                </div>
              </GeoDirectAnswer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {serviceLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-green hover:shadow-sm transition-all group"
                >
                  <span className="font-medium text-slate-800 group-hover:text-brand-green-dark transition-colors text-base">
                    {link.label}
                  </span>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-green-dark transition-all group-hover:translate-x-1 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Resources Section */}
      {((municipalLink && localAuthorityName) || (locationLinks && locationLinks.length > 0)) && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
              Local Resources for {locationName || 'the Sea to Sky'}
            </h2>
            <GeoDirectAnswer
              align="center"
              question={`Where can you find official topographic and permit checklists for ${locationName || 'your municipality'}?`}
            >
              <div className="text-slate-600 font-light text-lg max-w-2xl mx-auto mb-10">
                Access official municipal planning guidelines, topographic requirements, and permit checklists directly from the local authority.
              </div>
            </GeoDirectAnswer>
            
            {/* Location Links Grid */}
            <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {municipalLink && localAuthorityName && (
                <a
                  href={municipalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-200 text-slate-800 hover:shadow-md rounded-lg p-4 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center">
                    <FileText className="text-brand-green w-5 h-5 mr-3 shrink-0" />
                    <span className="font-medium">View {localAuthorityName} Guidelines</span>
                  </div>
                  <ArrowRight className="text-slate-400 w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              {locationLinks && locationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="bg-white border border-slate-200 text-slate-800 hover:shadow-md rounded-lg p-4 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center">
                    <FileText className="text-brand-green w-5 h-5 mr-3 shrink-0" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ArrowRight className="text-slate-400 w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Responsive Image Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-brand-green-dark uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
                <ImageIcon size={14} />
                Visual Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900">
                Service Gallery
              </h2>
              <p className="text-slate-600 font-light text-sm max-w-xl mx-auto mt-2">
                Field photos, survey plans, and technical captures from our projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(image.src)}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-brand-green transition-all cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt || `${title.replace(/<[^>]+>/g, '')} gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Enlarged gallery view"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* 7. Lead Quote Form Section */}
      <section id="quote-form" className="py-16 md:py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 text-center">
            Request a Free Quote Today
          </h2>
          <GeoDirectAnswer
            align="center"
            question="What information do we need to start your survey quote today?"
          >
            <div className="text-center text-slate-700 font-light text-lg mb-10">
              Providing us with your name, property address, contact information, and project details allows us to start your quote right away.
            </div>
          </GeoDirectAnswer>

          <div className="bg-brand-dark p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl">
            <LeadQuoteForm
              variant={formVariant}
              formId="service-quote-form"
              ariaLabel="Service quote request form"
              {...lead}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
