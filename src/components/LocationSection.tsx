/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Clock, HelpCircle, Navigation, Star, ArrowRight } from 'lucide-react';
import { DesignTheme } from '../types';

interface LocationSectionProps {
  onOpenBookingModal: () => void;
  theme: DesignTheme;
}

export default function LocationSection({ onOpenBookingModal, theme }: LocationSectionProps) {
  
  // Custom encoded Google Maps link for mobile directions
  const mapDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Obasanya+Onadeko+street+off+old+Ibadan+road+Obalende+Ishara+Ogun+State";

  const getThemeStyles = () => {
    switch (theme) {
      case 'minimalist':
        return {
          section: 'py-24 bg-white border-b border-stone-200 transition-colors duration-500',
          badge: 'bg-stone-50 border border-stone-200 rounded-none text-stone-900 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl font-sans font-light text-stone-900 tracking-tight leading-tight',
          bodyText: 'text-stone-600 font-sans text-sm sm:text-base leading-relaxed',
          card: 'bg-stone-50 p-5 rounded-none border border-stone-200 flex items-start space-x-4 shadow-none hover:border-stone-400 transition-all duration-300',
          cardIconBg: 'bg-stone-105/10 p-2.5 rounded-none text-stone-900 shrink-0 border border-stone-200',
          cardTitle: 'font-sans font-bold text-stone-900 text-xs uppercase tracking-wider',
          cardLink: 'inline-flex items-center text-xs font-bold text-stone-900 hover:text-stone-700 font-mono mt-3 uppercase tracking-wider underline underline-offset-4 decoration-stone-200',
          reserveBtn: 'w-full bg-stone-900 hover:bg-stone-850 active:bg-stone-950 text-white font-mono rounded-none uppercase text-xs tracking-wider py-4 px-8 shadow-none transition flex items-center justify-center space-x-2 mt-2 cursor-pointer',
          mapFrame: 'bg-white p-2 rounded-none border border-stone-200 overflow-hidden h-[450px]',
          mapGrayscale: 'w-full h-full grayscale hover:grayscale-0 transition-all duration-500 rounded-none',
          guideBox: 'p-4 bg-stone-50 border border-stone-200 rounded-none flex items-start space-x-3 text-stone-705 text-xs leading-relaxed font-sans'
        };
      case 'luxurious':
        return {
          section: 'py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-b border-slate-900 transition-colors duration-500',
          badge: 'bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 font-mono text-[9px] uppercase tracking-wider px-3 py-1',
          title: 'text-3xl sm:text-4xl font-serif text-white tracking-wide leading-tight',
          bodyText: 'text-slate-300 font-sans text-sm sm:text-base leading-relaxed',
          card: 'bg-[#0E1528] p-5 rounded-xl border border-slate-800 shadow-md flex items-start space-x-4 hover:border-amber-400/20 transition-all duration-300',
          cardIconBg: 'bg-amber-500/10 p-2.5 rounded-lg text-amber-400 shrink-0',
          cardTitle: 'font-sans font-semibold text-white text-xs uppercase tracking-wider',
          cardLink: 'inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-305 font-mono mt-3 uppercase tracking-wider',
          reserveBtn: 'w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-amber-500/15 transition flex items-center justify-center space-x-2 mt-2 cursor-pointer',
          mapFrame: 'bg-[#0E1528] p-2 rounded-xl shadow-2xl border border-slate-800 overflow-hidden h-[450px]',
          mapGrayscale: 'rounded-lg w-full h-full grayscale hover:grayscale-0 transition-all duration-500',
          guideBox: 'p-4 bg-[#0E1528] border border-slate-800 rounded-xl flex items-start space-x-3 text-slate-300 text-xs leading-relaxed font-sans'
        };
      case 'boutique':
      default:
        return {
          section: 'py-24 bg-[#FAF6F0] border-b border-[#E8E2D6] transition-colors duration-500',
          badge: 'bg-emerald-100/90 border border-emerald-800/15 rounded-xl text-emerald-850 font-mono text-[9px] uppercase tracking-widest px-3 py-1',
          title: 'text-3xl sm:text-4xl font-serif text-[#2E2A25] tracking-tight leading-tight',
          bodyText: 'text-[#5C5346] font-serif text-sm sm:text-base leading-relaxed',
          card: 'bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex items-start space-x-4 hover:shadow-md transition-all duration-300',
          cardIconBg: 'bg-[#FAF6F0] p-2.5 rounded-xl text-[#15803D] shrink-0 border border-amber-900/5',
          cardTitle: 'font-serif font-bold text-[#2E2A25] text-xs uppercase tracking-wider',
          cardLink: 'inline-flex items-center text-xs font-bold text-[#15803D] hover:text-emerald-700 font-serif mt-3 uppercase tracking-wider',
          reserveBtn: 'w-full bg-[#15803D] hover:bg-[#166534] active:bg-emerald-800 text-white font-serif font-medium py-4 px-8 rounded-xl shadow-md transition flex items-center justify-center space-x-2 mt-2 cursor-pointer',
          mapFrame: 'bg-white p-2 rounded-2xl shadow-md border border-amber-905/10 overflow-hidden h-[450px]',
          mapGrayscale: 'rounded-xl w-full h-full grayscale hover:grayscale-0 transition-all duration-500',
          guideBox: 'p-4 bg-white border border-amber-900/10 rounded-xl flex items-start space-x-3 text-[#5C5346] text-xs leading-relaxed font-serif'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <section id="location" className={`transition-all duration-500 ${s.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Address & Quick Guidance Details */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <div className={`inline-block ${s.badge}`}>
                Visit or Reach Us
              </div>
              
              <h2 className={s.title}>
                Perfect Location, Seamless Transit
              </h2>
              
              <p className={s.bodyText}>
                Nestled comfortably in the premium residential suburb of Obalende, Ishara, we provide a quiet oasis away from main transit noises while offering direct freeway connectivity.
              </p>
            </div>

            {/* Address cards */}
            <div className="space-y-4">
              
              {/* Card 1: Map Address details */}
              <div className={s.card}>
                <div className={s.cardIconBg}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className={s.cardTitle}>Hotel Residence Address</h4>
                  <p className={`${s.bodyText} mt-1`}>
                    Obasanya Onadeko Street,<br />
                    Off Old Ibadan Road, Obalende,<br />
                    Ishara, Ogun State.
                  </p>
                  <a 
                    href={mapDirectionsUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className={s.cardLink}
                  >
                    <Navigation className="h-3.5 w-3.5 mr-1" />
                    Get Mobile GPS Directions
                  </a>
                </div>
              </div>

              {/* Card 2: Phone & Mail contact details */}
              <div className={s.card}>
                <div className={s.cardIconBg}>
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className={s.cardTitle}>Reservations & Enquiries</h4>
                  
                  <div className={`mt-2 space-y-1.5 ${s.bodyText}`}>
                    <p className="flex items-center">
                      <strong className="text-stone-900 dark:text-white font-medium">Front Desk:</strong>&nbsp;
                      <a href="tel:+2348123456789" className="hover:text-amber-600 transition">+234 (0) 81 2345 6789</a>
                    </p>
                    <p className="flex items-center">
                      <strong className="text-stone-900 dark:text-white font-medium">Secondary Support:</strong>&nbsp;
                      <a href="tel:+2348012344321" className="hover:text-amber-600 transition">+234 (0) 80 1234 4321</a>
                    </p>
                    <p className="flex items-center pt-1 border-t border-stone-200/20 mt-2">
                      <Mail className="h-3.5 w-3.5 mr-1.5 text-stone-400" />
                      <a href="mailto:reservations@lkhotels.com" className="hover:text-amber-600 transition">reservations@lkhotels.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Arrival policies */}
              <div className={s.card}>
                <div className={s.cardIconBg}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className={s.cardTitle}>Check-in / Check-out Policies</h4>
                  <div className={`mt-2 space-y-1 text-xs ${s.bodyText} leading-relaxed`}>
                    <p>• <strong className="text-stone-900 dark:text-white font-semibold">Standard Check-In time:</strong> 2:00 PM (14:00 Hrs)</p>
                    <p>• <strong className="text-stone-900 dark:text-white font-semibold">Standard Check-Out time:</strong> 12:00 PM Noon (12:00 Hrs)</p>
                    <p>• Early check-in or late check-out is subject to room availability.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Reserve Button Widget */}
            <div className="pt-4">
              <button
                onClick={onOpenBookingModal}
                className={s.reserveBtn}
                id="btn-location-reserve-room"
              >
                <span>Reserve Your Room Direct</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Right Block: Embedded Google Map & Navigation guides */}
          <div className="lg:col-span-7 w-full space-y-4">
            
            {/* Map Frame Container */}
            <div className={s.mapFrame}>
              {/* Google Maps embedded frame */}
              <iframe
                title="L&K Hotel & Suites Map Destination"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.717651034293!2d3.682333!3d7.445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjYnNDIuMCJOIDPCsDQwJzU2LjQiRQ!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={s.mapGrayscale}
              ></iframe>
            </div>

            {/* Micro details indicator */}
            <div className={s.guideBox}>
              <HelpCircle className="h-5 w-5 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 dark:text-white block uppercase tracking-wider text-[10px] mb-0.5">Arriving by Road?</span>
                Take the Old Ibadan-Ogun Road exit toward Obalende/Ishara. Turn off onto Obasanya Onadeko Street. L&K Hotel is the grand gated property on your right side with the gold signboards and high-security guardhouse.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
