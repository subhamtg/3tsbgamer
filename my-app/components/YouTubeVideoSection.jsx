import React from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const SpotlightLive = () => {
  const youtubeLink = "https://www.youtube.com/embed/nkjEQ5QORuE?si=SvDifPr3ksv-oNom"; // Replace with your YouTube embed link or leave empty for fallback image
  const fallbackImage = "https://play-lh.googleusercontent.com/PQh2f-nj0NtiwoF9SIDRRXsC-C4xUMDQeKY3BfbjtEeQ4n9ypc41HqXYA5j8a0qytZFq-AA0T6_q_L8ZZ8md5ZA=w526-h296-rw";

  const embedUrl = youtubeLink || null;

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-4xl font-bold flex items-center gap-3">
            <ImageIcon className="mr-1" /> Spotlight Live
            {embedUrl && (
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black border-2 border-white">
                <span className="absolute w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
                <span className="relative w-2 h-2 bg-red-600 rounded-full"></span>
              </span>
            )}
          </h2>
        </div>

        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="overflow-hidden rounded-2xl shadow-2xl border-4 border-red-600 w-full"
          >
            <div className="relative w-full" style={{ paddingTop: '60%' }}>
              {embedUrl ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-none"
                  src={embedUrl}
                  title="Spotlight YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  loading="lazy"
                  src={fallbackImage}
                  alt="Spotlight"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SpotlightLive;
