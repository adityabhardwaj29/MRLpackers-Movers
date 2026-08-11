import React, { useState } from 'react';
import { Phone, MessageSquare, ShieldCheck, Star, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { QuoteFormData } from '../types';
import { MRLLogo } from './MRLLogo';

import { createBooking } from '../lib/supabase';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
  onSubmitQuoteForm: (data: QuoteFormData) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuoteModal,
  onSubmitQuoteForm,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    pickupLocation: '',
    dropLocation: '',
    serviceType: 'Household Shifting',
    moveSize: '2BHK',
    movingDate: new Date().toISOString().split('T')[0],
    packingTier: 'Standard Box',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteResult, setSubmittedQuoteResult] = useState<{
    quoteId: string;
    whatsappUrl?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createBooking(formData);
      setSubmittedQuoteResult({
        quoteId: result.quoteId || 'MRL-2026-10001',
        whatsappUrl: result.whatsappUrl,
      });
      onSubmitQuoteForm(formData);
    } catch (err) {
      console.warn('Booking save:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Bento Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Card (Dark Slate Bento) - 7 Columns */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-white shadow-md min-h-[400px] border border-slate-800">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-3xs font-extrabold uppercase tracking-widest text-white shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    MRL Certified Logistics
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-3xs font-bold text-slate-300">
                    <MapPin className="w-3 h-3 text-red-500" />
                    Kandivali East, Mumbai
                  </span>
                </div>

                <div className="hidden sm:block">
                  <MRLLogo size={58} showText={false} />
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                MRL Packers & Movers <br />
                <span className="text-red-500">Fast, Safe & Affordable</span> Shifting
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                Mumbai's top-rated household shifting, corporate office relocation, and multi-vehicle transport company. Zero scratches guarantee with 3-layer bubble packaging.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-200 font-bold">
                <span className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Zero Hidden Charges
                </span>
                <span className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> 100% Free Transit Insurance
                </span>
                <span className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Live GPS Fleet Tracking
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call {COMPANY_INFO.phonePrimary}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20need%20a%20relocation%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Quote</span>
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span>Book Move Slot</span>
              </button>
            </div>

            {/* Soft decorative red glow */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-red-600/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          </div>

          {/* Instant Quote Bento Card (White Bento) - 5 Columns */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-slate-900">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Get Instant Quote</h3>
                  <p className="text-xs text-slate-500 font-medium">Fill details & get accurate binding cost in 60 secs.</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-3xs font-black px-2.5 py-1 rounded-full uppercase border border-emerald-200">
                  FREE SURVEY
                </span>
              </div>

              {submittedQuoteResult ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-emerald-900">Your quote request has been submitted successfully.</h4>
                      <p className="text-2xs text-emerald-800 font-bold mt-0.5">
                        Quote ID: <span className="font-mono text-emerald-950 bg-emerald-200/80 px-1.5 py-0.5 rounded">{submittedQuoteResult.quoteId}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-2xs text-emerald-800 font-medium leading-relaxed">
                    Our MRL Packers & Movers team will contact you shortly to confirm your moving slot.
                  </p>

                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={submittedQuoteResult.whatsappUrl || `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Team%2C%20my%20Quote%20ID%20is%20${submittedQuoteResult.quoteId}.%20Please%20confirm%20my%20slot!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Quote ID on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmittedQuoteResult(null)}
                      className="py-2 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-2xs transition-colors border border-emerald-300"
                    >
                      Book Another Quote
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-red-500 font-medium placeholder-slate-400 focus:bg-white"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Mobile (WhatsApp)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-red-500 font-medium placeholder-slate-400 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                      placeholder="Pickup (e.g. Kandivali / Bandra)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-red-500 font-medium placeholder-slate-400 focus:bg-white"
                    />
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      required
                      placeholder="Drop (e.g. Powai / Pune)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-red-500 font-medium placeholder-slate-400 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="moveSize"
                      value={formData.moveSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-red-500 font-medium focus:bg-white"
                    >
                      <option value="1BHK">1 BHK Shifting</option>
                      <option value="2BHK">2 BHK Shifting</option>
                      <option value="3BHK">3 BHK Shifting</option>
                      <option value="Villa / 4BHK">Villa / 4 BHK</option>
                      <option value="Office Relocation">Office Relocation</option>
                      <option value="Vehicle Transport">Car / Bike Transport</option>
                    </select>

                    <input
                      type="date"
                      name="movingDate"
                      value={formData.movingDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-red-500 font-medium focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-red-700 shadow-md shadow-red-600/20 transition-all mt-1 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Details...' : 'Get Instant Shifting Quote'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2.5 p-2.5 bg-slate-100 rounded-2xl border border-slate-200 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <p className="text-[11px] font-medium leading-tight">
                <strong className="font-bold text-slate-900">Govt. Registered Enterprise:</strong> UDYAM-MH-18-0182820 • 100% Insured Transit
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bento Grid Row (Stats & Social Proof) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Bento Box 1: Results Counter (Red Bento) - 5 Cols */}
          <div className="md:col-span-5 bg-red-600 rounded-3xl p-6 flex items-center justify-between text-white shadow-sm">
            <div>
              <h4 className="text-2xs font-extrabold uppercase opacity-85 tracking-widest mb-2">Proven Track Record</h4>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-base sm:text-lg font-black block">Experienced & Trusted</span>
                  <p className="text-3xs uppercase tracking-wider font-semibold opacity-90">Mumbai Specialists</p>
                </div>
                <div>
                  <span className="text-3xl font-black">15k+</span>
                  <p className="text-3xs uppercase tracking-wider font-semibold opacity-90">Happy Families</p>
                </div>
                <div>
                  <span className="text-3xl font-black">100%</span>
                  <p className="text-3xs uppercase tracking-wider font-semibold opacity-90">Safe Transit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Rating & Review Card - 7 Cols */}
          <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">4.9 / 5.0 RATING</span>
              </div>
              <span className="text-2xs font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                1,250+ Verified Google Reviews
              </span>
            </div>

            <p className="text-xs italic text-slate-600 font-medium">
              "Best moving experience in Mumbai! The MRL Packers & Movers crew packed all our 3BHK electronics and wooden furniture with 3-layer bubble wrap. No scratches, delivered on time in Kandivali!"
            </p>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-800">Ankit Sharma (Kandivali East to Powai Shifting)</span>
              <span className="text-3xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">✔ Verified Client</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

