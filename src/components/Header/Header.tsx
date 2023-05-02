'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { BsSun, BsMoon, BsSearch } from 'react-icons/bs'
import { HiOutlineSearch } from 'react-icons/hi'
import { UseThemeProps } from 'next-themes/dist/types'

const menuHeader = [
  { title: 'Trang chủ', path: '/' },
  { title: 'Thể loại', path: '/tags' }
]

export default function Header() {
  const pathname = usePathname()
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
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
                  className={`relative after:absolute after:-bottom-0.5 
                  after:left-0 hover:after:w-full after:h-0.5 after:rounded-sm 
                  after:bg-primary after:transition-all after:duration-300 after:ease-linear
                    ${pathname === item.path ? 'after:w-full' : 'after:w-0'}
                  `}
                >
                  <Link href={item.path} className=''>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className='flex items-center gap-4 dark:text-gray-50'>
                <span className='text-lg cursor-pointer hover:text-primary'>
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
  )
}
