"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

const shortsVideos = [
  "VSOXp3aQA1I",
  "RR7D6HY92Gw",
  "Qcd4ZhzMG2o",
  "SvclAS4L0rU",
  "IfiNDIwurq8",
  "nCCXeQBOehI",
];

export default function YouTubeShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const currentVideo = shortsVideos[currentIndex];

  const nextShort = () => {
    setCurrentIndex((prev) => (prev + 1) % shortsVideos.length);
  };

  const previousShort = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? shortsVideos.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextShort();
    }, 18000); // Change video every 18 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold flex items-center">
            <Youtube className="mr-3 text-red-500" />
            Gaming Shorts
          </h2>

          <button
            onClick={() => setMuted(!muted)}
            className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
          >
            {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>

        <div className="relative flex items-center justify-center min-h-[480px]">
          <button
            onClick={previousShort}
            className="absolute left-0 md:left-20 z-20 bg-black/70 hover:bg-red-600 p-3 rounded-full transition"
          >
            <ChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo + currentIndex}
              initial={{ opacity: 0, x: 300, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.85 }}
              transition={{ duration: 0.7 }}
              className="w-[240px] md:w-[280px] bg-gray-950 rounded-3xl overflow-hidden border border-red-600 shadow-2xl"
            >
              <iframe
                className="w-full h-[430px] md:h-[500px]"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=${
                  muted ? 1 : 0
                }&controls=1&rel=0&modestbranding=1&playsinline=1`}
                title="YouTube Short"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={nextShort}
            className="absolute right-0 md:right-20 z-20 bg-black/70 hover:bg-red-600 p-3 rounded-full transition"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {shortsVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-red-500"
                  : "w-3 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
