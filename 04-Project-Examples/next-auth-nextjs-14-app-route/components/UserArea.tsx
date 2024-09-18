import Link from 'next/link'
import { getServerAuthSession } from "@/auth"
import ButtonLogout from './ButtonLogout';

const UserArea = async () => {
    const authSession = await getServerAuthSession(); //(1)
    if(!authSession?.user){
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
        <strong>{authSession.user.name}</strong>
        <ButtonLogout />
        </>
    )
 
}

export default UserArea