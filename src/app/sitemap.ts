import { getPosts } from '@/lib/post';
import { getTags } from '@/lib/tag';


export default async function sitemap() {
  const baseUrl = process.env.HOST
  const posts = await getPosts()
  const tags = await getTags()
  const postsSitemap = posts?.map(post => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post._updatedAt
  })) ?? []
  const tagsSitemap = tags?.map(tag => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    lastModified: tag._updatedAt
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postsSitemap,
    ...tagsSitemap
  ];
}