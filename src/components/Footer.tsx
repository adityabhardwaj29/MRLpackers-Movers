import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, ArrowUp, FileText, Scale, Home, Sparkles, Image as ImageIcon, Building } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { MRLLogo } from './MRLLogo';
import { PageType } from './Navbar';

interface FooterProps {
  onNavigatePage: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageType) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <MRLLogo size={64} showText={true} textColor="light" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-normal">
              MRL Packers & Movers is Mumbai's premier trusted relocation enterprise offering household shifting, office relocation, vehicle transport, and safe warehouse storage across Maharashtra and Pan-India.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-red-400 font-mono font-bold block">
                UDYAM REGISTRATION NUMBER: UDYAM-MH-18-0182820
              </span>
              <span className="text-slate-400 text-[11px] block">
                Govt. of India Ministry of MSME Registered Enterprise • Kandivali East, Mumbai
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-red-400 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>{COMPANY_INFO.phonePrimary}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phoneSecondaryTel}`}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{COMPANY_INFO.phoneSecondary}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Home, Services, Gallery, About) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span>
                  <span>All Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span>
                  <span>Photo Gallery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span>
                  <span>About Us</span>
                </button>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer text-slate-400"
                >
                  <Scale className="w-3 h-3 text-red-500" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer text-slate-400"
                >
                  <FileText className="w-3 h-3 text-red-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Mumbai Area Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Mumbai Coverage
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-400 font-medium">
              <span>Kandivali East/West</span>
              <span>Borivali East/West</span>
              <span>Malad & Goregaon</span>
              <span>Andheri East/West</span>
              <span>Bandra & Khar</span>
              <span>Powai & Vikhroli</span>
              <span>Thane West</span>
              <span>Navi Mumbai</span>
              <span>BKC & Dadar</span>
              <span>Pune Intercity</span>
            </div>
          </div>

          {/* Col 4: Registered Head Office & Email */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Registered Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300 font-semibold">{COMPANY_INFO.headOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline hover:text-white text-slate-300">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  onClick={() => handleNav('privacy')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>Privacy Policy</span>
                </button>
                <button
                  onClick={() => handleNav('terms')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-red-500" />
                  <span>Terms & Conditions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">MRL PACKERS AND MOVERS</strong>. UDYAM: <span className="text-slate-400 font-mono">UDYAM-MH-18-0182820</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 flex items-center gap-1.5 font-bold transition-all hover:text-white cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-red-500" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
