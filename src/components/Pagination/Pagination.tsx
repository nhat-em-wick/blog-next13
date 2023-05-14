'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import classNames from 'classnames'

interface PaginationProps {
  pagination: {
    page: number
    limit: number
    pageCount: number
  }
}

export default function Pagination({ pagination }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { page: pageNumber, limit, pageCount } = pagination
  const [current, setCurrent] = useState(1)
  const [arrItems, setArrItems] = useState<any>([])
  const pages: Number[] = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    let temp: any = [...pages]
    if (pages.length < 6) {
      temp = pages
    } else if (pageNumber >= 1 && pageNumber <= 3) {
      temp = [1, 2, 3, 4, '...', pageCount]
    } else if (pageNumber === 4) {
      const slice = pages.slice(0, 5)
      temp = [...slice, '...', pageCount]
    } else if (pageNumber > 4 && pageNumber < pageCount - 2) {
      const slice1 = pages.slice(pageNumber - 2, pageNumber)
      const slice2 = pages.slice(pageNumber, pageNumber + 1)
      temp = [1, '...', ...slice1, ...slice2, '...', pageCount]
    } else if (pageNumber > pageCount - 3) {
      const slice2 = pages.slice(pageCount - 4)
      temp = [1, '...', ...slice2]
    }

    setArrItems(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, limit, pageCount])

  return (
    <div className='flex gap-2'>
      <span
        onClick={() =>
          router.push(
            pathname +
              '?' +
              createQueryString('page', Number(pageNumber) <= 1 ? '1' : (Number(pageNumber) - 1).toString())
          )
        }
        className={classNames(
          'flex items-center justify-center w-10 h-10 text-base bg-[#eff1f4] dark:bg-[#313438] rounded-full transition-all duration-300 ease-in-out',
          {
            'pointer-events-none text-gray-400': Number(pageNumber) <= 1,
            'hover:bg-gray-200  dark:hover:bg-gray-600 cursor-pointer': Number(pageNumber) > 1
          }
        )}
      >
        <MdKeyboardArrowLeft />
      </span>
      {arrItems.map((page: any) => {
        const isActive = page === Number(pageNumber)
        return (
          <>
            {page !== '...' ? (
              <Link
                key={uuid()}
                href={`${pathname}?${createQueryString('page', page)}`}
                className={classNames(
                  'flex items-center justify-center w-10 h-10 text-base text-gray-800  rounded-full transition-all duration-300 ease-in-out',
                  {
                    'bg-primary text-white': isActive,
                    'bg-[#eff1f4] hover:bg-gray-200 dark:bg-[#313438] dark:hover:bg-gray-600 dark:text-gray-200':
                      !isActive
                  }
                )}
              >
                {page}
              </Link>
            ) : (
              <span
                className='flex items-center justify-center w-10 h-10 text-base text-gray-800 bg-[#eff1f4] hover:bg-gray-200 dark:bg-[#313438] dark:hover:bg-gray-600 rounded-full transition-all duration-300 ease-in-out'
                key={uuid()}
              >
                {page}
              </span>
            )}
          </>
        )
      })}
      <span
        onClick={() =>
          router.push(
            pathname +
              '?' +
              createQueryString(
                'page',
                Number(pageNumber) >= pageCount ? pageCount.toString() : (Number(pageNumber) + 1).toString()
              )
          )
        }
        className={classNames(
          'flex items-center justify-center w-10 h-10 text-base bg-[#eff1f4] dark:bg-[#313438] rounded-full transition-all duration-300 ease-in-out',
          {
            'pointer-events-none text-gray-400': Number(pageNumber) >= pageCount,
            'hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer': Number(pageNumber) < pageCount
          }
        )}
      >
        <MdKeyboardArrowRight />
      </span>
    </div>
  )
}
