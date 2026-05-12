import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "w0.peakpx.com" },
      { protocol: "https", hostname: "static.toiimg.com" },
      { protocol: "https", hostname: "wallpapers.com" },
      { protocol: "https", hostname: "sgimage.netmarble.com" },
      { protocol: "https", hostname: "www.koimoi.com" },
      { protocol: "https", hostname: "akm-img-a-in.tosshub.com" },
      { protocol: "https", hostname: "img.youtube.com" }
    ],
  },
};

export default nextConfig;
