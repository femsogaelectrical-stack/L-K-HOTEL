/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, Amenity, Review, Addon } from './types';

export const ROOMS: Room[] = [
  {
    id: 'standard-luxury',
    name: 'Standard Executive Room',
    description: 'A beautifully appointed sanctuary balancing business and relaxation. Designed for comfort with modern finishes, plush bedding, and an ambient work desk.',
    price: 35000,
    capacity: 2,
    size: '28 m²',
    image: 'https://images.unsplash.com/photo-1611891405120-449e7529a141?auto=format&fit=crop&q=80&w=800',
    features: [
      'Complimentary Ultra-Fast Wi-Fi',
      '24/7 Uninterrupted Power Supply',
      'Advanced Air Conditioning',
      'Smart TV with DSTV Premium',
      'Mini Fridge & Snack Bar',
      'Executive Working Desk'
    ]
  },
  {
    id: 'deluxe-suite',
    name: 'Royal Deluxe Suite',
    description: 'Indulge in extra space and luxury. The Deluxe Suite offers a separate semi-private sitting area, king-sized posturepedic mattress, and elegant local-art decor.',
    price: 55000,
    capacity: 2,
    size: '42 m²',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    features: [
      'All Standard Room Features',
      'Private Cozy Sitting Lounge',
      'Nespresso Coffee Maker',
      'Walk-in Rainfall Shower & Bath',
      'Complementary Welcome Fruit Basket',
      'Priority Room Service'
    ]
  },
  {
    id: 'executive-presidential-suite',
    name: 'L&K Presidential Ambassador Suite',
    description: 'Our ultimate luxury experience. Perfect for VIP travelers, corporate leaders, and families. Features a sprawling master bedroom, fully furnished living room, dining area, and panoramic hotel garden views.',
    price: 95000,
    capacity: 4,
    size: '78 m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    features: [
      'All Deluxe Suite Features',
      'Grand Furnished Sitting & Dining Hall',
      'Guest Restroom & Powder Room',
      'Dedicated Round-the-Clock Guest Ambassador',
      'VIP Airport Shuttle Privilege',
      'Premium Fully-Stocked Mini Bar Service'
    ]
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'power',
    name: '24/7 Guaranteed Power',
    description: 'Dual automated silent generator backup guarantees 100% electricity uptime, giving you uninterrupted comfort.',
    iconName: 'Zap'
  },
  {
    id: 'security',
    name: 'A-Grade Armed Security',
    description: '24/7 CCTV surveillance, biometric access controls, and fully vetted, expert guards for your ultimate tranquility.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'parking',
    name: 'Secure Courtyard Parking',
    description: 'A spacious, secure, gated and fully paved parking lot monitored continuously for guest convenience.',
    iconName: 'Car'
  },
  {
    id: 'dining',
    name: 'L&K Fine Dining Restaurant',
    description: 'Gourmet kitchen serving Nigerian classics (Jollof, Pepper Soup) and tailored international fusion by master chefs.',
    iconName: 'Utensils'
  },
  {
    id: 'lounge',
    name: 'Skyline Bar & Premium Lounge',
    description: 'Unwind with premium whiskeys, bespoke crafted cocktails, exotic wine cellars, and light plates in an upscale setting.',
    iconName: 'GlassWater'
  },
  {
    id: 'events',
    name: 'L&K Multi-Purpose Events Hall',
    description: 'Perfect for business conferences, intimate weddings, and social galas. Fully air-conditioned with sound systems.',
    iconName: 'CalendarRange'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Chief Adeleke O.',
    rating: 5,
    text: 'L&K Hotel exceeds standard hospitality in Ogun State. The security is top-notch, the premium lounge serves superb cocktails, and the 24/7 light means I worked uninterrupted. Truly 4.5 Stars!',
    stayDate: 'May 2026',
    stayType: 'Business Stay',
    location: 'Lagos, NG'
  },
  {
    id: 'rev-2',
    author: 'Sarah Jenkins',
    rating: 4.5,
    text: 'A hidden jewel in Ishara! Cleanliness is pristine, and the posturepedic bed felt incredible after a long journey. The staff went out of their way to prepare a custom menu. Safe parking was a huge plus!',
    stayDate: 'April 2026',
    stayType: 'Holiday Tour',
    location: 'London, UK'
  },
  {
    id: 'rev-3',
    author: 'Engr. Benson K.',
    rating: 5,
    text: 'I booked the Presidential Suite for an annual board meeting and executive retreat. Outstanding organization. High-speed Wi-Fi, great sound quality in the event spaces, and top-tier African dishes.',
    stayDate: 'March 2026',
    stayType: 'Executive Retreat',
    location: 'Abuja, NG'
  }
];

export const ADDONS: Addon[] = [
  {
    id: 'breakfast',
    name: 'Gourmet Buffet Breakfast',
    price: 6000,
    description: 'Daily hot buffet featuring local and continental dishes plus fresh juices & coffee.',
    perNight: true
  },
  {
    id: 'airport-pickup',
    name: 'VIP Executive Airport Pick-up / Drop',
    price: 35000,
    description: 'Premium air-conditioned sedan pick-up from Murtala Muhammed Airport straight to Ishara.',
    perNight: false
  },
  {
    id: 'laundry',
    name: 'Express Same-Day Laundry Service',
    price: 4500,
    description: 'Full washing, steam pressing, and hanger delivery of up to 4 garments daily.',
    perNight: true
  },
  {
    id: 'event-access',
    name: 'Executive Shared Boardroom Access',
    price: 15000,
    description: '2 hours of private booking in the boardroom with projection & soft beverages.',
    perNight: false
  }
];
