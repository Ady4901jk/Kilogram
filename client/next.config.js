/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["robohash.org"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://kilogram.onrender.com/:path*", // Updated destination URL
      },
    ];
  },
};

module.exports = nextConfig;
