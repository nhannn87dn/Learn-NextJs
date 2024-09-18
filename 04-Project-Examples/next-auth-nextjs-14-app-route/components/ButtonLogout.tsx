'use client'

import {signOut} from 'next-auth/react'

const ButtonLogout = () => {
  return (
    <button onClick={()=>{
        signOut()
    }}>Logout</button>
  )
}

export default ButtonLogout