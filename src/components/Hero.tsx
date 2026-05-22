/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Calendar, Users, Eye, ArrowRight, BedDouble, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ROOMS } from '../data';
import { DesignTheme } from '../types';

interface HeroProps {
  onOpenBookingWithDetails: (details: {
    checkIn: string;
    checkOut: string;
    roomId: string;
    guestsCount: number;
  }) => void;
  theme: DesignTheme;
}


export default function Hero({ onOpenBookingWithDetails, theme }: HeroProps) {
  // Set default dates: checkIn as tomorrow, checkOut as day after
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateString(dayAfter));
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [guestsCount, setGuestsCount] = useState(2);
  const [errorMsg, setErrorMsg] = useState('');

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
      setErrorMsg('Please select valid calendar dates.');
      return;
    }

    if (inDate >= outDate) {
      setErrorMsg('Check-out date must be after check-in date.');
      return;
    }

    onOpenBookingWithDetails({
      checkIn,
      checkOut,
      roomId,
      guestsCount
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  };

  // Theme-specific styles config
  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'bg-stone-50 text-stone-900 pt-20 lg:pt-32 pb-16 overflow-hidden border-b border-stone-200',
          overlay: 'absolute inset-0 bg-stone-100/30 backdrop-blur-[1px]',
          imgOpacity: 'opacity-10 filter grayscale contrast-125',
          title: 'text-stone-900 font-sans font-light tracking-tight leading-none text-4xl sm:text-5xl lg:text-6xl',
          accentText: 'text-stone-800 font-normal underline decoration-1 underline-offset-8',
          subText: 'text-stone-600 font-sans font-normal max-w-xl leading-relaxed text-sm sm:text-base',
          primaryBtn: 'bg-stone-900 hover:bg-stone-850 text-white rounded-none uppercase text-xs tracking-wider transition-all shadow-none py-4 px-8',
          secondaryBtn: 'bg-white hover:bg-stone-100 text-stone-900 rounded-none border border-stone-300 font-mono text-xs uppercase tracking-wider transition-all py-4 px-8',
          badge: 'bg-stone-200/60 border-stone-300/80 rounded-none text-stone-800',
          formCard: 'bg-white rounded-none border border-stone-200 shadow-none p-6 space-y-4',
          formHeading: 'bg-stone-900 text-white p-5 rounded-none font-mono text-xs uppercase tracking-widest',
          formLabel: 'text-[10px] uppercase font-mono tracking-wider text-stone-500 font-bold',
          formInput: 'bg-stone-50 border-stone-200 rounded-none focus:border-stone-900 focus:ring-0 text-stone-950 font-mono',
          formBtn: 'bg-stone-900 hover:bg-stone-850 text-white uppercase font-mono tracking-wider text-xs rounded-none py-4'
        };
      case 'luxurious':
        return {
          section: 'bg-slate-950 text-slate-100 pt-24 lg:pt-36 pb-20 overflow-hidden relative',
          overlay: 'absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40',
          imgOpacity: 'opacity-35 scale-105 filter brightness-90',
          title: 'text-white font-serif tracking-wide leading-tight text-4xl sm:text-5xl lg:text-6xl',
          accentText: 'text-amber-400 font-sans italic',
          subText: 'text-slate-300 font-sans font-light max-w-xl leading-relaxed text-base sm:text-lg',
          primaryBtn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/20 py-4 px-8 transform hover:-translate-y-0.5 transition-all',
          secondaryBtn: 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium rounded-lg border border-slate-800 hover:border-slate-700 transition-all py-4 px-8',
          badge: 'bg-amber-500/10 border-amber-500/30 rounded-full text-amber-300',
          formCard: 'bg-[#0E1528] rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4',
          formHeading: 'bg-gradient-to-r from-slate-905 to-slate-900 border-b border-slate-800 p-6 text-white rounded-t-2xl',
          formLabel: 'text-xs uppercase font-mono tracking-wider text-amber-400 font-medium',
          formInput: 'bg-slate-900/60 border-slate-800 text-white rounded-lg focus:border-amber-500 focus:ring-amber-500/20 font-sans',
          formBtn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg py-3.5 shadow-md shadow-amber-550/10'
        };
      case 'boutique':
      default:
        return {
          section: 'bg-[#FAF6F0] text-stone-800 pt-20 lg:pt-32 pb-16 overflow-hidden border-b border-[#E8E2D6]',
          overlay: 'absolute inset-0 bg-[#FAF6F0]/60 backdrop-blur-[0.5px]',
          imgOpacity: 'opacity-15 sepia-[20%]',
          title: 'text-[#2E2A25] font-serif font-black tracking-tight leading-tight text-4xl sm:text-5xl lg:text-5xl',
          accentText: 'text-emerald-800 font-serif italic font-normal',
          subText: 'text-[#5C5346] font-serif font-normal max-w-xl leading-relaxed text-base sm:text-base',
          primaryBtn: 'bg-[#15803D] hover:bg-[#166534] text-white rounded-xl shadow-lg shadow-emerald-800/15 py-4 px-8 transition-all font-serif font-medium',
          secondaryBtn: 'bg-white hover:bg-[#F2ECE1] text-[#2E2A25] rounded-xl border border-amber-900/15 transition-all py-4 px-8 font-serif',
          badge: 'bg-emerald-100/80 border-emerald-800/15 rounded-xl text-emerald-850',
          formCard: 'bg-white rounded-2xl border border-amber-900/10 shadow-lg p-6 space-y-4',
          formHeading: 'bg-[#15803D] text-white p-5 rounded-t-2xl font-serif text-lg font-bold',
          formLabel: 'text-xs uppercase font-sans tracking-wider text-amber-800 font-semibold',
          formInput: 'bg-[#FAF6F0]/60 border-stone-200 rounded-xl focus:border-[#15803D] focus:ring-[#15803D]/20 text-stone-900 font-serif',
          formBtn: 'bg-[#15803D] hover:bg-[#166534] text-white font-serif font-semibold text-base py-3.5 rounded-xl transition-all shadow-sm'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="hero" className={`relative transition-all duration-500 ${s.section}`}>
      
      {/* Background Image with Theme-specific overlays */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600"
          alt="L&K Hotel & Suites Premium Exterior"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${s.imgOpacity} transform motion-safe:animate-pulse`}
          style={{ animationDuration: '10s' }}
        />
        <div className={`absolute inset-0 transition-all duration-500 ${s.overlay}`}></div>
        {theme === 'luxurious' && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Headlines & Quality Factors */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6">
            
            {/* Rating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center space-x-2 border px-3-5 py-1.5 transition-all duration-300 ${s.badge}`}
            >
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <div className="relative h-3 w-3">
                  <Star className="absolute h-3.5 w-3.5 fill-current" />
                </div>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                4.5 ★ VERIFIED PREMIUM HOSPITALITY
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`transition-all duration-500 ${s.title}`}
            >
              Experience Luxury & <span className={`transition-all duration-550 ${s.accentText}`}>Comfort</span> at L&K Hotel & Suites
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`transition-all duration-500 ${s.subText}`}
            >
              Your modern, escape tucked away on Obasanya Onadeko Street, off Old Ibadan Road, in Ishara, Ogun State. Indulge in state-of-the-art rooms, guaranteed 24/7 hospitality, and exquisite culinary craft.
            </motion.p>

            {/* Safety & Guarantee Quick Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-wrap gap-3.5 text-[11px] font-mono uppercase tracking-wider text-stone-500"
            >
              <div className="flex items-center bg-stone-550/10 border border-stone-300/20 px-3.5 py-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
                <span className={theme === 'luxurious' ? "text-slate-300" : "text-stone-700"}>Executive Armed Patrols</span>
              </div>
              <div className="flex items-center bg-stone-550/10 border border-stone-300/20 px-3.5 py-2">
                <Zap className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
                <span className={theme === 'luxurious' ? "text-slate-300" : "text-stone-700"}>24/7 Grid Power</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection('rooms')}
                className={`flex items-center justify-center cursor-pointer font-semibold ${s.primaryBtn}`}
                id="btn-hero-explore-suites"
              >
                <span>Explore Luxury Suites</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`flex items-center justify-center cursor-pointer ${s.secondaryBtn}`}
                id="btn-hero-read-about"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Resort Amenities
              </button>
            </motion.div>
          </div>

          {/* Hero Right: Direct Reservation Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`lg:col-span-12 xl:col-span-5 w-full overflow-hidden flex flex-col ${
              theme === 'minimalist' ? 'shadow-none' : 'shadow-2xl'
            }`}
          >
            {/* Widget Header */}
            <div className={`transition-all duration-500 ${s.formHeading}`}>
              <h3 className="text-[15px] font-bold tracking-tight">DIRECT RESERVATION</h3>
              <p className="text-[11px] font-sans mt-0.5 opacity-90">Book directly for complimentary welcome drink & custom amenities</p>
            </div>

            {/* Widget Body */}
            <form onSubmit={handleBookingSearch} className={`transition-all duration-500 ${s.formCard}`}>
              
              {/* Check-In / Check-Out Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="check-in-date" className={`block transition-all duration-500 ${s.formLabel}`}>
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                    <input
                      id="check-in-date"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={formatDateString(today)}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/15 transition-all duration-300 ${s.formInput}`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="check-out-date" className={`block transition-all duration-500 ${s.formLabel}`}>
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                    <input
                      id="check-out-date"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || formatDateString(tomorrow)}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/15 transition-all duration-300 ${s.formInput}`}
                    />
                  </div>
                </div>
              </div>

              {/* Suite Selection */}
              <div className="space-y-1.5">
                <label htmlFor="suite-selection" className={`block transition-all duration-500 ${s.formLabel}`}>
                  Select Suite Type
                </label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <select
                    id="suite-selection"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={`w-full pl-9 pr-3 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/15 appearance-none cursor-pointer transition-all duration-300 ${s.formInput}`}
                  >
                    {ROOMS.map((room) => (
                      <option key={room.id} value={room.id} className="text-stone-900 bg-white">
                        {room.name} — ₦{room.price.toLocaleString()}/Night
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label htmlFor="guests-count" className={`block transition-all duration-500 ${s.formLabel}`}>
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <select
                    id="guests-count"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className={`w-full pl-9 pr-3 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/15 appearance-none cursor-pointer transition-all duration-300 ${s.formInput}`}
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num} className="text-stone-900 bg-white">
                        {num} {num === 1 ? 'Guest' : 'Guests'} Limit
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Errors Displays */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-600 mt-1">
                  {errorMsg}
                </div>
              )}

              {/* CTA Booking submit button */}
              <button
                type="submit"
                className={`w-full font-semibold flex items-center justify-center space-x-2 mt-4 cursor-pointer transition-all duration-300 ${s.formBtn}`}
                id="btn-hero-check-availability"
              >
                <span>Check Availability Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center pt-2">
                <span className="font-mono text-[9px] uppercase font-bold text-stone-400 tracking-wider">
                  🔒 Direct Booking best rate guaranteed
                </span>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

