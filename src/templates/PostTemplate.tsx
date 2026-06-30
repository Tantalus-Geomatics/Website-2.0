import type { ReactNode } from 'react';
import { Calendar, Tag, User, BookOpen } from 'lucide-react';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface PostTemplateProps {
  title: string;
  description: string;
  publishDate: string;
  tags?: string[];
  glossary?: GlossaryTerm[];
  children: ReactNode;
}

export default function PostTemplate({
  title,
  description,
  publishDate,
  tags = [],
  glossary = [],
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
              <div className="prose-custom text-slate-800 font-light leading-relaxed overflow-auto
                [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b-2 [&>h2]:border-slate-100 [&>h2]:pb-2
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
                <div className="clear-both" />
              </div>
            </article>

            {/* Sidebar with Glossary */}
            <aside className="lg:col-span-4 space-y-8">
              {glossary && glossary.length > 0 && (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green-dark shrink-0">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Glossary of Terms</h3>
                      <p className="text-xs text-brand-green-dark font-semibold tracking-wider uppercase">Key Definitions</p>
                    </div>
                  </div>
                  <dl className="space-y-4">
                    {glossary.map((item, i) => (
                      <div key={i} className="border-t border-slate-200/60 pt-3 first:border-t-0 first:pt-0">
                        <dt className="text-sm font-semibold text-slate-900">{item.term}</dt>
                        <dd className="text-sm text-slate-600 font-light mt-1 leading-relaxed">{item.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </aside>

          </div>
        </div>
      </main>
    </PageShell>
  );
}
