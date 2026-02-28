import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Land Development Surveys',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the email body
    const subject = encodeURIComponent(`Quote Request: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Service Requested: ${formData.service}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open default mail client
    window.location.href = `mailto:contact@tantalusgeomatics.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Contact Us"
        description="Get in touch with Tantalus Geomatics for your land surveying needs in Squamish, Whistler, Pemberton, Lillooet, West Vancouver, and Bowen Island."
        canonicalUrl="https://tantalusgeomatics.com/contact"
      />
      {/* Hero */}
      <section className="bg-brand-dark py-24 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Get in touch for a quote or to discuss your next project in the Sea to Sky corridor.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Let's build something great.</h2>
              <p className="text-lg text-white/70 font-light mb-12 leading-relaxed">
                Whether you're planning a subdivision in Squamish, a resort expansion in Whistler, or need reality capture for a complex site, Tantalus Geomatics is ready to provide the precision data you need.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-white/10 text-brand-green">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Service Area</h3>
                    <p className="text-white/60 font-light">Squamish, Whistler, Pemberton, Lillooet, West Vancouver and Bowen Island.</p>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light"
                      placeholder="jane@example.com"
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
                    <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light appearance-none"
                    >
                      <option>Land Development Surveys</option>
                      <option>Construction Surveys</option>
                      <option>Legal Surveys</option>
                      <option>Strata Surveys</option>
                      <option>Reality Capture</option>
                      <option>Other / Unsure</option>
                    </select>
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
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
                >
                  Send Request <Send size={20} />
                </button>
                <p className="text-xs text-white/40 text-center mt-4 font-light">
                  This will open your default email client to send the request directly to our inbox.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
