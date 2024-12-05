/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.ko-fi.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
