import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  Phone, 
  Calendar, 
  Tag,
  BookOpen
} from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

export interface HubService {
  title: string;
  href: string;
  description?: string;
}

export interface HubProject {
  title: string;
  href: string;
  location?: string;
  completionDate?: string;
  heroImage?: string;
  description?: string;
}

export interface HubPost {
  title: string;
  href: string;
  publishDate?: string;
  description?: string;
  tags?: string[];
}

export interface HubTemplateProps {
  title: string;
  description: string;
  relatedServices?: HubService[];
  relatedProjects?: HubProject[];
  relatedPosts?: HubPost[];
  children?: ReactNode;
}

export default function HubTemplate({
  title,
  description,
  relatedServices = [],
  relatedProjects = [],
  relatedPosts = [],
  children
}: HubTemplateProps) {
  return (
    <PageShell>
      <SEO
        title={`${title} | Tantalus Geomatics Land Surveying`}
        description={description}
      />

      {/* Header / Hero Section */}
      <header className="bg-brand-dark border-b-2 border-brand-green py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-brand-dark" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider border border-brand-green/20 mb-4">
            Topic Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
            {description}
          </p>
        </div>
      </header>

      {/* Optional Custom Content Section */}
      {children && (
        <section className="py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose-custom text-slate-800 font-light leading-relaxed
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
              {children}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Services
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Explore our professional surveying services tailored to {title.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="flex flex-col justify-between p-6 bg-stone-100 border border-slate-200 rounded-2xl hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green-dark mb-6">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-brand-green-dark transition-colors">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-slate-600 font-light leading-relaxed text-sm mb-6">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-brand-green-dark font-semibold text-sm group-hover:text-brand-green transition-colors mt-auto">
                    <span>Learn More</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Discover our real-world case studies and successful projects related to {title.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((project, index) => (
                <Link
                  key={index}
                  to={project.href}
                  className="flex flex-col md:flex-row bg-stone-100 border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-green hover:shadow-md transition-all group"
                >
                  {project.heroImage && (
                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden shrink-0">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                        {project.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-brand-green-dark" />
                            {project.location}
                          </span>
                        )}
                        {project.location && project.completionDate && <span>•</span>}
                        {project.completionDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-brand-green-dark" />
                            {project.completionDate}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-green-dark transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-brand-green-dark font-semibold text-sm group-hover:text-brand-green transition-colors mt-4">
                      <span>View Case Study</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insights & Resources Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Insights & Resources
              </h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto">
                Read our latest articles, guides, and professional insights on {title.toLowerCase()}.
              </p>
            </div>

            <div className="space-y-6">
              {relatedPosts.map((post, index) => (
                <Link
                  key={index}
                  to={post.href}
                  className="block p-6 bg-stone-100 border border-slate-200 rounded-2xl hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {post.publishDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-brand-green-dark" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-medium border border-brand-green/20"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-brand-green-dark transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-brand-green-dark font-semibold text-sm group-hover:text-brand-green transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white border-t-2 border-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Need Professional Assistance with {title}?
          </h2>
          <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Our team of British Columbia Land Surveyors (BCLS) and Professional Engineers (P.Eng.) is ready to help guide your project to success. Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact/"
              className="px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold rounded-full transition-all shadow-lg shadow-brand-green/20"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+16042139934"
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold rounded-full transition-all flex items-center gap-2"
            >
              <Phone size={18} /> Call (604) 213-9934
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
