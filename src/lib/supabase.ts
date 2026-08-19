import { createClient } from '@supabase/supabase-js';
import { QuoteFormData, DbBooking, BookingStatus } from '../types';
import { COMPANY_INFO } from '../data';

const supabaseUrl =
  (typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  'https://fgjiztduqgoblwfwzpab.supabase.co';

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
 * 1. CREATE QUOTE REQUEST: Saves customer quote directly into Supabase PostgreSQL table `quote_requests`.
 * When inserted, the configured Supabase Database Webhook automatically triggers the `submit-quote` Edge Function.
 */
export async function createBooking(data: QuoteFormData, userId?: string, estimatedPrice?: number): Promise<QuoteRequestResult> {
  const generatedId = generateQuoteId();

  const dbPayload = {
    quote_id: generatedId,
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
    status: 'pending' as BookingStatus,
  };

  let isSaved = false;
  let saveErrorMessage = '';

  // Step 1: Direct Supabase PostgreSQL Insert into `quote_requests`
  try {
    const { error: dbError } = await supabase
      .from('quote_requests')
      .insert([dbPayload]);

    if (!dbError) {
      isSaved = true;
    } else {
      console.warn('Supabase DB Insert Warning (quote_requests):', dbError.message);
      saveErrorMessage = dbError.message;

      // Fallback insert to `bookings` table if schema is named bookings
      try {
        const { error: fallbackError } = await supabase.from('bookings').insert([{
          booking_ref: generatedId,
          customer_name: dbPayload.full_name,
          mobile_number: dbPayload.phone,
          email: dbPayload.email,
          pickup_address: dbPayload.pickup_location,
          drop_address: dbPayload.drop_location,
          date: dbPayload.moving_date,
          time: dbPayload.moving_time,
          vehicle_type: dbPayload.vehicle_type,
          service_type: dbPayload.service_type,
          notes: dbPayload.message,
          status: 'pending',
        }]);
        if (!fallbackError) {
          isSaved = true;
        }
      } catch (err2) {
        console.warn('Bookings fallback insert error:', err2);
      }
    }
  } catch (err: any) {
    console.error('Supabase Connection Error:', err?.message || err);
    saveErrorMessage = err?.message || 'Database connection error';
  }

  // Step 2: If direct database insert failed, fallback to Edge Function invocation
  if (!isSaved) {
    try {
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke('submit-quote', {
        body: dbPayload,
      });

      if (!edgeError && edgeData && edgeData.success) {
        isSaved = true;
      }
    } catch (edgeErr) {
      console.warn('Edge Function fallback error:', edgeErr);
    }
  }

  const whatsappNumber = COMPANY_INFO.whatsappNumber;
  const whatsappText = encodeURIComponent(
    `*New Quote Request - MRL Packers & Movers*\n\n` +
    `*Quote ID:* ${generatedId}\n` +
    `*Customer:* ${dbPayload.full_name}\n` +
    `*Phone:* ${dbPayload.phone}\n` +
    `*Pickup:* ${dbPayload.pickup_location}\n` +
    `*Drop:* ${dbPayload.drop_location}\n` +
    `*Moving Date:* ${dbPayload.moving_date}\n` +
    `*Service:* ${dbPayload.service_type} (${dbPayload.vehicle_type})\n\n` +
    `Please confirm slot availability!`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  if (isSaved) {
    return {
      success: true,
      quoteId: generatedId,
      message: 'Your quote request has been submitted successfully.',
      savedToSupabase: true,
      whatsappUrl,
    };
  } else {
    return {
      success: false,
      quoteId: generatedId,
      message: 'Unable to save your quote request to database. Please call our 24/7 helpline at +91 77770 42041.',
      savedToSupabase: false,
      whatsappUrl,
      error: saveErrorMessage || 'Failed to save booking into Supabase database.',
    };
  }
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
