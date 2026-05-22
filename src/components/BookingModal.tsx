/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, Award, CheckCircle2, DollarSign, ArrowLeft, Printer, ShieldCheck, CreditCard, Sparkles, AlertTriangle } from 'lucide-react';
import { Room, Booking, Addon } from '../types';
import { ROOMS, ADDONS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onConfirmBooking: (booking: Booking) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onConfirmBooking
}: BookingModalProps) {
  
  // Progression steps: 'configure' | 'guest-details' | 'receipt'
  const [step, setStep] = useState<'configure' | 'guest-details' | 'receipt'>('configure');

  // Input states
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Guest Registration details
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Generated receipt states
  const [finalBooking, setFinalBooking] = useState<Booking | null>(null);
  
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize initial modal values from parents
  useEffect(() => {
    if (isOpen) {
      setRoomId(selectedRoomId || ROOMS[0].id);
      
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(today);
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      const formatDateString = (d: Date) => d.toISOString().split('T')[0];

      setCheckIn(initialCheckIn || formatDateString(tomorrow));
      setCheckOut(initialCheckOut || formatDateString(dayAfter));
      setGuestsCount(initialGuests || 2);
      
      // Reset details and progress steps on open
      setStep('configure');
      setSelectedAddons([]);
      setGuestName('');
      setEmail('');
      setPhone('');
      setSpecialRequests('');
      setFinalBooking(null);
      setErrorMsg('');
    }
  }, [isOpen, selectedRoomId, initialCheckIn, initialCheckOut, initialGuests]);

  if (!isOpen) return null;

  const currentRoom = ROOMS.find(r => r.id === roomId) || ROOMS[0];

  // Price Calculation Helpers
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = outDate.getTime() - inDate.getTime();
  const nightsCount = isNaN(diffTime) || diffTime <= 0 ? 1 : Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const roomCostTotal = currentRoom.price * nightsCount;
  
  const addonsCostTotal = selectedAddons.reduce((sum, addonId) => {
    const addonObj = ADDONS.find(a => a.id === addonId);
    if (!addonObj) return sum;
    return sum + (addonObj.perNight ? (addonObj.price * nightsCount) : addonObj.price);
  }, 0);

  const rawSubtotal = roomCostTotal + addonsCostTotal;
  const taxCostTotal = Math.round(rawSubtotal * 0.075); // 7.5% VAT
  const serviceCharge = Math.round(rawSubtotal * 0.05); // 5.0% Service Charge
  const absoluteTotal = rawSubtotal + taxCostTotal + serviceCharge;

  const handleToggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleValidationStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inD = new Date(checkIn);
    const outD = new Date(checkOut);

    if (isNaN(inD.getTime()) || isNaN(outD.getTime())) {
      setErrorMsg('Please select valid calendar dates.');
      return;
    }

    if (inD >= outD) {
      setErrorMsg('Check-out date must be securely after check-in date.');
      return;
    }

    // Procced to guest form info
    setStep('guest-details');
  };

  const handleFinalBookingSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!guestName.trim()) {
      setErrorMsg('Full guest name is required to secure room.');
      return;
    }
    if (!phone.replace(/\D/g, '').trim()) {
      setErrorMsg('Valid mobile phone number is required for support & directions.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Valid email address is required to deliver voucher receipt.');
      return;
    }

    // Generate complete reservation
    const bookingCode = `LK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newBooking: Booking = {
      id: bookingCode,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      guestsCount,
      nightsCount,
      roomCost: roomCostTotal,
      addonsCost: addonsCostTotal,
      taxCost: taxCostTotal + serviceCharge,
      totalCost: absoluteTotal,
      status: 'Confirmed',
      addons: selectedAddons.map(aid => ADDONS.find(a => a.id === aid)?.name || aid),
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString()
    };

    // Commit to state & persistence
    onConfirmBooking(newBooking);
    setFinalBooking(newBooking);
    setStep('receipt');
  };

  const triggerMockPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Modal Card frame */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top header banner */}
        <div className="bg-stone-950 p-6 text-white border-b border-stone-800 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-600 p-2 rounded-lg text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-tight">
                {step === 'receipt' ? 'Stay Confirmed • Official Voucher' : 'Direct Booking Registrar'}
              </h3>
              <p className="text-stone-400 text-xs font-mono tracking-wider">
                {step === 'configure' && 'STEP 1: CUSTOMIZE YOUR STAY & RATES'}
                {step === 'guest-details' && 'STEP 2: ENROLL GUEST PARTICULARS'}
                {step === 'receipt' && 'RESERVATION RECEIPT SECURELY STORED'}
              </p>
            </div>
          </div>
          
          {step !== 'receipt' && (
            <button 
              onClick={onClose}
              className="p-1.5 bg-stone-900 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
              id="btn-close-booking-modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Modal Outer Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* STEP 1: CONFIGURE ARRIVALS & PREMIUM ADDONS */}
          {step === 'configure' && (
            <form onSubmit={handleValidationStep1} className="space-y-8">
              
              {/* Top Warning regarding capacity matching */}
              {guestsCount > currentRoom.capacity && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-stone-700 text-xs flex items-center space-x-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                  <span>
                    Note: Your selected room category holds a maximum of {currentRoom.capacity} {currentRoom.capacity === 1 ? 'guest' : 'guests'}. You currently selected {guestsCount} guests.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Inputs Config left-side */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <h4 className="text-xs font-mono font-extrabold uppercase text-stone-400 tracking-wider flex items-center">
                    <span className="bg-amber-100 text-amber-800 h-5 w-5 rounded-full flex items-center justify-center mr-2 text-[11px]">1</span>
                    Reservation Duration & Occupancy
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-check-in" className="block text-xs font-sans font-bold text-stone-700">Check-in Date</label>
                      <input
                        id="modal-check-in"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="modal-check-out" className="block text-xs font-sans font-bold text-stone-700">Check-out Date</label>
                      <input
                        id="modal-check-out"
                        type="date"
                        value={checkOut}
                        disabled={!checkIn}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-room-select" className="block text-xs font-sans font-bold text-stone-700">Room Category</label>
                      <select
                        id="modal-room-select"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none"
                      >
                        {ROOMS.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-guests-select" className="block text-xs font-sans font-bold text-stone-700">Guests</label>
                      <select
                        id="modal-guests-select"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-6">
                    <h4 className="text-xs font-mono font-extrabold uppercase text-stone-400 tracking-wider mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 h-5 w-5 rounded-full flex items-center justify-center mr-2 text-[11px]">2</span>
                      Enhance Comfort — Premium Add-ons
                    </h4>

                    <div className="space-y-3">
                      {ADDONS.map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                          <div 
                            key={addon.id}
                            onClick={() => handleToggleAddon(addon.id)}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start justify-between ${
                              isSelected 
                                ? 'bg-amber-50/70 border-amber-500 shadow-sm' 
                                : 'bg-white border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-start space-x-3 pr-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // Swallowed, handled by parent div click
                                className="mt-1 h-4 w-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                              />
                              <div>
                                <span className="block text-stone-900 font-sans font-semibold text-xs sm:text-sm">
                                  {addon.name}
                                </span>
                                <p className="text-stone-500 text-[11px] mt-0.5 leading-tight">
                                  {addon.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right shrink-0">
                              <span className="block font-mono text-xs font-bold text-stone-900">
                                ₦{addon.price.toLocaleString()}
                              </span>
                              <span className="block text-[10px] text-stone-400 font-mono">
                                {addon.perNight ? 'per Night' : 'per Stay'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Rates Breakdown Sidebar, right-side */}
                <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-stone-900 font-serif font-bold text-lg mb-4 flex items-center justify-between">
                      <span>Rates Breakdown</span>
                      <small className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">
                        {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
                      </small>
                    </h4>

                    {/* Room rates cost */}
                    <div className="space-y-3.5 text-sm text-stone-600 font-sans">
                      
                      <div className="flex justify-between items-start">
                        <div className="max-w-[70%]">
                          <span className="block font-bold text-stone-900">{currentRoom.name}</span>
                          <span className="text-xs text-stone-400 font-mono">₦{currentRoom.price.toLocaleString()} x {nightsCount} nights</span>
                        </div>
                        <span className="font-mono font-semibold text-stone-900">₦{roomCostTotal.toLocaleString()}</span>
                      </div>

                      {/* Addon details display list inside breakdown */}
                      {selectedAddons.length > 0 && (
                        <div className="border-t border-stone-200 pt-3.5 space-y-2">
                          <span className="block text-[10px] font-mono uppercase font-bold text-stone-400 tracking-wider">Premium Addons:</span>
                          {selectedAddons.map(aid => {
                            const add = ADDONS.find(a => a.id === aid)!;
                            const cost = add.perNight ? (add.price * nightsCount) : add.price;
                            return (
                              <div key={aid} className="flex justify-between text-xs">
                                <span className="text-stone-700 font-medium">• {add.name}</span>
                                <span className="font-mono text-stone-900">₦{cost.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Tax & Services */}
                      <div className="border-t border-stone-200 pt-3.5 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Government VAT Tax (7.5%)</span>
                          <span className="font-mono">₦{taxCostTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">L&K Executive Service Charge (5.0%)</span>
                          <span className="font-mono">₦{serviceCharge.toLocaleString()}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Absolute Total and Form action button */}
                  <div className="pt-6 border-t border-stone-200 mt-6 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-stone-900 font-serif font-bold text-base">Estimated Total:</span>
                      <div className="text-right">
                        <span className="block font-mono text-2xl font-black text-amber-600 leading-none">
                          ₦{absoluteTotal.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">Rates are in Nigerian Naira</span>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-md active:shadow-sm"
                      id="btn-modal-to-step2"
                    >
                      Process Stay Details
                    </button>
                  </div>

                </div>

              </div>
            </form>
          )}

          {/* STEP 2: ENTER GUEST CONTACT DETAILS & SIGN REGISTRY */}
          {step === 'guest-details' && (
            <form onSubmit={handleFinalBookingSubmission} className="space-y-6">
              
              <div className="max-w-xl mx-auto space-y-6 bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-sm">
                
                <div className="text-center mb-6">
                  <h4 className="font-serif font-bold text-xl text-stone-900">Sign L&K Guest Registry</h4>
                  <p className="text-xs text-stone-500 font-sans mt-1">
                    Your details are securely transmitted directly to the Front Desk at Obalende, Ishara.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label htmlFor="guest-full-name" className="block text-xs font-bold text-stone-700 flex items-center">
                      <User className="h-3.5 w-3.5 text-amber-600 mr-2" />
                      Guest Full Name <span className="text-red-500">&nbsp;*</span>
                    </label>
                    <input
                      id="guest-full-name"
                      type="text"
                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                      placeholder="e.g. Chief Samuel Adebayo"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="guest-phone" className="block text-xs font-bold text-stone-700 flex items-center">
                        <Phone className="h-3.5 w-3.5 text-amber-600 mr-2" />
                        Active Mobile Phone <span className="text-red-500">&nbsp;*</span>
                      </label>
                      <input
                        id="guest-phone"
                        type="tel"
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                        placeholder="e.g. +234 80 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="guest-email" className="block text-xs font-bold text-stone-700 flex items-center">
                        <Mail className="h-3.5 w-3.5 text-amber-600 mr-2" />
                        Email Address <span className="text-red-500">&nbsp;*</span>
                      </label>
                      <input
                        id="guest-email"
                        type="email"
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                        placeholder="e.g. samuel@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="guest-requests" className="block text-xs font-bold text-stone-700">Special requests / Meal Preferences / Estimated Arrival Time</label>
                    <textarea
                      id="guest-requests"
                      rows={3}
                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                      placeholder="e.g. Requesting a quiet room, late check-in at 8 PM, or airport shuttle details."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    ></textarea>
                  </div>

                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600 mt-3">
                    {errorMsg}
                  </div>
                )}

                {/* Actions: Confirm or Back */}
                <div className="pt-6 border-t border-stone-200 mt-6 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('configure')}
                    className="flex items-center text-sm font-semibold text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-200 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                    Back to Selection
                  </button>

                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-md active:shadow-sm"
                    id="btn-confirm-stay-final"
                  >
                    Confirm Stay & Generate Receipt
                  </button>
                </div>

              </div>

            </form>
          )}

          {/* STEP 3: CONFIRMED RESERVATION VOUCHER / RECEIPT */}
          {step === 'receipt' && finalBooking && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Receipt Visual Invoice */}
              <div 
                id="printable-voucher-zone" 
                className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-6 sm:p-10 shadow-lg text-stone-900 grid grid-cols-1 relative overflow-hidden"
              >
                
                {/* Visual Accent Badge */}
                <div className="absolute top-0 right-0 bg-amber-600 text-white font-mono text-[9px] uppercase font-bold tracking-widest py-1.5 px-6 rounded-bl-xl shadow flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  GUEST VIP VOUCHER
                </div>

                {/* Voucher Header Invoice Style */}
                <div className="text-center border-b border-stone-200 pb-6 mb-6">
                  <div className="flex justify-center items-center mb-2">
                    <span className="font-serif text-2xl font-black text-stone-900 tracking-tight leading-none">
                      L&K HOTEL & SUITES
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest font-semibold block">
                    OBALENDE, ISHARA ROAD, OGUN STATE, NIGERIA
                  </span>
                  
                  <div className="mt-4 flex flex-col sm:flex-row justify-center items-center sm:space-x-6 text-xs text-stone-500 font-mono">
                    <span>VOUCHER ID: <strong className="text-stone-900">{finalBooking.id}</strong></span>
                    <span className="hidden sm:inline-block text-stone-300">•</span>
                    <span>ISSUED ON: <strong>{new Date(finalBooking.createdAt).toLocaleDateString()}</strong></span>
                  </div>
                </div>

                {/* Details list grid */}
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-1">REGISTERED GUEST</span>
                      <strong className="text-stone-900 block text-base leading-tight">{finalBooking.guestName}</strong>
                      <span className="block text-stone-500 font-sans mt-1 text-xs">{finalBooking.phone}</span>
                      <span className="block text-stone-500 font-sans text-xs">{finalBooking.email}</span>
                    </div>

                    <div className="sm:text-right">
                      <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-1">ACCOMMODATION</span>
                      <strong className="text-stone-900 block text-base leading-tight">{finalBooking.roomName}</strong>
                      <span className="block text-amber-600 font-mono mt-1 text-xs font-bold uppercase tracking-wide">
                        {finalBooking.guestsCount} {finalBooking.guestsCount === 1 ? 'Guest' : 'Guests'} max Capacity
                      </span>
                    </div>
                  </div>

                  {/* Dates breakdown block */}
                  <div className="bg-stone-50 rounded-xl p-4 grid grid-cols-3 gap-4 border border-stone-100 text-center text-sm shrink-0">
                    <div className="border-r border-stone-200 pr-2">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-0.5">CHECK-IN</span>
                      <strong className="text-stone-900 font-sans">{finalBooking.checkIn}</strong>
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">From 2:00 PM</p>
                    </div>

                    <div className="border-r border-stone-200 px-2">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-0.5">CHECK-OUT</span>
                      <strong className="text-stone-900 font-sans">{finalBooking.checkOut}</strong>
                      <p className="text-[10px] text-stone-400 font-sans mt-0.5">By 12:00 PM Noon</p>
                    </div>

                    <div className="pl-2">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-0.5">DURATION</span>
                      <strong className="text-stone-900 font-sans">{finalBooking.nightsCount} Nights</strong>
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">Stored & Guaranteed</p>
                    </div>
                  </div>

                  {/* Addon lists */}
                  {finalBooking.addons && finalBooking.addons.length > 0 && (
                    <div>
                      <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-2">ADDITIONAL CLUB PRIVILEGES</span>
                      <div className="flex flex-wrap gap-1.5">
                        {finalBooking.addons.map((a, i) => (
                          <span key={i} className="bg-amber-50 text-amber-800 text-xs font-sans font-semibold border border-amber-200/50 py-1 px-2.5 rounded-lg">
                            ✓ {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Request */}
                  {finalBooking.specialRequests && (
                    <div className="text-xs bg-stone-50 p-3 rounded-lg border border-stone-200/50">
                      <span className="block font-bold text-stone-700 uppercase tracking-wider text-[9px] mb-1">Special requests & notes:</span>
                      <p className="text-stone-600 leading-normal italic">"{finalBooking.specialRequests}"</p>
                    </div>
                  )}

                  {/* Interactive QR code simulation */}
                  <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="bg-stone-50 p-3 border border-stone-200 rounded-xl flex items-center justify-center shrink-0">
                      {/* SVG representation of standard QR Code */}
                      <svg width="68" height="68" viewBox="0 0 68 68" className="text-stone-900">
                        {/* Outlines of a standard QR code */}
                        <rect x="0" y="0" width="16" height="16" fill="currentColor" />
                        <rect x="2" y="2" width="12" height="12" fill="white" />
                        <rect x="4" y="4" width="8" height="8" fill="currentColor" />

                        <rect x="52" y="0" width="16" height="16" fill="currentColor" />
                        <rect x="54" y="2" width="12" height="12" fill="white" />
                        <rect x="56" y="4" width="8" height="8" fill="currentColor" />

                        <rect x="0" y="52" width="16" height="16" fill="currentColor" />
                        <rect x="2" y="54" width="12" height="12" fill="white" />
                        <rect x="4" y="56" width="8" height="8" fill="currentColor" />

                        <rect x="24" y="24" width="20" height="20" fill="currentColor" />
                        <rect x="28" y="28" width="12" height="12" fill="white" />
                        <rect x="32" y="32" width="4" height="4" fill="currentColor" />

                        {/* Noise bits */}
                        <rect x="22" y="0" width="4" height="4" fill="currentColor" />
                        <rect x="32" y="6" width="4" height="4" fill="currentColor" />
                        <rect x="18" y="14" width="4" height="4" fill="currentColor" />
                        <rect x="44" y="10" width="4" height="4" fill="currentColor" />
                        
                        <rect x="0" y="22" width="4" height="4" fill="currentColor" />
                        <rect x="10" y="30" width="4" height="4" fill="currentColor" />
                        <rect x="14" y="40" width="4" height="4" fill="currentColor" />

                        <rect x="52" y="24" width="4" height="4" fill="currentColor" />
                        <rect x="64" y="32" width="4" height="4" fill="currentColor" />
                        <rect x="58" y="44" width="4" height="4" fill="currentColor" />

                        <rect x="24" y="52" width="4" height="4" fill="currentColor" />
                        <rect x="36" y="62" width="4" height="4" fill="currentColor" />
                        <rect x="46" y="56" width="4" height="4" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="flex-1 space-y-1 text-center sm:text-right">
                      <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">TOTAL RESERVATION COST</span>
                      <strong className="text-2xl font-mono text-amber-600 block leading-tight">
                        ₦{finalBooking.totalCost.toLocaleString()}
                      </strong>
                      <span className="block text-[10px] font-sans text-stone-500">
                        Paid / Confirmed Guarantee (GST & VAT Uptime Included)
                      </span>
                    </div>
                  </div>

                </div>

                {/* Secure checks disclaimer */}
                <div className="border-t border-stone-100 pt-4 mt-6 text-[10px] font-sans text-stone-400 text-center uppercase tracking-wider flex items-center justify-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Secure 4.5-Star Hospitality Guarantee. Bring voucher to Front Desk. </span>
                </div>

              </div>

              {/* Outside Action Triggers after complete Stay booking */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={triggerMockPrint}
                  className="bg-stone-900 text-white hover:bg-stone-800 font-sans font-bold text-xs py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-1.5 uppercase tracking-wider cursor-pointer"
                  id="btn-print-voucher"
                >
                  <Printer className="h-4 w-4 text-amber-500" />
                  <span>Log Voucher Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-xs py-3 px-8 rounded-lg transition shadow-sm uppercase tracking-wider cursor-pointer"
                  id="btn-close-and-return-home"
                >
                  Return to Home
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
