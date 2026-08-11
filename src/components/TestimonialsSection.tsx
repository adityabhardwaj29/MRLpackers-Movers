import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
            REAL CUSTOMER REVIEWS
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Mumbai Says About MRL
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Over 15,000+ happy families and business owners across Kandivali, Borivali, Andheri, Powai, Thane & Navi Mumbai trust our relocation services.
          </p>

          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">4.9 / 5.0 Rating</span>
            <span className="text-slate-300 text-xs">|</span>
            <span className="text-xs text-slate-600 font-medium">1,250+ Verified Google Reviews</span>
          </div>
        </div>

        {/* Carousel / Featured Review Slider Bento Box */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-slate-100 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-xl text-slate-800 font-medium leading-relaxed italic">
                "{TESTIMONIALS[currentIndex].review}"
              </p>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{TESTIMONIALS[currentIndex].name}</span>
                    {TESTIMONIALS[currentIndex].verified && (
                      <span className="inline-flex items-center gap-1 text-3xs font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified Client
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>{TESTIMONIALS[currentIndex].location}</span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-black border border-red-200 inline-block">
                    {TESTIMONIALS[currentIndex].moveType}
                  </span>
                  <span className="text-slate-400 text-3xs block mt-1 font-medium">{TESTIMONIALS[currentIndex].date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-red-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
