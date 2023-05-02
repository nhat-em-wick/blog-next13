import Image from 'next/image'
import Link from 'next/link'
import { BiCalendar } from 'react-icons/bi'
import { CiClock2 } from 'react-icons/ci'

export default function PostItem() {
  return (
    <article className='blog-card p-6 flex flex-col sm:flex-row lg:justify-between gap-10'>
      <div className='w-full  sm:w-[272px] flex-shrink-0'>
        <Link href='#' className='block aspect-square relative overflow-hidden rounded-lg group'>
          <Image
            src={
              'https://images.unsplash.com/photo-1513436539083-9d2127e742f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI5fHxkcmVhbXxlbnwwfHx8fDE2NzE0MzA3MTU&ixlib=rb-4.0.3&q=80&w=600'
            }
            alt='abc'
            fill
            className='object-cover w-full h-full group-hover:scale-105 transition-all duration-300 ease-in-out'
          />
        </Link>
      </div>
      <div className='flex-1'>
        <Link href={'#'} className='blog-tag'>
          Travel
        </Link>
        <h3 className='mt-[18px] '>
          <Link
            href='#'
            className='text-3xl font-medium underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-primary  
            dark:text-gray-50 leading-tight line-clamp-2 transition-all duration-300 ease-in-out'
          >
            Never let your memories be greater than your dreams
          </Link>
        </h3>
        <p className='mt-3 text-md text-gray-700 line-clamp-3 leading-relaxed dark:text-gray-300'>
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
