/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'placehold.co', 'res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/articles-sitemap.xml',
        destination: '/api/articles-sitemap'
      },
      {
        source: '/tags-sitemap.xml',
        destination: '/api/tags-sitemap'
      }
    ]
  }
}

module.exports = nextConfig
