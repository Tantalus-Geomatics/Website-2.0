import { useState } from 'react';
import { ClipboardList, MapPinned, FileCheck, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

const HERO_FALLBACK = 'images/tantalus-hero-banner.webp';
const PHONE_TEL = 'tel:+16042139934';

export default function Residential() {
  const [heroSrc, setHeroSrc] = useState(HERO_FALLBACK);
  const lead = useLeadForm();

  // Enhanced Schema for Local SEO E-E-A-T
  const residentialSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Residential Land Surveying',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Tantalus Geomatics Land Surveying Ltd.',
      'areaServed': ["Squamish", "Whistler", "Pemberton", "Lillooet", "West Vancouver", "Bowen Island","Brittania Beach","Furry Creek","North Vancouver"]
    },
    'description': 'Professional BCLS certified land surveys for homeowners in the Sea to Sky corridor. Specialized in property lines, topographic surveys, and building permits.',
    'url': 'https://tantalusgeomatics.com/residential',
  };

  const resourceTopics = [
    {
      title: 'Survey Costs & Pricing',
      description: 'Understand the factors that affect the cost of a residential survey in BC and how to request an accurate quote.',
      to: '/survey-pricing',
      linkLabel: 'View Pricing Factors →',
    },
    {
      title: 'Surveys vs. Title Insurance',
      description: 'Learn why a current BCLS survey plan is essential for construction and renovations compared to title insurance.',
      to: '/surveys-and-title-insurance',
      linkLabel: 'Compare Coverage →',
    },
    {
      title: 'Property Lines & Fencing',
      description: 'Expert guidance on boundary disputes, fence locations, and legal property line staking by a BC Land Surveyor.',
      to: '/sea-to-sky-property-line-staking',
      linkLabel: 'Learn About Boundaries →',
    },
    {
      title: 'Topographic Surveys for Permits',
      description: 'Detailed site plans and topographic data required for municipal building permits and architectural design.',
      to: '/topographic-surveys',
      linkLabel: 'Building Permit Surveys →',
    },
  ];

  return (
    <PageShell>
      <SEO
        title="Residential Land Surveyor Squamish & Whistler | Tantalus Geomatics"
        description="BCLS certified residential property surveys in Squamish, Whistler, and Pemberton. Get professional site plans, property line staking, and building permit surveys."
        canonicalUrl="https://tantalusgeomatics.com/residential"
        schema={residentialSchema}
      />

      {/* Hero - Keyword Optimized H1 */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt="Professional land surveying in the Sea to Sky corridor"
            className="w-full h-full object-cover opacity-55 mix-blend-overlay min-h-[420px]"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(HERO_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-brand-black/65 to-brand-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 sm:pt-28 sm:pb-20">
          <p className="text-sm sm:text-base text-brand-green font-medium tracking-wide uppercase mb-4">
            BCLS Certified Residential Services
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Residential Land Surveying in <span className="text-brand-green font-medium">Squamish & Whistler</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            From boundary markers to certified site plans, we provide the precision homeowners 
            and builders need for municipal compliance and peace of mind.
          </p>
        </div>
      </section>

      {/* 3-step process - Informational Value */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white text-center mb-4">
            Our Residential Survey Process
          </h2>
          <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
            We simplify the complexities of BC land laws to provide a straightforward path for your project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Project Consultation',
                body: "Contact us with your property details. We research Land Title records and provide a transparent project quote.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'On-Site Fieldwork',
                body: 'Our field crews visit your property using high-precision GPS and total station equipment to gather site data.',
                icon: MapPinned,
              },
              {
                step: '3',
                title: 'Certified BCLS Plan',
                body: 'You receive a legal survey plan signed by a BC Land Surveyor, recognized by municipalities and financial institutions.',
                icon: FileCheck,
              },
            ].map(({ step, title, body, icon: Icon }) => (
              <div
                key={step}
                className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-brand-green text-sm font-semibold tracking-wide mb-2 uppercase">
                  Step {step}
                </span>
                <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
                <p className="text-white/65 font-light leading-relaxed text-sm sm:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call now - Direct Conversion Point */}
      <section className="py-16 md:py-20 bg-brand-dark border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Speak with a Squamish Land Surveyor
          </h2>
          <p className="text-white/65 font-light mb-10 max-w-xl mx-auto">
            Discuss your property lines, fencing, or building permit requirements directly with our team.
          </p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg sm:text-xl font-semibold bg-brand-green hover:bg-brand-green-light text-black transition-all shadow-lg shadow-brand-green/20 min-w-[240px]"
          >
            <Phone className="h-6 w-6 shrink-0" aria-hidden />
            Call (604) 213 9934
          </a>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 text-center">
            Request a Residential Quote
          </h2>
          <p className="text-center text-white/60 font-light mb-10">
            Provide your property address and project details for a professional estimate.
          </p>

          <div className="bg-brand-dark p-8 md:p-10 border border-white/10">
            <LeadQuoteForm
              variant="stacked-residential"
              formId="residential-quote-form"
              ariaLabel="Residential quote request form"
              {...lead}
            />
          </div>
        </div>
      </section>

      {/* Resources - Option A: Filtered to only show active links */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-12">
            Land Surveying Resources for Homeowners
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resourceTopics.map((topic) => (
              // Option A: Only render the <li> if 'to' is present
              topic.to && (
                <li key={topic.title}>
                  <Link
                    to={topic.to}
                    className="block h-full w-full text-left p-6 bg-brand-black border border-white/10 hover:border-brand-green/40 transition-colors group"
                  >
                    <h3 className="text-lg font-medium text-white group-hover:text-brand-green transition-colors mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-white/55 font-light leading-relaxed">
                      {topic.description}
                    </p>
                    <span className="inline-block mt-4 text-xs text-brand-green uppercase tracking-wide">
                      {topic.linkLabel ?? 'Read more →'}
                    </span>
                  </Link>
                </li>
              )
            ))}
          </ul>

          <div className="text-center mt-12 text-sm text-white/45">
            <p className="mb-2">Need immediate assistance with a survey project?</p>
            <div className="flex justify-center gap-4">
              <Link to="/faq" className="text-brand-green hover:underline font-light">View All FAQs</Link>
              <span>|</span>
              <Link to="/contact" className="text-brand-green hover:underline font-light">Contact Our Office</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}