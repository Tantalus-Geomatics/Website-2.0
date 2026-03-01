import { Mountain, Award, Users, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
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
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="About Our BC Land Surveying Practice"
        description="Learn about Tantalus Geomatics, a professional land surveying company led by Dennis Sherman BCLS PEng, delivering precision surveying in the Sea to Sky."
        keywords="Dennis Sherman BCLS PEng, Licensed Land Surveyor Sea to Sky, Professional Geomatics Firm, Squamish Surveyor, Whistler Surveyor"
        canonicalUrl="https://tantalusgeomatics.com/about"
        schema={aboutSchema}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
            alt="Sea-to-Sky Mountains"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            About Our <span className="text-brand-green font-medium">Land Surveying</span> Practice
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Agility, personalized service, and technical mastery in the Sea-to-Sky corridor.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-white mb-6">Supporting the Sea-to-Sky Corridor</h2>
              <p className="text-base sm:text-lg text-white/70 mb-6 font-light leading-relaxed">
                Tantalus Geomatics is a dedicated professional service provider, playing a critical role in the responsible development and management of the Sea-to-Sky corridor. From Squamish to Whistler and beyond, we support a wide range of activities—including residential development, large-scale infrastructure projects, and environmental conservation efforts. We are not just data collectors; we are strategic partners who provide the foundational spatial data required for informed decision-making. Learn more about our <a href="/services" className="text-brand-green hover:underline">comprehensive geomatics services</a>.
              </p>
              <p className="text-base sm:text-lg text-white/70 mb-8 font-light leading-relaxed">
                Our commitment is to deliver precision, reliability, and local expertise to ensure that every project we touch contributes positively to the communities and landscapes we serve. We navigate the unique challenges of our rugged, remote environment with a technical agility that prioritizes your project's timeline without compromising on professional quality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-brand-dark p-6 border border-white/10">
                  <MapPin className="text-brand-green mb-3 w-8 h-8" />
                  <h3 className="font-medium text-white mb-2">Local Expertise</h3>
                  <p className="text-sm text-white/60 font-light">Deep knowledge of local regulations and terrain from Bowen Island to Lillooet.</p>
                </div>
                <div className="bg-brand-dark p-6 border border-white/10">
                  <Award className="text-brand-green mb-3 w-8 h-8" />
                  <h3 className="font-medium text-white mb-2">Professional Quality</h3>
                  <p className="text-sm text-white/60 font-light">Licensed BC Land Surveyors and Professional Engineers ensuring accuracy.</p>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 border border-brand-green transform translate-x-4 translate-y-4 -z-10 hidden sm:block"></div>
              <img
                src="https://picsum.photos/seed/squamish-chief/800/1000?grayscale"
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
                  src="https://picsum.photos/seed/surveyor-portrait/600/800?grayscale"
                  alt="Dennis Sherman"
                  className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-green text-brand-green text-sm font-medium mb-6 w-fit">
                  <Users size={16} /> Principal
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Dennis Sherman BCLS PEng</h2>
                <p className="text-xl text-brand-green font-medium mb-8">Principal</p>
                
                <p className="text-base sm:text-lg text-white/70 mb-6 font-light leading-relaxed">
                  Dennis is a dual-registered professional, holding commissions as both a British Columbia Land Surveyor (BCLS) and a Professional Engineer (PEng). This unique combination of qualifications allows him to bridge the gap between legal boundary determination and complex engineering design. With extensive experience in cadastral surveying, construction layout, and advanced 3D reality capture, Dennis brings a rigorous, multi-disciplinary approach to every project.
                </p>
                <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                  He is committed to upholding the highest standards of professional accountability, protecting the public interest, and delivering innovative geomatics solutions tailored to the unique challenges of the Sea-to-Sky region. <a href="/contact" className="text-brand-green hover:underline">Contact Dennis and the team</a> to discuss your next project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
