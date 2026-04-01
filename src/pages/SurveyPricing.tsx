import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  FileText,
  Home,
  MapPinned,
  Phone,
  Send,
  Trees,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

const PHONE_TEL = 'tel:+16042139934';

export default function SurveyPricing() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number>(0);
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
    fetch('http://127.0.0.1:7653/ingest/ffaf70c6-84ad-4d70-9b95-4a13d56a1dbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'd764f9',
      },
      body: JSON.stringify({
        sessionId: 'd764f9',
        location: 'SurveyPricing.tsx:mount',
        message: 'survey pricing hero uses',
        data: { heroSrc: 'images/tantalus-hero-banner.webp' },
        timestamp: Date.now(),
        hypothesisId: 'H1',
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

  const faqItems = [
    {
      question:
        'Why did I get a quote for $2,500 when my neighbor said they paid $600?',
      answer:
        `There are two types of surveys. Your neighbor likely had a "house location" survey for a mortgage, ` +
        `which doesn't include marking lines on the ground. A legal boundary survey for a fence or ` +
        'construction requires significantly more field work and legal liability.',
    },
    {
      question: 'Why does it take three weeks to finish a survey?',
      answer:
        'The field work is only one part. We spend significant time researching historical records ' +
        'at the Land Title Office and performing complex calculations to ensure your boundary is accurate ' +
        'to within centimeters.',
    },
    {
      question: 'Why can’t you just use my existing 20-year-old survey?',
      answer:
        'A survey is a snapshot in time. If you or your neighbor have added a fence, shed, or deck in the ' +
        'last 20 years, the old survey is legally invalid for new construction or sales.',
    },
  ];

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Survey Pricing & Cost Factors',
    description:
      'Residential survey pricing education for BC homeowners: what drives cost, why DIY tools are risky, and how to request a quote.',
    url: 'https://tantalusgeomatics.com/survey-pricing',
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO
        title="Survey Pricing & Cost Factors"
        description="Learn what drives residential survey pricing in BC, compare survey cost vs legal risk, and request a quote from a Licensed BC Land Surveyor."
        keywords="survey pricing BC, residential boundary survey cost, BC Land Surveyor quote, encroachment legal costs, DIY survey risk"
        canonicalUrl="https://tantalusgeomatics.com/survey-pricing"
        schema={pageSchema}
      />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt=""
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/45 via-brand-black/65 to-brand-black" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Secure Your Boundaries. Protect Your Equity.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
            In the high-stakes world of British Columbia real estate, a $2,000 survey
            is the only thing standing between your investment and a $50,000 legal
            dispute. Don&apos;t shop for the lowest price; invest in the highest
            certainty.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            Introduction
          </h2>
          <p className="text-white/75 font-light leading-relaxed text-base sm:text-lg">
            For most homeowners, a survey is a grudge purchase, often triggered by a
            bank requirement for a mortgage or a municipal demand for a building
            permit. When a client receives a quote for a residential boundary survey
            that exceeds $2,500, the reaction is rarely one of understanding; it is
            almost universally one of disbelief. However, a homeowner is not just
            paying for a map; they are paying for the transfer of risk from
            themselves to a regulated professional.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
            Section 1: What Actually Influences Your Quote?
          </h2>
          <p className="text-white/70 font-light mb-12 max-w-4xl">
            Every property in BC is unique. Your quote is a bespoke calculation based
            on the specific history, terrain, and legal standing of your lot.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <article className="bg-brand-dark border border-white/10 p-6">
              <MapPinned className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Missing Iron Pins</h3>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                Homeowners are often unaware that they are paying for the surveyor to
                search for iron pins that may have been buried or destroyed decades
                ago. If pins are missing, we must survey the entire block to
                &quot;re-establish&quot; the boundary, a process that significantly
                inflates labor costs.
              </p>
            </article>
            <article className="bg-brand-dark border border-white/10 p-6">
              <Home className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                The &quot;Small Lot&quot; Fallacy
              </h3>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                Homeowners believe that a standard 33x122 foot Vancouver lot should be
                &quot;easy&quot; and cheap because of its size. In reality, urban
                density often increases complexity due to &quot;pin-crowding,&quot;
                utility interference, and the need to search further for reliable
                monuments.
              </p>
            </article>
            <article className="bg-brand-dark border border-white/10 p-6">
              <Trees className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Vegetation and Terrain
              </h3>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                In the lush environment of Western Canada, surveyors frequently
                encounter dense brush or blackberry thickets that obstruct lines of
                sight. A heavily wooded lot will always cost more to survey than a
                cleared one. Steep slopes require more &quot;shots&quot; and more
                complex modeling, increasing the drafting time.
              </p>
            </article>
            <article className="bg-brand-dark border border-white/10 p-6">
              <FileText className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Government Disbursements
              </h3>
              <p className="text-white/65 text-sm font-light leading-relaxed">
                The statutory fees charged by the Land Title and Survey Authority
                (LTSA) for title searches and plan registrations are often passed
                through to the client. Most LTSA fees are set to increase on April 1,
                2026, driven by CPI adjustments. We pass these costs through with no
                markup.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 border-b border-white/10 bg-red-950/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-red-400/40 bg-black/50 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-300 shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
                  Section 2: The Danger of DIY Tools
                </h2>
                <p className="text-white/80 font-light leading-relaxed">
                  Homeowners increasingly question professional fees by citing
                  &quot;free&quot; or low-cost alternatives such as Google Earth or
                  the LiDAR sensors found in modern iPhone Pro models. Google Earth is
                  a digital approximation and can be off by several meters. It does
                  not account for legal easements or historical deed discrepancies.
                  Comparisons have shown that while a professional total station or
                  RTK-GNSS system provides centimeter-level accuracy, an iPhone scan
                  over even a short 1.5-meter distance can result in errors of 0.15 to
                  0.21 meters-an unacceptable margin in the context of legal boundaries
                  where inches define thousands of dollars in property value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Section 3: The True Cost of Skipping a Survey
          </h2>
          <p className="text-white/75 font-light leading-relaxed mb-10 max-w-5xl">
            The most effective way to justify a $2,500 survey is to illustrate the
            $50,000+ cost of proceeding without one. If a surveyor makes an error that
            results in a building encroachment, their insurance provides the financial
            backing to rectify the situation. Without a BCLS professional assuming
            that liability, you are financially responsible for the fallout:
          </p>

          <div className="overflow-hidden border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-brand-dark">
              <div className="p-6 border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-sm uppercase tracking-wide text-brand-green mb-2">
                  Professional survey investment
                </p>
                <p className="text-3xl font-semibold text-white mb-2">$2,500</p>
                <p className="text-white/65 text-sm font-light">
                  Typical benchmark for a residential boundary survey scope.
                </p>
              </div>
              <div className="p-6">
                <p className="text-sm uppercase tracking-wide text-red-300 mb-4">
                  Cost of failure without a survey
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start justify-between gap-6 border-b border-white/10 pb-3">
                    <span className="text-white/85 font-light">
                      Encroaching Fences
                    </span>
                    <span className="text-red-200 font-semibold">$5,000 - $15,000</span>
                  </li>
                  <li className="flex items-start justify-between gap-6 border-b border-white/10 pb-3">
                    <span className="text-white/85 font-light">
                      Structural Encroachments
                    </span>
                    <span className="text-red-200 font-semibold">$25,000 - $100,000+</span>
                  </li>
                  <li className="flex items-start justify-between gap-6">
                    <span className="text-white/85 font-light">Permit Rejections</span>
                    <span className="text-red-200 font-semibold">$10,000 - $20,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Section 4: Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = faqOpenIndex === index;
              return (
                <div key={item.question} className="border border-white/10 bg-brand-dark">
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex(isOpen ? -1 : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-medium">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-green transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-white/70 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-black border border-brand-green/40 p-8 md:p-10 mb-10">
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
              Request a Quote Today.
            </h2>
            <p className="text-white/75 font-light mb-8">
              Every quote is reviewed by a Licensed BC Land Surveyor. 24-hour
              turnaround on standard residential requests.
            </p>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg sm:text-xl font-semibold bg-brand-green hover:bg-brand-green-light text-black transition-all min-w-[240px]"
            >
              <Phone className="h-6 w-6 shrink-0" aria-hidden />
              Call now
            </a>
          </div>

          <div className="max-w-3xl mx-auto bg-brand-dark p-8 md:p-10 border border-white/10">
            <h3 className="text-2xl font-light text-white mb-6">Request a Quote</h3>
            <form
              id="survey-pricing-quote-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Survey pricing quote form"
            >
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
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
                <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
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
                  <label htmlFor="reply_to" className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="reply_to"
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
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
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
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Project Description
                </label>
                <textarea
                  id="message"
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
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACkcoQ4pjVYMr-l8'}
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
