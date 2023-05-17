import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { groq } from 'next-sanity'
import { RichTextDocument, parseOutline, TableOfContents } from '@/components/RichTextDocument'
import { getPostBySlug } from '@/lib/post'
import { Post } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'

interface PostProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: PostProps): Promise<Metadata> {
  const post = await getPostBySlug(slug)
  if (!post) {
    return {
      title: 'Bài viết không tìm thấy'
    }
  }
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: post?.url || `${process.env.HOST}/${post.slug}`
    },
    authors: post?.authors?.map((author) => ({ name: author.name })),
    openGraph: {
      title: post.title,
      description: post.description,
      images: {
        url: post.thumbnail,
        width: 800,
        height: 600
      },
      type: 'article',
      url: post?.url || `${process.env.HOST}/${post.slug}`,
      publishedTime: post._createdAt,
      authors: post?.authors?.map((author) => author.name)
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
      images: [post.thumbnail]
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1
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

export default async function Post({ params: { slug } }: PostProps) {
  const post = await getPostBySlug(slug)

  if (!post) {
    return notFound()
  }
  const outline = parseOutline(post.content)
  const breadcrumb = [
    { path: '/', label: 'Trang chủ' },
    {
      path: `/${post.slug}`,
      label: post.title
    }
  ]
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className='blog-container flex flex-col lg:flex-row gap-12 mt-8 '>
        <section className='w-full lg:w-[65%]'>
          <article className='blog-card p-8'>
            <div>
              <div className='relative aspect-video rounded-lg overflow-hidden'>
                <Image src={post.thumbnail} alt={post.title} className='object-cover w-full h-full' fill />
              </div>
            </div>
            <div className='md:px-5 lg:px-8 mt-5 md:mt-10 pb-12'>
              <div className='mb-4'>
                {post?.tags?.map((tag) => (
                  <Link href={`/tags/${tag.slug}`} className='blog-tag' key={tag._id}>
                    {tag.title}
                  </Link>
                ))}
              </div>
              <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-50 pb-6'>{post.title}</h1>
              <div className='border border-gray-600 dark:border-gray-300 p-3 rounded-lg'>
                <h3 className='text-2xl text-gray-800 dark:text-gray-50 font-medium pb-2'>Nội dung bài viết</h3>
                <TableOfContents outline={outline} />
              </div>
              <div className='text-justify'>
                <PortableText value={post.content} components={RichTextDocument} />
              </div>
            </div>
          </article>
          <div className='blog-card mt-10 py-8 flex flex-col items-center gap-y-5'>
            <h3 className='text-xl font-bold text-gray-800 dark:text-gray-50'>Chia sẽ bài viết</h3>
            <div className='flex items-center gap-2'>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${post?.url || process.env.HOST + '/' + post.slug}`}
                target='_blank'
                className='blog-social-icon text-facebook'
                title='Share on Facebook'
              >
                <FaFacebookF />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${
                  post?.url || process.env.HOST + '/' + post.slug
                }&text=${encodeURI(post.description || '')}`}
                target='_blank'
                className='blog-social-icon text-twitter'
                title='Share on Twitter'
              >
                <FaTwitter />
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                  post?.url || process.env.HOST + '/' + post.slug
                }`}
                target='_blank'
                className='blog-social-icon text-linkedin'
                title='Share on Linkedin'
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </section>
        <div className='blog-sidebar flex-1'>
          {/* @ts-expect-error Server Component */}
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export const revalidate = 30

interface Slug {
  slug: string
}

export async function generateStaticParams() {
  const query = groq`
      *[_type == 'post']
      {
        "slug": slug.current
      }
`
  const slugs: Slug[] = await client.fetch(query)
  return slugs
}
