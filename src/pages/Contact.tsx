import { Mail, MapPin, Phone } from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { GeoDirectAnswer } from '../components/GeoDirectAnswer';
import { useLeadForm } from '../hooks/useLeadForm';

export default function Contact() {
  const lead = useLeadForm();

  const serviceAreas = [
    "Squamish", "Whistler", "Pemberton", "Lillooet", 
    "West Vancouver", "Bowen Island", "Britannia Beach", 
    "Furry Creek", "North Vancouver"
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://tantalusgeomatics.com/contact/#webpage",
    "url": "https://tantalusgeomatics.com/contact/",
    "name": "Contact Tantalus Geomatics | BC Land Surveyor",
    "description": "Request a quote for land surveying services in Squamish, Whistler, and the Sea to Sky corridor.",
    "isPartOf": {
      "@id": "https://tantalusgeomatics.com/#website"
    },
    "mainEntity": {
      "@type": "LocalBusiness",
      "@id": "https://tantalusgeomatics.com/#organization",
      "name": "Tantalus Geomatics Land Surveying Ltd.",
      "email": "contact@tantalusgeomatics.com",
      "telephone": "+1-604-213-9934",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Squamish",
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "areaServed": serviceAreas.map(area => ({
        "@type": "City",
        "name": area
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tantalusgeomatics.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact Us"
        }
      ]
    }
  };

  return (
    <PageShell>
      <SEO 
        title="Contact a BC Land Surveyor | Request a Quote"
        description="Get in touch with Tantalus Geomatics for your land surveying needs in Squamish, Whistler, Pemberton, Lillooet, North Vancouver, West Vancouver, and Bowen Island."
        canonicalUrl="https://tantalusgeomatics.com/contact/"
        schema={contactSchema}
      />
      {/* Hero */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            width={1200}
            height={800}
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Contact Us <span className="text-brand-green font-medium">Today</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Get professional support for your next project.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-all flex items-center justify-center gap-2 rounded-full"
            >
              <Phone size={20} />
              Call for a free quote
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 sm:mb-6">Contact Us Today</h2>
              <GeoDirectAnswer question="What should you include when you contact Tantalus Geomatics about your project?">
                <p className="text-base sm:text-lg text-slate-700 font-light mb-8 sm:mb-12 leading-relaxed">
                  Provide us with your contact information and a brief description of your project's requirements. We will contact you right away to determine how we can best support your project.
                </p>
              </GeoDirectAnswer>
              
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 sm:mb-6">Professional Consultations</h2>
              <GeoDirectAnswer question="When does it make sense to book a professional consultation before you build?">
                <p className="text-base sm:text-lg text-slate-700 font-light mb-8 sm:mb-12 leading-relaxed">
                  Do you have a plan to build on your property, but you are not sure where to start? We offer consultations to help you navigate the municipal permitting process. Let us help you identify the specific regulatory and <a href="/services" className="text-brand-green hover:underline">survey requirements</a> for your site.
                </p>
              </GeoDirectAnswer>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-slate-200 bg-stone-100 text-brand-green rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-lg">
                      Where is the Tantalus Geomatics office located?
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">Squamish, BC</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 border border-slate-200 bg-stone-100 text-brand-green rounded-xl shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-lg">
                      What email address can you use to reach Tantalus Geomatics?
                    </h3>
                    <a href="mailto:contact@tantalusgeomatics.com" className="text-brand-green hover:text-brand-green-light font-semibold transition-colors text-sm sm:text-base">
                      contact@tantalusgeomatics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 border border-slate-200 bg-stone-100 text-brand-green rounded-xl shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-lg">
                      What phone number can you call to reach Tantalus Geomatics?
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">(604) 213 9934</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-dark p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl flex flex-col justify-center">
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
