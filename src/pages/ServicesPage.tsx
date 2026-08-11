import React, { useState } from 'react';
import {
  Home,
  Building2,
  PackageCheck,
  Truck,
  Car,
  Warehouse,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  FileText
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: () => void;
  onNavigatePage: (page: 'home' | 'services' | 'gallery' | 'about' | 'privacy' | 'terms') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenQuoteModal,
  onNavigatePage,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'packing' | 'transport' | 'storage'>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'residential', label: 'Residential Moves' },
    { id: 'commercial', label: 'Office & Corporate' },
    { id: 'packing', label: 'Packing & Materials' },
    { id: 'transport', label: 'Vehicle Transport' },
    { id: 'storage', label: 'Storage & Warehouse' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6" />;
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      case 'Car':
        return <Car className="w-6 h-6" />;
      case 'Warehouse':
        return <Warehouse className="w-6 h-6" />;
      default:
        return <Truck className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Page Hero Header */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <button
              onClick={() => onNavigatePage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-red-500 font-bold">Services</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-3xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Comprehensive Relocation Solutions
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Our Specialized <span className="text-red-500">Packing & Moving Services</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From luxury apartments in South Mumbai to corporate tech hubs in BKC and intercity vehicle transport across India, MRL Packers & Movers provides tailored, insured, and damage-free moving solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Get Free Moving Estimate
              </button>
              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-slate-850 rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl ${
                service.popular
                  ? 'border-red-500/80 shadow-red-500/10 shadow-lg'
                  : 'border-slate-800 hover:border-red-500/50'
              }`}
            >
              <div className="space-y-4">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>

                  {service.popular && (
                    <span className="px-3 py-1 bg-red-600 text-white text-3xs font-black uppercase tracking-wider rounded-full shadow-sm">
                      Most Requested
                    </span>
                  )}
                </div>

                {/* Title & Descriptions */}
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Feature Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-3xs font-black uppercase text-slate-400 tracking-wider block">
                    What's Included:
                  </span>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                  <span className="text-lg font-black text-white">{service.startingPrice}</span>
                </div>

                <button
                  onClick={() => {
                    onSelectService(service);
                    onOpenQuoteModal();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-600/25 active:scale-95 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Relocation Process Section */}
        <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-3xs font-black uppercase tracking-widest border border-red-500/30">
              OUR 4-STEP RELOCATION WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              How MRL Makes Moving 100% Hassle-Free
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Disciplined execution from first estimate to final box unpacking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-red-500/40">01</span>
              <h4 className="text-base font-extrabold text-white">Free Survey & Fixed Quote</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share your inventory online or schedule a free in-person/video inspection for a guaranteed fixed price.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-red-500/40">02</span>
              <h4 className="text-base font-extrabold text-white">3-Layer Heavy Packaging</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained staff packs electronics, glassware, and furniture with air bubble rolls, foam sheets, and crates.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-red-500/40">03</span>
              <h4 className="text-base font-extrabold text-white">Insured GPS Container Transit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Goods loaded in closed weather-proof container trucks with full transit insurance and live location tracking.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-red-500/40">04</span>
              <h4 className="text-base font-extrabold text-white">Unloading, Setup & Placement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We unload, reassemble bed/sofa, unpack boxes, and position heavy furniture exactly where you want.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Need a Custom Relocation Solution?
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              Talk directly with our senior move coordinators in Kandivali East for customized intercity or corporate moving plans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-lg active:scale-95 text-center"
            >
              Get Free Instant Quote
            </button>
            <a
              href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
              className="px-5 py-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/60 text-white border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
