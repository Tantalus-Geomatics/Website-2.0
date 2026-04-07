import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, HardHat, Compass, Building, Mountain, CheckCircle2, ArrowRight, Home, Trees, Waves, Scale, FileText, MapPin, Mail, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import SEO from '../components/SEO';

export default function Services() {
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

  const services = [
    {
      id: 'residential',
      title: 'Residential Property Surveys',
      icon: <Home className="w-10 h-10 text-brand-green" />,
      image: "images/old-home.webp",
      description: 'We provide property line, fence, and tree surveys, for boundary confirmation, in addition to site plans and Building Location Certificates required for design accuracy and municipal compliance.',
      items: [
        { name: 'Site Plans', desc: 'Detailed plans required to support municipal building permits, showing existing conditions and proposed improvements.' },
        { name: 'Property Line Surveys', desc: 'Locating and marking legal boundaries to ensure fences, walls, and structures are built on your own land.' },
        { name: 'Tree Surveys', desc: 'Accurately locating trees to ensure compliance with municipal tree bylaws and restrictive covenants.' },
        { name: 'Building Location Certificates', desc: 'Official surveys confirming that structures conform to legal boundaries and municipal setback requirements.' }
      ]
    },
    {
      id: 'land-development',
      title: 'Land Development',
      icon: <Map className="w-10 h-10 text-brand-green" />,
      image: "images/land-development.webp",
      description: 'A successful subdivision or land development project starts with accurate data. Our local expertise and professional services provide the essentials required for architectural and engineering design, helping you efficiently navigate the municipal approval process.',
      items: [
        { name: 'Topographic Surveys and Site Plans', desc: 'Detailed drawings showing building footprints, setbacks, utility locations and the physical terrain to support design and demonstrate compliance with local bylaws.' },
        { name: 'As-Built Surveys', desc: 'Documenting the final location of newly constructed improvements for municipal permitting and record drawings.' },
        { name: 'BC Land Surveyor’s Certificates', desc: 'Professional documents showing the location of buildings relative to property lines, often required by building inspectors and mortgage lenders.' }
      ]
    },
    {
      id: 'construction',
      title: 'Construction & Infrastructure',
      icon: <HardHat className="w-10 h-10 text-brand-green" />,
      image: "images/construction.webp",
      description: 'What is built must match your designs. Our layout and monitoring services reduce the risk of costly rework and project delays.',
      items: [
        { name: 'Building Layouts', desc: 'Precise marking of foundations and structural elements to ensure accurate construction and compliance with municipal setbacks.' },
        { name: 'Quantity Estimate Surveys', desc: 'Estimating stockpile volumes and material changes to ground surfaces during site construction and development activites.' },
        { name: '3D Settlement Monitoring Surveys', desc: 'High-precision tracking of motion and settlement of earth and structures during construction to ensure site safety and stability.' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal Surveys',
      icon: <Compass className="w-10 h-10 text-brand-green" />,
      image: "images/survey-marker-post.webp",
      description: 'BC Land Surveyors are the only professionals qualified to determine the locations of property boundaries. We physically define these boundaries on the ground and prepare statutory plans for registration at the Land Title Office.',
      items: [
        { name: 'Boundary Surveys', desc: 'Locating property corners and marking existing boundaries to support the construction of fences, resolve disputes or facilitate renovations and landscaping.' },
        { name: 'Strata Plans', desc: 'Surveys and plans for multi-unit housing and air-space parcels.' },
        { name: 'Subdivision Plans', desc: 'Supporting developers through the subdivision process, from initial design consultations to final filing at the Land Title Office.' }
      ]
    },
    {
      id: 'reality-capture',
      title: '3D Reality Capture',
      icon: <Mountain className="w-10 h-10 text-brand-green" />,
      image: "images/reality-capture.webp",
      description: 'Using the latest in LiDAR and photogrammetry, we create accurate 3D replicas of physical sites and buildings.',
      items: [
        { name: 'UAV Mapping', desc: 'Aerial mapping ideal for large or inaccessible Sea-to-Sky sites.' },
        { name: 'Terrestrial 3D Laser Scanning', desc: 'Millimeter-accurate documentation of building facades, complex building interiors, and inaccessible utility infrastructure.' },
        { name: 'Digital Twins', desc: 'Converting point cloud data into high accuracy 3D models for architects, engineers and facility managers.' }
      ]
    }
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Tantalus Geomatics Land Surveying Ltd."
        }
      }
    }))
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Land Surveying Services in Squamish & Whistler"
        description="Comprehensive geomatics solutions including Land Development Surveys, Construction Surveys, Legal Boundary Surveys, Strata Surveys, and 3D Reality Capture."
        keywords="Land Development Surveying BC, Construction Surveying Whistler, 3D Reality Capture Squamish, UAV LiDAR, Legal Boundary Survey, Strata Plans, Topographic Surveys"
        canonicalUrl="https://tantalusgeomatics.com/services"
        schema={servicesSchema}
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
            Professional <span className="text-brand-green font-medium">Land Surveying</span> Services
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Comprehensive Land Surveying, topographic mapping, and construction support for your most demanding projects.
          </p>
          <div className="flex justify-center mt-10">
            <Link
              to="/#/contact"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              Contact Us Today <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services List - Improved Styling */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-32">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-brand-dark border border-white/10 mb-6 sm:mb-8 shadow-2xl">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 sm:mb-6 tracking-tight">{service.title}</h2>
                  <p className="text-lg sm:text-xl text-white/60 font-light mb-8 sm:mb-10 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-4 sm:space-y-6">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-brand-dark/50 border border-white/5 hover:border-brand-green/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white font-medium block mb-1 sm:mb-2 text-base sm:text-lg">{item.name}</strong>
                          <span className="text-white/60 font-light leading-relaxed block text-sm sm:text-base">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="aspect-square sm:aspect-[4/5] relative rounded-3xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay z-10"></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
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
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Request a Land Survey Quote</h2>
              <p className="text-base sm:text-lg text-white/70 font-light mb-12 leading-relaxed">
                Provide us with your contact information, your property's address, PID (Parcel Identifier) and a brief description of your project requirements. Our team of professionals will contact you to determine how we can best support your project.
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
                src="images/DS-TS-1.jpg" 
                alt="Land Surveyor out in the field" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}