import Image from 'next/image'

export default function DetailTag() {
  return (
    <div className='mt-14'>
      <div className='blog-container'>
        <div className='blog-card p-5 relative'>
          <div className='relative aspect-square sm:aspect-[2/1] lg:aspect-[4/1] overflow-hidden rounded-lg'>
            <Image
              alt='bac'
              className='object-cover w-full h-full'
              fill
              src='https://images.unsplash.com/photo-1576504365365-091376931772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEzfHxuYXR1cmUlMjBhcnR8ZW58MHx8fHwxNjMyMzI3ODI3&ixlib=rb-1.2.1&q=80&w=1200'
            />
          </div>
          <div
            className='absolute w-[80%] lg:w-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white dark:bg-dark-theme-bg opacity-80 rounded-lg py-8 px-10'
          >
            <h1 className='text-4xl font-semibold text-center dark:text-gray-50 mb-6'>Nature</h1>
            <p className='text-center text-xl text-gray-800 dark:text-gray-200 line-clamp-2'>
              urabitur lacus felis, mollis ac dictum id, maximus quis libero. Vivamus ullamcorper dignissim justo, eu
              faucibus nulla lacinia nec. In eget enim augue.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
