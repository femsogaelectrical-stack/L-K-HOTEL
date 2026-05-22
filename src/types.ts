/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DesignTheme = 'minimalist' | 'luxurious' | 'boutique';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: string;
  image: string;
  features: string[];
}

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  roomName: string;
  guestsCount: number;
  nightsCount: number;
  roomCost: number;
  addonsCost: number;
  taxCost: number;
  totalCost: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  addons: string[];
  specialRequests: string;
  createdAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  stayDate: string;
  stayType: string;
  location: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  perNight: boolean;
}
