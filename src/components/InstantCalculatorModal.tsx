import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2, ShieldCheck, Tag, MessageSquare } from 'lucide-react';
import { PriceEstimateResult } from '../types';
import { COMPANY_INFO } from '../data';

interface InstantCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookEstimate: (moveSize: string, price: number) => void;
}

export const InstantCalculatorModal: React.FC<InstantCalculatorModalProps> = ({
  isOpen,
  onClose,
  onBookEstimate,
}) => {
  const [moveSize, setMoveSize] = useState('2BHK');
  const [isLocal, setIsLocal] = useState(true);
  const [hasElevatorPickup, setHasElevatorPickup] = useState(true);
  const [hasElevatorDrop, setHasElevatorDrop] = useState(true);
  const [packingTier, setPackingTier] = useState('Premium Multi-layer');
  const [pickupArea, setPickupArea] = useState('Kandivali East');
  const [dropArea, setDropArea] = useState('Andheri West');

  const [estimate, setEstimate] = useState<PriceEstimateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      calculateEstimate();
    }
  }, [isOpen, moveSize, isLocal, hasElevatorPickup, hasElevatorDrop, packingTier]);

  const calculateEstimate = () => {
    setIsLoading(true);
    let base = 7999;
    if (moveSize === '1BHK') base = 4999;
    else if (moveSize === '3BHK') base = 11999;
    else if (moveSize === 'Villa / 4BHK') base = 18999;
    else if (moveSize === 'Office') base = 14999;
    else if (moveSize === 'Bike Transport') base = 2999;
    else if (moveSize === 'Car Transport') base = 6999;

    const dist = isLocal ? 800 : 3500;
    let floor = 0;
    if (!hasElevatorPickup) floor += 600;
    if (!hasElevatorDrop) floor += 600;

    let multiplier = packingTier === 'Premium Multi-layer' ? 1.2 : 1;
    const orig = Math.round((base + dist + floor) * multiplier);
    const disc = Math.round(orig * 0.9);

    setEstimate({
      originalPrice: orig,
      discountedPrice: disc,
      discountAmount: orig - disc,
      breakdown: {
        baseRate: base,
        distanceCharge: dist,
        floorSurCharge: floor,
        packingQuality: packingTier,
        discountPercentage: '10% OFF',
      },
    });
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const handleWhatsAppBooking = () => {
    if (!estimate) return;
    const text = `*Instant Cost Estimate Request - MRL Packers & Movers*%0A%0A*Move Type:* ${moveSize}%0A*Route:* ${pickupArea} to ${dropArea}%0A*Elevator:* ${hasElevatorPickup ? 'Yes' : 'No'} (Pickup) / ${hasElevatorDrop ? 'Yes' : 'No'} (Drop)%0A*Packing:* ${packingTier}%0A*Estimated Price:* ₹${estimate.discountedPrice.toLocaleString()} (10% Discount Applied)%0A%0APlease confirm my booking slot!`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Instant Shifting Cost Estimator</h2>
            <p className="text-xs text-slate-400">Calculate live binding estimates with MRL Packers & Movers Mumbai</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Move Type Selector */}
          <div>
            <label className="block text-2xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
              Select Shifting Volume / Property Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['1BHK', '2BHK', '3BHK', 'Villa / 4BHK', 'Office', 'Bike Transport', 'Car Transport'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMoveSize(type)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    moveSize === type
                      ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-2xs font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Pickup Area (Mumbai)
              </label>
              <input
                type="text"
                value={pickupArea}
                onChange={(e) => setPickupArea(e.target.value)}
                placeholder="e.g. Kandivali East"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-2xs font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                Drop Area / City
              </label>
              <input
                type="text"
                value={dropArea}
                onChange={(e) => setDropArea(e.target.value)}
                placeholder="e.g. Andheri / Pune"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Toggles: Local vs Intercity & Elevators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div>
              <span className="block font-bold text-slate-300 mb-1">Route Type:</span>
              <button
                type="button"
                onClick={() => setIsLocal(!isLocal)}
                className={`w-full py-1.5 px-2 rounded-lg font-bold border transition-colors ${
                  isLocal ? 'bg-red-950/40 border-red-700/50 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {isLocal ? 'Local Mumbai Shifting' : 'Intercity (Outside Mumbai)'}
              </button>
            </div>

            <div>
              <span className="block font-bold text-slate-300 mb-1">Pickup Elevator:</span>
              <button
                type="button"
                onClick={() => setHasElevatorPickup(!hasElevatorPickup)}
                className={`w-full py-1.5 px-2 rounded-lg font-bold border transition-colors ${
                  hasElevatorPickup ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' : 'bg-rose-600/30 border-rose-500/50 text-rose-300'
                }`}
              >
                {hasElevatorPickup ? '✔ Elevator Available' : '✖ Stairs Only'}
              </button>
            </div>

            <div>
              <span className="block font-bold text-slate-300 mb-1">Drop Elevator:</span>
              <button
                type="button"
                onClick={() => setHasElevatorDrop(!hasElevatorDrop)}
                className={`w-full py-1.5 px-2 rounded-lg font-bold border transition-colors ${
                  hasElevatorDrop ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' : 'bg-rose-600/30 border-rose-500/50 text-rose-300'
                }`}
              >
                {hasElevatorDrop ? '✔ Elevator Available' : '✖ Stairs Only'}
              </button>
            </div>
          </div>

          {/* Packing Quality */}
          <div>
            <label className="block text-2xs font-extrabold uppercase tracking-wider text-slate-300 mb-1">
              Packaging Protection Tier
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPackingTier('Standard Box')}
                className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                  packingTier === 'Standard Box'
                    ? 'bg-slate-800 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>Standard Box & Wrapping</div>
                <div className="text-3xs text-slate-500 font-normal">Corrugated boxes + protective film</div>
              </button>

              <button
                type="button"
                onClick={() => setPackingTier('Premium Multi-layer')}
                className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                  packingTier === 'Premium Multi-layer'
                    ? 'bg-slate-800 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div>3-Layer Bubble Wrap (Recommended)</div>
                <div className="text-3xs text-slate-500 font-normal">Bubble wrap + edge guards + tarpaulin</div>
              </button>
            </div>
          </div>

          {/* Estimate Output Box */}
          {estimate && (
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-red-600/40 rounded-2xl p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-2xs uppercase tracking-wider text-red-400 font-extrabold block">
                    Estimated Relocation Cost
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      ₹{estimate.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-xs line-through text-slate-500">
                      ₹{estimate.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Saved ₹{estimate.discountAmount.toLocaleString()} (10% OFF)</span>
                </div>
              </div>

              <div className="text-2xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Base Loading & Transport ({moveSize}):</span>
                  <span className="text-slate-200">₹{estimate.breakdown.baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance & Toll Allowance:</span>
                  <span className="text-slate-200">₹{estimate.breakdown.distanceCharge.toLocaleString()}</span>
                </div>
                {estimate.breakdown.floorSurCharge > 0 && (
                  <div className="flex justify-between">
                    <span>Staircase Labor Surcharge:</span>
                    <span className="text-slate-200">₹{estimate.breakdown.floorSurCharge.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 font-bold pt-1">
                  <span>Included:</span>
                  <span>100% Free Transit Insurance + Disassembly</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={async () => {
                onClose();
                onBookEstimate(moveSize, estimate?.discountedPrice || 7999);
              }}
              className="py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book This Price Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppBooking}
              className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Estimate to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
