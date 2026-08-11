import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck, ChevronDown, FileText, Scale, Home, Sparkles, Image as ImageIcon, Building, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { MRLLogo } from './MRLLogo';

export type PageType = 'home' | 'services' | 'gallery' | 'about' | 'privacy' | 'terms';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  currentPage: PageType;
  onNavigatePage: (page: PageType) => void;
  themeColor?: 'indigo' | 'navy' | 'emerald';
  setThemeColor?: (color: 'indigo' | 'navy' | 'emerald') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoteModal,
  currentPage,
  onNavigatePage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageType) => {
    setIsMobileMenuOpen(false);
    setIsLegalDropdownOpen(false);
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: PageType; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Notification / Trust Bar */}
      <div className="bg-slate-950 text-white text-[11px] font-medium py-1.5 px-4 border-b border-slate-850 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Mumbai Relocation Helpline
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">
              Govt. MSME Reg: <strong className="text-white font-mono">UDYAM-MH-18-0182820</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href={`tel:${COMPANY_INFO.phonePrimaryTel}`} className="hover:text-white flex items-center gap-1">
              <Phone className="w-3 h-3 text-red-500" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white text-slate-300">
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-md py-2.5'
            : 'bg-white border-slate-200 shadow-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group py-1 text-left cursor-pointer"
          >
            <MRLLogo size={54} showText={true} textColor="dark" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-bold text-slate-700">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-red-600 text-white font-black shadow-md shadow-red-600/25'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full mb-0.5 opacity-80" />
                  )}
                </button>
              );
            })}

            {/* Legal Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsLegalDropdownOpen(!isLegalDropdownOpen)}
                onMouseEnter={() => setIsLegalDropdownOpen(true)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  currentPage === 'privacy' || currentPage === 'terms'
                    ? 'bg-slate-100 text-red-600 font-black'
                    : 'text-slate-700 hover:text-red-600 hover:bg-slate-100/80'
                }`}
              >
                <span>Legal</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isLegalDropdownOpen && (
                <div
                  onMouseLeave={() => setIsLegalDropdownOpen(false)}
                  className="absolute top-full right-0 mt-1 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 flex flex-col gap-1 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => handleNavClick('terms')}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors cursor-pointer ${
                      currentPage === 'terms' ? 'bg-red-50 text-red-600 font-black' : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>Terms & Conditions</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('privacy')}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors cursor-pointer ${
                      currentPage === 'privacy' ? 'bg-red-50 text-red-600 font-black' : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>Privacy Policy</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black border border-slate-200 transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
              <span className="whitespace-nowrap">{COMPANY_INFO.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20need%20a%20relocation%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white flex-shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Call Helpline"
            >
              <Phone className="w-4 h-4 text-red-600" />
            </a>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20need%20a%20relocation%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow active:scale-95 transition-transform"
              aria-label="WhatsApp Us"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 text-white border-b border-slate-800 px-4 py-5 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-850 mb-3">
            <MRLLogo size={44} showText={true} textColor="light" />
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 block">
                ● 24/7 Active
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white font-black border-red-500 shadow-md shadow-red-600/30'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <span className="font-bold">{item.label}</span>
                  <span className="text-xs opacity-75">{isActive ? '● Active' : '›'}</span>
                </button>
              );
            })}

            {/* Legal Pages in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pt-2 pb-1">
              <button
                onClick={() => handleNavClick('terms')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  currentPage === 'terms'
                    ? 'bg-red-600 text-white border-red-500 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-red-400" />
                <span>Terms & Conditions</span>
              </button>

              <button
                onClick={() => handleNavClick('privacy')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  currentPage === 'privacy'
                    ? 'bg-red-600 text-white border-red-500 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-red-400" />
                <span>Privacy Policy</span>
              </button>
            </div>

            {/* Action buttons inside drawer */}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Request Free Moving Quote</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20need%20a%20relocation%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Official Desk</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
