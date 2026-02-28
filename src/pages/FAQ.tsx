import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

const faqs = [
  {
    question: "What is a topographic survey and when do I need one?",
    answer: "A topographic survey maps the physical features of a property, including elevation changes, trees, buildings, and utilities. You typically need one before starting any significant design or construction project, as architects and engineers rely on this data to create accurate plans."
  },
  {
    question: "Do I need a land survey to build a fence?",
    answer: "Yes, it is highly recommended. Building a fence without knowing your exact property lines can lead to costly disputes with neighbors or the municipality if the fence encroaches on adjacent land."
  },
  {
    question: "How much does a land survey cost?",
    answer: "The cost of a survey varies depending on the size of the property, the type of survey required, the terrain, and the availability of historical survey records. Please contact us with your property details for a customized quote."
  },
  {
    question: "What is Reality Capture?",
    answer: "Reality capture involves using advanced technologies like 3D laser scanning, photogrammetry, and LiDAR to create highly accurate 3D digital models of physical spaces. It's invaluable for complex renovations, heritage preservation, and detailed site analysis."
  },
  {
    question: "How long does a typical survey take?",
    answer: "Fieldwork can often be completed in one to two days, depending on the site's complexity. However, the entire process—including research, fieldwork, drafting, and quality control—typically takes 2-4 weeks. We will provide a specific timeline when you request a quote."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-brand-black min-h-screen">
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common questions about land surveying, reality capture, and our geomatics services in the Sea to Sky corridor."
        canonicalUrl="https://tantalusgeomatics.com/faq"
      />
      {/* Hero */}
      <section className="bg-brand-dark py-24 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Common questions about our land surveying and geomatics services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 bg-brand-dark/50 overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-green flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/70 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
