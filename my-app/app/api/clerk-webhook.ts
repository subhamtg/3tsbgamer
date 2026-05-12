// pages/api/clerk-webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Initialize Supabase with service role key (secure on server)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Validate Clerk webhook payload for user.created
const userCreatedSchema = z.object({
  data: z.object({
    id: z.string(),
    email_addresses: z.array(
      z.object({ email_address: z.string().email(), id: z.string() })
    ),
    username: z.string().nullable(),
    first_name: z.string().nullable(),
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST
  if (req.method !== "POST") return res.status(405).end();

  // Parse and validate payload
  const parse = userCreatedSchema.safeParse(req.body);
  if (!parse.success) {
    console.error("Invalid webhook payload:", parse.error.issues);
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { id, email_addresses, username, first_name } = parse.data.data;
  const primaryEmail = email_addresses[0]?.email_address || "";

  try {
    // Upsert into 'users' table
    const { error: upsertError } = await supabase
      .from("users")
      .upsert([{ id, email: primaryEmail, username: username || first_name || "" }]);
    if (upsertError) throw upsertError;

    // Insert default stats if not exists
    const { data: stats, error: statsError } = await supabase
      .from("user_stats")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (statsError) throw statsError;

    if (!stats) {
      const { error: insertError } = await supabase.from("user_stats").insert([
        {
          id,
          email: primaryEmail,
          username: username || first_name || "",
          rank: "Unranked",
          total_winning: 0,
          recent_winning: 0,
          matches_played: 0,
        },
      ]);
      if (insertError) throw insertError;
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error syncing user on webhook:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
