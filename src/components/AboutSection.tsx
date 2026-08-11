import React, { useState } from 'react';
import { ShieldCheck, Users, DollarSign, Award, Clock, CheckCircle2, Truck, MapPin, Building, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const AboutSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyUdyam = () => {
    navigator.clipboard.writeText('UDYAM-MH-18-0182820');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="about" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block px-3.5 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
              ABOUT MRL PACKERS & MOVERS
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-3xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Govt. Registered Enterprise
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pioneering Safe, Fast & Reliable Relocation
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Experienced & trusted relocation specialist headquartered in Kandivali East, serving households, corporate offices, and vehicle owners across Mumbai, Maharashtra, and Pan-India.
          </p>
        </div>

        {/* Official Government UDYAM Verification Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-600 text-white text-3xs font-black uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  GOVT. OF INDIA MSME REGISTERED
                </span>
                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-3xs font-bold px-3 py-1 rounded-full">
                  ISO 9001:2015 Standard
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  UDYAM REGISTRATION NUMBER: <span className="text-red-400 font-mono tracking-normal">UDYAM-MH-18-0182820</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Enterprise Name: <strong className="text-white">MRL PACKERS AND MOVERS</strong> | Registered Head Office: <span className="text-slate-200">BOX C-8, NATRAJ CHS, KRANTI NAGAR, KANDIVALI EAST, MUMBAI - 400101</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Legally Verified
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Transit Goods Insurance
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Helpline: +91 77770 42041
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto">
              <button
                onClick={handleCopyUdyam}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-extrabold">Copied Registration No!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Copy UDYAM Number</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md shadow-red-600/30 transition-all hover:scale-105"
              >
                <span>Call Official Desk</span>
              </a>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Bento Box 1: Image & Experience Badge - 6 Cols */}
          <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 relative overflow-hidden text-white flex flex-col justify-between shadow-sm min-h-[360px] border border-slate-800">
            <img
              src="/src/assets/images/household_packing_1785558040208.jpg"
              alt="MRL Packers & Movers Packing Process"
              className="absolute inset-0 w-full h-full object-cover opacity-40 filter brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex justify-between items-start">
              <span className="bg-red-600 text-white text-3xs font-black uppercase px-3 py-1 rounded-full shadow-sm">
                ISO 9001:2015 REGISTERED
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-3xs font-bold px-3 py-1 rounded-full">
                ✔ 100% Goods Insured
              </span>
            </div>

            <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white">Experienced & Trusted Movers</h4>
                  <p className="text-xs text-slate-300">Over 15,000 successful household & corporate moves across Mumbai & India.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Four Core Value Props - 6 Cols */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">3-Layer Multi Protection</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Bubble wrap, corrugated sheets, stretch film & corner edge guards.</p>
              </div>
              <span className="text-3xs font-extrabold uppercase text-red-600 bg-red-50 px-2.5 py-1 rounded-full w-fit border border-red-200">
                Zero Scratch Guarantee
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Trained Uniformed Staff</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Full-time background-verified moving technicians for heavy lifting.</p>
              </div>
              <span className="text-3xs font-extrabold uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full w-fit border border-slate-200">
                Background Checked
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Upfront Binding Quotes</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Itemized pricing without hidden fees or surprise costs at destination.</p>
              </div>
              <span className="text-3xs font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit border border-emerald-200">
                No Hidden Charges
              </span>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white shadow-sm flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">On-Time Express Move</h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">Dedicated fleet trucks ensuring prompt pickup and same-day delivery.</p>
              </div>
              <span className="text-3xs font-bold uppercase text-red-400 bg-slate-800 px-2.5 py-1 rounded-full w-fit border border-slate-700">
                24/7 Live Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
