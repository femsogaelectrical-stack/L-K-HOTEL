/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AMENITIES } from '../data';
import { Zap, ShieldCheck, Car, Utensils, GlassWater, CalendarRange, Star, Quote } from 'lucide-react';
import { DesignTheme } from '../types';

interface AboutSectionProps {
  theme: DesignTheme;
}

export default function AboutSection({ theme }: AboutSectionProps) {
  
  // Dynamic Icon Selector helper
  const renderIcon = (name: string) => {
    const iconClass = "h-6 w-6 text-amber-600 shrink-0";
    switch (name) {
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'GlassWater':
        return <GlassWater className={iconClass} />;
      case 'CalendarRange':
        return <CalendarRange className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-white border-b border-stone-200 overflow-hidden',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-stone-900 tracking-tight leading-tight',
          bodyText: 'text-stone-600 text-sm sm:text-base font-sans leading-relaxed',
          boldText: 'text-stone-900 font-bold',
          badge: 'bg-stone-50 border border-stone-200 rounded-none text-stone-900 font-mono text-[9px] uppercase tracking-wider',
          collageWrap: 'relative z-10 rounded-none overflow-hidden shadow-none border border-stone-200',
          collageQuote: 'absolute bottom-6 left-6 right-6 bg-white p-6 rounded-none shadow-none border border-stone-200',
          countersGrid: 'grid grid-cols-3 gap-6 pt-6 border-t border-stone-100',
          counterNum: 'block text-3xl font-sans font-semibold text-stone-900',
          counterLabel: 'block text-[9px] font-mono text-stone-500 uppercase tracking-wider mt-1',
          highlightWrap: 'bg-stone-50 rounded-none p-8 sm:p-12 border border-stone-200',
          highlightTitle: 'text-2xl font-sans font-bold text-stone-900 mb-2',
          highlightSubtitle: 'text-stone-500 font-sans text-xs',
          amenityCard: 'bg-white p-6 rounded-none border border-stone-200 flex flex-col items-start space-y-3'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 overflow-hidden relative',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide leading-tight',
          bodyText: 'text-slate-300 text-sm sm:text-base font-sans leading-relaxed',
          boldText: 'text-white font-semibold',
          badge: 'bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 font-mono text-[9px] uppercase tracking-wider',
          collageWrap: 'relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-800',
          collageQuote: 'absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md p-6 rounded-xl border border-slate-800',
          countersGrid: 'grid grid-cols-3 gap-6 pt-6 border-t border-slate-900/40',
          counterNum: 'block text-3xl font-serif font-bold text-amber-400',
          counterLabel: 'block text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-1',
          highlightWrap: 'bg-[#0E1528] rounded-2xl p-8 sm:p-12 border border-slate-805 shadow-2xl',
          highlightTitle: 'text-2xl font-serif text-white tracking-wide mb-2',
          highlightSubtitle: 'text-slate-350 font-sans text-xs',
          amenityCard: 'bg-slate-950 p-6 rounded-xl border border-slate-805/85 hover:border-amber-400/20 transition flex flex-col items-start space-y-3'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] border-b border-[#E8E2D6] overflow-hidden',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2E2A25] tracking-tight leading-tight',
          bodyText: 'text-[#5C5346] text-[#5C5346] text-sm sm:text-base font-serif leading-relaxed',
          boldText: 'text-emerald-900 font-bold',
          badge: 'bg-emerald-100/90 border border-emerald-800/20 rounded-xl text-emerald-850 font-mono text-[9px] uppercase tracking-widest',
          collageWrap: 'relative z-10 rounded-2xl overflow-hidden shadow-md border border-amber-900/10',
          collageQuote: 'absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-amber-900/10',
          countersGrid: 'grid grid-cols-3 gap-6 pt-6 border-t border-[#FAF6F0]/20',
          counterNum: 'block text-3xl font-serif font-bold text-[#15803D]',
          counterLabel: 'block text-[9px] font-mono text-[#5C5346] uppercase tracking-widest mt-1',
          highlightWrap: 'bg-white rounded-2xl p-8 sm:p-12 border border-amber-900/10 shadow-sm',
          highlightTitle: 'text-2xl font-serif text-[#2E2A25] font-bold mb-2',
          highlightSubtitle: 'text-[#5C5346] font-serif text-xs',
          amenityCard: 'bg-[#FAF6F0] p-6 rounded-xl border border-amber-900/5 hover:border-emerald-600/30 transition flex flex-col items-start space-y-3'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="about" className={`transition-all duration-500 ${s.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Narrative / Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24 animate-fadeIn">
          
          {/* Left Block: Image Showcase collage */}
          <div className="lg:col-span-5 relative">
            <div className={s.collageWrap}>
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800"
                alt="L&K Hotel Premium Restaurant & Bar Lounge"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent animate-pulse opacity-40"></div>
              
              {/* Inner card overlay */}
              <div className={s.collageQuote}>
                <Quote className="h-5 w-5 text-amber-500 mb-2 opacity-60" />
                <p className={`font-serif text-sm italic leading-relaxed ${theme === 'luxurious' ? 'text-slate-200' : 'text-stone-800'}`}>
                  "L&K is designed for travelers who crave uncompromised comfort. Our armed security protocols and complete power security represent our foundational promise."
                </p>
                <div className="text-right mt-3">
                  <span className={`block text-[10px] font-mono font-bold uppercase tracking-widest leading-none ${theme === 'luxurious' ? 'text-amber-400' : 'text-stone-900'}`}>
                    L&K Management
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative background blocks */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-600/10 rounded-3xl -z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-stone-100/50 rounded-full -z-0"></div>
          </div>

          {/* Right Block: Content narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-block px-3 py-1 ${s.badge}`}>
              <span>Who We Are</span>
            </div>
            
            <h2 className={`transition-all duration-500 ${s.title}`}>
              Ishara's Destination for Relaxation & Business
            </h2>
            
            <p className={`${s.bodyText}`}>
              Perfectly situated along Obasanya Onadeko Street, off Old Ibadan Road, <strong className={s.boldText}>L&K Hotel & Suites</strong> is a haven of premium luxury in Obalende, Ishara, Ogun State. We combine high-end contemporary elegance with deep hospitality roots to create unforgettable stays.
            </p>

            <p className={`${s.bodyText}`}>
              Whether you are an executive seeking a secure base with high-speed internet and silent generators, or an international guest searching for pristine rooms in Ogun State, we provide a 4.5-star experience tailored to meet your standards. Enjoy deep relaxation, fine spirits, and custom fine dining.
            </p>

            {/* Quick Fact Counters */}
            <div className={s.countersGrid}>
              <div>
                <span className={s.counterNum}>4.5★</span>
                <span className={s.counterLabel}>Guests Rating</span>
              </div>
              <div className="border-l border-stone-200/20 pl-6">
                <span className={s.counterNum}>100%</span>
                <span className={s.counterLabel}>Uptime Power</span>
              </div>
              <div className="border-l border-stone-200/20 pl-6">
                <span className={s.counterNum}>24h</span>
                <span className={s.counterLabel}>Armed Security</span>
              </div>
            </div>
          </div>

        </div>

        {/* Property Highlights / Grid of Amenities */}
        <div className={`transition-all duration-500 ${s.highlightWrap}`}>
          
          {/* Subsection title */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className={`transition-all duration-500 ${s.highlightTitle}`}>Resort Facilities & Client Luxuries</h3>
            <p className={s.highlightSubtitle}>
              We provide essential premium facilities configured to make your corporate or leisure experience seamless.
            </p>
          </div>

          {/* Grid layout for AMENITIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((amenity) => (
              <div 
                key={amenity.id}
                className={`transition-all duration-300 ${s.amenityCard}`}
              >
                <div className="bg-amber-500/10 p-3 rounded-xl">
                  {renderIcon(amenity.iconName)}
                </div>
                <h4 className={`font-serif font-bold text-lg ${theme === 'luxurious' ? 'text-white' : 'text-[#2E2A25]'}`}>{amenity.name}</h4>
                <p className={`${theme === 'luxurious' ? 'text-slate-300' : 'text-stone-500'} text-xs sm:text-sm leading-relaxed`}>{amenity.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

