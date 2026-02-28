import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

const faqs = [
  {
    question: "Why do I need a BCLS for my project?",
    answer: "In British Columbia, the practice of land surveying is governed by the Land Surveyors Act. Only a licensed British Columbia Land Surveyor (BCLS) is authorized to determine the location of property boundaries. This regulation ensures that the person responsible for the legal survey fabric is held to the highest ethical and technical standards, protecting the public interest and the security of land ownership."
  },
  {
    question: "How long is a topographic survey valid for in Squamish or Whistler?",
    answer: "For the purposes of municipal permit applications, topographic surveys are generally considered valid for six months. Municipalities like the District of Squamish and RMOW require current data to ensure that site conditions have not changed significantly—due to grading, tree removal, or infrastructure work—before a permit is issued. If your project has been on hold, you may need a \"re-survey\" to confirm the data is still accurate."
  },
  {
    question: "What is the difference between Title Insurance and a Surveyor’s Certificate?",
    answer: "While both provide protection in a real estate transaction, they serve very different purposes. Title Insurance is an insurance policy that protects against financial loss related to title defects or unknown encroachments; it is a financial product, not a boundary measurement. A Surveyor’s Certificate (or Plan of Survey) is a physical document created by a BCLS that shows the exact location of buildings and property lines. While Title Insurance may help \"close\" a transaction, only a Surveyor's Certificate shows you exactly what you are buying and where the boundaries truly lie."
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
