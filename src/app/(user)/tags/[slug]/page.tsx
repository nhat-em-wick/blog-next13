import { Suspense } from 'react'
import { Metadata } from 'next'
import { groq } from 'next-sanity'

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Pagination from '@/components/Pagination'
import PostItem from '@/components/PostItem'
import Sidebar from '@/components/Sidebar'
import Image from '@/components/Image'

import { getPostsByTag } from '@/lib/post'
import { client } from '@/lib/sanity.client'
import { getTagBySlug } from '@/lib/tag'

export const runtime = 'edge'
interface DetailTagProps {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { slug } }: DetailTagProps): Promise<Metadata> {
  const tag = await getTagBySlug(slug)
  return {
    title: tag.title,
    description: tag.description,
    keywords: tag.keywords,
    alternates: {
      canonical: tag?.url || `${process.env.HOST}/tags/${tag.slug}`
    },
    authors: tag?.authors?.map((author) => ({ name: author.name })),
    category: tag.title,
    openGraph: {
      title: tag.title,
      description: tag.description,
      authors: tag?.authors?.map((author) => author.name),
      images: {
        url: tag.thumbnail,
        width: 800,
        height: 600
      },
      type: 'article',
      url: tag?.url || `${process.env.HOST}/tags/${tag.slug}`,
      publishedTime: tag._createdAt
    },
    twitter: {
      card: 'summary',
      title: tag.title,
      description: tag.description,
      images: [tag.thumbnail]
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

export default async function DetailTag({ params: { slug }, searchParams }: DetailTagProps) {
  const [tag, { posts, pagination }] = await Promise.all([
    getTagBySlug(slug),
    getPostsByTag(slug, { page: (searchParams?.page || 1) as number, limit: (searchParams?.limit || 10) as number })
  ])
  const breadcrumb = [
    { path: '/', label: 'Trang chủ' },
    {
      path: `/tags`,
      label: 'Tags'
    },
    {
      path: `/tags/${tag.slug}`,
      label: tag.title
    }
  ]
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className=''>
        <div className='blog-container'>
          <div className='blog-card p-5 relative'>
            <div className='relative aspect-square sm:aspect-[2/1] lg:aspect-[4/1] overflow-hidden rounded-lg'>
              <Image alt={tag.title} fill src={tag?.thumbnail} />
            </div>
            <div
              className='absolute w-[80%] lg:w-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white dark:bg-dark-theme-bg opacity-95 rounded-lg py-8 px-10'
            >
              <h1 className='text-4xl font-semibold text-center dark:text-gray-50 mb-6'>{tag.title}</h1>
              <p className='text-center text-xl text-gray-800 dark:text-gray-200 line-clamp-2'>
                {tag.description || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='blog-container flex flex-col lg:flex-row gap-12 mt-8'>
        <Suspense fallback={'loading...'}>
          <div className='blog-list w-full lg:w-[65%] flex flex-col gap-y-10'>
            {posts?.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
            <div className='flex justify-center'>
              <Pagination pagination={pagination} />
            </div>
          </div>
        </Suspense>
        <div className='blog-sidebar flex-1'>
          {/* @ts-expect-error Server Component */}
          <Sidebar />
        </div>
      </div>
    </>
  )
}

interface Slug {
  slug: string
}

export const revalidate = 60

export async function generateStaticParams() {
  const query = groq`
      *[_type == 'tag']
      {
        "slug": slug.current
      }
  `
  const slugs: Slug[] = await client.fetch(query)
  return slugs
}
