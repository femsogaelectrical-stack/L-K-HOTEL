/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, Menu, X, Hotel, PhoneCall, Heart } from 'lucide-react';
import { Booking, DesignTheme } from '../types';

interface HeaderProps {
  onOpenBookingModal: (roomId?: string) => void;
  myBookings: Booking[];
  onViewMyBookings: () => void;
  theme: DesignTheme;
}

export default function Header({ onOpenBookingModal, myBookings, onViewMyBookings, theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  };

  // Dynamic values per theme
  const getThemeClasses = () => {
    switch (theme) {
      case 'minimalist':
        return {
          header: 'bg-white/95 border-stone-200 text-stone-900 shadow-none',
          brandText: 'text-stone-905 font-sans font-black tracking-tight',
          brandSubText: 'text-stone-500 font-mono tracking-widest',
          logoBg: 'bg-stone-900 rounded-none',
          navLink: 'text-stone-600 hover:text-stone-900 font-mono text-xs uppercase tracking-wider',
          bookButton: 'bg-stone-900 hover:bg-stone-800 text-white font-mono rounded-none uppercase text-xs tracking-wider py-3 px-6',
          contactLink: 'text-stone-500 hover:text-stone-900 font-mono border-stone-200'
        };
      case 'luxurious':
        return {
          header: 'bg-slate-950/95 border-slate-900 text-slate-100 shadow-xl',
          brandText: 'text-white font-serif tracking-wide',
          brandSubText: 'text-amber-400 font-mono tracking-[0.25em]',
          logoBg: 'bg-amber-500/90 rounded-md',
          navLink: 'text-slate-300 hover:text-amber-400 font-sans font-medium',
          bookButton: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-lg shadow-md shadow-amber-500/10 py-2.5 px-5',
          contactLink: 'text-slate-400 hover:text-amber-400 font-medium border-slate-800'
        };
      case 'boutique':
      default:
        return {
          header: 'bg-[#FAF6F0]/95 border-[#EFECE6] text-stone-800 shadow-sm',
          brandText: 'text-[#2E2A25] font-serif font-bold tracking-tight',
          brandSubText: 'text-amber-700 font-mono tracking-[0.18em]',
          logoBg: 'bg-[#15803D] rounded-xl',
          navLink: 'text-[#5C5346] hover:text-[#15803D] font-serif font-medium',
          bookButton: 'bg-[#15803D] hover:bg-[#166534] text-white font-serif rounded-xl py-2.5 px-5 shadow-sm',
          contactLink: 'text-[#5C5346] hover:text-[#15803D] font-medium border-stone-200/60'
        };
    }
  };

  const c = getThemeClasses();

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${c.header}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand/Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`p-2.5 mr-3 shadow-md flex items-center justify-center transition-all duration-300 ${c.logoBg}`}>
              <Hotel className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className={`block text-xl leading-none transition-all duration-300 ${c.brandText}`}>
                L&K HOTEL
              </span>
              <span className={`block text-[9px] uppercase font-bold leading-none mt-1 select-none transition-all duration-300 ${c.brandSubText}`}>
                & SUITES • ISHARA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('hero')} 
              className={`text-sm tracking-wide transition duration-300 ${c.navLink}`}
              id="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('rooms')} 
              className={`text-sm tracking-wide transition duration-300 ${c.navLink}`}
              id="nav-rooms"
            >
              Suites & Rates
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`text-sm tracking-wide transition duration-300 ${c.navLink}`}
              id="nav-amenities"
            >
              Amenities
            </button>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className={`text-sm tracking-wide transition duration-300 ${c.navLink}`}
              id="nav-reviews"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('location')} 
              className={`text-sm tracking-wide transition duration-300 ${c.navLink}`}
              id="nav-location"
            >
              Location
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {myBookings.length > 0 && (
              <button 
                onClick={onViewMyBookings}
                className="relative flex items-center bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 px-3.5 rounded-full transition cursor-pointer"
                id="btn-my-bookings"
              >
                <span className="absolute -top-1.5 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-600 text-[10px] text-white font-bold items-center justify-center">
                    {myBookings.length}
                  </span>
                </span>
                <Calendar className="h-3.5 w-3.5 text-amber-600 mr-1.5" />
                My Bookings
              </button>
            )}

            <a 
              href="mailto:reservations@lkhotels.com" 
              className={`flex items-center transition text-xs font-medium border-r pr-4 mr-1 ${c.contactLink}`}
              id="lnk-email"
            >
              <PhoneCall className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
              +234 81 2345 6789
            </a>

            <button
              onClick={() => onOpenBookingModal()}
              className={`transition cursor-pointer text-sm font-semibold ${c.bookButton}`}
              id="btn-book-now"
            >
              Book Your Stay
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {myBookings.length > 0 && (
              <button 
                onClick={onViewMyBookings}
                className="relative bg-stone-100 p-2.5 rounded-lg text-stone-800 transition"
                aria-label="View bookings"
                id="btn-mobile-my-bookings"
              >
                <Calendar className="h-5 w-5 text-amber-600" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-[9px] text-white font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {myBookings.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-stone-700 hover:text-amber-600 p-2 rounded-lg bg-stone-50 cursor-pointer"
              aria-label="Open main menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t shadow-xl animate-fade-in ${theme === 'luxurious' ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-stone-100 text-stone-850'}`}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium hover:bg-stone-50 hover:text-amber-500 transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('rooms')}
              className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium hover:bg-stone-50 hover:text-amber-500 transition"
            >
              Suites & Rates
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium hover:bg-stone-50 hover:text-amber-500 transition"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium hover:bg-stone-50 hover:text-amber-500 transition"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="block w-full text-left py-3 px-4 rounded-lg text-base font-medium hover:bg-stone-50 hover:text-amber-500 transition"
            >
              Location
            </button>
            
            <div className="pt-4 border-t border-stone-100 flex flex-col space-y-3 px-4">
              <a 
                href="tel:+2348123456789" 
                className="flex items-center text-sm font-medium"
              >
                <PhoneCall className="h-4 w-4 text-amber-500 mr-2" />
                +234 81 2345 6789
              </a>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className={`w-full text-center py-3 font-semibold shadow-md transition ${c.bookButton}`}
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

