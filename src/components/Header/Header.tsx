'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, RefObject, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsSun, BsMoon, BsSearch } from 'react-icons/bs'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdClear } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import classNames from 'classnames'

import { useClickOutSide, useDebounce } from '@/hooks'
import { getPosts } from '@/lib/post'
import { getTags } from '@/lib/tag'
import { Post, Tag } from '@/types'

const menuHeader = [
  { title: 'Trang chủ', path: '/' },
  { title: 'Thể loại', path: '/tags' }
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <header className='sticky top-0 z-[1000]'>
        <div className='blog-container '>
          <div className='blog-card h-[65px] lg:h-[80px] px-4 md:px-8 flex justify-between items-center relative'>
            <div className='blog-logo font-extrabold text-2xl dark:text-gray-50'>
              <Link href='/'>Blog</Link>
            </div>
            <nav className='hidden lg:block'>
              <ul className='flex items-center gap-10 text-gray-800 dark:text-gray-50'>
                {menuHeader.map((item, index) => (
                  <li
                    key={index}
                    className={`relative after:absolute after:-bottom-0.5 after:left-0 hover:after:w-full after:h-0.5 after:rounded-sm after:bg-primary after:transition-all after:duration-300 after:ease-linear ${
                      pathname === item.path ? 'after:w-full' : 'after:w-0'
                    }`}
                  >
                    <Link href={item.path} className=''>
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li className='flex items-center gap-4 dark:text-gray-50'>
                  <span className='text-lg cursor-pointer hover:text-primary' onClick={() => setOpenSearch(true)}>
                    <HiOutlineSearch />
                  </span>
                  <span onClick={handleChangeTheme} className='text-lg cursor-pointer hover:text-primary'>
                    {theme === 'light' ? <BsMoon /> : <BsSun />}
                  </span>
                </li>
              </ul>
            </nav>
            <div
              onClick={() => setIsActiveMenu(!isActiveMenu)}
              className='blog-menu--toggle w-[32px] h-[24px] cursor-pointer relative lg:hidden'
            >
              <span
                className={`h-[3px] w-full bg-black ease-in-out duration-500 absolute top-[10%] left-0 ${
                  isActiveMenu ? 'rotate-45 translate-y-[9px] ' : ''
                }`}
              ></span>
              <span
                className={`h-[3px] w-full bg-black ease-in-out duration-500 absolute -translate-y-1/2 top-[50%] ${
                  isActiveMenu ? '-translate-x-[8px] opacity-0' : ''
                }`}
              ></span>
              <span
                className={`h-[3px] w-full bg-black ease-in-out duration-500 absolute bottom-[10%] left-0 ${
                  isActiveMenu ? '-rotate-45 -translate-y-[8px] ' : ''
                }`}
              ></span>
            </div>
            <nav
              className={`absolute blog-card w-[200px] rounded-lg  right-0 mt-3 py-5 px-4 transition-all duration-500 ease-in-out ${
                isActiveMenu ? 'top-[100%] opacity-100 visible' : 'top-[130%] opacity-0 invisible'
              }`}
            >
              <ul>
                {menuHeader.map((item, index) => (
                  <li
                    key={index}
                    className={`relative after:absolute after:-bottom-0.5 
                  after:left-0 after:h-0.5 after:rounded-sm 
                  after:bg-primary after:transition-all after:duration-300 after:ease-linear
                    ${pathname === item.path ? 'after:w-full' : 'after:w-0'}`}
                  >
                    <Link href={item.path} className='w-full block py-2'>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  )
}

interface SearchModelProps {
  open: boolean
  onClose: () => void
}

const SearchModal = ({ open, onClose }: SearchModelProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useClickOutSide(nodeRef, onClose)
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)

  const debounceSearch = useDebounce(searchTerm, 500)
  const pathname = usePathname()

  const fetchPostsAndTags = async (value: string) => {
    const [{ posts }, { tags }] = await Promise.all([
      getPosts({ page: 1, limit: 50 }, value),
      getTags({ page: 1, limit: 50 }, value)
    ])
    setPosts(posts)
    setTags(tags)
    setLoading(false)
  }

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    setLoading(true)
    if (!debounceSearch.trim()) {
      setPosts([])
      setTags([])
      setLoading(false)
      return
    } else {
      fetchPostsAndTags(encodeURIComponent(debounceSearch.trim()))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  const handleClearInput = () => {
    inputRef.current?.focus()
    setSearchTerm('')
  }

  return (
    <div
      className={classNames(
        'p-6 md:p-[10vh] lg:p-[12vh] fixed top-0 left-0 z-[1000] w-screen h-screen bg-opacity-25 backdrop-blur-sm',
        {
          hidden: !open,
          'block bg-slate-400': open
        }
      )}
    >
      <div
        ref={nodeRef}
        className='relative w-full max-w-3xl h-min bg-white dark:bg-dark-theme-bg mx-auto rounded-lg pb-6'
      >
        <div className='flex items-center h-14 px-5 gap-4 border-b-[1px] border-gray-200 dark:border-gray-700'>
          <div className='flex flex-1 gap-3 items-center'>
            <span className='text-xl'>
              <HiOutlineSearch />
            </span>
            <div className='h-12 relative flex-1'>
              <input
                ref={inputRef}
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Tìm kiếm...'
                className='w-full h-full focus:outline-none dark:bg-dark-theme-bg pr-4'
              />
              <span
                onClick={() => handleClearInput()}
                className={classNames('absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer', {
                  hidden: !searchTerm,
                  block: searchTerm
                })}
              >
                <AiOutlineClear />
              </span>
            </div>
          </div>
          <span onClick={onClose} className='text-xl cursor-pointer'>
            <MdClear />
          </span>
        </div>
        <div className='px-5 min-h-[200px] max-h-[400px] pt-4 md:pt-6 overflow-y-scroll'>
          {!loading && (
            <>
              {tags.length > 0 && (
                <div className='mt-2'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-gray-50'>Tags</h3>
                  <ul className='mt-2 ml-3 flex flex-col gap-2'>
                    {tags.map((tag, index) => (
                      <li key={index}>
                        <Link
                          href={`/tags/${tag.slug}`}
                          className='decoration-[1px] underline-offset-4 decoration-transparent hover:decoration-primary underline text-gray-800 text-lg dark:text-gray-50 line-clamp-1 transition-all duration-300 ease-in-out'
                        >
                          {tag.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {posts.length > 0 && (
                <div className='mt-2'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-gray-50'>Bài viết</h3>
                  <ul className='mt-2 ml-3 flex flex-col gap-2'>
                    {posts.map((post, index) => (
                      <li key={index}>
                        <Link
                          href={`/${post.slug}`}
                          className='decoration-[1px] underline-offset-4 decoration-transparent hover:decoration-primary underline text-gray-800 text-lg dark:text-gray-50 line-clamp-1 transition-all duration-300 ease-in-out'
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {debounceSearch && tags.length <= 0 && posts.length <= 0 && (
                <div className='text-lg text-gray-800 dark:text-gray-100 my-auto px-6 py-16 text-center'>
                  Không tìm thấy kết quả với từ khóa {`'${debounceSearch}'`}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
