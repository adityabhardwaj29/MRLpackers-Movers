import React, { useState } from 'react';
import { X, Tag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QuoteFormData } from '../types';
import { createBooking } from '../lib/supabase';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuoteForm: (data: QuoteFormData) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuoteForm,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    moveSize: '2BHK',
    pickupLocation: 'Mumbai',
    dropLocation: 'Mumbai',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const payload: QuoteFormData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      pickupLocation: formData.pickupLocation.trim() || 'Mumbai',
      dropLocation: formData.dropLocation.trim() || 'Mumbai',
      moveSize: formData.moveSize,
      serviceType: 'Household Shifting',
      movingDate: new Date().toISOString().split('T')[0],
      movingTime: 'Morning (8 AM - 12 PM)',
      packingTier: '3-Layer Bubble Wrap',
      additionalNotes: 'Lead from 10% OFF Special Discount Popup',
    };

    try {
      await createBooking(payload);
      onSubmitQuoteForm(payload);
    } catch (err) {
      onSubmitQuoteForm(payload);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-red-600/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black border border-red-500/30 mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>PROMO CODE: MRL10OFF</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
          Claim 10% OFF + Free Transit Insurance
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm mb-6">
          Book your Mumbai relocation with MRL Packers &amp; Movers. Zero deposit required for instant quotation.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/80 border border-red-600/50 rounded-xl text-red-200 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ankit Sharma"
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Mobile Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 77770 42041"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ankit@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Move Size
              </label>
              <select
                value={formData.moveSize}
                onChange={(e) => setFormData({ ...formData, moveSize: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="1BHK">1 BHK Apartment</option>
                <option value="2BHK">2 BHK Apartment</option>
                <option value="3BHK">3 BHK / Villa</option>
                <option value="Office">Office Move</option>
                <option value="Vehicle">Car / Bike Transport</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Pickup Area
              </label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                placeholder="e.g. Kandivali / Andheri"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? 'Saving Booking...' : 'Lock My 10% Discount Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[10px] text-center text-slate-400 pt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant callback within 15 mins • 0% Hidden Charges Guarantee</span>
          </p>
        </form>
      </div>
    </div>
  );
};
