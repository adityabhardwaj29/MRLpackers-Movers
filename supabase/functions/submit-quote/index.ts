// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

// Allowed production and development origins
const allowedOrigins = [
  "https://mrl-packers-movers.vercel.app",
  "https://mrlpackersmovers.com",
  "https://www.mrlpackersmovers.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = allowedOrigins.includes(origin) ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// In-memory rate limiting map for edge function instance
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function escapeHtml(unsafe: string): string {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

declare const Deno: any;

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

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

    // 1. Rate Limiting Check (Max 15 requests per 10 minutes per IP)
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

    if (ipData.count > 15) {
      return new Response(
        JSON.stringify({ error: "Too many quote requests. Please try again in 10 minutes." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Detect if payload is from Supabase Database Webhook or Direct Client Invocation
    const isWebhook = Boolean(body.record && (body.type === "INSERT" || body.table));
    const record = isWebhook ? body.record : body;

    // 3. Extract & Sanitize fields
    const rawName = record.full_name || record.customer_name || record.name || "";
    const rawPhone = record.phone || record.mobile_number || record.mobile || "";
    const rawEmail = record.email || "";
    const rawPickup = record.pickup_location || record.pickup_address || record.pickup || "";
    const rawDrop = record.drop_location || record.drop_address || record.drop || "";
    const rawDate = record.moving_date || record.date || new Date().toISOString().split("T")[0];
    const rawTime = record.moving_time || record.time || "Morning (8 AM - 12 PM)";
    const rawService = record.service_type || record.service || "Household Shifting";
    const rawVehicle = record.vehicle_type || record.move_size || record.moveSize || "2BHK";
    const rawMessage = record.message || record.notes || record.additional_notes || "";
    const incomingQuoteId = record.quote_id || record.booking_ref;

    const sanitizedName = String(rawName).trim().slice(0, 100);
    const sanitizedPhone = String(rawPhone).replace(/[^\d+]/g, "").slice(0, 15);
    const sanitizedEmail = String(rawEmail).trim().slice(0, 100);
    const sanitizedPickup = String(rawPickup).trim().slice(0, 200);
    const sanitizedDrop = String(rawDrop).trim().slice(0, 200);
    const sanitizedDate = String(rawDate).slice(0, 10);
    const sanitizedTime = String(rawTime).slice(0, 50);
    const sanitizedService = String(rawService).slice(0, 100);
    const sanitizedVehicle = String(rawVehicle).slice(0, 50);
    const sanitizedMessage = String(rawMessage).trim().slice(0, 500);

    // Validation (for non-webhook direct requests)
    if (!isWebhook) {
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
    }

    // 4. Generate or use existing Quote ID
    const currentYear = new Date().getFullYear();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const quoteId = incomingQuoteId || `MRL-${currentYear}-${randomCode}`;

    // 5. If Direct Invocation (NOT a webhook), insert into database
    if (!isWebhook) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";

      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
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

        const { error: dbError } = await supabase.from("quote_requests").insert([dbPayload]);
        if (dbError) {
          console.warn("Direct insert to quote_requests warning:", dbError.message);
          // Fallback to bookings table
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
      }
    }

    // 6. Send HTML Escaped Email via Resend API
    let emailSent = false;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const recipientEmail = Deno.env.get("NOTIFICATION_EMAIL") || "mrlpackersmovers7777@gmail.com";
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "MRL Relocation <onboarding@resend.dev>";

    if (resendApiKey) {
      try {
        const emailSubject = `🚀 New Quote Request #${quoteId} - ${escapeHtml(sanitizedName)}`;
        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #dc2626; color: #ffffff; padding: 18px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">MRL PACKERS &amp; MOVERS</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.95;">New Shifting Inquiry / Quote Request</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; width: 35%; color: #64748b;">Quote ID:</td>
                <td style="padding: 10px 0; color: #dc2626; font-weight: 800; font-family: monospace; font-size: 15px;">${escapeHtml(quoteId)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Customer Name:</td>
                <td style="padding: 10px 0; font-weight: 700;">${escapeHtml(sanitizedName || "Customer")}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Mobile (WhatsApp):</td>
                <td style="padding: 10px 0;"><a href="tel:${escapeHtml(sanitizedPhone)}" style="color: #dc2626; font-weight: 700; text-decoration: none;">${escapeHtml(sanitizedPhone)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 10px 0;">${sanitizedEmail ? `<a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>` : "Not Provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Pickup Location:</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(sanitizedPickup)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Drop Location:</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(sanitizedDrop)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Moving Date &amp; Time:</td>
                <td style="padding: 10px 0;">${escapeHtml(sanitizedDate)} (${escapeHtml(sanitizedTime)})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Service &amp; Size:</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(sanitizedService)} - ${escapeHtml(sanitizedVehicle)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Notes / Details:</td>
                <td style="padding: 10px 0;">${escapeHtml(sanitizedMessage || "None")}</td>
              </tr>
            </table>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center;">
              <a href="https://wa.me/${sanitizedPhone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(sanitizedName)}%2C%20this%20is%20MRL%20Packers%20%26%20Movers%20regarding%20your%20quote%20request%20${encodeURIComponent(quoteId)}." style="background-color: #16a34a; color: #ffffff; padding: 12px 22px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 8px; font-size: 13px;">Chat on WhatsApp</a>
              <a href="tel:${escapeHtml(sanitizedPhone)}" style="background-color: #dc2626; color: #ffffff; padding: 12px 22px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 13px;">Call Customer</a>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 25px; margin-bottom: 0;">
              MRL Packers &amp; Movers • Kandivali East, Mumbai • 24/7 Helpline: 7777042041 / 8657972041
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
            from: fromEmail,
            to: [recipientEmail],
            subject: emailSubject,
            html: htmlBody,
          }),
        });

        if (emailRes.ok) {
          emailSent = true;
        } else {
          const errText = await emailRes.text().catch(() => "");
          console.warn("Resend API warning:", emailRes.status, errText);
        }
      } catch (err) {
        console.warn("Email dispatch warning:", err);
      }
    }

    // 7. Format Official WhatsApp Link (+91 77770 42041)
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
    console.error("Edge Function error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to submit your quote request at this moment. Please call our 24/7 helpline." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
