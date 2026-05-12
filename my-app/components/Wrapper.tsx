"use client";

import { useSyncClerkUser } from "@/lib/syncClerkUserClient";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  useSyncClerkUser();
  return <>{children}</>;
}
