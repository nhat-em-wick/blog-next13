import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Studio Blog',
  description: 'Blog by NhatVip'
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className={roboto.className}>{children}</div>
}
