/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.HOST || 'https://example.com',
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        disallow: '/studio'
      }
    ]
  }
}
