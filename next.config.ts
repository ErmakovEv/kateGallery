import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['u0fybqmhfzpjojqe.public.blob.vercel-storage.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
