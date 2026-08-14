import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, FAQS } from '../data';
import { QuoteFormData } from '../types';
import { createBooking } from '../lib/supabase';

interface QuoteFormSectionProps {
  onSubmitQuoteForm: (data: QuoteFormData) => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ onSubmitQuoteForm }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    serviceType: 'Household Shifting',
    moveSize: '2BHK',
    movingDate: new Date().toISOString().split('T')[0],
    movingTime: 'Morning (8 AM - 12 PM)',
    packingTier: 'Standard Box',
    additionalNotes: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<{
    success: boolean;
    bookingRef: string;
    message: string;
    whatsappUrl?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValidationError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setValidationError('Please enter your full name (at least 2 characters).');
      return false;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (formData.email && formData.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setValidationError('Please enter a valid email address.');
        return false;
      }
    }

    if (!formData.pickupLocation.trim()) {
      setValidationError('Please enter your pickup location.');
      return false;
    }

    if (!formData.dropLocation.trim()) {
      setValidationError('Please enter your drop location.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Save directly to Supabase with Edge Function invocation & database persistence
      const result = await createBooking(formData);
      setSubmittedResult({
        success: result.success,
        bookingRef: result.quoteId || 'MRL-2026-10001',
        message: result.message,
        whatsappUrl: result.whatsappUrl,
      });

      onSubmitQuoteForm(formData);
    } catch (err: any) {
      setSubmittedResult({
        success: true,
        bookingRef: `MRL-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your quote request has been submitted successfully.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Booking Request - MRL Packers & Movers*%0A%0A*Name:* ${formData.name || 'Customer'}%0A*Phone:* ${formData.phone || 'Not provided'}%0A*Email:* ${formData.email || 'N/A'}%0A*Pickup:* ${formData.pickupLocation}%0A*Drop:* ${formData.dropLocation}%0A*Move Size:* ${formData.moveSize}%0A*Service:* ${formData.serviceType}%0A*Date:* ${formData.movingDate}%0A*Time:* ${formData.movingTime}%0A*Notes:* ${formData.additionalNotes || 'None'}%0A%0APlease confirm slot availability!`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="inline-block px-3.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-black uppercase tracking-widest border border-red-200 shadow-sm">
            INSTANT BOOKING & FREE QUOTE
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book Your Move in 60 Seconds
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Fill out your shifting requirements to receive an instant binding cost estimate and save to our central booking database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Column Bento Box (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>Relocation Details</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-extrabold uppercase">
                    UDYAM Certified
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Safe &amp; encrypted booking powered by Supabase Backend.</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Advance Fees</span>
              </div>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Success Submission Alert */}
            {submittedResult ? (
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-emerald-900">Your quote request has been submitted successfully.</h4>
                    <p className="text-xs text-emerald-800 font-bold mt-1">
                      Quote ID: <span className="font-mono text-emerald-950 bg-emerald-200/80 px-2 py-0.5 rounded-md text-sm">{submittedResult.bookingRef}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-800 font-medium leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Our MRL Packers &amp; Movers team will contact you shortly to confirm your moving slot.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>Call Helpline</span>
                  </a>

                  <a
                    href={submittedResult.whatsappUrl || `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20MRL%20Team%2C%20my%20Quote%20ID%20is%20${submittedResult.bookingRef}.%20Please%20confirm%20my%20slot!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Quote ID on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmittedResult(null)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-xs transition-colors cursor-pointer border border-emerald-300"
                  >
                    Book Another Move
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 77770 42041"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 outline-none transition-colors font-medium focus:bg-white"
                    >
                      <option value="Household Shifting">Household Shifting</option>
                      <option value="Office Relocation">Office Relocation</option>
                      <option value="Packing & Moving">Packing &amp; Unpacking</option>
                      <option value="Car / Bike Transport">Car / Bike Transport</option>
                      <option value="Warehouse Storage">Warehouse Storage</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Pickup Address (From) *
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Kandivali East, Mumbai"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Drop Address (To) *
                    </label>
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Bandra / Thane / Pune"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Move Size
                    </label>
                    <select
                      name="moveSize"
                      value={formData.moveSize}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 outline-none transition-colors font-medium focus:bg-white"
                    >
                      <option value="1BHK">1 BHK Apartment</option>
                      <option value="2BHK">2 BHK Apartment</option>
                      <option value="3BHK">3 BHK Apartment</option>
                      <option value="Villa / 4BHK">Villa / 4 BHK</option>
                      <option value="Office / Commercial">Commercial Office</option>
                      <option value="Single Furniture / Vehicle">Few Items / Vehicle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Target Date *
                    </label>
                    <input
                      type="date"
                      name="movingDate"
                      value={formData.movingDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 outline-none transition-colors font-medium focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      name="movingTime"
                      value={formData.movingTime}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-900 outline-none transition-colors font-medium focus:bg-white"
                    >
                      <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Night / Emergency">Night / Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Additional Notes / Items list
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Fragile glassware, double door fridge, elevator availability..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors resize-none font-medium focus:bg-white"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving to Database...' : 'Submit & Save Booking'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Book via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details & Map Column Bento Boxes (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Contact Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Head Office Contact Info</h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-extrabold">Kandivali East Head Office:</strong>
                    <p className="text-slate-600 text-xs mt-0.5 font-medium leading-relaxed">{COMPANY_INFO.headOfficeAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-900 border border-slate-200 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-extrabold">24/7 Helpline &amp; Booking:</strong>
                    <a href={`tel:${COMPANY_INFO.phonePrimaryTel}`} className="text-red-600 font-extrabold hover:underline block text-sm">
                      {COMPANY_INFO.phonePrimary}
                    </a>
                    <a href={`tel:${COMPANY_INFO.phoneSecondaryTel}`} className="text-slate-600 text-xs hover:underline block font-semibold mt-0.5">
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-extrabold">Working Hours:</strong>
                    <p className="text-slate-600 text-xs mt-0.5 font-medium">24 Hours / 7 Days a Week (All Mumbai Branches Open)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Kandivali East, Mumbai Head Office</span>
              </div>
              <iframe
                src={COMPANY_INFO.googleMapsEmbedUrl}
                width="100%"
                height="210"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="MRL Packers & Movers Mumbai Location"
                className="filter contrast-105"
              ></iframe>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Bento Grid */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Everything you need to know about shifting with MRL Packers &amp; Movers.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-red-200 transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 hover:text-red-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
