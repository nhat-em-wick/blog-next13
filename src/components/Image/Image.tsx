import Image from 'next/image'
import { ImageProps } from 'next/image'

export default function ImageCustom({ src, alt, ...props }: ImageProps) {
  return <Image src={src} alt={alt || 'alt image'} {...props} />
}
