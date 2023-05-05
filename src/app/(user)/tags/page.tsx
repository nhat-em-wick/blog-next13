import { getTags } from '@/lib/tag'
import Image from 'next/image'
import Link from 'next/link'

export default async function Tags() {
  const tags = await getTags()
  return (
    <div className='pb-16'>
      <div className='blog-container'>
        <h1 className='text-4xl font-semibold text-center mb-14'>Tags</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {tags?.map((tag) => (
            <div key={tag._id} className='blog-card p-5'>
              <div className='mb-4'>
                <Link href={`/tags/${tag.slug}`} className='relative block aspect-[5/4] overflow-hidden rounded-lg'>
                  <Image
                    src={tag.thumbnail || 'https://placehold.co/600x400/png'}
                    fill
                    className='w-full h-full object-cover'
                    alt={tag.title}
                  />
                </Link>
              </div>
              <div>
                <h3>
                  <Link
                    href={`/tags/${tag.slug}`}
                    className='text-xl font-semibold dark:text-gray-50 blog-underline underline-offset-4 decoration-2 line-clamp-1'
                  >
                    {tag.title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
