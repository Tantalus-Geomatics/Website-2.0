import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, Mountain, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';

// GeoJSON definition of the Sea to Sky & Lower Mainland service area
const serviceAreaGeoJSON: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Tantalus Geomatics Service Area",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-123.38, 49.30], // West of Bowen Island
            [-123.40, 49.45], // Coastal approach
            [-123.20, 49.80], // West of Squamish
            [-123.10, 50.20], // West of Whistler
            [-122.85, 50.40], // West of Pemberton
            [-121.80, 50.80], // North/West of Lillooet
            [-121.70, 50.60], // East of Lillooet
            [-122.60, 50.10], // East of Whistler
            [-122.80, 49.60], // East of Squamish/Furry Creek
            [-123.00, 49.30], // North Vancouver
            [-123.38, 49.30]  // Close polygon
          ]
        ]
      }
    }
  ]
};

// JSON-LD Schema for SEO/GEO crawlers
// Maps to the exact polygon vertices to ensure spatial indexing matches the visual applet
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Land Surveying",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Tantalus Geomatics Land Surveying Ltd.",
    "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
    "telephone": "+16042139934"
  },
  "areaServed": {
    "@type": "GeoShape",
    "polygon": "49.30,-123.38 49.45,-123.40 49.80,-123.20 50.20,-123.10 50.40,-122.85 50.80,-121.80 50.60,-121.70 50.10,-122.60 49.60,-122.80 49.30,-123.00 49.30,-123.38"
  }
};

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-brand-black">
      {/* SEO Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Top Banner */}
      <div className="bg-brand-green text-black py-2 px-4 text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2">
        <MapPin size={16} className="shrink-0" />
        <span className="truncate sm:whitespace-normal">
          Proudly Surveying the Sea to Sky Corridor: West Vancouver to Lillooet
        </span>
      </div>

      {/* Navigation */}
      <header className="bg-brand-black border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-20 sm:h-24 items-center gap-2">
            
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 z-10 min-w-0">
              <img 
                src="tantalus-logo.webp" 
                alt="Tantalus Geomatics Logo" 
                className="h-7 sm:h-12 w-auto object-contain shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Mountain size={32} className="text-white hidden sm:w-10 sm:h-10 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-normal text-[15px] sm:text-2xl leading-tight text-white tracking-wide truncate">Tantalus Geomatics</span>
                <span className="text-[10px] sm:text-sm font-normal text-brand-green tracking-wide truncate">Land Surveying Ltd.</span>
              </div>
            </Link>

            {/* Right: Actions & Mobile Menu */}
            <div className="flex items-center gap-2.5 sm:gap-6 z-10 shrink-0">
              
              {/* CTA Button */}
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:flex">
                <a 
                  href="tel:6042139934" 
                  className="bg-brand-green text-black px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-sm md:text-base flex items-center gap-1.5 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                >
                  <Phone size={14} className="md:w-5 md:h-5 shrink-0" />
                  <span className="hidden lg:inline">Call</span>
                  <span className="inline lg:hidden">Call</span>
                </a>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-brand-green ${
                      location.pathname === link.path ? 'text-brand-green' : 'text-white/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-1 text-white/80 hover:text-white rounded-md shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-dark border-t border-white/10">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-white/5 text-brand-green'
                      : 'text-white/80 hover:bg-white/5 hover:text-brand-green'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/10 text-white/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="tantalus-logo.webp" 
                alt="Tantalus Geomatics Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Mountain size={24} className="text-white hidden" />
              <div className="flex flex-col">
                <span className="font-normal text-lg leading-tight text-white tracking-wide">Tantalus Geomatics </span>
                <span className="text-xs font-normal text-brand-green tracking-wide">Land Surveying Ltd.</span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Professional Land Surveying throughout the Sea to Sky corridor.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <p className="text-xs text-white/50 leading-relaxed">
                Tantalus Geomatics Land Surveying Ltd is a proud member of the Association of BC Land Surveyors.
              </p>
              <a href="https://www.abcls.ca/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-2/3 lg:w-full transition-transform hover:scale-105">
                <div className="bg-white p-2 rounded-sm w-full">
                  <img 
                    src="images/abcls-logo-horizontal.svg" 
                    alt="Association of BC Land Surveyors Logo" 
                    className="w-full object-contain opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-green" />
                <a href="tel:+16042139934" className="hover:text-white transition-colors">(604) 213 9934</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-green" />
                <a href="mailto:contact@tantalusgeomatics.com" className="hover:text-white transition-colors">contact@tantalusgeomatics.com</a>
              </li>
            </ul>
          </div>

          {/* Interactive Map Applet replacing standard text list */}
          <div className="lg:col-span-1 flex flex-col h-64 lg:h-auto">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-brand-green"/> 
              Service Area Map
            </h3>
            <div className="flex-grow rounded-md overflow-hidden border border-white/20 relative z-0">
              <MapContainer 
                center={[49.95, -122.90]} 
                zoom={7} 
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON 
                  data={serviceAreaGeoJSON} 
                  pathOptions={{ color: '#6B9E54', fillColor: '#6B9E54', fillOpacity: 0.3, weight: 2 }} 
                />
              </MapContainer>
            </div>
            <p className="text-xs text-white/50 mt-2">
              Serving Squamish, Whistler, Pemberton, Lillooet, West Vancouver, Bowen Island, Britannia Beach, Furry Creek, and North Vancouver.
            </p>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-sm text-white/40 text-center">
          &copy; {new Date().getFullYear()} Tantalus Geomatics Land Surveying Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}