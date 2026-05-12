// components/Header.tsx
"use client";

import { useState } from "react";
import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, Bell, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, isLoaded } = useUser();

  // Wait until Clerk has loaded the user
  if (!isLoaded) return null;

  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md relative z-50">
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(true)} className="text-white">
          <Menu size={28} />
        </button>

        {/* Site Title */}
        <h1 className="text-xl font-bold ml-2">3TSB GAMER</h1>

        {/* Notification & User Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setNotifOpen((prev) => !prev)}>
            <Bell className="w-6 h-6 cursor-pointer" />
          </button>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <button className="px-4 py-1 bg-red-600 rounded-md text-white">
                Sign In
              </button>
            </Link>
          </SignedOut>
        </div>
      </header>

      {/* Notification Popup */}
      {notifOpen && (
        <div className="absolute right-4 top-16 w-80 bg-white text-black rounded-md shadow-lg z-50 max-h-96 overflow-auto border">
          <div className="px-4 py-2 font-semibold border-b bg-yellow-100 text-gray-900">
            Notifications
          </div>
          <div className="px-4 py-2 text-sm text-gray-800">
            Welcome, {user?.firstName ?? "Gamer"}!
          </div>
        </div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800/90 backdrop-blur-md text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 shadow-lg`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Clerk User Profile */}
        <div className="text-center mt-2 mb-6">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "scale-[2.2] mx-auto border-2 border-yellow-500 rounded-full shadow-lg",
              },
            }}
          />
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-4 px-6">
          <Link href="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link href="/topup" className="hover:text-yellow-400">
            Top Up
          </Link>
          <Link href="/gear" className="hover:text-yellow-400">
            Gaming Gear
          </Link>
          <Link href="/leaderboard" className="hover:text-yellow-400">
            Leaderboard
          </Link>
          <Link href="/help" className="hover:text-yellow-400">
            Help Center
          </Link>
          <Link href="/terms" className="hover:text-yellow-400">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-yellow-400">
            Privacy Policy
          </Link>
          <Link href="/legal" className="hover:text-yellow-400">
            Legal
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
