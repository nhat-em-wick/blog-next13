export const revalidate = 30

export async function GET() {
  const HOST = process.env.HOST


  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <sitemap>
      <loc>${`${HOST}/articles-sitemap.xml`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${`${HOST}/tags-sitemap.xml`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    </sitemapindex>`
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-control': 'stale-while-revalidate, s-maxage=3600'
    }
  });
}