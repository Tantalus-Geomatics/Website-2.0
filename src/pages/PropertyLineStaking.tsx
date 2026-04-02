import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
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

const surveyTypeRows = [
  {
    type: 'Topographical Survey',
    bestFor: 'Site planning, design, and contour mapping.',
    staking: 'No',
    ltsa: 'No',
  },
  {
    type: 'Posting Plan',
    bestFor: 'Physical boundary staking and re-establishing lost markers.',
    staking: 'Yes',
    ltsa: 'Yes',
  },
  {
    type: 'Building Location Cert',
    bestFor: 'Mortgage approvals and building inspections.',
    staking: 'No',
    ltsa: 'No',
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
            Proactive Property Protection: Why Your Property Line is Not a
            &quot;Guessing Game&quot;
          </h1>
          <p className="text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Building a new fence in West Vancouver? Clearing trees for a view in
            Whistler? Or perhaps installing a tiered retaining wall in Squamish?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-colors shadow-lg shadow-brand-green/15"
            >
              Request a Professional Consultation
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
            <a
              href="#regional-standards"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white font-medium hover:border-brand-green hover:text-brand-green transition-colors"
            >
              See regional standards
            </a>
          </div>
        </div>
      </section>

      {/* Intro + image placeholder */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/80 font-light leading-relaxed text-base sm:text-lg mb-8">
            In the Sea-to-Sky corridor, our stunning, rugged terrain means the margin
            for error is virtually non-existent. In British Columbia, your property
            isn&apos;t just defined by where your lawn ends; it is a complex legal
            intersection of municipal bylaws, provincial statutes, and the Land Title
            and Survey Authority (LTSA) records.
          </p>
          <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-8 text-white/90 font-light text-lg italic">
            Before you dig, build, or cut, you need to understand the &quot;Invisible
            Reality&quot; of your land.
          </blockquote>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 bg-brand-dark aspect-[21/9] min-h-[200px] flex items-center justify-center">
            <span className="text-white/40 text-sm font-light px-6 text-center">
              Image: Sea-to-Sky lot with fence or retaining wall (placeholder)
            </span>
          </div>
        </div>
      </section>

      {/* Regulatory maze */}
      <section id="regional-standards" className="py-14 md:py-20 border-b border-white/10 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            The Sea-to-Sky Regulatory Maze
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-4 max-w-3xl">
            Each municipality has its own &quot;playbook.&quot; What is legal on Bowen
            Island could trigger a stop-work order in Squamish or a $10,000 fine in
            Vancouver.
          </p>
          <p className="text-sm text-brand-green/90 font-medium mb-8 uppercase tracking-wide">
            Quick glance: Regional standards
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

      {/* Common disasters */}
      <section className="py-14 md:py-20 border-b border-white/10 bg-brand-dark/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
            &quot;Common Disasters&quot;: Why Intuition is Expensive
          </h2>
          <p className="text-white/70 font-light mb-10 max-w-3xl">
            As a retired surveyor, I&apos;ve seen homeowners rely on &quot;fences of
            convenience&quot; or their smartphone GPS. Here is the reality of what
            happens when those guesses are wrong:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-xl border border-red-500/25 bg-gradient-to-b from-red-950/40 to-brand-black p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <p className="text-xs uppercase tracking-wider text-red-300/90 mb-2">
                Case law
              </p>
              <h3 className="text-lg font-medium text-white mb-3">
                1. The $50,000 Swimming Pool (Oyelese v. Sorensen)
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                In a landmark BC case, a homeowner discovered their pool crossed the
                property line by several feet. Despite the pool being years old, the
                court ordered its total removal within 75 days. Encroachments are
                &quot;latent liabilities&quot;—they don&apos;t go away with time; they
                emerge when you try to sell your home.
              </p>
            </article>
            <article className="rounded-xl border border-amber-500/25 bg-gradient-to-b from-amber-950/30 to-brand-black p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <p className="text-xs uppercase tracking-wider text-amber-200/80 mb-2">
                Liability
              </p>
              <h3 className="text-lg font-medium text-white mb-3">2. Timber Trespass</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Think you&apos;re just pruning a &quot;neighbor&apos;s&quot; tree? If
                that trunk straddles the line, it is shared property. Cutting it without
                written consent can trigger &quot;timber trespass&quot; charges, which
                often lead to triple (treble) damages in BC courts.
              </p>
            </article>
            <article className="rounded-xl border border-orange-500/25 bg-gradient-to-b from-orange-950/25 to-brand-black p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <p className="text-xs uppercase tracking-wider text-orange-200/80 mb-2">
                Hidden structure
              </p>
              <h3 className="text-lg font-medium text-white mb-3">
                3. Footing Encroachments
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                A retaining wall might look like it&apos;s on your side, but its
                structural underground footing often extends wider than the wall itself.
                If that footing crosses the line, you are committing a &quot;permanent
                trespass&quot; that complicates future property sales.
              </p>
            </article>
          </div>
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
            Debunking the &quot;Boundary Myths&quot;
          </h2>
          <p className="text-white/65 font-light mb-10 max-w-3xl">
            Don&apos;t let these common misconceptions lead to a Section 36 Property Law
            Act dispute.
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

      {/* Survey type table */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Choosing the Right Tool for Your Project
          </h2>
          <div className="overflow-x-auto rounded-lg border border-white/10 shadow-lg">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="bg-brand-dark border-b border-white/10">
                  <th className="p-4 font-medium text-white">Survey Type</th>
                  <th className="p-4 font-medium text-white">Best for…</th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    Staking included?
                  </th>
                  <th className="p-4 font-medium text-brand-green whitespace-nowrap">
                    Registered with LTSA?
                  </th>
                </tr>
              </thead>
              <tbody>
                {surveyTypeRows.map((row) => (
                  <tr
                    key={row.type}
                    className="border-b border-white/10 last:border-0 bg-brand-black/40"
                  >
                    <td className="p-4 text-white font-medium align-top">{row.type}</td>
                    <td className="p-4 text-white/70 font-light align-top">{row.bestFor}</td>
                    <td className="p-4 text-white/85 align-top">{row.staking}</td>
                    <td className="p-4 text-white/85 align-top">{row.ltsa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insurance blockquote */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Don&apos;t Build on Uncertainty
          </h2>
          <blockquote className="rounded-xl border border-white/15 bg-brand-dark/80 p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <p className="text-white/90 font-light leading-relaxed text-base sm:text-lg mb-6">
              The average cost of a professional boundary staking is approximately
              $2,000. Compare that to the $20,000 to $50,000 in legal fees required to
              fight a Section 36 petition in the Supreme Court.
            </p>
            <p className="text-brand-green/95 font-light text-lg border-t border-white/10 pt-6">
              A survey isn&apos;t a project cost; it&apos;s the most effective insurance
              policy you can buy for your real estate investment.
            </p>
          </blockquote>
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
