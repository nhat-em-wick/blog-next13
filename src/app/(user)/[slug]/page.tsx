import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { groq } from 'next-sanity'
import RichTextDocument from '@/components/RichTextDocument'
import { getPostBySlug } from '@/lib/post'
import { Post } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

interface PostProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: PostProps): Promise<Metadata> {
  const post = await getPostBySlug(slug)
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: post?.url || `${process.env.HOST}/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: {
        url: post.thumbnail,
        width: 800,
        height: 600
      },
      type: 'article',
      url: post?.url || `${process.env.HOST}/${post.slug}`
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

  return (
    <div className='blog-container flex flex-col lg:flex-row gap-12 mt-8'>
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
            <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-50'>{post.title}</h1>
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
        <Sidebar />
      </div>
    </div>
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
  return slugs.map((slug) => ({
    slug: slug.slug
  }))
}
