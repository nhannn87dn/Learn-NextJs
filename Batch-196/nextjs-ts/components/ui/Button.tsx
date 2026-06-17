'use client'

import Logo from "./Logo";
import { redirect } from 'next/navigation'
//client component
const Button = () => {
    
  return (
    <button onClick={()=>{
        console.log('Clicked button');
        redirect('/blog')
    }}>Go to Blog <Logo /></button>
  )
}

export default Button