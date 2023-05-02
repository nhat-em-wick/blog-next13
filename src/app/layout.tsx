import Header from '@/components/Header/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import ThemeProvider from './themeProvider'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Footer from '@/components/Footer/Footer'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Blog',
  description: 'Blog by NhatVip'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} select-none`}>
        <ThemeProvider>
          <div className='dark:bg-dark-theme-bg bg-light-theme-bg pt-8'>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
