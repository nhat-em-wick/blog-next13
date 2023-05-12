/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'placehold.co']
  }
}

module.exports = nextConfig
