import { useState, type ReactNode } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  locationName?: string;
}

function highlightLocation(text: string, locationName?: string): ReactNode {
  if (!text) return text;
  const targetLocation = locationName || 'the Sea to Sky';
  const cleanedText = text.replace(/\bSea To Sky\b/gi, 'the Sea to Sky');
  const parts = cleanedText.split(new RegExp(`(${targetLocation})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === targetLocation.toLowerCase() ? (
          <span key={index} className="text-brand-green-dark font-semibold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function FAQAccordion({ faqs, locationName }: FAQAccordionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openFaqIndex === index;
        return (
          <div 
            key={index} 
            className="border border-slate-200 rounded-xl overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-slate-100/70 transition-all"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-slate-900 pr-4 flex items-center gap-3 text-lg">
                <HelpCircle size={20} className="text-brand-green-dark shrink-0" />
                {faq.question}
              </span>
              {isOpen ? (
                <ChevronUp size={24} className="text-slate-500 shrink-0" />
              ) : (
                <ChevronDown size={24} className="text-slate-500 shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="p-6 bg-white border-t border-slate-200">
                <p className="text-slate-700 font-light leading-relaxed text-base">
                  {highlightLocation(faq.answer, locationName)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
