"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Youtube,
  ChevronDown,
  Users,
  Info,
  Video,
  MessageCircle,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoryStatus from "@/components/ui/StoryStatus";
import SpotlightLive from "@/components/YouTubeVideoSection";
import YouTubeShortsSection from "@/components/YouTubeShortsSection"; 
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function YouTuberWebsite() {
  const [channelName] = useState("3TSB GAMER");
  const [subscribers, setSubscribers] = useState(9999);
  const [darkMode, setDarkMode] = useState(true);

  // Animation variants for scroll-based reveal subr
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
  const fetchSubscribers = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const CHANNEL_ID = "UC-Dg8Tb7LsRNHWQk8Gy-dqA";

    if (!API_KEY) {
      console.error("YouTube API key is missing");
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.items?.[0]?.statistics?.subscriberCount) {
        setSubscribers(Number(data.items[0].statistics.subscriberCount));
      }
    } catch (error) {
      console.error("Failed to fetch subscriber count:", error);
    }
  };

  fetchSubscribers();
  const interval = setInterval(fetchSubscribers, 10000);
  return () => clearInterval(interval);
  }, []);

  // log in popup click outside handler

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-black via-red-900 to-black text-white"
          : "bg-gradient-to-b from-slate-900 via-gray-800 to-black text-gray-100"
      } overflow-x-hidden relative`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-indigo-500 text-yellow-100 hover:bg-indigo-600 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      {/* Login Button Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <SignedOut>
          {/* ✅ redirectUrl works here */}
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition duration-300 transform hover:scale-105">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
      {/* iframe popup for index.html */}
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl font-extrabold mb-4">
            <Youtube className="inline-block mr-3" size={52} /> {channelName}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Welcome to the official hub for Gaming Industry. Explore exclusive
            content, trending videos, and connect with fans from all over the
            world.
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12"
          >
            <ChevronDown size={32} className="text-red-500 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Spotlight Section */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <SpotlightLive />
      </section>

      {/* Subscribers */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <h2 className="text-4xl font-bold mb-4 flex justify-center items-center">
            <Users className="mr-2" /> Our YouTube Family
          </h2>
          <p className="text-5xl font-extrabold text-red-500 mb-4">
            {subscribers.toLocaleString()}+ Subscribers
          </p>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every single one of you is a part of this epic journey. From casual
            viewers to die-hard fans, we are one big gaming family, growing
            stronger every day!
          </p>

          <div className="mt-8">
            <StoryStatus />
          </div>
        </motion.div>
      </section>
      {/* YouTube Shorts sections */}
      <YouTubeShortsSection />

      {/* Gallery / Behind-the-Scenes Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <h2 className="text-4xl font-bold mb-10 text-center flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" />
              <path d="M3 10h18" />
              <path d="M7 21h10" />
              <path d="M12 17v4" />
            </svg>
            Behind the Scenes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://w0.peakpx.com/wallpaper/763/911/HD-wallpaper-one-piece-luffy-luffy-smile-anime-one-piece.jpg",
              "https://static.toiimg.com/thumb/msid-108824901,width-1070,height-580,imgsize-159786,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
              "https://wallpapers.com/images/hd/demon-slayer-pictures-uez37s1eslojfsm3.jpg",
              "https://sgimage.netmarble.com/images/netmarble/sololv/20240105/rxxx1704430473104.jpg",
              "https://w0.peakpx.com/wallpaper/763/911/HD-wallpaper-one-piece-luffy-luffy-smile-anime-one-piece.jpg",
              "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202410/one-piece-will-return-in-april-2025-with-a-new-arc-153338935-16x9_0.jpg?VersionId=JRxFeDY5kyREyeucuxMJkiow88fm8bhj",
            ].map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg border border-gray-700 bg-gray-900"
              >
                <Image
                  loading="lazy"
                  src={`${src}?auto=format&fit=crop&w=800&q=80`}
                  alt={`Behind the scenes ${idx + 1}`}
                  width={800}
                  height={240}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Videos */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <h2 className="text-4xl font-bold mb-10 text-center flex justify-center items-center">
            <Video className="mr-2" /> Featured Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Qcc-XCc_r2I", "4XyTlhma4UM", "yoo5zYOSZwk"].map((videoId) => (
              <a
                key={videoId}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube thumbnail"
                  width={480}
                  height={360}
                  className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Me */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <h2 className="text-4xl font-bold mb-4 flex justify-center items-center">
            <Info className="mr-2" /> About Me
          </h2>
          <p className="text-gray-300 text-lg">
            I&lsquo;m a passionate gamer and content creator. You&lsquo;ll find
            thrilling gameplay, walkthroughs, tips, and engaging commentary on
            the latest in the gaming world.
          </p>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center flex justify-center items-center">
            <MessageCircle className="mr-2" /> Contact Me
          </h2>
          <form className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              className="bg-gray-800 border-gray-700"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              className="bg-gray-800 border-gray-700"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md"
              required
            />
            <Button className="w-full" type="submit">
              Send Message
            </Button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-10 border-t border-gray-800">
        <div className="mb-4 flex justify-center gap-4">
          <a
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-400 hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://discord.com"
            className="text-gray-400 hover:text-white"
          >
            Discord
          </a>
        </div>
        <p className="text-gray-500">
          &copy; 2025 3TSB GAMER. All rights reserved.
        </p>
        <p className="text-gray-600 text-sm flex justify-center items-center gap-2 mt-2">
          <Mail size={16} /> contact@3tsbgamer.com
        </p>
        <p className="text-gray-500">created by{" Subham Webdesign "}</p>
      </footer>
    </main>
  );
}

