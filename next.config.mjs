/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,  // Log the value of MONGODB_URI
  },
};

console.log("MONGODB_URI in next.config.mjs:", process.env.MONGODB_URI);

export default nextConfig;
