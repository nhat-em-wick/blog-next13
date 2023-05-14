import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Tag } from "@/types";
import { Pagination } from "../post";

interface GetTagReturn {
  tags: Tag[]
  pagination: {
    page: number,
    limit: number,
    pageCount: number
  }
}


export async function getTags({ page = 1, limit = 10 }: Pagination, title?: string): Promise<GetTagReturn> {
  const countQuery = `count(*[_type == "tag"] [title match "${title ? title : ''}*"])`
  const countResult = await client.fetch<number>(countQuery)
  const pageCount = Math.ceil(countResult / limit)
  const offset = (page - 1) * limit
  const query = groq`
  *[_type == "tag"] | order(_createdAt) [title match "${title ? title : ''}*"] [${offset}...${offset + limit}] {
    ...,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
    }
  `
  return {
    tags: await client.fetch(query),
    pagination: {
      page: page,
      limit: limit,
      pageCount
    }
  }
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  return client.fetch(
    groq`
    *[_type=='tag' && slug.current == $slug][0]
    {
      ...,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url,
    }
    `,
    { slug }
  )
}

