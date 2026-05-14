import { Mountain, Award, Users, MapPin, Phone } from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

export default function About() {
  const lead = useLeadForm();
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Tantalus Geomatics Land Surveying Ltd.",
      "founder": {
        "@type": "Person",
        "name": "Dennis Sherman",
        "jobTitle": "Principal, BCLS, PEng",
        "url": "https://www.linkedin.com/in/dennis-sherman/"
      }
    }
  };

  return (
    <PageShell>
      <SEO 
        title="About Our BC Land Surveying Practice"
        description="Learn about Tantalus Geomatics, a professional land surveying company led by Dennis Sherman BCLS PEng, delivering professional land surveying in the Sea to Sky."
        keywords="Dennis Sherman BCLS PEng, Licensed Land Surveyor Sea to Sky, Professional Geomatics Firm, Squamish Surveyor, Whistler Surveyor"
        canonicalUrl="https://tantalusgeomatics.com/about"
        schema={aboutSchema}
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
            About Our <span className="text-brand-green font-medium">Land Surveying</span> Practice
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Local knowledge and personalized service.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Your projects. Our solutions.</h2>
              <p className="text-base sm:text-lg text-white/70 mb-6 font-light leading-relaxed">
                Tantalus Geomatics provides the specialized expertise of a BC Land Surveyor and Professional Engineer to support the complexities of modern development. We serve as a strategic partner for residential, infrastructure, and environmental projects, providing the actionable data required for accurate design and regulatory compliance. Learn more about our <a href="/#/services" className="text-brand-green hover:underline">professional services</a>.
              </p>
                            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-brand-dark p-6 border border-white/10">
                  <MapPin className="text-brand-green mb-3 w-8 h-8" />
                  <h3 className="font-medium text-white mb-2">Local Expertise</h3>
                  <p className="text-sm text-white/60 font-light">Deep knowledge of municipal and provincial regulations.</p>
                </div>
                <div className="bg-brand-dark p-6 border border-white/10">
                  <Award className="text-brand-green mb-3 w-8 h-8" />
                  <h3 className="font-medium text-white mb-2">Professional Quality</h3>
                  <p className="text-sm text-white/60 font-light">Licensed BC Land Surveyor and Professional Engineering Oversight.</p>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 border border-brand-green transform translate-x-4 translate-y-4 -z-10 hidden sm:block"></div>
              <img
                src="images/Garibaldi-Estates-gnss-topographic-survey.webp"
                alt="Squamish Chief Mountain"
                className="object-cover w-full h-[400px] sm:h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="bg-brand-dark py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-black border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <img
                  src="images/dennis-sherman-mugshot.webp"
                  alt="Dennis Sherman"
                  className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-green text-brand-green text-sm font-medium mb-6 w-fit">
                  <Users size={16} /> Owner
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Dennis Sherman</h2>
                <p className="text-xl text-brand-green font-medium mb-8">British Columbia Land Surveyor and Professional Engineer</p>
                
                <p className="text-base sm:text-lg text-white/70 mb-6 font-light leading-relaxed">
                Dennis Sherman, BCLS, P.Eng, is a dual-registered professional specializing in the integration of land surveying and geomatics engineering. Driven by a lifelong interest in maps and mathematics, and a love for the outdoors, Dennis has dedicated his career to the precision of geomatics. His background is uniquely distinguished by experience in software development for geomatics applications, allowing him to bring a deeper level of technical insight to complex spatial challenges.
                </p>
                <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                A graduate of the Lassonde School of Engineering at York University, Dennis has managed diverse surveying operations across Canada—from the shores of Haida Gwaii, to the plains of Wood Buffalo National Park, to the infrastructure of the Greater Toronto Area. Focused on the Sea-to-Sky corridor since 2018, his commitment to professional accountability and high-quality deliverables ensures that every client receives the clarity and legal certainty their project demands. <a href="/#/contact" className="text-brand-green hover:underline">Contact Dennis and the team</a> to discuss your next project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Call to Action / Contact Form - 2 Column Layout */}
    <section className="py-24 bg-brand-dark border-b border-white/10">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Column 1 (Formerly Column 2): Contact Form */}
            <div className="bg-brand-black p-8 md:p-10 border border-white/10 shadow-xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>

            {/* Column 2 (Formerly Column 3): Surveyor Image */}
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

    </PageShell>
  );
}
