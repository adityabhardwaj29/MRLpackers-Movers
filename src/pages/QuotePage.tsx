import React from 'react';
import { QuoteFormSection } from '../components/QuoteFormSection';
import { QuoteFormData } from '../types';
import { Tag, ShieldCheck, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface QuotePageProps {
  onSubmitQuoteForm: (data: QuoteFormData) => void;
  onNavigatePage: (page: 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'quote' | 'privacy' | 'terms') => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onSubmitQuoteForm, onNavigatePage }) => {
  return (
    <div className="bg-slate-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600/20 text-red-400 rounded-full text-xs font-black uppercase tracking-widest border border-red-500/30">
          <Tag className="w-4 h-4 text-red-500" />
          INSTANT BINDING ESTIMATE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Get Your Free Relocation Quote
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero deposit required. Get an accurate moving cost calculation with transparent pricing and 100% free transit insurance.
        </p>

        {/* Quick Action Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Advance Fees</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>UDYAM Govt Registered</span>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>15-Minute Instant Callback</span>
          </span>
        </div>
      </div>

      {/* Main Quote Form Section */}
      <div className="max-w-7xl mx-auto">
        <QuoteFormSection onSubmitQuoteForm={onSubmitQuoteForm} />
      </div>
    </div>
  );
};
