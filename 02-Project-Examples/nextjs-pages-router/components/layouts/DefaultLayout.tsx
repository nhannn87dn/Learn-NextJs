import Link from 'next/link';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function DefaultLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
     <header className='bg-slate-300 py-3'>
        <div className="container mx-auto">
        <ul className='flex items-center gap-x-3'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
        </div>
     </header>
      <main className={`container mx-auto my-3 ${inter.className}`}>{children}</main>
      <footer className="container mx-auto">
      <div className="container mx-auto">Footer</div>
      </footer>
    </>
  )
}