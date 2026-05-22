/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Award, Coffee, Tv, Wifi, CheckCircle2, BedDouble, Square, UserCheck } from 'lucide-react';
import { ROOMS } from '../data';
import { Room, DesignTheme } from '../types';

interface RoomsSectionProps {
  onOpenBookingModal: (roomId: string) => void;
  theme: DesignTheme;
}

export default function RoomsSection({ onOpenBookingModal, theme }: RoomsSectionProps) {
  // Theme styling definitions
  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-white border-b border-stone-200',
          badge: 'bg-stone-100 border-stone-200 rounded-none text-stone-900',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-stone-900 tracking-tight',
          subtitle: 'text-stone-500 font-sans font-normal',
          divider: 'h-px w-20 bg-stone-900 mx-auto',
          card: 'bg-white rounded-none border border-stone-200 shadow-none flex flex-col h-full transition duration-300 hover:border-stone-400',
          priceTag: 'bg-stone-900 uppercase font-mono rounded-none text-white border-none',
          cardTitle: 'text-xl sm:text-2xl font-sans font-bold text-stone-900 tracking-tight',
          btn: 'bg-stone-900 hover:bg-stone-850 text-white font-mono rounded-none uppercase text-xs tracking-wider py-3.5',
          textMuted: 'text-stone-500 font-sans text-xs',
          bodyText: 'text-stone-600 text-sm font-sans lead-relaxed',
          ratingBadge: 'bg-stone-200 text-stone-900 rounded-none'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 border-t border-b border-slate-900',
          badge: 'bg-amber-500/10 border-amber-500/35 rounded-full text-amber-400',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide',
          subtitle: 'text-slate-300 font-sans font-light',
          divider: 'h-0.5 w-20 bg-amber-500 mx-auto',
          card: 'bg-[#0E1528] rounded-2xl border border-slate-805 shadow-2xl flex flex-col h-full hover:border-[#C5A880]/30 transition-all duration-300',
          priceTag: 'bg-slate-900 border border-slate-800 text-amber-400 font-sans rounded-xl',
          cardTitle: 'text-xl sm:text-2xl font-serif text-white tracking-wide',
          btn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-sans font-bold rounded-lg py-3',
          textMuted: 'text-slate-400 font-mono text-xs',
          bodyText: 'text-slate-300 text-sm font-sans leading-relaxed',
          ratingBadge: 'bg-amber-500/20 text-amber-300 rounded-lg'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] border-b border-[#E8E2D6]',
          badge: 'bg-emerald-100/90 border-emerald-800/20 rounded-xl text-emerald-850',
          title: 'text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2E2A25] tracking-tight',
          subtitle: 'text-[#5C5346] font-serif',
          divider: 'h-0.5 w-20 bg-[#15803D] mx-auto',
          card: 'bg-white rounded-2xl border border-amber-900/10 shadow-md flex flex-col h-full hover:shadow-xl transition-all duration-300',
          priceTag: 'bg-[#15803D] text-white rounded-xl',
          cardTitle: 'text-xl sm:text-2xl font-serif text-[#2E2A25] font-bold tracking-tight',
          btn: 'bg-[#15803D] hover:bg-[#166534] text-white font-serif font-medium rounded-xl py-3 shadow-md',
          textMuted: 'text-[#5C5346] font-serif text-xs',
          bodyText: 'text-[#5C5346] text-sm font-sans leading-relaxed',
          ratingBadge: 'bg-emerald-50 text-emerald-800 rounded-lg'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="rooms" className={`transition-all duration-500 ${s.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center space-x-1.5 border px-3 py-1 ${s.badge}`}>
            <Award className="h-4 w-4 text-emerald-700" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
              L&K EXCELLENCE
            </span>
          </div>
          <h2 className={`transition-all duration-500 ${s.title}`}>
            Premium Suites & Accommodations
          </h2>
          <div className={`transition-all duration-500 ${s.divider}`}></div>
          <p className={`transition-all duration-500 ${s.subtitle} text-base sm:text-lg max-w-2xl mx-auto leading-relaxed`}>
            Every suite is crafted with quiet luxury in mind. Select standard comfort or upscale presidential prestige, complete with our signature grid power and armed-patrol safety nets.
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <div 
              key={room.id}
              className={`transition-all duration-300 overflow-hidden ${s.card}`}
            >
              {/* Card Image Block */}
              <div className="relative h-64 overflow-hidden shrink-0 select-none">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
                
                {/* Float Pricing Tag */}
                <div className={`absolute top-4 right-4 backdrop-blur-md px-4 py-2 text-center transition-all duration-300 ${s.priceTag}`}>
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-amber-500 font-bold">
                    BEST RATES
                  </span>
                  <span className="text-base font-bold">
                    ₦{room.price.toLocaleString()}
                  </span>
                  <span className="block text-[8px] font-mono font-medium opacity-80">
                    / Night
                  </span>
                </div>

                {/* Left Badge */}
                <span className={`absolute top-4 left-4 font-mono text-[9px] px-2.5 py-1.5 uppercase tracking-wider font-bold shadow-sm ${s.ratingBadge}`}>
                  4.5 ★ Rating
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Basic Metadata */}
                  <div className={`flex items-center space-x-4 mb-4 font-mono tracking-wider ${s.textMuted}`}>
                    <div className="flex items-center">
                      <BedDouble className="h-3.5 w-3.5 mr-1.5 shrink-0 text-amber-500" />
                      <span>Max {room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center border-l border-stone-200 pl-4">
                      <Square className="h-3 w-3 mr-1.5 shrink-0 text-amber-500" />
                      <span>{room.size} Space</span>
                    </div>
                  </div>

                  {/* Room Name */}
                  <h3 className={`mb-3 transition-all duration-500 ${s.cardTitle}`}>
                    {room.name}
                  </h3>

                  {/* Room Description */}
                  <p className={`mb-6 transition-all duration-500 ${s.bodyText}`}>
                    {room.description}
                  </p>

                  <div className="border-t border-stone-205/10 my-4"></div>

                  {/* Room Amenities list */}
                  <div className="space-y-2.5 mb-8">
                    <span className="block text-[10px] font-mono uppercase font-bold text-stone-500 tracking-wider mb-2">
                      Included Premium Amenities:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {room.features.slice(0, 5).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-xs font-sans">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span className={theme === 'luxurious' ? 'text-slate-300' : 'text-stone-700'}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Actions Reservation */}
                <div>
                  <button
                    onClick={() => onOpenBookingModal(room.id)}
                    className={`w-full text-center tracking-normal transition-all flex items-center justify-center space-x-2 cursor-pointer ${s.btn}`}
                    id={`btn-view-rates-${room.id}`}
                  >
                    <span>Reserve & View Rates</span>
                    <UserCheck className="h-4 w-4 ml-1" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

