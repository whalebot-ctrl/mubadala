/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable SWC minification to reduce build-time Wasm memory usage
  swcMinify: false,
  // Disable WebAssembly compilation in Webpack
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
    };
    return config;
  },
  allowedDevOrigins: ['192.168.0.149'],
};

export default nextConfig; 
