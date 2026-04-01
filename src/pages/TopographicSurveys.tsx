import React, { useEffect, useState } from 'react';
import { Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

const PHONE_TEL = 'tel:+16042139934';

const misconceptionRows = [
  {
    topic: 'The "Flat Lot" Fallacy',
    misconception: 'The site looks level; no elevations are needed.',
    reality: '1% slopes are invisible but critical for drainage.',
  },
  {
    topic: 'The "Google Earth" Shortcut',
    misconception: 'Satellite data can provide contour lines for free.',
    reality:
      'Lacks the centimeter precision required for municipal compliance.',
  },
  {
    topic: 'The "Legacy Plan" Reliance',
    misconception: 'The survey from the 70s shows the property lines.',
    reality:
      'Old surveys lack geodetic datums, utility inverts, and tree data.',
  },
  {
    topic: 'The "Architect Can Measure"',
    misconception: 'The designer can use a tape measure on site.',
    reality: "Architects aren't licensed to certify geodetic elevations.",
  },
];

const roiRows = [
  {
    issue: 'Foundation Height Error',
    prevention: '~$3,000',
    remediation: '$20,000 – $50,000',
  },
  {
    issue: 'Sewer Connection Failure',
    prevention: 'Included',
    remediation: '$10,000 – $15,000',
  },
  {
    issue: 'Tree Protection Fines',
    prevention: 'Included',
    remediation: '$2,000 – $10,000 per tree',
  },
  {
    issue: 'Architectural Redesign',
    prevention: 'Included',
    remediation: '$5,000 – $15,000',
  },
  {
    issue: 'Drainage Litigation',
    prevention: 'Included',
    remediation: '$10,000 – $100,000+',
  },
];

export default function TopographicSurveys() {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    phone: '',
    address: '',
    message: '',
    website_url: '',
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: React.ReactNode;
  }>({ type: 'idle', message: '' });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'r37yPY3ALEbiW4YxU',
      blockHeadless: true,
      limitRate: {
        id: 'app',
        throttle: 10000,
      },
    });
  }, []);

  useEffect(() => {
    // #region agent log
    const imgs = Array.from(document.querySelectorAll('img')).map(
      (el) => el.getAttribute('src') || ''
    );
    fetch('http://127.0.0.1:7653/ingest/ffaf70c6-84ad-4d70-9b95-4a13d56a1dbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'd764f9',
      },
      body: JSON.stringify({
        sessionId: 'd764f9',
        location: 'TopographicSurveys.tsx:mount',
        message: 'topographic mount img audit',
        data: {
          route: window.location.pathname,
          imgSrcs: imgs,
          hasResidentialBg: imgs.some((s) => s.includes('residential-bg')),
        },
        timestamp: Date.now(),
        hypothesisId: 'H2',
        runId: 'verify-404-fix',
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website_url) {
      return;
    }

    if (!turnstileToken) {
      setStatus({
        type: 'error',
        message: 'Please complete the CAPTCHA verification.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your request...' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3rqnrju',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uvo8zyr',
        e.currentTarget
      );

      setStatus({
        type: 'success',
        message:
          'Thank you! Your request has been sent successfully. We will be in touch soon.',
      });
      setFormData({
        from_name: '',
        reply_to: '',
        phone: '',
        address: '',
        message: '',
        website_url: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: (
          <>
            There was an error sending your request. Please email us directly at{' '}
            <a
              href="mailto:contact@tantalusgeomatics.com"
              className="underline hover:text-brand-green transition-colors"
            >
              contact@tantalusgeomatics.com
            </a>
            .
          </>
        ),
      });
    }
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The First Step to Building: Topographic Surveys Explained',
    description:
      'How topographic surveys support BC building permits, design, and geodetic elevations for residential homeowners.',
    url: 'https://tantalusgeomatics.com/topographic-surveys',
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO
        title="The First Step to Building: Topographic Surveys Explained"
        description="Why a topographic survey is the digital foundation for your architect, engineer, and municipal permit—geodetic elevations, utility inverts, and BC Land Surveyor liability."
        keywords="topographic survey BC, building permit survey, BCLS topographic, geodetic elevation, residential survey Squamish"
        canonicalUrl="https://tantalusgeomatics.com/topographic-surveys"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[62vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt=""
            className="w-full h-full object-cover opacity-45 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/55 via-brand-black/70 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
            Building Your Dream Home in BC?
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-brand-green font-light mb-10 leading-snug">
            Why a Topographic Survey is Your Most Important &quot;Insurance Policy&quot;
          </p>
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
            Building or renovating a home in British Columbia involves one of the most
            complex intersections of legal, environmental, and engineering requirements
            in North America. Before a single shovel hits the dirt, your project needs a
            foundation of data.
          </p>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-3xl mx-auto mt-6">
            At <strong className="font-medium text-white">Tantalus Geomatics</strong>, we
            provide the &quot;Digital Foundation&quot; that translates the physical
            reality of your land into the precise mathematical language required by your
            architect, engineer, and the city.
          </p>
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            1. Debunking the &quot;Flat Lot&quot; Fallacy
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-8">
            Many homeowners look at their property and see a level surface. However,
            human perception is remarkably poor at detecting the subtle grade changes
            that dictate how water moves.
          </p>
          <ul className="space-y-4 mb-12 text-white/80 font-light">
            <li>
              <span className="text-brand-green font-medium">The 1% Risk:</span> A site
              that appears level may have a 2% slope—enough to move thousands of gallons
              of stormwater during an atmospheric river event.
            </li>
            <li>
              <span className="text-brand-green font-medium">The Cost of Ignorance:</span>{' '}
              Without centimeter-level precision from a{' '}
              <strong className="text-white font-medium">
                British Columbia Land Surveyor (BCLS)
              </strong>
              , building placement can create &quot;localized depressions,&quot; leading
              to basement flooding or foundation rot.
            </li>
            <li>
              <span className="text-brand-green font-medium">Legacy Plan Risks:</span>{' '}
              That &quot;Plan of Survey&quot; you got when you bought the house 20 years
              ago is likely a Boundary Survey, not a Topographic one. It lacks the
              elevation data, tree locations, and modern geodetic datums required for new
              construction.
            </li>
          </ul>

          <h3 className="text-lg font-medium text-white mb-4">
            Common Misconceptions vs. Technical Reality
          </h3>
          <div className="hidden md:block overflow-x-auto border border-white/10 rounded-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-dark border-b border-white/10">
                  <th className="p-4 font-medium text-white">Topic</th>
                  <th className="p-4 font-medium text-white/90">Common misconception</th>
                  <th className="p-4 font-medium text-brand-green">Technical reality</th>
                </tr>
              </thead>
              <tbody>
                {misconceptionRows.map((row) => (
                  <tr
                    key={row.topic}
                    className="border-b border-white/10 last:border-0 bg-brand-black/50"
                  >
                    <td className="p-4 text-white/90 font-medium">{row.topic}</td>
                    <td className="p-4 text-white/65 font-light">{row.misconception}</td>
                    <td className="p-4 text-white/80 font-light">{row.reality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4">
            {misconceptionRows.map((row) => (
              <div
                key={row.topic}
                className="border border-white/10 bg-brand-dark p-4 rounded-sm"
              >
                <p className="text-brand-green text-sm font-medium mb-2">{row.topic}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                  Misconception
                </p>
                <p className="text-white/75 font-light text-sm mb-3">{row.misconception}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                  Reality
                </p>
                <p className="text-white/85 font-light text-sm">{row.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-dark/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            2. The &quot;Digital Handshake&quot;: Connecting Your Design Team
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10">
            A topographic survey serves as the critical &quot;digital handshake&quot; between
            your professionals. We deliver high-quality, editable CAD (.dwg) files that
            your architect and engineer can import directly into their software.
          </p>

          <figure className="mb-10 border border-dashed border-brand-green/50 bg-brand-black/60 p-6 md:p-10 text-center">
            <div className="aspect-video max-w-3xl mx-auto bg-brand-gray/80 border border-white/10 flex items-center justify-center mb-4">
              <span className="text-white/45 text-sm font-light px-4">
                Image placeholder: Topographic survey CAD overlay on a residential lot
              </span>
            </div>
            <figcaption className="text-xs text-white/50 font-light">
              Replace with your CAD overlay visual
            </figcaption>
          </figure>

          <ul className="space-y-6 text-white/80 font-light mb-10">
            <li>
              <span className="text-brand-green font-medium">Geodetic Elevations:</span>{' '}
              Nearly all BC municipalities now require &quot;Geodetic Elevation&quot;
              (tied to the Provincial Monument Network) rather than &quot;Relative
              Height&quot;. This is crucial for Flood Construction Levels (FCL) in areas
              like Vancouver or Richmond.
            </li>
            <li>
              <span className="text-brand-green font-medium">Utility Inverts:</span> We
              locate the &quot;Invert&quot;—the exact bottom elevation of municipal sewer
              and storm pipes. This determines if you can have a standard gravity-fed
              basement or if you&apos;ll need an expensive, high-maintenance sewage pump
              system.
            </li>
          </ul>

          <figure className="border border-dashed border-brand-green/50 bg-brand-black/60 p-6 md:p-10 text-center">
            <div className="aspect-video max-w-3xl mx-auto bg-brand-gray/80 border border-white/10 flex items-center justify-center mb-4">
              <span className="text-white/45 text-sm font-light px-4">
                Image placeholder: Utility invert showing pipe elevation relative to a
                basement floor
              </span>
            </div>
            <figcaption className="text-xs text-white/50 font-light">
              Replace with your utility invert diagram or photo
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            3. Navigating the Municipal &quot;Gatekeepers&quot;
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-8">
            BC municipalities use topographic data to ensure your home complies with
            strict bylaws.
          </p>
          <ul className="space-y-6 text-white/80 font-light mb-10">
            <li>
              <span className="text-brand-green font-medium">Tree Protection:</span> Cities
              like Coquitlam and Kelowna have some of the most stringent tree bylaws in
              Canada. We map the Diameter at Breast Height (DBH) and &quot;Drip Lines&quot;
              of trees on and near your property to prevent construction halts and massive
              fines.
            </li>
            <li>
              <span className="text-brand-green font-medium">The &quot;Average Grade&quot; Math:</span>{' '}
              Your building&apos;s maximum height isn&apos;t measured from the street;
              it&apos;s calculated from the Average Grade.
            </li>
          </ul>

          <aside
            className="border-l-4 border-brand-green bg-brand-dark/80 pl-6 pr-6 py-8 my-8"
            aria-label="Average grade formula"
          >
            <p className="text-sm uppercase tracking-wide text-brand-green mb-3">
              Average grade math
            </p>
            <blockquote className="text-lg sm:text-xl text-white font-light leading-relaxed mb-4">
              Most municipalities use a weighted average based on the perimeter of your
              building:
            </blockquote>
            <p className="font-mono text-sm sm:text-base text-brand-green-light/95 bg-brand-black/80 border border-white/10 p-4 mb-4 overflow-x-auto">
              Average Grade = Sum of (Segment Average Elevation × Segment Length) / Total
              Perimeter
            </p>
            <p className="text-white/70 font-light text-sm leading-relaxed">
              If this calculation is off by even a few centimeters, your basement might be
              reclassified as a &quot;storey,&quot; pushing your project over the allowable
              Floor Area Ratio (FAR) and resulting in an automatic permit rejection.
            </p>
          </aside>
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-brand-dark/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            4. The ROI: Saving You Thousands
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10">
            While a professional survey typically costs between $2,000 and $5,000, it is
            one of the most cost-effective investments you can make.
          </p>

          <h3 className="text-lg font-medium text-white mb-4">
            Prevention vs. Remediation
          </h3>
          <div className="hidden md:block overflow-x-auto border border-white/10 rounded-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-dark border-b border-white/10">
                  <th className="p-4 font-medium text-white">Issue</th>
                  <th className="p-4 font-medium text-white/90">
                    Typical survey investment
                  </th>
                  <th className="p-4 font-medium text-red-300/90">Remediation cost</th>
                </tr>
              </thead>
              <tbody>
                {roiRows.map((row) => (
                  <tr
                    key={row.issue}
                    className="border-b border-white/10 last:border-0 bg-brand-black/50"
                  >
                    <td className="p-4 text-white/90 font-light">{row.issue}</td>
                    <td className="p-4 text-brand-green/90 font-light">{row.prevention}</td>
                    <td className="p-4 text-red-200/90 font-light">{row.remediation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4">
            {roiRows.map((row) => (
              <div
                key={row.issue}
                className="border border-white/10 bg-brand-dark p-4 rounded-sm grid gap-2"
              >
                <p className="text-white font-medium">{row.issue}</p>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">Survey context</span>
                  <span className="text-brand-green">{row.prevention}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">If things go wrong</span>
                  <span className="text-red-200">{row.remediation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            5. Your Journey: When to Call Tantalus
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10">
            Don&apos;t wait until you&apos;ve fallen in love with a floor plan to call us.
            The survey is the &quot;Permission to Design&quot;.
          </p>
          <ol className="space-y-6 list-decimal list-inside text-white/85 font-light marker:text-brand-green">
            <li>
              <span className="font-medium text-white">Phase 1: Discovery:</span>{' '}
              Establish your goals and budget.
            </li>
            <li>
              <span className="font-medium text-white">Phase 2: Due Diligence (Call Us!):</span>{' '}
              Order your Topographic Survey, Arborist Report, and Geotech Analysis.
            </li>
            <li>
              <span className="font-medium text-white">Phase 3: Design Development:</span>{' '}
              Your architect uses our data to create the footprint.
            </li>
            <li>
              <span className="font-medium text-white">Phase 4: Permit Submission:</span>{' '}
              We provide the sealed survey and grade calculations the city requires.
            </li>
            <li>
              <span className="font-medium text-white">Phase 5: Construction:</span> We use
              the survey to &quot;set out&quot; your foundation in the exact approved
              location.
            </li>
          </ol>
        </div>
      </section>

      {/* Secure your project */}
      <section className="py-16 md:py-20 border-b border-white/10 bg-brand-dark/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            Secure Your Project Today
          </h2>
          <p className="text-white/75 font-light leading-relaxed">
            Every survey we produce carries the British Columbia Land Surveyor&apos;s
            (BCLS) seal. This isn&apos;t just a stamp; it&apos;s a transfer of liability.
            By hiring a professional, you protect yourself from the personal liability of
            encroachments or bylaw violations.
          </p>
        </div>
      </section>

      {/* Sticky CTA + form */}
      <section className="py-16 md:py-24 bg-brand-dark border-t border-brand-green/30 lg:sticky lg:bottom-0 lg:z-40 lg:shadow-[0_-8px_32px_rgba(0,0,0,0.45)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-black border border-brand-green/40 p-8 md:p-10 mb-10">
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
              Request a Quote Today.
            </h2>
            <p className="text-white/75 font-light mb-8">
              Every quote is reviewed by a Licensed BC Land Surveyor. 24-hour turnaround
              on standard residential requests.
            </p>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg sm:text-xl font-semibold bg-brand-green hover:bg-brand-green-light text-black transition-all min-w-[240px]"
            >
              <Phone className="h-6 w-6 shrink-0" aria-hidden />
              Call now
            </a>
            <p className="mt-4 text-sm text-white/45">(604) 213 9934</p>
          </div>

          <div className="max-w-3xl mx-auto bg-brand-dark p-8 md:p-10 border border-white/10">
            <h3 className="text-2xl font-light text-white mb-6">Request a Quote</h3>
            <form
              id="topographic-quote-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Topographic survey quote request form"
            >
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="topo_website_url">Website URL</label>
                <input
                  type="text"
                  id="topo_website_url"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="topo_from_name"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="topo_from_name"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                  placeholder="Jane Doe"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="topo_address"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="topo_address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                  placeholder="Property address"
                  aria-required="true"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="topo_reply_to"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="topo_reply_to"
                    name="reply_to"
                    required
                    value={formData.reply_to}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                    placeholder="jane@example.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="topo_phone"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="topo_phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                    placeholder="(604) 555-0123"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="topo_message"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Project Description
                </label>
                <textarea
                  id="topo_message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light resize-none"
                  placeholder="Please describe your project requirements."
                  aria-required="true"
                />
              </div>

              <div className="flex justify-center my-4">
                <Turnstile
                  siteKey={
                    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
                    '0x4AAAAAACkcoQ4pjVYMr-l8'
                  }
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                  options={{ theme: 'dark' }}
                />
              </div>

              <div aria-live="polite" className="min-h-[24px]">
                {status.message && (
                  <p
                    className={`text-sm ${
                      status.type === 'error'
                        ? 'text-red-400'
                        : status.type === 'success'
                          ? 'text-brand-green'
                          : 'text-white/70'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Request <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
