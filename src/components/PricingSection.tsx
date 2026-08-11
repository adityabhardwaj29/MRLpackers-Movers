import React from 'react';
import { PRICING_PLANS } from '../data';
import { PricingPlan } from '../types';
import { Check, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenQuoteModal?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, onOpenQuoteModal }) => {
  return (
    <section id="pricing" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
            TRANSPARENT RELOCATION PACKAGES
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clear Shifting Rates in Mumbai
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Upfront itemized cards for 1BHK, 2BHK, 3BHK & Large Homes including loading, packaging & toll taxes.
          </p>
        </div>

        {/* Pricing Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all ${
                plan.recommended
                  ? 'bg-slate-900 text-white border-2 border-red-500 shadow-lg md:scale-102 z-10'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div>
                <div className="mb-4">
                  <span className={`text-3xs font-extrabold uppercase tracking-widest ${plan.recommended ? 'text-red-400' : 'text-red-600'}`}>
                    {plan.discountBadge}
                  </span>
                  <h3 className={`text-2xl font-black mt-1 ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.title}</h3>
                </div>

                {/* Price Display */}
                <div className={`mb-6 pb-6 border-b ${plan.recommended ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl sm:text-4xl font-black ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                      ₹{plan.startingPrice.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-slate-400 font-semibold">
                      ₹{plan.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-3xs mt-1 ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>
                    *All-inclusive Mumbai local shifting rate
                  </p>
                </div>

                {/* Package Quick Stats */}
                <div className={`space-y-2 mb-6 p-3.5 rounded-2xl text-xs font-medium ${plan.recommended ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Crew Size:</span>
                    <span className={`font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.crewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Packaging:</span>
                    <span className={`font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.packingMaterials}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className={`font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.truckType}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm font-medium ${plan.recommended ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-102 ${
                    plan.recommended
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Book {plan.moveType} Move</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Distance Estimator CTA Bento Banner */}
        <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-50 text-red-600 border border-red-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Intercity or Long Distance Relocation?</h4>
              <p className="text-xs text-slate-600">Calculate exact distance-based rates for Pune, Nashik, Ahmedabad, Bangalore or Delhi.</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (onOpenQuoteModal) {
                onOpenQuoteModal();
              } else {
                const contact = document.getElementById('contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-sm whitespace-nowrap transition-all hover:scale-105"
          >
            Get Intercity Quote
          </button>
        </div>
      </div>
    </section>
  );
};
