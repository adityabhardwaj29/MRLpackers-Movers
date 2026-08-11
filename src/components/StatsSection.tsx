import React from 'react';
import { Award, Users, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950 text-white relative shadow-xl overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          <div className="p-4 space-y-1">
            <div className="flex justify-center text-red-500 mb-3">
              <Award className="w-9 h-9" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Experienced
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400">
              & Trusted Service
            </p>
          </div>

          <div className="p-4 space-y-1 pt-6 md:pt-4">
            <div className="flex justify-center text-red-500 mb-3">
              <Users className="w-9 h-9" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {COMPANY_INFO.happyClientsCount}
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              Happy Families Moved
            </p>
          </div>

          <div className="p-4 space-y-1 pt-6 md:pt-4">
            <div className="flex justify-center text-red-500 mb-3">
              <Truck className="w-9 h-9" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {COMPANY_INFO.successfulShiftingsCount}
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              Completed Shiftings
            </p>
          </div>

          <div className="p-4 space-y-1 pt-6 md:pt-4">
            <div className="flex justify-center text-red-500 mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {COMPANY_INFO.satisfactionRate}
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400">
              On-Time Delivery Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
