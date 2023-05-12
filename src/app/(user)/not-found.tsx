import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='blog-container text-center'>
      <h2 className='text-[80px] font-semibold tracking-widest text-gray-900 dark:text-gray-50'>404</h2>
      <p className='text-gray-800 dark:text-gray-100 mb-6'>Trang bạn yêu cầu không tìm thấy</p>
      <div>
        <Link
          href='/'
          className='block text-white cursor-pointer bg-primary hover:bg-primary-dark focus:ring-4 font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 inline-flex items-center'
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
