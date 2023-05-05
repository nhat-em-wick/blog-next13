import Image from 'next/image'
import Link from 'next/link'
import urlFor from '@/lib/urlFor'

const RichTextDocument = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className='relative aspect-video m-10 mx-auto rounded-lg overflow-hidden'>
          <Image className='object-cover' src={urlFor(value).url()} fill alt={value.alt} />
        </figure>
      )
    }
  },
  list: {
    bullet: ({ children }: any) => <ul className='ml-10 py-5 list-disc space-y-5'>{children}</ul>,
    number: ({ children }: any) => <ol className='mt-lg list-decimal'>{children}</ol>
  },
  block: {
    h1: ({ children }: any) => <h1 className='text-3xl py-6 font-bold text-gray-800 dark:text-gray-50'>{children}</h1>,
    h2: ({ children }: any) => <h2 className='text-2xl py-6 font-bold text-gray-800 dark:text-gray-50'>{children}</h2>,
    h3: ({ children }: any) => <h3 className='text-xl py-6 font-bold text-gray-800 dark:text-gray-50'>{children}</h3>,
    h4: ({ children }: any) => <h4 className='text-lg py-6 font-bold text-gray-800 dark:text-gray-50'>{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className='border-l-primary border-l-4 pl-5 py-5 my-5'>{children}</blockquote>
    )
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.url.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link href={value.url} rel={rel} className='underline decoration-primary hover:decoration-primary-light'>
          {children}
        </Link>
      )
    }
  }
}

export default RichTextDocument
