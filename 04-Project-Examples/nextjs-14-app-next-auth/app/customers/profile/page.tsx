import type { Metadata } from 'next'

import { auth } from "@/auth";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customer Profile',
  description: 'Customer desc'
}


export default async function Page() {

  const session = await auth()
  if (!session?.user) return (
    <Link href="/login">
           Login
          </Link>
  )

    return (
      <>
      <h1>Customer Profile Page</h1>
      <div className="flex items-center gap-8">
                <div className="mt-8">
                  <p className="mb-3">Name: {session?.user.name}</p>
                  <p className="mb-3">Email: {session?.user.email}</p>
                </div>
              </div>
      </>
    )
  }