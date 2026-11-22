/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/waqf', destination: 'https://waqf.tawf.foundation', permanent: false },
      { source: '/waqf-farms', destination: 'https://waqf.tawf.foundation', permanent: false },
      { source: '/zakat', destination: 'https://tawf.foundation/zakat', permanent: false },
      { source: '/dao', destination: 'https://tawf.foundation', permanent: false },
      { source: '/vendor', destination: '/', permanent: false },
      { source: '/dashboard', destination: '/', permanent: false },
      { source: '/contracts', destination: '/', permanent: false },
    ];
  },
}

export default nextConfig
