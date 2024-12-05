/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.ko-fi.com'],
  },
  ignoreDuringBuilds: true,
};

export default nextConfig;
