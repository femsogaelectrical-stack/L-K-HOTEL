/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Image, Maximize2, X, Compass, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignTheme } from '../types';

interface GalleryItem {
  id: string;
  category: 'suites' | 'dining' | 'lifestyle' | 'facilities';
  title: string;
  description: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'facilities',
    title: 'The Royal Welcome Lobby',
    description: 'Our beautifully constructed, high-ceiling reception designed with African mahogany and warm gold details.',
    image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-2',
    category: 'suites',
    title: 'Presidential Master Bed',
    description: 'Postured premium king-size bedding featuring hand-loomed linens and dual climate control.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-3',
    category: 'dining',
    title: 'Signature Jollof & Grill',
    description: 'Freshly plated gourmet local Nigerian and international fusion delicacies prepared daily.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-4',
    category: 'lifestyle',
    title: 'The Amber Pool Oasis',
    description: 'Plush poolside sun lounges surrounded by curated tropical gardens and cool afternoon breeze.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-5',
    category: 'dining',
    title: 'Lounge Mixology Bar',
    description: 'Artisanal cocktails, imported single malts, and warm ambient networking spaces.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-6',
    category: 'facilities',
    title: 'Boardroom & Conference State',
    description: 'Premium event layout built for executive councils and corporate presentations in Ishara.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=800'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Property Showcase' },
  { id: 'suites', label: 'Suites & Comfort' },
  { id: 'dining', label: 'Dining & Lounge' },
  { id: 'facilities', label: 'Lobby & Events' },
  { id: 'lifestyle', label: 'Outdoor Oasis' }
];

interface GallerySectionProps {
  theme: DesignTheme;
}

export default function GallerySection({ theme }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-white border-b border-stone-200',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-stone-900 tracking-tight',
          subtitle: 'text-stone-500 font-sans text-sm sm:text-base leading-relaxed',
          divider: 'h-px w-20 bg-stone-900 mx-auto',
          badge: 'bg-stone-50 border-stone-200 rounded-none text-stone-900',
          activeTab: 'bg-stone-900 text-white rounded-none shadow-none text-xs uppercase font-mono tracking-widest',
          inactiveTab: 'bg-white border border-stone-200 text-stone-605 hover:bg-stone-100 rounded-none text-xs uppercase font-mono tracking-widest',
          card: 'break-inside-avoid mb-6 group relative rounded-none overflow-hidden hover:border-stone-400 transition cursor-pointer border border-stone-200 shadow-none bg-white'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 border-none relative',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide',
          subtitle: 'text-slate-300 font-sans font-light leading-relaxed text-base',
          divider: 'h-0.5 w-20 bg-amber-550 mx-auto',
          badge: 'bg-amber-500/10 border-amber-505/30 rounded-full text-amber-300',
          activeTab: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-lg shadow-md text-xs font-sans font-bold tracking-normal',
          inactiveTab: 'bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-805 rounded-lg text-xs font-sans font-medium tracking-normal',
          card: 'break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden hover:border-amber-400/30 transition duration-300 cursor-pointer border border-slate-800 shadow-md bg-[#0D1527]'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] border-b border-[#E8E2D6]',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2E2A25] tracking-tight',
          subtitle: 'text-[#5C5346] font-serif font-normal leading-relaxed text-base',
          divider: 'h-0.5 w-20 bg-[#15803D] mx-auto',
          badge: 'bg-emerald-100/90 border-emerald-800/15 rounded-xl text-emerald-850',
          activeTab: 'bg-[#15803D] text-white rounded-xl shadow-sm text-xs font-serif font-medium',
          inactiveTab: 'bg-white border border-amber-900/10 text-[#5C5346] hover:bg-[#FAF6F0] rounded-xl text-xs font-serif font-medium',
          card: 'break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-amber-900/10 bg-white'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="gallery" className={`transition-all duration-500 ${s.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center space-x-1.5 border px-3 py-1 ${s.badge}`}>
            <Compass className="h-4 w-4" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
              GUEST HIGHLIGHTS
            </span>
          </div>
          <h2 className={`transition-all duration-500 ${s.title}`}>
            Our Property Gallery
          </h2>
          <div className={`transition-all duration-500 ${s.divider}`}></div>
          <p className={`transition-all duration-500 ${s.subtitle} max-w-2xl mx-auto leading-relaxed`}>
            Take a visual tour around L&K Hotel & Suites. Immerse yourself in the contemporary recreation hubs, dynamic lounges, and high-fidelity comfort waiting for you in Ogun State.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 sm:px-6 py-2.5 transition flex items-center space-x-1.5 tracking-wider font-semibold cursor-pointer ${
                activeFilter === cat.id ? s.activeTab : s.inactiveTab
              }`}
            >
              {activeFilter === cat.id && <Check className="h-3.5 w-3.5" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_auto]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={s.card}
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Wrap */}
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Maximize2 className="absolute top-4 right-4 h-5 w-5 text-amber-500 opacity-80" />
                    <div>
                      <span className="inline-block bg-[#15803D] text-white text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded mb-2 tracking-widest">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-white font-bold text-lg leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-stone-300 text-xs line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div 
              className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-4 right-4 p-2.5 bg-stone-900/80 hover:bg-stone-800 text-white rounded-lg transition"
                onClick={() => setSelectedImage(null)}
                aria-label="Close portal window"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl w-full bg-[#0E1528] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-slate-950 border-t border-slate-900 text-white">
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-550 tracking-wider">
                    {selectedImage.category} GALLERY EXPLORER
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1 mb-2 text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
