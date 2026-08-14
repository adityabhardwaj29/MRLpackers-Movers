import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

// CORS Headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory rate limiting map for edge function instance
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

declare const Deno: any;

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";

    // 1. Rate Limiting Check (Max 10 requests per 10 minutes per IP)
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const ipData = rateLimitMap.get(clientIp) || { count: 0, lastReset: now };

    if (now - ipData.lastReset > windowMs) {
      ipData.count = 1;
      ipData.lastReset = now;
    } else {
      ipData.count++;
    }
    rateLimitMap.set(clientIp, ipData);

    if (ipData.count > 10) {
      return new Response(
        JSON.stringify({ error: "Too many quote requests. Please try again in 10 minutes." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const {
      full_name,
      phone,
      email,
      pickup_location,
      drop_location,
      moving_date,
      moving_time,
      service_type,
      vehicle_type,
      message,
    } = body;

    // 2. Input Validation & Sanitization
    const sanitizedName = String(full_name || "").trim().slice(0, 100);
    const sanitizedPhone = String(phone || "").replace(/[^\d+]/g, "").slice(0, 15);
    const sanitizedEmail = String(email || "").trim().slice(0, 100);
    const sanitizedPickup = String(pickup_location || "").trim().slice(0, 200);
    const sanitizedDrop = String(drop_location || "").trim().slice(0, 200);
    const sanitizedDate = String(moving_date || new Date().toISOString().split("T")[0]).slice(0, 10);
    const sanitizedTime = String(moving_time || "Morning (8 AM - 12 PM)").slice(0, 50);
    const sanitizedService = String(service_type || "Household Shifting").slice(0, 100);
    const sanitizedVehicle = String(vehicle_type || "2BHK").slice(0, 50);
    const sanitizedMessage = String(message || "").trim().slice(0, 500);

    if (!sanitizedName || sanitizedName.length < 2) {
      return new Response(JSON.stringify({ error: "Full name is required (at least 2 characters)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!sanitizedPhone || sanitizedPhone.length < 10) {
      return new Response(JSON.stringify({ error: "Valid 10-digit mobile number is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return new Response(JSON.stringify({ error: "Invalid email address format." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!sanitizedPickup || !sanitizedDrop) {
      return new Response(JSON.stringify({ error: "Both pickup and drop locations are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Generate Unique Quote ID (e.g. MRL-2026-849201)
    const currentYear = new Date().getFullYear();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const quoteId = `MRL-${currentYear}-${randomCode}`;

    // 4. Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 5. Database Insertion into quote_requests
    const dbPayload = {
      quote_id: quoteId,
      full_name: sanitizedName,
      phone: sanitizedPhone,
      email: sanitizedEmail || null,
      pickup_location: sanitizedPickup,
      drop_location: sanitizedDrop,
      moving_date: sanitizedDate,
      moving_time: sanitizedTime,
      service_type: sanitizedService,
      vehicle_type: sanitizedVehicle,
      message: sanitizedMessage || null,
      status: "pending",
    };

    const { error: dbError } = await supabase
      .from("quote_requests")
      .insert([dbPayload]);

    if (dbError) {
      console.warn("Supabase quote_requests insert error, attempting bookings fallback:", dbError.message);
      // Fallback insert to bookings table if quote_requests schema was not applied
      try {
        await supabase.from("bookings").insert([{
          booking_ref: quoteId,
          customer_name: sanitizedName,
          mobile_number: sanitizedPhone,
          email: sanitizedEmail || null,
          pickup_address: sanitizedPickup,
          drop_address: sanitizedDrop,
          date: sanitizedDate,
          time: sanitizedTime,
          service_type: sanitizedService,
          vehicle_type: sanitizedVehicle,
          notes: sanitizedMessage || null,
          status: "pending",
        }]);
      } catch (fbErr) {
        console.error("Bookings fallback error:", fbErr);
      }
    }

    // 6. Automatic Email Notification (Recipient: mrlpackersmovers7777@gmail.com)
    let emailSent = false;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const emailSubject = `🚀 New Quote Request #${quoteId} - ${sanitizedName}`;
        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #dc2626; color: #ffffff; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: bold;">MRL PACKERS & MOVERS</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px;">New Shifting / Quote Inquiry Received</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; width: 35%;">Quote ID:</td>
                <td style="padding: 10px 0; color: #dc2626; font-weight: bold; font-family: monospace;">${quoteId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Customer Name:</td>
                <td style="padding: 10px 0;">${sanitizedName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Mobile (WhatsApp):</td>
                <td style="padding: 10px 0;"><a href="tel:${sanitizedPhone}" style="color: #dc2626; font-weight: bold; text-decoration: none;">${sanitizedPhone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;">${sanitizedEmail || "Not Provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Pickup Location:</td>
                <td style="padding: 10px 0;">${sanitizedPickup}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Drop Location:</td>
                <td style="padding: 10px 0;">${sanitizedDrop}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Moving Date & Time:</td>
                <td style="padding: 10px 0;">${sanitizedDate} (${sanitizedTime})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Service & Move Size:</td>
                <td style="padding: 10px 0;">${sanitizedService} - ${sanitizedVehicle}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Notes / Items:</td>
                <td style="padding: 10px 0;">${sanitizedMessage || "None"}</td>
              </tr>
            </table>

            <div style="margin-top: 25px; text-align: center;">
              <a href="https://wa.me/${sanitizedPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(sanitizedName)}%2C%20this%20is%20MRL%20Packers%20%26%20Movers%20regarding%20your%20quote%20request%20${quoteId}." style="background-color: #16a34a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 8px;">Reply on WhatsApp</a>
              <a href="tel:${sanitizedPhone}" style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Call Customer</a>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 25px;">
              MRL Packers & Movers • Kandivali East, Mumbai • 24/7 Helpline: 7777042041 / 8657972041
            </p>
          </div>
        `;

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MRL Relocation <onboarding@resend.dev>",
            to: ["mrlpackersmovers7777@gmail.com"],
            subject: emailSubject,
            html: htmlBody,
          }),
        });

        if (emailRes.ok) emailSent = true;
      } catch (err) {
        console.warn("Email dispatch warning (Data safely saved to database):", err);
      }
    }

    // 7. Format Official WhatsApp Pre-filled URL (MRL Desk: 917777042041)
    const whatsappNumber = "917777042041";
    const whatsappText = encodeURIComponent(
      `*New Quote Request - MRL Packers & Movers*\n\n` +
      `*Quote ID:* ${quoteId}\n` +
      `*Customer:* ${sanitizedName}\n` +
      `*Phone:* ${sanitizedPhone}\n` +
      `*Pickup:* ${sanitizedPickup}\n` +
      `*Drop:* ${sanitizedDrop}\n` +
      `*Moving Date:* ${sanitizedDate}\n` +
      `*Service:* ${sanitizedService} (${sanitizedVehicle})\n\n` +
      `Please confirm slot availability!`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

    // 8. Return Success JSON Response
    return new Response(
      JSON.stringify({
        success: true,
        quote_id: quoteId,
        message: "Your quote request has been submitted successfully.",
        email_sent: emailSent,
        whatsapp_url: whatsappUrl,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Unhandled Edge Function error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
