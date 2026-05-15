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
    description: 'The cost of land surveying in BC is linked to the province\'s rigorous regulatory framework focused on protection of the public interest. The Association of BC Land Surveyors (ABCLS) enforces strict rules and standards on all activities carried out by a BC Land Surveyor. A British Columbia Land Surveyor (BCLS) cannot "cut corners" to lower a price; they are legally bound to follow a prescribed process of due dilligence, field investigation, and documentation.',
  },
  {
    factor: 'Professional Judgement and Liability',
    description: 'Consumers often view the land Surveyor as a technician whose primary output is a wooden stake, rather than a legal professional whose primary output is a defensible opinion on the extent of property ownership. In British Columbia, the surveyor\'s liability is a financial risk that is increased due to high property values. You are paying for the transfer of legal liability and the peace of mind that the survey is accurate.',
  },
  {
    factor: 'Historical Evidence Recovery',
    description: 'Modern surveyors are required to accurately locate boundaries that were surveyed prior to modern standards. This often involves searching for original 19th-century monuments that defined the parcel\'s boundaries. When an original monument is missing, the surveyor must "re-trace" the work of the original surveyor, potentially extending their research kilometers away from the subject property to find the best available evidence of the corner\'s original location.',
  },
  {
    factor: 'Site Conditions, Terrain Challenges & Parcel Size',
    description: 'The level of effort of a land survey often reflects the unique physical and historical characteristics of a property. While the "per-acre" cost for large tracts—such as a 100-acre rural parcel—may be lower, the total project cost scales with travel time, site conditions, and the extent of the boundary lines requiring verification. Across British Columbia, crews must frequently navigate steep slopes, dense forests, and marshy terrain that directly impact the level of effort. Often, the labor required for "clearing line", involving physically clearing a path through vegetation to establish a line-of-sight, can exceed the time spent on the actual surveying measurements. In contrast, small urban lots in high-density areas like the Lower Mainland present their own complexities, including physical obstructions, traffic control requirements, and the high precision needed to navigate a dense network of underground utilities.'
  },
  {
    factor: 'Technological Overhead & Innovation',
    description: 'Modern land surveying in British Columbia is characterized by advanced geospatial technologies designed to ensure precision in the province\'s challenging terrain. Modern technologies, such as drone-based laser scanning for penetrating dense forest canopies, robotic total stations for high-efficiency field work, and multi-constellation GNSS receivers for mountain valleys yields increased accuracy and faster project timelines. This technology introduces significant capital costs that firms must recover, in addition to high insurance premiums and the need for specialized data processing software.'
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
            Understanding The Cost of a Land Survey
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Investing in Legal Certainty.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            A land survey in British Columbia should be viewed as a critical legal safeguard. Understand the site conditions, professional liability, historical research, expensive measurement instruments and terrain challenges that impact your project's quote.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call for a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* The Core Cost Drivers */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GeoDirectAnswer
            question="What factors impact the cost of a land survey in British Columbia?"
            questionClassName="max-w-3xl"
          >
            <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">
              "A land survey in British Columbia is the best insurance policy for your most valuable asset."
            </blockquote>
            <p className="text-white/65 font-light mb-10 max-w-3xl">
              Unlike many other home services where a flat fee can be easily calculated, land surveying is subject to an extraordinary number of variables. Your quote reflects the level of effort, judgement and liability involved in satisfying our ethical obligation to protect the public interest and the survey fabric.
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
              Because no two properties share the same legal history or terrain, we cannot provide a price without first performing significant preliminary research. Our three-step quoting process ensures transparency and ethical compliance.
            </p>
          </GeoDirectAnswer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Statutory Research & Title Review',
                body: 'We begin by searching the LTSA\'s records for your property\'s title, relevant plans and charge documents. Depending on the type of survey, additional research may be required such as municipal permitting requirements, zoning bylaws, provincial application requirements, and utility records to confirm the scope of work required to meet your project'/'s needs.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Terrain & Evidence Assessment',
                body: 'The physical difficulty of a site directly impacts the amount of on-site time required to complete the survey. We assess topography, the size of the site, line-of-sight and the full scope of the site features we to survey.',
                icon: Trees,
              },
              {
                step: '3',
                title: 'Regulatory Deliverable Definition',
                body: 'We determine the plans and datasets you need to move your project forward. For example, the Land Title Act mandates that whenever a BCLS sets or restores a legal boundary marker, they must file a Posting Plan in the Land Title Office.',
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