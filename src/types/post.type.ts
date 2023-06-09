import { PortableTextBlock } from "sanity"
import { Base } from "./base.type"
import { Author } from "./author.type"
import { Tag } from "./tag.type"

export interface Post extends Base {
  title: string
  description?: string
  slug: string,
  url?: string,
  thumbnail: string
  keywords?: string[]
  content: PortableTextBlock[]
  authors?: Author[]
  tags?: Tag[]
  json_ld?: {
    _type: 'code',
    language: 'json',
    code?: object
  },
  timeRead: number
}