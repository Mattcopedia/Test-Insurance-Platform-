import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@wrapa/ui', '@wrapa/forms'],
  images: {
    // Figma CDN assets require auth and cannot be optimised server-side.
    // Switch to unoptimized until permanent production assets are in place.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
  },
}

export default nextConfig
