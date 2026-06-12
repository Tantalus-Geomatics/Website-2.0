import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Menu, X, Mountain, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { GoogleMap, LoadScript, Polygon, MarkerF } from '@react-google-maps/api';
import ClientOnly from '../components/ClientOnly'; // <-- Add this import
import AuthorBio from './AuthorBio';
import Breadcrumbs from './Breadcrumbs';

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
  { name: "North Vancouver", lat: 49.3199, lng: -123.0724, slug: "north-vancouver" },
  { name: "West Vancouver", lat: 49.3286, lng: -123.1602, slug: "west-vancouver" },
  { name: "Bowen Island", lat: 49.3783, lng: -123.3286, slug: "bowen-island" },
  { name: "Gibsons", lat: 49.4011, lng: -123.5113, slug: "gibsons" },
  { name: "Sechelt", lat: 49.4716, lng: -123.7544, slug: "sechelt" },
  { name: "Furry Creek", lat: 49.5841, lng: -123.2255, slug: "furry-creek" },
  { name: "Britannia Beach", lat: 49.6256, lng: -123.2037, slug: "britannia-beach" },
  { name: "Squamish", lat: 49.7016, lng: -123.1558, slug: "squamish" },
  { name: "Powell River", lat: 49.8352, lng: -124.5247, slug: "powell-river" },
  { name: "Whistler", lat: 50.1163, lng: -122.9574, slug: "whistler" },
  { name: "Pemberton", lat: 50.3162, lng: -122.8027, slug: "pemberton" },
  { name: "Lillooet", lat: 50.6861, lng: -121.9365, slug: "lillooet" }
];

// Custom smaller pin using inline SVG to reduce overlap
const smallPinIcon = {
  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335" stroke="#FFFFFF" stroke-width="1"/></svg>'),
  scaledSize: { width: 24, height: 24 } as any,
  anchor: { x: 12, y: 24 } as any,
  labelOrigin: { x: 12, y: -10 } as any
};

// Google Maps Configuration
const mapContainerStyle = {
  width: '100%',
  height: '600px'
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
  "founder": {
    "@type": "Person",
    "name": "Dennis Sherman",
    "jobTitle": "Principal & Commissioned British Columbia Land Surveyor",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "York University"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "British Columbia Land Surveyor (BCLS)",
        "credentialCategory": "Professional Commission",
        "recognizedBy": {
          "@type": "Organization",
          "alternateName": "ABCLS",
          "name": "Association of British Columbia Land Surveyors"
        },
        "identifier": "BCLS Commission #1104"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Professional Engineer (P.Eng.)",
        "credentialCategory": "Professional License",
        "recognizedBy": {
          "@type": "Organization",
          "alternateName": "EGBC",
          "name": "Engineers & Geoscientists British Columbia"
        },
        "identifier": "EGBC License #57741"
      }
    ]
  },
  "employee": {
    "@type": "Person",
    "name": "Dennis Sherman",
    "jobTitle": "Principal & Commissioned British Columbia Land Surveyor",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "York University"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "British Columbia Land Surveyor (BCLS)",
        "credentialCategory": "Professional Commission",
        "recognizedBy": {
          "@type": "ProfessionalAssociation",
          "name": "Association of British Columbia Land Surveyors",
          "abbreviation": "ABCLS"
        },
        "identifier": "BCLS Commission #1104"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Professional Engineer (P.Eng.)",
        "credentialCategory": "Professional License",
        "recognizedBy": {
          "@type": "ProfessionalAssociation",
          "name": "Engineers & Geoscientists British Columbia",
          "abbreviation": "EGBC"
        },
        "identifier": "EGBC License #57741"
      }
    ]
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
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
    { name: 'Services', path: '/services/' },
    { name: 'FAQ', path: '/faq/' },
    { name: 'Contact', path: '/contact/' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-brand-black">
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
      <header className="bg-brand-dark border-b-2 border-brand-green sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-20 sm:h-24 items-center gap-2">
            
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 z-10 min-w-0">
              <img 
                src="/tantalus-logo.webp" 
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
                  className="bg-brand-green text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-sm md:text-base flex items-center gap-1.5 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
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
                aria-label="Open primary navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-dark border-t-2 border-brand-green">
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
        <Breadcrumbs />
        <Outlet />
      </main>

      {/* Global Author Biography Component */}
      <AuthorBio />

      {/* Footer */}
      <footer className="bg-brand-dark border-t-2 border-brand-green text-white/70 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Balanced 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mb-12">
            
            {/* Left Column: Branding, Contact Details, and Social Links */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                {/* Branding elements (Logo, Title, Subtitle) header block */}
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="/tantalus-logo.webp" 
                    alt="Tantalus Geomatics Logo" 
                    className="h-8 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Mountain size={24} className="text-white hidden" />
                  <div className="flex flex-col">
                    <span className="font-normal text-lg leading-tight text-white tracking-wide">Tantalus Geomatics</span>
                    <span className="text-xs font-normal text-brand-green tracking-wide">Land Surveying Ltd.</span>
                  </div>
                </div>
                
                {/* Company Tagline */}
                <p className="text-sm text-white/60 mb-6">
                  Professional Land Surveying throughout the Sea to Sky corridor.
                </p>

                {/* Contact Information */}
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
              
              {/* Social Links matching the exact bottom alignment of the right column */}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.linkedin.com/company/tantalus-geomatics" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Linkedin className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                </a>
                <a href="https://github.com/Tantalus-Geomatics" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Github className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column: ABCLS Affiliation Information */}
            <div className="flex flex-col justify-between space-y-6 lg:pl-6">
              <div>
                <h3 className="text-white font-medium text-lg mb-4">Professional Affiliation</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Tantalus Geomatics Land Surveying Ltd is a proud member of the Association of BC Land Surveyors.
                </p>
              </div>
              
              {/* ABCLS Logo block calibrated to level-align vertically with the left column social row */}
              <a href="https://www.abcls.ca/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-2/3 lg:w-3/4 transition-transform hover:scale-[1.02] block pt-2">
                <div className="bg-white p-2 rounded-sm w-full">
                  <img 
                    src="/images/abcls-logo-horizontal.svg" 
                    alt="Association of BC Land Surveyors Logo" 
                    className="w-full h-auto object-contain opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            </div>

          </div>
        </div>

        {/* Full-width Map Container */}
        <div className="w-full relative left-0 right-0 z-0 mb-12">
          <div className="w-full overflow-hidden relative z-0">
            <ClientOnly 
              fallback={
                <div className="w-full h-full min-h-[600px] bg-brand-dark/50 animate-pulse flex flex-col items-center justify-center gap-4">
                  <MapPin size={32} className="text-brand-green/50 animate-bounce" />
                  <span className="text-white/50 font-light tracking-wide">Loading Interactive Map...</span>
                </div>
              }
            >
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={8}
                  options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true,
                  }}
                >
                  <Polygon 
                    paths={serviceAreaPaths} 
                    options={polygonOptions} 
                  />
                  
                  {serviceLocations.map((loc, index) => (
                    <MarkerF
                      key={index}
                      position={{ lat: loc.lat, lng: loc.lng }}
                      icon={smallPinIcon}
                      onClick={() => navigate('/' + loc.slug + '/')}
                      label={{
                        text: loc.name,
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '600',
                        className: 'mt-6 drop-shadow-md bg-black/50 px-1.5 py-0.5 rounded cursor-pointer'
                      }}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </ClientOnly>
          </div>
        </div>

        {/* Delimited Regional List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm">
            {serviceLocations.map((loc, index) => (
              <React.Fragment key={loc.slug}>
                <Link to={`/${loc.slug}/`} className="text-brand-green hover:text-brand-green-dark transition-colors font-medium">
                  {loc.name}
                </Link>
                {index < serviceLocations.length - 1 && (
                  <span className="text-slate-300">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Full-width Copyright Line */}
        <div className="w-full border-t-2 border-brand-green pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-white/40 text-center">
            &copy; {new Date().getFullYear()} Tantalus Geomatics Land Surveying Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}