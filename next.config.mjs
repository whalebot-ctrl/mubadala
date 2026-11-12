/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Next.js 16 uses Turbopack for `next build` by default (Vercel included).
  turbopack: {},
  allowedDevOrigins: ['192.168.0.149'],
}

export default nextConfig
