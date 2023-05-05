import Header from '@/components/Header/Header'
import '../globals.css'
import { Roboto } from 'next/font/google'
import ThemeProvider from './themeProvider'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Footer from '@/components/Footer/Footer'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Blog',
  description: 'Blog by NhatVip',
  keywords: ['blog', 'seo', 'xay nha pho'],
  alternates: {
    canonical: `${process.env.HOST}`
  },
  openGraph: {
    title: 'Blog',
    description: 'Blog by NhatVip',
    images: {
      url: 'https://mms.businesswire.com/media/20211123005573/en/929867/2/vercel-logo-freelogovectors.net.jpg',
      width: 800,
      height: 600
    },
    type: 'website',
    url: `${process.env.HOST}`
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} select-none`}>
        <div className='dark:bg-dark-theme-bg bg-light-theme-bg pt-8'>
          <ThemeProvider>
            <Header />
            <main className='mt-14'>{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
