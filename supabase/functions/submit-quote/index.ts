// @ts-nocheck
// Allowed production and development origins
const allowedOrigins = [
  "https://www.mrlpackersandmovers.com",
  "https://mrlpackersandmovers.com",
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

    // 1. Rate Limiting Check (Max 30 requests per 10 minutes per IP)
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

    if (ipData.count > 30) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
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

    // 2. Extract record from Database Webhook (`body.record`) or Direct payload (`body`)
    const isWebhook = Boolean(body.record);
    const record = isWebhook ? body.record : body;

    console.log(`[submit-quote] Processing notification. Trigger: ${isWebhook ? 'SUPABASE_DATABASE_WEBHOOK' : 'DIRECT_INVOCATION'}`);

    // 3. Extract & Sanitize fields
    const rawName = record.full_name || record.customer_name || record.name || record.fullName || "Customer";
    const rawPhone = record.phone || record.mobile_number || record.mobile || record.phoneNumber || "";
    const rawEmail = record.email || "";
    const rawPickup = record.pickup_location || record.pickup_address || record.pickupLocation || record.pickup || "Not Provided";
    const rawDrop = record.drop_location || record.drop_address || record.dropLocation || record.drop || "Not Provided";
    const rawDate = record.moving_date || record.date || record.movingDate || new Date().toISOString().split("T")[0];
    const rawTime = record.moving_time || record.time || record.movingTime || "Morning (8 AM - 12 PM)";
    const rawService = record.service_type || record.service || record.serviceType || "Household Shifting";
    const rawVehicle = record.vehicle_type || record.vehicle || record.vehicleType || record.move_size || record.moveSize || "2BHK";
    const rawMessage = record.message || record.notes || record.additional_notes || record.additionalNotes || "";
    const incomingQuoteId = record.quote_id || record.booking_ref || record.quoteId;
    const submittedAt = record.created_at || new Date().toISOString();

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

    const currentYear = new Date().getFullYear();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const quoteId = incomingQuoteId || `MRL-${currentYear}-${randomCode}`;

    // NOTE: Edge Function is STRICTLY READ-ONLY for database.
    // It NEVER inserts into quote_requests or bookings to prevent recursive trigger loops.

    // 4. Send HTML Escaped Email via Resend API
    let emailSent = false;
    let emailMessageId = "";
    const rawResendKey = Deno.env.get("RESEND_API_KEY");
    const resendApiKey = rawResendKey ? rawResendKey.trim() : "";
    const recipientEmail = Deno.env.get("NOTIFICATION_EMAIL") || Deno.env.get("RESEND_TO_EMAIL") || "mrlpackersmovers7777@gmail.com";
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "MRL Relocation <onboarding@resend.dev>";

    if (resendApiKey) {
      try {
        const emailSubject = `New Booking Request - MRL Packers & Movers - ${quoteId}`;
        const htmlBody = `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px; background-color: #ffffff; color: #1e293b;">
            <div style="background-color: #dc2626; color: #ffffff; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px;">MRL PACKERS &amp; MOVERS</h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.95; font-weight: 600;">NEW BOOKING / QUOTE REQUEST</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; width: 38%; color: #64748b;">Quote ID:</td>
                <td style="padding: 11px 0; color: #dc2626; font-weight: 800; font-family: monospace; font-size: 16px;">${escapeHtml(quoteId)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Customer Name:</td>
                <td style="padding: 11px 0; font-weight: 700; font-size: 15px;">${escapeHtml(sanitizedName || "Customer")}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Phone:</td>
                <td style="padding: 11px 0;"><a href="tel:${escapeHtml(sanitizedPhone)}" style="color: #dc2626; font-weight: 700; text-decoration: none; font-size: 15px;">${escapeHtml(sanitizedPhone)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 11px 0;">${sanitizedEmail ? `<a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>` : "Not Provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Pickup Address:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedPickup)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Drop Address:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedDrop)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Moving Date:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedDate)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Moving Time:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedTime)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Service Type:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedService)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Vehicle Type / Move Size:</td>
                <td style="padding: 11px 0; font-weight: 600;">${escapeHtml(sanitizedVehicle)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 11px 0; font-weight: bold; color: #64748b; vertical-align: top;">Additional Notes:</td>
                <td style="padding: 11px 0;">${escapeHtml(sanitizedMessage || "None")}</td>
              </tr>
              <tr>
                <td style="padding: 11px 0; font-weight: bold; color: #64748b;">Submitted At:</td>
                <td style="padding: 11px 0; color: #64748b; font-size: 13px;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>

            <div style="margin-top: 26px; padding-top: 18px; border-top: 1px solid #e2e8f0; text-align: center;">
              <a href="https://wa.me/${sanitizedPhone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(sanitizedName)}%2C%20this%20is%20MRL%20Packers%20%26%20Movers%20regarding%20your%20quote%20request%20${encodeURIComponent(quoteId)}." style="background-color: #16a34a; color: #ffffff; padding: 13px 24px; text-decoration: none; border-radius: 9px; font-weight: bold; display: inline-block; margin-right: 10px; font-size: 14px;">Chat on WhatsApp</a>
              <a href="tel:${escapeHtml(sanitizedPhone)}" style="background-color: #dc2626; color: #ffffff; padding: 13px 24px; text-decoration: none; border-radius: 9px; font-weight: bold; display: inline-block; font-size: 14px;">Call Customer</a>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 28px; margin-bottom: 0;">
              MRL Packers &amp; Movers • Kandivali East, Mumbai • 24/7 Helpline: +91 77770 42041 / +91 86579 72041
            </p>
          </div>
        `;

        console.log(`[submit-quote] Dispatching Resend email from "${fromEmail}" to "${recipientEmail}" for Quote: ${quoteId}`);

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
          const resJson = await emailRes.json().catch(() => ({}));
          emailSent = true;
          emailMessageId = resJson.id || "sent";
          console.log(`[submit-quote] ✓ Resend email successfully delivered! ID: ${emailMessageId}`);
        } else {
          const errText = await emailRes.text().catch(() => "");
          console.error(`[submit-quote] ✗ Resend API returned error status ${emailRes.status}:`, errText);
        }
      } catch (err) {
        console.error("[submit-quote] ✗ Exception during Resend email dispatch:", err);
      }
    } else {
      console.warn("[submit-quote] ⚠️ RESEND_API_KEY secret is not set in Supabase Edge Function Secrets.");
    }

    // 5. Format Official WhatsApp Link (+91 77770 42041)
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
        message: "Your quote request has been processed.",
        email_sent: emailSent,
        email_id: emailMessageId || null,
        whatsapp_url: whatsappUrl,
        mode: isWebhook ? "webhook" : "direct",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[submit-quote] Edge Function unhandled error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to process quote request. Please call our 24/7 helpline." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
