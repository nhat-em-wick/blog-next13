import { Post } from '@/types'
import Link from 'next/link'
import { BiCalendar } from 'react-icons/bi'
import { CiClock2 } from 'react-icons/ci'
import Image from '../Image'

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <article className='blog-card p-6 flex flex-col sm:flex-row lg:justify-between gap-10'>
      <div className='w-full  sm:w-[272px] flex-shrink-0'>
        <Link href={`/${post.slug}`} className='block aspect-square relative overflow-hidden rounded-lg group'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className='object-cover w-full h-full group-hover:scale-105 transition-all duration-300 ease-in-out'
          />
        </Link>
      </div>
      <div className='flex-1'>
        {post?.tags?.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug}`} className='blog-tag'>
            {tag.title}
          </Link>
        ))}

        <h3 className='mt-[18px] '>
          <Link
            href={`/${post.slug}`}
            className='text-3xl font-medium underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-primary  
            dark:text-gray-50 leading-tight line-clamp-2 transition-all duration-300 ease-in-out'
          >
            {post.title}
          </Link>
        </h3>
        <p className='mt-3 text-md text-gray-700 line-clamp-3 leading-relaxed dark:text-gray-300'>{post.description}</p>
        <div className='mt-4 flex items-center gap-5 text-gray-600 dark:text-gray-300'>
          <span className='flex items-center'>
            <BiCalendar />{' '}
            <span className='ml-1 text-sm'>
              {new Date(post._createdAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </span>
          <span className='flex items-center'>
            <CiClock2 />
            <span className='ml-1 text-sm dark'>{post.timeRead} phút đọc</span>
          </span>
        </div>
      </div>
    </article>
  )
}
