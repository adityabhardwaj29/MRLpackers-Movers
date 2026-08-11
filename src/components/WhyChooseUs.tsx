import React from 'react';
import { ShieldCheck, Headphones, UserCheck, Receipt, Check, X, Award, Zap } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-red-600" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-slate-800" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-red-600" />;
      case 'Receipt':
        return <Receipt className="w-6 h-6 text-emerald-600" />;
      default:
        return <Award className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="why-us" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
            THE MRL PACKERS & MOVERS ADVANTAGE
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why 15,000+ Customers Trust MRL
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Eliminate relocation stress with trained staff, industrial 3-layer packaging, and upfront binding quotes.
          </p>
        </div>

        {/* 4 Feature Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-red-500 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table Bento Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">How MRL Compares to Local Unorganized Movers</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">See why booking a certified company saves you time, stress, and money.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-slate-400">Features</th>
                  <th className="py-3 px-4 text-xs font-black text-red-600 bg-red-50 rounded-t-xl uppercase tracking-wider">
                    MRL Packers & Movers
                  </th>
                  <th className="py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-slate-400">Local Unorganized Movers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Written Binding Quote</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 bg-red-50/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Yes (0% Hidden Charges)</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Demands extra on move day</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">3-Layer Protective Packaging</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 bg-red-50/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Standard on every move</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Thin blankets or single layer</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Transit Insurance Coverage</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 bg-red-50/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> 100% Comprehensive Policy</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Zero compensation for damage</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Trained & Uniformed Staff</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 bg-red-50/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Full-time background verified</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Daily wage untrained labor</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">GPS Live Vehicle Tracking</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 bg-red-50/40">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Real-time location link</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Driver turns off phone</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
