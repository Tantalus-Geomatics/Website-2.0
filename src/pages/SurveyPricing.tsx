import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  ClipboardList, 
  MapPinned, 
  FileCheck, 
  Phone, 
  Scale, 
  Search, 
  ShieldAlert, 
  Trees 
} from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';

const CANONICAL = 'https://www.tantalusgeomatics.com/survey-pricing';

const priceFactors = [
  {
    factor: 'Rigorous Regulatory Framework',
    description: 'The high cost of surveying in BC is inextricably linked to the province\'s rigorous regulatory environment[cite: 37]. The Association of BC Land Surveyors (ABCLS) enforces strict Survey and Plan Rules[cite: 45]. A British Columbia Land Surveyor (BCLS) cannot "cut corners" to lower a price; they are legally bound to follow a prescribed process of evidence recovery and verification[cite: 46, 47].',
  },
  {
    factor: 'Professional Liability & Risk Assumption',
    description: 'Consumers often view the surveyor as a technician whose primary output is a wooden stake, rather than a legal professional whose primary output is a defensible opinion on the extent of property ownership[cite: 24]. In British Columbia, the surveyor\'s liability is a quantifiable financial risk scaled by high property values[cite: 67, 68]. You are paying for the transfer of legal liability and the protection of your equity.',
  },
  {
    factor: 'Historical Evidence Recovery',
    description: 'Modern surveyors are often required to perform "evidence recovery," which involves searching for original 19th-century monuments[cite: 88]. If a primary monument is missing, the surveyor must "re-trace" the work of the original surveyor, often extending their research blocks or miles away from the subject property to find a reliable starting point[cite: 89, 138].',
  },
];

export default function SurveyPricing() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${CANONICAL}/#webpage`,
    'url': CANONICAL,
    'name': 'Land Survey Pricing & Cost Factors | Tantalus Geomatics',
    'description': 'Understand the professional, legal, and environmental factors that determine the cost of residential and rural land surveys in British Columbia.',
    'isPartOf': {
      '@id': 'https://tantalusgeomatics.com/#website'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://tantalusgeomatics.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Survey Pricing'
        }
      ]
    },
    'mainEntity': {
      '@type': 'Service',
      'name': 'Land Survey Pricing Estimates',
      'serviceType': 'Land Surveying',
      'provider': {
        '@id': 'https://tantalusgeomatics.com/#organization'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Squamish' },
        { '@type': 'City', 'name': 'Whistler' },
        { '@type': 'City', 'name': 'Pemberton' },
        { '@type': 'City', 'name': 'Lillooet' },
        { '@type': 'City', 'name': 'West Vancouver' },
        { '@type': 'City', 'name': 'Bowen Island' },
        { '@type': 'City', 'name': 'Britannia Beach' },
        { '@type': 'City', 'name': 'Furry Creek' },
        { '@type': 'City', 'name': 'North Vancouver' }
      ]
    }
  };
  
  return (
    <PageShell>
      <SEO
        title="Land Survey Pricing & Cost Factors in BC"
        description="Learn the legal, historical, and topographical factors that influence land survey costs in BC. Transparent pricing insights from a Licensed BC Land Surveyor."
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Professional Surveying in BC"
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/70 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            The Economics of Boundary Definition
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            An Investment in Legal Certainty.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            A land survey in British Columbia should be viewed not as a commodity purchase, but as a critical legal safeguard[cite: 174]. Understand the professional liability, historical research, and rigorous terrain evaluation that forms the true foundation of your project quote.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Request a Bespoke Quote
            </a>
          </div>
        </div>
      </section>

      {/* The Core Cost Drivers */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GeoDirectAnswer
            question="What factors legally and economically drive the cost of a residential land survey in British Columbia?"
            questionClassName="max-w-3xl"
          >
            <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">
              "The professional opinion of a BCLS remains the only reliable safeguard against the spiraling costs and delays of boundary litigation." [cite: 175]
            </blockquote>
            <p className="text-white/65 font-light mb-10 max-w-3xl">
              Unlike many other home services where a flat fee can be easily calculated, land surveying is subject to an extraordinary number of variables that make preliminary quoting difficult[cite: 13]. Your quote reflects our ethical obligation to protect the public interest and the survey fabric[cite: 278].
            </p>
          </GeoDirectAnswer>
          <div className="space-y-6">
            {priceFactors.map((item) => (
              <div
                key={item.factor}
                className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)]"
              >
                <p className="text-brand-green font-medium mb-2 flex items-center gap-2">
                  <ShieldAlert size={18} />
                  {item.factor}
                </p>
                <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Quoting Process */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            How We Calculate Your Quote
          </h2>
          <GeoDirectAnswer
            align="center"
            question="What is the professional process for determining an accurate land surveying quote in BC?"
          >
            <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
              Because no two properties share the exact same legal history or terrain, we cannot provide an exact price without first performing significant preliminary research[cite: 14]. Our three-step quoting process ensures transparency and ethical compliance.
            </p>
          </GeoDirectAnswer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Statutory Research & Title Review',
                body: 'We begin by searching the LTSA\'s records for your property\'s original Crown Grants, field notes, and adjacent plans[cite: 135]. In BC, a boundary is defined not just by your deed, but by the relationship to all neighboring surveys[cite: 136]. Providing your "Chain of Title" upfront can significantly streamline this phase[cite: 156, 157].',
                icon: Search,
              },
              {
                step: '2',
                title: 'Terrain & Evidence Assessment',
                body: 'The physical difficulty of a site directly impacts the man-hours required[cite: 79]. We assess topography, urban obstructions, and whether a site requires extensive physical labor, such as "brushing" a line to clear vegetation for line-of-sight measurements[cite: 83].',
                icon: Trees,
              },
              {
                step: '3',
                title: 'Regulatory Deliverable Definition',
                body: 'We determine the required statutory documents based on your goals. For instance, the Land Title Act mandates that whenever a BCLS sets or restores a legal boundary marker, they must file a Posting Plan in the Land Title Office[cite: 32]. We quote strictly for what is legally required to safely advance your project.',
                icon: Scale,
              },
            ].map(({ step, title, body, icon: Icon }) => (
              <div
                key={step}
                className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
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
      
      {/* Case Study Section: Suburban vs Rural */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-3">
              Comparative Analysis
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
              Case Study: Suburban Squamish Lot vs. Paradise Valley Acreage
            </h2>
            <GeoDirectAnswer
              align="center"
              question="How do terrain, property size, and legal constraints affect the level of effort between a small suburban lot and a large rural parcel?"
            >
              <p className="text-white/65 font-light leading-relaxed">
                A survey is not a "commodity" but a response to specific terrain, history, and legal fabric[cite: 77]. To illustrate the vast spectrum of surveying efforts, we compare the requirements for a compact parcel on Newport Road to a complex 68.6-hectare parcel in Paradise Valley.
              </p>
            </GeoDirectAnswer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Suburban Case Study */}
            <div className="bg-brand-dark border border-white/10 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src="images/image_33b865.png" alt="Suburban Lot on Newport Rd" className="object-cover w-full h-full opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-xl font-medium text-white">Small Suburban Lot (Squamish)</h3>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <p className="text-brand-green text-sm font-semibold tracking-wide mb-4">Newport Road Residential</p>
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-white/90 font-medium mb-2">Legal Boundary Survey Effort</h4>
                    <p className="text-white/65 font-light text-sm leading-relaxed">
                      While small in acreage, suburban surveys are rarely simple. The dense development means property pins are frequently destroyed by past fence or landscaping work. To legally re-establish a single corner, our crews often must traverse multiple adjacent blocks to locate undisturbed monuments[cite: 138]. Furthermore, the proximity to neighboring structures dramatically increases the liability risk, demanding centimeter-level precision to prevent costly encroachment disputes[cite: 69, 70].
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium mb-2">Topographic Survey Effort</h4>
                    <p className="text-white/65 font-light text-sm leading-relaxed">
                      In an urban environment, topographic mapping must account for complex utility networks, tight municipal setbacks, and significant tree protection bylaws. While the physical area mapped is smaller, the density of required data points per square meter is exceptionally high.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rural Case Study */}
            <div className="bg-brand-dark border border-white/10 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src="images/image_33b86c.png" alt="Paradise Valley Rural Lot" className="object-cover w-full h-full opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-xl font-medium text-white">68.6 Hectare Rural Lot (Paradise Valley)</h3>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <p className="text-brand-green text-sm font-semibold tracking-wide mb-4">Reference Plan BCP39687</p>
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-white/90 font-medium mb-2">Legal Boundary Survey Effort</h4>
                    <p className="text-white/65 font-light text-sm leading-relaxed">
                      Surveying a macro-scale 68.6ha parcel (District Lots 1519 & 1250) represents a massive undertaking[cite: 81, 309]. Legally, this site is heavily encumbered, requiring the definition of intersecting boundaries including the Cheakamus River's natural boundary [cite: 313], a CN Rail right of way [cite: 309], and a BC Hydro statutory right of way[cite: 352]. Physically, crews must navigate steep terrain and dense forests, investing heavily in labor to clear vegetation[cite: 82, 83]. Historical research is also paramount, often tracing back to 19th-century Crown Grants[cite: 86].
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium mb-2">Topographic Survey Effort</h4>
                    <p className="text-white/65 font-light text-sm leading-relaxed">
                      A topographic survey of this magnitude mandates the integration of advanced Remote Sensing. We utilize drone-based LiDAR to penetrate the dense forest canopy and map the ground surface[cite: 106, 107]. This mitigates weeks of manual field labor, although the sheer scale of data processing and the high capital cost of equipment heavily factor into the project's economics[cite: 113]. Throughout this, utmost care is taken to protect the environment during field activities[cite: 292].
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-green/15 via-brand-black to-brand-black border-t border-brand-green/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-green/50 bg-brand-dark mb-6">
            <ClipboardList className="w-7 h-7 text-brand-green" aria-hidden />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Protect Your Investment with Professional Certainty
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            At Tantalus Geomatics, we do not compete on generating the lowest quote; we compete on delivering unimpeachable accuracy, ethical compliance, and long-term risk mitigation for our clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg"
            >
              Submit Property Details for a Quote
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}