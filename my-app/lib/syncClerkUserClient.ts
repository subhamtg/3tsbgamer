// lib/syncClerkUserClient.ts
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useSyncClerkUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Wait for Clerk to finish loading and have user data
    if (!isLoaded || !user) return;

    const payload = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      username: user.username || user.firstName || "",
    };

    // Call server-side API route to upsert user in Supabase
    fetch("/api/user-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error("Failed to sync Clerk user:", err);
    });
  }, [isLoaded, user]);
}
