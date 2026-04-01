import React, { useState, useEffect } from 'react';
import { ClipboardList, MapPinned, FileCheck, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

const HERO_PLACEHOLDER = '/assets/img/residential-bg.jpg';
const HERO_FALLBACK = 'images/tantalus-hero-banner.webp';
const PHONE_TEL = 'tel:+16042139934';

export default function Residential() {
  const [heroSrc, setHeroSrc] = useState(HERO_PLACEHOLDER);
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

  const residentialSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Residential Property Surveys',
    description:
      'Property surveys for homeowners in the Sea to Sky: quotes, field work, and certified survey plans.',
    url: 'https://tantalusgeomatics.com/residential',
  };

  const resourceTopics: {
    title: string;
    description: string;
    to?: string;
  }[] = [
    {
      title: 'Survey costs',
      description:
        'What affects pricing for a residential survey and how quotes are prepared.',
      to: '/survey-pricing',
    },
    {
      title: 'Title insurance vs. a survey',
      description:
        'How a current survey plan differs from title insurance when you buy or renovate.',
    },
    {
      title: 'Fences, trees & property lines',
      description:
        'Boundaries, encroachments, and why a BCLS is qualified to mark your lines.',
    },
    {
      title: 'Do you want to build?',
      description:
        'Permits, setbacks, and survey data your designer or builder may need.',
    },
  ];

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO
        title="Residential Property Surveys | Homeowners"
        description="Professional land surveys for homeowners in Squamish, Whistler, Pemberton, and the Sea to Sky: request a quote, field visit, and certified survey plan."
        keywords="residential land survey, property survey homeowner, BC Land Surveyor residential, boundary survey Sea to Sky, building location certificate"
        canonicalUrl="https://tantalusgeomatics.com/residential"
        schema={residentialSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt=""
            className="w-full h-full object-cover opacity-55 mix-blend-overlay min-h-[420px]"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(HERO_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-brand-black/65 to-brand-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 sm:pt-28 sm:pb-20">
          <p className="text-sm sm:text-base text-brand-green font-medium tracking-wide uppercase mb-4">
            For homeowners
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Clear answers for your{' '}
            <span className="text-brand-green font-medium">property survey</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            From quote to certified plan, we help you understand boundaries, permits,
            and what happens on your lot—so you can move forward with confidence.
          </p>
        </div>
      </section>

      {/* 3-step process */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            Our residential survey process
          </h2>
          <p className="text-center text-white/60 font-light max-w-2xl mx-auto mb-12 md:mb-16">
            A straightforward path from your first call to a plan you can rely on for
            permits, boundaries, and peace of mind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: '1',
                title: 'Request a quote',
                body: "Tell us about your property and project. We'll scope the work and provide a clear quote.",
                icon: ClipboardList,
              },
              {
                step: '2',
                title: 'Field visit',
                body: 'Our team visits the site to gather measurements and evidence to support your survey.',
                icon: MapPinned,
              },
              {
                step: '3',
                title: 'Certified survey plan',
                body: 'You receive a plan prepared and signed by a BC Land Surveyor, ready for your records or authority.',
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

      {/* Call now */}
      <section className="py-16 md:py-20 bg-brand-dark border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Prefer to talk it through?
          </h2>
          <p className="text-white/65 font-light mb-10 max-w-xl mx-auto">
            Call our office to discuss your property, timeline, and what type of survey
            fits your goals.
          </p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg sm:text-xl font-semibold bg-brand-green hover:bg-brand-green-light text-black transition-all shadow-lg shadow-brand-green/20 min-w-[240px]"
          >
            <Phone className="h-6 w-6 shrink-0" aria-hidden />
            Call now
          </a>
          <p className="mt-6 text-sm text-white/45">(604) 213 9934</p>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 text-center">
            Get a quote
          </h2>
          <p className="text-center text-white/60 font-light mb-10">
            Share your details and a short description of your project—we&apos;ll follow
            up with next steps.
          </p>

          <div className="bg-brand-dark p-8 md:p-10 border border-white/10">
            <form
              id="residential-quote-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Residential quote request form"
            >
              <div
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              >
                <label htmlFor="residential_website_url">Website URL</label>
                <input
                  type="text"
                  id="residential_website_url"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="residential_from_name"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="residential_from_name"
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
                  htmlFor="residential_address"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="residential_address"
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
                    htmlFor="residential_reply_to"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="residential_reply_to"
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
                    htmlFor="residential_phone"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="residential_phone"
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
                  htmlFor="residential_message"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Project description
                </label>
                <textarea
                  id="residential_message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light resize-none"
                  placeholder="Describe your project, timeline, and any questions you have."
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
                    Send request <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Resource placeholders */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
            Common questions
          </h2>
          <p className="text-center text-white/55 font-light text-sm max-w-2xl mx-auto mb-12">
            Dedicated guides for more topics are coming soon. Survey costs links to our
            pricing overview; other cards are placeholders until those pages are ready.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resourceTopics.map((topic) => (
              <li key={topic.title}>
                {topic.to ? (
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
                      Survey pricing & cost factors →
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="block h-full w-full text-left p-6 bg-brand-black border border-white/10 hover:border-brand-green/40 transition-colors group cursor-default"
                  >
                    <h3 className="text-lg font-medium text-white group-hover:text-brand-green transition-colors mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-white/55 font-light leading-relaxed">
                      {topic.description}
                    </p>
                    <span className="inline-block mt-4 text-xs text-brand-green/80 uppercase tracking-wide">
                      Link placeholder — replace with your URL
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          <p className="text-center mt-12 text-sm text-white/45">
            Looking for services overview?{' '}
            <Link
              to="/faq"
              className="text-brand-green hover:underline font-light"
            >
              Visit our FAQ
            </Link>{' '}
            or{' '}
            <Link
              to="/contact"
              className="text-brand-green hover:underline font-light"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
