import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ClipboardList, MapPinned, FileCheck, Phone, ShieldAlert, Scale, Search, ShieldCheck } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

const CANONICAL = 'https://tantalusgeomatics.com/surveys-and-title-insurance';

const problems = [
  {
    problem: 'Hidden Encroachments and Boundary Issues',
    description: 'Title insurance does not provide any information about the location of buildings, improvements, easements, rights of way, covenants and other interests in relation to the property boundaries to an owner or lender.',
  },
  {
    problem: 'Incomplete Coverage and Hidden Costs',
    description: 'It requires separate policies to protect the owner and the lender. It may not, except at added cost, protect anything but the amount of the mortgage, leaving the remaining cost of resolving problems to the owner.',
  },
  {
    problem: 'Temporary Lender Protection',
    description: 'Where the policy is a lender policy, it is only in effect as long as that lender has an interest in the property.',
  },
];

export default function SurveyTitleInsurance() {
    // Enhanced Schema connecting the educational guide to your LocalBusiness entity
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${CANONICAL}/#webpage`,
      'url': CANONICAL,
      'name': 'Building Location Surveys vs. Title Insurance in BC | Tantalus Geomatics',
      'description': 'Understand the benefits of a land survey in addition to mortgage insurance when buying or selling a property in British Columbia.',
      'isPartOf': {
        '@id': 'https://tantalusgeomatics.com/#website'
      },
      'about': [
        { '@type': 'Thing', 'name': 'Title Insurance' },
        { '@type': 'Thing', 'name': 'Land Surveying' },
        { '@type': 'Thing', 'name': 'Real Estate' }
      ],
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
            'name': 'Residential Surveys',
            'item': 'https://tantalusgeomatics.com/residential'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Surveys vs. Title Insurance'
          }
        ]
      },
      'provider': {
        '@id': 'https://tantalusgeomatics.com/#organization'
      }
    };

  return (
    <PageShell>
      <SEO
        title="Building Location Surveys vs. Title Insurance | Tantalus Geomatics"
        description="Learn why a Building Location Certificate is crucial when buying real estate in BC, and how it complements title insurance for full protection."
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/Squamish-Garibaldi-Estates-Property-Survey.webp"
            alt="Surveying equipment on a residential property"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            BC Real Estate Investments
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Title Insurance is Not a Replacement for a Legal Land Survey.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Significant financial commitments should not be made without full knowledge of all relevant facts, potential liabilities and inherent risks in the venture.
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

      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">A current survey effectively discloses problems, should they exist, to all interested parties who can then take appropriate action for resolution.</blockquote>
          <p className="text-white/65 font-light mb-10 max-w-3xl">
            Purchasers are being advised that the cost of a survey can be avoided by the purchase, at a lower cost, of title insurance. The inference is that title insurance offers greater value at a lower cost, but this is unfortunate:
          </p>
          <div className="space-y-6">
            {problems.map((item) => (
              <div
                key={item.problem}
                className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)]"
              >
                <p className="text-brand-green font-medium mb-2">
                  {item.problem}
                </p>
                <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg shadow-brand-green/15"
            >
              Contact Us Today to Start with Confidence
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 3-step process / Benefits */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            The Benefits of a Building Location Survey
          </h2>
          <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
            Building Location Surveys have been widely and commonly used for over forty years in BC. The document is certified correct by a BC Land Surveyor and forms an integral part of a real estate transaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Visual Clarity & Accuracy',
                body: "Based on an actual site inspection and measurements by qualified personnel. It is simple to read and understand, providing a plan view of your property according to the legal description.",
                icon: MapPinned,
              },
              {
                step: '2',
                title: 'Immediate Disclosure',
                body: 'Provides a clear depiction of any problems relating to encroachments or building locations that may need to be resolved before completing a purchase.',
                icon: Search,
              },
              {
                step: '3',
                title: 'Long-term Planning Value',
                body: 'They retain a lasting usefulness to the property owner as both a record of the state of the property and as a planning tool for building additions or determining subdivision possibilities.',
                icon: ClipboardList,
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
                  Benefit {step}
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

      {/* Image placeholder */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-video flex items-center justify-center">
            <img alt="BCLS Building Location Certificate Document" className="object-cover h-full w-full border border-white/10 duration-500" referrerPolicy="no-referrer" src="images/old-home.webp"/>
          </div>
        </div>
      </section>
      
      {/* Case Study / Complementary Approach Section */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-3">
              A Complementary Approach
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
              British Columbia's Land Title System
            </h2>
            <p className="text-white/65 font-light leading-relaxed">
              The Land Title system in BC guarantees title against fraud through a legislated publicly funded insurance program, known as the Assurance Fund. While lender and/or purchaser insurance may well have a place in complex transactions, it should be viewed as complementary to the traditional process, rather than as an alternative.
            </p>
          </div>

          {/* Three Things to Consider Box */}
          <div className="max-w-4xl mx-auto rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)] mb-12 md:mb-16">
            <h3 className="text-brand-green font-medium mb-4 text-lg">Understanding Title Insurance:</h3>
            <ol className="list-decimal list-inside text-white/80 font-light leading-relaxed space-y-3">
              <li>It is a complex legal insurance policy.</li>
              <li>It is a product developed in the United States to protect mortgagees from hidden interests in property.</li>
              <li>It was developed as a result of inadequate deed registry systems and the somewhat unorganized manner in which lands were occupied for settlement.</li>
            </ol>
          </div>

          <p className="text-center text-white/80 font-light max-w-2xl mx-auto mb-12 md:mb-16 text-lg">
            A Building Location Certificate provides valuable full-disclosure to all parties involved in a transaction:
          </p>

          {/* 3-Column Roles Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Step 1 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <FileCheck className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white mb-6">For Vendors (Sellers)</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>A British Columbia land surveyor's Building Location Certificate is a wise marketing tool for a vendor.</li>
                <li>It demonstrates transparency and provides a graphical sketch showing the locations of buildings.</li>
                <li>Reduces the likelihood of last-minute transaction delays due to boundary disputes.</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <Search className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white mb-6">For Purchasers</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>Provides valuable information for a purchaser before committing to an investment in real estate.</li>
                <li>Supplies information to determine if buildings meet local zoning with respect to setbacks.</li>
                <li>Discloses encroachments so they can be resolved before completing a purchase.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <ShieldCheck className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white mb-6">For Lenders</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>Provides valuable information for a mortgagor.</li>
                <li>Offers empirical evidence of the property's state rather than simply insuring against the financial loss of an issue.</li>
                <li>They are an integral part of a real estate transaction when provided to your lawyer or notary.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-green/15 via-brand-black to-brand-black border-t border-brand-green/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-green/50 bg-brand-dark mb-6">
            <MapPin className="w-7 h-7 text-brand-green" aria-hidden />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Invest in Full Disclosure
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            The Association of British Columbia Land Surveyors encourages you to use a traditional system of "full disclosure", through the use of proper title review and a surveyed building location before committing to an investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg"
            >
              Request a Professional Consultation
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/90 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View A Full List of Our Services
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}