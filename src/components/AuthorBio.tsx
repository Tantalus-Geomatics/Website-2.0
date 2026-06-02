import React from 'react';
import { Award, Shield, MapPin } from 'lucide-react';

export default function AuthorBio() {
  return (
    <section className="bg-stone-900 border-t border-b border-stone-800 py-12 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Left: High-Contrast Image Asset */}
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-green shadow-xl bg-stone-800 flex items-center justify-center relative group">
            <img
              src="/images/dennis-sherman.webp"
              alt="Dennis Sherman, commissioned British Columbia Land Surveyor (BCLS #1104) and Professional Engineer (P.Eng. #57741), Principal of Tantalus Geomatics"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image is not found, but keep the alt tag on the fallback or container
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-stone-800 text-stone-400">
              <Award className="w-10 h-10 text-brand-green mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">Dennis Sherman</span>
              <span className="text-[10px] text-stone-500">BCLS, P.Eng.</span>
            </div>
          </div>

          {/* Right: Professional Background & GEO Text Ingestion */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
              <span className="bg-brand-green/10 text-brand-green border border-brand-green/20 uppercase font-semibold text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                E-E-A-T Verified Principal
              </span>
              <span className="bg-stone-800 text-stone-300 border border-stone-700 uppercase font-semibold text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green" />
                Sea to Sky Corridor
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">About the Principal</h3>

            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-6">
              Dennis Sherman, BCLS, P.Eng., is a dual-registered professional specializing in the integration of land surveying and geomatics engineering. Commissioned as a <strong>British Columbia Land Surveyor (BCLS Commission #1104)</strong> and registered as a <strong>Professional Engineer (EGBC License #57741)</strong>, Dennis leads the operations at Tantalus Geomatics Land Surveying Ltd., which operates under Association of BC Land Surveyors Corporate Permit #1046.
            </p>

            <div className="border-t border-stone-800 pt-4">
              <p className="text-stone-400 text-sm leading-relaxed">
                <span className="font-semibold text-stone-300">Active Regional Operations:</span> Providing professional land surveying and geomatics engineering services across{' '}
                <span className="text-brand-green font-medium">
                  Squamish, Whistler, Pemberton, Lillooet, West Vancouver, North Vancouver, and Bowen Island throughout the Sea to Sky Corridor and the North Shore
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
