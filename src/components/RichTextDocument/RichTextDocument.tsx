import Link from 'next/link'
import urlFor from '@/lib/urlFor'
import Image from '../Image'

export const RichTextDocument = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className='relative aspect-video m-10 mx-auto rounded-lg overflow-hidden'>
          <Image className='object-cover' src={urlFor(value).url()} fill alt={value.alt} />
        </figure>
      )
    }
  },
  list: {
    bullet: ({ children }: any) => <ul className='ml-10 py-5 list-disc space-y-2'>{children}</ul>,
    number: ({ children }: any) => <ol className='ml-10 py-5 list-decimal space-y-2'>{children}</ol>
  },
  block: {
    h1: ({ children, node: { _key } }: any) => (
      <h1 id={_key} className='text-3xl py-6 font-bold text-gray-800 dark:text-gray-50 scroll-mt-[70px]'>
        {children}
      </h1>
    ),
    h2: ({ children, node: { _key } }: any) => (
      <h2 id={_key} className='text-2xl py-6 font-bold text-gray-800 dark:text-gray-50 scroll-mt-[70px]'>
        {children}
      </h2>
    ),
    h3: ({ children, node: { _key } }: any) => (
      <h3 id={_key} className='text-xl py-6 font-bold text-gray-800 dark:text-gray-50 scroll-mt-[70px]'>
        {children}
      </h3>
    ),
    h4: ({ children, node: { _key } }: any) => (
      <h4 id={_key} className='text-lg py-6 font-bold text-gray-800 dark:text-gray-50 scroll-mt-[70px]'>
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='border-l-primary border-l-4 pl-5 py-5 my-5'>{children}</blockquote>
    )
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.url.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link href={value.url} rel={rel} className='underline decoration-primary hover:decoration-primary-light'>
          {children}
        </Link>
      )
    }
  }
}

const filter = (ast: any, match: any) =>
  ast.reduce((acc: any, node: any) => {
    if (match(node)) acc.push(node)
    if (node.children) acc.push(...filter(node.children, match))
    return acc
  }, [])

const findHeadings = (ast: any) => filter(ast, (node: any) => /h\d/.test(node.style))

const get = (object: any, path: any) => path.reduce((prev: any, curr: any) => prev[curr], object)
const getObjectPath = (path: any) =>
  path.length === 0 ? path : ['subheadings'].concat(path.join('.subheadings.').split('.'))

export const parseOutline = (ast: any) => {
  const outline = { subheadings: [] }
  const headings = findHeadings(ast)
  const path: any = []
  let lastLevel = 0

  headings.forEach((heading: any) => {
    const level = Number(heading.style.slice(1))
    heading.subheadings = []

    if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop()
    else if (level === lastLevel) path.pop()

    const prop = get(outline, getObjectPath(path))
    prop.subheadings.push(heading)
    path.push(prop.subheadings.length - 1)
    lastLevel = level
  })

  return outline.subheadings
}

const getChildrenText = (props: any) =>
  props.children.map((node: any) => (typeof node === 'string' ? node : node.text || '')).join('')

export const TableOfContents = (props: any) => (
  <ol>
    {props.outline.map((heading: any, index: any) => (
      <li key={index} className='line-clamp-1 my-[6px]'>
        <a
          href={'#' + heading._key}
          className='block w-fit text-gray-600 py-[2px] dark:text-gray-200  relative after:absolute after:w-0 after:h-[1px] after:left-0 after:bottom-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out'
        >
          {getChildrenText(heading)}
        </a>
        {heading.subheadings.length > 0 && (
          <div className='ml-4'>
            <TableOfContents outline={heading.subheadings} />
          </div>
        )}
      </li>
    ))}
  </ol>
)
