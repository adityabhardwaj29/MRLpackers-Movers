import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Phone,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO, GALLERY_IMAGES } from '../data';
import { GalleryItem } from '../types';

import { PageType } from '../components/Navbar';

interface GalleryPageProps {
  onOpenQuoteModal: () => void;
  onNavigatePage: (page: PageType) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenQuoteModal,
  onNavigatePage,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Household', 'Packing', 'Vehicles', 'Warehouse', 'Office'];

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((item) => item.category === activeCategory);

  const currentImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Page Hero Header */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <button
              onClick={() => onNavigatePage('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-red-500 font-bold">Gallery</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-3xs font-black uppercase tracking-wider">
                <ImageIcon className="w-3.5 h-3.5" />
                Fleet & Real Relocation Operations
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Our Fleet & Packaging <span className="text-red-500">Gallery</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Take a look at our live moving operations in Mumbai, multi-layer cushioning materials, heavy container trucks, and secure climate-controlled warehouses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                Book Your Shifting
              </button>
              <a
                href={`tel:${COMPANY_INFO.phonePrimaryTel}`}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-850 cursor-pointer shadow-lg hover:shadow-2xl hover:border-red-500/80 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity p-6 flex flex-col justify-end">
                <span className="inline-block self-start bg-red-600 text-white text-3xs font-black uppercase px-3 py-0.5 rounded-full mb-1.5 shadow-sm">
                  {item.tag}
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[11px] text-slate-400 mt-1">
                  Category: {item.category}
                </span>
              </div>

              {/* Zoom Button Icon */}
              <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/90 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-slate-700 shadow-md">
                <Maximize2 className="w-4 h-4 text-red-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Notice */}
        <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Genuine Live Photos from Mumbai Relocation Assignments</h4>
              <p className="text-xs text-slate-400">
                All containers and packaging materials shown are authentic MRL Packers & Movers assets.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 whitespace-nowrap cursor-pointer"
          >
            Get Custom Quote
          </button>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {currentImage && selectedImageIndex !== null && (
        <div
          onClick={() => setSelectedImageIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Bar with Counter & Close */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xs font-black bg-red-600 text-white uppercase px-2.5 py-0.5 rounded-full">
                  {currentImage.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Image {selectedImageIndex + 1} of {filteredImages.length}
                </span>
              </div>

              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with Nav Arrows */}
            <div className="relative max-h-[70vh] bg-slate-950 flex items-center justify-center overflow-hidden p-2">
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors border border-slate-700 shadow-xl cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors border border-slate-700 shadow-xl cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption & CTAs */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">{currentImage.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Category: <strong className="text-slate-200">{currentImage.category}</strong> • 100% Insured Operations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedImageIndex(null);
                    onOpenQuoteModal();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
