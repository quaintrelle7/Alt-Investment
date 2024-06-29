/* @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PINATA_API_KEY: process.env.API_KEY,
    PINATA_API_SECRET: process.env.API_SECRET
  }
};

export default nextConfig;
