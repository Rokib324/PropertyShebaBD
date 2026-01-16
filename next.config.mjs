/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled by default in Next.js 16
  // Add empty turbopack config to silence warnings
  turbopack: {},
  
  // Production optimizations
  reactStrictMode: true,
  
  // Ensure proper image optimization
  images: {
    // Disable optimization for API-served images to avoid issues
    // API routes serve images directly, so optimization would fail
    unoptimized: true,
    domains: [],
    remotePatterns: [],
  },
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
};

export default nextConfig;
