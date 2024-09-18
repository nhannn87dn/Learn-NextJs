import LoginForm from "@/components/LoginForm";
import {getServerAuthSession} from '@/auth'
import { permanentRedirect } from 'next/navigation'

const Page = async () => {

  const authSession = await getServerAuthSession(); //(1)
 
  if(authSession?.user){
    permanentRedirect(`/customers`)
  }
  return <LoginForm />
}

export default Page