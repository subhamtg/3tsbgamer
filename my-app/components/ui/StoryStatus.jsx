import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const StoryStatus = () => {
  const baseStories = [
    {
      name: "3TSB_ERR⚠️R♣️",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
      description: "You are a premium user with full access.",
      aboutImage: "https://i.ibb.co/8DNVgKXc/IMG-20250718-131623.jpg",
    },
    {
      name: "3TSBTOP1",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-green-400 to-blue-500",
      description: "Best friend who loves gaming.",
      aboutImage: "https://i.ibb.co/B54zk3WP/IMG-20250718-151526.jpg",
    },
    {
      name: "ßŁÁĆҜMÎŃĐ44",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-purple-500 to-pink-400",
      description: " is a photographer.",
      aboutImage: "https://i.ibb.co/3yx2vBWC/IMG-20250718-151503.jpg",
    },
    {
      name: "❤️MR_UNKNOWN",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-yellow-400 to-orange-500",
      description: "Mia is a tech enthusiast.",
      aboutImage: "https://i.ibb.co/84z8cw1f/IMG-20250718-151548.jpg",
    },
    {
      name: "3TSB_KARAN⚠️",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-indigo-500 to-cyan-400",
      description: " loves design and art.",
      aboutImage: "https://i.ibb.co/gM0J2WhG/IMG-20250718-151607.jpg",
    },
    {
      name: "3TSB_PRINCEx",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-rose-500 to-red-400",
      description: " is a sports lover.",
      aboutImage: "https://i.ibb.co/05fCJBz/IMG-20250718-151412.jpg",
    },
    {
      name: "NITIN  FF",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-green-300 to-teal-500",
      description: " is a traveler.",
      aboutImage: "https://i.ibb.co/HDcwt2Bx/IMG-20250718-153404.jpg",
    },
    {
      name: "snakeboy1_",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-blue-400 to-indigo-600",
      description: " is a developer.",
      aboutImage: "https://i.ibb.co/1Ym41Csb/IMG-20250718-151439.jpg",
    },
    {
      name: "FREE FIRE",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-pink-400 to-purple-500",
      description: " is a dancer.",
      aboutImage: "https://i.ibb.co/tB3yFf1/ava.jpg",
    },
    {
      name: "BGMI",
      image: "https://i.ibb.co/h1ZkY0Lc/lv-0-20250718144547.gif",
      gradient: "from-yellow-300 to-orange-400",
      description: " is a gamer.",
      aboutImage: "https://i.ibb.co/Y32NnMR/oliver.jpg",
    },
  ];

   const repeatedStories = [...baseStories, ...baseStories, ...baseStories, ...baseStories];
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
  const container = scrollRef.current;
  let animationFrameId;
  let scrollX = 0;

  const smoothScroll = () => {
    if (!paused && container) {
      scrollX += 0.5;
      container.scrollLeft = scrollX;

      if (scrollX >= container.scrollWidth / 2) {
        scrollX = 0;
        container.scrollLeft = 0;
      }
    }
    animationFrameId = requestAnimationFrame(smoothScroll);
  };

  animationFrameId = requestAnimationFrame(smoothScroll);
  return () => cancelAnimationFrame(animationFrameId);
}, [paused]);


  const handleStoryClick = (story) => {
    setPaused(true);
    setActiveStory(story);
  };

  const handleClose = () => {
    setActiveStory(null);
    setPaused(false);
  };

  return (
    <div className="w-full h-[400px] bg-transparent flex flex-col items-center justify-center p-4 relative">
      <h2 className="text-white text-xl font-semibold mb-2 mt-2 flex items-center justify-center gap-2">
        <span className="text-lg">👑</span> Prime Member
      </h2>
      <div
        ref={scrollRef}
        className="w-full overflow-x-scroll whitespace-nowrap flex space-x-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          animation: "scroll 60s linear infinite",
        }}
      >
        {repeatedStories.map((story, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => handleStoryClick(story)}
          >
            <div
              className={`w-20 h-20 rounded-full p-1 bg-gradient-to-tr ${story.gradient}`}
            >
              <div className="bg-white w-full h-full rounded-full p-1">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <p className="text-xs mt-1 text-center text-white">{story.name}</p>
          </motion.div>
        ))}
      </div>

      {activeStory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white/80 p-5 rounded-xl shadow-xl w-[280px] sm:w-[320px] max-w-[90%] text-center border border-white/30">
            <img
              src={activeStory.image}
              alt={activeStory.name}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900">{activeStory.name}</h3>
            <p className="text-sm text-gray-800">{activeStory.description}</p>
            <img
              src={activeStory.aboutImage}
              alt="About"
              className="mt-3 w-full rounded-lg shadow-md border border-gray-300"
            />
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-1 text-sm bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryStatus;