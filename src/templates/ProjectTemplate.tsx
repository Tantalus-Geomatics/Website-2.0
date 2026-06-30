import { useState, type ReactNode } from 'react';
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  CheckSquare, 
  Image as ImageIcon, 
  X, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

export interface ProjectTemplateProps {
  title: string;
  client?: string;
  location: string;
  completionDate: string;
  heroImage?: string;
  galleryImages?: string[];
  projectScope?: string;
  finalDeliverables?: string[] | string;
  children: ReactNode;
}

const HERO_FALLBACK = '/images/Squamish-Garibaldi-Estates-Property-Survey.webp';

export default function ProjectTemplate({
  title,
  client,
  location,
  completionDate,
  heroImage = HERO_FALLBACK,
  galleryImages = [],
  projectScope,
  finalDeliverables = [],
  children
}: ProjectTemplateProps) {
  const [heroSrc, setHeroSrc] = useState(heroImage);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Format date nicely if it's a valid date string, otherwise use as-is
  const formattedDate = (() => {
    try {
      const date = new Date(completionDate);
      if (isNaN(date.getTime())) return completionDate;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return completionDate;
    }
  })();

  // Normalize final deliverables to an array
  const deliverablesArray = Array.isArray(finalDeliverables)
    ? finalDeliverables
    : typeof finalDeliverables === 'string' && finalDeliverables.trim() !== ''
      ? [finalDeliverables]
      : [];

  return (
    <PageShell>
      <SEO
        title={`${title} | Project Case Study | Tantalus Geomatics`}
        description={`Case study for ${title} in ${location}. Explore the project scope, challenges, solutions, and final deliverables.`}
      />

      {/* 1. Strong Visual Header / Hero Section */}
      <header className="relative py-20 md:py-32 flex items-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt={title}
            width={1200}
            height={800}
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
            onError={() => setHeroSrc(HERO_FALLBACK)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/80 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider border border-brand-green/20 mb-4">
              Project Case Study
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-white/80 font-light">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-green" />
                {location}
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-green" />
                {formattedDate}
              </span>
              {client && (
                <>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="flex items-center gap-2">
                    <Briefcase size={16} className="text-brand-green" />
                    Client: {client}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Area (2-Column Layout) */}
      <main className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Main Content (MDX children) */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
                {/* MDX Content Wrapper with custom typography styling */}
                <div className="prose-custom text-slate-800 font-light leading-relaxed overflow-auto
                  [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-2
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-3
                  [&>p]:mb-6 [&>p]:leading-relaxed
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                  [&>li]:pl-1
                  [&>a]:text-brand-green-dark [&>a]:underline hover:[&>a]:text-brand-green [&>a]:font-medium [&>a]:transition-colors
                  [&>blockquote]:border-l-4 [&>blockquote]:border-brand-green [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-6
                  [&>strong]:font-semibold [&>strong]:text-slate-900
                  [&>hr]:my-10 [&>hr]:border-slate-200"
                >
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Project Summary</h2>
                  {children}
                  <div className="clear-both" />
                </div>
              </div>
            </article>

            {/* Right Column: Sidebar Details */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm sticky top-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200 flex items-center gap-2">
                  <Briefcase size={20} className="text-brand-green-dark" />
                  Project Details
                </h3>

                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <MapPin size={14} className="text-brand-green-dark" />
                      Location
                    </h4>
                    <p className="text-sm text-slate-800 font-medium">{location}</p>
                  </div>

                  {/* Client */}
                  {client && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-brand-green-dark" />
                        Client
                      </h4>
                      <p className="text-sm text-slate-800 font-medium">{client}</p>
                    </div>
                  )}

                  {/* Completion Date */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar size={14} className="text-brand-green-dark" />
                      Completion Date
                    </h4>
                    <p className="text-sm text-slate-800 font-medium">{formattedDate}</p>
                  </div>

                  {/* Project Scope */}
                  {projectScope && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-brand-green-dark" />
                        Project Scope
                      </h4>
                      <p className="text-sm text-slate-700 font-light leading-relaxed">{projectScope}</p>
                    </div>
                  )}

                  {/* Final Deliverables */}
                  {deliverablesArray.length > 0 && (
                    <div className="pt-4 border-t border-slate-200">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <CheckSquare size={14} className="text-brand-green-dark" />
                        Final Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {deliverablesArray.map((deliverable, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-700 font-light">
                            <ChevronRight size={16} className="text-brand-green shrink-0 mt-0.5" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* 3. Responsive Image Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-brand-green-dark uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
                <ImageIcon size={14} />
                Visual Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900">
                Project Gallery
              </h2>
              <p className="text-slate-600 font-light text-sm max-w-xl mx-auto mt-2">
                Field photos, survey plans, and technical captures from the project site.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-brand-green transition-all cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`${title} gallery image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Enlarged gallery view"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}
