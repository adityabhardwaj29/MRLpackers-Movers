import React, { useState, useEffect } from 'react';
import { Flame, Clock, Tag, ArrowRight } from 'lucide-react';

interface UrgencyBannerProps {
  onOpenQuoteModal: () => void;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ onOpenQuoteModal }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white py-2.5 px-4 shadow-md relative overflow-hidden border-b border-red-500/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2 justify-center">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>
            <strong className="underline decoration-amber-300 underline-offset-2">SPECIAL RELOCATION OFFER:</strong> Book
            Today & Get <span className="bg-black/40 px-2 py-0.5 rounded font-black text-amber-300">10% DISCOUNT</span> + Free Transit Insurance!
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full text-xs font-mono font-bold border border-white/20">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>
              Promo ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m{' '}
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="hidden sm:flex items-center gap-1 px-3.5 py-1 bg-white hover:bg-slate-100 text-red-600 text-xs font-black rounded-full transition-all hover:scale-105 shadow"
          >
            <Tag className="w-3 h-3 text-red-600" />
            <span>Claim Discount</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
