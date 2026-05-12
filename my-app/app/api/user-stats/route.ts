// app/api/user-stats/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export async function POST(request: Request) {
  // Initialize Supabase inside the handler
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const json = await request.json();
  const parse = schema.safeParse(json);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.issues }, { status: 400 });
  }

  const { id } = parse.data;

  try {
    const { data, error } = await supabase
      .from("user_stats")
      .select("*")
      .eq("id", id)
      .maybeSingle();   // <-- changed here

    if (error) {
      console.error("Error fetching stats:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      // No stats found, return empty or default data if needed
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
