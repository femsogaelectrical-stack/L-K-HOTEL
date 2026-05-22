/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Crown, Sparkles, Flame, Headphones, GlassWater, ArrowRight, X, Check, Calendar, Users, Wine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignTheme } from '../types';

interface ClubCartelSectionProps {
  theme: DesignTheme;
}

export default function ClubCartelSection({ theme }: ClubCartelSectionProps) {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2-4 persons',
    sectionType: 'VIP Section',
    packageName: 'Dom Pérignon Executive Package',
    specialNotes: ''
  });

  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-white border-b border-stone-200 relative overflow-hidden',
          badge: 'bg-stone-50 border border-stone-200 rounded-none text-stone-900 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-stone-900 tracking-tight leading-tight',
          subtitle: 'text-stone-500 font-sans text-sm sm:text-base leading-relaxed max-w-xl',
          divider: 'h-px w-20 bg-stone-900 my-4',
          highlightBox: 'bg-stone-50 rounded-none border border-stone-200 p-6 flex items-start space-x-4 transition hover:border-stone-400',
          highlightIconBg: 'bg-stone-100 p-3 rounded-none border border-stone-200 text-stone-900',
          highlightTitle: 'text-sm font-sans font-bold text-stone-900 uppercase tracking-wider',
          highlightText: 'text-stone-500 text-xs sm:text-sm font-sans leading-relaxed',
          btnPrimary: 'inline-flex items-center justify-center bg-stone-900 hover:bg-stone-850 text-white font-mono rounded-none uppercase text-xs tracking-wider py-4 px-8 cursor-pointer transition',
          btnSecondary: 'inline-flex items-center justify-center bg-white hover:bg-stone-100 border border-stone-200 text-stone-900 font-mono rounded-none uppercase text-xs tracking-wider py-4 px-8 cursor-pointer transition',
          imageFrame: 'bg-white p-2 border border-stone-200 rounded-none overflow-hidden shrink-0 shadow-none',
          modalContent: 'bg-white rounded-none border border-stone-200 p-8 max-w-md w-full relative shadow-none font-sans',
          formField: 'w-full px-3 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 rounded-none text-sm font-sans focus:outline-none focus:border-stone-900'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 border-t border-b border-slate-900 relative overflow-hidden',
          badge: 'bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide leading-tight',
          subtitle: 'text-slate-300 font-sans font-light text-sm sm:text-base leading-relaxed max-w-xl',
          divider: 'h-0.5 w-16 bg-amber-500 my-4',
          highlightBox: 'bg-[#0E1528] rounded-xl border border-slate-800 p-6 flex items-start space-x-4 transition hover:border-amber-400/20 shadow-md',
          highlightIconBg: 'bg-amber-500/10 p-3 rounded-lg text-amber-400',
          highlightTitle: 'text-sm font-sans font-semibold text-white uppercase tracking-wider',
          highlightText: 'text-slate-400 text-xs sm:text-sm font-sans leading-relaxed',
          btnPrimary: 'inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-sans font-bold rounded-lg py-4 px-8 cursor-pointer shadow-lg hover:shadow-amber-500/10 transition',
          btnSecondary: 'inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 font-sans font-bold rounded-lg py-4 px-8 cursor-pointer transition',
          imageFrame: 'bg-[#0E1528] p-2 border border-slate-800 rounded-xl overflow-hidden shrink-0 shadow-lg',
          modalContent: 'bg-[#0E1528] rounded-2xl border border-slate-800 p-8 max-w-md w-full relative shadow-2xl font-sans text-white',
          formField: 'w-full px-3 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg text-sm font-sans focus:outline-none focus:border-amber-500'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] border-b border-[#E8E2D6] relative overflow-hidden',
          badge: 'bg-emerald-100/90 border border-emerald-800/15 rounded-xl text-emerald-850 font-mono text-[9px] uppercase tracking-widest px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2E2A25] tracking-tight leading-tight',
          subtitle: 'text-[#5C5346] font-serif font-normal text-sm sm:text-base leading-relaxed max-w-xl',
          divider: 'h-0.5 w-16 bg-[#15803D] my-4',
          highlightBox: 'bg-white rounded-2xl border border-amber-900/10 p-6 flex items-start space-x-4 transition hover:shadow-md',
          highlightIconBg: 'bg-emerald-50 p-3 rounded-xl border border-amber-900/5 text-emerald-800',
          highlightTitle: 'text-sm font-serif font-bold text-[#2E2A25] uppercase tracking-wider',
          highlightText: 'text-[#5C5346] text-xs sm:text-sm font-sans leading-relaxed',
          btnPrimary: 'inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white font-serif font-medium rounded-xl py-4 px-8 shadow-md cursor-pointer transition',
          btnSecondary: 'inline-flex items-center justify-center bg-white hover:bg-[#FAF6F0] border border-amber-900/15 text-[#5C5346] font-serif font-medium rounded-xl py-4 px-8 cursor-pointer transition',
          imageFrame: 'bg-white p-2 border border-amber-900/10 rounded-2xl overflow-hidden shrink-0 shadow-sm',
          modalContent: 'bg-white rounded-2xl border border-amber-900/15 p-8 max-w-md w-full relative shadow-xl font-serif text-[#2E2A25]',
          formField: 'w-full px-3 py-2.5 bg-[#FAF6F0] border border-amber-900/15 text-[#2E2A25] rounded-xl text-sm font-sans focus:outline-none focus:border-emerald-700'
        };
    }
  };

  const s = getThemeStyles();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setInquiryForm({ ...inquiryForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;
    
    // Save to localStorage just for simulated persistence
    try {
      const stored = localStorage.getItem('cartel_vip_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({
        id: 'cartel-' + Math.floor(Math.random() * 900000 + 100000),
        ...inquiryForm,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('cartel_vip_inquiries', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }
    
    setInquirySubmitted(true);
  };

  const resetForm = () => {
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '2-4 persons',
      sectionType: 'VIP Section',
      packageName: 'Dom Pérignon Executive Package',
      specialNotes: ''
    });
    setInquirySubmitted(false);
    setShowInquiryModal(false);
  };

  // 4 Core highlights for Club Cartel
  const highlights = [
    {
      id: 'high-1',
      title: 'VIP Sections',
      description: 'Lavishly separated booths with custom ambient light layouts, private waiter delivery, and premium bottle services.',
      icon: <Crown className="h-5 w-5" />
    },
    {
      id: 'high-2',
      title: 'Executive Lounge',
      description: 'Sophisticated networking zone featuring hand-crafted visual finishes, premium cigar menus, and single-malt collections.',
      icon: <Wine className="h-5 w-5" />
    },
    {
      id: 'high-3',
      title: 'Weekend Club Nights',
      description: 'Elevated weekend vibe driven by elite DJs, high-fidelity sound systems, and an upscale, energetic demographic.',
      icon: <Headphones className="h-5 w-5" />
    },
    {
      id: 'high-4',
      title: 'Private Event Bookings',
      description: 'Configure our luxury club space for private executive celebrations, birthday banquets, or red-carpet gala cocktail events.',
      icon: <Sparkles className="h-5 w-5" />
    }
  ];

  return (
    <section id="club-cartel" className={`transition-all duration-500 ${s.section}`}>
      
      {/* Visual background element only in luxurious theme */}
      {theme === 'luxurious' && (
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-80 h-80 bg-red-650/5 blur-[100px] rounded-full pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid: Content narrative on left, Media show on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block - Narrative Text & Core Highlights Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center space-x-1.5 border px-3 py-1 ${s.badge}`}>
                <Flame className="h-3.5 w-3.5 text-orange-550 fill-orange-550/20" />
                <span>EXQUISITE GUEST NIGHTLIFE</span>
              </div>
              
              <h2 className={`transition-all duration-500 leading-tight ${s.title}`}>
                Nightlife Redefined:<br className="hidden sm:inline" /> Club Cartel
              </h2>
              
              <div className={s.divider}></div>
              
              <p className={s.subtitle}>
                Highlight Club Cartel as the premier nightlife destination within L&K Hotel & Suites, featuring an exclusive lounge atmosphere, signature crafted cocktails, elite DJs, and a vibrant energy for guests and locals alike.
              </p>
            </div>

            {/* Core Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item.id} className={s.highlightBox}>
                  <div className={s.highlightIconBg}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={s.highlightTitle}>{item.title}</h4>
                    <p className={s.highlightText}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 pt-4 select-none">
              <button
                onClick={() => setShowInquiryModal(true)}
                className={s.btnPrimary}
                id="btn-cartel-reserve"
              >
                <span>Reserve a VIP Table</span>
                <Crown className="ml-2 h-4 w-4" />
              </button>
              
              <a
                href="#gallery"
                className={s.btnSecondary}
                id="btn-cartel-gallery"
              >
                <span>Explore the Lounge</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Block - Moody Luxury Nightlife Showcase Media Grid */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Big Frame: Elegant High-Contrast Club Crowd */}
            <div className={s.imageFrame}>
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
                  alt="Club Cartel Live DJ Performance"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 to-transparent p-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase block">WEEKEND SENSATIONS</span>
                  <h5 className="font-serif text-base font-bold">Midnight Elite Set</h5>
                </div>
              </div>
            </div>

            {/* Twin Secondary Grid: Cocktail & VIP Lounge Close-up */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className={s.imageFrame}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600"
                    alt="Club Cartel Artisanal Craft Cocktails"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-stone-950/75 p-3 text-white text-center">
                    <span className="text-[9px] font-mono tracking-wide">Mixology Crafted</span>
                  </div>
                </div>
              </div>

              <div className={s.imageFrame}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
                    alt="Club Cartel Velvet VIP Booths"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-stone-950/75 p-3 text-white text-center">
                    <span className="text-[9px] font-mono tracking-wide">Velvet Booths</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Cartel VIP Reservation / Inquiry Form Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div 
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowInquiryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={s.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={resetForm}
                className="absolute top-4 right-4 p-1.5 hover:bg-stone-100 dark:hover:bg-slate-900 rounded-full transition text-stone-400 hover:text-stone-700"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <Crown className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold tracking-tight">
                  VIP Club Reservation
                </h3>
                <p className="text-stone-500 dark:text-slate-400 text-xs mt-1">
                  Obtain exclusive table entry and champagne layouts direct.
                </p>
              </div>

              {!inquirySubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={inquiryForm.name}
                      onChange={handleTextChange}
                      placeholder="e.g. Kolawole Alabi"
                      className={s.formField}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={inquiryForm.phone}
                        onChange={handleTextChange}
                        placeholder="+234..."
                        className={s.formField}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Reserve Date</label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={inquiryForm.date}
                        onChange={handleTextChange}
                        className={s.formField}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Guests Size</label>
                      <select
                        name="guests"
                        value={inquiryForm.guests}
                        onChange={handleTextChange}
                        className={s.formField}
                      >
                        <option value="1-2 persons">1-2 Guests</option>
                        <option value="2-4 persons">2-4 Guests</option>
                        <option value="4-8 persons">4-8 Guests</option>
                        <option value="Custom VIP Group">8+ VIP Group</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Setup Selection</label>
                      <select
                        name="sectionType"
                        value={inquiryForm.sectionType}
                        onChange={handleTextChange}
                        className={s.formField}
                      >
                        <option value="Standard Table">Standard Lounge Seat</option>
                        <option value="VIP Section">VIP Raised Booth</option>
                        <option value="VVIP Private Stage">VVIP Ultra Stage</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Welcome Bottle Package</label>
                    <select
                      name="packageName"
                      value={inquiryForm.packageName}
                      onChange={handleTextChange}
                      className={s.formField}
                    >
                      <option value="Don Julio Premium Package">Don Julio 1942 Reposado Set</option>
                      <option value="Dom Pérignon Executive Package">Dom Pérignon Luminous Brut</option>
                      <option value="Hennessy XO Elite Set">Hennessy X.O. Cognac Set</option>
                      <option value="No Pre-ordered Package">Decide On Arrival</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400">Special Host Requirements</label>
                    <textarea
                      name="specialNotes"
                      rows={2}
                      value={inquiryForm.specialNotes}
                      onChange={handleTextChange}
                      placeholder="e.g. Birthday banner set, private guards requested, special brand mixers..."
                      className={`${s.formField} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-850 text-white font-mono uppercase font-bold text-xs tracking-wider py-4 select-none cursor-pointer text-center"
                    id="btn-cartel-submit-inquiry"
                  >
                    Send VIP Inquiries Direct
                  </button>

                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="h-6 w-6 stroke-[3px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">Booking Inquiry Received!</h4>
                    <p className="text-stone-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                      Thank you for choosing Club Cartel, <strong>{inquiryForm.name}</strong>. Our Guest Relations Director will call or message your WhatsApp line (<strong>{inquiryForm.phone}</strong>) shortly to confirm your table placement and setup credentials.
                    </p>
                  </div>

                  <div className="p-3.5 bg-stone-50 dark:bg-slate-900 border border-stone-100 dark:border-slate-800 text-[11px] text-stone-500 dark:text-slate-400 font-mono text-center rounded-lg">
                    REFERENCE ID: <span className="text-amber-500 font-bold font-sans text-xs">CARTEL-{(Math.random()*10000).toFixed(0)}</span>
                  </div>

                  <button
                    onClick={resetForm}
                    className="w-full bg-stone-900 hover:bg-stone-850 text-white font-mono uppercase font-bold text-xs tracking-wider py-3 mt-4"
                  >
                    Done
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
