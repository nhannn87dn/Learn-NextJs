import { LoginForm } from '@/components/ui/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login desc'
}


export default async function Page() {
    return (
      <div className='max-w-xs mx-auto'>
      <LoginForm />
      </div>
    )
  }