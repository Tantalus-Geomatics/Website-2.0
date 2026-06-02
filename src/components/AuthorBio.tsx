import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, Shield, MapPin } from 'lucide-react';

export default function AuthorBio() {
  const { locationSlug } = useParams<{ locationSlug?: string }>();

  const formattedLocation = locationSlug
    ? locationSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Sea to Sky Corridor';

  return (
    <section className="bg-stone-900 border-t border-b border-stone-800 py-12 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
          {/* Left: High-Contrast Image Asset */}
          <img
            src="/images/dennis-sherman-mugshot.webp"
            alt="Dennis Sherman, BCLS, P.Eng. - Commissioned British Columbia Land Surveyor and Professional Engineer in Squamish, Whistler, and the Sea to Sky Corridor"
            className="w-48 h-48 md:h-auto object-cover shrink-0 rounded-xl border-2 border-brand-green shadow-xl"
          />

          {/* Right: Professional Background & GEO Text Ingestion */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
              <span className="bg-brand-green/10 text-brand-green border border-brand-green/20 uppercase font-semibold text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                BC Land Surveyor
              </span>
              <span className="bg-brand-green/10 text-brand-green border border-brand-green/20 uppercase font-semibold text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Professional Engineer
              </span>
              <span className="bg-stone-800 text-stone-300 border border-stone-700 uppercase font-semibold text-xs rounded-full px-3 py-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green" />
                {formattedLocation}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">About the Principal</h3>

            <p className="text-stone-300 text-base md:text-lg leading-relaxed">
              Dennis Sherman, <strong>BCLS</strong>, <strong>P.Eng.</strong>, is a dual-registered professional specializing in the integration of land surveying and geomatics engineering. Commissioned as a <strong>British Columbia Land Surveyor (BCLS Commission #1104)</strong> and registered as a <strong>Professional Engineer (EGBC Registration #57741)</strong>, Dennis leads the operations at Tantalus Geomatics Land Surveying Ltd., which operates under (<strong>Association of BC Land Surveyors Corporate Permit #1046</strong>).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
