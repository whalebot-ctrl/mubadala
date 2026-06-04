/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // In Next.js 16, this is now a stable top-level option
  allowedDevOrigins: ['192.168.0.149'],
}

export default nextConfig