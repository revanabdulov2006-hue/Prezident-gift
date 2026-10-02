import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sol alt küncdəki Next.js inkişaf göstəricisi söndürülür.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
