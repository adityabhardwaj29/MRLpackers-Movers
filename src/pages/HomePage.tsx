import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StatsSection } from '../components/StatsSection';
import { PricingSection } from '../components/PricingSection';
import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { QuoteFormSection } from '../components/QuoteFormSection';
import { ServiceItem, PricingPlan, QuoteFormData } from '../types';
import { ArrowRight, Sparkles, Building, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface HomePageProps {
  onOpenQuoteModal: () => void;
  onSubmitQuoteForm: (data: QuoteFormData) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectPlan: (plan: PricingPlan) => void;
  onNavigatePage: (page: 'home' | 'services' | 'gallery' | 'about' | 'privacy' | 'terms') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenQuoteModal,
  onSubmitQuoteForm,
  onSelectService,
  onSelectPlan,
  onNavigatePage,
}) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection
        onOpenQuoteModal={onOpenQuoteModal}
        onSubmitQuoteForm={onSubmitQuoteForm}
      />

      {/* Short Intro / Govt MSME Badge Banner */}
      <div className="bg-slate-900 border-y border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                MRL PACKERS AND MOVERS • UDYAM REGISTRATION: <span className="text-red-400 font-mono">UDYAM-MH-18-0182820</span>
              </h3>
              <p className="text-xs text-slate-400">
                Official Head Office: BOX C-8, Natraj CHS, Kranti Nagar, Kandivali East, Mumbai - 400101
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePage('about')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-red-600/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Services Preview Section */}
      <div className="relative">
        <ServicesSection
          onSelectService={onSelectService}
          onOpenQuoteModal={onOpenQuoteModal}
        />
        {/* Navigation CTA to full services page */}
        <div className="bg-slate-900 py-6 text-center border-b border-slate-800">
          <button
            onClick={() => {
              onNavigatePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider border border-slate-700 hover:border-red-500 transition-all cursor-pointer shadow-md"
          >
            <span>Explore All 6 Detailed Services & Inclusions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Pricing Cards Section */}
      <PricingSection
        onSelectPlan={onSelectPlan}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* Gallery Section */}
      <div className="relative">
        <GallerySection />
        {/* Navigation CTA to full gallery page */}
        <div className="bg-slate-900 py-6 text-center border-b border-slate-800">
          <button
            onClick={() => {
              onNavigatePage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider border border-slate-700 hover:border-red-500 transition-all cursor-pointer shadow-md"
          >
            <span>View Full Fleet & Operations Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Quote / Contact Form Section */}
      <QuoteFormSection onSubmitQuoteForm={onSubmitQuoteForm} />
    </div>
  );
};
