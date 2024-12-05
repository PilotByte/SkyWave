/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.ko-fi.com', 'pgyilvoitcbzmpeiebvf.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
