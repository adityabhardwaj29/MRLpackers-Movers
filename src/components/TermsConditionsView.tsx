import React from 'react';
import { ArrowLeft, Scale, ShieldCheck, AlertTriangle, FileText, CheckCircle2, Phone, Mail, MapPin, Building, Truck, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { MRLLogo } from './MRLLogo';

interface TermsConditionsViewProps {
  onBackToHome: () => void;
}

export const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-600 selection:text-white pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-bold transition-all hover:scale-105 w-fit cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>← Back to Home / Services</span>
          </button>

          <div className="flex items-center gap-3">
            <MRLLogo size={48} showText={true} textColor="light" />
          </div>
        </div>

        {/* Title Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-3xs font-black uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              Standard Service Agreement
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-3xs font-mono font-bold border border-slate-700">
              UDYAM-MH-18-0182820
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Effective Date: March 2026 | Governing Law: Mumbai Jurisdiction, State of Maharashtra
          </p>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1 font-medium">
            <p><strong className="text-white">Enterprise:</strong> MRL PACKERS AND MOVERS</p>
            <p><strong className="text-white">Udyam Reg. Number:</strong> {COMPANY_INFO.udyamRegNo}</p>
            <p><strong className="text-white">Registered Address:</strong> {COMPANY_INFO.headOfficeAddress}</p>
            <p><strong className="text-white">Official Email:</strong> {COMPANY_INFO.email}</p>
          </div>
        </div>

        {/* Terms Body */}
        <div className="space-y-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-red-500" />
              1. General Terms of Relocation Service
            </h2>
            <p>
              These Terms and Conditions govern the packing, loading, transportation, unloading, unpacking, and storage services provided by <strong>MRL Packers & Movers</strong> ("MRL", "Company", "We"). By accepting a verbal, digital, or written quotation, paying a booking advance, or handing over consignment keys/goods to our crew, the customer ("Consignor", "You") agrees to be bound by these terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              2. Quotation, Pricing & Payment Terms
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Itemized Scope:</strong> Quotations are calculated based on the declared inventory list, pickup/drop floor heights, elevator access, distance, and requested packing tier (Standard vs Premium).</li>
              <li><strong>Scope Changes:</strong> Any unlisted additional heavy items (e.g., pianos, heavy stone temples, additional air conditioners, gym equipment) added on the moving day will be charged as per standard itemized add-on rates.</li>
              <li><strong>Payment Schedule:</strong> Standard local moves require a nominal 10-20% advance upon booking confirmation, 70% upon loading into the container truck, and the balance 10-20% upon delivery/completion of unloading before unpacking.</li>
              <li><strong>Society / Association Approvals:</strong> Moving permissions, society NOCs, lift reservations, and security gate entry charges are the responsibility of the customer.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              3. Prohibited & High-Value Restricted Goods (User Responsibilities)
            </h2>
            <p>
              For security, safety, and statutory compliance, the customer <strong>MUST NOT</strong> include the following items in the moving vehicle:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-amber-300/90 font-medium">
              <li><strong>Currency & Valuables:</strong> Cash, bearer bonds, original property documents, passports, gold/diamond jewellery, and precious coins. Customers must carry these in personal custody.</li>
              <li><strong>Hazardous & Flammable Materials:</strong> Gas cylinders with gas, petrol cans, acid, fireworks, paints, thinner, and matches.</li>
              <li><strong>Contraband & Perishables:</strong> Illegal substances, weapons, raw meat, or unpackaged rotting perishable food.</li>
            </ul>
            <p className="text-xs text-slate-400">
              MRL Packers & Movers shall bear zero liability for undeclared cash, jewellery, or contraband items placed inside packed boxes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              4. Transit Goods Insurance & Damage Claims
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Transit Coverage:</strong> Comprehensive transit insurance covers risk of accidental collision, vehicle overturning, vehicle fire, or sudden highway mishap during transit.</li>
              <li><strong>Claim Window:</strong> Any visible external damage must be noted on the official consignment note / delivery challan upon delivery in the presence of the move supervisor within 24 hours of unloading.</li>
              <li><strong>Internal Electronic Faults:</strong> MRL is not responsible for pre-existing internal electronic or mechanical failures of appliances (TV circuit boards, refrigerators, washing machine motors) unless direct external physical damage to the casing is evident.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              5. Rescheduling, Delays & Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Free Rescheduling:</strong> You can reschedule your shifting date up to 24 hours prior to the booked slot without penalty, subject to truck availability.</li>
              <li><strong>Advance Refund:</strong> Cancellations made at least 48 hours prior to the scheduled packing time qualify for a full refund of any advance token amount.</li>
              <li><strong>Force Majeure:</strong> Delays caused by severe monsoon flooding, highway road blocks, VIP movement restrictions, or government curfew are beyond our control, but our coordinators will provide live status updates.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Building className="w-5 h-5 text-red-500" />
              6. Legal Jurisdiction & Official Contact
            </h2>
            <p>
              Any disputes or claims arising out of or related to our relocation services shall be subject exclusively to the courts and consumer forums situated in <strong>Mumbai, Maharashtra, India</strong>.
            </p>
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-white">MRL PACKERS AND MOVERS</p>
              <p className="text-red-400 font-mono font-bold">UDYAM REGISTRATION NUMBER: UDYAM-MH-18-0182820</p>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>BOX C-8, NATRAJ CHS, KRANTI NAGAR, KANDIVALI EAST, MUMBAI, PIN - 400101</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Helpline: +91 77770 42041 / +91 86579 72041</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Email: {COMPANY_INFO.email}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            ← Return to MRL Packers & Movers Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
