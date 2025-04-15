import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
};

export default withPWA(nextConfig);