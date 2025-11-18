/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['logo.clearbit.com', 'via.placeholder.com', 'upload.wikimedia.org', 'assets-global.website-files.com', 'cdn.worldvectorlogo.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Simplify image loading for external sources in this demo
  },
};

module.exports = nextConfig;