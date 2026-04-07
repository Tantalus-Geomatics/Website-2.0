import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

export default function Contact() {
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

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Tantalus Geomatics Land Surveying Ltd.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Squamish",
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "email": "contact@tantalusgeomatics.com",
      "areaServed": ["Squamish", "Whistler", "Pemberton", "Lillooet", "West Vancouver", "Bowen Island"]
    }
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Contact a BC Land Surveyor | Request a Quote"
        description="Get in touch with Tantalus Geomatics for your land surveying needs in Squamish, Whistler, Pemberton, Lillooet, West Vancouver, and Bowen Island."
        keywords="Hire a land surveyor Squamish, Request a survey quote Whistler, BCLS Contact, Sea to Sky Land Surveyor"
        canonicalUrl="https://tantalusgeomatics.com/contact"
        schema={contactSchema}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            Contact Us <span className="text-brand-green font-medium">Today</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Get professional support for your next project.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 sm:mb-6">Contact Us Today</h2>
              <p className="text-base sm:text-lg text-white/70 font-light mb-8 sm:mb-12 leading-relaxed">
                Provide us with your contact information and a brief description of your project's requirements. We will contact you right away to determine how we can best support your project.
              </p>
              
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 sm:mb-6">Professional Consultations</h2>
              <p className="text-base sm:text-lg text-white/70 font-light mb-8 sm:mb-12 leading-relaxed">
                Do you have a plan to build on your property, but you are not sure where to start? We offer consultations to help you navigate the municipal permitting process. Let us help you identify the specific regulatory and <a href="/#/services" className="text-brand-green hover:underline">survey requirements</a> for your site.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10 text-brand-green">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Office</h3>
                    <p className="text-white/60 font-light">Squamish, BC</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10 text-brand-green">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email</h3>
                    <a href="mailto:contact@tantalusgeomatics.com" className="text-brand-green hover:text-brand-green-light font-light transition-colors">
                      contact@tantalusgeomatics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10 text-brand-green">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Phone</h3>
                    <p className="text-white/60 font-light">(604) 213 9934</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-dark p-8 md:p-10 border border-white/10">
              <h3 className="text-2xl font-light text-white mb-6">Request a Quote</h3>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
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
                    <label htmlFor="reply_to" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
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
                      className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
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
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light resize-none"
                    placeholder="Please provide details about your project location and requirements..."
                    aria-required="true"
                  ></textarea>
                </div>

                {/* Cloudflare Turnstile */}
                <div className="flex justify-center my-4">
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
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Sending...' : (
                    <>Send Request <Send size={20} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
