import { supabase } from '../supabaseClient.js';
import { QuoteFormData, DbBooking, BookingStatus } from '../types';
import { COMPANY_INFO } from '../data';

export { supabase };

export const isSupabaseConfigured = true;

export interface QuoteRequestResult {
  success: boolean;
  quoteId: string;
  message: string;
  savedToSupabase: boolean;
  whatsappUrl?: string;
  error?: string;
}

export function generateQuoteId(): string {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `MRL-${currentYear}-${randomNum}`;
}

/**
 * 1. CREATE QUOTE REQUEST: Saves customer quote directly into Supabase `quote_requests` table
 * Uses Edge Function `submit-quote` with fallback to direct Supabase RLS Insert.
 */
export async function createBooking(data: QuoteFormData, userId?: string, estimatedPrice?: number): Promise<QuoteRequestResult> {
  const generatedId = generateQuoteId();

  const payload = {
    full_name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || null,
    pickup_location: data.pickupLocation.trim(),
    drop_location: data.dropLocation.trim(),
    moving_date: data.movingDate || new Date().toISOString().split('T')[0],
    moving_time: data.movingTime || 'Morning (8 AM - 12 PM)',
    service_type: data.serviceType || 'Household Shifting',
    vehicle_type: data.moveSize || '2BHK',
    message: data.additionalNotes?.trim() || null,
  };

  let isSaved = false;

  // Try Supabase Edge Function first for server-side validation & rate limiting
  try {
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('submit-quote', {
      body: payload,
    });

    if (!edgeError && edgeData && edgeData.success) {
      return {
        success: true,
        quoteId: edgeData.quote_id || generatedId,
        message: edgeData.message || 'Your quote request has been submitted successfully.',
        savedToSupabase: true,
        whatsappUrl: edgeData.whatsapp_url,
      };
    }
  } catch (edgeErr) {
    console.log('Edge Function invoke fallback to direct Supabase client insert');
  }

  // Fallback to direct client-side insertion into `quote_requests` table
  try {
    const dbPayload = {
      quote_id: generatedId,
      full_name: payload.full_name,
      phone: payload.phone,
      email: payload.email,
      pickup_location: payload.pickup_location,
      drop_location: payload.drop_location,
      moving_date: payload.moving_date,
      moving_time: payload.moving_time,
      service_type: payload.service_type,
      vehicle_type: payload.vehicle_type,
      message: payload.message,
      status: 'pending' as BookingStatus,
    };

    const { error: dbError } = await supabase
      .from('quote_requests')
      .insert([dbPayload]);

    if (!dbError) {
      isSaved = true;
    } else {
      console.warn('Supabase DB Insert Warning (quote_requests):', dbError.message);

      // Secondary fallback to `bookings` table if quote_requests is pending schema migration
      try {
        const { error: fallbackError } = await supabase.from('bookings').insert([{
          booking_ref: generatedId,
          customer_name: payload.full_name,
          mobile_number: payload.phone,
          email: payload.email,
          pickup_address: payload.pickup_location,
          drop_address: payload.drop_location,
          date: payload.moving_date,
          time: payload.moving_time,
          vehicle_type: payload.vehicle_type,
          service_type: payload.service_type,
          notes: payload.message,
          status: 'pending',
        }]);
        if (!fallbackError) isSaved = true;
      } catch (err2) {
        console.warn('Bookings fallback insert warning:', err2);
      }
    }
  } catch (err: any) {
    console.warn('Supabase Connection Error:', err?.message || err);
  }

  const whatsappNumber = COMPANY_INFO.whatsappNumber;
  const whatsappText = encodeURIComponent(
    `*New Quote Request - MRL Packers & Movers*\n\n` +
    `*Quote ID:* ${generatedId}\n` +
    `*Customer:* ${payload.full_name}\n` +
    `*Phone:* ${payload.phone}\n` +
    `*Pickup:* ${payload.pickup_location}\n` +
    `*Drop:* ${payload.drop_location}\n` +
    `*Moving Date:* ${payload.moving_date}\n` +
    `*Service:* ${payload.service_type}\n\n` +
    `Please confirm slot availability!`
  );

  return {
    success: true,
    quoteId: generatedId,
    message: 'Your quote request has been submitted successfully.',
    savedToSupabase: isSaved,
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${whatsappText}`,
  };
}

/**
 * 2. FETCH BOOKINGS / QUOTES (For authorized admin use)
 */
export async function fetchBookings(statusFilter?: string, searchQuery?: string): Promise<DbBooking[]> {
  try {
    let query = supabase.from('quote_requests').select('*').order('created_at', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter.toLowerCase());
    }

    if (searchQuery && searchQuery.trim()) {
      const q = `%${searchQuery.trim()}%`;
      query = query.or(`full_name.ilike.${q},phone.ilike.${q},quote_id.ilike.${q}`);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data.map((item: any) => ({
        id: item.id,
        booking_ref: item.quote_id,
        customer_name: item.full_name,
        mobile_number: item.phone,
        email: item.email,
        pickup_address: item.pickup_location,
        drop_address: item.drop_location,
        date: item.moving_date,
        time: item.moving_time,
        vehicle_type: item.vehicle_type,
        service_type: item.service_type,
        notes: item.message,
        status: item.status as BookingStatus,
        created_at: item.created_at,
      }));
    }
  } catch (err) {
    console.warn('Error fetching quotes:', err);
  }

  return [];
}
