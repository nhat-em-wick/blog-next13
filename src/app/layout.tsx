import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Blog',
  description: 'Blog by NhatVip'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
