// lib/useFetchUserStats.ts
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function useFetchUserStats() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    })
      .then((res) => res.json())
      .then((json) => {
        setStats(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, [isLoaded, user]);

  return { stats, loading, user };
}
