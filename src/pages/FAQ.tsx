import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';

const faqCategories = [
  {
    title: "The Basics (The \"Why\")",
    faqs: [
      {
        question: "What is a British Columbia Land Surveyor (BCLS), and why is their designation legally protected?",
        answer: "A British Columbia Land Surveyor (BCLS) is the only professional authorized by law to perform legal (cadastral) surveys in the province, commissioned under the Land Surveyors Act. This legal protection ensures that property boundaries, the foundation of real estate value, are defined by professionals regulated by the Association of BC Land Surveyors (ABCLS). This accountability means the ABCLS can investigate and discipline members in the public interest. For property owners and developers, the BCLS provides certainty that the boundaries they rely on are legally defensible and grounded in provincial rules of evidence."
      },
      {
        question: "What differentiates a \"legal\" survey from a general site plan or a contractor's measurement?",
        answer: "In British Columbia, a \"legal\" or \"statutory\" plan, such as those prepared under the Land Title Act or the Strata Property Act, is filed in a public registry (Land Title Office or Crown Land Registry). These plans legally define ownership limits, create new parcels, establish rights-of-way, or define strata lots. \"Non-statutory\" plans, like topographic site plans or as-built surveys, are used for design or internal management and are not publicly filed. While anyone can estimate a distance, only a British Columbia Land Surveyor (BCLS) has the legal authority to certify that a measurement accurately reflects a property's registered boundaries based on historical and physical evidence."
      },
      {
        question: "Why does a surveyor need to look for iron pins that were placed 100 years ago?",
        answer: "In BC, establishing boundaries is a science driven by evidence. The highest legal weight is given to the \"original monuments\" placed during the first survey. Even modern GPS data must yield to the original, physical location of the monument. This \"hierarchy of evidence\" is key to resolving ambiguities. For older properties, a BC Land Surveyor (BCLS) must locate these original markers to re-establish the boundary in its true, unalterable position. Modern tools like GNSS and total stations are simply aids in finding this historical evidence."
      },
      {
        question: "What is the relationship between the Association of BC Land Surveyors (ABCLS) and the Land Title and Survey Authority (LTSA)?",
        answer: "The Land Title and Survey Authority (LTSA) is the statutory body managing the land title and survey systems, while the Association of British Columbia Land Surveyors (ABCLS) is the professional regulatory body that governs individual surveyors' competency and conduct. The LTSA, through its Surveyor General Services, upholds the standards for cadastral surveys and safeguards the provincial survey fabric's integrity. To ensure public registration, a British Columbia Land Surveyor (BCLS) must follow the Survey and Plan Rules set by the ABCLS and approved by the Surveyor General, guaranteeing that every plan submitted to the LTSA meets the necessary stringent standards.",
        callout: {
          type: "pro-tip",
          title: "Professional Verification and Liability",
          content: "Before hiring a surveyor, verify the individual or firm is an ABCLS member in good standing. A practising BCLS carries professional liability insurance and must follow the Code of Ethics, which ensures impartial, expert advice. This impartiality is your greatest protection in a boundary dispute."
        }
      }
    ]
  },
  {
    title: "Property Line & Fence Disputes",
    faqs: [
      {
        question: "Can a surveyor enter my neighbor's property without their permission?",
        answer: "Under Section 59.1 of the Land Surveyors Act, a practising land surveyor and their authorized staff have the right to access any land without hindrance while conducting a survey. This \"Right to Trespass\" is necessary because a BCLS must often locate survey monuments on adjacent properties to accurately determine boundaries. While the Act does not mandate prior consent, surveyors are professionally encouraged to attempt notification by knocking or leaving a calling card."
      },
      {
        question: "My neighbor's fence appears to be on my property. What is the first step in resolving this?",
        answer: "The essential first step is a \"Posting\" or \"Boundary Survey\" by a BCLS. This involves the surveyor researching records, taking field measurements, and placing new iron pins at missing property corners. The resulting plan will clearly show the fence's location relative to the legal boundary. This objective, certified evidence is crucial for any negotiation or legal action; without it, an encroachment claim is just an assumption."
      },
      {
        question: "Can a surveyor tell me who owns a shared fence or who is responsible for its repair?",
        answer: "A land surveyor determines the fence's location relative to the boundary, but cannot determine legal ownership or financial responsibility. In BC, property line fences are generally a shared responsibility, potentially governed by local bylaws or common law. After the surveyor establishes the facts, a real estate lawyer is typically needed to advise on the legal implications."
      },
      {
        question: "What is an \"Encroachment,\" and how can it be legally corrected?",
        answer: "An encroachment occurs when a structure (like a fence, shed, or garage) is built on one property but extends onto an adjacent property. A BCLS confirms the boundary line has been crossed. Common resolutions include: 1. Removal: The encroaching structure is moved or demolished. 2. Easement: A formal, registered agreement allows the structure to remain. 3. Boundary Adjustment: The property line is officially moved to incorporate the encroachment.",
        callout: {
          type: "liability",
          title: "The Impartiality of the BCLS",
          content: "A BCLS is a \"quasi-judicial\" officer who represents the boundary, not the client. They must follow the evidence, not favor the person paying the bill. This impartiality ensures their plans are accepted by the LTSA and the courts."
        }
      }
    ]
  },
  {
    title: "Construction & Development",
    faqs: [
      {
        question: "Why does my architect require a \"Topographic Survey\" before designing my home?",
        answer: "Architects need a Topographic Survey (\"Topo\") to understand the three-dimensional lay of the land, not just lot dimensions. A Topo captures elevations (contours), trees, utilities, and structures. In Squamish, this data is crucial for engineers to design proper drainage and stormwater management. Furthermore, local zoning uses \"average finished grade\" (determined accurately by a BCLS Topo) to calculate building height."
      },
      {
        question: "What is a \"Building Location Certificate\", and when do I need one?",
        answer: "A Building Location Certificate, prepared by a BCLS, is a non-statutory plan that maps the exact position of a building's foundation or finished structure relative to the property lines. It is typically required by: 1. Municipal Building Inspectors: To verify compliance with property line setbacks before construction continues. 2. Mortgage Lenders: To confirm the financed structure is entirely within the property boundaries and clear of any encroachments on easements or rights-of-way."
      },
      {
        question: "How do the \"Riparian Areas Protection Regulations\" (RAPR) affect my development in Squamish or Whistler?",
        answer: "If your property is near a watercourse (stream, lake, wetland, or ditch), the RAPR mandates a \"Streamside Protection and Enhancement Area\" (SPEA). A Qualified Environmental Professional (QEP) establishes the \"top of bank\" or \"high water mark,\" which a BCLS then surveys to define the SPEA boundary on the ground. To protect fish habitat, all development—including clearing, grading, and building—is strictly prohibited within the SPEA."
      },
      {
        question: "I am building on a steep slope. What extra surveying is required?",
        answer: "In Squamish and Whistler, sites with significant slopes (25-30% or greater) require a \"Steep Slope Development Permit.\" A BCLS must provide a detailed survey showing boundaries, elevations, and any restrictive covenants (e.g., tree cutting) related to slope stability. This survey is then used by geotechnical engineers for the stability assessments needed for a building permit.",
        callout: {
          type: "pro-tip",
          title: "Managing Encroachments During Construction",
          content: "Request a \"foundation survey\" immediately after footings are poured, but before framing. This early BCLS check can catch setback errors, allowing for corrections costing thousands, instead of hundreds of thousands after completion."
        }
      }
    ]
  },
  {
    title: "Strata & Commercial",
    faqs: [
      {
        question: "How are the boundaries of a strata lot defined?",
        answer: "Unless the registered strata plan specifies otherwise, a strata lot's boundaries are typically the mid-point of the surrounding walls, floors, and ceilings (Section 68(1) of the Strata Property Act). This technicality means the finishes (paint, carpet) are part of the strata lot, but the structural studs and the \"insides\" of the walls are common property."
      },
      {
        question: "What is a \"Bare Land Strata,\" and how does it differ from a traditional strata?",
        answer: "In a bare land strata, the lot is the land itself, marked by survey monuments (iron pins), similar to a traditional subdivision. Common in mobile home parks, recreational sites, and some gated communities, owners are responsible for their buildings and share ownership of common property like roads and amenities."
      },
      {
        question: "What is a \"Strata Title Conversion,\" and why is the vacancy rate important?",
        answer: "A strata conversion takes an existing rental building and subdivides it into strata lots. Section 242 of the Strata Property Act requires municipal approval. To protect rental supply, most BC municipalities, especially in the Lower Mainland, deny conversions if the local rental vacancy rate is below a certain threshold, often 3%."
      },
      {
        question: "What are BOMA standards, and why should a commercial landlord use them?",
        answer: "BOMA (Building Owners and Managers Association) standards are the recognized methodology for calculating commercial building floor area (for office, retail, and industrial properties). These standards ensure that lease agreements are based on accurate data, which is crucial for proper valuation and the recovery of operating expenses."
      }
    ]
  },
  {
    title: "Logistics & Costs",
    faqs: [
      {
        question: "How long does a typical property survey take?",
        answer: "A typical residential posting survey is completed in three stages, requiring an estimated total of 10 to 15 business days: 1. Research & Preparation (3–5 days): Searching Land Title and Survey Authority (LTSA) records and calculating boundary coordinates. 2. Field Work (1–2 days): A survey crew visits the property to locate boundary evidence and place final markers. 3. Drafting & Certification (3–5 days): A BCLS reviews field data, drafts the final plan, and signs the certification."
      },
      {
        question: "Why is a land survey more expensive than a home inspection or an appraisal?",
        answer: "Unlike a home inspection, which is a limited visual assessment, a land survey requires high-precision equipment and access to proprietary LTSA data. A B.C. Land Surveyor (BCLS) accepts a high level of professional liability, as they are personally liable for the accuracy of their boundaries for the life of the plan. Errors can lead to financial consequences in the millions for structural remediation."
      },
      {
        question: "Can a survey be performed in the winter in Whistler or Squamish?",
        answer: "Yes, but it is more challenging and often more expensive. Surveyors must chip through ice to find monuments, and in heavy snow, they may need to shovel large areas to find control points. In Whistler, where snow can be 3-4 meters deep on the ground, \"topographic\" surveys are often less accurate because the surveyor cannot be certain they are hitting the true ground surface rather than a frozen layer of snow."
      },
      {
        question: "How do I read an LTSA plan search result? What do the prefixes mean?",
        answer: "When searching the LTSA, plans are identified by a three-letter prefix that indicates their type and the era they were filed. BCP: Standard Land Title Act plans filed between 2002 and 2007. EPP: Electronic Land Title Act plans filed after 2007 (the current standard). LMS: Lower Mainland Strata plans filed between 1991 and 2002. EPS: Electronic Strata Plans (current standard)."
      },
      {
        question: "What is a \"Natural Boundary,\" and how does it change over time?",
        answer: "A natural boundary is a limit defined by a body of water (ocean, lake, or river). These boundaries are \"ambulatory,\" meaning they can move due to \"Accretion\" (gradual buildup of land) or \"Erosion\" (gradual loss of land). Under BC law, an owner may claim land created by accretion, but a BCLS must perform a specialized survey and file an application with the Surveyor General to have the new boundary legally recognized.",
        callout: {
          type: "liability",
          title: "Title Insurance vs. Land Survey",
          content: "Many homeowners are told that \"Title Insurance\" is a cheaper alternative to a land survey. However, Title Insurance does not tell you where your property lines are or if your neighbor's new deck is encroaching on your land. It only provides a financial payout if a loss is proven. A BCLS provides prevention by identifying issues before the purchase is finalized."
        }
      },
      {
        question: "How are boundary disputes resolved in court?",
        answer: "When neighbor disputes escalate to court, a BCLS is called as an expert witness. Their plans and testimony are the definitive evidence used by judges to settle boundary and encroachment cases.",
        callout: {
          type: "pro-tip",
          title: "Managing Historical Errors",
          content: "Sometimes, a BCLS finds that a whole block of houses was \"shifted\" during construction in the 1960s. In these rare cases, the surveyor works with the LTSA to create a \"Reference Plan\" that corrects the legal descriptions to match the physical reality, ensuring the properties remain salable."
        }
      }
    ]
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("0-0");
  const [activeCategory, setActiveCategory] = useState<number>(0);

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

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common questions about land surveying, reality capture, and our geomatics services in the Sea to Sky corridor."
        canonicalUrl="https://tantalusgeomatics.com/faq"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-green/30 bg-brand-green/10 text-brand-green text-sm font-medium mb-8 rounded-full">
            Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
            <span className="text-brand-green font-medium">Land Surveying</span> FAQ
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Expert insights on boundaries, reality capture, and municipal regulations.
          </p>
        </div>
      </section>

      {/* Main Content - Split Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
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
            <div className="lg:col-span-8 space-y-24">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} id={`category-${catIndex}`} className="scroll-mt-32">
                  <div className="flex items-baseline gap-4 mb-8 border-b border-white/10 pb-4">
                    <span className="text-3xl font-mono text-brand-green font-light">0{catIndex + 1}</span>
                    <h2 className="text-3xl font-light text-white">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => {
                      const id = `${catIndex}-${faqIndex}`;
                      const isOpen = openId === id;
                      
                      return (
                        <div 
                          key={faqIndex} 
                          className="border-b border-white/10 group"
                        >
                          <button
                            className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => setOpenId(isOpen ? null : id)}
                          >
                            <span className={`text-xl font-light transition-colors pr-8 ${isOpen ? 'text-brand-green' : 'text-white group-hover:text-brand-green'}`}>
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
                              isOpen ? 'max-h-[1000px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-white/60 font-light leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                            
                            {/* Callouts */}
                            {faq.callout && (
                              <div className={`mt-6 p-5 rounded-r-lg border-l-2 flex gap-4 items-start ${
                                faq.callout.type === 'pro-tip' 
                                  ? 'bg-brand-green/10 border-brand-green' 
                                  : 'bg-white/5 border-white/30'
                              }`}>
                                {faq.callout.type === 'pro-tip' ? (
                                  <Lightbulb className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-6 h-6 text-white/60 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <strong className={`block font-medium mb-1 ${
                                    faq.callout.type === 'pro-tip' ? 'text-brand-green' : 'text-white/80'
                                  }`}>
                                    {faq.callout.type === 'pro-tip' ? 'Pro-Tip: ' : 'Liability Note: '}
                                    {faq.callout.title}
                                  </strong>
                                  <p className={`font-light text-sm leading-relaxed ${
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
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
