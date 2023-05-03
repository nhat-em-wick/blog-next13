import Image from 'next/image'
import Link from 'next/link'

export default function Tags() {
  return (
    <div className='mt-14 pb-16'>
      <div className='blog-container'>
        <h1 className='text-4xl font-semibold text-center mb-14'>Tags</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          <div className='blog-card p-5'>
            <div className='mb-4'>
              <Link href='#' className='relative block aspect-[5/4] overflow-hidden rounded-lg'>
                <Image
                  src={
                    'https://images.unsplash.com/photo-1559563458-527698bf5295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI5fHxiYWd8ZW58MHx8fHwxNjcxNDMxNDg0&ixlib=rb-4.0.3&q=80&w=1200'
                  }
                  fill
                  className='w-full h-full object-cover'
                  alt='imga-tags'
                />
              </Link>
            </div>
            <div>
              <h3>
                <Link
                  href='#'
                  className='text-xl font-semibold dark:text-gray-50 blog-underline underline-offset-4 decoration-2'
                >
                  Travel
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
