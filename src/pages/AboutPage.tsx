import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  PackageCheck,
  HeartHandshake,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  Eye,
  FileCheck
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data';
import { PageType } from '../components/Navbar';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
  onNavigatePage: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal, onNavigatePage }) => {
  const [copiedUdyam, setCopiedUdyam] = useState(false);

  const handleCopyUdyam = () => {
    navigator.clipboard.writeText('UDYAM-MH-18-0182820');
    setCopiedUdyam(true);
    setTimeout(() => setCopiedUdyam(false), 3000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Breadcrumb & Hero Header */}
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
            <span className="text-red-500 font-bold">About Us</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-3xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Govt. of India Registered Enterprise
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-3xs font-bold">
                  ISO 9001:2015 Certified
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                About <span className="text-red-500">MRL Packers & Movers</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Mumbai’s most reliable, experienced, and customer-first relocation company. Delivering safe household shifting, corporate relocations, and vehicle transport across Maharashtra and Pan-India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Request Free Quote
              </button>
              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call Official Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Government UDYAM Registration Official Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border-2 border-red-600/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-600 text-white text-3xs font-black uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  GOVT. OF INDIA MINISTRY OF MSME
                </span>
                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-3xs font-mono font-bold px-3 py-1 rounded-full">
                  UDYAM-MH-18-0182820
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Official Enterprise Details & Government Verification
                </h2>
                <div className="mt-2 space-y-1 text-xs sm:text-sm text-slate-300 font-medium">
                  <p><strong className="text-white">Legal Enterprise Name:</strong> MRL PACKERS AND MOVERS</p>
                  <p>
                    <strong className="text-white">UDYAM REGISTRATION NUMBER:</strong>{' '}
                    <span className="text-red-400 font-mono font-black bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      UDYAM-MH-18-0182820
                    </span>
                  </p>
                  <p><strong className="text-white">Registered Head Office:</strong> BOX C-8, NATRAJ CHS, KRANTI NAGAR, KANDIVALI EAST, MUMBAI, MAHARASHTRA, PIN - 400101</p>
                  <p><strong className="text-white">Official Email:</strong> {COMPANY_INFO.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 font-medium pt-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> 100% Verified Business
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Transit Insurance Authorized
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Direct Company Operations (No Middlemen)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto">
              <button
                onClick={handleCopyUdyam}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                {copiedUdyam ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-black">Copied UDYAM Number!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Copy UDYAM Number</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%2C%20I%20am%20inquiring%20about%20your%20Govt%20Registered%20relocation%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <span>WhatsApp Official Desk</span>
              </a>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* Company Overview & Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-3xs font-black uppercase tracking-widest border border-red-500/30">
              WHO WE ARE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Experienced & Trusted Relocation Specialists Headquartered in Mumbai
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded with the singular purpose of making relocation straightforward, secure, and stress-free, <strong>MRL Packers & Movers</strong> has grown into one of Mumbai’s most reputable logistics names.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              From our operational headquarters in <strong>Kandivali East, Mumbai</strong>, we coordinate end-to-end relocation solutions for local Mumbai moves (Western suburbs, Central lines, South Mumbai, Navi Mumbai, and Thane) as well as long-distance moves across Maharashtra and Pan-India.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Unlike unorganized transporters who hire untrained casual laborers, every MRL moving assignment is executed by our full-time, background-verified packing masters and supervised by an experienced move manager.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-red-500">{COMPANY_INFO.happyClientsCount}</span>
              <h4 className="text-sm font-bold text-white">Happy Clients</h4>
              <p className="text-xs text-slate-400">Families & businesses safely relocated across India.</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">{COMPANY_INFO.successfulShiftingsCount}</span>
              <h4 className="text-sm font-bold text-white">Successful Moves</h4>
              <p className="text-xs text-slate-400">Zero major transit claims with 99.8% safety index.</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">15+ Years</span>
              <h4 className="text-sm font-bold text-white">Industry Experience</h4>
              <p className="text-xs text-slate-400">Trusted veterans in Mumbai packing & transport logistics.</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-400">100%</span>
              <h4 className="text-sm font-bold text-white">Insured Goods</h4>
              <p className="text-xs text-slate-400">Complete transit insurance coverage on all belongings.</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Our Mission
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              To deliver 100% damage-free, punctual, and transparent relocation services for every Indian home and enterprise. We aim to take away every ounce of moving stress through disciplined workflows, top-tier German packaging materials, and honest, upfront pricing with zero hidden charges.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Our Vision
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              To be India’s most trusted, organized, and customer-celebrated relocation brand. We continually modernize our container fleet, invest in specialized handling equipment, and train our personnel to set new benchmarks in modern transport logistics.
            </p>
          </div>
        </div>

        {/* Why Choose Us & Expertise */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-3xs font-black uppercase tracking-widest border border-red-500/30">
              OUR CORE ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Customers Across Mumbai Choose MRL
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              We treat every piece of your furniture, electronics, and memories as if they were our own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">3-Layer Premium Packaging</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We use thick air bubble wrap, edge foam guards, heavy corrugated sheets, and stretch films to ensure zero scratches or transit friction.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Trained & Polite Moving Crews</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No casual daily-wage laborers. Our permanent staff is trained in delicate glassware crating, heavy sofa handling, and polite customer interaction.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">GPS Tracked Enclosed Fleet</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Weather-proof container trucks protect goods against rain, dust, and road heat. Real-time GPS tracking for total journey visibility.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Complete Transit Insurance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive insurance coverage against accidental fire, road collisions, or overturning for total financial protection.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">24/7 Operations & On-Time Promise</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flexible scheduling including weekend and night shifting for minimal household disturbance or corporate office downtime.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-red-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white">Transparent Fixed Pricing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear itemized quotes with zero hidden charges, zero surprise toll demands, and zero last-minute cancellations.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Trust Statement */}
        <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 p-8 sm:p-10 rounded-3xl border border-red-600/30 text-center space-y-4">
          <HeartHandshake className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Our Customer Trust & Satisfaction Pledge
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
            “At MRL Packers & Movers, our relationship with you doesn’t end when the truck unloads. We stay until your major furniture is reassembled, boxes are organized in their respective rooms, and you are 100% delighted with your new beginning.”
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/40 transition-all hover:scale-105"
            >
              Plan Your Relocation With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
