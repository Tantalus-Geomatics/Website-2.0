import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, User, ExternalLink, ArrowRight, Award, ShieldCheck, BookOpen } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

export interface RelevantLink {
  label: string;
  href: string;
}

export interface RelatedService {
  label: string;
  href: string;
  description?: string;
}

export interface PostTemplateProps {
  title: string;
  description: string;
  publishDate: string;
  tags?: string[];
  relevantLinks?: RelevantLink[];
  relatedServices?: RelatedService[];
  children: ReactNode;
}

export default function PostTemplate({
  title,
  description,
  publishDate,
  tags = [],
  relevantLinks = [],
  relatedServices = [],
  children
}: PostTemplateProps) {
  // Format date nicely
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageShell>
      <SEO
        title={`${title} | Tantalus Geomatics Land Surveying`}
        description={description}
      />

      {/* Header / Hero Section */}
      <header className="bg-brand-dark border-b-2 border-brand-green py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-green font-semibold uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              Dennis Sherman, BCLS, P.Eng.
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/10"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Article Body */}
            <article className="lg:col-span-8">
              {/* MDX Content Wrapper with custom typography styling */}
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

              {/* Relevant Links Section (if present) */}
              {relevantLinks.length > 0 && (
                <section className="mt-12 pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-green-dark" />
                    Relevant Resources & External Links
                  </h3>
                  <ul className="space-y-3">
                    {relevantLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-brand-green-dark hover:text-brand-green font-medium transition-colors group"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-green transition-colors" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* Sidebar with Author Bio */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Bio Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green-dark shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Dennis Sherman</h4>
                    <p className="text-xs text-brand-green-dark font-semibold tracking-wider uppercase">BCLS, P.Eng.</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed font-light mb-4">
                  Dennis Sherman is a dual-registered professional, holding credentials as both a <strong>British Columbia Land Surveyor (BCLS)</strong> and a <strong>Professional Engineer (P.Eng.)</strong>.
                </p>
                
                <p className="text-sm text-slate-600 leading-relaxed font-light mb-4">
                  This rare combination of legal boundary expertise and engineering design capabilities allows Dennis to provide comprehensive, high-precision geomatics solutions for complex land development, municipal approvals, and infrastructure projects across the Sea to Sky corridor.
                </p>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck size={14} className="text-brand-green-dark" />
                  <span>Certified Professional Expertise</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* Related Services Grid Section */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                Related Professional Services
              </h2>
              <p className="text-slate-600 font-light text-sm max-w-xl mx-auto">
                Explore our specialized land surveying and geomatics services tailored to your project needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand-green-dark transition-colors text-lg mb-2">
                      {service.label}
                    </h3>
                    {service.description && (
                      <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
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
    </PageShell>
  );
}
