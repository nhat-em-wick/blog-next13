import PostItem from '@/components/PostItem/PostItem'
import PostSlide from '@/components/PostSlide/PostSlide'
import Sidebar from '@/components/Sidebar/Sidebar'
import { getPosts } from '@/lib/post'

export const revalidate = 60

export default async function Home() {
  const { posts } = await getPosts({ page: 1, limit: 10 })

  return (
    <div className=''>
      <PostSlide posts={posts.slice(0, 4)} />
      <h1 className='leading-none w-0 scale-0'>Blog</h1>
      <div className='blog-container flex flex-col lg:flex-row gap-12 mt-8'>
        <div className='blog-list w-full lg:w-[65%] flex flex-col gap-y-10'>
          {posts?.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <div className='blog-sidebar flex-1'>
          {/* @ts-expect-error Server Component */}
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
