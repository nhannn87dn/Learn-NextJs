import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='container mx-auto text-center'>
      <h2 className='font-bold text-3xl'>404- Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}