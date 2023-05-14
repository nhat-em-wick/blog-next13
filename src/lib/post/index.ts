import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Post } from "@/types";


export interface Pagination {
  page: number
  limit: number
}


interface GetPostReturn {
  posts: Post[]
  pagination: {
    page: number,
    limit: number,
    pageCount: number
  }
}

export async function getPosts({ page = 1, limit = 10 }: Pagination, title?: string): Promise<GetPostReturn> {
  const countQuery = `count(*[_type == "post"] [title match "${title ? title : ''}*"])`
  const countResult = await client.fetch<number>(countQuery)
  const pageCount = Math.ceil(countResult / limit)
  const offset = (page - 1) * limit

  const query = groq`
  *[_type == "post"] | order(_createdAt desc) [title match "${title ? title : ''}*"]  [${offset}...${offset + limit}] {
    ...,
    "slug": slug.current,
    author->,
    tags[]->{_id, title, "slug": slug.current},
    "thumbnail": thumbnail.asset->url
    }
  `
  return {
    posts: await client.fetch(query),
    pagination: {
      page: page,
      limit: limit,
      pageCount
    }
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return client.fetch(
    groq`
    *[_type=='post' && slug.current == $slug][0]
    {
      ...,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url,
      author->,
      tags[]->{_id, title, "slug": slug.current}
    }
    `,
    { slug }
  )
}

export async function getPostsByTag(tag: string, { page = 1, limit = 10 }: Pagination): Promise<GetPostReturn> {
  const countQuery = `count(*[$tag in tags[]->slug.current])`
  const countResult = await client.fetch<number>(countQuery, { tag })
  const pageCount = Math.ceil(countResult / limit)
  const offset = (page - 1) * limit

  const query = groq`
  *[$tag in tags[]->slug.current] | order(_createdAt desc) [${offset}...${offset + limit}] {
    ...,
    "slug": slug.current,
    author->,
    tags[]->{_id, title, "slug": slug.current},
    "thumbnail": thumbnail.asset->url
  }
  `
  return {
    posts: await client.fetch(query, { tag }),
    pagination: {
      page: page,
      limit: limit,
      pageCount
    }
  }

}