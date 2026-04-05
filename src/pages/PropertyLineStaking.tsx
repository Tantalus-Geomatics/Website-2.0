import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ClipboardList, MapPinned, FileCheck } from 'lucide-react';
import SEO from '../components/SEO';

const CANONICAL = 'https://tantalusgeomatics.com/sea-to-sky-property-line-staking';

const regionalRows = [
  {
    feature: 'Max Fence Height',
    whistler: '1.8 m (typical); 2.44 m (combined height)',
    squamish: '1.8 m – 2.0 m',
    westVan: '2.5 m',
    bowen: 'Varies by zone — confirm with district',
  },
  {
    feature: 'Un-engineered Wall Max',
    whistler: '1.22 m',
    squamish: '1.22 m',
    westVan: '1.2 m',
    bowen: '1.5 m',
  },
  {
    feature: 'Tree Protection Threshold',
    whistler: '15 cm DBH',
    squamish: '30 cm DBH',
    westVan: 'Varies by species',
    bowen: 'Private (N/A)',
  },
];

const myths = [
  {
    myth: 'The Municipal GIS map shows my line clearly.',
    fact: 'GIS layers are for visualization only and often "float" 1 to 5 meters off-center. They have no legal standing in a dispute.',
  },
  {
    myth: "Squatter's Rights (Adverse Possession) apply to me.",
    fact: 'This was largely abolished in BC in 1975. Even if a fence has been in the wrong place for 40 years, it does not change your legal boundary.',
  },
  {
    myth: 'My Realtor showed me where the pins were.',
    fact: 'Only a British Columbia Land Surveyor (BCLS) is legally authorized to establish property boundaries.',
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
            src="images/tantalus-hero-banner.webp"
            alt=""
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/75 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-brand-green text-sm font-medium tracking-wide uppercase mb-4">
            Sea to Sky homeowners
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
            Eliminate the Guesswork. Protect Your Land with a Certified Boundary Survey.
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Are you planning to build a fence, remove a tree, or install a retaining wall near your property line? A certified boundary survey provides the peace of mind you need to avoid costly fines and legal disputes.
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

      {/* Intro + image placeholder */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">Good neighbors respect boundaries. Great neighbors work together to verify them before any work is done.</blockquote>
          <p className="text-white/80 font-light leading-relaxed text-base sm:text-lg mb-8">
            Property improvements should provide value, not legal headaches. Whether you are preparing to invest in a new perimeter fence, clearing trees to reclaim your view, or watching a neighbor&apos;s new construction creep closer to your boundary, guessing where your property ends is a significant financial risk. Without a certified BCLS survey, a few inches of error can lead to:
          </p>
          <p className="text-brand-green font-medium mb-2">
            Costly Deconstruction
          </p>
          <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
            <span className="text-white font-medium">Homeowners may be forced to tear down and relocate new fences or structures if they are accidentally built on the wrong side of the property line.</span>
          </p>
          <p className="text-brand-green font-medium mb-2">
            Fines:
          </p>
          <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
            <span className="text-white font-medium">There may be significant legal repercussions and fines for clearing trees on land you don&apos;t own and without securing the necessary permits.</span>
          </p>
          <p className="text-brand-green font-medium mb-2">
            Neighbor Disputes:
          </p>
          <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
            <span className="text-white font-medium">There may be protracted disputes with neighbors that can permanently affect your home environment and resale value.</span>
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-[21/9] min-h-[200px] flex items-center justify-center">
            <span className="text-white/40 text-sm font-light px-6 text-center">
              Image: Sea-to-Sky lot with fence or retaining wall (placeholder)
            </span>
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
            Determining a property boundary is a legal process that combines researching historical records and locating physical evidence on the ground. Following an initial consultation, where we discuss your project&apos;s needs, we follow a standard professional sequence to ensure your property lines are accurately identified and legally documented.
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

      {/* Regulatory maze */}
      <section id="regional-standards" className="py-14 md:py-20 border-b border-white/10 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Case Study: Tree Removal in the District of Squamish
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-4 max-w-3xl">
            Tree removal often involves more than an agreement with a neighbour. Covenants on title and municipal bylaws typically introduce futher restrictions and permitting requirements prior to proceeding with your project.
          </p>
          <p className="text-sm text-brand-green/90 font-medium mb-8 uppercase tracking-wide">
            District of Squamish: What to consider
          </p>

          <div className="overflow-x-auto rounded-lg border border-white/10 shadow-lg">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-brand-dark border-b border-white/10">
                  <th className="p-4 font-medium text-white whitespace-nowrap">Feature</th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    Whistler (RMOW)
                  </th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    Squamish
                  </th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    West Vancouver
                  </th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    Bowen Island
                  </th>
                </tr>
              </thead>
              <tbody>
                {regionalRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-white/10 last:border-0 bg-brand-black/40"
                  >
                    <td className="p-4 text-white/90 font-medium align-top">{row.feature}</td>
                    <td className="p-4 text-white/70 font-light align-top">{row.whistler}</td>
                    <td className="p-4 text-white/70 font-light align-top">{row.squamish}</td>
                    <td className="p-4 text-white/70 font-light align-top">{row.westVan}</td>
                    <td className="p-4 text-white/70 font-light align-top">{row.bowen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="mt-8 p-5 md:p-6 bg-brand-dark/80 border border-brand-green/30 rounded-lg">
            <p className="text-white/90 font-light leading-relaxed text-sm sm:text-base">
              <span className="text-brand-green font-medium">Note for Squamish homeowners:</span>{' '}
              A critical nuance exists here—if you place a fence atop a retaining wall
              within 1.22 m of your property line, the combined height cannot exceed
              2.44 m.
            </p>
          </aside>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-video flex items-center justify-center">
            <span className="text-white/40 text-sm font-light px-6 text-center">
              Image: Boundary stakes or survey field work on a residential lot
              (placeholder)
            </span>
          </div>
        </div>
      </section>

      {/* Myths */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Common Misconceptions
          </h2>
          <p className="text-white/65 font-light mb-10 max-w-3xl">
            Don&apos;t let these common misconceptions lead to adverse outcomes.
          </p>
          <div className="space-y-6">
            {myths.map((item) => (
              <div
                key={item.myth}
                className="rounded-xl border border-brand-green/35 bg-brand-dark/60 p-6 md:p-8 shadow-[0_4px_24px_rgba(107,158,84,0.08)]"
              >
                <p className="text-brand-green font-medium mb-2">
                  Myth: &quot;{item.myth}&quot;
                </p>
                <p className="text-white/80 font-light leading-relaxed border-t border-white/10 pt-4 mt-4">
                  <span className="text-white font-medium">Fact: </span>
                  {item.fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tantalus */}
      <section className="py-14 md:py-20 border-b border-white/10 bg-brand-dark/25">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            How Tantalus Geomatics Protects You
          </h2>
          <p className="text-white/80 font-light leading-relaxed mb-8">
            We don&apos;t just &quot;put stakes in the ground.&quot; We act as your
            quasi-judicial professional gatekeepers. When we re-establish a boundary,
            we use a legally mandated Hierarchy of Evidence:
          </p>
          <ol className="space-y-4 list-decimal list-inside text-white/80 font-light marker:text-brand-green">
            <li>
              <span className="font-medium text-white">Natural Boundaries</span> (High-water
              marks, river banks).
            </li>
            <li>
              <span className="font-medium text-white">Original Monuments</span> (Iron pins
              and lead plugs placed during the original subdivision).
            </li>
            <li>
              <span className="font-medium text-white">Evidence of Occupation</span>{' '}
              (Ancient stone walls or mature hedges).
            </li>
            <li>
              <span className="font-medium text-white">Registered Plan Dimensions</span>{' '}
              (The measurements on paper—ironically, the least weighted evidence if they
              conflict with physical markers).
            </li>
          </ol>
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
            Our team at Tantalus Geomatics specializes in the complex terrain of the
            Sea-to-Sky corridor. Let&apos;s ensure your improvements stay on your side
            of the line.
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
              View Our Recent Projects in Squamish &amp; Whistler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
