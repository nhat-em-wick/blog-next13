import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`
    *[_type == "post"] | order(_createdAt desc) {
      ...,
      "slug": slug.current,
      author->,
      tags[]->{_id, title, "slug": slug.current},
      "thumbnail": thumbnail.asset->url
      }
    `
  )
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

export function getPostsByTag(tag: string): Promise<Post[]> {
  return client.fetch(
    groq`
    *[$tag in tags[]->slug.current] | order(_createdAt desc){
      ...,
      "slug": slug.current,
      author->,
      tags[]->{_id, title, "slug": slug.current},
      "thumbnail": thumbnail.asset->url
    }
    `,
    { tag }
  )
}