import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // wildcard: izinkan semua domain
      },
    ],
  },
}

export default nextConfig
