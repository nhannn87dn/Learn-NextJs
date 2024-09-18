'use client'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";

const UserAreaV2 =  () => {
    const { data: session } = useSession();
    if(!session?.user){
        return (
            <>
             <Link href="/auth/login">
            Login
            </Link>
            </>
        )
    }
    return (
        <>
        <strong>{session.user.name}</strong>
        <button onClick={()=>{
            signOut()
        }}>Logout</button>
        </>
    )
 
}

export default UserAreaV2