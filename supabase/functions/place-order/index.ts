// place-order
//
// canonical order creation. the client sends a list of {artifact_id,
// material, quantity} plus customer/shipping info. we look up each
// artifact server-side, snapshot its price/manufacturing/earnings for
// the requested material, and insert one orders row per item with
// user_id derived from the caller's jwt. this stops the client from
// inventing prices.
//
// security notes:
//   - verify_jwt = false because we read the auth header ourselves so
//     the function can return clean json errors instead of a 401 wall
//   - we use the service role only for the artifacts read; order
//     inserts are done with the user's anon-key client so the rls
//     policy "user_id = auth.uid()" is enforced

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.45.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace("Bearer ", "");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // user-scoped client: respects rls, used for the order inserts.
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    // service-role client: used for the trusted artifact lookup so
    // pricing isn't snapshotted from a draft / unpublished record.
    const serviceClient = createClient(supabaseUrl, serviceKey);

    const { data: userData, error: userErr } = await userClient.auth.getUser(jwt);
    if (userErr || !userData?.user) {
      return json({ error: "not authenticated" }, 401);
    }
    const user = userData.user;

    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const customer = body?.customer || {};
    const shippingAddress = String(body?.shipping_address || "");
    const notes = String(body?.notes || "");

    if (!items.length) return json({ error: "cart is empty" }, 400);
    if (!customer.email || !customer.name) return json({ error: "missing customer info" }, 400);
    if (!shippingAddress) return json({ error: "missing shipping address" }, 400);

    const ids = [...new Set(items.map((i: any) => String(i.artifact_id)))];
    const { data: artifacts, error: aerr } = await serviceClient
      .from("artifacts")
      .select("id,name,image_url,creator_handle,prices,manufacturing_costs,creator_earnings,status")
      .in("id", ids);
    if (aerr) return json({ error: aerr.message }, 500);

    const byId = new Map<string, any>((artifacts || []).map((a) => [a.id, a]));

    const rows: any[] = [];
    for (const item of items) {
      const a = byId.get(String(item.artifact_id));
      if (!a) return json({ error: `unknown artifact ${item.artifact_id}` }, 400);
      if (a.status !== "published") return json({ error: `artifact ${a.name} is not available` }, 400);
      const material = String(item.material || "");
      const qty = Math.max(1, Math.min(10, Number(item.quantity || 1)));
      const unitPrice = Number((a.prices || {})[material] || 0);
      const unitMfg = Number((a.manufacturing_costs || {})[material] || 0);
      const unitEarn = Number((a.creator_earnings || {})[material] || 0);

      rows.push({
        user_id: user.id,
        artifact_id: a.id,
        artifact_name: a.name,
        artifact_image_url: a.image_url || "",
        creator_handle: a.creator_handle,
        customer_email: String(customer.email),
        customer_name: String(customer.name),
        material,
        price: unitPrice * qty,
        manufacturing_cost: unitMfg * qty,
        creator_earnings: unitEarn * qty,
        shipping_address: shippingAddress,
        notes,
        status: "placed",
      });
    }

    const { data: inserted, error: ierr } = await userClient
      .from("orders")
      .insert(rows)
      .select();
    if (ierr) return json({ error: ierr.message }, 400);

    return json({ ok: true, orders: inserted });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
