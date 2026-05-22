/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Calendar, MapPin, Phone, Mail, FileCheck, Shield, Award, Trash2 } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function MyBookingsModal({ isOpen, onClose, bookings, onCancelBooking }: MyBookingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-stone-950 p-6 text-white border-b border-stone-800 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-600 p-2 rounded-lg text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-tight">Your Stored Reservations</h3>
              <p className="text-stone-400 text-xs font-mono tracking-wider">
                {bookings.length} {bookings.length === 1 ? 'ACTIVE BOOKING' : 'ACTIVE BOOKINGS'} FOR L&K HOTEL
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 bg-stone-900 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
            id="btn-close-my-bookings-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="bg-amber-100/50 text-amber-600 p-4 rounded-full max-w-max mx-auto">
                <Calendar className="h-8 w-8" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg">No Bookings Found</h4>
              <p className="text-stone-500 font-sans text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                You currently have no saved reservations with us. Explore our suites and check availability to secure your luxury break in Ishara!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-stone-50 p-6 rounded-xl border border-stone-200/80 shadow-sm space-y-4 relative overflow-hidden"
                >
                  
                  {/* Status Indicator */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ✓ Stored & Confirmed
                      </span>
                      <h4 className="text-stone-900 font-serif font-bold text-lg mt-2">{booking.roomName}</h4>
                      <p className="text-xs text-stone-400 font-mono mt-0.5">VOUCHER ID: <strong>{booking.id}</strong></p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this reservation? This cannot be undone.')) {
                          onCancelBooking(booking.id);
                        }
                      }}
                      className="text-stone-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition shrink-0 cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Booking details grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-sans text-stone-600 pt-2 border-t border-stone-200/50">
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-stone-400 font-bold mb-0.5">Guest Particulars:</span>
                      <strong className="text-stone-900">{booking.guestName}</strong>
                      <p className="text-xs text-stone-500 mt-0.5">{booking.phone}</p>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase font-mono text-stone-400 font-bold mb-0.5">Check-In / Out:</span>
                      <strong className="text-stone-900">{booking.checkIn}</strong> to <strong className="text-stone-900">{booking.checkOut}</strong>
                      <span className="block text-xs mt-0.5 text-stone-500">({booking.nightsCount} Nights Stay)</span>
                    </div>
                  </div>

                  {/* Addon lists if any */}
                  {booking.addons && booking.addons.length > 0 && (
                    <div className="text-xs pt-1">
                      <span className="block text-[10px] font-mono uppercase font-bold text-stone-400 mb-1">Addons:</span>
                      <div className="flex flex-wrap gap-1">
                        {booking.addons.map((a, i) => (
                          <span key={i} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-700 font-medium">
                            ✓ {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cost Summary block */}
                  <div className="pt-4 border-t border-stone-200/50 flex justify-between items-baseline">
                    <span className="text-xs font-mono text-stone-400 font-bold uppercase">Estimated Total Cost:</span>
                    <strong className="font-mono text-base text-amber-600">₦{booking.totalCost.toLocaleString()}</strong>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer info message */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 text-center shrink-0">
          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest flex items-center justify-center space-x-1">
            <Shield className="h-3.5 w-3.5 text-amber-600" />
            <span>Reservations are managed in local sandbox memory. Secure physical compliance.</span>
          </p>
        </div>

      </div>
    </div>
  );
}
