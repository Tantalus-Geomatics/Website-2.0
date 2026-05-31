import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
  ExternalLink
} from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import LeadQuoteForm from '../components/LeadQuoteForm';
import { useLeadForm } from '../hooks/useLeadForm';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface LocalLink {
  label: string;
  href: string;
}

export interface ServiceTemplateProps {
  title: string;
  description: string;
  heroImage?: string;
  steps?: ProcessStep[];
  deliverables?: string[];
  faqs?: FAQItem[];
  localLinks?: LocalLink[];
  formVariant?: 'embedded' | 'stacked-residential';
  locationName?: string;
  localAuthorityName?: string;
  municipalLink?: string;
  children: ReactNode;
}

const HERO_FALLBACK = '/images/Squamish-Garibaldi-Estates-Property-Survey.webp';
const PHONE_TEL = 'tel:+16042139934';

const defaultSteps: ProcessStep[] = [
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

const defaultFaqs: FAQItem[] = [
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

const defaultLocalLinks: LocalLink[] = [
  { label: 'Survey Pricing & Cost Factors', href: '/survey-pricing/' },
  { label: 'Property Line Staking', href: '/sea-to-sky-property-line-and-boundary-staking/' },
  { label: 'Topographic Surveys', href: '/topographic-surveys/' }
];

export default function ServiceTemplate({
  title,
  description,
  heroImage = HERO_FALLBACK,
  steps = defaultSteps,
  deliverables = defaultDeliverables,
  faqs = defaultFaqs,
  localLinks = defaultLocalLinks,
  formVariant = 'embedded',
  locationName,
  localAuthorityName,
  municipalLink,
  children
}: ServiceTemplateProps) {
  const [heroSrc, setHeroSrc] = useState(heroImage);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const lead = useLeadForm();

  useEffect(() => {
    setHeroSrc(heroImage);
  }, [heroImage]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const stepIcons = [ClipboardList, MapPinned, FileCheck];

  return (
    <PageShell>
      <SEO
        title={`${title} | Tantalus Geomatics Land Surveying`}
        description={description}
      />

      {/* 1. Hero Banner */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt={title}
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(HERO_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/70 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <p className="text-sm sm:text-base text-brand-green font-semibold tracking-wider uppercase mb-4">
            Professional Land Surveying Services
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md max-w-3xl mx-auto font-light">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#quote-form"
              className="px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all shadow-lg shadow-brand-green/20"
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
      </section>

      {/* 2. Service Description & Value Proposition Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none prose-headings:font-light prose-p:font-light prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-brand-green-dark prose-a:underline hover:prose-a:text-brand-green transition-colors">
            {children}
          </div>

          {/* Value Proposition Callout */}
          <div className="mt-12 p-8 bg-slate-50 border-l-4 border-brand-green rounded-r-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Choose Tantalus Geomatics?</h3>
            <p className="text-slate-700 font-light leading-relaxed">
              Our team combines local Sea to Sky expertise with state-of-the-art surveying technology. We deliver highly accurate, BCLS-certified plans that streamline your municipal permit approvals and protect your property investments.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 3-Step Process Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mb-4">
              Our 3-Step Survey Process
            </h2>
            <GeoDirectAnswer
              align="center"
              question="How do we ensure accuracy and efficiency in our land surveying projects?"
            >
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                We follow a structured, transparent process to deliver precise results and keep your project on schedule.
              </p>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = stepIcons[index] || ClipboardList;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-brand-green/10" />
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green-dark mb-6">
                    <IconComponent size={24} />
                  </div>
                  <span className="text-xs font-semibold text-brand-green-dark uppercase tracking-wider">
                    Step 0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed text-sm">
                    {step.description}
                  </p>
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
              Deliverables We Offer
            </h2>
            <GeoDirectAnswer
              align="center"
              question="What professional documents and markers do you receive upon project completion?"
              questionClassName="text-white"
            >
              <p className="text-white/70 font-light max-w-2xl mx-auto">
                Every project concludes with a comprehensive package of certified documents and physical markers to meet all legal and municipal requirements.
              </p>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brand-green/30 transition-all">
                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {deliverable.split('(')[0].trim()}
                  </h3>
                  {deliverable.includes('(') && (
                    <p className="text-sm text-white/60 font-light">
                      {deliverable.substring(deliverable.indexOf('(') + 1, deliverable.indexOf(')'))}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
              <p className="text-slate-600 font-light">
                Have questions about timelines, pricing, or requirements? Find quick answers below.
              </p>
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
                    <span className="font-semibold text-slate-900 pr-4 flex items-center gap-3">
                      <HelpCircle size={18} className="text-brand-green-dark shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={20} className="text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-6 bg-white border-t border-slate-200">
                      <p className="text-slate-700 font-light leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Relevant Local Links Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
              Helpful Resources & Guides
            </h2>
            <GeoDirectAnswer
              align="center"
              question="Explore more land surveying resources and related services."
            >
              <p className="text-slate-600 font-light">
                Learn more about our pricing, boundary staking, and topographic site plans.
              </p>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {localLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-green hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-slate-800 group-hover:text-brand-green-dark transition-colors text-sm">
                  {link.label}
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-green-dark transition-all group-hover:translate-x-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Resources Section */}
      {municipalLink && localAuthorityName && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
              Local Resources {locationName ? `for ${locationName}` : ''}
            </h2>
            <GeoDirectAnswer
              align="center"
              question={`Where can you find official topographic and permit checklists for ${locationName || 'your municipality'}?`}
            >
              <p className="text-slate-600 font-light max-w-2xl mx-auto mb-8">
                Access official municipal planning guidelines, topographic requirements, and permit checklists directly from the local authority.
              </p>
            </GeoDirectAnswer>
            <div className="inline-block">
              <a
                href={municipalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                <Building2 size={18} className="text-brand-green" />
                <span>View {localAuthorityName} Guidelines</span>
                <ExternalLink size={16} className="text-white/70" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 7. Lead Quote Form Section */}
      <section id="quote-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 text-center">
            Request a Free Quote Today
          </h2>
          <GeoDirectAnswer
            align="center"
            question="What information do we need to start your survey quote today?"
          >
            <p className="text-center text-slate-700 font-light mb-10">
              Providing us with your name, property address, contact information, and project details allows us to start your quote right away.
            </p>
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
