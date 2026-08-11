import React from 'react';
import { Phone, MessageSquare, Tag } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface FloatingBottomBarProps {
  onOpenQuoteModal: () => void;
}

export const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({
  onOpenQuoteModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-3 pt-2 pb-2.5 shadow-2xl">
      {/* Top Status Badge */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1.5 px-1">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          24/7 Booking Available
        </span>
        <span className="text-red-400 font-black uppercase tracking-wider">
          MRL Experienced & Trusted
        </span>
      </div>

      {/* 3 Primary Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Call Now */}
        <a
          href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-900 active:bg-slate-800 text-white font-bold border border-slate-700 active:scale-95 transition-all duration-150 shadow-sm"
        >
          <Phone className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
          <span className="text-xs font-black uppercase tracking-tight whitespace-nowrap">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20need%20a%20relocation%20quote.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-black active:scale-95 transition-all duration-150 shadow-md"
        >
          <MessageSquare className="w-4 h-4 fill-white flex-shrink-0" />
          <span className="text-xs font-black uppercase tracking-tight whitespace-nowrap">WhatsApp</span>
        </a>

        {/* Get Free Quote */}
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-600 active:bg-red-700 text-white font-black active:scale-95 transition-all duration-150 shadow-md"
        >
          <Tag className="w-4 h-4 text-white flex-shrink-0" />
          <span className="text-xs font-black uppercase tracking-tight whitespace-nowrap">Free Quote</span>
        </button>
      </div>
    </div>
  );
};
