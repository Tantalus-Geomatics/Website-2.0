import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, Mountain, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { GoogleMap, LoadScript, Polygon, MarkerF } from '@react-google-maps/api';

// Converted service area coordinates to Google Maps { lat, lng } format
const serviceAreaPaths = [
  { lat: 49.30, lng: -123.00 }, // North Vancouver
  { lat: 49.32, lng: -123.40 }, // West Vancouver / Bowen Island
  { lat: 49.40, lng: -123.55 }, // Lower Sunshine Coast (Gibsons)
  { lat: 49.48, lng: -123.80 }, // Middle Sunshine Coast (Sechelt)
  { lat: 49.62, lng: -124.05 }, // Upper Sunshine Coast (Earls Cove / Egmont)
  { lat: 49.85, lng: -124.55 }, // Powell River
  { lat: 50.00, lng: -124.80 }, // Lund / Desolation Sound Boundary
  { lat: 50.25, lng: -123.65 }, // Upper Squamish Valley / Elaho River
  { lat: 50.45, lng: -122.95 }, // Pemberton / Pemberton Meadows
  { lat: 50.80, lng: -121.80 }, // North/West of Lillooet
  { lat: 50.60, lng: -121.70 }, // East of Lillooet
  { lat: 50.10, lng: -122.60 }, // East of Whistler / Garibaldi Park
  { lat: 49.60, lng: -122.80 }, // East of Squamish Range
  { lat: 49.30, lng: -123.00 }  // Close polygon back at North Vancouver
];

// Specific coordinates for the location pins
const serviceLocations = [
  { name: "North Vancouver", lat: 49.3199, lng: -123.0724 },
  { name: "West Vancouver", lat: 49.3286, lng: -123.1602 },
  { name: "Bowen Island", lat: 49.3783, lng: -123.3286 },
  { name: "Gibsons", lat: 49.4011, lng: -123.5113 },
  { name: "Sechelt", lat: 49.4716, lng: -123.7544 },
  { name: "Furry Creek", lat: 49.5841, lng: -123.2255 },
  { name: "Britannia Beach", lat: 49.6256, lng: -123.2037 },
  { name: "Squamish", lat: 49.7016, lng: -123.1558 },
  { name: "Powell River", lat: 49.8352, lng: -124.5247 },
  { name: "Whistler", lat: 50.1163, lng: -122.9574 },
  { name: "Pemberton", lat: 50.3162, lng: -122.8027 },
  { name: "Lillooet", lat: 50.6861, lng: -121.9365 }
];

// Custom smaller pin using inline SVG to reduce overlap
const smallPinIcon = {
  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335" stroke="#FFFFFF" stroke-width="1"/></svg>')
};

// Google Maps Configuration
const mapContainerStyle = {
  width: '100%',
  height: '100%', // Fills the grid container naturally
  minHeight: '450px' // Fallback for mobile stacking
};

const mapCenter = {
  lat: 49.95, 
  lng: -123.15 
};

const polygonOptions = {
  fillColor: "#6B9E54",
  fillOpacity: 0.3,
  strokeColor: "#6B9E54",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
};

// JSON-LD Schema optimized for Local SEO and GEO Spatial Crawlers
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Tantalus Geomatics Land Surveying Ltd.",
  "description": "Professional land surveying, topographic mapping, and legal boundary definition across the Sea to Sky Corridor, North Shore, and Sunshine Coast.",
  "url": "https://tantalusgeomatics.com",
  "logo": "https://tantalusgeomatics.com/tantalus-logo.webp",
  "image": "https://tantalusgeomatics.com/tantalus-logo.webp",
  "telephone": "+16042139934",
  "email": "contact@tantalusgeomatics.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Squamish",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.7016,
    "longitude": -123.1558
  },
  "areaServed": [
    {
      "@type": "GeoShape",
      "polygon": "49.30,-123.00 49.32,-123.40 49.40,-123.55 49.48,-123.80 49.62,-124.05 49.85,-124.55 50.00,-124.80 50.25,-123.65 50.45,-122.95 50.80,-121.80 50.60,-121.70 50.10,-122.60 49.60,-122.80 49.30,-123.00"
    },
    { "@type": "City", "name": "Squamish" },
    { "@type": "City", "name": "Whistler" },
    { "@type": "City", "name": "Pemberton" },
    { "@type": "City", "name": "Lillooet" },
    { "@type": "City", "name": "North Vancouver" },
    { "@type": "City", "name": "West Vancouver" },
    { "@type": "City", "name": "Bowen Island" },
    { "@type": "City", "name": "Gibsons" },
    { "@type": "City", "name": "Sechelt" },
    { "@type": "City", "name": "Powell River" },
    { "@type": "City", "name": "Britannia Beach" },
    { "@type": "City", "name": "Furry Creek" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional Land Surveying Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Legal Boundary Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Topographic Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Building Location Certificates" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site Plan Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Line Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tree Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ab-Built Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BC Land Surveyors Survey Certificates" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Foundation Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Form Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction Staking Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Quantity Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Monitoring Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strata Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Subdivision Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Easement Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Right of Way Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Covenant Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consolidation Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airspace Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drone Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LiDAR Surveys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3D Laser Scanning Surveys" } }
    ]
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
          Sea to Sky | Vancouver's North Shore | Sunshine Coast
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
      <footer className="bg-brand-dark border-t border-white/10 text-white/70 pt-12 pb-8">
        {/* Adjusted to a 3-column grid layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mb-12">
          
          {/* Column 1: Contact Info and Brand Identity */}
          <div className="lg:col-span-1 flex flex-col gap-10">
            
            {/* Contact Info (Moved Up) */}
            <div>
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

            {/* Brand/ABCLS Info (Moved Down) */}
            <div>
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

          </div>

          {/* Column 2 & 3: Interactive Google Map Applet (Expanded horizontally and stretched vertically) */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-brand-green"/> 
              Service Area Map
            </h3>
            
            <div className="flex-grow rounded-md overflow-hidden border border-white/20 relative z-0">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={8}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                >
                  <Polygon 
                    paths={serviceAreaPaths} 
                    options={polygonOptions} 
                  />
                  
                  {/* Render scaled-down pins for each service location */}
                  {serviceLocations.map((loc, index) => (
                    <MarkerF
                      key={index}
                      position={{ lat: loc.lat, lng: loc.lng }}
                      icon={smallPinIcon}
                      label={{
                        text: loc.name,
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '600',
                        className: 'mt-6 drop-shadow-md bg-black/50 px-1.5 py-0.5 rounded'
                      }}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

        </div>

        {/* Full-width Copyright Line */}
        <div className="w-full border-t border-white/10 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-white/40 text-center">
            &copy; {new Date().getFullYear()} Tantalus Geomatics Land Surveying Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}