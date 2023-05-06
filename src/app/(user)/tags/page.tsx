import Breadcrumb from '@/components/Breadcrumb'
import { getTags } from '@/lib/tag'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const tags = await getTags()
  return {
    title: 'Tags',
    description: 'Chia sẻ thủ thuật công nghệ máy tính, điện thoại, internet, .. và nhiều thể loại khác.',
    keywords: tags.map((tags) => tags.title),
    alternates: {
      canonical: `${process.env.HOST}/tags`
    },
    openGraph: {
      title: 'Tags',
      description: 'Chia sẻ thủ thuật công nghệ máy tính, điện thoại, internet, .. và nhiều thể loại khác.',
      images: {
        url: 'https://mms.businesswire.com/media/20211123005573/en/929867/2/vercel-logo-freelogovectors.net.jpg',
        width: 800,
        height: 600
      },
      type: 'website',
      url: `${process.env.HOST}/tags`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    }
  }
}

export const revalidate = 60

export default async function Tags() {
  const tags = await getTags()
  const breadcrumb = [
    { path: '/', label: 'Trang chủ' },
    {
      path: `/tags`,
      label: 'Tags'
    }
  ]
  return (
    <>
      <Breadcrumb items={breadcrumb} />
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
    </>
  )
}
