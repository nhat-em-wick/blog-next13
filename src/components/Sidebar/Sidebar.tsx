'use client'
import Image from 'next/image'
import Link from 'next/link'
import { CiClock2 } from 'react-icons/ci'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { getPosts } from '@/lib/post'
import { getTags } from '@/lib/tag'
import { useEffect, useState } from 'react'
import { Post, Tag } from '@/types'

export default function Sidebar() {
  const [tags, setTags] = useState<Tag[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  const fetchTagsAndPosts = async () => {
    const [tags, posts] = await Promise.all([getTags(), getPosts()])
    setPosts(posts.slice(0, 3))
    setTags(tags)
  }
  useEffect(() => {
    fetchTagsAndPosts()
  }, [])

  return (
    <div className='blog-card p-8 h-max sticky top-[100px]'>
      <section>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Bài viết nổi bật</span>
        <span className='dark:text-gray-300 text-gray-800'>Chưa có bài viết nào</span>
      </section>
      <section className='mt-8'>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Tags</span>
        <ul className='flex flex-wrap gap-x-2 gap-y-3'>
          {tags?.map((tag) => (
            <li className='' key={tag._id}>
              <Link href={`/tags/${tag.slug}`} className='blog-tag'>
                {tag.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className='mt-8'>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Bài viết mới nhất</span>
        <ul>
          {posts?.map((post) => (
            <li key={post._id} className='mb-4'>
              <PostSidebarItem post={post} />
            </li>
          ))}
        </ul>
      </section>
      <section className='mt-8'>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Theo dõi tôi</span>
        <ul className='flex items-center gap-x-2'>
          <li>
            <Link
              target='_blank'
              href='https://www.facebook.com/wick.nhat20'
              className='blog-social-icon text-facebook'
            >
              <FaFacebookF />
            </Link>
          </li>
          <li>
            <Link target='_blank' href='https://github.com/nhat-em-wick' className='blog-social-icon'>
              <FaGithub />
            </Link>
          </li>
          <li>
            <Link href='#' className='blog-social-icon text-linkedin'>
              <FaLinkedinIn />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export const PostSidebarItem = ({ post }: { post: Post }) => {
  return (
    <article className='flex flex-row gap-3'>
      <div className='w-[80px] flex-shrink-0'>
        <Link href='#' className='block aspect-square relative overflow-hidden rounded-lg'>
          <Image
            src={post?.thumbnail || 'https://placehold.co/600x400'}
            alt={post?.title}
            fill
            className='object-cover w-full h-full'
          />
        </Link>
      </div>
      <div>
        <h3 className='text-md font-normal  dark:text-gray-50'>
          <Link
            href={`/${post?.slug}`}
            className='underline underline-offset-3 decoration-2 decoration-transparent hover:decoration-primary  line-clamp-2 leading-snug transition-all duration-300 ease-in-out'
          >
            {post?.title}
          </Link>
        </h3>
        <div className='mt-4 gap-5 text-gray-400 dark:text-gray-500'>
          <span className='flex items-center'>
            <CiClock2 />
            <span className='ml-1 text-sm dark'>{post.timeRead} phút đọc</span>
          </span>
        </div>
      </div>
    </article>
  )
}
