'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Swiper as SwiperRef, Autoplay } from 'swiper'
import { BiCalendar } from 'react-icons/bi'
import { CiClock2 } from 'react-icons/ci'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useRef } from 'react'

export default function PostSlide() {
  const swiperRef = useRef<SwiperRef>()

  return (
    <section className='blog-container'>
      <div>
        <Swiper
          modules={[Autoplay]}
          //   autoplay={{
          //     delay: 5000,
          //     disableOnInteraction: false
          //   }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          <SwiperSlide>
            <PostSlideItem />
          </SwiperSlide>
          <SwiperSlide>
            <PostSlideItem />
          </SwiperSlide>
          <SwiperSlide>
            <PostSlideItem />
          </SwiperSlide>

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

const PostSlideItem = () => {
  return (
    <article className='flex flex-col md:flex-row-reverse justify-between gap-8'>
      <div className='blog-card p-4 w-full lg:w-[55%]'>
        <Link href='#' className='w-full h-full aspect-video block rounded-lg overflow-hidden relative group'>
          <Image
            src={
              'https://images.unsplash.com/photo-1513436539083-9d2127e742f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI5fHxkcmVhbXxlbnwwfHx8fDE2NzE0MzA3MTU&ixlib=rb-4.0.3&q=80&w=600'
            }
            alt='abc'
            fill
            className='object-cover w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out'
          />
        </Link>
      </div>
      <div className='w-full lg:w-[45%]'>
        <Link href='#' className='blog-tag'>
          Travel
        </Link>
        <h2 className='text-5xl font-medium leading-none md:leading-tight mt-[18px] transition-all duration-300 ease-in-out'>
          <Link
            href='#'
            className='decoration-[3px] underline-offset-4 decoration-transparent hover:decoration-primary underline  dark:text-gray-50 line-clamp-2 transition-all duration-300 ease-in-out'
          >
            Autumn is a second spring when every leaf is a flower
          </Link>
        </h2>
        <p className='mt-4 text-lg text-gray-700 line-clamp-3 leading-relaxed dark:text-gray-300'>
          She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my
          future grandeur; assured me how heartily I should despise almost every body and She then expatiated very
          warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured
          me how heartily I should despise almost every body and
        </p>
        <div className='mt-4 flex items-center gap-5 text-gray-400 dark:text-gray-500'>
          <span className='flex items-center'>
            <BiCalendar /> <span className='ml-1 text-sm'>May 2, 2022</span>
          </span>
          <span className='flex items-center'>
            <CiClock2 />
            <span className='ml-1 text-sm dark'>6 phut doc</span>
          </span>
        </div>
      </div>
    </article>
  )
}
