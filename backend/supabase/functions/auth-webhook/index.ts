
// Auth Webhook Function
// This function handles auth events and can be extended as needed

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    const body = await req.json();
    const { type, record } = body;

    console.log(`Auth webhook received event: ${type}`);

    // Handle different auth events
    switch (type) {
      case "SIGNED_IN":
        console.log(`User signed in: ${record.id}`);
        break;
      case "SIGNED_UP":
        console.log(`User signed up: ${record.id}`);
        break;
      case "PASSWORD_RECOVERY":
        console.log(`Password recovery requested: ${record.id}`);
        break;
      default:
        console.log(`Unhandled auth event: ${type}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Error processing auth webhook:`, error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
