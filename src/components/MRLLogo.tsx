import React from 'react';

interface MRLLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textColor?: 'dark' | 'light';
}

export const MRLLogo: React.FC<MRLLogoProps> = ({
  className = '',
  size = 54,
  showText = true,
  textColor = 'dark',
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(String(size), 10) || 54;

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Official Uploaded MRL Packers & Movers Circular Emblem Logo */}
      <img
        src="/public/logo.png"
        alt="MRL Packers and Movers Logo"
        width={numericSize}
        height={numericSize}
        className="flex-shrink-0 object-contain drop-shadow-sm transition-transform hover:scale-105 duration-200 select-none rounded-full"
        style={{ width: `${numericSize}px`, height: `${numericSize}px`, aspectRatio: '1/1' }}
        loading="eager"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/logo.png';
        }}
      />

      {/* Side Branding Text */}
      {showText && (
        <div className="flex flex-col leading-tight select-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                textColor === 'light' ? 'text-white' : 'text-slate-900'
              }`}
            >
              MRL
            </span>
            <span className="text-xs sm:text-sm font-black text-red-600 uppercase tracking-wide">
              Packers &amp; Movers
            </span>
          </div>
          <span
            className={`text-[10px] uppercase tracking-widest font-extrabold ${
              textColor === 'light' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Mumbai Relocation Enterprise
          </span>
        </div>
      )}
    </div>
  );
};
