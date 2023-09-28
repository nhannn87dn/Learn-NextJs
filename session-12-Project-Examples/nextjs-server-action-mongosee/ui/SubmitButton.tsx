'use client'
 
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    disabled={pending}
  >
    {pending ? 'Submitting...' : 'Add'}
  </button>
  )
}