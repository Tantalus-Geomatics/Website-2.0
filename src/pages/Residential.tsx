import { useState } from 'react';
import { ClipboardList, MapPinned, FileCheck, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';
import { useLeadForm } from '../hooks/useLeadForm';

const HERO_FALLBACK = 'images/Squamish-Garibaldi-Estates-Property-Survey.webp';
const PHONE_TEL = 'tel:+16042139934';

export default function Residential() {
  const [heroSrc, setHeroSrc] = useState(HERO_FALLBACK);
  const lead = useLeadForm();

// Array of locations based on your input
const serviceAreas = [
  "Squamish", "Whistler", "Pemberton", "Lillooet", 
  "West Vancouver", "Bowen Island", "Britannia Beach", 
  "Furry Creek", "North Vancouver"
];

// Enhanced Schema for Local SEO E-E-A-T
const residentialSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://tantalusgeomatics.com/residential/#service',
  'name': 'Residential Land Surveying',
  'serviceType': 'Land Surveying',
  'provider': {
    '@type': 'LocalBusiness',
    '@id': 'https://tantalusgeomatics.com/#organization',
    'name': 'Tantalus Geomatics Land Surveying Ltd.',
    'areaServed': serviceAreas.map(area => ({
      '@type': 'City',
      'name': area
    }))
  },
  'areaServed': serviceAreas.map(area => ({
    '@type': 'City',
    'name': area
  })),
  'description': 'Professional BCLS certified land surveys for homeowners in the Sea to Sky corridor. Specialized in property lines, topographic surveys, and building permits.',
  'url': 'https://tantalusgeomatics.com/residential/',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Residential Surveying Services',
    'itemListElement': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Property Line Staking' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Topographic Site Plans' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Building Location Certificates' } }
    ]
  }
};

  const resourceTopics = [
    {
      title: 'Survey Costs & Pricing',
      description: 'Understand the factors that affect the cost of a survey in British Columbia and how to request an accurate quote.',
      to: '/survey-pricing/',
      linkLabel: 'View Pricing Factors →',
    },
    {
      title: 'Surveys vs. Title Insurance',
      description: 'Learn why title insurance isn\'t a replacement for a current building location survey prior to a real estate transaction.',
      to: '/surveys-and-title-insurance/',
      linkLabel: 'Compare Coverage →',
    },
    {
      title: 'Property Lines & Fencing',
      description: 'Expert guidance on boundary disputes, fence locations, and legal property line staking by a BC Land Surveyor.',
      to: '/sea-to-sky-property-line-staking/',
      linkLabel: 'Learn About Boundaries →',
    },
    {
      title: 'Topographic Surveys for Permits',
      description: 'Detailed site plans and topographic data required for municipal building permits and architectural design.',
      to: '/topographic-surveys/',
      linkLabel: 'Building Permit Surveys →',
    },
  ];

  return (
    <PageShell>
      <SEO
        title="Residential Land Surveying Services in British Columbia | Tantalus Geomatics"
        description="Get BC Land Surveyor certified topographic surveys, site plans, property line marking, and building location certificates."
        canonicalUrl="https://tantalusgeomatics.com/residential/"
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
            Certified Land Surveys for Property Owners
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Residential Land Surveying in <span className="text-brand-green font-medium">British Columbia</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            From boundary markers to site plans, a certified land survey offers homeowners and builders the services and documents they need for municipal permits and peace of mind.
          </p>
        </div>
      </section>

      {/* 3-step process - Informational Value */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white text-center mb-4">
            Our Residential Survey Process
          </h2>
          <GeoDirectAnswer
            align="center"
            question="How does Tantalus Geomatics Land Surveying conduct residential survey projects to support owners in British Columbia?"
          >
            <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
              We offer a clear and simple 3-step approach to completing residential land surveys in a timely and professional manner.
            </p>
          </GeoDirectAnswer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Consultation and Research',
                body: "Contact us with your property details. We research existing survey and land title records, in addition to the regulatory requirements that affect your project. We pull the original land titles and survey plans from the Land Title and Survey Authority of BC (LTSA), in addition to studying up to date satellite imagery and municipal Geospatial Information Systems. This allows us to confirm the context of your lot and the surrounding properties before we arrive on-site.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'Field Visit',
                body: 'Our crew visits your property to perform a field survey. We search for original property corner posts and use professional-grade equipment to take precise measurements and accurately place markers as required by your project. Our use of modern technologies, such as robotic total stations, GPS, drones and laser scanners allows us to efficiently survey large tracts of land.',
                icon: MapPinned,
              },
              {
                step: '3',
                title: 'Certified survey plan',
                body: 'After the field work, we process the data and draft a certified survey plan that matches the needs of your project. This plan is certified by a British Columbia Land Surveyor (BCLS). This is a legally recognized survey document that can support a number of uses, such as building permit applications, tree removal and fence construction.',
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
            Speak with a Land Surveyor Today
          </h2>
          <GeoDirectAnswer question="When should you call Tantalus Geomatics Land Surveying to discuss your residential survey requirements?">
            <p className="text-white/65 font-light mb-10 max-w-xl mx-auto">
              Getting a land survey can be a confusing and overwhelming process for property owners. Questions about <Link to="/survey-pricing/" className="underline hover:text-white">Survey Costs</Link>, <Link to="/sea-to-sky-property-line-and-boundary-staking/" className="underline hover:text-white">Property Lines</Link>, and <Link to="/topographic-surveys/" className="underline hover:text-white">Permit Application Processes</Link> are very common. We are here to help. Call us today to speak directly with our team.
            </p>
          </GeoDirectAnswer>
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
            Request a Free Quote Today
          </h2>
          <GeoDirectAnswer align="center" question="What information do we need to start your survey quote today?">
            <p className="text-center text-white/60 font-light mb-10">
              Providing us with your name, property address, contact information and project details allows us to start your quote right away.
            </p>
          </GeoDirectAnswer>

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
          <GeoDirectAnswer
            align="center"
            question="Where can homeowners find more guidance on survey pricing, title insurance vs a building location survey, property boundaries, and permit surveys?"
            questionClassName="mb-10"
          >
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
          </GeoDirectAnswer>

          <div className="text-center mt-12 text-sm text-white/45">
            <p className="mb-2">Need immediate assistance with a survey project?</p>
            <div className="flex justify-center gap-4">
              <Link to="/faq/" className="text-brand-green hover:underline font-light">View All FAQs</Link>
              <span>|</span>
              <Link to="/contact/" className="text-brand-green hover:underline font-light">Contact Our Office</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}