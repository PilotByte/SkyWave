/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pilotbyte.de', 'pgyilvoitcbzmpeiebvf.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
