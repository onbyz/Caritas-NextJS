import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match Django URL style (no trailing slash)
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.caritashospital.org" },
    ],
  },
};

export default nextConfig;
