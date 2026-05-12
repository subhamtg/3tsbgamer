// app/user-panel/page.tsx or components/UserPanel.tsx
"use client";

import Header from "@/components/Header";
import UserHeroSection from "@/components/UserHeroSection";

export default function UserPanel() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-4 space-y-6">
        <UserHeroSection />
        <div>
          <h2 className="text-2xl font-semibold">
            Dashboard Content Coming Soon
          </h2>
        </div>
      </main>
    </div>
  );
}
