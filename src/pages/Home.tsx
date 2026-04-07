import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  WavesLadder, Hammer, ArrowRight, Map, Compass, HardHat, Mountain, 
  Home as HomeIcon, Trees, Waves, Scale, FileText, Building, Fence, 
  BrickWall, Mail, MapPin, Phone, Send 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

export default function Home() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    phone: '',
    address: '',
    pid: '',
    project_type: 'Site Plan',
    message: '',
    website_url: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: React.ReactNode }>({ type: 'idle', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website_url) {
      // Silently reject bot submissions
      return;
    }

    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Please complete the CAPTCHA verification.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your request...' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3rqnrju',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uvo8zyr',
        e.currentTarget
      );
      
      setStatus({ type: 'success', message: 'Thank you! Your request has been sent successfully. We will be in touch soon.' });
      setFormData({
        from_name: '',
        reply_to: '',
        phone: '',
        address: '',
        pid: '',
        project_type: 'Site Plan',
        message: '',
        website_url: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        type: 'error', 
        message: (
          <>
            There was an error sending your request. Please email us directly at{' '}
            <a href="mailto:contact@tantalusgeomatics.com" className="underline hover:text-brand-green transition-colors">
              contact@tantalusgeomatics.com
            </a>.
          </>
        ) 
      });
    }
  };

  const useCases = [
    {
      title: "Property Line Surveys",
      icon: <Fence className="w-6 h-6" />,
      content: "Many homeowners discover their existing fences are misaligned with their legal property lines once a formal survey is conducted. A BCLS-certified survey is the only way to definitively establish your boundaries and replace property corners before you invest in new fencing.",
      image: "images/hedge-line.webp"
    },
    {
      title: "Building Design and Construction Permitting",
      icon: <Hammer className="w-6 h-6" />,
      content: "Municipalities require BCLS-certified topographic surveys to verify that proposed designs comply with site coverage and setback zoning bylaws. These surveys provide the foundational data architects and designers need to align their plans with the physical and legal constraints of the site.",
      image: "images/adu.webp"
    },
    {
      title: "Retaining Wall Construction",
      icon: <BrickWall className="w-6 h-6" />,
      content: "Municipalities require a BCLS survey to ensure retaining walls don't encroach onto neighbouring properties and to ensure they conform to local bylaws.",
      image: "images/retaining-wall.webp"
    },
    {
      title: "Deck and Pool Permits",
      icon: <WavesLadder className="w-6 h-6" />,
      content: "Municipalities require a site plan prepared by a BC Land Surveyor to confirm that new decks, pools, or accessory buildings meet the \"site coverage\" and \"setback\" requirements of the zoning bylaw.",
      image: "images/deck-pool.webp"
    },
    {
      title: "Purchasing an Older Home",
      icon: <HomeIcon className="w-6 h-6" />,
      content: "A Building Location Certificate confirms that all existing structures are situated within the legal property boundaries and comply with municipal regulations. For those purchasing older homes, this survey is an essential safeguard against the risks of undocumented encroachments and zoning non-compliance.",
      image: "images/old-home.webp"
    },
    {
      title: "Strata Developments",
      icon: <Building className="w-6 h-6" />,
      content: "Developing multi-unit housing or duplexes requires a BCLS-certified strata plan to define individual strata lot boundaries and common property. Tantalus Geomatics provides the precise measurements and documentation needed to successfully register your project at the Land Title Office.",
      image: "images/strata.webp"
    },
    {
      title: "Tree Removal",
      icon: <Trees className="w-6 h-6" />,
      content: "Municipal tree bylaws and \"Restricted Covenant Areas\" often limit or restrict tree removal. A BCLS identifies these zones on the ground so owners don't face large fines for unlawful tree removal.",
      image: "images/tree.webp"
    },
    {
      title: "Mortgage Refinancing",
      icon: <FileText className="w-6 h-6" />,
      content: "Lenders often require a recent Building Location Certificate to confirm all structures on the property conform to municipal bylaws and to determine the total lot area prior to approving a new loan or line of credit.",
      image: "images/mortgage.webp"
    },
    {
      title: "Natural Boundary Identification",
      icon: <Waves className="w-6 h-6" />,
      content: "Owners of properties adjacent to a body of water need a BCLS to determine the location of the \"Present Natural Boundary\" for dock applications or to verify the impact of erosion on their extent of ownership.",
      image: "images/natural-boundary.webp"
    },
    {
      title: "BC Land Surveyor: Your Expert Witness",
      icon: <Scale className="w-6 h-6" />,
      content: "If a neighbor dispute escalate to court, a BCLS is often called as an expert witness. Their plans and testimony are used as evidence the courts to settle boundary and encroachment cases.",
      image: "images/expert-witness.webp"
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Tantalus Geomatics Land Surveying Ltd.",
    "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
    "url": "https://tantalusgeomatics.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": ["Squamish", "Whistler", "Pemberton", "West Vancouver", "Lillooet", "Bowen Island"],
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "areaServed": ["Squamish", "Whistler", "Pemberton", "Lillooet", "West Vancouver", "Bowen Island"],
    "description": "Professional Land Surveying and 3D Reality Capture for homeowners, AEC industry professionals, and real estate experts in the Sea to Sky corridor."
  };

  return (
    <div className="flex flex-col bg-brand-black">
      <SEO 
        title="BC Land Surveyor in Squamish, Whistler & Sea to Sky"
        description="Hire a professional BC Land Surveyor (BCLS) for topographic surveys, legal boundaries, and 3D reality capture in Squamish, Whistler, and Pemberton."
        keywords="BC Land Surveyor, Land Surveying Squamish, Land Surveying Sea to Sky, Land Surveying Whistler, Topographic Survey Squamish, Topographic Survey Sea to Sky, Topographic Survey Whistler, Property Boundary Survey, 3D Reality Capture, Land Surveying Sea to Sky, BCLS"
        canonicalUrl="https://tantalusgeomatics.com/"
        schema={homeSchema}
      />
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md">
            throughout the Sea-to-Sky Corridor.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Professional land surveying is the essential first step for any successful project. We provide the BCLS-certified data and expert oversight required to ensure your boundaries are accurate, your permits are compliant, and your investment is protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#/contact"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              Contact Us Today <ArrowRight size={20} />
            </Link>
            <Link
              to="/#/services"
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-medium transition-all border border-brand-green flex items-center justify-center backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Use Cases Section */}
      <section className="py-20 md:py-32 bg-brand-dark border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6">When Do I Need a Land Surveyor?</h2>
            <p className="text-lg sm:text-xl text-white/60 font-light max-w-2xl mx-auto">
              Explore common scenarios where a land survey is required. <Link to="/#/faq" className="text-brand-green hover:underline">Read our FAQ</Link> for more details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-brand-black/50 border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveUseCase(activeUseCase === index ? -1 : index)}
                    className={`w-full text-left px-5 py-4 flex items-center justify-between ${activeUseCase === index ? 'bg-brand-green text-brand-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${activeUseCase === index ? 'text-brand-black' : 'text-brand-green'}`}>
                        {useCase.icon}
                      </div>
                      <span className="font-medium text-base sm:text-lg pr-4">
                        {useCase.title}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 shrink-0 transition-transform ${activeUseCase === index ? 'rotate-90 text-brand-black' : ''}`} />
                  </button>
                  {activeUseCase === index && (
                    <div className="p-5 sm:p-6 bg-brand-black border-t border-white/10">
                      <img 
                        src={useCase.image} 
                        alt={useCase.title}
                        className="w-full h-40 sm:h-48 object-cover rounded-xl mb-5 grayscale-35"
                      />
                      <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base">
                        {useCase.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Interactive List */}
            <div className="hidden lg:block lg:col-span-5 space-y-2">
              {useCases.map((useCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`w-full text-left px-6 py-5 rounded-2xl transition-all flex items-center justify-between group ${
                    activeUseCase === index 
                      ? 'bg-brand-green text-brand-black shadow-lg shadow-brand-green/20' 
                      : 'bg-brand-black/50 text-white/70 hover:bg-white/5 hover:text-white border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors ${activeUseCase === index ? 'text-brand-black' : 'text-brand-green group-hover:text-brand-green-light'}`}>
                      {useCase.icon}
                    </div>
                    <span className={`font-medium text-lg ${activeUseCase === index ? 'text-brand-black' : ''}`}>
                      {useCase.title}
                    </span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${activeUseCase === index ? 'translate-x-1' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
            </div>

            {/* Desktop Dynamic Display */}
            <div className="hidden lg:block lg:col-span-7">
              <div className="sticky top-32">
                <div className="bg-brand-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={useCases[activeUseCase === -1 ? 0 : activeUseCase].image} 
                      alt={useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                      className="w-full h-full object-cover opacity-100 transition-opacity grayscale-35 duration-500"
                      key={useCases[activeUseCase === -1 ? 0 : activeUseCase].image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
                  </div>
                  <div className="p-8 md:p-12 relative -mt-20 z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green text-brand-black mb-6 shadow-xl">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].icon}
                    </div>
                    <h3 className="text-3xl font-light text-white mb-6">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].title}
                    </h3>
                    <p className="text-xl text-white/70 font-light leading-relaxed">
                      {useCases[activeUseCase === -1 ? 0 : activeUseCase].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Our Core Services</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Supporting your projects from conception to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Residential Property Surveys',
                icon: <HomeIcon className="w-8 h-8 text-brand-green" />,
                description: 'We provide property line, fence, and tree surveys, for boundary confirmation, in addition to site plans and Building Location Certificates required for design accuracy and municipal compliance.',
              },
              {
                title: 'Land Development',
                icon: <Map className="w-8 h-8 text-brand-green" />,
                description: 'We provide subdivision, consolidation and strata plans, topographic mapping and site plans for design and permitting, and construction layouts to ensure your development can progress efficiently.',
              },
              {
                title: 'Construction & Infrastructure',
                icon: <HardHat className="w-8 h-8 text-brand-green" />,
                description: 'High-accuracy layout, earthwork estimates and monitoring for buildings, land development, roads, utilities and large infrastructure.',
              },
              {
                title: 'Legal Surveys',
                icon: <Compass className="w-8 h-8 text-brand-green" />,
                description: 'Professional expertise for property boundaries, subdivisions, and strata plans.',
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-brand-black p-8 border border-white/10 hover:border-brand-green/50 transition-all group flex flex-col">
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 font-light">
                  {service.description}
                </p>
                <Link to="/#/services" className="text-brand-green font-medium flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Call to Action / Contact Form - 3 Column Layout */}
      <section className="py-24 bg-brand-dark border-b border-white/10">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Column 1: Contact Info & Logo */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Contact Us Today</h2>
              <p className="text-base sm:text-lg text-white/70 font-light mb-12 leading-relaxed">
                Connect with Tantalus Geomatics by phone or through the form below. We provide the timely responses and technical expertise required to ensure your project proceeds without delay.
              </p>

              <div className="space-y-8 mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 border border-white/10 text-brand-green rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Office</h3>
                    <p className="text-white/60 font-light">Squamish, BC</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 border border-white/10 text-brand-green rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email</h3>
                    <a href="mailto:contact@tantalusgeomatics.com" className="text-brand-green hover:text-brand-green-light font-light transition-colors">
                      contact@tantalusgeomatics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 border border-white/10 text-brand-green rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Phone</h3>
                    <p className="text-white/60 font-light">(604) 213 9934</p>
                  </div>
                </div>
              </div>

              {/* ABCLS Logo */}
              <div className="bg-white p-5 rounded-2xl inline-flex items-center justify-center shadow-xl w-fit">
                <img 
                  src="images/abcls-logo-horizontal.svg" 
                  alt="Association of British Columbia Land Surveyors Logo" 
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
            </div>

            {/* Column 2: Contact Form */}
            <div className="bg-brand-black p-8 md:p-10 border border-white/10 shadow-xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Send us a message</h3>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                
                {/* Honeypot Field */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light rounded-md"
                      placeholder="Jane Doe"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="reply_to" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="reply_to"
                      name="reply_to"
                      required
                      value={formData.reply_to}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light rounded-md"
                      placeholder="jane@example.com"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light rounded-md"
                      placeholder="(604) 555-0123"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-2">Property Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light rounded-md"
                      placeholder="1234 Main St, Squamish"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light resize-none rounded-md"
                    placeholder="Please provide details about your project location and requirements..."
                    aria-required="true"
                  ></textarea>
                </div>

                {/* Cloudflare Turnstile */}
                <div className="flex justify-center my-2">
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACkcoQ4pjVYMr-l8'}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: 'dark' }}
                  />
                </div>

                {/* Status Message Container */}
                <div aria-live="polite" className="min-h-[24px]">
                  {status.message && (
                    <p className={`text-sm ${
                      status.type === 'error' ? 'text-red-400' : 
                      status.type === 'success' ? 'text-brand-green' : 
                      'text-white/70'
                    }`}>
                      {status.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Sending...' : (
                    <>Send Request <Send size={20} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Column 3: Surveyor Image */}
            <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <img 
                src="images/DS-TS-1.webp" 
                alt="Land Surveyor out in the field" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="py-16 md:py-24 bg-brand-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight">
               Why Professional Certification Matters in<br className="hidden sm:block" />
                <span className="text-brand-green font-medium">British Columbia</span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 font-light leading-relaxed">
                Protect your property rights by engaging a commissioned British Columbia Land Surveyor. This ensures your project meets rigorous technical standards and carries the legal authority necessary for municipal and provincial compliance.
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Legal Boundary Authority:</strong> Only a licensed Land Surveyor has the legal authority to define property lines and set permanent boundary markers. Non-licensed individuals are not legally permitted to verify property limits, and their work lacks standing in the event of a boundary dispute or encroachment claim.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Professional Indemnity & Accountability:</strong> Licensed surveyors are governed by a strict code of professional ethics and carry mandatory professional liability insurance. This oversight provides a layer of protection for your investment that non-licensed service providers cannot offer.
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 shrink-0" />
                  <div>
                    <strong className="text-white font-medium">Regulatory Acceptance:</strong> Municipalities, financial institutions, and the Land Title Office only accept survey plans that carry the official seal of a BCLS. Using an unlicensed provider often results in rejected permit applications and significant delays when legal documentation is required.
                  </div>
                </li>
              </ul>
              <Link
                to="/#/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                About Our Team
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="images/steep-slope.webp"
                alt="Steep Slope"
                className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="grid grid-rows-2 gap-4">
                <img
                  src="images/spea-rar.webp"
                  alt="SPEA and RAR"
                  className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="images/muni-ex.webp"
                  alt="Municipal Expertise"
                  className="object-cover h-full w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}