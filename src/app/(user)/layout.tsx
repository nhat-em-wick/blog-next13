import Header from '@/components/Header/Header'
import '../globals.css'
import { Roboto } from 'next/font/google'
import ThemeProvider from './themeProvider'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Footer from '@/components/Footer'

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
      url: 'https://res.cloudinary.com/practicaldev/image/fetch/s--DWovAEyS--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/lr4rm1p2pcezmxqs5dqk.png',
      width: 800,
      height: 600
    },
    type: 'website',
    url: `${process.env.HOST}`
  },
  twitter: {
    card: 'summary',
    title: 'Blog',
    description: 'Blog by NhatVip',
    images: [
      'https://res.cloudinary.com/practicaldev/image/fetch/s--DWovAEyS--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/lr4rm1p2pcezmxqs5dqk.png'
    ]
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
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
    <html lang='en' className='scroll-smooth'>
      <body className={`${roboto.className} select-none`}>
        <div className='dark:bg-dark-theme-bg bg-light-theme-bg pt-8'>
          <ThemeProvider>
            <Header />
            <main className='pt-14'>{children}</main>
            {/* @ts-expect-error Server Component */}
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
