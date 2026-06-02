import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb, ArrowRight, Phone } from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

const baseServiceModules = import.meta.glob('../content/services/squamish/*.mdx', { eager: true });

const faqCategories = Object.entries(baseServiceModules)
  .map(([filePath, module]: [string, any]) => {
    const slug = filePath.split('/').pop()?.replace('.mdx', '');
    const meta = module.metadata || module.frontmatter || {};
    const serviceName = meta.serviceName || meta.title || 'General Services';
    const faqs = meta.faqs || [];

    if (!faqs || faqs.length === 0) return null;

    return {
      title: serviceName,
      faqs: faqs.map((faq: any) => ({
        question: faq.question,
        answer: faq.answer,
        callout: faq.callout,
        serviceLink: { label: serviceName, href: `/services/${slug}/` }
      })),
      ctaText: `Get a quote for ${serviceName}`
    };
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('0-0');
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const lead = useLeadForm();

  // Intersection Observer for active category highlighting
  useEffect(() => {
    const observers = faqCategories.map((_, index) => {
      const element = document.getElementById(`category-${index}`);
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCategory(index);
          }
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );
      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  const scrollToCategory = (index: number) => {
    const element = document.getElementById(`category-${index}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

// Helper to remove HTML tags for valid Schema.org text
const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://tantalusgeomatics.com/faq/#webpage",
  "url": "https://tantalusgeomatics.com/faq/",
  "name": "Land Surveying FAQ | Common Questions in the Sea-to-Sky",
  "isPartOf": {
    "@id": "https://tantalusgeomatics.com/#website"
  },
  "publisher": {
    "@id": "https://tantalusgeomatics.com/#organization"
  },
  "mainEntity": faqCategories.flatMap(category => 
    category.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtml(faq.answer) // Prevents HTML validation errors in search console
      }
    }))
  )
};

  return (
    <PageShell>
      <SEO 
        title="Land Surveying FAQ | Common Questions in the Sea-to-Sky"
        description="Questions about survey costs, topographic surveys or boundary staking? Answers to common questions about land surveying, property boundaries, topographic surveys, and hiring a BCLS in the Sea to Sky corridor."
        canonicalUrl="https://tantalusgeomatics.com/faq/"
        schema={faqSchema}
      />
      
      {/* Hero */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            <span className="text-brand-green font-medium">Land Surveying</span> FAQ
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Expert Answers to Common Questions.
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

      {/* Main Content - Split Layout */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32">
                <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">Categories</h3>
                <nav className="space-y-2">
                  {faqCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToCategory(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-4 ${
                        activeCategory === index 
                          ? 'bg-brand-green/10 text-brand-green font-semibold' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                      }`}
                    >
                      <span className={`font-mono text-sm ${activeCategory === index ? 'opacity-100' : 'opacity-40'}`}>
                        0{index + 1}
                      </span>
                      <span className="font-light text-lg">{category.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ Accordions */}
            <div className="lg:col-span-8 space-y-16 md:space-y-24">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} id={`category-${catIndex}`} className="scroll-mt-32">
                  <div className="flex items-baseline gap-4 mb-6 sm:mb-8 border-b-2 border-brand-green pb-4">
                    <span className="text-2xl sm:text-3xl font-mono text-brand-green font-light">0{catIndex + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    {category.faqs.map((faq, faqIndex) => {
                      const id = `${catIndex}-${faqIndex}`;
                      const isOpen = openId === id;
                      
                      return (
                        <div 
                          key={faqIndex} 
                          className="border-b border-slate-200 group"
                        >
                          <button
                            className="w-full py-4 sm:py-6 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => setOpenId(isOpen ? null : id)}
                          >
                            <span className={`text-lg sm:text-xl font-light transition-colors pr-4 sm:pr-8 ${isOpen ? 'text-brand-green' : 'text-slate-900 group-hover:text-brand-green'}`}>
                              {faq.question}
                            </span>
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'border-brand-green bg-brand-green/10 text-brand-green' : 'border-slate-300 text-slate-500 group-hover:border-brand-green group-hover:text-brand-green'}`}>
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </button>
                          
                          <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-[1000px] opacity-100 pb-6 sm:pb-8' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-slate-700 font-light leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            
                            {faq.serviceLink && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <Link 
                                  to={faq.serviceLink.href} 
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-dark hover:text-brand-green transition-colors"
                                >
                                  Learn more about {faq.serviceLink.label}
                                  <ArrowRight size={16} />
                                </Link>
                              </div>
                            )}

                            {/* Callouts */}
                            {faq.callout && (
                              <div className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-2xl border flex gap-3 sm:gap-4 items-start shadow-sm ${
                                faq.callout.type === 'pro-tip' 
                                  ? 'bg-brand-green/10 border-brand-green' 
                                  : 'bg-stone-100 border-slate-200'
                              }`}>
                                {faq.callout.type === 'pro-tip' ? (
                                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <strong className={`block font-semibold mb-1 text-sm sm:text-base ${
                                    faq.callout.type === 'pro-tip' ? 'text-brand-green' : 'text-slate-900'
                                  }`}>
                                    {faq.callout.type === 'pro-tip' ? 'Pro-Tip: ' : 'Liability Note: '}
                                    {faq.callout.title}
                                  </strong>
                                  <p className={`text-sm sm:text-base leading-relaxed ${
                                    faq.callout.type === 'pro-tip' ? 'text-brand-green-dark' : 'text-slate-600'
                                  }`}>
                                    {faq.callout.content}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Category CTA */}
                  <div className="mt-8 flex justify-start">
                    <a
                      href="tel:6042139934"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-black transition-colors rounded-full font-semibold text-sm sm:text-base"
                    >
                      <Phone className="w-4 h-4" />
                      {category.ctaText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

          {/* Call to Action / Contact Form - 2 Column Layout */}
    <section className="py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Column 1 (Formerly Column 2): Contact Form */}
            <div className="bg-brand-dark p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>

            {/* Column 2 (Formerly Column 3): Surveyor Image */}
            <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl">
              <img 
                src="/images/DS-TS-1.webp" 
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