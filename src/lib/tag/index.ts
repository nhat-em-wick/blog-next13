import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Tag } from "@/types";

export async function getTags(): Promise<Tag[]> {
  return client.fetch(
    groq`
    *[_type == "tag"] | order(_createdAt) {
      ...,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url
      }
    `
  )
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

