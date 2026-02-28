import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function OurWork() {
  const projects = [
    {
      id: 1,
      title: 'Squamish Valley Subdivision',
      category: 'Legal Surveys',
      image: 'https://picsum.photos/seed/squamish-subdivision/800/600?grayscale',
      description: 'A complex 24-lot subdivision requiring extensive boundary resolution and topographic mapping in challenging terrain.'
    },
    {
      id: 2,
      title: 'Whistler Resort Expansion',
      category: 'Construction Surveys',
      image: 'https://picsum.photos/seed/whistler-construction/800/600?grayscale',
      description: 'Precision layout and monitoring for a multi-phase resort expansion, ensuring exact alignment of structural elements.'
    },
    {
      id: 3,
      title: 'Pemberton Agricultural Strata',
      category: 'Strata Surveys',
      image: 'https://picsum.photos/seed/pemberton-farm/800/600?grayscale',
      description: 'Bare land strata plan for a large agricultural property, defining exclusive use areas and common property.'
    },
    {
      id: 4,
      title: 'Sea to Sky Highway Monitoring',
      category: 'Reality Capture',
      image: 'https://picsum.photos/seed/highway-scan/800/600?grayscale',
      description: '3D Laser Scanning and LiDAR to monitor rock face stability along critical sections of the highway.'
    },
    {
      id: 5,
      title: 'Bowen Island Custom Home',
      category: 'Land Development',
      image: 'https://picsum.photos/seed/bowen-home/800/600?grayscale',
      description: 'Detailed topographic survey and site plan for a steep-slope architectural build.'
    },
    {
      id: 6,
      title: 'Lillooet Infrastructure Project',
      category: 'Construction Surveys',
      image: 'https://picsum.photos/seed/lillooet-bridge/800/600?grayscale',
      description: 'Control surveys and volumetric analysis for a major municipal infrastructure upgrade.'
    }
  ];

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Our Work & Projects"
        description="Explore recent land surveying, reality capture, and geomatics projects completed by Tantalus Geomatics in the Sea to Sky corridor."
        canonicalUrl="https://tantalusgeomatics.com/our-work"
      />
      {/* Hero */}
      <section className="bg-brand-dark py-24 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">Our Work</h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Showcasing our precision and expertise across the Sea to Sky corridor.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-brand-dark border border-white/10 group hover:border-brand-green transition-all">
                <div className="relative h-64 overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-brand-black/80 border border-brand-green text-brand-green text-xs font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium text-white mb-3">{project.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-light text-white mb-6">Ready to start your project?</h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all"
            >
              Request a Quote <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
