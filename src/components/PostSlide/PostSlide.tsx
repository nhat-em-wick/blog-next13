'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef, Autoplay } from 'swiper'

import { BiCalendar } from 'react-icons/bi'
import { CiClock2 } from 'react-icons/ci'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { Post } from '@/types'
import Image from '../Image'

interface PostSlideProps {
  posts: Post[]
}

export default function PostSlide({ posts }: PostSlideProps) {
  const swiperRef = useRef<SwiperRef>()

  return (
    <section className='blog-container'>
      <div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {posts?.map((post) => (
            <SwiperSlide key={post._id}>
              <PostSlideItem post={post} />
            </SwiperSlide>
          ))}

          <div className='blog-slide-control mt-8 flex justify-end items-center gap-x-6 text-xl text-gray-700 dark:text-gray-300'>
            <span
              onClick={() => swiperRef.current?.slidePrev()}
              className='cursor-pointer hover:text-primary transition-all duration-300 ease-in-out'
            >
              <BsArrowLeft />
            </span>
            <span
              onClick={() => swiperRef.current?.slideNext()}
              className='cursor-pointer hover:text-primary transition-all duration-300 ease-in-out'
            >
              <BsArrowRight />
            </span>
          </div>
        </Swiper>
      </div>
    </section>
  )
}

const PostSlideItem = ({ post }: { post: Post }) => {
  return (
    <article className='flex flex-col md:flex-row-reverse justify-between gap-8'>
      <div className='blog-card p-4 w-full lg:w-[55%]'>
        <Link
          href={`/${post.slug}`}
          className='w-full h-full aspect-video block rounded-lg overflow-hidden relative group'
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className='object-cover w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out'
          />
        </Link>
      </div>
      <div className='w-full lg:w-[45%]'>
        {post?.tags?.map((tag) => (
          <Link key={uuid()} href={`/tags/${tag.slug}`} className='blog-tag'>
            {tag.title}
          </Link>
        ))}
        <h2 className='text-5xl font-medium leading-none md:leading-tight mt-[18px] transition-all duration-300 ease-in-out'>
          <Link
            href={`/${post.slug}`}
            className='decoration-[3px] underline-offset-4 decoration-transparent hover:decoration-primary underline  dark:text-gray-50 line-clamp-2 transition-all duration-300 ease-in-out'
          >
            {post.title}
          </Link>
        </h2>
        <p className='mt-4 text-lg text-gray-700 line-clamp-3 leading-relaxed dark:text-gray-300'>{post.description}</p>
        <div className='mt-4 flex items-center gap-5 text-gray-400 dark:text-gray-500'>
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
