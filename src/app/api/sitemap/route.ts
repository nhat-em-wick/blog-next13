import { getPosts } from '@/lib/post'
import { getTags } from '@/lib/tag'

export const revalidate = 30

export async function GET() {
  const HOST = process.env.HOST
  const [{ posts }, { tags }] = await Promise.all([getPosts({ page: 1, limit: 1000 }), getTags({ page: 1, limit: 1000 })])
  const postsSitemap = posts?.map(post => {
    return `
      <url>
          <loc>${`${HOST}/${post.slug}`}</loc>
          <lastmod>${post._createdAt}</lastmod>
      </url>
    `;
  })
  const tagsSitemap = tags?.map(tag => {
    return `
      <url>
          <loc>${`${HOST}/tags/${tag.slug}`}</loc>
          <lastmod>${tag._createdAt}</lastmod>
      </url>
    `;
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
      <loc>${HOST}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${postsSitemap.join("")}
    ${tagsSitemap.join("")}
    </urlset>`
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-control': 'stale-while-revalidate, s-maxage=3600'
    }
  });
}