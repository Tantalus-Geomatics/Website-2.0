import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb, ArrowRight, Phone } from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';

const faqCategories = [
  {
    title: "The Basics",
    faqs: [
      {
        question: "Why do I need a British Columbia Land Surveyor (BCLS)?",
        answer: "A British Columbia Land Surveyor (BCLS) is the only professional authorized to perform surveys that involve property boundaries. They possess a professional obligation to remain impartial and to determine the location of existing property boundaries based on the best available evidence of the boundary's original location. Their practice is regulated by the Association of BC Land Surveyors (ABCLS) under the Land Surveyors Act. For property owners and developers, this ensures that the boundaries they rely on are accurate, legally defensible and consistent with provincial regulations."
      },
      {
        question: "What is a \"legal\" survey and how is it different from a topographic site plan?",
        answer: "In British Columbia, a \"legal\" or \"statutory\" plan, such as those prepared under the Land Title Act or the Strata Property Act, is filed in a public registry (i.e. Land Title Office or Crown Land Registry). These plans legally define ownership extents, create new parcels, establish right-of-ways, and define strata lots. \"Non-statutory\" plans, such as topographic site plans, are used for design or permitting, and are not filed in a public register. Only a British Columbia Land Surveyor (BCLS) can certify that a measurement accurately reflects a property's registered boundaries based on historical and physical evidence."
      },
      {
        question: "Why does a surveyor need to look for iron posts that were placed 100 years ago?",
        answer: "In BC, boundaries are defined by physical evidence in the ground, such as iron posts placed 100 years ago. For older properties, a BC Land Surveyor (BCLS) is obligated to locate these original markers to re-establish the boundary in its original location. Modern technologies like GPS and total stations help find this historical evidence."
      },
      {
        question: "What is the relationship between the Association of BC Land Surveyors (ABCLS) and the Land Title and Survey Authority (LTSA)?",
        answer: "The Land Title and Survey Authority (LTSA) is the provincial body that manages the land title and survey systems, while the Association of British Columbia Land Surveyors (ABCLS) is the professional regulatory body that governs individual surveyors' competency and conduct. The LTSA promotes the standards for legal surveys and protects the integrity of the provincial survey fabric, while the ABCLS establishes the rules and registration requirements a British Columbia Land Surveyor (BCLS) must follow. Their close collaboration guarantees that the practice of land surveying is aligned with the public interest.",
        callout: {
          type: "pro-tip",
          title: "Professional Verification and Liability",
          content: "Before hiring a surveyor, verify the individual or firm is an ABCLS member in good standing. A practising BCLS must carry professional liability insurance and must follow the Code of Ethics, which ensures impartial, expert advice. This impartiality is your greatest protection in a boundary dispute."
        }
      }
    ],
    ctaText: "Need a BCLS for your project? Contact Us"
  },
  {
    title: "Property Line & Fence Disputes",
    faqs: [
      {
        question: "My neighbor's fence appears to be on my property. What is the first step in resolving this?",
        answer: "The essential first step is a \"Boundary Survey\" by a BCLS. This involves the surveyor researching records, taking field measurements, and preparing a plan that shows the fence's location relative to the legal boundary. If one or more corner monuments are missing, the land surveyor will place new iron posts at those corners and prepare a \"Posting Plan\", a legal record of the new property corner monuments, for filing at the Land Title Office."
      },
      {
        question: "Can a surveyor tell me who owns a shared fence or who is responsible for its repair?",
        answer: "A land surveyor can determine the fence's location relative to the property boundary, but they cannot determine legal ownership or financial responsibility. After the surveyor establishes the facts, a legal professional is typically needed to advise on matters of ownership and financial responsibility."
      },
      {
        question: "What is an \"Encroachment,\" and how can it be legally corrected?",
        answer: "An encroachment occurs when a structure (like a fence, shed, or garage) is built on one property but extends (encroaches) onto an adjacent property. This can create significant issues for property owners during land transactions, strata development and construction permitting. A BC Land Surveyor can determine the location and extent of the encroachments, and support common remedies such as the creation of an easement over the encroaching structure.",
        callout: {
          type: "liability",
          title: "The Impartiality of the BC Land Surveyor",
          content: "A BCLS must follow the evidence, not favor the person paying the bill, and determine the true, original and unalterable locations of existing boundaries. This impartiality ensures that their plans can be relied upon by all members of the public, and that they are accepted by the LTSA and the courts as a form of legal evidence."
        }
      }
    ],
    ctaText: "Resolve Your Boundary Uncertainty Today"
  },
  {
    title: "Construction & Development",
    faqs: [
      {
        question: "Why does my architect require a \"Topographic Survey\" before designing my home?",
        answer: "Architects need a Topographic Survey (\"Topo\") to capture an accurate 3D representation of the site's physical characteristics. A Topo captures site features such as elevations (contours), trees, utilities, structures and their relationships to property lines. This data is critical for accurate architectural and engineering considerations, such as drainage design and the locations of protected trees."
      },
      {
        question: "What is a \"Building Location Certificate\", and when do I need one?",
        answer: "A BC Land Surveyor's Certificate of Location is a non-statutory plan that depicts the location of a building's foundation or a finished structure relative to property lines. These are typically required by Municipal Building Inspectors and Mortgage Lenders to ensure compliance with municipal zoning setbacks and confirm the absence of encroaching structures.",
        callout: {
          type: "pro-tip",
          title: "Managing Encroachments During Construction",
          content: "Request a \"foundation survey\" immediately after your foundation is poured, but before framing. These surveys are required by municipalities prior to issuing occupancy permits, and an early check by a BC Land Surveyor can catch setback errors, allowing for corrections costing thousands, instead of hundreds of thousands after completion of additional construction."
        }
      },
      {
        question: "How do the Provincial \"Riparian Areas Protection Regulations\" (RAPR) affect my development?",
        answer: "If your property is near a watercourse (stream, lake, wetland, or ditch), the RAPR mandates a \"Streamside Protection and Enhancement Area\" (SPEA). All development activites, including clearing, grading and building, is prohibited within the SPEA. A Qualified Environmental Professional (QEP) establishes the \"top of bank\" or \"high water mark,\" which a BCLS then surveys to define the SPEA boundary on the ground. A BC Land Surveyor will then prepare a legal plan to create a restrictive covenant over the SPEA area to protect these sensitive fish habitats."
      }
    ],
    ctaText: "Start Your Build with Accurate Site Data"
  },
  {
    title: "Strata & Commercial",
    faqs: [
      {
        question: "How are the boundaries of a strata lot defined?",
        answer: "Unless the registered strata plan specifies otherwise, the Strata Property Act defines a strata lot's boundaries as midway between the surfaces of the strutural portion of the walls, floors, and ceilings. This definition determines what are part of the strata lot (e.g. interior plumbing walls), and what are part of the common property (e.g. exterior facade)."
      },
      {
        question: "What is a \"Bare Land Strata,\" and how does it differ from a traditional strata?",
        answer: "A bare land strata is a form of strata subdivision in which each strata lot is a distrinct parcel of land, and each strata lot owner also maintains share ownership of common property assets like roads and amenity buildings."
      },
      {
        question: "What are BOMA standards, and why should a commercial landlord use them?",
        answer: "BOMA (Building Owners and Managers Association) standards are the recognized methodology for calculating commercial building floor areas. These standards ensure that area calculations are based on a consistent and unambiguous methodology, and accurate measurement data."
      }
    ],
    ctaText: "Get Professional Support for Your Strata Project"
  },
  {
    title: "Logistics & Costs",
    faqs: [
      { 
        question: "How long does a typical property survey take?",
        answer: "A typical survey is completed in three stages: <ul class='list-disc ml-5 mt-2'><li><strong>Research & Preparation (1–5 days):</strong> Searching BC MASCOT, GATOR, LTSA and other sources of survey and land ownership records. The Land Surveyor works to structure a survey that matches the unique needs of the property and the requirements of the project.</li><li><strong>Field Work (1–3 days):</strong> The survey crew visits the property and completes the required survey measurements.</li><li><strong>Plan Drafting & Certification (7–10 days):</strong> The drafting team prepares the survey plan and other deliverables. The supervising land surveyor conductgs a thorough review of all field work, office work and the final plan by the supervising Land Surveyor. The completed plan is certified by the supervising Land Surveyor.</li></ul>"
      },
      { 
        question: "What factors influence the cost of a survey?",
        answer: "A land survey requires high-precision equipment and extensive research within the LTSA archives. Additionally, factors such as the type of survey, the lot size, terrain challenges, line of sight limitations due to vegetation and buildings, site activites and seasonal weather all influence the level of effort required to complete a survey.",
      },
      {
        question: "Can a survey be performed in the winter?",
        answer: "Yes, but it is more challenging and typically more expensive. Surveyors must chip through ice to find monuments, and in heavy snow, they may need to shovel large snow covered areas to find reference points. In situations where there is deep snow covering the ground, \"topographic\" surveys are more time consuming because the surveyor must remove the snow to confirm they are hitting the true ground surface and capturing the desired site features."
      },
      {
        question: "How are boundary disputes resolved in court?",
        answer: "When neighbor disputes escalate to court, a BCLS is called as an expert witness. Their plans and testimony are objective evidence that may be used to settle boundary disputes.",
      }
    ],
    ctaText: "Request a Custom Quote for Your Property"
  }
];

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(category => 
      category.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <PageShell>
      <SEO 
        title="Land Surveying FAQ | Squamish & Whistler"
        description="Answers to common questions about land surveying, property boundaries, topographic surveys, and hiring a BCLS in the Sea to Sky corridor."
        keywords="Land Survey Cost BC, Property Line Dispute Surveyor, Riparian Area Survey Squamish, BCLS FAQ, Topographic Survey Cost"
        canonicalUrl="https://tantalusgeomatics.com/faq"
        schema={faqSchema}
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
            <span className="text-brand-green font-medium">Land Surveying</span> FAQ
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Expert Answers to Common Questions.
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

      {/* Main Content - Split Layout */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32">
                <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-8">Categories</h3>
                <nav className="space-y-2">
                  {faqCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToCategory(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-4 ${
                        activeCategory === index 
                          ? 'bg-white/5 text-brand-green' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
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
                  <div className="flex items-baseline gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4">
                    <span className="text-2xl sm:text-3xl font-mono text-brand-green font-light">0{catIndex + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-light text-white">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    {category.faqs.map((faq, faqIndex) => {
                      const id = `${catIndex}-${faqIndex}`;
                      const isOpen = openId === id;
                      
                      return (
                        <div 
                          key={faqIndex} 
                          className="border-b border-white/10 group"
                        >
                          <button
                            className="w-full py-4 sm:py-6 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => setOpenId(isOpen ? null : id)}
                          >
                            <span className={`text-lg sm:text-xl font-light transition-colors pr-4 sm:pr-8 ${isOpen ? 'text-brand-green' : 'text-white group-hover:text-brand-green'}`}>
                              {faq.question}
                            </span>
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'border-brand-green bg-brand-green/10 text-brand-green' : 'border-white/20 text-white/40 group-hover:border-brand-green group-hover:text-brand-green'}`}>
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
                            <p className="text-white/60 font-light leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            
                            {/* Callouts */}
                            {faq.callout && (
                              <div className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-r-lg border-l-2 flex gap-3 sm:gap-4 items-start ${
                                faq.callout.type === 'pro-tip' 
                                  ? 'bg-brand-green/10 border-brand-green' 
                                  : 'bg-white/5 border-white/30'
                              }`}>
                                {faq.callout.type === 'pro-tip' ? (
                                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <strong className={`block font-medium mb-1 text-sm sm:text-base ${
                                    faq.callout.type === 'pro-tip' ? 'text-brand-green' : 'text-white/80'
                                  }`}>
                                    {faq.callout.type === 'pro-tip' ? 'Pro-Tip: ' : 'Liability Note: '}
                                    {faq.callout.title}
                                  </strong>
                                  <p className={`font-light text-sm sm:text-base leading-relaxed ${
                                    faq.callout.type === 'pro-tip' ? 'text-brand-green/80' : 'text-white/60'
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
                      className="inline-flex items-center gap-2 px-6 py-3 border border-brand-green/50 text-brand-green hover:bg-brand-green hover:text-brand-black transition-colors rounded-lg font-medium text-sm sm:text-base"
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