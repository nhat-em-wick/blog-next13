import Link from 'next/link'
import React from 'react'

interface BreadcrumbItem {
  label: React.ReactNode | string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div id='breadcrumb' className='blog-container mb-6'>
      <div className='blog-card py-4 px-8'>
        <div>
          {items.map((item, index) => {
            const isLastItem = index === items.length - 1
            return (
              <>
                {!isLastItem ? (
                  <React.Fragment key={index}>
                    <Link
                      href={item.path}
                      className='text-gray-800 dark:text-gray-200 hover:text-primary transition-all duration-300 ease-in-out'
                    >
                      {item.label}
                    </Link>
                    <span className='mx-3'>/</span>
                  </React.Fragment>
                ) : (
                  <span key={index}>{item.label}</span>
                )}
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
