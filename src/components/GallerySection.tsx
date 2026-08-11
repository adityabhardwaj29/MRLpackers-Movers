import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { GalleryItem } from '../types';
import { Image, Maximize2, X, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Household', 'Packing', 'Vehicles', 'Warehouse', 'Office'];

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-3xs font-black uppercase tracking-widest border border-red-200">
            REAL WORK PHOTOS & FLEET
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Packing & Transport Fleet Gallery
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            See our professional MRL moving crew in action, container trucks, and 3-layer protective packaging.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 cursor-pointer shadow-sm hover:shadow-md hover:border-red-500 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-5 flex flex-col justify-end">
                <span className="inline-block self-start bg-red-600 text-white text-3xs font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1">
                  {item.tag}
                </span>
                <h3 className="text-base font-extrabold text-white">
                  {item.title}
                </h3>
              </div>

              {/* Zoom Icon Button */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-200 shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[80vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-white border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-3xs font-black text-red-600 uppercase tracking-widest">{selectedImage.tag}</span>
                <h3 className="text-lg font-black text-slate-900">{selectedImage.title}</h3>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Category: {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
