import type { NextConfig } from "next"; 

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vpsgqwqcdazffhrqeghc.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
    ],
  },
};

export default nextConfig;
