
import { auth } from "@/auth"
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";


const UserInfo = async  () => {
  const session = await auth()
  if (!session?.user) return (
    <Link href="/login">
           Login
          </Link>
  )
  return (
    <div className="userInfo flex items-center gap-x-2">
       
          <>
            <Link className="flex gap-x-2" href='/customers/profile'>
              {session.user.avatar? (
                <>
                  <img className="rounded-full" height={30} width={30} src={session?.user.avatar} alt={session?.user.name} />
                </>
              ) : null}  
               {session.user.name}
            </Link>
            <ButtonLogout />
          </>
        
    </div>
  )
}

export default UserInfo