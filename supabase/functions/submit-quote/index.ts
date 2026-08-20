// Supabase Edge Function: submit-quote (Notification Only)
// Target: Production MRL Packers & Movers
// Purpose: Receive validated Database Webhook events on quote_requests INSERT and dispatch Resend email notifications.

interface WebhookRecord {
  id?: string;
  quote_id?: string;
  booking_ref?: string;
  full_name?: string;
  customer_name?: string;
  name?: string;
  phone?: string;
  mobile_number?: string;
  mobile?: string;
  email?: string | null;
  pickup_location?: string;
  pickup_address?: string;
  drop_location?: string;
  drop_address?: string;
  moving_date?: string;
  date?: string;
  moving_time?: string;
  time?: string;
  service_type?: string;
  vehicle_type?: string;
  move_size?: string;
  message?: string | null;
  notes?: string | null;
  status?: string;
  created_at?: string;
}

interface WebhookPayload {
  type?: string;
  table?: string;
  schema?: string;
  record?: WebhookRecord;
  old_record?: WebhookRecord | null;
}

// Strict Allowed Production & Development Origins for CORS
const ALLOWED_ORIGINS: readonly string[] = [
  "https://www.mrlpackersandmovers.com",
  "https://mrlpackersandmovers.com",
  "https://mrl-packers-movers.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (isAllowed) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

// Idempotency: Processed Quote IDs tracking set (15-minute sliding window)
interface IdempotencyEntry {
  quoteId: string;
  timestamp: number;
}
const processedEventsCache = new Map<string, number>();

function isDuplicateEvent(quoteId: string): boolean {
  if (!quoteId) return false;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes

  // Cleanup old entries
  for (const [id, time] of processedEventsCache.entries()) {
    if (now - time > windowMs) {
      processedEventsCache.delete(id);
    }
  }

  if (processedEventsCache.has(quoteId)) {
    return true;
  }

  processedEventsCache.set(quoteId, now);
  return false;
}

// HTML entity escaping to prevent email HTML injection / XSS
function escapeHtml(unsafe: string | null | undefined): string {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

declare const Deno: {
  serve: (handler: (req: Request) => Promise<Response>) => void;
  env: {
    get: (key: string) => string | undefined;
  };
};

Deno.serve(async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // 2. Reject Non-POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Only POST is accepted." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // 3. Webhook Authentication Validation (Optional Header Secret check if configured)
    const configuredWebhookSecret = Deno.env.get("WEBHOOK_SECRET");
    if (configuredWebhookSecret) {
      const incomingSecret =
        req.headers.get("x-webhook-secret") ||
        req.headers.get("authorization")?.replace("Bearer ", "") ||
        "";

      if (incomingSecret !== configuredWebhookSecret) {
        console.warn("[submit-quote] Unauthorized webhook request: Invalid secret token.");
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid webhook secret token." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 4. Parse JSON Payload
    const body: WebhookPayload & WebhookRecord = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid JSON body format." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. Extract Database Record
    // Webhooks send { type: "INSERT", table: "quote_requests", record: { ... } }
    const record: WebhookRecord = body.record || body;

    // Validate that we have a record to process
    if (!record || typeof record !== "object") {
      return new Response(JSON.stringify({ error: "Missing quote record payload." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 6. Extract & Sanitize fields from existing database record (Source of Truth)
    const rawQuoteId = record.quote_id || record.booking_ref || record.id || "";
    const rawName = record.full_name || record.customer_name || record.name || "";
    const rawPhone = record.phone || record.mobile_number || record.mobile || "";
    const rawEmail = record.email || "";
    const rawPickup = record.pickup_location || record.pickup_address || "";
    const rawDrop = record.drop_location || record.drop_address || "";
    const rawDate = record.moving_date || record.date || "";
    const rawTime = record.moving_time || record.time || "Morning (8 AM - 12 PM)";
    const rawService = record.service_type || "Household Shifting";
    const rawVehicle = record.vehicle_type || record.move_size || "2BHK";
    const rawMessage = record.message || record.notes || "";
    const rawSubmittedAt = record.created_at || new Date().toISOString();

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
    const quoteId = String(rawQuoteId).trim() || "MRL-QUOTE";

    // 7. Input Validation: Ensure minimum required customer data exists
    if (!sanitizedName || sanitizedName.length < 2) {
      console.warn("[submit-quote] Dropped empty or invalid quote record: Missing customer name.");
      return new Response(JSON.stringify({ error: "Invalid customer name in record." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!sanitizedPhone || sanitizedPhone.replace(/[^\d]/g, "").length < 10) {
      console.warn("[submit-quote] Dropped quote record: Missing valid 10-digit mobile number.");
      return new Response(JSON.stringify({ error: "Invalid mobile number in record." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 8. Idempotency Check: Prevent duplicate email dispatches for the same quote record
    if (isDuplicateEvent(quoteId)) {
      console.log(`[submit-quote] Idempotency: Event for Quote ID "${quoteId}" was already processed. Skipping duplicate email.`);
      return new Response(
        JSON.stringify({
          success: true,
          quote_id: quoteId,
          message: "Quote event already processed (idempotent).",
          already_processed: true,
          email_sent: true,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // =========================================================================
    // CRITICAL DATABASE SAFETY RULE:
    // This Edge Function is strictly NOTIFICATION-ONLY.
    // It NEVER executes an INSERT / UPDATE / DELETE into quote_requests or bookings.
    // =========================================================================

    // 9. Dispatch HTML Email via Resend API
    let emailSent = false;
    let emailMessageId = "";
    let resendErrorDetail = "";

    const rawResendKey = Deno.env.get("RESEND_API_KEY");
    const resendApiKey = rawResendKey ? rawResendKey.trim() : "";
    const recipientEmail = Deno.env.get("NOTIFICATION_EMAIL") || Deno.env.get("RESEND_TO_EMAIL") || "mrlpackersmovers7777@gmail.com";
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "MRL Packers & Movers <onboarding@resend.dev>";

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
                <td style="padding: 11px 0; font-weight: 700; font-size: 15px;">${escapeHtml(sanitizedName)}</td>
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
                <td style="padding: 11px 0; color: #64748b; font-size: 13px;">${escapeHtml(rawSubmittedAt)}</td>
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

        console.log(`[submit-quote] Dispatching Resend email for Quote ID: ${quoteId} to ${recipientEmail}`);

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
          emailMessageId = resJson.id || "delivered";
          console.log(`[submit-quote] ✓ Resend email successfully delivered! ID: ${emailMessageId}`);
        } else {
          const errText = await emailRes.text().catch(() => "");
          resendErrorDetail = `Resend API Error (HTTP ${emailRes.status})`;
          console.error(`[submit-quote] ✗ Resend API returned status ${emailRes.status}:`, errText);
        }
      } catch (err: unknown) {
        resendErrorDetail = "Network exception communicating with Resend";
        console.error("[submit-quote] ✗ Exception during Resend email dispatch:", err);
      }
    } else {
      resendErrorDetail = "RESEND_API_KEY secret not found in environment";
      console.warn("[submit-quote] ⚠️ RESEND_API_KEY secret is not set in Supabase Edge Function Secrets.");
    }

    // 10. Format Official WhatsApp Link (+91 77770 42041)
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

    // 11. Return Honest Response Status
    if (emailSent) {
      return new Response(
        JSON.stringify({
          success: true,
          quote_id: quoteId,
          message: "Quote notification email dispatched successfully.",
          email_sent: true,
          email_id: emailMessageId,
          whatsapp_url: whatsappUrl,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          quote_id: quoteId,
          message: "Quote record received but email delivery failed.",
          email_sent: false,
          error: resendErrorDetail || "Failed to dispatch email via Resend.",
          whatsapp_url: whatsappUrl,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error: unknown) {
    console.error("[submit-quote] Edge Function unhandled error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error processing quote notification." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
