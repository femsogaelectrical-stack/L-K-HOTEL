/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThemeExplorer from './components/ThemeExplorer';
import Hero from './components/Hero';
import RoomsSection from './components/RoomsSection';
import ClubCartelSection from './components/ClubCartelSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationSection from './components/LocationSection';
import BookingModal from './components/BookingModal';
import MyBookingsModal from './components/MyBookingsModal';
import { Booking, DesignTheme } from './types';
import { Hotel, Mail, Phone, MapPin, Star, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<DesignTheme>('minimalist');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);
  
  // Stored preferences from hero search or quick-booking
  const [initialCheckIn, setInitialCheckIn] = useState<string | undefined>(undefined);
  const [initialCheckOut, setInitialCheckOut] = useState<string | undefined>(undefined);
  const [initialGuests, setInitialGuests] = useState<number | undefined>(undefined);

  const [myBookingsModalOpen, setMyBookingsModalOpen] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Load bookings and theme preferences from LocalStorage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('lk_site_theme') as DesignTheme | null;
      if (storedTheme && ['minimalist', 'luxurious', 'boutique'].includes(storedTheme)) {
        setTheme(storedTheme);
      } else {
        setTheme('minimalist');
      }

      const stored = localStorage.getItem('lk_hotel_bookings');
      if (stored) {
        setMyBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  const handleThemeChange = (newTheme: DesignTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('lk_site_theme', newTheme);
    } catch (e) {
      console.error('Failed to save selected theme:', e);
    }
  };

  // Save bookings to LocalStorage on change
  const handleConfirmNewBooking = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...myBookings];
    setMyBookings(updatedBookings);
    try {
      localStorage.setItem('lk_hotel_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to persist bookings to local storage:', e);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = myBookings.filter(b => b.id !== bookingId);
    setMyBookings(updatedBookings);
    try {
      localStorage.setItem('lk_hotel_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to update local storage bookings:', e);
    }
  };

  const handleOpenBookingWithDefaults = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setInitialCheckIn(undefined);
    setInitialCheckOut(undefined);
    setInitialGuests(undefined);
    setBookingModalOpen(true);
  };

  // Triggered directly from Hero search widget
  const handleOpenBookingWithDetails = (details: {
    checkIn: string;
    checkOut: string;
    roomId: string;
    guestsCount: number;
  }) => {
    setSelectedRoomId(details.roomId);
    setInitialCheckIn(details.checkIn);
    setInitialCheckOut(details.checkOut);
    setInitialGuests(details.guestsCount);
    setBookingModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 transition-colors duration-500 ${
      theme === 'luxurious' ? 'bg-slate-950 text-slate-100' : 'bg-stone-50 text-stone-900'
    }`}>
      
      {/* Top sticky brand header */}
      <Header 
        theme={theme}
        onOpenBookingModal={handleOpenBookingWithDefaults} 
        myBookings={myBookings}
        onViewMyBookings={() => setMyBookingsModalOpen(true)}
      />

      {/* Main Single-Screen layouts content blocks */}
      <main className="flex-1">
        
        {/* HERO BANNER SECTION (Includes check availability widget) */}
        <Hero theme={theme} onOpenBookingWithDetails={handleOpenBookingWithDetails} />

        {/* ROOMS & ACCOMMODATIONS (SERVICES) SECTION */}
        <RoomsSection theme={theme} onOpenBookingModal={handleOpenBookingWithDefaults} />

        {/* CLUB CARTEL UPSCALE ON-SITE NIGHTLIFE SECTION */}
        <ClubCartelSection theme={theme} />

        {/* PROPERTY GALLERY SHOWCASE SECTION */}
        <GallerySection theme={theme} />

        {/* ABOUT US & RESORT AMENITIES SECTION */}
        <AboutSection theme={theme} />

        {/* TESTIMONIALS & REVIEWS SECTION */}
        <TestimonialsSection theme={theme} />

        {/* GEOLOCATION & CONTACT / FINAL CTA SECTION */}
        <LocationSection theme={theme} onOpenBookingModal={() => handleOpenBookingWithDefaults()} />

      </main>


      {/* LUXURIOUS HOTEL FOOTER */}
      <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 pt-16 pb-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-900">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-600 p-2 rounded text-white flex items-center justify-center">
                  <Hotel className="h-5 w-5" />
                </div>
                <span className="font-serif text-lg font-bold text-white tracking-wider">L&K HOTEL & SUITES</span>
              </div>
              
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-sm">
                A distinguished 4.5-star hotel residence delivering state-of-the-art hospitality, 24/7 dual generator electricity systems, and armed executive security details in Obalende, Ishara, Ogun State.
              </p>

              {/* Badges indicators */}
              <div className="flex items-center space-x-1.5 text-amber-500/80">
                {[1, 2, 3, 4].map(idx => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-500" />
                ))}
                <div className="relative h-3.5 w-3.5 text-amber-500">
                  <Star className="absolute h-3.5 w-3.5 fill-amber-500" />
                </div>
                <span className="text-[10px] font-mono font-bold text-stone-500 ml-1">4.5★ RATED</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3.5 text-sm">
              <h5 className="text-white font-mono uppercase text-xs font-bold tracking-widest text-stone-200">Suite Categories</h5>
              <ul className="space-y-2 text-stone-500 text-xs sm:text-sm">
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('rooms')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">Standard Executive Room</button></li>
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('rooms')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">Royal Deluxe Suite</button></li>
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('rooms')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">L&K Presidential Suite</button></li>
              </ul>
            </div>

            {/* Column 3: Corporate Contacts */}
            <div className="md:col-span-2 space-y-3.5 text-sm">
              <h5 className="text-white font-mono uppercase text-xs font-bold tracking-widest text-stone-200">Property Links</h5>
              <ul className="space-y-2 text-stone-500 text-xs sm:text-sm">
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('about')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">Amenities</button></li>
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('reviews')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">Guest Reviews</button></li>
                <li><button onClick={() => window.scrollTo({ top: document.getElementById('location')?.offsetTop, behavior: 'smooth' })} className="hover:text-amber-500 transition">Map & Location</button></li>
              </ul>
            </div>

            {/* Column 4: Contact Hotlines */}
            <div className="md:col-span-3 space-y-3.5 text-sm sm:text-right">
              <h5 className="text-white font-mono uppercase text-xs font-bold tracking-widest text-stone-200 sm:text-right">Enquiries Direct</h5>
              <div className="space-y-2 text-stone-500 text-xs sm:text-sm">
                <p className="flex items-center sm:justify-end">
                  <Phone className="h-3.5 w-3.5 text-amber-600 mr-2 shrink-0" />
                  <a href="tel:+2348123456789" className="hover:text-amber-500 transition">+234 (0) 81 2345 6789</a>
                </p>
                <p className="flex items-center sm:justify-end">
                  <Mail className="h-3.5 w-3.5 text-amber-600 mr-2 shrink-0" />
                  <a href="mailto:reservations@lkhotels.com" className="hover:text-amber-500 transition">reservations@lkhotels.com</a>
                </p>
                <p className="flex items-center sm:justify-end text-[11px] text-stone-600">
                  <MapPin className="h-3 w-3 mr-1.5" />
                  Obalende, Ishara, Ogun State.
                </p>
              </div>
            </div>

          </div>

          {/* Under footer trademark and micro disclaimer and legal statements */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-600 gap-4">
            
            <div className="flex items-center space-x-1 uppercase tracking-wider text-[10px] font-mono">
              <span>© {new Date().getFullYear()} L&K Hotel & Suites Ltd.</span>
              <span className="hidden sm:inline-block">•</span>
              <span>All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-1 font-mono text-[9px] uppercase tracking-widest text-amber-500 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              <span>Registered Hotel Uptime Guaranteed Uptime No. 44521</span>
            </div>

          </div>

        </div>
      </footer>

      {/* ACTIVE MODAL: BOOKING SYSTEM AND INVOICE CHECKOUT CONSOLE */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedRoomId={selectedRoomId}
        initialCheckIn={initialCheckIn}
        initialCheckOut={initialCheckOut}
        initialGuests={initialGuests}
        onConfirmBooking={handleConfirmNewBooking}
      />

      {/* ACTIVE MODAL: MY BOOKINGS DRAWER OR DIALOG VIEW */}
      <MyBookingsModal 
        isOpen={myBookingsModalOpen}
        onClose={() => setMyBookingsModalOpen(false)}
        bookings={myBookings}
        onCancelBooking={handleCancelBooking}
      />

    </div>
  );
}
