import { Author } from "./author.type"
import { Base } from "./base.type"

export interface Tag extends Base {
  title: string
  description?: string
  slug: string
  thumbnail: string
  keywords: string[]
  url: string
  json_ld?: {
    _type: 'code',
    language: 'json',
    code?: object
  },
  authors?: Author[]
}