// components/UserHeroSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

type UserStats = {
  rank?: string | null;
  level?: number | null;
  total_winning?: number | null;
  recent_winning?: number | null;
  matches_played?: number | null;
};

interface UserHeroSectionProps {
  stats?: UserStats | null; // Optional user stats passed from backend
}

export default function UserHeroSection({ stats }: UserHeroSectionProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!user) {
    return (
      <section className="flex items-center justify-center min-h-[120px] bg-gradient-to-br from-[#161C31] via-[#252A41] to-[#192048] rounded-2xl shadow-xl">
        <span className="text-gray-400 text-lg">Please sign in to view your stats.</span>
      </section>
    );
  }

  // User display details
  const displayName = user.username || user.firstName || "Gamer";
  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    "No Email";

  // Stats with safe fallbacks
  const level = stats?.level ?? 1;
  const rank = stats?.rank || "Unranked";
  const totalWinning = stats?.total_winning ?? 0;
  const recentWinning = stats?.recent_winning ?? 0;
  const matchesPlayed = stats?.matches_played ?? 0;
  const levelCap = 100;

  // Example level progress calculation
  const currentLevelProgress = Math.min((matchesPlayed % 10) * 10, 100);

  return (
    <section
      className="
        max-w-screen-2xl mx-auto my-6
        rounded-2xl
        px-6 md:px-12 py-6
        flex flex-col md:flex-row items-center gap-6
        backdrop-blur-xl shadow-2xl relative
        border border-[#2B367B]/60
        bg-gradient-to-r from-[#1F2937] via-[#3B82F6] to-[#9333EA]
        bg-[length:400%_400%]
        animate-gradient-x
        transition-colors duration-700 ease-in-out
        hover:bg-gradient-to-r hover:from-[#3B82F6] hover:via-[#9333EA] hover:to-[#EF4444]
        hover:border-[#EF4444]/70
      "
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={displayName}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-4 border-[#FFDE59] shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#22293B] border-4 border-[#FFDE59] flex items-center justify-center text-3xl text-white font-bold shadow-lg">
            {displayName.charAt(0)}
          </div>
        )}
      </div>

      {/* Main Info Group: Username, Level badge, Email, Rank, and Progress Bar */}
      <div className="flex-1 flex flex-col md:flex-row items-start justify-between w-full">
        {/* Left info column */}
        <div className="flex flex-col">
          {/* Username and level in one line */}
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {displayName}
            </h1>
            {/* LEVEL badge with teal-cyan-violet gradient */}
            <span className="inline-block bg-gradient-to-r from-[#f30b0b] via-[#b71334] to-[#8d2041] text-white font-medium uppercase text-xs px-4 py-1 rounded-2xl shadow-sm border border-[#03C9F5]/40 whitespace-nowrap">
              Lv. {level}/{levelCap}
            </span>
          </div>

          {/* Email below username & level */}
          <p className="text-sm text-[#b3d2f7] truncate max-w-[320px]">{email}</p>

          {/* Rank badge below email */}
          <span className="mt-2 inline-block bg-gradient-to-r from-[#3138FF] to-[#FFDE59] text-white font-medium uppercase text-xs px-4 py-1 rounded-2xl shadow-sm border border-[#3138FF]/30 whitespace-nowrap w-max">
            {rank}
          </span>

          {/* Level progress bar below rank */}
          <div className="mt-3 w-full md:w-[320px]">
            <div className="flex justify-between text-xs text-[#a3a3c2] mb-1 font-medium">
              <span>Level Progress</span>
              <span className="text-[#FFDE59] font-semibold">{currentLevelProgress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#23294B] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFDE59] via-[#FF728B] to-[#5363F6] rounded-full transition-all duration-300"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right side - currently empty, reserved for future use if needed */}
        <div className="ml-auto flex items-center"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
        <StatCard title="Total Winning" value={totalWinning} icon="💰" unit="₹" />
        <StatCard title="Recent Winnings" value={recentWinning} icon="🔥" unit="₹" />
        <StatCard title="Matches Played" value={matchesPlayed} icon="🎯" />
        <StatCard title="Level" value={level} icon="⭐" />
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
  icon,
  unit,
}: {
  title: string;
  value: string | number;
  icon: string;
  unit?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-[rgba(49,56,255,0.1)] border border-[#303C95]/30 rounded-xl p-4 min-w-[100px] shadow-md hover:bg-[#3138FF]/10 transition">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm text-[#B3D2F7] mb-1">{title}</span>
      <span className="text-xl font-bold text-[#FFDE59]">
        {unit}
        {value}
      </span>
    </div>
  );
}
