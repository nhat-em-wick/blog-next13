import Image from 'next/image'
import Link from 'next/link'
import { CiClock2 } from 'react-icons/ci'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className='blog-card p-8 h-max sticky top-[100px]'>
      <section>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Featured posts</span>
        <ul>
          <li className='mb-4'>
            <PostSidebarItem />
          </li>
          <li className='mb-4'>
            <PostSidebarItem />
          </li>
        </ul>
      </section>
      <section className='mt-8'>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Tags</span>
        <ul className='flex flex-wrap gap-x-2 gap-y-3'>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Travel
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Wibu
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Constructor
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Travel
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Wibu
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Constructor
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Travel
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Wibu
            </Link>
          </li>
          <li className=''>
            <Link href='#' className='blog-tag'>
              Constructor
            </Link>
          </li>
        </ul>
      </section>
      <section className='mt-8'>
        <span className='text-xl dark:text-gray-300 font-semibold mb-8 block'>Latest posts</span>
        <ul>
          <li className='mb-4'>
            <PostSidebarItem />
          </li>
          <li className='mb-4'>
            <PostSidebarItem />
          </li>
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

export const PostSidebarItem = () => {
  return (
    <article className='flex flex-row gap-3'>
      <div className='w-[80px] flex-shrink-0'>
        <Link href='#' className='block aspect-square relative overflow-hidden rounded-lg'>
          <Image
            src={
              'https://images.unsplash.com/photo-1513436539083-9d2127e742f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI5fHxkcmVhbXxlbnwwfHx8fDE2NzE0MzA3MTU&ixlib=rb-4.0.3&q=80&w=600'
            }
            alt='abc'
            fill
            className='object-cover w-full h-full'
          />
        </Link>
      </div>
      <div>
        <h3 className='text-md font-normal  dark:text-gray-50'>
          <Link
            href='#'
            className='underline underline-offset-3 decoration-2 decoration-transparent hover:decoration-primary  line-clamp-2 leading-snug transition-all duration-300 ease-in-out'
          >
            Never let your memories be greater than your dreams ter than your dreams
          </Link>
        </h3>
        <div className='mt-4 gap-5 text-gray-400 dark:text-gray-500'>
          <span className='flex items-center'>
            <CiClock2 />
            <span className='ml-1 text-sm dark'>6 phut doc</span>
          </span>
        </div>
      </div>
    </article>
  )
}
