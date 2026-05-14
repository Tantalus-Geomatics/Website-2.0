import { Mail, MapPin, Phone } from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

export default function Contact() {
  const lead = useLeadForm();

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
    <PageShell>
      <SEO 
        title="Contact a BC Land Surveyor | Request a Quote"
        description="Get in touch with Tantalus Geomatics for your land surveying needs in Squamish, Whistler, Pemberton, Lillooet, West Vancouver, and Bowen Island."
        keywords="Hire a land surveyor Squamish, Request a survey quote Whistler, BCLS Contact, Sea to Sky Land Surveyor"
        canonicalUrl="https://tantalusgeomatics.com/contact"
        schema={contactSchema}
      />
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
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
            Contact Us <span className="text-brand-green font-medium">Today</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Get professional support for your next project.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call for a free quote
            </a>
          </div>
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
              <LeadQuoteForm
                variant="contact"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
