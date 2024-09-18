import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import UserInfo from "@/components/ui/UserInfo"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
        <header className='bg-white py-5'>
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="navigation flex gap-x-5">
              <Link href='/'>Home</Link>
              <Link href='/products'>Products</Link>
              <Link href='/customers'>Customer Private</Link>
            </div>
            <UserInfo />
          </div>
        </div>
        </header>
          <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  )
}
