/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'placehold.co']
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ]
  }
}

module.exports = nextConfig
