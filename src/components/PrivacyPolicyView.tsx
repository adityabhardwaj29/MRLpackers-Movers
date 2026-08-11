import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Phone, Mail, MapPin, Building, Cookie, UserCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { MRLLogo } from './MRLLogo';

interface PrivacyPolicyViewProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBackToHome }) => {
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
              <Shield className="w-3.5 h-3.5" />
              Official Legal Document
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-3xs font-mono font-bold border border-slate-700">
              UDYAM-MH-18-0182820
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Effective Date: March 2026 | Last Updated: March 2026
          </p>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1 font-medium">
            <p><strong className="text-white">Registered Enterprise:</strong> MRL PACKERS AND MOVERS</p>
            <p><strong className="text-white">Govt. Udyam Reg. No:</strong> {COMPANY_INFO.udyamRegNo}</p>
            <p><strong className="text-white">Registered Address:</strong> {COMPANY_INFO.headOfficeAddress}</p>
            <p><strong className="text-white">Official Email:</strong> {COMPANY_INFO.email}</p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-red-500" />
              1. Introduction & Overview
            </h2>
            <p>
              At <strong>MRL Packers & Movers</strong> (referred to as "we", "our", or "us"), we are committed to safeguarding the privacy and confidential personal information of our clients, customers, and website visitors. This Privacy Policy outlines our strict protocols regarding the collection, handling, storage, and protection of your personal and relocation information.
            </p>
            <p>
              By accessing our website, booking our shifting services, or providing your contact details via phone, WhatsApp, or our online quote form, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Lock className="w-5 h-5 text-red-500" />
              2. Information We Collect
            </h2>
            <p>
              To provide accurate relocation quotes, coordinate moving schedules, and ensure safe transport of goods, we may collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Contact Information:</strong> Full Name, Mobile Phone Number, WhatsApp Number, and Email Address ({COMPANY_INFO.email}).</li>
              <li><strong>Relocation Coordinates:</strong> Origin/Pickup Address (including floor number, elevator availability) and Destination/Drop Address.</li>
              <li><strong>Inventory & Cargo Details:</strong> Approximate list of household furniture, electronic appliances, commercial fixtures, vehicle details (for car/bike transport), and fragile items.</li>
              <li><strong>Preferred Moving Schedule:</strong> Desired packing date, preferred transit window, and special handling instructions.</li>
              <li><strong>Billing & Payment Metadata:</strong> Invoicing name, company GSTIN (for corporate shifting), and payment receipts (we do not store credit card/debit card numbers on our servers).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              3. How We Use Your Information
            </h2>
            <p>The collected information is utilized strictly for lawful operational purposes, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Generating accurate, binding cost estimates and tailored moving quotations.</li>
              <li>Deploying trained moving crews, supervisor managers, and appropriate fleet vehicles to your pickup location.</li>
              <li>Providing real-time live SMS/WhatsApp transit updates and vehicle GPS dispatch coordination.</li>
              <li>Facilitating comprehensive transit insurance coverage documentation for high-value goods.</li>
              <li>Addressing customer queries, post-relocation assistance, and resolving feedback.</li>
              <li>Complying with statutory tax, e-way bill generation, and transport regulations under Indian law.</li>
            </ul>
          </section>

          {/* Section 4: Cookies Policy */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Cookie className="w-5 h-5 text-amber-500" />
              4. Cookies & Website Analytics Policy
            </h2>
            <p>
              Our website uses basic session cookies and temporary browser storage to remember your quote form preferences and provide a smooth browsing experience. We do not use tracking cookies for invasive third-party ad retargeting. You may disable cookies in your browser settings at any time without losing the ability to contact our desk directly.
            </p>
          </section>

          {/* Section 5: User Rights */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <UserCheck className="w-5 h-5 text-blue-500" />
              5. User Rights & Data Control
            </h2>
            <p>
              As our valued customer, you have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Right to Access:</strong> You may request a copy of your stored relocation order details and invoices.</li>
              <li><strong>Right to Rectification:</strong> You can update or correct your pickup address, destination, inventory, or contact number before dispatch.</li>
              <li><strong>Right to Deletion:</strong> You may request deletion of your contact information from our marketing records once the relocation and statutory accounting period concludes.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Shield className="w-5 h-5 text-red-500" />
              6. Strict Non-Disclosure & Zero-Spam Guarantee
            </h2>
            <p>
              We maintain a <strong>strict Zero-Spam and Non-Disclosure Policy</strong>. We do NOT sell, rent, trade, or lease your personal contact details or moving itineraries to any third-party marketing agencies, lead generation brokers, or unauthorized external entities.
            </p>
            <p>
              Your data is accessed only by authorized MRL move managers and designated field supervisors directly responsible for executing your relocation assignment.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Building className="w-5 h-5 text-red-500" />
              7. Official Grievance Officer & Contact Details
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding your personal data or this policy, please reach out to our registered office:
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
