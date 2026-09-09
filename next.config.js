/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
};

module.exports = nextConfig;
