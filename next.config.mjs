/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ ye line IMPORTANT hai
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
