import { PortableTextBlock } from "sanity"
import { Base } from "./base.type"

export interface Author extends Base {
  bio: PortableTextBlock[]
  image: string
  name: string
  slug: string
}