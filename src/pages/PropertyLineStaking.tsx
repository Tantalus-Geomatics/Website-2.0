import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ClipboardList, MapPinned, FileCheck } from 'lucide-react';
import SEO from '../components/SEO';

const CANONICAL = 'https://tantalusgeomatics.com/sea-to-sky-property-line-staking';

const problems = [
  {
    problem: 'Encroaching Structures and Costly Deconstruction',
    description: 'Homeowners may be forced to tear down and relocate new fences or structures if they are accidentally built on the wrong side of the property line.',
  },
  {
    problem: "Fines for Unpermitted Activities",
    description: 'There may be significant legal repercussions and fines for clearing trees on land you do not own and without securing the necessary permits.',
  },
  {
    problem: 'Neighbor Disputes',
    description: 'There may be protracted disputes with neighbors that can permanently affect your home environment and resale value.',
  },
];

export default function PropertyLineStaking() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sea to Sky Property Line Staking',
    description:
      'Why property line staking matters for fences, retaining walls, and trees in Squamish, Whistler, and West Vancouver.',
    url: CANONICAL,
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO
        title="Sea to Sky Property Line Staking | Fences, Walls & Trees"
        description="Protect your lot before you dig: boundary staking, regional bylaws, and why guessing your property line in BC is a liability—not a shortcut."
        keywords="property line staking Squamish, boundary survey Whistler, fence property line West Vancouver, BCLS posting plan, timber trespass BC, retaining wall property line"
        canonicalUrl={CANONICAL}
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[72vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/hedge-line.webp"
            alt="Hedge Line"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            Sea to Sky homeowners
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Eliminate the Guesswork. Protect Your Land with a Certified Boundary Survey.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Building a fence? Planning to remove a tree? Installing a retaining wall? A certified boundary survey provides the peace of mind you need to avoid costly fines and legal disputes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg shadow-brand-green/15"
            >
              Request a Professional Consultation
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">Good neighbors respect boundaries. Great neighbors work together to verify them before any work is done.</blockquote>
          <p className="text-white/65 font-light mb-10 max-w-3xl">
            Property improvements should provide value, not headaches. Without a certified BCLS survey, a few inches of error can lead to:
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

      {/* 3-step process */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            Our land survey process
          </h2>
          <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
            Determining a property boundary is a legal process that combines researching historical records and locating physical evidence on the ground. We follow a standard professional sequence to ensure your property lines are accurately identified and legally documented.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Research',
                body: "Every survey begins with a review of the existing records. We pull the original land titles and survey plans from the Land Title and Survey Authority of BC (LTSA). This allows us to understand the legal history of your lot and the surrounding properties before we arrive on-site.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'Field visit',
                body: 'Once we have the data, our crew visits your property to perform a field survey. We search for original iron pins and use professional-grade equipment to take precise measurements. If markers are missing, we use the surrounding evidence to determine their correct legal position and set new ones as needed.',
                icon: MapPinned,
              },
              {
                step: '3',
                title: 'Certified survey plan',
                body: 'After the field work, we process the data and draft a formal survey plan. This document is signed and sealed by a British Columbia Land Surveyor (BCLS). This is the official document you will need for your building permit, your fence contractor, or to resolve any questions with a neighbor.',
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

      {/* Image placeholder */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-video flex items-center justify-center">
            <img alt="Tree Line" class="object-cover h-full w-full border border-white/10 duration-500" referrerpolicy="no-referrer" src="images/hedge-line.webp"/>
          </div>
        </div>
      </section>
      
      {/* Case Study Section */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-3">
              Real World Example
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
              Case Study: Removing a tree in the District of Squamish
            </h2>
            <p className="text-white/65 font-light leading-relaxed">
              Tree removal often involves more than an agreement with a neighbour. Restrictive covenants on title and municipal bylaws can introduce further restrictions and permitting requirements prior to proceeding with your project.
            </p>
          </div>

          {/* Three Things to Consider Box */}
          <div className="max-w-4xl mx-auto rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)] mb-12 md:mb-16">
            <h3 className="text-brand-green font-medium mb-4 text-lg">Three things to consider:</h3>
            <ol className="list-decimal list-inside text-white/80 font-light leading-relaxed space-y-3">
              <li>Is the tree located on my lot?</li>
              <li>Do I need a permit to remove the tree?</li>
              <li>Have I checked my property title for any restrictive covenants that prohibit removing the tree?</li>
            </ol>
          </div>

          <p className="text-center text-white/80 font-light max-w-2xl mx-auto mb-12 md:mb-16 text-lg">
            Tantalus Geomatics Land Surveying can help guide you navigate this process with our three step process:
          </p>

          {/* Case Study 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Step 1 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <ClipboardList className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 1
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Research</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>Complete an initial consultation to confirm exactly what you are seeking to accomplish.</li>
                <li>Obtain property title, legal charge documents and relevant survey plans from the land title office.</li>
                <li>Confirm whether there are any restrictive covenants that would prohibit tree clearing.</li>
                <li>
                  Confirm whether a municipal tree permit is required for your specific situation:
                  <div className="mt-3 flex flex-col gap-2">
                    <a 
                      href="https://squamish.ca/building-and-land-development/home-land-and-property-development/trees-and-soils-management/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-green hover:text-brand-green-light transition-colors break-words underline underline-offset-2"
                    >
                      Trees and Soils Management Guidelines
                    </a>
                    <a 
                      href="https://squamish.ca/assets/Planning-forms/Tree-Management-Application-Form-v2.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-green hover:text-brand-green-light transition-colors break-words underline underline-offset-2"
                    >
                      Tree Management Application Form (PDF)
                    </a>
                  </div>
                </li>
                <li>Preparation of field reference data to ensure we capture everything necessary to move your project forward.</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <MapPinned className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 2
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Field Visit</h3>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li>We first search for each of the relevant property corner posts.</li>
                <li>If any of the posts are missing, we expand our search until we have found enough adjacent evidence to accurately re-establish the corner's location.</li>
                <li>We then measure all the features you request along the property line (e.g. trees, fences, retaining walls, etc...).</li>
                <li>If a municipal permit is required, we collect the site and topographic data required to prepare a tree removal plan to accompany your permit submission.</li>
                <li>If staking is required, we set new iron posts at any of the missing corners and set stakes at intermediate positions along the line.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-dark border border-white/10 p-8 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/40 bg-brand-black text-brand-green">
                <FileCheck className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-brand-green text-sm font-semibold tracking-wide mb-2">
                Step 3
              </span>
              <h3 className="text-xl font-medium text-white mb-6">Certified Survey Plan</h3>
              <p className="text-left text-white/80 font-light text-sm sm:text-base mb-4 w-full">
                A tree removal property line survey may result in the preparation of one or more plans, depending on your needs:
              </p>
              <ul className="text-left text-white/65 font-light leading-relaxed text-sm sm:text-base list-disc list-outside ml-4 space-y-4 w-full">
                <li><strong className="text-white/90 font-medium">Certified sketch of site features:</strong> A certified plan that depicts the locations of site features relative to your property line.</li>
                <li><strong className="text-white/90 font-medium">Tree Removal Plan:</strong> A tree removal plan consistent with the District of Squamish's Tree management permit requirements.</li>
                <li><strong className="text-white/90 font-medium">Posting Plan:</strong> If one or more property corner posts are re-established during the survey, a posting plan is prepared for filing at the land title office.</li>
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
            Ready to start your project with confidence?
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Tantalus Geomatics provides the local expertise and BCLS certification required for projects in the Sea-to-Sky corridor. Tell us about your property so we can help you move forward with confidence.
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
    </div>
  );
}
