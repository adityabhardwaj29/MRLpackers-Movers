export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'packing' | 'vehicle' | 'storage';
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  startingPrice: string;
  popular?: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  moveType: '1BHK' | '2BHK' | '3BHK' | 'Villa / 4BHK' | 'Vehicle Transport';
  startingPrice: number;
  originalPrice: number;
  discountBadge: string;
  crewCount: string;
  packingMaterials: string;
  truckType: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  moveType: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Household' | 'Packing' | 'Vehicles' | 'Office' | 'Warehouse';
  imageUrl: string;
  tag: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  dropLocation: string;
  serviceType: string;
  moveSize: string;
  movingDate: string;
  movingTime?: string;
  packingTier?: string;
  additionalNotes?: string;
}

export interface PriceEstimateResult {
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  breakdown: {
    baseRate: number;
    distanceCharge: number;
    floorSurCharge: number;
    packingQuality: string;
    discountPercentage: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface DbProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface DbBooking {
  id: string;
  booking_ref?: string;
  user_id?: string;
  customer_name: string;
  mobile_number: string;
  email?: string;
  pickup_address: string;
  drop_address: string;
  date: string;
  time?: string;
  vehicle_type?: string;
  service_type: string;
  notes?: string;
  estimated_price?: number;
  status: BookingStatus;
  created_at: string;
}

