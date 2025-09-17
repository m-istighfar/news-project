/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
