import { groq } from "next-sanity";
import { client } from "../sanity.client";
import { Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`
    *[_type == "post"] | order(_createdAt) {
      ...,
      "slug": slug.current,
      author->,
      tags[]->{_id, title},
      "thumbnail": thumbnail.asset->url
      }
    `
  )
}