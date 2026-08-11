import React, { useState } from 'react';
import { Home, Building2, PackageCheck, Truck, Car, Warehouse, ArrowRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'vehicle' | 'storage'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-red-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-slate-800" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-red-500" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      case 'Car':
        return <Car className="w-6 h-6 text-blue-600" />;
      case 'Warehouse':
        return <Warehouse className="w-6 h-6 text-purple-600" />;
      default:
        return <Truck className="w-6 h-6 text-red-600" />;
    }
  };

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-16 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
            OUR SPECIALIZED RELOCATION SERVICES
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            End-to-End Relocation Solutions in Mumbai
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            From single-item luggage moving to 3BHK homes, corporate IT parks, and vehicle transport across India.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeTab === 'residential'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Household Shifting
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeTab === 'commercial'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Office Relocation
            </button>
            <button
              onClick={() => setActiveTab('vehicle')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeTab === 'vehicle'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Car & Bike Transport
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeTab === 'storage'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Warehouse Storage
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-slate-200 hover:border-red-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 text-red-600">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                  {service.shortDesc}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-3xs uppercase tracking-wider text-slate-400 block font-bold">
                    Starting From
                  </span>
                  <span className="text-lg font-black text-slate-900">{service.startingPrice}</span>
                </div>

                <button
                  onClick={() => {
                    onSelectService(service);
                    onOpenQuoteModal();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-sm transition-all hover:scale-105"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
