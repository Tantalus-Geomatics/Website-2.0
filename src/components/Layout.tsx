import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, Mountain, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

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
      {/* Top Banner */}
      <div className="bg-brand-green text-black py-2 px-4 text-sm font-semibold text-center flex items-center justify-center gap-2">
        <MapPin size={16} />
        <span>Squamish • Whistler • Pemberton • Lillooet • West Vancouver • Bowen Island</span>
      </div>

      {/* Navigation */}
      <header className="bg-brand-black border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="Tantalus Geomatics Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to the Mountain icon if the image isn't found
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Mountain size={40} className="text-white hidden" />
              <div className="flex flex-col">
                <span className="font-normal text-2xl leading-tight text-white tracking-wide">Tantalus Geomatics</span>
                <span className="text-sm font-normal text-brand-green tracking-wide">Land Surveying Ltd.</span>
              </div>
            </Link>

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
              className="md:hidden p-2 text-white/80 hover:text-white rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.svg" 
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
            <p className="text-sm text-white/60 mb-4">
              Professional Land Surveying services for homeowners, developers, and industry professionals in the Sea to Sky corridor.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-green" />
                (604) 213 9934
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-green" />
                <a href="mailto:contact@tantalusgeomatics.com" className="hover:text-white transition-colors">contact@tantalusgeomatics.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/60">
              <li>Squamish</li>
              <li>Whistler</li>
              <li>Pemberton</li>
              <li>Lillooet</li>
              <li>West Vancouver</li>
              <li>Bowen Island</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-sm text-white/40 text-center">
          &copy; {new Date().getFullYear()} Tantalus Geomatics Land Surveying Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
