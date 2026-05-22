/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { REVIEWS } from '../data';
import { Star, MessageSquareQuote, Check, TrendingUp } from 'lucide-react';
import { DesignTheme } from '../types';

interface TestimonialsSectionProps {
  theme: DesignTheme;
}

export default function TestimonialsSection({ theme }: TestimonialsSectionProps) {
  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-stone-50 text-stone-900 border-b border-stone-200 relative overflow-hidden',
          glow1: 'hidden',
          glow2: 'hidden',
          badge: 'bg-stone-100 border border-stone-200 rounded-none text-stone-900 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-stone-900 tracking-tight',
          divider: 'h-px w-20 bg-stone-900 mx-auto',
          subtitle: 'text-stone-500 font-sans text-sm sm:text-base leading-relaxed',
          statsBg: 'bg-white border border-stone-200 rounded-none p-6 sm:p-8 max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200 shadow-none',
          statVal: 'block text-4xl font-sans font-semibold text-stone-900',
          statLabel: 'block text-[9px] font-mono text-stone-500 uppercase tracking-widest mt-1',
          card: 'bg-white p-8 rounded-none border border-stone-200 relative transition duration-300 flex flex-col justify-between h-full hover:border-stone-400 shadow-none',
          textMuted: 'text-stone-400',
          quoteText: 'text-stone-700 font-sans text-sm sm:text-base italic leading-relaxed',
          authorText: 'text-stone-900 font-sans font-bold text-sm',
          authorSub: 'text-stone-500 font-mono text-[11px] uppercase tracking-wider',
          stayBadge: 'inline-block bg-stone-100 border border-stone-200 text-stone-900 font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-none',
          stayDate: 'block text-[10px] font-mono text-stone-400 mt-1',
          starColor: 'text-stone-900 fill-stone-900'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 border-t border-b border-slate-900 relative overflow-hidden',
          glow1: 'absolute top-1/4 -left-36 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none',
          glow2: 'absolute bottom-1/4 -right-36 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none',
          badge: 'bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide',
          divider: 'h-0.5 w-16 bg-amber-500 mx-auto',
          subtitle: 'text-slate-300 font-sans font-light leading-relaxed',
          statsBg: 'bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800 shadow-2xl',
          statVal: 'block text-4xl font-serif font-bold text-amber-400',
          statLabel: 'block text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-1',
          card: 'bg-[#0E1528] p-8 rounded-2xl border border-slate-800 relative hover:border-amber-400/30 transition duration-300 flex flex-col justify-between h-full shadow-lg',
          textMuted: 'text-slate-500',
          quoteText: 'text-slate-200 font-sans text-sm sm:text-base italic leading-relaxed',
          authorText: 'text-white font-sans font-semibold text-sm',
          authorSub: 'text-slate-400 font-mono text-[11px] uppercase tracking-wider',
          stayBadge: 'inline-block bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg',
          stayDate: 'block text-[10px] font-sans text-slate-400 mt-1',
          starColor: 'text-amber-500 fill-amber-500'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] text-stone-800 border-b border-[#E8E2D6] relative overflow-hidden',
          glow1: 'hidden',
          glow2: 'hidden',
          badge: 'bg-emerald-100/90 border border-emerald-800/15 rounded-xl text-emerald-850 font-mono text-[9px] uppercase tracking-widest px-3 py-1',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2E2A25] tracking-tight',
          divider: 'h-0.5 w-16 bg-[#15803D] mx-auto',
          subtitle: 'text-[#5C5346] font-serif font-normal leading-relaxed',
          statsBg: 'bg-white border border-amber-900/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E8E2D6]/40 shadow-sm',
          statVal: 'block text-4xl font-serif font-bold text-[#15803D]',
          statLabel: 'block text-[9px] font-mono text-[#5C5346] uppercase tracking-widest mt-1',
          card: 'bg-white p-8 rounded-2xl border border-amber-900/5 relative hover:border-emerald-600/30 transition duration-300 flex flex-col justify-between h-full shadow-sm',
          textMuted: 'text-stone-400',
          quoteText: 'text-[#5C5346] font-sans text-sm sm:text-base italic leading-relaxed',
          authorText: 'text-[#2E2A25] font-serif font-bold text-sm',
          authorSub: 'text-[#5C5346] font-mono text-[11px] uppercase tracking-wider',
          stayBadge: 'inline-block bg-[#FAF6F0] border border-amber-905/5 text-emerald-800 font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg',
          stayDate: 'block text-[10px] font-sans text-[#5C5346] mt-1',
          starColor: 'text-emerald-750 fill-emerald-600'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="reviews" className={`transition-all duration-500 ${s.section}`}>
      
      {/* Decorative ambient background glowing circles */}
      {s.glow1 && <div className={s.glow1}></div>}
      {s.glow2 && <div className={s.glow2}></div>}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center space-x-1 ${s.badge}`}>
            <Star className={`h-4 w-4 ${s.starColor}`} />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              TRUSTED & APPROVED BY GUESTS
            </span>
          </div>
          
          <h2 className={`transition-all duration-500 ${s.title}`}>
            Guest Testimonials & Verified Reviews
          </h2>
          <div className={`transition-all duration-500 ${s.divider}`}></div>
          
          <p className={`transition-all duration-500 ${s.subtitle} max-w-xl mx-auto leading-relaxed`}>
            Read real feedback from international business moguls and vacationing travelers who have trusted L&K Hotel & Suites in Ishara, Ogun State.
          </p>
        </div>

        {/* Global Overview Stats Block */}
        <div className={`transition-all duration-500 ${s.statsBg}`}>
          <div>
            <span className={s.statVal}>4.5 / 5.0</span>
            <div className="flex justify-center my-1">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${s.starColor}`} />
              ))}
              <div className="relative h-3.5 w-3.5">
                <Star className={`absolute h-3.5 w-3.5 ${s.starColor}`} />
              </div>
            </div>
            <span className={s.statLabel}>Weighted Star Rating</span>
          </div>

          <div className="pt-6 md:pt-0">
            <span className={s.statVal}>120+</span>
            <div className="flex items-center justify-center text-emerald-600 text-[10px] font-mono font-bold uppercase mt-1">
              <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              <span>Verified Submissions</span>
            </div>
            <span className={s.statLabel}>Online Checkout Surveys</span>
          </div>

          <div className="pt-6 md:pt-0">
            <span className={s.statVal}>98%</span>
            <div className="flex items-center justify-center text-amber-600 text-[10px] font-mono font-bold uppercase mt-1">
              <TrendingUp className="h-3.5 w-3.5 mr-1 text-amber-600" />
              <span>Recommended Value</span>
            </div>
            <span className={s.statLabel}>Return Customer Intent</span>
          </div>
        </div>

        {/* Testimonials Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className={`transition-all duration-300 ${s.card}`}
            >
              {/* Quote icon overlay */}
              <div className="absolute top-6 right-6 text-stone-300/30 dark:text-stone-800/30 pointer-events-none">
                <MessageSquareQuote className="h-10 w-10 opacity-30 text-stone-400" />
              </div>

              {/* Card Header: Rating */}
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.floor(review.rating) }).map((_, idx) => (
                    <Star key={idx} className={`h-4 w-4 ${s.starColor}`} />
                  ))}
                  {review.rating % 1 !== 0 && (
                    <div className="relative h-4 w-4">
                      <Star className={`h-4 w-4 ${s.starColor}`} />
                    </div>
                  )}
                </div>

                {/* Review Text */}
                <p className={`font-sans leading-relaxed ${s.quoteText}`}>
                  "{review.text}"
                </p>
              </div>

              {/* Author & Details Footer */}
              <div className="border-t border-stone-200/20 my-6 pt-6 flex justify-between items-center">
                <div>
                  <span className={s.authorText}>
                    {review.author}
                  </span>
                  <span className={s.authorSub}>
                    From {review.location}
                  </span>
                </div>

                <div className="text-right">
                  <span className={s.stayBadge}>
                    {review.stayType}
                  </span>
                  <span className={s.stayDate}>
                    {review.stayDate}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
