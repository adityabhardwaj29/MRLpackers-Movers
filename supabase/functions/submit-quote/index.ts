import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting map for edge function instance
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

serve(async (req: Request) => {
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

    // 1. Rate Limiting Check (Max 5 requests per 10 minutes per IP)
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

    if (ipData.count > 5) {
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

    // 2. Server-Side Input Validation & Sanitization
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

    // 5. Database Insertion (Primary Source of Truth)
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

    const { data: dbResult, error: dbError } = await supabase
      .from("quote_requests")
      .insert([dbPayload])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase Database Insert Error:", dbError);
      return new Response(
        JSON.stringify({ error: "Database error saving quote request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 6. Email Notification Workflow (Primary Recipient: mrlpackersmovers7777@gmail.com)
    let emailSent = false;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const emailSubject = `New Quote Request - MRL Packers & Movers - ${sanitizedName}`;
        const emailBody = `MRL PACKERS & MOVERS
NEW QUOTE REQUEST

Quote ID: ${quoteId}
Customer: ${sanitizedName}
Phone: ${sanitizedPhone}
Email: ${sanitizedEmail || "N/A"}
Pickup: ${sanitizedPickup}
Drop: ${sanitizedDrop}
Moving Date: ${sanitizedDate}
Moving Time: ${sanitizedTime}
Service: ${sanitizedService}
Vehicle: ${sanitizedVehicle}
Additional Requirements: ${sanitizedMessage || "None"}
Submitted At: ${new Date().toISOString()}`;

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MRL Relocation <quotes@mrlpackersmovers.com>",
            to: ["mrlpackersmovers7777@gmail.com"],
            subject: emailSubject,
            text: emailBody,
          }),
        });

        if (emailRes.ok) emailSent = true;
      } catch (err) {
        console.warn("Email dispatch error (Database record preserved):", err);
      }
    }

    // 7. Format Official WhatsApp Click-to-Chat Link (MRL WhatsApp Number: 917777042041)
    const whatsappNumber = "917777042041";
    const whatsappText = encodeURIComponent(
      `*New Quote Request - MRL Packers & Movers*\n\n` +
      `*Quote ID:* ${quoteId}\n` +
      `*Customer:* ${sanitizedName}\n` +
      `*Phone:* ${sanitizedPhone}\n` +
      `*Pickup:* ${sanitizedPickup}\n` +
      `*Drop:* ${sanitizedDrop}\n` +
      `*Moving Date:* ${sanitizedDate}\n` +
      `*Service:* ${sanitizedService}\n\n` +
      `Please confirm slot availability!`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

    // 8. Return Success Response
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
