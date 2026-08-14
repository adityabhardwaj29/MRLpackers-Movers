import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { QuoteFormData } from '../types';
import { createBooking } from '../lib/supabase';

interface ContactPageProps {
  onNavigatePage: (page: 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'quote' | 'privacy' | 'terms') => void;
  onSubmitQuoteForm?: (data: QuoteFormData) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigatePage, onSubmitQuoteForm }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    serviceType: 'Household Shifting',
    moveSize: '2BHK',
    movingDate: new Date().toISOString().split('T')[0],
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{ quoteId: string; whatsappUrl?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createBooking(formData);
      setSubmittedResult({
        quoteId: res.quoteId || 'MRL-2026-10001',
        whatsappUrl: res.whatsappUrl,
      });
      if (onSubmitQuoteForm) onSubmitQuoteForm(formData);
    } catch (err) {
      console.warn('Contact form submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600/20 text-red-400 rounded-full text-xs font-black uppercase tracking-widest border border-red-500/30">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            OFFICIAL CONTACT DESK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact MRL Packers &amp; Movers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
            Have questions about your relocation? Need an instant estimate or site inspection? Our team is available 24/7.
          </p>
        </div>

        {/* Contact Info Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primary Phone */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/50 transition-all shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Primary Helpline</h3>
              <p className="text-xs text-slate-400 mb-4">24/7 Call Support &amp; Instant Booking</p>
              <p className="text-lg font-black text-red-400 font-mono">{COMPANY_INFO.phonePrimary}</p>
            </div>
            <a
              href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
              className="mt-6 w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold text-center transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Primary Number</span>
            </a>
          </div>

          {/* Secondary Phone */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/50 transition-all shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Secondary Helpline</h3>
              <p className="text-xs text-slate-400 mb-4">Direct Manager &amp; Dispatch Line</p>
              <p className="text-lg font-black text-slate-200 font-mono">{COMPANY_INFO.phoneSecondary}</p>
            </div>
            <a
              href={`tel:${COMPANY_INFO.phoneSecondaryTel}`}
              className="mt-6 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold text-center border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Secondary Number</span>
            </a>
          </div>

          {/* Official WhatsApp */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare className="w-6 h-6 fill-emerald-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">WhatsApp Official Desk</h3>
              <p className="text-xs text-slate-400 mb-4">Send Photos/Videos for Survey</p>
              <p className="text-lg font-black text-emerald-400 font-mono">+91 77770 42041</p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Packers%20%26%20Movers%2C%20I%20want%20to%20inquire%20about%20relocation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold text-center transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Email Support */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Official Email</h3>
              <p className="text-xs text-slate-400 mb-4">Invoices, GST &amp; Corporate Inquiries</p>
              <p className="text-xs font-bold text-slate-300 break-all font-mono">{COMPANY_INFO.email}</p>
            </div>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="mt-6 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold text-center border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Office Location & Contact Form Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Address & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Registered Office Address</span>
              </h2>

              <div className="space-y-4 text-sm text-slate-300 font-medium leading-relaxed">
                <p className="font-bold text-white text-base">MRL PACKERS AND MOVERS</p>
                <p>
                  BOX C-8, NATRAJ CHS, KRANTI NAGAR,<br />
                  KANDIVALI EAST, MUMBAI, MAHARASHTRA - 400101
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Govt. MSME Reg:</strong> UDYAM-MH-18-0182820</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span><strong>Operating Hours:</strong> 24 Hours / 7 Days a Week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Coverage Areas */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-black text-white">Mumbai &amp; All India Coverage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Daily relocation services across Kandivali, Borivali, Malad, Goregaon, Andheri, Powai, Thane, Navi Mumbai, Pune, Bangalore, Delhi NCR, and 500+ cities in India.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Send Direct Inquiry</h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill out the form below to receive a binding cost quote directly saved to our Supabase database.
            </p>

            {submittedResult ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-emerald-900">Inquiry Submitted Successfully!</h3>
                    <p className="text-xs font-bold text-emerald-800">
                      Quote ID: <span className="font-mono bg-emerald-200 px-2 py-0.5 rounded text-emerald-950">{submittedResult.quoteId}</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you! Our relocation specialist will call you back within 15 minutes.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {submittedResult.whatsappUrl && (
                    <a
                      href={submittedResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Quote ID on WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSubmittedResult(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xs"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Pickup Address / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="e.g. Kandivali East, Mumbai"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Drop Address / Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.dropLocation}
                      onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                      placeholder="e.g. Wakad, Pune"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    >
                      <option value="Household Shifting">Household Shifting</option>
                      <option value="Office Relocation">Office Relocation</option>
                      <option value="Car Transportation">Car Transportation</option>
                      <option value="Bike Transportation">Bike Transportation</option>
                      <option value="Storage & Warehousing">Storage &amp; Warehousing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.movingDate}
                      onChange={(e) => setFormData({ ...formData, movingDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-3xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Additional Message / Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes || ''}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Provide inventory details or special instructions..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-red-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Contact Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
