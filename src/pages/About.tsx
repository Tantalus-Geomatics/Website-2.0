import { Mountain, Award, Users, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="About Us"
        description="Learn about Tantalus Geomatics, a professional land surveying company rooted in the Sea to Sky corridor, delivering precision surveying for the mountains we call home."
        canonicalUrl="https://tantalusgeomatics.com/about"
      />
      {/* Hero */}
      <section className="bg-brand-dark py-24 text-center border-b border-white/10 relative overflow-hidden">
        {/* Geometric pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 opacity-20 pointer-events-none overflow-hidden scale-x-[-1]">
          <svg viewBox="0 0 100 400" preserveAspectRatio="none" className="w-full h-full text-brand-green stroke-current" fill="none" strokeWidth="1">
            <path d="M0,0 L100,50 L100,100 L0,50 Z" />
            <path d="M0,100 L100,150 L100,200 L0,150 Z" />
            <path d="M0,200 L100,250 L100,300 L0,250 Z" />
            <path d="M0,300 L100,350 L100,400 L0,350 Z" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">About Tantalus Geomatics</h1>
          <p className="text-xl text-white/70 font-light">
            Agility, Personalized Service, and Technical Mastery
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-white mb-6">The Tantalus Namesake</h2>
              <p className="text-lg text-white/70 mb-6 font-light leading-relaxed">
                Tantalus Geomatics was founded to bring a new level of technical agility to the Sea-to-Sky surveying market. While larger firms may offer breadth, we offer depth and a personalized approach that prioritizes your project's timeline and precision. We are not just data collectors; we are strategic partners in your development journey.
              </p>
              <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
                Our firm is named after the Tantalus Range, the iconic granite spires that dominate the Squamish horizon. For locals, Tantalus represents the ultimate technical challenge—a remote, rugged environment that requires every tool in the box to navigate. This is the same spirit we bring to our professional practice: a commitment to reliability, local presence, and the technical skill required to succeed in the most demanding landscapes.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
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
            
            <div className="relative">
              <div className="absolute inset-0 border border-brand-green transform translate-x-4 translate-y-4 -z-10"></div>
              <img
                src="https://picsum.photos/seed/squamish-chief/800/1000?grayscale"
                alt="Squamish Chief Mountain"
                className="object-cover w-full h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="bg-brand-dark py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-black border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2">
                <img
                  src="https://picsum.photos/seed/surveyor-portrait/600/800?grayscale"
                  alt="Dennis Sherman"
                  className="w-full h-full object-cover min-h-[400px] grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-3 p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-green text-brand-green text-sm font-medium mb-6 w-fit">
                  <Users size={16} /> Principal
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Technical Principal: Dennis</h2>
                <p className="text-xl text-brand-green font-medium mb-8">BCLS, PEng</p>
                
                <p className="text-lg text-white/70 mb-6 font-light leading-relaxed">
                  The practice is led by Dennis, a licensed British Columbia Land Surveyor and Professional Engineer with extensive experience in both legal cadastral surveying, engineering surveys and advanced 3D geomatics. Dennis’s expertise ensures that every project—from a simple boundary stakeout to a complex UAV LiDAR mission—is conducted with the highest degree of professional accountability.
                </p>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  Under his leadership, Tantalus Geomatics maintains a "public first" ethic, protecting the integrity of the survey fabric while driving innovation for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
