// app/api/clerk-webhook/route.ts
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createClient } from "@supabase/supabase-js";


interface ClerkUserCreatedEvent {
  type: "user.created";
  data: {
    id: string;
    username: string | null;
    first_name: string | null;
    email_addresses: Array<{ email_address: string }>;
    image_url: string | null;
  };
}

export async function POST(req: Request) {
  // Initialize Supabase inside the handler
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Read raw body as text
  const payload = await req.text();


  // Verify the Clerk webhook signature
  const clerkSigningSecret = process.env.CLERK_WEBHOOK_SECRET!;
  const wh = new Webhook(clerkSigningSecret);
  const headers = Object.fromEntries(req.headers.entries()) as Record<string, string>;
  let event: ClerkUserCreatedEvent;
  try {
    event = wh.verify(payload, headers) as ClerkUserCreatedEvent;
  } catch (err) {
    console.error("Invalid webhook signature", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }


  // Only handle user.created events
  if (event.type !== "user.created") {
    return NextResponse.json({ ok: true });
  }


  const { id, username, first_name, email_addresses, image_url } = event.data;
  const primaryEmail = email_addresses[0]?.email_address || "";


  // Default initial stats
  const level = 1;
  const level_progress = 0;
  const rank = "Unranked";
  const total_winning = 0;
  const recent_winning = 0;
  const matches_played = 0;


  try {
    // Upsert into users table
    const { error: userErr } = await supabase
      .from("users")
      .upsert([
        {
          id,
          username: username || first_name || "",
          email: primaryEmail,
          image_url,
          created_at: new Date().toISOString(),
        },
      ]);
    if (userErr) throw userErr;


    // Insert initial stats into user_stats table
    const { error: statsErr } = await supabase.from("user_stats").insert([
      {
        id,
        level,
        level_progress,
        rank,
        total_winning,
        recent_winning,
        matches_played,
      },
    ]);
    if (statsErr) throw statsErr;


    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error syncing Clerk user to Supabase:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}